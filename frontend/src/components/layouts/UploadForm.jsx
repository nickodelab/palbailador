
import React, { useState } from 'react' 
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import Select from 'react-select'
import { withRouter } from 'react-router-dom'

import firebase from '../../utils/firebase'
import { uploadVideo } from '../../redux/actions/video'

import Player from './Player'
import Alert from '../shared/Alert'

const styles = {}

const UploadForm = ({ classes, uploadVideo, response, error, history }) => {
    const [video, setVideo] = useState(false)
    const [videoURL, setVideoURL] = useState(false)
    const [category, setCategory] = useState(false)
    const [name, setName] = useState(false)

    const handleVideo = async (event) => {  
        event.preventDefault()
        const videoURL = await firebase.getVideoURL(video)
        setVideoURL(videoURL)
    }    

    const handleUploadVideo = () => {
        uploadVideo({ name, category, url: videoURL })
        history.push('/video-create-ok')
    }

    const options = [
        { value: 'salsa', label: 'Salsa' },
        { value: 'bachata', label: 'Bachata' },
        { value: 'kizomba', label: 'Kizomba' },
        { value: 'mambo', label: 'Mambo' },
        { value: 'cubana', label: 'Salsa Cubana' },
    ]

    console.log('video', video)
    console.log('videoURL', videoURL)
    console.log('category', category)

    return <>

        {error && <Alert level='error' message={error} />}

        <section className={classes.uploadForm}>
            <Typography>¡Comparte tu figura!</Typography>

            <form onSubmit={handleVideo}>
                <input
                    accept="video/*"
                    // style={{ display: 'none' }}
                    multiple={false}
                    type="file"
                    onChange={(event) => setVideo(event.target.files[0])}
                />
                <Button variant="raised" type="submit"> Upload </Button>
            </form>
        </section>

        {videoURL && <section className={classes.videoPreview}>
            <Player videoURL={videoURL} />
            <Select
                // defaultValue={option}
                isClearable={true}
                isSearchable={true}
                name="color"
                options={options}
                onChange={({ value }) => setCategory(value)}
            />
        </section>}

        {videoURL && category && <TextField
                                    label="Name"
                                    onChange={(e) => setName(e.target.value)}
                                  />}

        {videoURL && category && name && <Button onClick={() => handleUploadVideo()} className={classes.button}>
            Compartir
        </Button>}

    </>
}

const mapStateToProps = ({ response, error }) => ({ response, error })
export default withStyles(styles)(connect(mapStateToProps, { uploadVideo })(withRouter(UploadForm)))
