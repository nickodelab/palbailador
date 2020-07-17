
import { SET_USER } from '../actions/user';

const userReducerInitialState = {
    id: false,
    groups: false,
    nickname: false,
    email: false,
    token: sessionStorage.token,
};

export function userReducer(state = userReducerInitialState, action) {

    switch (action.type) {

        case SET_USER:
            return {
                ...state,
                ...action.payload
            };

        default:
            break;
    }

    return state;
};
