const app = require('./app/index')
require('./app/database')

const config = require('./app/config')





app.listen(config.APP_PROT, () => {
  console.log(`服务器在${config.APP_PROT}端口启动成功`);
})