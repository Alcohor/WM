const express = require("express");
const router = express.Router();
const complain = require('../controller/complain_controller')

router.get('/list',complain.list)
router.post('/create',complain.create)
router.post('/delete',complain.deleteComplain)
router.post('/update',complain.update)

module.exports = router