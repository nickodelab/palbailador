
import { apiRequest } from '../../actions/api'
import { VIDEO_UPLOAD } from '../../actions/video'

export const videoMiddleware = ({ getState, dispatch }) => next => action => {
    next(action)

    switch (action.type) {

        case VIDEO_UPLOAD:
            dispatch(apiRequest(action.payload, 'POST', VIDEO_UPLOAD))
            break

    }
}
