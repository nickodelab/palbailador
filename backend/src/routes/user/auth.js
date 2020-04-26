const logic = require('../../logic')

module.exports = async (req, res) => {
  const {
    body: { email, password }
  } = req

  try {
    const response = await logic.authenticateUser(email, password)
    res.json(response)
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
