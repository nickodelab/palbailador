const logic = require('../../logic')

module.exports = async (req, res) => {
  console.log('req.body', req.body)

  try {
    const response = await logic.updateVideo(req.body)
    // const token = createToken(user.id)
    res.json(response)
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
