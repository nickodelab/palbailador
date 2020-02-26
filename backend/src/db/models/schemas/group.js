
const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const options = require('./schemaOptions')

const Group = new Schema(
    {    
        name: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true
        },

        description: {
            type: String,
            maxlength: 250,
            trim: true
        },

        members: [{
            user: {
                type: ObjectId,
                ref: 'User'
            },

            isAdmin: {
                type: Boolean,
                default: false
            }
        }],

        videos: [{    
            type: ObjectId,
            ref: 'Video'
        }]
    },
    options
)

module.exports = Group


// activity: [
//     {
//         date: {
//             type: Date,
//             required: true,
//             default: Date.now
//         },
//         key: {
//             type: String,
//             enum: ['login'],
//             required: true
//         },
//         data: {
//             type: mongoose.Schema.Types.Mixed
//         }
//     }
// ],
