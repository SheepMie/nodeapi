
var path = require('path'); 
var fs = require('fs'); 

var express = require('express');

var morgan = require('morgan'); 
var config = require('config-lite')(__dirname); 
var bodyParser = require('body-parser');   

var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(modelsPath + '/' + file);
    }
});

var routes = require('./routes');
var pkg = require('./package');

var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});

var app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.all('*', function(req, res, next) {		
    res.header("Access-Control-Allow-Origin", req.headers.origin); 
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, X-HTTP-Method-Override,Accept");
    res.header("Access-Control-Allow-Methods","POST,GET,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");		
    res.header("X-Powered-By",' 3.2.1');
    next();
});
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(morgan("dev"));
app.use(morgan({stream: accessLog}));

var db = mongoose.connect(config.mongodb);  
db.connection.on("error", function(error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function() {
    console.log("------数据库连接成功！------");    
});

routes(app);

app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port at http://127.0.0.1:${config.port}`);
});

module.exports = app;