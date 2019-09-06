
import { SET_SETTINGS, SET_TOKEN, SET_USER_VIDEOS } from '../actions/user' 

const userReducerInitialState = {
    settings: {
        notifications: false
    },
    videos: false
}

export function userReducer(state = userReducerInitialState, action) { 
    
    switch (action.type) {
        case SET_SETTINGS:
            return {
                ...state,
                settings: {
                    [action.payload]: !state.settings[action.payload]
                }
            }

        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }

        case SET_USER_VIDEOS:
            return {
                ...state,
                videos: action.payload
            }
    
        default:
            break
    }
    
    return state

} 
