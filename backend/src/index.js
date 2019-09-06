
'use strict'

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
 
const { tokenHelper, cors } = require('./middlewares/')
const { registerUser, authUser, newVideo, listVideos } = require('./routes')
 
const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

const mongooseOpts = { 
    useNewUrlParser: true,
    useCreateIndex: true
}
 
mongoose.connect(DB_URL, mongooseOpts)
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET

        const app = express()
        const router = express.Router()
        const jsonBodyParser = bodyParser.json()

        router.use(cors)

        router.post('/user/new', jsonBodyParser, registerUser)
        router.post('/user/login', jsonBodyParser, authUser)

        router.post('/video/new', jsonBodyParser, newVideo)
        router.get('/video/list', listVideos)

        app.use('/api', router)

        router.get('*', (req, res) => res.status(404).json({ 'status': 'not found' }))

        app.listen(port, () => console.log(`server running on port ${port}`))
    })
    .catch(console.error) 