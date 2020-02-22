
import React, { useState, useEffect } from 'react' 
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Button, CircularProgress, Input, Container } from '@material-ui/core'
import { connect } from 'react-redux'

import firebase from '../../utils/firebase'
import { uploadVideos } from '../../redux/actions/video'
import Alert from '../shared/Alert'
import VideoList from './VideoList'

const styles = (theme) => ({
    uploadInput: {
        display: 'none'
    },
    uploadButton: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(12)
    }
})

// const defaultValueVideos = [
//     {
//         created: "2019-09-24T12:01:07.146Z",
//         id: "5d8a05835ab2bb2939bc703e",
//         updated: "2019-09-24T12:01:07.146Z",
//         url: "https://firebasestorage.googleapis.com/v0/b/palbailador-db809.appspot.com/o/videos%2F1569326463671?alt=media&token=16c916a4-fd7b-4d3d-9c66-009d45165752",
//         visibility: "private",
//     },
//     {
//         created: "2019-09-24T12:01:07.145Z",
//         id: "5d8a05835ab2bb2939bc703d",
//         updated: "2019-09-24T12:01:07.145Z",
//         url: "https://firebasestorage.googleapis.com/v0/b/palbailador-db809.appspot.com/o/videos%2F1569326463660?alt=media&token=67dbcbd9-bb98-4bc7-ac42-3c640312a105",
//         visibility: "private"
//     },
//     {
//         created: "2019-09-24T12:01:07.145Z",
//         id: "5d8a05835ab2bb2939bc703d",
//         updated: "2019-09-24T12:01:07.145Z",
//         url: "https://firebasestorage.googleapis.com/v0/b/palbailador-db809.appspot.com/o/videos%2F1569326463660?alt=media&token=67dbcbd9-bb98-4bc7-ac42-3c640312a105",
//         visibility: "private"
//     },
//     {
//         created: "2019-09-24T12:01:07.145Z",
//         id: "5d8a05835ab2bb2939bc703d",
//         updated: "2019-09-24T12:01:07.145Z",
//         url: "https://firebasestorage.googleapis.com/v0/b/palbailador-db809.appspot.com/o/videos%2F1569326463660?alt=media&token=67dbcbd9-bb98-4bc7-ac42-3c640312a105",
//         visibility: "private"
//     },
//     {
//         created: "2019-09-24T12:01:07.145Z",
//         id: "5d8a05835ab2bb2939bc703d",
//         updated: "2019-09-24T12:01:07.145Z",
//         url: "https://firebasestorage.googleapis.com/v0/b/palbailador-db809.appspot.com/o/videos%2F1569326463660?alt=media&token=67dbcbd9-bb98-4bc7-ac42-3c640312a105",
//         visibility: "private"
//     }
// ]

const Upload = ({ classes, uploadVideos, error, uploadedVideos }) => {
    const [spinner, setSpinner] = useState(false)
    const [videos, setVideos] = useState(false)

    const handleVideoSelected = async (event) => {
        setSpinner(true)
        const arrFiles = []
        Array.from(event.target.files).forEach(file => arrFiles.push(file))
        const arrVideos = await firebase.uploadMultipleFiles(arrFiles)
        uploadVideos(arrVideos)
        setVideos(arrVideos)
        setSpinner(false)
    }

    // uploadedVideos = defaultValueVideos
    return <>
        {error && <Alert level='error' message={error} />}

        {!uploadedVideos && 
            <Container maxWidth="lg" className={classes['uploadButton']}>
                <Input
                    className={clsx(classes['uploadInput'])}
                    id="file-upload"
                    inputProps={{ multiple: true, accept: "video/*" }}
                    type="file"
                    onChange={handleVideoSelected}
                    disableUnderline
                />

                <label className={clsx(classes['uploadButton'])} htmlFor="file-upload">
                    <Button color="primary" variant="contained" component="span">
                        SUBIR
                    </Button>
                </label>

                {spinner && <CircularProgress className={clsx(classes['progress'])} />}

            </Container>}

        {videos && <VideoList videos={uploadedVideos} />}
    </>
}

const mapStateToProps = ({ error, videos: { uploadedVideos } }) => ({ error, uploadedVideos })
export default withStyles(styles)(connect(mapStateToProps, { uploadVideos })(Upload))
