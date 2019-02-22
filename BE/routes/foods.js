const express = require('express')
const router = express.Router()
const foods_controller = require('../controller/foods_controller')
const photoUpload = require('../middleware/photoUpload')

router.post('/create', foods_controller.create)
router.post('/update', foods_controller.update)
router.post('/save-pic',photoUpload,foods_controller.savePic)
router.get('/list',foods_controller.list)
router.get('/info',foods_controller.foodsInfo)
router.get('/delete',foods_controller.deleteFood)

module.exports = router

