# nodeapi
write useful api for node,case I have no more time to write a complete project!

## 注册用户
>models:jsonwebtoken(或取token，旨在安全),passport(登陆认证),crypto

>path:user/addUser

>files:routes/user(涵盖路由及接口首次处理方法),routes/auth(登陆验证，用户验证),models/user.model.js(数据库操作，二次处理)

## 登录
>models:passport-local(用户本地验证)

>path:auth/login

>files:routes/auth/login,routes/auth,
## 根据token获取用户信息
