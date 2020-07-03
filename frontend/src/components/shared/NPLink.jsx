
import React from 'react'
import { Link } from 'react-router-dom'

import thunRouting from '../../utils/routing'

const NPLink = ({ to, routeName, text }) => <>
    <Link
        to={routeName ? thunRouting.getPathByRouteName(routeName) : to}
    >
        {text}
    </Link>
</>

export default NPLink
