const user_module = require('../module/user_module')

const isSignIn = (req,res,next)=>{
    if(req.session.userinfo){
        res.render('user',{
            code:200,
            data:JSON.stringify('用户已登录')
        })
    }else{
        res.render('user',{
            code:201,
            data:JSON.stringify('用户未登录')
        })
    }
}

const getInfo= async(req,res,next)=>{
    console.log(req.session, 2983)
    let _result = await user_module.getInfo(req.session.userinfo.userId)
    
        res.render('user',{
            code:200,
            data:JSON.stringify({
                userid: _result._id,
                userName: _result.userName,
                nickName: _result.nickName,
                userType: _result.userType
            })
        })
    
}


const logout=(req,res,next)=>{
    req.session.userinfo = null
    res.render('user', { code: 200, data: JSON.stringify({ msg: '删除成功' }) })
}


module.exports={
    isSignIn,
    logout,
    getInfo
}