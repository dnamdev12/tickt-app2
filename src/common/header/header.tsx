/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { NavLink, useLocation, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import storageService from '../../utils/storageService';
import AuthModal from '../auth/authModal';

import colorLogo from '../../assets/images/ic-logo-yellow.png';
import menu from '../../assets/images/menu-line-white.svg';
import bell from '../../assets/images/ic-notification.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import profile from '../../assets/images/ic-profile.png';
import revenue from '../../assets/images/ic-revenue.png';
import guide from '../../assets/images/ic-tutorial.png';
import savedJobs from '../../assets/images/ic-job.png';



const DISABLE_HEADER = ['/signup', '/login', '/reset-password', '/404'];

const Header = (props: any) => {
    const [userType, setUserType] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showHeader, setShowHeader] = useState<boolean>(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    // const USER_TYPE = storageService.getItem('userType');

    let { pathname } = useLocation();
    let history = useHistory();

    useEffect(() => {
        props.callTradieProfileData();
        let type: any = storageService.getItem('userType');
        if (type === 2) {
            props.getProfileBuilder();
        }
    }, [])

    useEffect(() => {
        if (DISABLE_HEADER.includes(pathname)) {
            setShowHeader(false)
        } else {
            setShowHeader(true)
        }
        setUserType(storageService.getItem('userType'))
    }, [pathname, storageService.getItem('userType')])

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () => {
        storageService.removeItem("jwtToken")
        storageService.removeItem("guestToken")
        storageService.removeItem("userType")
        history.push('/login')
    }

    const postClicked = () => {
        // return;
        setToggleMenu(false);
        setActiveLink('post');
        history.push('/post-new-job')
    }

    const jobClick = () => {
        // return;
        setToggleMenu(false);
        if (userType === 1) {
            setActiveLink('jobs');
            history.push('/applied-jobs');
        } else if (userType === 2) {
            setActiveLink('jobs');
            history.push('/jobs')
        }
    }
    console.log({props},'---->')
    return (
        <>
            {showHeader && <header id="header">
                <div className="custom_container">
                    <div className="flex_headrow">
                        <div className="brand_wrap">
                            <figure>
                                <img
                                    onClick={() => {
                                        setActiveLink('');
                                        setToggleMenu(false);
                                        props.history.push('/');
                                    }}
                                    src={colorLogo}
                                    alt="logo" />
                            </figure>
                        </div>
                        <ul className={`center_nav ${toggleMenu ? 'active' : ''}`}>
                            <li>
                                <a className={activeLink === 'discover' ? 'active' : ''}>
                                    {'Discover'}
                                </a>
                            </li>
                            <li>
                                <a className={activeLink === 'jobs' ? 'active' : ''} onClick={jobClick}>
                                    {'Jobs'}
                                </a>
                            </li>
                            {userType === 2 &&
                                <li>
                                    <a className={activeLink === 'post' ? 'active' : ''} onClick={postClicked}>
                                        {'Post'}
                                    </a>
                                </li>}
                            <li>
                                <a className={activeLink === 'chat' ? 'active' : ''}>
                                    {'Chat'}
                                </a>
                            </li>
                        </ul>
                        <ul className="side_nav">
                            <li className="mob_nav">
                                <img
                                    src={menu}
                                    alt="menu"
                                    onClick={() => { setToggleMenu(!toggleMenu) }} />
                            </li>
                            <div className="profile_notification">
                                {storageService.getItem("jwtToken") && <div className="notification_bell">
                                    <figure className="bell">
                                        <span className="badge">4 </span>
                                        <img src={bell} alt="notify" />
                                    </figure>
                                </div>}
                                <div className="user_profile">
                                    {storageService.getItem("jwtToken") &&
                                        <figure aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                            <img src={props?.builderProfile?.userImage || dummy} alt="profile-img" />
                                        </figure>}
                                    <Menu className="sub_menu"
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                          }}
                                    >
                                        {/* <span className="sub_title">{props.tradieProfileData?.userName}</span> */}
                                        <span className="sub_title">
                                            {props?.builderProfile?.userName || ''}
                                        </span>
                                        <MenuItem onClick={handleClose}>
                                            <span className="setting_icon">
                                                <img src={props?.builderProfile?.userImage || profile} alt="profile" />
                                                {'My Profile'}
                                            </span>
                                        </MenuItem>
                                        {/* <MenuItem onClick={handleClose}>
                                            <span className="setting_icon">
                                            <img src={revenue} alt="revenue" />
                                                {'My revenue'}
                                            </span>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <span className="setting_icon">
                                            <img src={savedJobs} alt="savedJobs" />
                                                {'Saved jobs'}
                                            </span>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <span className="setting_icon">
                                            <img src={guide} alt="guide" />
                                                {'App Guide'}
                                            </span>
                                        </MenuItem> */}
                                        <MenuItem onClick={handleClose}>
                                            <span className="setting_icon logout" onClick={logoutHandler}>Logout</span>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            {!storageService.getItem("jwtToken") &&
                                <li>
                                    <a className="active" onClick={() => setShowModal(!showModal)}>
                                        {'Log in'}
                                    </a>
                                </li>}
                            <AuthModal
                                showModal={showModal}
                                setShowModal={setShowModal}
                                history={props.history}
                                firstTimePopup>
                                {props.children}
                            </AuthModal>
                        </ul>
                    </div>
                </div>
            </header>}
        </>
    )
}

export default withRouter(Header);
