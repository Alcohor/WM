
//引入module层
const shop_module = require('../module/shop_module')

//引入错误处理
const {dataHandler} = require("../utils")

//列表显示
const list = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await shop_module.list(req.query);
    dataHandler(_data,res,'shop')//返回的数据处理
}

const shopInfo = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await shop_module.shopInfo({administratorId: req.session.userinfo.userId});
    dataHandler(_data,res,'shop')//返回的数据处理
}
//添加店铺
const save = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    req.body.administratorId = req.session.userinfo.userId
    let _data = await shop_module.save(req.body);
    console.log(_data, 109)
    //判断是否插入成功
    dataHandler(_data,res,'shop')//返回的数据处理 
}

const saveAvatar = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await shop_module.saveAvatar(req);
    //判断是否插入成功
    dataHandler(_data,res,'shop')//返回的数据处理 
}

//删除店铺信息
const remove = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await shop_module.remove(req.query);
    dataHandler(_data,res,'shop')//返回的数据处理
}

//查找ID
const selectID = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await shop_module.selectID(req.query);
    dataHandler(_data,res,'shop')//返回的数据处理
}

//修改提交
const update = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await shop_module.update(req);
    dataHandler(_data,res,'shop')//返回的数据处理
}

module.exports = {
    list,
    shopInfo,
    save,
    saveAvatar,
    remove,
    selectID,
    update
}