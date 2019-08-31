
import axios from 'axios'
import { API_REQUEST, setResponse, setError } from '../../actions/api'
import { ENDPOINTS } from './endpoints'

const config = {
	url: 'http://localhost:8080/api',
	token: 'token',
}

export const apiMdl = ({ getState, dispatch }) => next => async action => {

	next(action)
	
	if (action.type.includes(API_REQUEST)) {
		const { method, endPoint } = action.payload.meta

		try {
			const url = config.url + ENDPOINTS[endPoint]

			const { data } = await axios({
				method,
				url,
				data: action.payload.data,
				// headers: {
				// 	'access-token': config.apiKey,
				// 	'auth': token
				// },
				// params
			})
			
			dispatch(setResponse(data))
			
		} catch (axiosError) {
			dispatch(setError(axiosError.response.data.error, endPoint))
		}
	}
}
