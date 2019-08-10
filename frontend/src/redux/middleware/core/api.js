
import axios from 'axios'
import { API_REQUEST, apiSuccess, apiError, setError } from '../../actions/api'

const config = {
	url: '',
	token: 'token',

}


export const apiMdl = ({ getState, dispatch }) => next => async action => {
	
	if (action.type.includes(API_REQUEST)) {
		// const { error, user: { token } } = getState()
		const { error } = getState()
		// const { entity, method, endpointObj: { url, actionType }, params } = action.payload.meta
		const { entity, method, endpointObj: { actionType }, params } = action.payload.meta

		try {
			const response = await axios({
				method,
				url: config.url,
				data: action.payload.data,
				headers: {
					'auth': config.token
				},
				params
			})
			
			dispatch(apiSuccess(response.data, entity, actionType))
			error && dispatch(setError(false, entity))
			
		} catch (axiosError) {
			dispatch(apiError(axiosError.response.data.error, entity))
		}
		
	}

	return next(action)
}