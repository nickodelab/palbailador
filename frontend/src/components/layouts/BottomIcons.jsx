
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
        bottom: 0    
    }

})

const BottomIcons = (props) => {
    const { classes, history, match: { path } } = props
    const [value, setValue] = React.useState(path)

    console.log('value', value)

    const handleChange = (event, newValue) => {
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
