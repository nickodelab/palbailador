
const moment = require('moment')

module.exports = {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id
            ret.created = moment(ret.createdAt)
            ret.updated = moment(ret.updatedAt)
            delete ret._id
            delete ret.__v
        },
        versionKey: false
    }
}
