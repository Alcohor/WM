const order_module = require("../module/order_module")
const {dataHandler} = require("../utils")



const list = async(req,res)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await order_module.list(req.query);
    dataHandler(_data, res, 'order')
}

const create = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await order_module.save(req.body); //获取所有电影数据的方法
    dataHandler(_data, res, 'order') //返回的数据处理
}

const getMovieInfoById = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await order_module.getById(req.query); //根据请求的 query 返回单个信息的方法
    dataHandler(_data, res, 'order') //返回的数据处理
}

const delMovieInfoById = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await order_module.delById(req.query) //根据请求的 query 返回单个信息的方法
    dataHandler(_data, res, 'order') //返回的数据处理
}

const getMovieInfoByName = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')

    let _data = await order_module.getByName(req.query.movieName); //根据请求的 query 返回单个信息的方法
    dataHandler(_data, res, 'order') //返回的数据处理
}

const updataStatus = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await order_module.updataMovie(req.body);
    dataHandler(_data,res,'order')
}

const remark = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await order_module.updataMovie(req.body);
    dataHandler(_data,res,'order')
}

module.exports = {
    list,
    create,
    remark,
    updataStatus,
}