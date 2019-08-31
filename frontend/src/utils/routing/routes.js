import Home from '../../components/layouts/Home'
import Upload from '../../components/layouts/Upload'
import SignUp from '../../components/pages/SignUp'
import Login from '../../components/pages/Login'

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
]

export default routes