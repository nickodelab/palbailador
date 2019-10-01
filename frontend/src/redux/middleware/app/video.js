
import { 
    API_SUCCESS, 
    apiRequest,
    setResponse
} from '../../actions/api'

import { 
    VIDEO_UPLOAD,
    VIDEO_UPDATE,
    setUploadedVideos
} from '../../actions/video'

export const videoMiddleware = ({ getState, dispatch }) => next => action => {
    next(action)

    switch (action.type) {

        case VIDEO_UPLOAD:
            dispatch(apiRequest(action.payload, 'POST', VIDEO_UPLOAD))
            break

        case VIDEO_UPDATE:
            dispatch(apiRequest(action.payload, 'PUT', VIDEO_UPDATE))
            break

        case `${VIDEO_UPLOAD} ${API_SUCCESS}`:
            console.log('action.payload.data', action.payload.data)
            dispatch(setUploadedVideos(action.payload.data))
            break

        case `${VIDEO_UPDATE} ${API_SUCCESS}`:
            dispatch(setResponse(action.payload.data))
            break

        default:

    }
}
