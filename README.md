# nodeapi
write useful api by node,case I have no more time to write a complete project!

## 注册用户
> models:jsonwebtoken(或取token，旨在安全),passport(登陆认证),crypto
>
> path:user/addUser<post>
>
> files:routes/user(涵盖路由及接口首次处理方法),routes/auth(登陆验证，用户验证),models/user.model.js(数据库操作，二次处理)

## 登录
> models:passport-local(用户本地验证)
>
> path:auth/login<post>
>
> files:routes/auth/login,routes/auth,

## 根据token获取登录首页的信息
> models:express-jwt(jsonwebtoken解析，会返回token里用户信息)
>
> path:user/authInfo<get>
>
> files:routes/user,models/user.model.js,models/article.model.js,models/album.model.js

注：用户前端请求时，加一个token,Authorization:Bearer +<token>

## 根据token获取token用户信息
> models:express-jwt
>
> path:user/set<get>
>
> files:routes/user,models/user.model.js

## 根据id获取某个用户信息(token)
> models:express-jwt
>
> path:user/:id/userInfo<get>
>
> files:routes/user,models/user.model.js,models/article.model.js,models/album.model.js

## 上传用户头像，上传图片(token)
> models:formidable, fs(node自带,文件处理)
>
> path:user/header<post>
>
> files:routes/user,models/user.model.js,public/uploads/head(存放图片)

注：
1. 不要忘记在app.js调起静态文件中间件，app.use('/public', express.static(path.join(__dirname, 'public')));
2. fs操作静态文件时注意要用本地地址，不是link地址

## 修改用户信息(token)
> models:lodash(延迟执行，value()后才执行。在这里用来合并对象)
>
> path:user/updateUser<put>
>
> files:routes/user,models/user.model.js

学：这里用lodash的assign来合并对象