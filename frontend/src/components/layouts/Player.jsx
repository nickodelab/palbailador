
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import ReactPlayer from 'react-player'

const styles = (theme) => ({
    player: {
        position: 'absolute',
        zIndex: 0,
        backgroundSize: '100% 100%',
        top: '0px',
        left: '0px',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto'
    }
})

const Player = ({ classes, videoURL }) => <>
    <ReactPlayer
        className={classes.player}
        url={videoURL}
        playing
        controls={false}
        loop
        muted
    />
</>


export default withStyles(styles)(Player)
