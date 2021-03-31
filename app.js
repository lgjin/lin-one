const express = require('express')
const app = express();
const apirouter = require('./router/users-router');
const myrouter = require('./router/hero-router');
const articlerouter = require('./router/article-router');
const jwt = require('express-jwt');
//验证token
// app.use(jwt().unless());
// jwt() //用于解析token，并将 token 中保存的数据 赋值给 req.user
// unless()// 约定某个接口不需要身份认证
// app.use(jwt({
//     secret: 'gzlin', // 生成token时的 钥匙，必须统一
//     algorithms: ['HS256'] // 必填，加密算法，无需了解
// }).unless({
//     path: ['/api/reguser', '/api/login', /^\/uploads\/.*/] // 除了这两个接口，其他都需要认证
// }));
app.use('/api', apirouter)
app.use('/my', myrouter)
app.use('/my/article', articlerouter)
app.listen('4000', () => {
    console.log('服务器启动成功');

})