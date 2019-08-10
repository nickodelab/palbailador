
import React from 'react' 
import { Zoom, Fab } from '@material-ui/core'

import { withRouter } from 'react-router-dom'

import { Add as AddIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    uploadButton: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
})

const UploadButton = ({ classes, history }) => <>

    <Zoom
        in={true}
        timeout={1000}
        unmountOnExit
    >
        <Fab 
            aria-label="upload video" 
            className={classes.uploadButton} 
            color="primary"
            onClick={() => history.push('/upload')}
        >
            <AddIcon />
        </Fab>
    </Zoom>
      
</>

export default withStyles(styles)(withRouter(UploadButton))
