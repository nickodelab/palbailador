
export const API_REQUEST = 'API_REQUEST'
export const API_SUCCESS = 'API_SUCCESS'
export const API_ERROR = 'API_ERROR'
export const SET_ERROR = 'SET_ERROR'

export const apiRequest = (body, method, entity, endpointObj) => ({
        type: `${entity} ${API_REQUEST}`,
        payload: {
            data: body,
            meta: { method, entity, endpointObj }
        }
})

export const apiSuccess = (response, entity, actionType) => ({
        type: `${entity} ${API_SUCCESS}`,
        payload: {
            data: response,
            meta: { entity, actionType }
        }
})

export const apiError = (error, entity) => ({
    type: `${entity} ${API_ERROR}`, 
    payload: { error }
})

export const setError = (error, entity) => ({
    type: `${entity} ${SET_ERROR}`, 
    payload: { error }
})