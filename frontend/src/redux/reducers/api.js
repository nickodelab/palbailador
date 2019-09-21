
import { SET_RESPONSE } from '../actions/api' 

export function apiReducer(state = false, action) { 
    
    if (action.type === SET_RESPONSE)
        return action.payload
    
    return state
} 
