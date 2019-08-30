
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'

const styles = {
    error: {
        backgroundColor: 'red'
    },
    success: {
        backgroundColor: 'green'
    }
}

const Alert = ({ message, level, classes }) => <>

    <section className={classes[level]}>      
        {message}
    </section>

</>
  
export default withStyles(styles)(Alert)
