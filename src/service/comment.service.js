const connection = require('../app/database')

class CommentService {
  async create(momentId, comment, user_id) {
    const statement = `
    INSERT INTO comment (moment_id,content,user_id) VALUES (?, ?, ?);
    `

    const [result] = await connection.execute(statement, [momentId, comment, user_id])
    console.log(result);
    return result
  }

  async reply(momentId, comment, user_id, commentId) {
    const statement = `
    INSERT INTO comment (moment_id,content,user_id,comment_id) VALUES (?, ?, ?, ?);
    `
    const [result] = await connection.execute(statement, [momentId, comment, user_id, commentId])
    return result
  }

  async update(commentId, content) {
    const statement = `
    UPDATE comment SET content = ? WHERE id = ?;
    `
    const [result] = await connection.execute(statement, [content, commentId])
    return result
  }

  async remove(commentId) {
    const statement = `
    DELETE FROM comment WHERE id = ?;
    `
    const [result] = await connection.execute(statement, [commentId])
    return result
  }

  async getCommentsByMomentId(momentId) {
    // console.log(momentId);
    const statement = `
    SELECT
      m.id, m.content, m.comment_id commentId, m.createAt createTime,
      JSON_OBJECT('id', u.id,'name',u.name) user
    FROM comment m
    LEFT JOIN user u ON u.id = m.user_id
    WHERE moment_id = ?;
    `
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
}


module.exports = new CommentService();