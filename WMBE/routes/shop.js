
var express = require('express');
var router = express.Router();
var shop_controller = require('../controller/shop_controller')
const photoUpload = require('../middleware/photoUpload')

/* GET home page. */
router.get('/list', shop_controller.list);
router.get('/shopInfo', shop_controller.shopInfo);
router.get('/shopInfoById', shop_controller.shopInfoById);
router.post('/save', shop_controller.save);
router.post('/saveAvatar', photoUpload, shop_controller.saveAvatar);
router.get('/remove', shop_controller.remove);
router.get('/selectID', shop_controller.selectID);
router.post('/update', shop_controller.update);
router.get('/id', shop_controller.id);

module.exports = router;