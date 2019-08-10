
import React from 'react' 

import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
    header: {
        backgroundColor: 'red'
    }
})

const Filters = (classes) => <>
    <section className={classes.header}>
    </section> 
</>
 
export default withStyles(styles)(Filters)
