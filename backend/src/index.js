'use strict'

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { tokenHelper, cors } = require('./middlewares/')

const {
  // users
  registerUser,
  authUser,

  // videos
  newVideos,
  getMyVideos,
  updateVideo,

  // groups
  newGroup,
  deleteGroup,
  addUser,
  addVideo,
  getMyGroups
} = require('./routes')

const {
  env: { DB_URL, PORT, JWT_SECRET }
} = process

const mongooseOpts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose
  .connect(DB_URL, mongooseOpts)
  .then(() => {
    console.log('MongoDB Connected!')

    tokenHelper.jwtSecret = JWT_SECRET

    const { tokenVerifierMiddleware } = tokenHelper

    const app = express()
    const router = express.Router()
    const jsonBodyParser = bodyParser.json()

    router.use(cors)

    // user
    router.post('/user/new', jsonBodyParser, registerUser)
    router.post('/user/login', jsonBodyParser, authUser)

    // videos
    router.post(
      '/video/new',
      tokenVerifierMiddleware,
      jsonBodyParser,
      newVideos
    )
    router.get('/video/list', tokenVerifierMiddleware, getMyVideos)
    router.put(
      '/video/update/:videoId',
      tokenVerifierMiddleware,
      jsonBodyParser,
      updateVideo
    )

    // groups
    router.post('/group/new', tokenVerifierMiddleware, jsonBodyParser, newGroup)
    router.delete(
      '/group/delete/:groupId',
      tokenVerifierMiddleware,
      deleteGroup
    )
    router.post(
      '/group/add-user/:userId/:groupId',
      tokenVerifierMiddleware,
      addUser
    )
    router.post(
      '/group/add-video/:videoId/:groupId',
      tokenVerifierMiddleware,
      addVideo
    )
    router.post('/group/my', tokenVerifierMiddleware, getMyGroups)

    // config
    app.use('/api', router)

    router.get('*', (req, res) => res.status(404).json({ status: 'not found' }))

    app.listen(PORT, () =>
      console.log(`server running on http://localhost:${PORT}`)
    )
  })
  .catch(error => console.log('ERROR!', error))
