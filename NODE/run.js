/**
 * Created by sheyude on 2017/7/2.
 */
// 引入 express
let express = require("express");
let bodyParser = require("body-parser")

// 创建app
let app = express();

let data =
    [
        {"cinema": "万达电影院", "date": "2017-7-7 00:00", "quantity": "9", "address": "广东省深圳市宝安区"},
        {"cinema": "中影南方新干线", "date": "2017-7-7 01:00", "quantity": "10", "address": "广东省深圳市罗湖区"},
        {"cinema": "横店电影院", "date": "2017-7-7 02:00", "quantity": "11", "address": "广东省深圳市盐田区"},
        {"cinema": "大地电影院", "date": "2017-7-7 03:00", "quantity": "12", "address": "广东省深圳市龙华新区区"},
        {"cinema": "金逸珠江电影院", "date": "2017-7-7 04:00", "quantity": "13", "address": "广东省深圳市南山区"},
        {"cinema": "时代电影", "date": "2017-7-7 05:00", "quantity": "14", "address": "广东省深圳市大鹏新区区"},
        {"cinema": "银星电影院", "date": "2017-7-7 06:00", "quantity": "15", "address": "广东省深圳市龙岗区"},
        {"cinema": "中影星美院线", "date": "2017-7-7 07:00", "quantity": "16", "address": "广东省深圳市宝安区"}
    ]
let msg = {
    msg:true,
}
//bodyParser设置
app.use(bodyParser.urlencoded({extended:true}));
// 首页
app.route("/")
    // get请求
    .get(function (req, res) {
    res.send("hello word")
})
app.use(function(req, res, next){
    // 服务器设置允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

// 接口
app.route("/jsTest")
    .get(function (req, res) {
        res.json(data);
    })

// 计算
app.route("/jisuan")
    .get(function (req, res) {
        let input1 = req.query.input1
        let input2 = req.query.input2
        msg.sum = input1*input2
        res.json(msg)
    })
    .post(function (req, res) {
        let input1 = req.body.input
        let input2 = req.body.input2
        // console.log(req.body.input)
        // msg.sum = (parseInt(input1)) * (parseInt(input2))
        // console.log(msg.sum)
        msg.sum = req.body;
        res.json(msg);
    })


// 监听端口
app.listen(5050);
console.log("服务器已经成功启动!")
console.log("http://127.0.0.1:5050");
