export const USER_ENTITY = '[user]'

export const SET_SETTINGS = `${USER_ENTITY} SET_SETTINGS`

export const setToggleSettings = (type) => ({
    type: SET_SETTINGS,
    payload: type
})