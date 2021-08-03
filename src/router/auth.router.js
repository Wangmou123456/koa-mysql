const Router = require('koa-router')

const authRouter = new Router({ prefix: '/login' });

const {
  login,
  success
} = require('../controller/auth.controller.js')
const {
  varifyLogin,
  varifyAuth
} = require('../middleware/auth.middleware')



authRouter.post('/', varifyLogin, login)
authRouter.post('/test', varifyAuth, success)
module.exports = authRouter