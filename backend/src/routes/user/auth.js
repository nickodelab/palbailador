const logic = require('../../logic')

const {
  tokenHelper: { createToken }
} = require('../../middlewares/')

module.exports = async (req, res) => {
  const {
    body: { email, password }
  } = req

  try {
    const user = await logic.authenticateUser(email, password)
    const token = createToken(user.id)
    res.json({ token })
  } catch ({ message }) {
    res.status(403).send({ error: message })
  }
}
