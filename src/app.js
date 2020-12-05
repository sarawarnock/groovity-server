require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const authRouter = require('./Auth-Login/auth-router')
const errorHandler = require('./middleware/error-handler')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.static('public'))
app.use(errorHandler)

// app.use(function errorHandler(error, req, res, next) {
//     let response
//     if (NODE_ENV === 'production') {
//         response = { error: { message: 'server error' } }
//     } else {
//         console.error(error)
//         response = { message: error.message, error }
//     }
//     res.status(500).json(response)
// })

// app.get('/', (req, res) => {
//     res.send('Hello, world!')
// })

app.use('/login', authRouter)
app.use('/callback', authRouter)

module.exports = app