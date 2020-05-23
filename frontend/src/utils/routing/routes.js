
import BigSidebarLayout from '../../components/layouts/BigSidebarLayout'
import SignUp from '../../components/pages/SignUp'
import Login from '../../components/pages/Login'

const URLS = [
    { name: 'register', url: '/register' },
    { name: 'login', url: '/login' }
]

const routes = [
    {
        url: URLS.find(({ name }) => name === 'register').url,
        name: 'register',
        Component: SignUp,
        Layout: BigSidebarLayout,
        exact: true,
        isPublic: true
    },
    {
        url: URLS.find(({ name }) => name === 'login').url,
        name: 'login',
        Component: Login,
        Layout: BigSidebarLayout,
        exact: true,
        isPublic: true
    }
]

export default routes
