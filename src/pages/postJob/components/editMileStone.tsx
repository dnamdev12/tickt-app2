import React, { Component, useEffect, useState } from 'react';
import moment from 'moment';

interface Props {
    data: any;
    stepCompleted: Boolean;
    editMileStone: any;
    editMilestoneTiming: any;
    handleStepComplete: (data: any) => void;
    addTimeToMileStone: (data: any, index: any) => void;
    handleStepForward: (data: any) => void;
    newMileStoneScreen: (data: any) => void;
    handleStepMileStone: (data: any, index: any) => void;
    handleStepBack: () => void;
    milestones: any;
}

interface State {
    milestone_name: string,
    isPhotoevidence: boolean,
    from_date: string,
    to_date: string,
    recommended_hours: any
    errors: any;
}

export default class EditMilestone extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            milestone_name: '',
            isPhotoevidence: true,
            from_date: '',
            to_date: '',
            recommended_hours: '',
            errors: {
                milestone_name: '',
                from_date: '',
                recommended_hours: '',
                pattern_error: ''
            }
        }
    }

    checkIsDateValid = (milestones: any, time: any) => {
        let checkIsValid: any = true;
        milestones.forEach((mile: any) => {
            let validStart = moment(mile.from_date).isValid();
            let validEnd = moment(mile.to_date).isValid();

            let validStartInput = moment(time.from_date).isValid();
            let validEndInput = moment(time.to_date).isValid();

            if (validStart && validEnd) {
                if (validStartInput && validEndInput) {
                    if (moment(time.from_date).add(1, 'day').isBetween(mile.from_date, mile.to_date)) {
                        checkIsValid = false
                    }
                    if (moment(time.to_date).subtract(1, 'day').isBetween(mile.from_date, mile.to_date)) {
                        checkIsValid = false
                    }
                }

                if (validStartInput) {
                    if (moment(time.from_date).add(1, 'day').isBetween(mile.from_date, mile.to_date)) {
                        checkIsValid = false
                    }
                }

                if (validEndInput) {
                    if (moment(time.to_date).add(1, 'day').isBetween(mile.from_date, mile.to_date)) {
                        checkIsValid = false
                    }
                }
            }

            if (validStart && validStartInput && !validEnd) {
                if (moment(time.from_date).isSame(mile.from_date)) {
                    checkIsValid = false
                }
            }

            if (validEnd && validEndInput && !validStart) {
                if (moment(time.to_date).isSame(mile.to_date)) {
                    checkIsValid = false
                }
            }

        });

        console.log({ checkIsValid });

        return checkIsValid;

    }

    componentDidMount() {
        const { editMileStone, milestones, editMilestoneTiming } = this.props;
        let item = milestones[editMileStone];

        if (Object.keys(item).length) {
            let { milestone_name, isPhotoevidence, from_date, to_date, recommended_hours } = item;
            let isValid: any = null;
            if (editMilestoneTiming && Object.keys(editMilestoneTiming).length) {
                isValid = this.checkIsDateValid(milestones, editMilestoneTiming);
                if (isValid) {
                    if ('from_date' in editMilestoneTiming) {
                        from_date = editMilestoneTiming?.from_date;
                    }
                    if ('to_date' in editMilestoneTiming) {
                        to_date = editMilestoneTiming?.to_date;
                    }
                }
            }
            console.log({ isPhotoevidence, isValid })
            this.setState({
                from_date: from_date,
                isPhotoevidence: isPhotoevidence === undefined ? false : isPhotoevidence,
                milestone_name: milestone_name,
                recommended_hours: recommended_hours,
                to_date: to_date,
            }, () => {
                if (isValid !== null) {
                    this.props.addTimeToMileStone({
                        from_date,
                        to_date
                    }, editMileStone)
                }
            })
        }
    }

    handleChange = (name: string, value: any) => {
        let error_clone: any = this.state.errors;
        if (['milestone_name', 'from_date', 'recommended_hours']) {
            error_clone[name] = this.isInvalid(name, value)
        }
        this.setState({ ...this.state, [name]: value, errors: error_clone });
    }

    handleContinue = () => {
        this.setItems();
        this.props.handleStepForward(6);
    }


    setItems = () => {
        const { milestones, handleStepMileStone, newMileStoneScreen, editMileStone } = this.props;
        let { milestone_name, from_date, to_date, isPhotoevidence, recommended_hours, errors } = this.state;
        let milestone_index = editMileStone;
        handleStepMileStone({
            "milestone_name": milestone_name,
            "isPhotoevidence": isPhotoevidence,
            "from_date": from_date, // milestones[milestone_index]?.from_date || '',
            "to_date": to_date, //milestones[milestone_index]?.to_date || '',
            "recommended_hours": recommended_hours
        }, milestone_index);
    }

    isInvalid = (name: string, value: string) => {
        switch (name) {
            case 'milestone_name':
                return !value.length ? `please enter ${name}` : value.length > 50 ? 'max length exceed to 50.' : '';
            case 'from_date':
                return !value.length ? `please enter ${name}` : '';
            case 'recommended_hours':
                return !value.length ? `please enter ${name}` : '';
        }
    }

    checkErrors = () => {
        const { milestones, editMileStone } = this.props;
        let milestone_index = editMileStone;
        let from_date = milestones[editMileStone]?.from_date || '';
        let state_from_date = this.state.from_date;
        console.log({
            from_date,
            state_from_date,
            editMileStone,
            milestone_index
        })
        let { milestone_name, recommended_hours, errors: { pattern_error } } = this.state;
        if (milestone_name?.length && recommended_hours?.length) {
            let error_1 = this.isInvalid('milestone_name', milestone_name);
            let error_2 = this.isInvalid('from_date', from_date);
            let error_3 = this.isInvalid('recommended_hours', recommended_hours);
            console.log({
                error_1,
                error_2,
                error_3,
                pattern_error
            })
            if (!error_1?.length && !error_2?.length && !error_3?.length && !pattern_error?.length) {
                return false;
            }
        }
        return true;
    }

    render() {
        const { handleStepForward, handleStepBack, milestones, editMileStone } = this.props;
        let { milestone_name, isPhotoevidence, recommended_hours, from_date, to_date, errors } = this.state;

        let from_date_format = from_date?.length ? moment(from_date, 'MM-DD-YYYYY').format('MMM DD') : '';
        let to_date_format = to_date?.length ? moment(to_date, 'MM-DD-YYYY').format('DD') : '';
        let check_errors = this.checkErrors();

        return (
            <div className="app_wrapper">
                <div className="section_wrapper">
                    <div className="custom_container">
                        <div className="form_field">
                            <div className="flex_row">
                                <div className="flex_col_sm_5">
                                    <div className="relate">
                                        <button
                                            className="back"
                                            onClick={() => { handleStepForward(6) }}>
                                        </button>
                                        <span className="title">
                                            {`Edit Milestone ${editMileStone + 1}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_5">
                                <div className="form_field">
                                    <label className="form_label">Milestone name</label>
                                    <div className="text_field">
                                        <input
                                            type="text"
                                            placeholder="Enter Milestone name"
                                            onChange={(e) => { this.handleChange('milestone_name', e.target.value) }}
                                            value={milestone_name}
                                            name="milestone_name" />
                                    </div>
                                    <span className="error_msg">{errors?.milestone_name}</span>
                                </div>
                                <div className="form_field">

                                    <div className="checkbox_wrap agree_check">
                                        <input
                                            onChange={() => { this.handleChange('isPhotoevidence', !isPhotoevidence) }}
                                            checked={isPhotoevidence}
                                            className="filter-type filled-in"
                                            type="checkbox"
                                            id="milestone1" />
                                        <label htmlFor="milestone1">
                                            {'Photo evidence required'}
                                        </label>
                                    </div>
                                </div>
                                <div className="form_field">
                                    <div className="f_spacebw">
                                        <label className="form_label">Duration of milestone</label>
                                        <button
                                            onClick={() => { handleStepForward(8) }}
                                            className="fill_btn fill_grey_btn choose_btn">
                                            {!to_date_format.length && from_date_format.length
                                                ? `${from_date_format}` : to_date_format.length
                                                    ? `${from_date_format}-${to_date_format}`
                                                    : 'Choose'}
                                        </button>
                                    </div>
                                </div>
                                <div className="form_field">
                                    <label className="form_label">Recommended hours</label>
                                    <div className="text_field">
                                        <input
                                            onChange={(e) => {
                                                this.setState({ recommended_hours: e.target.value }, () => {
                                                    this.setItems();
                                                    let rh_value = this.state.recommended_hours;
                                                    let error_item = this.state.errors;
                                                    let pattern = "([0-9]?[0-9]{1}|2[0-9]{1}|3[0-9]{1}|4[0-9]{1}|5[0-9]{1}|6[0-9]{1}):[0-5]{1}[0-9]{1}";
                                                    if (rh_value.match(pattern) !== null) {
                                                        error_item['pattern_error'] = '';
                                                    } else {
                                                        error_item['pattern_error'] = 'please enter a valid pattern like : 04:03';
                                                    }
                                                    this.setState({ errors: error_item });
                                                });
                                            }}
                                            // onChange={(e) => { this.handleChange('recommended_hours', e.target.value) }}
                                            value={recommended_hours}
                                            type="text"
                                            placeholder="Enter Recommended hours"
                                            name="recommended_hours" />
                                    </div>
                                    <span className="error_msg">{errors.recommended_hours}</span>
                                    <span className="error_msg">{errors.pattern_error}</span>
                                </div>

                                <div className="form_field">
                                    <button
                                        onClick={this.handleContinue}
                                        // className="fill_btn full_btn">
                                        className={`fill_btn full_btn ${check_errors ? 'disable_btn' : ''}`}>
                                        {'Continue'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}