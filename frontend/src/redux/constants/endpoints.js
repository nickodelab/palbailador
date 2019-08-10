export const ENDPOINTS = {
    LOG_IN_USER: {
        url: '/login',
        actionType: 'setToken'
    },
    RETRIEVE_MY_USER: {
        url: '/my/user?populate=units events.project projects',
        actionType: 'setMyUser'
    },
    USER_EVENTS: {
        url: '/my/events',
        actionType: 'setUserEvents'
    }
}