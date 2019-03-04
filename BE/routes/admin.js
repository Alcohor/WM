const express = require('express')
const router = express.Router()
const admin_controller = require('../controller/admin_controller')

router.post('/registe', admin_controller.regist)
router.post('/login', admin_controller.login)
router.get('/isLogin', admin_controller.isLogin)
router.get('/logout',admin_controller.logout)


module.exports = router

