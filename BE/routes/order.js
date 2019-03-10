const express = require("express");
const router = express.Router();
const order = require('../controller/order_controller')
const photoUpload = require('../middleware/photoUpload')

router.get('/list',order.list)
router.post('/create',order.create)
router.post('/remark',order.remark)
router.post('/updata-status',order.updataStatus)
router.post('/edit-order',order.edit)

module.exports = router