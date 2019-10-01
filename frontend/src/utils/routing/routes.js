
import Home from '../../components/layouts/Home'
import Upload from '../../components/layouts/Upload'
import SignUp from '../../components/pages/SignUp'
import Login from '../../components/pages/Login'
import Profile from '../../components/pages/Profile'
import Thanks from '../../components/pages/Thanks'

import Page2Sections from '../../components/layouts/Page2Sections'

const URLS = [
    { name: 'home', url: '/' },
    { name: 'upload', url: '/upload' },
    { name: 'register', url: '/register' },
    { name: 'login', url: '/login' },
    { name: 'profile', url: '/profile' },
    { name: 'vok', url: '/vok' }
]

const routes = [
    {
        url: URLS.find(({ name }) => name === 'home').url,
        Component: Home,
        exact: true
    },
    {
        url: URLS.find(({ name }) => name === 'upload').url,
        Component: Upload,
        exact: true,
        Layout: Page2Sections
    },
    {
        url: URLS.find(({ name }) => name === 'register').url,
        Component: SignUp,
        exact: true
    },
    {
        url: URLS.find(({ name }) => name === 'login').url,
        Component: Login,
        exact: true
    },
    {
        url: URLS.find(({ name }) => name === 'profile').url,
        Component: Profile,
        exact: true
    },
    {
        url: URLS.find(({ name }) => name === 'vok').url,
        Component: Thanks,
        exact: true
    },
]

export default routes
