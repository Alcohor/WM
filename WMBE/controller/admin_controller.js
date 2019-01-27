const admin_module =require('../module/admin_module')
const {dataHandler} = require('../utils/index')

const regist = async (req,res,next)=>{
    let isLogin = await admin_module.judgeUserByUsername(req.body.username)
    
    if(! isLogin.length){
        
        if(!req.body.nickname){
            req.body.nickname = req.body.username
        }
        let result = await admin_module.regist(req.body)
         dataHandler(result,res,'admin')
    }else{
        let result = {
            status: 201,
            data:JSON.stringify('用户名已存在')
        }
        res.render('admin',result)
    }
}

const login = async(req,res,next)=>{
    var _judge_result = await admin_module.judgeUserByUsername(req.body.username);
    console.log(_judge_result)
    if(!!_judge_result){
        let isPwdRight = await admin_module.login(req.body.password,_judge_result[0].password)
        console.log(isPwdRight)
        if(isPwdRight){
            req.session.userinfo={
                userid:_judge_result[0]._id,
                permission:_judge_result[0].permission||1
            }
            res.render('admin',{status:200,data:JSON.stringify('登录成功')})
        }else{
            res.render('admin',{status:201,data:JSON.stringify('密码错误')})
        }
    }else{
        res.render('admin',{status:202,data:JSON.stringify('用户名错误')})
    }
}




module.exports={
    regist,
    login,
}