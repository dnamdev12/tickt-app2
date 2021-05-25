import { useState, useEffect } from 'react';
import {
    getBuilderProfile,
    getTradieReviewList,
    tradieReviewReply,
    tradieUpdateReviewReply,
    tradieRemoveReviewReply
} from '../../redux/jobs/actions';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import Modal from '@material-ui/core/Modal';
import ReviewInfoBox from '../../common/reviewInfoBox';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import ReactStars from "react-rating-stars-component";

import profilePlaceholder from '../../assets/images/ic-placeholder-detail.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import portfolioPlaceholder from '../../assets/images/portfolio-placeholder.jpg';
import noData from '../../assets/images/no-data.png';
import noDataFound from '../../assets/images/no-data-found.png';
import cancel from "../../assets/images/ic-cancel.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface PropsType {
    location: any,
    history: any,
}

const portfolio = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1, // optional, default to 1.
        paritialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: { max: 1200, min: 768 },
        items: 2,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: { max: 650, min: 0 },
        items: 1,
        paritialVisibilityGutter: 45
    }
};

const portfolioModal = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1200, min: 768 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 650, min: 0 },
        items: 1,
    }
};



const BuilderInfo = (props: PropsType) => {
    const [profileData, setProfileData] = useState<any>('');
    const [portfolioData, setPortfolioData] = useState<any>({
        portfolioImageClicked: false,
        portfolioDetails: '',
    });

    const [reviewList, setReviewList] = useState<Array<any>>([]);
    const [reviewListPageNo, setReviewListPageNo] = useState<number>(1);
    const [reviewsData, setReviewsData] = useState<any>({
        reviewReplyClicked: false,
        showAllReviewsClicked: false,
        submitReviewsClicked: false,
        deleteReviewsClicked: false,
        updateReviewsClicked: false,
        reviewsClickedType: '',
        confirmationClicked: false,
        showReviewReplyButton: true,
        reviewId: '',
        reviewData: '',
        showReviewReply: false,
        replyShownHideList: []
    })
    console.log(reviewsData, "reviewData");

    useEffect(() => {
        (async () => {
            const builderId: any = new URLSearchParams(props.location?.search).get('builderId');
            const res1 = await getBuilderProfile(builderId);
            if (res1?.success) {
                setProfileData(res1.data);
                const data = {
                    builderId: res1.data?.builderId,
                    page: 1
                }
                const res2 = await getTradieReviewList(data);
                if (res2.success) {
                    setReviewList(res2.data);
                }
            }
        })();
    }, [])

    const portfolioImageHandler = (data: any) => {
        setPortfolioData((prevData: any) => ({ ...prevData, portfolioImageClicked: true, portfolioDetails: data }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, type: string) => {
        if (e.target.value.trim().length <= 250) {
            setReviewsData((prevData: any) => ({ ...prevData, [type]: e.target.value }))
        }
    }

    const modalCloseHandler = (modalType: string) => {
        setReviewsData((prevData: any) => ({ ...prevData, [modalType]: false, deleteReviewsClicked: false }))
    }

    const submitReviewHandler = async (type: string) => {
        if (['reviewReply', 'updateReviewReply', 'removeReviewReply'].includes(type)) {
            var response;
            var newData: any = reviewsData.replyShownHideList;
            if (type == 'reviewReply') {
                const data = {
                    reviewId: reviewsData.reviewId,
                    reply: reviewsData.reviewData
                }
                response = await tradieReviewReply(data);
            }
            if (type == 'updateReviewReply') {
                const data = {
                    reviewId: reviewsData.reviewId,
                    replyId: reviewsData.replyId,
                    reply: reviewsData.reviewData
                }
                response = await tradieUpdateReviewReply(data);
            }
            if (type == 'removeReviewReply') {
                const data = {
                    reviewId: reviewsData.reviewId,
                    replyId: reviewsData.replyId
                }
                response = await tradieRemoveReviewReply(data);
            }
            if (response?.success) {
                const data: any = {
                    builderId: profileData?.builderId,
                    page: 1
                }
                const res = await getTradieReviewList(data);
                setReviewList(res.data);
                newData = [...reviewsData.replyShownHideList].filter(id => id !== reviewsData.replyId);
            }
            setReviewsData((prevData: any) => ({
                ...prevData,
                submitReviewsClicked: false,
                reviewReplyClicked: false,
                showAllReviewsClicked: true,
                confirmationClicked: false,
                reviewsClickedType: '',
                deleteReviewsClicked: false,
                updateReviewsClicked: false,
                reviewId: '',
                reviewData: '',
                replyShownHideList: newData
            }))
        }
    }

    const reviewHandler = (type: string, reviewId?: string, replyId?: string, reply?: string) => {
        if (type == 'reviewReplyClicked') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                reviewReplyClicked: true,
                showAllReviewsClicked: false,
                // reviewsClickedType: type,
                reviewId: reviewId,
            }));
        } else if (type == 'reviewReply') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                submitReviewsClicked: true,
                reviewsClickedType: type,
                confirmationClicked: true
            }));
        } else if (type == 'removeReviewReply') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                confirmationClicked: true,
                deleteReviewsClicked: true,
                reviewId: reviewId,
                replyId: replyId,
                reviewsClickedType: type
            }));
        } else if (type == 'updateReviewReply') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                reviewReplyClicked: true,
                updateReviewsClicked: true,
                reviewId: reviewId,
                replyId: replyId,
                reviewsClickedType: type,
                showAllReviewsClicked: false,
                reviewData: reply
            }));
        } else if (type == 'replyCancelBtnClicked') {
            setReviewsData((prevData: any) => ({
                ...prevData,
                reviewReplyClicked: false,
                updateReviewsClicked: false,
                deleteReviewsClicked: false,
                showAllReviewsClicked: true,
                reviewData: '',
                reviewsClickedType: '',
                reviewId: '',
            }));
        } else if (type == 'hideReviewClicked') {
            const newData = [...reviewsData.replyShownHideList].filter(id => id !== replyId);
            setReviewsData((prevData: any) => ({ ...prevData, replyShownHideList: newData }));
        } else if (type == 'showReviewClicked') {
            const newData = [...reviewsData.replyShownHideList];
            newData.push(replyId);
            setReviewsData((prevData: any) => ({ ...prevData, replyShownHideList: newData }));
        }
    }

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="vid_img_wrapper pt-20">
                        <div className="flex_row">
                            <div className="flex_col_sm_8 relative">
                                <button className="back" onClick={() => props.history?.goBack()}></button>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <figure className="vid_img_thumb">
                                    <img src={profilePlaceholder} alt="profile-pic" />
                                </figure>
                            </div>
                            <div className="flex_col_sm_4 relative">
                                <div className="detail_card">
                                    <span className="title">{profileData?.builderName}</span>
                                    <span className="tagg">{profileData?.position}</span>
                                    <span className="xs_sub_title">{profileData?.companyName}</span>
                                    <ul className="review_job">
                                        <li>
                                            <span className="icon reviews">{profileData?.ratings}</span>
                                            <span className="review_count">{`${profileData?.reviewsCount} reviews`}</span>
                                        </li>
                                        <li>
                                            <span className="icon job">{profileData?.jobCompletedCount}</span>
                                            <span className="review_count"> jobs completed</span>
                                        </li>
                                    </ul>
                                    <button className="fill_btn full_btn">Write a message</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row description">
                            <div className="flex_col_sm_8">
                                <div>
                                    <span className="sub_title">About</span>
                                    <p className="commn_para">{profileData?.about}</p>
                                </div>
                            </div>
                            <div className="flex_col_sm_4">
                                <span className="sub_title">Areas of jobs</span>
                                <div className="tags_wrap">
                                    <ul>
                                        {profileData?.areasOfjobs?.map((item: any) => {
                                            return <li key={item.specializationId}>{item.specializationName}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">Portfolio</span>
                    {/* <ul className="portfolio_wrappr"> */}
                    <Carousel
                        responsive={portfolio}
                        showDots={false}
                        arrows={true}
                        infinite={true}
                        className="portfolio_wrappr"
                        partialVisbile
                    >
                        {profileData?.portfolio?.length ? profileData?.portfolio?.map((item: any) => {
                            return (
                                <div className="media" key={item.portfolioId} onClick={() => portfolioImageHandler(item)}>
                                    <figure className="portfolio_img">
                                        <img src={item.portfolioImage?.length ? item.portfolioImage[0] : portfolioPlaceholder} alt="portfolio-images" />
                                        <span className="xs_sub_title">{item.jobName}</span>
                                    </figure>
                                </div>
                            )
                        }) : <img alt="" src={portfolioPlaceholder} />}

                    </Carousel>
                    {/* </ul> */}
                </div>
            </div>
            {/* portfolio Image modal desc */}
            {portfolioData.portfolioImageClicked &&
                <Modal
                    className="custom_modal"
                    open={portfolioData.portfolioImageClicked}
                    onClose={() => setPortfolioData((prevData: any) => ({ ...prevData, portfolioImageClicked: false }))}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh portfolio_preview" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <button className="close_btn">
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_6">
                                <Carousel
                                    responsive={portfolioModal}
                                    showDots={true}
                                    infinite={true}
                                    autoPlay={true}
                                    arrows={false}
                                    className="portfolio_wrappr"
                                >
                                    {portfolioData?.portfolioDetails ? portfolioData?.portfolioDetails?.portfolioImage?.map((image: string) => {
                                        return (
                                            <div className="media" key={portfolioData?.portfolioDetails?.portfolioId}>
                                                <figure className="portfolio_img">
                                                    <img src={image ? image : portfolioPlaceholder} alt="portfolio-images" />
                                                </figure>
                                            </div>
                                        )
                                    }) : <img alt="" src={portfolioPlaceholder} />}
                                </Carousel>
                            </div>
                            <div className="flex_col_sm_6">
                                <span className="xs_sub_title">Job Description</span>
                                <div className="job_content">
                                    <p>Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.
                                    Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.
                                    Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.</p>
                                    {/* <p>{portfolioData?.portfolioDetails?.jobDescription}</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>}

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">Job posted</span>
                    <div className="flex_row tradies_row">
                        {profileData?.jobPostedData?.length > 0 ?
                            (profileData?.jobPostedData?.slice(0, 4)?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} {...props} key={jobData.jobId} />
                            })) :
                            <div className="no_record">
                                <figure className="no_data_img">
                                    <img src={noDataFound} alt="data not found" />
                                </figure>
                                <span>Data not found</span>
                            </div>}
                    </div>
                    <NavLink to={{
                        pathname: "/builder-posted-jobs",
                        state: { jobsPosted: profileData?.jobPostedData, totalJobPostedCount: profileData?.totalJobPostedCount }
                    }}
                    >
                        <button className="fill_grey_btn full_btn m-tb40 view_more" disabled={profileData?.jobPostedData?.length < 1}>
                            {`View all ${profileData?.totalJobPostedCount ? `${profileData?.totalJobPostedCount} jobs` : ''}`}</button>
                    </NavLink>
                </div>
            </div >

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">Reviews</span>
                    <div className="flex_row review_parent">
                        {profileData?.reviewData?.length > 0 ?
                            (profileData?.reviewData?.slice(0, 8)?.map((jobData: any) => {
                                return <ReviewInfoBox item={jobData} {...props} />
                            })) :
                            <div className="no_record">
                                <figure className="no_data_img">
                                    <img src={noDataFound} alt="data not found" />
                                </figure>
                                <span>Data not found</span>
                            </div>}
                    </div>
                    <button className="fill_grey_btn full_btn view_more" onClick={() => setReviewsData((prevData: any) => ({ ...prevData, showAllReviewsClicked: true }))}>{`View all ${profileData?.reviewsCount} reviews`}</button>
                </div>
            </div>
            {/* view total reviews  */}
            {reviewsData.showAllReviewsClicked && reviewList?.length > 0 &&
                <Modal
                    className="ques_ans_modal"
                    open={reviewsData.showAllReviewsClicked}
                    onClose={() => modalCloseHandler('showAllReviewsClicked')}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <span className="sub_title">{`${reviewList?.length || 0} reviews`}</span>
                            <button className="close_btn" onClick={() => modalCloseHandler('showAllReviewsClicked')}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="inner_wrap">
                            {reviewList?.map((item: any) => {
                                const { reviewData } = item;
                                return (
                                    <div key={reviewsData.reviewId}>
                                        <div className="question_ans_card" key={reviewData.reviewId}>
                                            <div className="user_detail">
                                                <figure className="user_img">
                                                    <img src={reviewData?.userImage || dummy} alt="user-img" />
                                                </figure>
                                                <div className="details">
                                                    <span className="user_name">{reviewData?.userName}</span>
                                                    <span className="date">{reviewData?.date}</span>
                                                </div>
                                                <div className="rating_star">
                                                    <ReactStars
                                                        count={5}
                                                        value={3}
                                                        size={20}
                                                        edit={false}
                                                        isHalf={true}
                                                        emptyIcon={<i className="far fa-star"></i>}
                                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                        fullIcon={<i className="fa fa-star"></i>}
                                                        activeColor="#ffd700"
                                                    />
                                                </div>
                                            </div>
                                            <p>{reviewData?.review}</p>
                                            {Object.keys(reviewData?.replyData).length > 0 && !(reviewsData.replyShownHideList.includes(reviewData?.replyData?.reviewId) || reviewsData.replyShownHideList.includes(reviewData?.replyData?.replyId)) &&
                                                <span className="show_hide_ans link"
                                                    onClick={() => reviewHandler('showReviewClicked', '', reviewData?.replyData?.replyId)}>Show review</span>}
                                            {reviewData?.isModifiable && <span className="action link" onClick={() => reviewHandler('reviewReplyClicked', reviewData.reviewId)}>Reply</span>}
                                        </div>
                                        {reviewData?.replyData?.reply && (reviewsData.replyShownHideList.includes(reviewData?.replyData?.reviewId) || reviewsData.replyShownHideList.includes(reviewData?.replyData?.replyId)) &&
                                            <div className="question_ans_card answer">
                                                <div className="user_detail">
                                                    <figure className="user_img">
                                                        <img src={reviewData?.replyData?.userImage || dummy} alt="user-img" />
                                                    </figure>
                                                    <div className="details">
                                                        <span className="user_name">{reviewData?.replyData?.userName}</span>
                                                        <span className="date">{reviewData?.replyData?.date}</span>
                                                    </div>
                                                </div>
                                                <p>{reviewData?.replyData?.reply}</p>
                                                <span className="show_hide_ans link" onClick={() => reviewHandler('hideReviewClicked', '', reviewData?.replyData?.replyId)}>Hide review</span>
                                                {reviewData?.replyData?.isModifiable && <span className="action link" onClick={() => reviewHandler('updateReviewReply', reviewData?.replyData?.reviewId, reviewData?.replyData?.replyId, reviewData?.replyData?.reply)}>Edit</span>}
                                                {reviewData?.replyData?.isModifiable && <span className="action link" onClick={() => reviewHandler('removeReviewReply', reviewData?.replyData?.reviewId, reviewData?.replyData?.replyId)}>Delete</span>}
                                            </div>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Modal>
            }
            {/* review reply modal */}
            {reviewsData.reviewReplyClicked &&
                <Modal
                    className="ques_ans_modal"
                    open={reviewsData.reviewReplyClicked}
                    onClose={() => modalCloseHandler('reviewReplyClicked')}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <>
                        <div className="custom_wh ask_ques" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                            <div className="heading">
                                <span className="sub_title">{`${reviewsData.updateReviewsClicked ? 'Edit reply' : 'Reply'}`}</span>
                                <button className="close_btn" onClick={() => modalCloseHandler('reviewReplyClicked')}>
                                    <img src={cancel} alt="cancel" />
                                </button>
                            </div>
                            <div className="inner_wrap">
                                <div className="form_field">
                                    <label className="form_label">Your reply</label>
                                    <div className="text_field">
                                        <textarea placeholder="Text" value={reviewsData.reviewData} onChange={(e) => handleChange(e, 'reviewData')}></textarea>
                                    </div>
                                    <span className="char_count">{`${reviewsData.reviewData?.length || '0'}/250`}</span>
                                </div>
                            </div>
                            <div className="bottom_btn custom_btn">
                                {reviewsData.updateReviewsClicked ?
                                    <button className="fill_btn full_btn" onClick={() => submitReviewHandler('updateReviewReply')}>Save</button>
                                    : <button className="fill_btn full_btn" onClick={() => reviewHandler('reviewReply')}>Send</button>}
                                <button className="fill_grey_btn" onClick={() => reviewHandler('replyCancelBtnClicked')}>Cancel</button>
                            </div>
                        </div>
                    </>
                </Modal>
            }
            {/* send confirmation modal */}
            {reviewsData.confirmationClicked &&
                <Modal
                    className="custom_modal"
                    open={reviewsData.confirmationClicked}
                    onClose={() => modalCloseHandler('confirmationClicked')}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <>
                        <div className="custom_wh confirmation" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                            <div className="heading">
                                <span className="sub_title">{`${reviewsData.deleteReviewsClicked ? 'Delete' : reviewsData.updateReviewsClicked ? 'Update' : ''} Reply Confirmation`}</span>
                                <button className="close_btn" onClick={() => modalCloseHandler('confirmationClicked')}>
                                    <img src={cancel} alt="cancel" />
                                </button>
                            </div>
                            <div className="modal_message">
                                <p>{`Are you sure you want to ${reviewsData.deleteReviewsClicked ? 'delete ' : ''}reply?`}</p>
                            </div>
                            <div className="dialog_actions">
                                <button className="fill_btn" onClick={() => submitReviewHandler(reviewsData.reviewsClickedType)}>Yes</button>
                                <button className="fill_grey_btn" onClick={() => modalCloseHandler('confirmationClicked')}>No</button>
                            </div>
                        </div>
                    </>
                </Modal>
            }
        </div >
    )
}

export default BuilderInfo;

{/* <div className="text-center">
    <button className="fill_grey_btn load_more">Load more</button>
</div> */}