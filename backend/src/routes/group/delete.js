
const logic = require('../../logic')

module.exports = async (req, res) => {
    
    const { params: { groupId }, userId } = req

    try {
        const response = await logic.deleteGroup(userId, groupId)
        res.json(response)
    } catch ({ message }) {
        res.status(403).send({ error: message })
    }
}
