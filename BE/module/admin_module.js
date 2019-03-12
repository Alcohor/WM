const mongoose = require('../utils/mongoose')
const bcrypt = require('bcrypt')
const { hash }= require('../utils/hash')


var UserModel = mongoose.model('users',new mongoose.Schema({
    userName:String,
    passWord:String,
    nickName:String,
    userType:Number
}))

const regist = async ({userName,passWord,nickName,userType}) => {
    let _pwd = hash(passWord);
    
return new UserModel({
    userName:userName,
    passWord:_pwd,
    nickName:nickName,
    userType:userType
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

