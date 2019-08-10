
const bcrypt = require('bcrypt')
const { User } = require('../db/models')

const logic = {

    registerUser: async (userData) => {

        const { nickname, email, password } = userData
        
        //todo validate

        const user = await User.findOne({ email })
        if (user) throw Error(`user with email ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)
        
        return User.create({ nickname, email, password: hash })
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */

    authenticateUser: async (email, password) => {

        // todo validate

        const user = await User.findOne({ email })
        if (!user) throw Error(`user with email ${email} not found`)
        const match = bcrypt.compare(password, user.password)
        if (!match) throw Error('wrong credentials')
        return user

    }
}

module.exports = logic