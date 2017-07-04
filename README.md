# nodeapi
write useful api by node,case I have no more time to write a complete project!
> Before writing,I should thanks the product evangelist who named xuyd in github.All the apis were copied from his lovely diary! I just select someone usually and analyse them. If you want to learn more,Go https://github.com/xuyd/vue-dairy

#node版本
>node6.9.5
#常有错误
>jwt expired 登入认证过期，重新登陆


## 注册用户
> models:jsonwebtoken(或取token，旨在安全),passport(登陆认证),crypto
>
> path:user/addUser【post】
>
> files:routes/user(涵盖路由及接口首次处理方法),routes/auth(登陆验证，用户验证),models/user.model.js(数据库操作，二次处理)

## 登录
> models:passport-local(用户本地验证)
>
> path:auth/login【post】
>
> files:routes/auth/login,routes/auth,

## 根据token获取登录首页的信息
> models:express-jwt(jsonwebtoken解析，会返回token里用户信息)
>
> path:user/authInfo【get】
>
> files:routes/user,models/user.model.js,models/article.model.js,models/album.model.js

注：用户前端请求时，加一个token,Authorization:Bearer +【token】

## 根据token获取token用户信息
> models:express-jwt
>
> path:user/set【get】
>
> files:routes/user,models/user.model.js

## 根据id获取某个用户信息(token)
> models:express-jwt
>
> path:user/:id/userInfo【get】
>
> files:routes/user,models/user.model.js,models/article.model.js,models/album.model.js

## 上传用户头像，上传图片(token)
> models:formidable, fs(node自带,文件处理)
>
> path:user/header【post】
>
> files:routes/user,models/user.model.js,public/uploads/head(存放图片)

注：
1. 不要忘记在app.js调起静态文件中间件，app.use('/public', express.static(path.join(__dirname, 'public')));
2. fs操作静态文件时注意要用本地地址，不是link地址

## 修改用户信息(token)
> models:lodash(延迟执行，value()后才执行。在这里用来合并对象)
>
> path:user/updateUser【put】
>
> files:routes/user,models/user.model.js

学：这里用lodash的assign来合并对象

## 修改用户密码(token)
> models:-
>
> path:user/updatePassword 【put】
>
> files:routes/user,models/user.model.js

## 添加一片文章(token)
> models:-
>
> path:article/addArticle 【post】
>
> files:routes/article,models/article.model.js

## 图片编辑，缩略处理(token)
> models:gm(后台图片处理),gm.subClass({ imageMagick : true })
>
> path:article/upload 【post】
>
> files:routes/article

注：
1. 使用gm需要先在本地安装 GraphicsMagick或者ImageMagick;这里装了ImageMagick，安装到最后一步需要勾选Install legacy utilities(e.g. convert)选项

学：这里只用了ImageMagick 的裁剪，更多图形操作可看相应文档

## 获取标签列表
> models:-
>
> path:article/tags 【get】
>
> files:routes/article

学：这里用distinctAsync查询方式来返回一个某字段名的数组，数组里的内容不重复。以数组形式获取不同标签而不用再为标签建一张表