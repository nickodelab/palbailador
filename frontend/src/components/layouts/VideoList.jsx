
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'

import VideoItem from './VideoItem'

const styles = (theme) => ({
    videoList: {
        marginTop: theme.spacing(3)
    }
})

const VideoList = ({ classes, videos }) => <>
    {console.log('VideoList', videos)}
    <section className={classes.videoList}>
        {videos.map((v, i) => <VideoItem video={v} key={i} />)}
    </section>

</>
  
export default withStyles(styles)(VideoList)
