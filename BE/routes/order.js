const express = require("express");
const router = express.Router();
const oreder = require('../controller/order_controller')
const photoUpload = require('../middleware/photoUpload')

router.get('/list',oreder.list)
router.post('/create',oreder.create)
router.post('/remark',oreder.remark)
router.post('/updata-status',oreder.updataStatus)


module.exports = router