
import React, { useState } from 'react' 
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Select from 'react-select'

import { Card, CardActions, Grid, Input, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'

import { updateVideo } from '../../redux/actions/video'

import { 
    Favorite as FavoriteIcon, 
    Share as ShareIcon,
    Button as IconButton
} from '@material-ui/icons'

import Player from './Player'

import ToggleIcon from '../shared/ToggleIcon'

const options = [
    { value: 'salsa', label: 'Salsa' },
    { value: 'bachata', label: 'Bachata' },
    { value: 'kizomba', label: 'Kizomba' },
    { value: 'mambo', label: 'Mambo' },
    { value: 'cubana', label: 'Salsa Cubana' },
    { value: 'chacha', label: 'Cha Cha' }
]

const styles = (theme) => ({
    videoItem: {
        marginTop: theme.spacing(3)
    },
    videoInputName: {
        padding: theme.spacing(2),
        color: theme.palette.grey[600],
        fontSize: theme.typography.body1
    },
    select: {
        width: '35%'
    },
    card: {
        overflow: 'visible'
    },
    videoActions: {
        display: 'flex',
        justifyContent: 'space-between'
    }
})

const customStyles = {
    // option: (provided, state) => ({
    //     ...provided,
    //     padding: 3
    // })
}

const VideoItem = ({ classes, video, updateVideo, isRaised, setIndexRaised, index }) => {
    const [videoName, setVideoName] = useState(video.name)

    const onEditVideo = (event) => {
        event.preventDefault()
        updateVideo({ id: video.id, name: videoName })
    }

    const { id, name, url } = video

    console.log('videoName', videoName)
    return <>
            <Grid item xs={12} sm={6} md={4} onClick={() => setIndexRaised(index)}>
                <Card className={clsx(classes.card)} key={id} raised={isRaised}>
                    <form onSubmit={onEditVideo}>
                        <Input
                            className={clsx(classes['videoInputName'])}
                            disableUnderline
                            fullWidth
                            autoComplete="off"
                            placeholder={'Introduce un nombre para este vídeo'}
                            onChange={(e) => setVideoName(e.target.value)}
                            value={videoName}
                        />
                    </form>

                    <Player videoURL={url}/>
                    
                    <CardActions className={classes.videoActions}>

                        <Select 
                            options={options}
                            className={classes.select}
                            styles={customStyles}
                            placeholder="categoría..."
                        />
                        
                        <ToggleIcon 
                            iconOn="lock" 
                            iconOff="lock_open" 
                            textOn="privado" 
                            textOff="compartido en grupos" 
                        />
                        
                    </CardActions>

                </Card>
            </Grid>
            
    </> 
}

const mapStateToProps = ({ error, response }) => ({ error, response })

export default withStyles(styles)(connect(mapStateToProps, { updateVideo })(VideoItem))
