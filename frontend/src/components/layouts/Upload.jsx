
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'

// layout elements
import Filters from './Filters'
import Results from './Results'
import MobileMenu from './MobileMenu'
import UploadButton from '../shared/UploadButton'

const styles = {}

const Upload = ({ classes }) => <>

            <MobileMenu />
            <Filters />
            <Results />
            <UploadButton/>

</>
  
export default withStyles(styles)(Upload)
