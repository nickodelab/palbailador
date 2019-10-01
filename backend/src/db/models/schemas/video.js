
const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const options = require('./schemaOptions')

const Video = new Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: 80,
        },
        
        url: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        category: {
            type: String,
            enum: [
                'salsa',
                'bachata',
                'kizomba',
                'mambo',
                'cubana',
                'chacha'
            ]
        },

        visibility: {
            type: String,
            enum: [
                'public', // in future
                'private', // show in profile
            ],
            default: 'private'
        }
    },
    options
)

module.exports = Video
