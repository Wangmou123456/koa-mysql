const Router = require('koa-router')

const momentRouter = new Router({ prefix: '/moment' })

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.controller')

const {
  varifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

const {
  verifyLabelExists
} = require('../middleware/label.middleware')


momentRouter.post('/', varifyAuth, create)
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)

// 1 用户必须登录 2 用户具备权限 3 反馈 verify 验证 写错了
momentRouter.patch('/:momentId', varifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', varifyAuth, verifyPermission, remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels', varifyAuth, verifyPermission, verifyLabelExists, addLabels)

// 动态配图的服务
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter