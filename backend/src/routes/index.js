
'use strict'

module.exports = {
    registerUser: require('./user/register'),
    authUser: require('./user/auth'),
    newVideos: require('./video/new'),
    listVideos: require('./video/list'),
    updateVideo: require('./video/update'),
    newGroup: require('./group/new'),
    deleteGroup: require('./group/delete'),
    addUser: require('./group/addUser'),
    addVideo: require('./group/addVideo')
}
