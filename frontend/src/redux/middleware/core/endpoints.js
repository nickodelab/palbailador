
import {
    REGISTER,
    LOGIN,
} from '../../actions/user';

import {
    UPLOAD_VIDEOS,
} from '../../actions/videos';

export const ENDPOINTS = {
    [LOGIN]: '/user/login',
    [REGISTER]: '/user/new',
    [UPLOAD_VIDEOS]: '/video/new',
};
