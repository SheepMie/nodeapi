module.exports = function(app) {
    

    app.use('/auth', require('./auth/index'));
    app.use('/user', require('./user/index'));

    app.use('/article', require('./article/index'));

    app.use('/comment', require('./comment/index'));

    //app.use('/album', require('./album/index'));

    app.use('/*', function (req,res,next) {
        return res.json({status:'success',data:'复制黏贴 一把梭'});
    })
};