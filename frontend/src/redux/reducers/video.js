
import { SET_UPLOADED_VIDEOS } from '../actions/video' 

const videoReducerInitialState = {
    uploadedVideos: false
}

export function videoReducer(state = videoReducerInitialState, action) { 
    
    switch (action.type) {
        case SET_UPLOADED_VIDEOS:
            return {
                ...state,
                uploadedVideos: action.payload
            }
        default:
            break
    }
    return state

} 
