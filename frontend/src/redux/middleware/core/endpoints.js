 
import { VIDEO_UPLOAD } from '../../actions/video'

export const ENDPOINTS = {
    LOG_IN_USER: '/login',
    [VIDEO_UPLOAD]: '/video/new'
}

// try {
// 	const response = await axios({
// 		method,
// 		url: `${config.apiUrl}${ENDPOINTS[command]}`,
// 		data: action.payload.data,
// 		headers: {
// 			'access-token': config.apiKey,
// 			'auth': token
// 		},
// 		params
// 	})

// 	dispatch(apiSuccess(response.data, entity, command))