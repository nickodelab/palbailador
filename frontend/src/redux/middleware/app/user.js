
import { API_SUCCESS, apiRequest } from '../../actions/api'
import { REGISTER_USER, LOG_IN_USER, FILL_USER_VIDEOS, setToken, setUserVideos } from '../../actions/user'

export const userMiddleware = ({ getState, dispatch }) => next => action => {
    next(action)

    switch (action.type) {

        case REGISTER_USER:
            dispatch(apiRequest(action.payload, 'POST', REGISTER_USER))
            break

        case LOG_IN_USER:
            dispatch(apiRequest(action.payload, 'POST', LOG_IN_USER))
            break

        case FILL_USER_VIDEOS:
            dispatch(apiRequest(action.payload, 'GET', FILL_USER_VIDEOS))
            break

        case `${LOG_IN_USER} ${API_SUCCESS}`:
            var { data, meta: { entity } } = action.payload

            if (entity === LOG_IN_USER) {
                dispatch(setToken(data.token))
            }
            break

        case `${FILL_USER_VIDEOS} ${API_SUCCESS}`:
            var { data, meta: { entity } } = action.payload

            if (entity === FILL_USER_VIDEOS) {
                dispatch(setUserVideos(data))
            }
            break
    }
}
