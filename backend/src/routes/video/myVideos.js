const logic = require('../../logic')

module.exports = async (req, res) => {
  try {
    const { loggedInUserId } = req
    const videos = await logic.getMyVideos(loggedInUserId)
    res.json(videos)
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
