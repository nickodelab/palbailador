
const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const options = require('./schemaOptions')

const User = new Schema(
    {    
        nickname: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: email => {
                    return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email);
                },
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

module.exports = User
