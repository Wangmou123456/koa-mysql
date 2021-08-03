const errTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, message

  const errType = error.message
  switch (errType) {
    case errTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = "用户名或者密码不能为空!!!"
      break;
    case errTypes.USERNAME_IS_ALREADY:
      status = 409; // conflict 冲突
      message = "用户名已经存在!!!"
      break;
    case errTypes.USERNAME_DOES_NOT_EXISTS:
      status = 400;
      message = '用户名不存在 请注册!!'
      break;
    case errTypes.PASSWORD_IS_INCURRENT:
      status = 400; // 参数错误
      message = '密码不正确, 请重新输入!!'
      break;
    case errTypes.UNAUTHORIZATION:
      status = 401; // token解析出错 无效的token
      message = '无效的token未授权!!'
      break;
    case errTypes.UNPERMISSION:
      status = 401; // token解析出错 无效的token
      message = '您不具备操作权限!!'
      break;
    default:
      status = 404,
        message = "NOT FOUND"
  }
  ctx.status = status
  ctx.body = {
    message
  }
}

module.exports = {
  errorHandler
}