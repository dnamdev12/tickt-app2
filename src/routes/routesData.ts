import Home from '../pages/home/home';
import Login from '../pages/login/login';
import NotFound from '../pages/notFound/notFound';
import Signup from '../pages/signup';
import ForgerPassword from '../pages/forgetPassword/forgetPassword';
import PostJob from '../pages/postJob';
import TradieHome from '../pages/home/tradieHome';
import Guest from '../pages/home/guestLogin';
import JobsData from '../pages/home/tradieHome/components/jobsData/index';
import SearchResults from '../pages/home/tradieHome/components/searchResults/index';
// @ts-ignore
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

const routes = [
    {
        name: 'main',
        path: '/',
        exact: true,
        component: Home,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        authRoute: true,
        privateRoute: false,
    },
    {
        name: 'signup',
        path: '/signup',
        component: Signup,
        authRoute: true,
        privateRoute: false,
    },
    {
        name: 'forgetpassword',
        path: '/reset-password',
        component: ForgerPassword,
        authRoute: true,
    },
    {
        name: 'postnewjob',
        path: '/post-new-job',
        component: PostJob,
        // authRoute: true,
    },
    {
        name: 'tradiehome',
        path: '/tradie',
        component: TradieHome,
    },
    {
        name: 'recommendedjobs',
        path: '/recommended-jobs',
        component: JobsData,
    },
    {
        name: 'viewmorejobs',
        path: '/jobs-in-your-area',
        component: JobsData,
    },
    {
        name: 'searchresults',
        path: '/search-results',
        component: SearchResults,
    },
    {
        name: 'guest',
        path: '/guest-guest',
        component: Guest,
    },
    {
        name: 'linkedin-oauth',
        path: '/linkedin',
        component: LinkedInPopUp
    },
    {
        name: 'notFound',
        path: '/404',
        component: NotFound
    },
    {
        name: '404',
        path: '/*',
        redirectTO: '/404'
    }
]

export default routes
