export const UI_ENTITY = '[UI]';

export const SET_ALERT = `${UI_ENTITY} SET_ALERT`;
export const SET_CLEAR_ALERT = `${UI_ENTITY} SET_CLEAR_ALERT`;
export const SET_REDIRECT = `${UI_ENTITY} SET_REDIRECT`;
export const SET_REDIRECT_DONE = `${UI_ENTITY} SET_REDIRECT_DONE`;

export const setAlert = (errorObj, actionName) => ({
    type: `${actionName} - ${SET_ALERT}`,
    payload: errorObj,
});

export const setClearAlert = actionName => ({
    type: `${actionName} - ${SET_CLEAR_ALERT}`,
});

export const setRedirect = (to, alert) => ({
    type: `${SET_REDIRECT} - to: ${to}`,
    payload: {
        to,
        alert
    },
});

export const setRedirectDone = () => ({
    type: SET_REDIRECT_DONE
});
