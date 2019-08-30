
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'

import ReactPlayer from 'react-player'

const styles = {}

const Player = ({ videoURL }) => 
    <ReactPlayer 
        url={videoURL} 
        playing 
    />

  
export default withStyles(styles)(Player)
