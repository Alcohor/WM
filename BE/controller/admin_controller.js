const admin_module =require('../module/admin_module')
const {dataHandler} = require('../utils/index')

const regist = async (req,res,next)=>{
    let isLogin = await admin_module.judgeUserByUsername(req.body.userName)
    console.log(isLogin.length, 928)
    // 如果没有注册过
    if(!isLogin.length){
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
const list = async (req,res,next)=>{
    let result = await admin_module.list()
    dataHandler(result,res,'admin')//返回的数据处理
    
}
const update = async (req,res,next)=>{
    let result = await admin_module.update(req.body)
    dataHandler(result,res,'admin')//返回的数据处理
    
}

const login = async(req,res,next)=>{
    var _judge_result = await admin_module.judgeUserByUsername(req.body.userName);
    if (!!_judge_result.length) {
        let isPwdRight = await admin_module.login(req.body.passWord, _judge_result[0].passWord)
        if (isPwdRight) {
            if(_judge_result[0].status === 0 || _judge_result[0].userType === 1) {
                req.session.userinfo = {
                    userId: _judge_result[0]._id,
                    permission: _judge_result[0].permission || 1,
                    nickName: _judge_result[0].nickName,
                    userType: _judge_result[0].userType
                }
                res.cookie('nickName', _judge_result[0].nickName)
                res.cookie('userId', _judge_result[0]._id)
                res.render('admin',{code:200,data:JSON.stringify('登录成功')})
            } else if (_judge_result[0].status === 1) {
                res.render('admin',{code:203,data:JSON.stringify('您的账号尚未激活，请等待')})
            } else if (_judge_result[0].status === 2) {
                res.render('admin',{code:204,data:JSON.stringify('您的账号已被封停')})
            }
            
        }else{
            res.render('admin',{code:201,data:JSON.stringify('密码错误')})
        }
    }else{
        res.render('admin',{code:202,data:JSON.stringify('该用户名未注册')})
    }
}

const isLogin = async (req,res,next)=>{
    
    let data = req.session.userinfo ? true : false
    let result = {
        code: 200,
        data:JSON.stringify(data)
    }
    res.render('admin',result)
}

const logout = (req, res) => {
    req.session.userinfo = null;
    let result = {
        code: 200,
        data:JSON.stringify('退出成功')
    }
    res.render('admin',result)
}



module.exports={
    regist,
    login,
    isLogin,
    logout,
    list,
    update
}