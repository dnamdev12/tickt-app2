import React, { useState, useEffect } from 'react';
import Constants from '../../utils/constants';
// @ts-ignore
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import regex from '../../utils/regex';
// @ts-ignore
import { format } from 'date-fns';
// @ts-ignore
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Searchicon from "../../assets/images/main-search.png";
import search from "../../assets/images/ic-search.png";
import Location from "../../assets/images/ic-location.png";
import cross from "../../assets/images/close-black.png";
import icgps from "../../assets/images/ic-gps.png";
import residential from "../../assets/images/ic-residential.png";
import close from "../../assets/images/icon-close-1.png";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getSearchJobList, getRecentSearchList, postHomeSearchData } from '../../redux/homeSearch/actions';
import { useDetectClickOutside } from 'react-detect-click-outside';
interface PropsType {
    history: any,
    location?: any,
    bannerData: any,
    current_address: any,
    searchJobListData: Array<object>,
    recentSearchJobData: Array<object>,
    homeSearchJobData: Array<object>,
    setBannerData: (data: any) => void,
    getSearchJobList: (data: any) => void,
    postHomeSearchData: (data: any) => void,
}

const BannerSearch = (props: PropsType) => {
    console.log({ current_address: props.current_address });
    const [stateData, setStateData] = useState<any>(props.bannerData)
    const [searchText, setSearchText] = useState('');
    const [addressText, setAddressText] = useState<any>(props.current_address)
    const [errors, setErrors] = useState<any>({});
    const [selectedTrade, setSelectedTrade] = useState({});
    const [inputFocus1, setInputFocus1] = useState<boolean>(false)
    const [inputFocus2, setInputFocus2] = useState<boolean>(false)
    const [inputFocus3, setInputFocus3] = useState<boolean>(false)

    const [calenderRange1, setCalenderRange1] = useState<any>({ startDate: new Date(), endDate: new Date(), key: 'selection1' });

    const handleOnOutsideSearch = () => {
        setInputFocus1(false);
    }
    const handleOnOutsideLocation = () => {
        setInputFocus2(false);
    }
    const handleOnOutsideCalender = () => {
        console.log('Here!', { inputFocus3 })
        setInputFocus3(false);
    }

    const searchRef = useDetectClickOutside({ onTriggered: handleOnOutsideSearch });
    const locationRef = useDetectClickOutside({ onTriggered: handleOnOutsideLocation });
    const calenderRef = useDetectClickOutside({ onTriggered: handleOnOutsideCalender });

    useEffect(() => {
        if (calenderRange1 && inputFocus3) {
            const startDate = format(new Date(calenderRange1.startDate), 'MMM dd')
            const endDate = format(new Date(calenderRange1.endDate), 'MMM dd')
            const from_date = format(new Date(calenderRange1.startDate), 'yyyy-MM-dd')
            const to_date = format(new Date(calenderRange1.endDate), 'yyyy-MM-dd')
            // setStateData((prevData: any) => ({ ...prevData, startDate: startDate, endDate: endDate }))
            // setStateData((prevData: any) => ({ ...prevData, from_date: from_date, to_date: to_date }))
        }
    }, [calenderRange1, stateData])

    useEffect(() => {
        if (props.bannerData !== stateData) {
            setStateData(props.bannerData);
        }
    }, [props.bannerData])

    const handleCalenderRange = (item: any) => {
        setCalenderRange1(item.selection1)
    };

    const checkIfExist = (_id: any) => {
        let isLength = Object.keys(selectedTrade).length;
        if (isLength) {
            let item: any = selectedTrade;
            if (item?._id === _id) {
                return true;
            }
        }
        return false;
    }

    const recentJobSearches = () => {
        let props_Clone: any = props;
        let tradeListData = props_Clone.tradeListData;
        console.log({ selectedTrade }, '---------------->')
        return (
            <>
                <div className="custom_autosuggestion" id="recent-job-search-div">
                    {props?.recentSearchJobData?.length ?
                        <React.Fragment>
                            <span className="sub_title">Recent searches</span>
                            <div className="flex_row recent_search">
                                {props.recentSearchJobData?.length > 0 && props.recentSearchJobData?.slice(0, 2).map((item: any) => {
                                    return (
                                        <div
                                            className="flex_col_sm_4"
                                            onClick={() => {
                                                console.log({ item }, '------------>')
                                                setItemSearch(item);
                                                setSelectedTrade({});
                                            }}>
                                            <div className="autosuggestion_icon card history">
                                                <span>{item.name}</span>
                                                <span className="name">{item.trade_name}</span>
                                            </div>
                                        </div>)
                                })}
                            </div>
                        </React.Fragment>
                        : null}

                    <div className="select_sphere recent_search">
                        <span className="sub_title">Categories</span>
                        <ul>
                            {tradeListData?.map(({ _id, trade_name, selected_url, specialisations }: { _id: string, trade_name: string, selected_url: string, specialisations: [] }) =>
                                <li
                                    onClick={() => {
                                        let item_spec: any = specialisations;
                                        if (item_spec?.length) {
                                            let getItem = item_spec[0];
                                            if (getItem) {
                                                setStateData({
                                                    image: selected_url,
                                                    name: getItem?.name,
                                                    specializationsId: getItem?._id,
                                                    trade_name: trade_name,
                                                    _id: _id,
                                                })
                                                if (item_spec.length > 1) {
                                                    setSearchText(`${getItem?.name} +${item_spec.length - 1}`);
                                                } else {
                                                    setSearchText(getItem?.name);
                                                }
                                            }
                                            setSelectedTrade({ _id, trade_name, selected_url, specialisations });
                                        }
                                    }}
                                    className={checkIfExist(_id) ? 'active' : ''}>
                                    <figure>
                                        <img src={selected_url} alt="" />
                                    </figure>
                                    <span className="name">{trade_name}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div >
            </>
        )
    }

    const renderJobResult = () => {
        return (
            props.searchJobListData?.length ? <div className="custom_autosuggestion" id="fetched-custom-job-category-div">
                <div className="recent_search">
                    <ul className="drop_data">
                        {props.searchJobListData?.map((item: any) => {
                            return (
                                <li onClick={() => {
                                    setItemSearch(item);
                                }}>
                                    <figure className="category">
                                        <img src={item.image ? item.image : residential} alt="icon" />
                                    </figure>
                                    <div className="details">
                                        <span className="name">{item.name}</span>
                                        <span className="prof">{item.trade_name}</span>
                                    </div>
                                </li>)
                        })}
                    </ul>
                </div>
            </div> : <span className="error_msg">Please select job type from the list</span>
        )
    }

    const locationSelectedHandler = (address: string) => {
        geocodeByAddress(address)
            .then((results: any) => getLatLng(results[0]))
            .then(({ lat, lng }: any) => {
                const locationNew: any = {
                    bannerLocation: {
                        coordinates: [lng, lat]
                    }
                }
                console.log('Successfully got latitude and longitude', locationNew)
                let split_address = address;
                if (address?.length && address.indexOf(',')) {
                    split_address = address.split(',')[0];
                }
                setStateData((prevData: any) => ({ ...prevData, ...locationNew, selectedMapLocation: split_address, isMapLocationSelected: true }))
            }
            );
        setStateData((prevData: any) => ({ ...prevData, selectedMapLocation: address, isMapLocationSelected: true }))
        setInputFocus2(false);
        document.getElementById("location-input-tag")?.blur();
    }

    const getCurrentLocation = (e: any) => {
        e.preventDefault();

        const showPosition = (position: any) => {
            var address: string;
            const locationNew: any = {
                //use current location in input tag when selected
                bannerLocation: {
                    coordinates: []
                }
            }
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            locationNew.bannerLocation.coordinates[0] = long;
            locationNew.bannerLocation.coordinates[1] = lat;
            var latlng = new google.maps.LatLng(lat, long);
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: latlng }, function (results, status) {
                if (status !== google.maps.GeocoderStatus.OK) {
                    alert(status);
                }
                // This is checking to see if the Geoeode Status is OK before proceeding
                if (status === google.maps.GeocoderStatus.OK) {
                    setInputFocus2(false);
                    document.getElementById("current-location-search-div")?.blur();
                    console.log({
                        results
                    })
                    address = (results[1].formatted_address);
                    setStateData((prevData: any) => ({ ...prevData, ...locationNew, selectedMapLocation: address, isMapLocationSelected: true, locationDenied: false }));
                }
            });
        }

        const showError = (error: any) => {
            if (error.code == error.PERMISSION_DENIED) {
                setStateData((prevData: any) => ({ ...prevData, bannerLocation: '', locationDenied: true }));
            }
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }
    }

    const onError = (status: string, clearSuggestions: Function) => {
        console.log('Google Maps API returned error with status: ', status)
        clearSuggestions();
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!stateData?.isSearchedJobSelected) {
            newErrors.searchedJob = Constants.errorStrings.bannerSearchJob;
        } else if (!stateData?.searchedJob) {
            newErrors.searchedJob = Constants.errorStrings.bannerSearchJobEmpty;
        } else {
            const searchJobRegex = new RegExp(regex.alphaSpecial);
            if (!searchJobRegex.test(stateData.searchedJob.trim())) {
                newErrors.searchedJob = Constants.errorStrings.bannerSearchJob;
            }
        }

        if (!stateData?.isMapLocationSelected && stateData?.selectedMapLocation) {
            newErrors.selectedMapLocation = Constants.errorStrings.bannerSearchLocation;
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }


    const setItemSearch = (item: any) => {
        setStateData(item);
        setSelectedTrade({});
        setSearchText(item?.name || '');
    }

    const bannerSearchClicked = () => {
        if (validateForm()) {
            const data = {
                // page: stateData?.page,
                page: 1,
                isFiltered: false,
                tradeId: stateData?.tradeId,
                location: stateData?.bannerLocation ? stateData?.bannerLocation : stateData?.location,
                specializationId: stateData?.specializationId,
                ...(stateData?.from_date && { from_date: stateData?.from_date }),
                ...(stateData?.to_date && { to_date: stateData?.to_date }),
                // to_date: stateData?.to_date,
                // sortBy: 2,
            }
            props.postHomeSearchData(data)
            props.history.push('search-tradie-results')
        }
        // alert("Under construction!!")
    }

    let searchedJob: string = stateData?.searchedJob || '';
    console.log({ stateData, inputFocus1, searchedJob: !stateData?.searchedJob, cross: !!stateData?.searchedJob }, '--- before-----');
    console.log({ searchedJob: searchedJob, isTrue: !stateData?.searchedJob && inputFocus1 })
    return (
        <div className="home_search">
            <button className="modal_srch_close">
                <img src={close} alt="close" />
            </button>
            <form className="search_wrapr">
                <ul>
                    <li className="categ_box">
                        <div className="text_field" id="text-field-div">
                            <input
                                type="text"
                                ref={searchRef}
                                placeholder="What jobs are you after?"
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    props.getSearchJobList(e.target.value)
                                }}
                                onFocus={() => { setInputFocus1(true) }}
                            />
                            <div className="border_eff"></div>
                            <span className="detect_icon_ltr">
                                <img src={Searchicon} alt="search" />
                            </span>
                            {searchText?.length && inputFocus1 ? (
                                <span className="detect_icon" >
                                    <img
                                        src={cross}
                                        alt="cross"
                                        onClick={() => {
                                            // clear here
                                            setItemSearch({});
                                        }} />
                                </span>
                            ) : null}
                        </div>
                        {!!errors.searchedJob && <span className="error_msg">{errors.searchedJob}</span>}
                    </li>
                    {!searchText?.length && inputFocus1 ? recentJobSearches() : null}
                    {searchText?.length && inputFocus1 ? renderJobResult() : null}

                    {/* {'location search start here!'} */}
                    <li className="loc_box">
                        <div id="location-text-field-div">
                            <div><div className="text_field">
                                <input type="text" placeholder="Where?" className="line-1" id="location-input-tag" value={addressText} />
                                <span className="detect_icon_ltr">
                                    <img src={Location} alt="location" />
                                </span>
                            </div>
                            </div>

                            {/* <PlacesAutocomplete
                                value={addressText}
                                onChange={(item:any) => {
                                    console.log(item,'-----address');
                                    setAddressText(item);
                                }}
                                // onChange={(city: string) => setStateData((prevData: any) => ({ ...prevData, selectedMapLocation: city, isMapLocationSelected: false }))}
                                shouldFetchSuggestions={true}
                                onSelect={locationSelectedHandler}
                                highlightFirstSuggestion={true}
                                // searchOptions={{ types: ['(cities)'] }}
                                onError={onError}
                                debounce={400}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
                                    <div>
                                        <div className="text_field">
                                            <input
                                                {...getInputProps({ placeholder: 'Where?', className: 'line-1' })}
                                                id="location-input-tag"
                                                ref={locationRef}
                                                onFocus={() => setInputFocus2(true)}
                                            />
                                            <span className="detect_icon_ltr">
                                                <img src={Location} alt="location" />
                                            </span>
                                            {stateData?.selectedMapLocation && inputFocus2 && <span className="detect_icon" >
                                                <img src={cross} alt="cross" onClick={() => setStateData((prevData: any) => ({ ...prevData, selectedMapLocation: '' }))} />
                                            </span>}
                                        </div>
                                        {suggestions?.length > 0 && stateData?.selectedMapLocation && inputFocus2 && <div className="custom_autosuggestion location" id="autocomplete-dropdown-container">
                                            <div className="flex_row recent_search auto_loc">
                                                <div className="flex_col_sm_4">
                                                    {!!errors.selectedMapLocation && <span className="error_msg">{errors.selectedMapLocation}</span>}
                                                    {loading && <div>Loading...</div>}
                                                    {suggestions.map((suggestion: any) => {
                                                        const className = 'autosuggestion_icon card loc name';
                                                        const style = suggestion.active
                                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                        return (
                                                            <div
                                                                {...getSuggestionItemProps(suggestion, {
                                                                    className,
                                                                    style,
                                                                })}
                                                            >

                                                                <span>{suggestion.formattedSuggestion.mainText}</span>
                                                                <span className="name">{suggestion.formattedSuggestion.secondaryText}</span>

                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>}
                                    </div>
                                )}
                            </PlacesAutocomplete>
                         */}
                        </div>
                        {!!errors.selectedMapLocation && <span className="error_msg">{errors.selectedMapLocation}</span>}
                    </li>
                    {/* {'location search end here!'} */}

                    {!stateData?.selectedMapLocation && inputFocus2 &&
                        <div className="custom_autosuggestion location" id="current-location-search-div">
                            <span className="location-btn" onClick={getCurrentLocation}>
                                <span className="gps_icon">
                                    <img src={icgps} alt="" />
                                </span> Use my current location
                            </span>
                            {stateData?.locationDenied && <span className="blocked_note">
                                You have blocked your location.
                                To use this, change your location settings in browser.
                              </span>}
                        </div>
                    }
                    <li>
                        <div
                            ref={calenderRef}
                            className="custom_date_range" id="date-range-div">
                            <div className="text_field">
                                <span className="detect_icon_ltr calendar"></span>
                                <input type="text" placeholder={stateData?.startDate ? `${stateData?.startDate} - ${stateData?.endDate}` : "When?"} onFocus={() => setInputFocus3(true)} />
                                {stateData?.startDate && inputFocus3 &&
                                    <span className="detect_icon" >
                                        <img
                                            src={cross}
                                            alt="cross"
                                            onClick={() => {
                                                // cleanInputData
                                            }} />
                                    </span>}
                            </div>
                            {/* {inputFocus3 && */}
                            {inputFocus3 ? (
                                <div
                                    className="custom_autosuggestion"
                                    id="custom-date-range-div">
                                    <DateRange
                                        onChange={handleCalenderRange}
                                        ranges={[calenderRange1]}
                                        moveRangeOnFirstSelection={false}
                                        rangeColors={["#fee600", "#b5b5b5"]}
                                        showDateDisplay={false}
                                        showSelectionPreview={true}
                                        months={2}
                                        showPreview={true}
                                        minDate={new Date()}
                                        direction="horizontal"
                                        fixedHeight={true}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </li>
                    <div className="search_btn">
                        <button type="button" className="fill_btn" onClick={bannerSearchClicked}>
                            <img src={search} alt="search" />
                        </button>
                    </div>
                </ul>
            </form>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        searchJobListData: state.homeSearch.searchJobListData,
        recentSearchJobData: state.homeSearch.recentSearchJobData,
        homeSearchJobData: state.homeSearch.homeSearchJobData,
        tradeListData: state.auth.tradeListData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getSearchJobList,
        getRecentSearchList,
        postHomeSearchData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BannerSearch);