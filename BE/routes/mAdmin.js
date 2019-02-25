const express = require('express')
const router = express.Router()
const admin_controller = require('../controller/mAdmin_controller')

router.post('/regist', admin_controller.regist)
router.post('/login', admin_controller.login)
router.post('/edit', admin_controller.edit)
router.get('/user-info', admin_controller.userInfo)

module.exports = router

