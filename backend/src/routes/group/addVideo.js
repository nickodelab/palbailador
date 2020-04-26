const logic = require('../../logic')

module.exports = async (req, res) => {
  try {
    const {
      params: { videoId, groupId },
      loggedInUserId
    } = req
    await logic.addVideoToGroup(groupId, videoId, loggedInUserId)
    res.json({ message: 'Video added to the group' })
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
