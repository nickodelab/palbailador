
const logic = require('../../logic')

module.exports = async (req, res) => {

    try {
        const response = await logic.listVideos()
        res.json(response)
    } catch ({ message }) {
        res.status(403).send({ error: message })
    }
}
