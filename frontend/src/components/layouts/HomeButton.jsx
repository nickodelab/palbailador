
import React from 'react' 
import { Zoom, Fab } from '@material-ui/core'

import { withRouter } from 'react-router-dom'

import { Home as HomeIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    homeButton: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(20)
    }
})

const HomeButton = ({ classes, history }) => <>

    <Zoom
        in={true}
        timeout={1000}
        unmountOnExit
    >
        <Fab 
            aria-label="upload video" 
            className={classes.homeButton} 
            color="primary"
            onClick={() => history.push('/')}
        >
            <HomeIcon />
        </Fab>
        
    </Zoom>
      
</>

export default withStyles(styles)(withRouter(HomeButton))
