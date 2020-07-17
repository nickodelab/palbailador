import { combineReducers } from 'redux';

import { uiReducer } from '../reducers/ui';
import { userReducer } from '../reducers/user';
import { videosReducer } from '../reducers/videos';
import { LOG_OUT } from '../actions/user';

const appReducers = combineReducers({
    ui: uiReducer,
    loggedInUser: userReducer,
    videos: videosReducer,
});

export const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) state = undefined;
    return appReducers(state, action);
};
