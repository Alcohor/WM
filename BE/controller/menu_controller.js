const menu_module =require('../module/menu_module')
const {dataHandler} = require('../utils/index')


const menu = async(req,res,next)=>{
    // console.log(req, 'menu')
    // var _judge_result = await admin_module.judgeUserByUsername(req.body.userName);
    // if (!!_judge_result) {
    //     let isPwdRight = await admin_module.login(req.body.passWord, _judge_result[0].passWord)
    //     if (isPwdRight) {
    //         req.session.userinfo = {
    //             userid: _judge_result[0]._id,
    //             permission: _judge_result[0].permission || 1
    //         }
    //         res.render('admin',{code:200,data:JSON.stringify('登录成功')})
    //     }else{
    //         res.render('admin',{code:201,data:JSON.stringify('密码错误')})
    //     }
    // }else{
    //     res.render('admin',{code:202,data:JSON.stringify('用户名错误')})
    // }
}




module.exports={
    menu
}