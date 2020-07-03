
// #layouts
import BigSidebarLayout from '../../components/layouts/BigSidebarLayout'
import HomeLayout from '../../components/layouts/HomeLayout'

// #pages
import SignUp from '../../components/pages/SignUp'
import Login from '../../components/pages/Login'
import Home from '../../components/pages/Home'

const URLS = [
    { name: 'register', url: '/register' },
    { name: 'login', url: '/login' },
    { name: 'home', url: '/' },
]

const routes = [
    {
        path: URLS.find(({ name }) => name === 'register').url,
        name: 'register',
        Component: SignUp,
        Layout: BigSidebarLayout,
        exact: true,
        isPublic: true
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
        Layout: HomeLayout,
        exact: true,
        isPublic: false
    }
]

export default routes
