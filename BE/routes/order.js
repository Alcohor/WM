var express = require('express');
var router = express.Router();

//加载socket模块
var tcpServer = require("../utils/socket");

//调用socket模块--设置端口--初始化
tcpServer.ISocket(9091);

module.exports = router;