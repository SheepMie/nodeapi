/*配置文件的默认js模块，与对应配置模块组合，可以应对开发环境，测试环境和生产环境，需要config-lite 模块来读取*/
module.exports = {
  port: 7777,	// 程序启动要监听的端口号
  root: 'http://localhost:7777',
  session: {	//express-session 的配置信息
    secrets: 'aha',
    key: 'aha',
    maxAge: 3600000			//session时效性单位毫秒
  },
  mongodb: 'mongodb://localhost:27017/nodeapi'	//mongodb 的地址
};