
//引入module层
const active_module = require('../module/active_module')
const shop_module = require('../module/shop_module')

//引入错误处理
const {dataHandler} = require("../utils")

//列表显示
const list = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await active_module.list(req.query);
    dataHandler(_data,res,'active')//返回的数据处理
}
const pic = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await active_module.pic(req.query);
    dataHandler(_data,res,'active')//返回的数据处理
}

const activeInfo = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await active_module.activeInfo(req.query);
    dataHandler(_data,res,'active')//返回的数据处理
}
//创建活动
const create = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await active_module.save({
    pic: '',
    start: '', //开始时间ID
    end: '',//结束时间
    type: '',// 活动类型
    desc: '',// 活动描述
    });
    //判断是否插入成功
    dataHandler(_data,res,'active')//返回的数据处理 
}

const savePic = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await active_module.savePic(req);
    //判断是否插入成功
    dataHandler(_data,res,'active')//返回的数据处理 
}

//删除活动信息
const remove = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await active_module.remove(req.body);
    dataHandler(_data,res,'active')//返回的数据处理
}

//查找ID
const selectID = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await active_module.selectID(req.query);
    dataHandler(_data,res,'active')//返回的数据处理
}

//修改提交
const update = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await active_module.update(req);
    dataHandler(_data,res,'active')//返回的数据处理
}

module.exports = {
    pic,
    list,
    create,
    activeInfo,
    savePic,
    remove,
    selectID,
    update
}