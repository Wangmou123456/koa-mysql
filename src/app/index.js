const koa = require('koa')
const bodyParser = require('koa-bodyparser')

const userRoutes = require('../router')
const { errorHandler } = require('./error-handle')
const app = new koa()



app.use(bodyParser())
userRoutes(app)
app.on('error', errorHandler)

module.exports = app