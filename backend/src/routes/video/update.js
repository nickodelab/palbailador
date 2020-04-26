const logic = require('../../logic')

module.exports = async (req, res) => {
  try {
    const {
      loggedInUserId,
      body: newVideoData,
      params: { videoId }
    } = req

    const videoUpdated = await logic.updateVideo(
      videoId,
      newVideoData,
      loggedInUserId
    )
    res.json(videoUpdated)
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
