
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'

// layout elements
import MobileMenu from './MobileMenu'
import UploadForm from './UploadForm'

const styles = theme => ({
    upload: {
        marginTop: theme.spacing(10)
    }
})

const Upload = ({ classes }) => <>
    <section className={classes.upload}>
            <MobileMenu />
            <UploadForm />
    </section>

</>
  
export default withStyles(styles)(Upload)
