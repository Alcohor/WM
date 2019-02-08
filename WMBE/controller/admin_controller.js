const admin_module =require('../module/admin_module')
const {dataHandler} = require('../utils/index')

const regist = async (req,res,next)=>{
    let isLogin = await admin_module.judgeUserByUsername(req.body.username)
    // 如果没有注册过
    if(! isLogin.length){
        // 如果没有输入用户名
        if(!req.body.nickName){
            req.body.nickName = req.body.userName
        }
        let result = await admin_module.regist(req.body)
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
    var _judge_result = await admin_module.judgeUserByUsername(req.body.userName);
    console.log(req.body.userName, 898)
    if (!!_judge_result) {
        let isPwdRight = await admin_module.login(req.body.passWord, _judge_result[0].passWord)
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
        res.render('admin',{code:202,data:JSON.stringify('用户名错误')})
    }
}




module.exports={
    regist,
    login,
}