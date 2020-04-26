'use strict'

const jwt = require('jsonwebtoken')
const validator = require('validator')

const tokenHelper = {
  jwtSecret: null,

  /**
   * Creates the token with the userId in the sub
   *
   * @param {String} userId
   * @returns {String} - token
   * @throws {Error} on non valid userId
   */
  createToken (userId) {
    if (!validator.isAlphanumeric(userId)) throw Error('not valid userId')
    return jwt.sign({ sub: userId }, this.jwtSecret, { expiresIn: '7d' })
  },

  verifyToken (token) {
    const { sub } = jwt.verify(token, this.jwtSecret)

    if (!sub) throw Error(`subject not present in token ${token}`)

    return sub
  },

  tokenVerifierMiddleware (req, res, next) {
    try {
      const {
        headers: { authorization }
      } = req

      const token = authorization.substring(7)
      console.log('token', token)

      const loggedInUserId = this.verifyToken(token)
      console.log('loggedInUserId', loggedInUserId)

      req.loggedInUserId = loggedInUserId
    } catch ({ message }) {
      return res.status(401).json({ error: message })
    }

    next()
  }
}

const { createToken, verifyToken, tokenVerifierMiddleware } = tokenHelper

tokenHelper.createToken = createToken.bind(tokenHelper)
tokenHelper.verifyToken = verifyToken.bind(tokenHelper)
tokenHelper.tokenVerifierMiddleware = tokenVerifierMiddleware.bind(tokenHelper)

module.exports = tokenHelper
