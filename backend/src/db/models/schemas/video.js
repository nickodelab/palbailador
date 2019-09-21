
const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const options = require('./schemaOptions')

const Video = new Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: 80,
            required: true
        },
        
        url: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                'salsa',
                'bachata',
                'kizomba',
                'mambo',
                'cubana',
                'chacha'
            ]
        }
    },
    options
)

module.exports = Video
