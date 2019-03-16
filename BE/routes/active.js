const express = require('express')
const router = express.Router()
const active_controller = require('../controller/active_controller')
const photoUpload = require('../middleware/photoUpload')

router.post('/create', active_controller.create)
router.post('/update', active_controller.update)
router.post('/save-pic',photoUpload,active_controller.savePic)
router.get('/pic',active_controller.pic)
router.get('/info',active_controller.activeInfo)
router.get('/list',active_controller.list)
router.post('/remove',active_controller.remove)

module.exports = router

