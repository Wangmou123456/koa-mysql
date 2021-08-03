
const jwt = require('jsonwebtoken')

const errType = require('../constants/error-types')
const userService = require('../service/user.service')
const aothService = require('../service/auth.service')
const md5passwword = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')

const varifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 2 判断用户名或者密码不能为空
  if (!name || !password) {
    const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  // 3 判断用户是否存在
  const result = await userService.getUserByName(name);
  const user = result[0]
  console.log(user);
  if (!user) {
    const error = new Error(errType.USERNAME_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 4 用户存在 判断密码是否和数据库中是否一致
  if (md5passwword(password) !== user.password) {
    const error = new Error(errType.PASSWORD_IS_INCURRENT)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user;

  await next()
}

const varifyAuth = async (ctx, next) => {
  // const { Authorization } = ctx.headers
  console.log('验证授权的middlleware');

  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  // 2 验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: "RS256"
    })
    ctx.user = result
  } catch (err) {
    const error = new Error(errType.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
    return;
  }



  await next()
}

/**
 * 接口: 业务接口系统(本项目)/后台管理系统
 * 一对一: user -> role
 * 多对多: role -> menu(删除动态/修改动态)
 *  1 很多文件需要验证权限 修改/删除动态 修改/删除评论
 * 
 * 
 */
const verifyPermission = async (ctx, next) => {
  console.log('验证权限的middleware~~');
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.params[resourceKey]
  const { id: userId } = ctx.user
  // 查询数据库是否具备权限
  try {
    const isPermission = await aothService.checkResource(tableName, resourceId, userId)
    console.log(isPermission);
    if (!isPermission) throw new Error()
    await next()
  } catch (err) {
    const error = new Error(errType.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }


}
// const verifyPermission = (tableName) => {
//   async (ctx, next) => {
//     console.log('验证权限的middleware~~');
//     const { momentId } = ctx.request.params
//     const { id: userId } = ctx.user
//     // 查询数据库是否具备权限
//     try {
//       const isPermission = await aothService.checkResource(tableName, momentId, userId)
//       console.log(isPermission);
//       if (!isPermission) throw new Error()
//       await next()
//     } catch (err) {
//       const error = new Error(errType.UNPERMISSION)
//       return ctx.app.emit('error', error, ctx)
//     }

//   }
// }



module.exports = {
  varifyLogin,
  varifyAuth,
  verifyPermission
}