const logic = require('../../logic')

module.exports = async (req, res) => {

  try {
    const { loggedInUserId } = req
    const user = await logic.getMyUser(loggedInUserId)
    res.json(user)
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
