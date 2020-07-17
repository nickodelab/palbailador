export const USER_ENTITY = '[USER]';

export const REGISTER = `${USER_ENTITY} REGISTER`;
export const LOGIN = `${USER_ENTITY} LOGIN`;
export const SET_USER = `${USER_ENTITY} SET_USER`;
export const LOG_OUT = `${USER_ENTITY} LOG_OUT`;

export const registerUser = userData => ({
    type: REGISTER,
    payload: userData,
});

export const logInUser = userData => ({
    type: LOGIN,
    payload: userData,
});

export const setUser = loggedInUser => ({
    type: SET_USER,
    payload: loggedInUser,
});
