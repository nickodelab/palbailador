const logic = require('../../logic')

// const { tokenHelper: { createToken }} = require('../../middlewares')

module.exports = async (req, res) => {
  const {
    params: { groupId },
    body: { videoId }
  } = req

  try {
    const response = await logic.addVideoToGroup(groupId, videoId)
    // const token = createToken(user.id)
    res.json(response)
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
