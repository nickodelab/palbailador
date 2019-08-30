
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'

// layout elements
import Filters from './Filters'
import Results from './Results'
import MobileMenu from './MobileMenu'
import UploadButton from './UploadButton'

const styles = {}

const Home = ({ classes }) => <>

            <MobileMenu />
            <Filters />
            <Results />
            <UploadButton/>

</>
  
export default withStyles(styles)(Home)
