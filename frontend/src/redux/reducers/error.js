
import { SET_ERROR } from '../actions/api' 

export function errorReducer(state = false, action) { 
    
    if (action.type.includes(SET_ERROR)) {
			return action.payload.error
    }
    
    return state

} 
