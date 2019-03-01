const mongoose = require('../utils/mongoose')
const bcrypt = require('bcrypt')
const { hash }= require('../utils/hash')
const {io}  = require('../app')
var MUserModel = mongoose.model('mUsers',new mongoose.Schema({
    userName:String,
    passWord:String,
    nickName:String,
    adress: Object,
    phone:String,
    avatar:String,
    locat:Object
}))

const regist = async ({userName,passWord,nickName,userType}) => {
    let _pwd = hash(passWord);
    
return new MUserModel({
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
    return MUserModel
        .find({ userName: _username })
        .then((results) => {
            return results
        })
        .catch(() => {
            return false
        })
            
}

const userInfo = (req) => {
  if (!req.session.userinfo) {
    return []
  }
  console.log(req.session.userinfo.userId, 9082)
  return MUserModel
  .find({ _id: req.session.userinfo.userId })
  .then((results) => {
      return results
  })
  .catch(() => {
      return false
  })
} 

const edit = (req) => {
    console.log(req.body, 908)
  return MUserModel.updateOne({ _id: req.session.userinfo.userId }, req.body)
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
    edit,
    userInfo
}

