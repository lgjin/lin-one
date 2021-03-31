const express = require('express')
const app = express();
const apirouter = require('./router/hero-router')
const myrouter = require('./router/user-router')
app.use('/api', apirouter)
app.use('/my', myrouter)
app.listen('4000', () => {
    console.log('服务器启动成功');

})