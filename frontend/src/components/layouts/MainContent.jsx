
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'

// layout elements
import Filters from './Filters'
import Results from './Results'
import UploadButton from '../shared/UploadButton'

const styles = (theme) => ({
    mainContent: {
        marginTop: theme.spacing(3)
    }
})

const MainContent = ({ classes }) => <>

    <section className={classes.mainContent}>
        <Filters />
        <Results />
        <UploadButton/>
    </section>

</>
  
export default withStyles(styles)(MainContent)
