const express = require('express');
const router = express.Router();
const conn = require('../uilt/sql');
router.use(express.urlencoded())
const multer = require('multer');

// const upload = multer({ dest: 'uploads/' })
// 精细化去设置，如何去保存文件
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    // 保存时，文件名叫什么
    filename: function (req, file, cb) {
        // console.log('file', file)

        // 目标： 新名字是时间戳+后缀名
        const filenameArr = file.originalname.split('.');
        // filenameArr.length-1是找到最后一个元素的下标
        const fileName = Date.now() + "." + filenameArr[filenameArr.length - 1]
        cb(null, fileName) //
    }
})
const upload = multer({ storage })




//获取用户信息
router.get('/userinfo', (req, res) => {
    // console.log(req.query);
    const { username } = req.query;
    //当不参数时
    let sqlstr = `select username, nickname, email, userPic, id from users`;
    if (username) {
        sqlstr += ` where username="${username}"`
    }
    conn.query(sqlstr, (err, result) => {
        if (err) {
            // console.log(err);

            res.json({ code: 500, message: "服务器错误" });
            return
        }
        res.json({ static: 0, message: "获取成功", data: result })
    })


})
//更新用户信息
router.post('/userinfo', (req, res) => {
    // console.log(req.body);
    const { nickname, email, userPic, id } = req.body;

    const sqlstr = `update users set nickname="${nickname}", email="${email}", userPic="${userPic}" where id=${id}`;
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 500, message: "服务器错误" });
            return
        }
        res.json({ static: 0, message: "修改用户信息成功！" })
    })

})
//上传用户头像
router.post('/uploadPic', upload.single('file_data'), (req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    res.json({
        status: 0,
        message: "http://127.0.0.1:4000/" + req.file.filename
    })

})
//重置密码
router.post('/updatepwd', (req, res) => {
    // console.log(req.body);
    const { newPwd, oldPwd, id } = req.body;
    const sqlstr = `update users set password="${newPwd}" where password="${oldPwd}" and id=${id}`
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 500, message: "服务器错误" });
            return
        }
        res.json({
            status: 0,
            message: "更新密码成功！"
        })
    })

})
//
module.exports = router