
'use strict'

module.exports = {
    registerUser: require('./user/register'),
    authUser: require('./user/auth'),
    newVideos: require('./video/new'),
    listVideos: require('./video/list'),
    updateVideo: require('./video/update')
}