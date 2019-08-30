
import { SET_SETTINGS } from '../actions/user' 

const youtubeReducerInitialState = {
    settings: {
        notifications: false
    }
}

export function youtubeReducer(state = userReducerInitialState, action) { 
    
    switch (action.type) {
        case SET_SETTINGS:
            return {
                ...state,
                settings: {
                    [action.payload]: !state.settings[action.payload]
                }
            }
    
        default:
            break
    }
    
    return state

} 
