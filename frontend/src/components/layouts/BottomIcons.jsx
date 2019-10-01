
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import {
    withStyles,
    BottomNavigation,
    BottomNavigationAction
} from '@material-ui/core/'

import { 
    Home as HomeIcon,
    ArrowUpward as ArrowUpwardIcon,
    Person as PersonIcon
} from '@material-ui/icons/'


const styles = (theme) => ({
    bottomIcons: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 1)' 
    }
})

const BottomIcons = ({ classes, history, match: { path } }) => {
    const [value, setValue] = React.useState(path)

    const handleChange = (e, newValue) => {
        setValue(newValue)
        history.push(newValue)
    }

    return <>
        <BottomNavigation value={value} onChange={handleChange} className={classes.bottomIcons}>
            <BottomNavigationAction value="/" icon={<HomeIcon />} />
            <BottomNavigationAction value="/upload" icon={<ArrowUpwardIcon />} />
            <BottomNavigationAction value="/profile" icon={<PersonIcon />} />
        </BottomNavigation>
    </>
}

const mapStateToProps = (state) => ({ state })

export default withStyles(styles)(connect(mapStateToProps)(withRouter(BottomIcons)))
