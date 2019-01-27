const express = require('express')
const router = express.Router()
const admin_controller = require('../controller/admin_controller')

router.post('/regist',admin_controller.regist)
router.post('/login',admin_controller.login)

module.exports = router

