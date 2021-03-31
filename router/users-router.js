const express = require('express');
// const sql = require('../uilt/sql');
const router = express.Router();
const conn = require('../uilt/sql');
router.use(express.urlencoded());
const jwt = require('jsonwebtoken');
//注册
router.post('/reguser', (req, res) => {
    // console.log(req.body);
    const { username, password } = req.body;
    const sqmstr = `select username from users where username="${username}" and password="${password}"`
    conn.query(sqmstr, (err, result) => {

        if (err) {
            // console.log(err);

            res.json({ status: 500, message: '服务器错误' })
            return
        }
        if (result.length > 0) {
            res.json({ status: 1, message: "注册失败,用户名已存在" })
        }
        const sqlstr = `insert into users (username,password) values("${username}","${password}")`
        conn.query(sqlstr, (err, result) => {
            if (err) {
                res.json({ status: 500, message: "服务器错误" });
                return
            }
            res.json({ status: 0, message: "注册成功" })
        })
    })

});
//登录
router.post('/login', (req, res) => {
    // console.log(req.body);
    const { username, password } = req.body;
    const sqlstr = `select * from users where username="${username}" and password="${password}"`;
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ status: 500, message: "服务器错误" });
            return
        }
        if (result.length > 0) {
            // const token = 'Bearer ' + jwt.sign({ name: '小王' }, 'gzlin', { expiresIn: 2 * 60 * 60 });
            res.json({ status: 0, message: "登录成功", token })
        }
    })

})



module.exports = router