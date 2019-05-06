
//引入module层
const shop_module = require('../module/shop_module')
const order_moudle = require('../module/order_module')
const _ = require('lodash')
//引入错误处理
const {dataHandler} = require("../utils")

//列表显示
const list = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await shop_module.list(req.query);
    dataHandler(_data,res,'shop')//返回的数据处理
}
const id = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    if(!req.session.userinfo) {
        res.render('user',{
            code:201,
            data:JSON.stringify('请登录')
        })
        return
    }
    let _data = await shop_module.id({administratorId: req.session.userinfo.userId});
    dataHandler(_data,res,'shop')//返回的数据处理
}
const shopInfoById = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await shop_module.selectID(req.query);
    dataHandler(_data,res,'shop')//返回的数据处理
}
const status = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await shop_module.status(req);
    dataHandler(_data,res,'shop')//返回的数据处理
}

const shopInfo = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    if(!req.session.userinfo) {
        res.render('user',{
            code:201,
            data:JSON.stringify('请登录')
        })
        return
    }
    let _data = await shop_module.shopInfo({administratorId: req.session.userinfo.userId});
    dataHandler(_data,res,'shop')//返回的数据处理
}
//添加店铺
const save = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    if(!req.session.userinfo) {
        res.render('user',{
            code:201,
            data:JSON.stringify('请登录')
        })
        return
    }
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
const editShop = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await shop_module.editShop(req.body);
    dataHandler(_data,res,'shop')//返回的数据处理
}
const orderShop = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let guestId = req.session.userinfo.userId
    let orderList = await order_moudle.list({guestId})
    let shopList = await shop_module.list();
    let list = []
    orderList.orderList.forEach(order => {
        let shop = shopList.filter(shop => {
            return shop._id == order.shopId;
        })
        if (shop.length) {
            list.push(shop[0])
        }
    })
    list = _.uniqWith(list, _.isEqual);

    dataHandler(list,res,'shop')//返回的数据处理
}

module.exports = {
    list,
    id,
    shopInfo,
    shopInfoById,
    save,
    saveAvatar,
    remove,
    selectID,
    update,
    status,
    editShop,
    orderShop,
}