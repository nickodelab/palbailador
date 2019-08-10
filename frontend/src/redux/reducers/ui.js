
import { SET_MENU_OPEN } from '../actions/ui' 


export function uiReducer(state = false, action) { 
    
    if (action.type === SET_MENU_OPEN) {
			return action.payload
    }
    
    return state

} 
