const mongoose = require('../utils/mongoose');
const Moment = require('moment');
const fs = require('fs-extra')
const PATH = require('path') // 时间格式化

var Oreders = mongoose.model('order', new mongoose.Schema({
    shopId: String,//店铺Id
    shopName: String,//店铺名
    guestId: String,//顾客Id
    nickName: String, // 顾客昵称
    adress: Object, // 收货地址
    phone:String, //客户电话
    sum: Number,// 金额
    list: Array,// 清单
    createTime: Number,//创建时间
    finishTime: Number,//结束时间
    remark: String,//评论
    status: Number,//订单状态 0已支付 1派送中 2已确认收货
    IsReamrked: Boolean,//是否已评论
    isComplain: Boolean,// 是否被投诉
    complainContent:Boolean, //投诉内容
}));

const _getall = (query) => {//获得所有电影数据
    let _query = query || {}
    return Oreders.find(_query).sort({ createTime: -1 })//查找所有电影信息 * 按照时间降序排列
        .then((results) => {
            return results
        })
        .catch((err) => {
            return false
        })
}

const list = async(query)=>{
    return Oreders.find(query)
    .sort({createTime:-1})
    .then((result)=>{
        return{
            orderList:result,
        }
    }).catch(err=>{
        return false
    })


}


let default_pic = '/uploads/posterPic/defaultPic.jpg'
const save = (data,guest) => {
    let _timestamp = Date.now()
    let moment = Moment(_timestamp)
    console.log(guest, 298)
    return new Oreders({
        ...data,
        nickName: guest.nickName,
        adress: guest.adress,
        phone:guest.phone,
        createTime: _timestamp,
        createTimeFormat: moment.format("YYYY-MM-DD, hh:mm")
    }).save()
        .then((results) => {
            return results
        })
        .catch((err) => {
            return false
        })
}

const getMovieInfoById = ({id}) => {//按照id查找
    return Oreders.findById(id)
        .then((results) => {
            return results
        })
        .catch((err) => {
            return false
        })
}

const getMovieInfoByName = (name) => {
    
    
     return Oreders.find({"movieName":{$regex: eval(`/${name}/ig`)}}).sort({ createTime: -1 })
        .then((results) => {
            return results
        })
        .catch((err) => {
            return false
        })
}

const delMovieInfoById = async ({id}) => {//按照id删除
    let _row = await getMovieInfoById ({id:id})
    let data = {id}.id
    return Oreders.deleteOne({ _id: id })
        .then((results) => {
            results.deleteId = data;
            if ( _row.posterPic && _row.posterPic !== default_pic ) {
                fs.removeSync(PATH.resolve(__dirname, '../public'+_row.posterPic))
            }  
            return results
        })
        .catch((err) => {
            return false
        })
}


const updataMovie = async(body)=>{
    if(!body.posterPic)delete body.posterPic
    let _row = await getMovieInfoById ({id: body._id})
    if ( _row.posterPic && _row.posterPic !== default_pic) {
        fs.removeSync(PATH.resolve(__dirname, '../public'+_row.posterPic))
    }  
    if(body.republish){
        let _timestamp = Date.now()
        let moment = Moment(_timestamp)
        body.createTime = _timestamp,
        body.createTimeFormat = moment.format("YYYY-MM-DD, hh:mm")
        
    }
    body.posterPic =  body.posterPic || default_pic
    return Oreders.updateOne({ _id: body._id }, { ...body }).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
}

const updata = async(body)=>{
return Oreders.updateOne({ _id: body._id }, { ...body }).then((results) => {
    return results
}).catch((err) => {
    return false
}) 
}




module.exports = {
    list:list,
    updata,
    save: save,//增加数据
    getById:getMovieInfoById,//根据ID取出数据
    delById:delMovieInfoById,//根据ID删除数据
    getByName:getMovieInfoByName,
    updataMovie:updataMovie
}