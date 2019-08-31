
import { apiRequest } from '../../actions/api'
import { REGISTER_USER } from '../../actions/user'

export const userMiddleware = ({ getState, dispatch }) => next => action => {
    next(action)

    switch (action.type) {

        case REGISTER_USER:
            dispatch(apiRequest(action.payload, 'POST', REGISTER_USER))
            break
    }
}
