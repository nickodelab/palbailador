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
      enum: ['salsa', 'bachata', 'kizomba', 'mambo', 'cubana', 'chacha'],
      required: true
    },

    owner: {
      type: ObjectId,
      ref: 'User',
      required: true
    },

    isPublic: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  options
)

module.exports = Video
