const Router = require('koa-router')


const {
  create,
  avatarInfo
} = require('../controller/user.controller')

const {
  varifyUser,
  handlePassword
} = require('../middleware/user.middle')

const userRouter = new Router({ prefix: '/users' });

// 路径 - 中间件处理的映射
// verifyuser 验证逻辑
userRouter.post('/', varifyUser, handlePassword, create)
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter;