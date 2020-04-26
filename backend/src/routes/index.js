'use strict'

module.exports = {
  // users
  registerUser: require('./user/register'),
  authUser: require('./user/auth'),

  // videos
  newVideos: require('./video/new'),
  getMyVideos: require('./video/myVideos'),
  updateVideo: require('./video/update'),

  // groups
  newGroup: require('./group/new'),
  deleteGroup: require('./group/delete'),
  getMyGroups: require('./group/my'),
  addUser: require('./group/addUser'),
  addVideo: require('./group/addVideo')
}
