
import React from 'react' 
import { withStyles } from '@material-ui/core'

import UploadButton from './UploadButton'
import ProfileButton from './ProfileButton'
import HomeButton from './HomeButton'

const styles = theme => ({

    bottomIcons: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(4),
        cursor: 'pointer'
    }
})

const BottomIcons = ({ classes, history }) => <>
    <section className={classes.bottomIcons}>
        <UploadButton className={classes.uploadButton}/>
        <ProfileButton className={classes.profileButton}/>
        <HomeButton className={classes.homeButton}/>
    </section>

</>

export default withStyles(styles)(BottomIcons)
