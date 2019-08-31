 
import { VIDEO_UPLOAD } from '../../actions/video'
import { REGISTER_USER, LOG_IN_USER } from '../../actions/user'

export const ENDPOINTS = {
    [LOG_IN_USER]: '/user/login',
    [REGISTER_USER]: '/user/new',
    [VIDEO_UPLOAD]: '/video/new'
}
