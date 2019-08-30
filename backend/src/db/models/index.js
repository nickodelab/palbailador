const mongoose = require('mongoose')
const { User, Video } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Video: mongoose.model('Video', Video)
}