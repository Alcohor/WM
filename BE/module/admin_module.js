const mongoose = require('../utils/mongoose')
const bcrypt = require('bcrypt')
const { hash }= require('../utils/hash')


var UserModel = mongoose.model('users',new mongoose.Schema({
    userName:String,
    passWord:String,
    nickName:String,
    userType:Number,
    realName:String,
    phone:String,
    idCard:String,
    status:Number // 0正常 1待激活 2封禁
}))

const regist = async ({userName,passWord,nickName,userType,phone,realName,status,idCard}) => {
    let _pwd = hash(passWord);
    
return new UserModel({
    userName:userName,
    passWord:_pwd,
    nickName:nickName,
    userType:userType,
    phone,
    realName,
    status,
    idCard
}).save()
.then((results)=>{
    let{_id,nickName,userName,userType} = results;
    return { _id,nickName,userName,userType }
}).catch(()=>{
    return false
})
}


const judgeUserByUsername = (_username) => {
    return UserModel
        .find({ userName: _username })
        .then((results) => {
            return results
        })
        .catch(() => {
            return false
        })
            
}
const list = () => {
    return UserModel
        .find()
        .then((results) => {
            return results
        })
        .catch(() => {
            return false
        })
            
}
const update = (body) => {
    console.log(body._id, 1012988)
    return UserModel
        .updateOne({_id:body._id}, body)
        .then((results) => {
            return results
        })
        .catch(() => {
            return false
        })
            
}

const login =  (passWord, _passWord) => {
    return  bcrypt.compareSync(passWord, _passWord)
}





module.exports={
    regist,
    judgeUserByUsername,
    login,
    list,
    update
}

