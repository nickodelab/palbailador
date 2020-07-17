
import { SET_UPLOAD_VIDEOS } from '../actions/videos';

const videosReducerInitialState = {
    uploadedVideos: false
};

export function videosReducer(state = videosReducerInitialState, action) {

    switch (action.type) {

        case SET_UPLOAD_VIDEOS:
            return {
                ...state,
                uploadedVideos: action.payload
            }

        default:
            break
    }

    return state
};
