import {
    SET_ALERT,
    SET_CLEAR_ALERT,
    SET_REDIRECT,
    SET_REDIRECT_DONE,
} from '../actions/ui';

const uiReducerInitialState = {
    alert: false,
    redirect: {
        to: false,
        alert: false,
    },
};

export function uiReducer(state = uiReducerInitialState, action) {

    if (action.type.includes(SET_ALERT))
        return {
            ...state,
            alert: action.payload,
        };

    if (action.type.includes(SET_CLEAR_ALERT))
        return {
            ...state,
            alert: uiReducerInitialState.alert,
        };

    if (action.type.includes(SET_REDIRECT))
        return {
            ...state,
            redirect: {
                ...action.payload
            },
        };

    if (action.type === SET_REDIRECT_DONE)
        return {
            ...state,
            redirect: {
                ...state.redirect
            },
        };

    return state;

};
