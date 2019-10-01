
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia';

import ReactPlayer from 'react-player'

const styles = (theme) => ({
    player: {
        
    },
})

const Player = ({ classes, videoURL }) => <>

        <ReactPlayer 
            className={classes.player}
            url={videoURL} 
            playing={false}
            controls 
            width='100%'
            height='100%'
        />
    
</>

  
export default withStyles(styles)(Player)