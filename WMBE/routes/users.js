var express = require('express');
var router = express.Router();
var user_controller = require('../controller/user.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/isSignIn',user_controller.isSignIn)
router.get('/logout',user_controller.logout)
router.get('/userinfo',user_controller.getInfo)

module.exports = router;
