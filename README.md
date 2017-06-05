# nodeapi
write useful api by node,case I have no more time to write a complete project!

## 注册用户
> models:jsonwebtoken(或取token，旨在安全),passport(登陆认证),crypto
>
> path:user/addUser
>
> files:routes/user(涵盖路由及接口首次处理方法),routes/auth(登陆验证，用户验证),models/user.model.js(数据库操作，二次处理)

## 登录
> models:passport-local(用户本地验证)
>
> path:auth/login
>
> files:routes/auth/login,routes/auth,

## 根据token获取登录首页的信息
> models:express-jwt(jsonwebtoken解析，会返回token里用户信息)
>
> path:user/authInfo
>
> files:routes/user,models/user.model.js,models/article.model.js,models/album.model.js

注：用户前端请求时，加一个token,Authorization:Bearer +<token>

## 根据token获取token用户信息
> models:express-jwt
>
> path:user/set
>
> files:routes/user,models/user.model.js

## 根据id获取某个用户信息(token)
> models:express-jwt
>
> path:user/:id/userInfo
>
> files:routes/user,models/user.model.js,models/article.model.js,models/album.model.js

## 上传用户头像，上传图片(token)
> models:formidable, fs(node自带,文件处理)
>
> path:user/header
>
> files:routes/user,models/user.model.js,public/uploads/head(存放图片)

注：不要忘记在app.js调起静态文件中间件，app.use('/public', express.static(path.join(__dirname, 'public')));