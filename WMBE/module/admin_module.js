const mongoose = require('../utils/mongoose')
const bcrypt = require('bcrypt')
const { hash }= require('../utils/hash')


var UserModel = mongoose.model('users',new mongoose.Schema({
    username:String,
    password:String,
    nickname:String,
    permission:Number
}))

const regist = async ({username,password,nickname,permission})=>{
    let _pwd = hash(password);
    
return new UserModel({
    username:username,
    password:_pwd,
    nickname:nickname,
    permission:permission
}).save()
.then((results)=>{
    let{_id,username,nickname,permission} = results;
    return { _id,username,nickname,permission }
}).catch(()=>{
    return false
})
}


const judgeUserByUsername = (_username) => {
    return UserModel
    .find({ username:_username })
    .then((results) => {
        return results
    })
    .catch(() => {
        return false
    })
            
}

const login =  (pwd,password)=>{
    console.log(pwd,password,'login')
    return  bcrypt.compareSync(pwd, password)
}





module.exports={
    regist,
    judgeUserByUsername,
    login
}

