import Home from '../../components/layouts/Home'
import Upload from '../../components/layouts/Upload'

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
]

export default routes