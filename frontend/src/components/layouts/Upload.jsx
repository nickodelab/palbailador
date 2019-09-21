
import React, { useState } from 'react' 
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, TextField, CircularProgress, CssBaseline } from '@material-ui/core'
import { connect } from 'react-redux'
import Select from 'react-select'
import { withRouter } from 'react-router-dom'

import firebase from '../../utils/firebase'
import { uploadVideo } from '../../redux/actions/video'

import Player from './Player'
import Alert from '../shared/Alert'

const styles = {}

const Upload = ({ classes, uploadVideo, error, history }) => {
    const [video, setVideo] = useState(false)
    const [videoURL, setVideoURL] = useState(false)
    const [category, setCategory] = useState(false)
    const [name, setName] = useState(false)
    const [spinner, setSpinner] = useState(false)

    const handleVideo = async (event) => {  
        setSpinner(true)
        event.preventDefault()
        const videoURL = await firebase.getVideoURL(video)
        setVideoURL(videoURL)
        setSpinner(false)
    }    

    const handleUploadVideo = () => {
        uploadVideo({ name, category, url: videoURL })
        history.push('/vok')
    }

    const options = [
        { value: 'salsa', label: 'Salsa' },
        { value: 'bachata', label: 'Bachata' },
        { value: 'kizomba', label: 'Kizomba' },
        { value: 'mambo', label: 'Mambo' },
        { value: 'cubana', label: 'Salsa Cubana' },
        { value: 'chacha', label: 'Cha Cha' },
    ]

    return <>
        {error && <Alert level='error' message={error} />}

        <section className={classes.uploadForm}>
            <Typography variant="h4">¡Comparte tu Figura!</Typography>
            <p>Crea y comparte con el mundo salsero tus propias figuras.</p>
            <form onSubmit={handleVideo}>
                <input
                    id="raised-button-file"
                    accept="video/*"
                    // style={{ display: 'none' }}
                    multiple={false}
                    type="file"
                    onChange={(event) => setVideo(event.target.files[0])}
                />
                <label htmlFor="raised-button-file">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        type="submit"
                    >
                        SUBIR
                    </Button>
                </label>

            </form>
        </section>

        {spinner && <CircularProgress className={classes.progress} />}

        {videoURL && <section className={classes.videoPreview}>
            <Player videoURL={videoURL} />
            <Select
                // defaultValue={{ value: null, label: 'categorías'}}
                // placeholder={'categorías'}
                isClearable={true}
                isSearchable={true}
                name="color"
                options={options}
                onChange={({ value }) => setCategory(value)}
                // isMulti
                // label='Categorías'
                // TextFieldProps={{
                    
                //     InputLabelProps: {
                //       htmlFor: 'react-select-multiple',
                //       shrink: true,
                //     },
                //   }}
            />
        </section>}

        {/* {videoURL && category && <TextField
                                    label="Name"
                                    onChange={(e) => setName(e.target.value)}
                                  />} */}

        {videoURL && category && <TextField
                                    label="nombre"
                                    // defaultValue="inventa un nombre corto creativo"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth
                                />}

        {videoURL && category && name && <Button 
                                            onClick={() => handleUploadVideo()} 
                                            className={classes.button}
                                            variant="contained" 
                                            color="primary"
                                        > 
                                            COMPARTIR
                                        </Button>}

    </>
}

const mapStateToProps = ({ error }) => ({ error })
export default withStyles(styles)(connect(mapStateToProps, { uploadVideo })(withRouter(Upload)))
