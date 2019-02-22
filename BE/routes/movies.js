const express = require("express");
const router = express.Router();
const movies = require('../controller/movies_controller')
const photoUpload = require('../middleware/photoUpload')
//routes/movies/get
router.get('/movies-list',movies.list)
router.post('/save',photoUpload,movies.save)
router.get('/getbyid',movies.getById)
router.get('/deletebyid',movies.delById)
router.get('/getbyname',movies.getByName)
router.post('/updatamovie',photoUpload,movies.updataMovie)


module.exports = router