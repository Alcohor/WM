
//引入module层
const foods_module = require('../module/foods_module')
const shop_module = require('../module/shop_module')

//引入错误处理
const {dataHandler} = require("../utils")

//列表显示
const list = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await foods_module.list(req.query);
    dataHandler(_data,res,'foods')//返回的数据处理
}
const pic = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await foods_module.pic(req.query);
    dataHandler(_data,res,'foods')//返回的数据处理
}

const deleteFood = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await foods_module.deleteFood(req.query);
    dataHandler(_data,res,'foods')//返回的数据处理
}

const foodsInfo = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await foods_module.foodsInfo(req.query);
    dataHandler(_data,res,'foods')//返回的数据处理
}
//创建餐食
const create = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let shopInfo = await shop_module.shopInfo({ administratorId:req.session.userinfo.userId })
    let _data = await foods_module.save({
      pic: '', // 餐食缩略图
      type: [], // 餐食类型
      name: '', // 餐食名称
      price: 0, // 餐食价格
      info: '', // 餐食信息
      saleMount:0, // 月销量 
      shopId: req.body.shopId, //店铺ID
    });
    //判断是否插入成功
    dataHandler(_data,res,'foods')//返回的数据处理 
}

const savePic = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await foods_module.savePic(req);
    //判断是否插入成功
    dataHandler(_data,res,'foods')//返回的数据处理 
}

//删除活动信息
const remove = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await foods_module.remove(req.query);
    dataHandler(_data,res,'foods')//返回的数据处理
}

//查找ID
const selectID = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await foods_module.selectID(req.query);
    dataHandler(_data,res,'foods')//返回的数据处理
}

//修改提交
const update = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await foods_module.update(req);
    dataHandler(_data,res,'foods')//返回的数据处理
}

module.exports = {
    pic,
    list,
    deleteFood,
    create,
    foodsInfo,
    savePic,
    remove,
    selectID,
    update
}