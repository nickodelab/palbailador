
import axios from 'axios'

import { ENDPOINTS } from './endpoints'
import { 
	API_REQUEST, 
	apiSuccess, 
	setError, 
	setClearError 
} from '../../actions/api'

const { REACT_APP_API_URL } = process.env

export const apiMdl = ({ getState, dispatch }) => next => async action => {

	next(action)
	
	if (action.type.includes(API_REQUEST)) {
		const { method, endPoint, params } = action.payload.meta

		try {
			const url = REACT_APP_API_URL + ENDPOINTS[endPoint]
						
			const { data } = await axios({
				method,
				url,
				data: action.payload.data,
				// headers: {
				// 'Content-Type': 'multipart/form-data'
				// 'access-token': config.apiKey,
				// 'auth': token
				// }
				params
			})
			
			dispatch(apiSuccess(data, endPoint))
			dispatch(setClearError(endPoint))

		} catch (axiosError) {
			dispatch(setError(axiosError.response.data.error, endPoint))
		}
	}
}
