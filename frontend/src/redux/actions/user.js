export const USER_ENTITY = '[user]'

export const SET_SETTINGS = `${USER_ENTITY} SET_SETTINGS`
export const REGISTER_USER = `${USER_ENTITY} REGISTER_USER`
export const LOG_IN_USER = `${USER_ENTITY} LOG_IN_USER`

export const setToggleSettings = (type) => ({
    type: SET_SETTINGS,
    payload: type
})

export const registerUser = (userData) => ({
    type: REGISTER_USER,
    payload: userData
})

export const logInUser = (userData) => ({
    type: LOG_IN_USER,
    payload: userData
})