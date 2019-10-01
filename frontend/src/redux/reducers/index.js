import { combineReducers } from 'redux'

import { errorReducer } from '../reducers/error'
import { apiReducer } from '../reducers/api'
import { uiReducer } from '../reducers/ui'
import { userReducer } from '../reducers/user'
import { settingsReducer } from '../reducers/settings'
import { videoReducer } from '../reducers/video'
import { RESET_APP } from '../actions/root'

const appReducers = combineReducers({
    error: errorReducer,
    isMenuOpen: uiReducer,
    loggedInUser: userReducer,
    response: apiReducer,
    settings: settingsReducer,
    videos: videoReducer
})

export const rootReducer = (state, action) => {
    if (action.type === RESET_APP) state = undefined
    return appReducers(state, action)
}
