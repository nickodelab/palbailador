
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

import thunRouting from '../../utils/routing'

const NPLink = ({ to, children, routeName }) => <>
    <Link
        component={React.forwardRef((props, ref) => <RouterLink
            innerRef={ref}
            href={routeName ? thunRouting.getPathByRouteName(routeName) : to}
            {...props}
        />)}
    >
        {children}
    </Link>
</>

export default NPLink
