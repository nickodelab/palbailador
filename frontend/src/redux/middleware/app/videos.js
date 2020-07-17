import {
    SUCCESS,
    apiRequest
} from '../../actions/api';

import {
    setAlert,
    setRedirect,
    setClearAlert,
} from '../../actions/ui';

import {
    setUploadedVideos,
    UPLOAD_VIDEOS
} from '../../actions/videos';

export const videosMiddleware = ({ dispatch }) => next => action => {
    next(action)

    switch (action.type) {
        case UPLOAD_VIDEOS:
            dispatch(setClearAlert(UPLOAD_VIDEOS));
            dispatch(apiRequest({ videos: action.payload }, 'POST', UPLOAD_VIDEOS));
            break;

        case `${UPLOAD_VIDEOS} - ${SUCCESS}`: {
            const { data: uploadedVideos } = action.payload;
            debugger
            dispatch(setUploadedVideos(uploadedVideos, UPLOAD_VIDEOS));
            // dispatch(setRedirect('home', { message: 'user successfully logged', level: 'success' }));
            break;
        }

        default:
    }
}
