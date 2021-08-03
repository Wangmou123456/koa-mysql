const Router = require('koa-router')

const fileRouter = new Router({ prefix: '/upload' })

const {
  varifyAuth
} = require('../middleware/auth.middleware')

const {
  avatarHandr,
  picturerHandr,
  pictureResize
} = require('../middleware/file.middleware')

const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file.controller')

fileRouter.post('/avatar', varifyAuth, avatarHandr, saveAvatarInfo)
fileRouter.post('/picture', varifyAuth, picturerHandr, pictureResize, savePictureInfo)



module.exports = fileRouter