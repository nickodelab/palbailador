const logic = require('../../logic')

module.exports = async (req, res) => {
  try {
    const {
      loggedInUserId,
      body: { name, description }
    } = req
    const newGroup = await logic.createGroup(loggedInUserId, name, description)
    res.json(newGroup)
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
