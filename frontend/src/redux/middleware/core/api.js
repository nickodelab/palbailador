import axios from 'axios';

import { ENDPOINTS } from './endpoints';
import { REQUEST, apiSuccess } from '../../actions/api';

import { setAlert } from '../../actions/ui';

const { REACT_APP_API_HOST } = process.env;

export const apiMdl = ({ getState, dispatch }) => next => async action => {
	next(action);

	if (action.type.includes(REQUEST)) {
		const { method, actionName } = action.payload.meta;

		try {
			const { loggedInUser: { token } } = getState();
			const url = REACT_APP_API_HOST + ENDPOINTS[actionName];

			const headers = token ?
				{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } :
				{ 'Content-Type': 'application/json' };

			const response = await axios({
				method,
				url,
				data: action.payload.data,
				headers
			});

			console.log('response', response)
			console.log('response.data', response.data)

			dispatch(apiSuccess(response.data, actionName));
		} catch (axiosError) {
			dispatch(setAlert({ message: axiosError.response.data.error, level: 'error' }, actionName));
		}
	}
}
