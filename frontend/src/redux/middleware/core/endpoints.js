
import { 
    VIDEO_UPLOAD,
    VIDEO_UPDATE
} from '../../actions/video'

import { 
    REGISTER_USER, 
    LOG_IN_USER, 
    FILL_USER_VIDEOS 
} from '../../actions/user'

export const ENDPOINTS = {
    [FILL_USER_VIDEOS]: '/video/list',
    [LOG_IN_USER]: '/user/login',
    [REGISTER_USER]: '/user/new',
    [VIDEO_UPLOAD]: '/video/new',
    [VIDEO_UPDATE]: '/video/update'
}
