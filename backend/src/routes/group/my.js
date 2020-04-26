const logic = require('../../logic')

module.exports = async (req, res) => {
  try {
    const { loggedInUserId } = req
    const groups = await logic.getMyGroups(loggedInUserId)
    res.json(groups)
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
