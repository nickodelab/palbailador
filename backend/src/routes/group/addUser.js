const logic = require('../../logic')

module.exports = async (req, res) => {
  try {
    const {
      params: { userId, groupId },
      loggedInUserId
    } = req
    await logic.addUserToGroup(groupId, userId, loggedInUserId)
    res.json({ message: 'User added to the group' })
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
