const mAdmin_module =require('../module/mAdmin_module')
const {dataHandler} = require('../utils/index')
const regist = async (req,res,next)=>{
    let isLogin = await mAdmin_module.judgeUserByUsername(req.body.userName)
    console.log(isLogin.length, 928)
    // 如果没有注册过
    if(!isLogin.length){
        // 如果没有输入用户名
        if(!req.body.nickName){
            req.body.nickName = req.body.userName
        }
        let result = await mAdmin_module.regist(req.body)
        dataHandler(result,res,'admin')
    }else{
        let result = {
            code: 201,
            data:JSON.stringify('用户名已存在')
        }
        res.render('admin',result)
    }
}

const login = async(req,res,next)=>{
    var _judge_result = await mAdmin_module.judgeUserByUsername(req.body.userName);
    console.log(_judge_result,9098)
    if (!!_judge_result.length) {
        let isPwdRight = await mAdmin_module.login(req.body.passWord, _judge_result[0].passWord)
        if (isPwdRight) {
            req.session.userinfo = {
                userId: _judge_result[0]._id,
                permission: _judge_result[0].permission || 1,
                nickName: _judge_result[0].nickName,
                userType: _judge_result[0].userType
            }
            res.cookie('nickName', _judge_result[0].nickName)
            res.cookie('userId', _judge_result[0]._id)
            res.render('admin',{code:200,data:JSON.stringify('登录成功')})
        }else{
            res.render('admin',{code:201,data:JSON.stringify('密码错误')})
        }
    }else{
        res.render('admin',{code:202,data:JSON.stringify('该用户名未注册')})
    }
}

const userInfo = async(req,res,next) => {
  let result = await mAdmin_module.userInfo(req)
  dataHandler(result,res,'user')
}

const edit = async(req, res) => {
let result = await mAdmin_module.edit(req)
    dataHandler(result, res, 'user')
}




module.exports={
    regist,
    login,
    edit,
    userInfo
}