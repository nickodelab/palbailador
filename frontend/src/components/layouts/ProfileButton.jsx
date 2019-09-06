
import React from 'react' 
import { Zoom, Fab } from '@material-ui/core'

import { withRouter } from 'react-router-dom'

import { Face as FaceIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    ProfileButton: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(12)
    }
})

const ProfileButton = ({ classes, history }) => <>

    <Zoom
        in={true}
        timeout={1000}
        unmountOnExit
    >
        <Fab 
            aria-label="upload video" 
            className={classes.ProfileButton} 
            color="primary"
            onClick={() => history.push('/profile')}
        >
            <FaceIcon />
        </Fab>
        
    </Zoom>
      
</>

export default withStyles(styles)(withRouter(ProfileButton))
