
export const API_REQUEST = `API_REQUEST`
export const SET_RESPONSE = `SET_RESPONSE`
export const API_ERROR = `API_ERROR`
export const SET_ERROR = `SET_ERROR`

export const apiRequest = (body, method, endPoint) => ({
    type: `${endPoint} ${API_REQUEST}`,
    payload: {
        data: body,
        meta: { method, endPoint }
    }
})

export const setResponse = (response) => ({
    type: SET_RESPONSE,
    payload: response
})

export const apiError = (error, entity) => ({
    type: `${entity} ${API_ERROR}`, 
    payload: { error }
})

export const setError = (error, entity) => ({
    type: `${entity} ${SET_ERROR}`, 
    payload: { error }
})