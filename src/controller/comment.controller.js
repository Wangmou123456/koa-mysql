const service = require('../service/comment.service')

class CommentControl {
  async create(ctx, next) {

    const { momentId, content } = ctx.request.body
    console.log(ctx.request.body);
    const { id } = ctx.user
    const result = await service.create(momentId, content, id)
    ctx.body = result
  }

  async reply(ctx, next) {
    const { commentId } = ctx.request.params
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    const result = await service.reply(momentId, content, id, commentId)
    ctx.body = result
  }

  async update(ctx, next) {
    const { commentId } = ctx.params
    const { content } = ctx.request.body
    // const { id } = ctx.user
    const result = await service.update(commentId, content)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params
    const result = await service.remove(commentId)
    ctx.body = result
  }

  async list(ctx, next) {
    const { momentId } = ctx.query;
    const result = await service.getCommentsByMomentId(momentId)
    ctx.body = result
  }
}

module.exports = new CommentControl()