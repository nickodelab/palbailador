'use strict'

const logic = require('../../logic')

module.exports = async (req, res) => {
  try {
    console.log('asdcasdcasdc')
    const { id } = await logic.registerUser(req.body)
    res.json({ id })
  } catch ({ message }) {
    res.status(401).send({ error: message })
  }
}
