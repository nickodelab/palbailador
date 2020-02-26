
const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const options = require('./schemaOptions')
const validator = require('validator')

const User = new Schema(
    {    
        nickname: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator : validator.isEmail,
                message: props => `${props.value} is not a valid email`
            }
        },

        password: {
            type: String,
            required: true,
        },

        groups: [{
            type: ObjectId,
            ref: 'Group'
        }]
    },
    options
)

module.exports = { User, validator }
