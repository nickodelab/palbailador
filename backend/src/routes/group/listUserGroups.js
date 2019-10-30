
const logic = require('../../logic')

// const { tokenHelper: { createToken }} = require('../../middlewares')

module.exports = async (req, res) => {
    
    const { body: { userId }} = req

    try {
        const response = await logic.listUserGroups(userId)
        // const token = createToken(user.id)
        res.json(response)
    } catch ({ message }) {
        res.status(403).send({ error: message })
    }
}