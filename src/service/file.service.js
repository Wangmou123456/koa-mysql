const connection = require('../app/database')


class FileService {
  async createAvatarInfo(filename, mimetype, size, user_id) {
    const statement = `
    INSERT INTO avatar (filename, mimetype, size, user_id) values (?, ?, ?, ?);
    `
    const [result] = await connection.execute(statement, [filename, mimetype, size, user_id])
    return result
  }
  async getAvatarByUserId(userId) {
    const statement = `
    SELECT * FROM avatar WHERE user_id = ?;
    `
    const [result] = await connection.execute(statement, [userId])
    return result
  }

  async createPictureInfo(filename, mimetype, size, moment_id, user_id) {
    const statement = `
    INSERT INTO file (filename, mimetype, size, moment_id,user_id) values (?, ?, ?, ?,?);
    `
    const [result] = await connection.execute(statement, [filename, mimetype, size, moment_id, user_id])
    return result
  }

  async getFileByFilename(filename) {
    const statement = `
    SELECT * FROM file WHERE filename = ?;
    `
    const [result] = await connection.execute(statement, [filename]);
    return result
  }
}

module.exports = new FileService();