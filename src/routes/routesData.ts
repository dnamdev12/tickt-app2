import Home from '../pages/home/home';
import Login from '../pages/login/login';
import NotFound from '../pages/notFound/notFound';
import Signup from '../pages/signup';
import ForgerPassword from '../pages/forgetPassword/forgetPassword';
import PostJob from '../pages/postJob';
// @ts-ignore
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

const routes = [
    {
        name: 'main',
        path: '/',
        exact: true,
        component: Home
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        authRoute: true
    },
    {
        name: 'signup',
        path: '/signup',
        component: Signup,
        authRoute: true,
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
        authRoute: true,
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
