const Router = require('koa-router')

const labelRouter = new Router({ prefix: '/label' })

const {
  varifyAuth
} = require('../middleware/auth.middleware')

const {
  create,
  list
} = require('../controller/label.controller')


labelRouter.post('/', varifyAuth, create)
labelRouter.get('/', list)


module.exports = labelRouter