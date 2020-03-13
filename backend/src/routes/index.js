'use strict'

module.exports = {
  // users
  registerUser: require('./user/register'),
  authUser: require('./user/auth'),

  // videos
  newVideos: require('./video/new'),
  listVideos: require('./video/list'),
  updateVideo: require('./video/update'),

  // groups
  newGroup: require('./group/new'),
  deleteGroup: require('./group/delete'),
  getMyGroups: require('./group/my'),

  // users
  addUser: require('./group/addUser'),
  addVideo: require('./group/addVideo')
}
