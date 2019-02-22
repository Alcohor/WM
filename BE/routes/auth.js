const express = require('express')
const router = express.Router()
const menu_controller = require('../controller/menu_controller')

router.get('/menu', menu_controller.menu)

module.exports = router

