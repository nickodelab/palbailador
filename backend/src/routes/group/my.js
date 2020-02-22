
const logic = require('../../logic')

module.exports = async (req, res) => {
    
    const { userId } = req

    try {
        const response = await logic.getMyGroups(userId)
        // const token = createToken(user.id)
        res.json(response)
    } catch ({ message }) {
        res.status(403).send({ error: message })
    }
}
