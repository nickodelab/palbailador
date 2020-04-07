const logic = require('../../logic')

module.exports = async (req, res) => {
  const {
    userId,
    body: { name, description }
  } = req

  try {
    console.log('name', name)
    const response = await logic.createGroup(userId, name, description)
    res.json(response)
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
