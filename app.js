/*自带模块*/
var path = require('path'); //node 的文件路径解析模块
var fs = require('fs'); //node 的文件操作模块

/*框架*/
var express = require('express');

/*其他模块*/
var morgan = require('morgan'); //默认日志模块
var config = require('config-lite')(__dirname); //读取config内容
var bodyParser = require('body-parser');    //路由解析模块
//var session = require('express-session'); 
//var flash = require('connect-flash');     //node的接口返回提示

/*数据库连起来*/
var mongoose = require("mongoose");
//var MongoStore = require('connect-mongo')(session); //该模块用于将session存入mongo中
mongoose.Promise = require('bluebird');
//载入数据库手脚架
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(modelsPath + '/' + file);
    }
});

/*调起文件*/
var routes = require('./routes');
var pkg = require('./package');

/*日志输出*/
var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});

var app = express(); //初始化express应用

/*调用中间件*/
//bodyParser路径选择json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//处理cookie存储中间件
// app.use(session({
//   name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
//   secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
//   resave: true,// 强制更新 session
//   saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
//   cookie: {
//     maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
//   },
//   store: new MongoStore({// 将 session 存储到 mongodb
//     url: config.mongodb// mongodb 地址
//   })
// }));

// 处理表单及文件上传的中间件
// app.use(require('express-formidable')({
//   uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
//   keepExtensions: true,// 保留后缀
//   multiples: true, // req.files to be arrays of files 
// }));

//日志
app.use(morgan("dev"));
app.use(morgan({stream: accessLog}));

/*数据库连接*/
var db = mongoose.connect(config.mongodb);  //链接数据库
db.connection.on("error", function(error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function() {
    console.log("------数据库连接成功！------");    //数据模板创建用Schema模块去创建 
});

/*路由必备*/ 
routes(app);

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port at http://127.0.0.1:${config.port}`);
});

module.exports = app;