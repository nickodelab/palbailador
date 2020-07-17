const logic = require('../../logic')

module.exports = async (req, res) => {
  try {
    const {
      loggedInUserId,
      body: { videos }
    } = req
    const newVideos = await logic.uploadVideos(videos, loggedInUserId)
    // res.json({ message: `${newVideos.length} videos created` })
    res.json({ data: newVideos })
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
