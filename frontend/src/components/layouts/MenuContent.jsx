
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'

// import { connect } from 'react-redux'

import {
    FormControl,
    FormGroup,
    FormControlLabel
} from '@material-ui/core'

import Toggler from '../shared/Toggler'

const styles = (theme) => ({
    menuContent: {
        flexGrow: '1',
        padding: theme.spacing(4)
    },
    settingsRight: {
        display: 'flex',
        flexDirection: 'row-reverse' 
    }
})

const MenuContent = ({ classes }) => <>
    <div className={classes.menuContent}>
        <div className={classes.settingsRight}>
            <FormControl className={classes.toggleNotifications} component="fieldset">
                    <FormGroup>
                        <FormControlLabel
                            // control={<Toggler toggleFunc={() => setToggleSettings(!notifications)} />}
                            control={<Toggler type="notifications" />}
                            label="notificaciones"
                            labelPlacement="start"
                        />
                    </FormGroup>
            </FormControl>
        </div>
    </div>
</>

// const mapsStateToProps = ({ loggedInUser: { settings: { notifications } } }) => ({ notifications })
export default withStyles(styles)(MenuContent)
