import Home from '../../components/layouts/Home'
import Upload from '../../components/layouts/Upload'
import SignUp from '../../components/pages/SignUp'
import Login from '../../components/pages/Login'
import Profile from '../../components/pages/Profile'
import Thanks from '../../components/pages/Thanks'

const routes = [
    {
        path: '/',
        Component: Home,
        redirect: false,
        exact: true,
    },
    {
        path: '/upload',
        Component: Upload,
        redirect: false,
        exact: true,
    },
    {
        path: '/register',
        Component: SignUp,
        redirect: false,
        exact: true,
    },
    {
        path: '/login',
        Component: Login,
        redirect: false,
        exact: true,
    },
    {
        path: '/profile',
        Component: Profile,
        redirect: false,
        exact: true,
    },
    {
        path: '/vok',
        Component: Thanks,
        redirect: false,
        exact: true,
    },
]

export default routes