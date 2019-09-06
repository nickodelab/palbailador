
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'

// layout elements
import MobileMenu from './MobileMenu'
import UploadForm from './UploadForm'
import BottomIcons from './BottomIcons'

const styles = theme => ({
    upload: {
        marginTop: theme.spacing(10)
    }
})

const Upload = ({ classes }) => <>
    <section className={classes.upload}>
            <MobileMenu />
            <UploadForm />
            <BottomIcons />
    </section>

</>
  
export default withStyles(styles)(Upload)
