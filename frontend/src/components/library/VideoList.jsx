
import React, { useState } from 'react'
import { Grid, Container, withStyles } from '@material-ui/core/'

import VideoItem from './VideoItem'

const styles = (theme) => ({
    videoList: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(12)
    }
})

const VideoList = ({ classes, videos }) => {
    const [indexRaised, setIndexRaised] = useState(-1)

    console.log('videos', videos)
    return <>
        <Container maxWidth="lg" className={classes['videoList']}>
            <Grid container spacing={2}>
                {videos && videos.map((video, index) => <VideoItem
                    isRaised={indexRaised === index}
                    video={video}
                    key={index}
                    index={index}
                    setIndexRaised={setIndexRaised}
                />)}
            </Grid>
        </Container>
    </>
}

export default withStyles(styles)(VideoList)
