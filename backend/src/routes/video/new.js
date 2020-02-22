
const logic = require('../../logic')

const { tokenHelper: { createToken }} = require('../../middlewares')

module.exports = async (req, res) => {

    // const token = req.headers
    console.log(req.body)
    try {
        const response = await logic.uploadVideo(req.body)
        // const token = createToken(user.id)
        res.json(response)
    } catch ({ message }) {
        res.status(403).send({ error: message })
    }
}
