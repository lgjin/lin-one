const express = require('express');
const router = express.Router();
const conn = require('../uilt/sql');
router.use(express.urlencoded());
//获取全部文章分类
router.get('/cates', (req, res) => {
    // console.log(req.query);
    const sqlStr = `select * from categories where isdelete=0`;
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ code: 500, message: "服务器错误" });
            return
        }
        res.json({
            status: 0,
            message: "获取文章分类列表成功！",
            data: result
        })
    })

});
//新增文章分类
router.post('/addcates', (req, res) => {
    // console.log(req.body);
    const { name, slug } = req.body;
    const sqlStr = `insert into categories (name,slug) values("${name}","${slug}")`;
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ code: 500, message: "服务器错误" });
            return
        }
        res.json({
            status: 0,
            message: "新增文章分类成功！"
        })
    })

});
//删除文章分类
router.get('/deletecate', (req, res) => {
    // console.log(req.query);
    const { id } = req.query
    const sqlStr = `update categories set isdelete=1 where id=${id}`;
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ code: 500, message: "服务器错误" });
            return
        }
        res.json({
            status: 0,
            message: "删除文章分类成功！"
        })
    })

});
//根据id获取文章分类获取
router.get('/getCatesById', (req, res) => {
    console.log(req.query);
    const { id } = req.query;
    const sqlStr = `select name,slug,id from categories where id=${id}`;
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ code: 500, message: "服务器错误" });
            return
        }
        res.json({
            status: 0,
            message: "获取文章分类数据成功！",
            data: result
        })
    })

});
//根据id更新文章分类数据
router.post('/updatecate', (req, res) => {
    console.log(req.body);
    const { id, name, slug } = req.body
    const sqlStr = `update categories set name="${name}",slug="${slug}" where id=${id} and isdelete=0`;
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ code: 500, message: "服务器错误" });
            return
        }
        res.json({
            status: 0,
            message: "更新分类信息成功！"
        })
    })

})
module.exports = router