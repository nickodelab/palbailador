
import { SET_ERROR, SET_CLEAR_ERROR } from '../actions/api' 

export function errorReducer(state = false, action) { 

    if (action.type.includes(SET_ERROR)) return action.payload.error

    if (action.type.includes(SET_CLEAR_ERROR)) return false
    
    return state
    
}
