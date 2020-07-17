
// #layouts
import BigSidebarLayout from '../../components/layouts/BigSidebarLayout';
import MainLayout from '../../components/layouts/MainLayout';

// #pages
import SignUp from '../../components/pages/SignUp';
import Login from '../../components/pages/Login';
import Home from '../../components/pages/Home';
import Upload from '../../components/pages/Upload';

const URLS = [
    { name: 'register', url: '/register' },
    { name: 'login', url: '/login' },
    { name: 'home', url: '/' },
    { name: 'upload', url: '/upload' },
];

const routes = [
    {
        path: URLS.find(({ name }) => name === 'register').url,
        name: 'register',
        Component: SignUp,
        Layout: BigSidebarLayout,
        exact: true,
        isPublic: true,
    },
    {
        path: URLS.find(({ name }) => name === 'login').url,
        name: 'login',
        Component: Login,
        Layout: BigSidebarLayout,
        exact: true,
        isPublic: true
    },
    {
        path: URLS.find(({ name }) => name === 'home').url,
        name: 'home',
        Component: Home,
        Layout: MainLayout,
        exact: true,
        isPublic: false
    },
    {
        path: URLS.find(({ name }) => name === 'upload').url,
        name: 'upload',
        Component: Upload,
        Layout: MainLayout,
        exact: true,
        isPublic: false
    }
];

export default routes;
