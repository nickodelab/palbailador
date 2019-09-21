
import { SET_SETTINGS } from '../actions/settings' 

const settingsReducerInitialState = {
    notifications: false
}

export function settingsReducer(state = settingsReducerInitialState, action) { 
    
    switch (action.type) {
        
        case SET_SETTINGS:
            return {
                ...state,
                [action.payload]: !state[action.payload]
            }
    
        default:
            break
    }
    
    return state

} 
