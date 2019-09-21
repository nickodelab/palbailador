export const SETTINGS_ENTITY = '[settings]'

export const SET_SETTINGS = `${SETTINGS_ENTITY} SET_SETTINGS`

export const setToggleSettings = (type) => ({
    type: SET_SETTINGS,
    payload: type
})