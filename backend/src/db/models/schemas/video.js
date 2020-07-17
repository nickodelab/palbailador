const { Schema } = require('mongoose')
const {
  Types: { ObjectId }
} = Schema
const options = require('./schemaOptions')

const Video = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 80
    },

    url: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    category: {
      type: String,
      enum: ['rock', 'pop', 'jazz', 'blues', 'classical', 'punk', 'funk', 'metal', 'heavy'],
      required: false
    },

    owner: {
      type: ObjectId,
      ref: 'User',
      required: true
    },

    isPublic: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  options
)

module.exports = Video
