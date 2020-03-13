const mongoose = require('mongoose')
const { User, Video, Group } = require('./schemas')

module.exports = {
  User: mongoose.model('User', User),
  Video: mongoose.model('Video', Video),
  Group: mongoose.model('Group', Group)
}
