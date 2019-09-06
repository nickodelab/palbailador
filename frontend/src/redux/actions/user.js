export const USER_ENTITY = '[user]'

export const SET_SETTINGS = `${USER_ENTITY} SET_SETTINGS`
export const REGISTER_USER = `${USER_ENTITY} REGISTER_USER`
export const LOG_IN_USER = `${USER_ENTITY} LOG_IN_USER`
export const SET_TOKEN = `${USER_ENTITY} SET_TOKEN`
export const FILL_USER_VIDEOS = `${USER_ENTITY} FILL_USER_VIDEOS`
export const SET_USER_VIDEOS = `${USER_ENTITY} SET_USER_VIDEOS`

export const fillUserVideos = () => ({ 
    type: FILL_USER_VIDEOS
})

export const setUserVideos = (videos) => ({
    type: SET_USER_VIDEOS,
    payload: videos
})

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

export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token
})