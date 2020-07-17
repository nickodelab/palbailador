import {
    SUCCESS,
    apiRequest
} from '../../actions/api';

import {
    setAlert,
    setRedirect,
    setClearAlert,
} from '../../actions/ui';

import {
    LOGIN,
    REGISTER,
    setUser,
    SET_USER
} from '../../actions/user';

export const userMiddleware = ({ dispatch }) => next => action => {
    next(action)

    switch (action.type) {
        case REGISTER:
            dispatch(setClearAlert(REGISTER));
            dispatch(apiRequest(action.payload, 'POST', REGISTER));
            break;

        case LOGIN:
            dispatch(setClearAlert(LOGIN));
            dispatch(apiRequest(action.payload, 'POST', LOGIN));
            break;

        case `${REGISTER} - ${SUCCESS}`: {
            dispatch(setRedirect('login', { message: 'user successfully registered', level: 'success' }));
            break;
        }

        case `${LOGIN} - ${SUCCESS}`: {
            const userLogggedIn = action.payload;
            sessionStorage.setItem('token', userLogggedIn.token);

            dispatch(setUser(userLogggedIn, SET_USER));
            dispatch(setRedirect('home', { message: 'user successfully logged', level: 'success' }));
            break;
        }

        default:
    }
}
