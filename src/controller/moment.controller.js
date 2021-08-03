const fs = require('fs');

const MomentService = require('../service/moment.service')
const fileService = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/file-path')

class MomentController {
  async create(ctx, next) {
    // 1 获取数据(user_id, content)
    const userId = ctx.user.id;
    const { content } = ctx.request.body

    // 2 将数据插入到数据库
    const result = await MomentService.create(userId, content)
    ctx.body = result
  }

  async detail(ctx, next) {
    // 1 获取数据(momentId)
    const momentId = ctx.params.momentId
    console.log(momentId);
    // 2 根据id 查数据
    const result = await MomentService.getMomentById(momentId)
    ctx.body = result[0]
  }

  async list(ctx, next) {

    // 1 获取数据
    const { offset, size } = ctx.query

    // 2 查询列表
    const result = await MomentService.getMomentList(offset, size)
    ctx.body = result
  }

  async update(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params
    const { content } = ctx.request.body

    // 修改内容
    const result = await MomentService.update(content, momentId)


    ctx.body = result
  }

  async remove(ctx, next) {
    // 获取momentId
    const { momentId } = ctx.request.params
    console.log(momentId);
    // 2 删除内容
    const result = await MomentService.remove(momentId)

    ctx.body = result
  }

  async addLabels(ctx, next) {
    // 1 获取标签和动态id
    const { labels } = ctx
    const { momentId } = ctx.params

    // 2 添加所有的标签
    for (let label of labels) {
      // 2.1 判断标签是否已经和动态有过关系
      const result = await MomentService.hasLabel(momentId, label.id)
      if (!result) {
        await MomentService.addLabel(momentId, label.id)
      }

    }
    ctx.body = "给动态添加标签成功~~~"
  }

  async fileInfo(ctx, next) {

    let { filename } = ctx.params
    const fileInfo = await fileService.getFileByFilename(filename)
    const { type } = ctx.query
    const types = ["small", "middle", "large"]
    if (types.some(item => item === type)) {
      filename = `${filename}-${type}`;
    }
    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentController()