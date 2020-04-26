const logic = require('../../logic')

module.exports = async (req, res) => {
  try {
    const {
      loggedInUserId,
      params: { groupId }
    } = req
    const { id: removedGroupId } = await logic.deleteGroup(
      loggedInUserId,
      groupId
    )
    res.json({ message: `Group with ID: ${removedGroupId} deleted` })
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
