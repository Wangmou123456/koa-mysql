const Router = require('koa-router')

const commentRouter = new Router({ prefix: '/comment' })

const {
  varifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller')


commentRouter.post('/', varifyAuth, create)
commentRouter.post('/:commentId/reply', varifyAuth, reply)

// 修改评论
commentRouter.patch('/:commentId', varifyAuth, verifyPermission, update)
// 删除评论
commentRouter.delete('/:commentId', varifyAuth, verifyPermission, remove)

// 获取评论列表
commentRouter.get('/', list)

module.exports = commentRouter