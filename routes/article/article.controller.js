var mongoose = require('mongoose');
var User = mongoose.model('User');
var Article = mongoose.model('Article');
var config = require('config-lite')(__dirname);

exports.addArticle = function (req,res) {
    var title = req.body.title.trim();
    var content = req.body.content;
    var tag = req.body.tag.trim();
    var weather = req.body.weather.trim();
    var image = req.body.image;
    var status = req.body.status;
    var errorMsg;
    if(!title){
        errorMsg = '标题不能为空';
    }else if(title.length>10){
        errorMsg = '标题过长';
    }else if(!content){
        errorMsg = '内容不能为空';
    }else if(weather.length>5){
        errorMsg = '天气过长';
    }else if(!tag){
        errorMsg = '标签不能为空';
    }
    if(errorMsg){
        return res.status(401).send({errorMsg:errorMsg});
    }
    var data = {
        authId: req.user.id,
        title: title,
        weather: weather,
        content: content,
        tag: tag,
        status: status
    };

    if(image && (image.substr(0, config.root.length) == config.root)) {
        data.image = config.root + '/public/uploads/thumbnail' + image.substr(image.lastIndexOf('/'), image.length);
    }
    Article.createAsync(data).then(function (article) {
        return res.status(200).send({
            _id: article._id
        });
    }).catch(function (err) {
        return res.status(401).send({errorMsg: '提交失败'});
    });
};