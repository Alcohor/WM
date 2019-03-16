const mongoose = require('../utils/mongoose');
const Moment = require('moment');
const fs = require('fs-extra')
const PATH = require('path') // 时间格式化

var Complain = mongoose.model('complain', new mongoose.Schema({
    shopId: String,//店铺Id
    shopName: String,//店铺名
    guestId: String,//顾客Id
    guestName: String, // 顾客昵称
    createTime:Number, //投诉时间
    guestPhone:String, //客户电
    content:String, //投诉内容
    status:Boolean // 是否已处理
}));

const list = async(query)=>{
    return Complain.find(query)
    .sort({createTime:-1})
    .then((result)=>{
        return{
            orderList:result,
        }
    }).catch(err=>{
        return false
    })
}
const update = async(body)=>{
    console.log(body, 223)
    return Complain.updateOne({_id:body._id},{...body})
    .then((result)=>{
        return{
            orderList:result,
        }
    }).catch(err=>{
        return false
    })
}

const create = (data) => {
    console.log(data);
    let createTime = Date.now()
    return new Complain({
        ...data,
        status:false,
        createTime
    }).save()
    .then((results) => {
        return results
    })
    .catch((err) => {
        console.log(err)
        return false
    })
}

const deleteComplain = async ({_id}) => {//按照id删除
    return Complain.deleteOne({ _id: _id })
        .then((results) => { 
            return results
        })
        .catch((err) => {
            return false
        })
}


module.exports = {
    list,
    create,//增加数据
    deleteComplain,
    update
}