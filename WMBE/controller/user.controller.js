const user_module = require('../module/user_module')

const isSignIn = (req,res,next)=>{
    if(req.session.userinfo){
        res.render('user',{
            status:200,
            data:JSON.stringify('用户已登录')
        })
    }else{
        res.render('user',{
            status:201,
            data:JSON.stringify('用户未登录')
        })
    }
}

const getInfo= async(req,res,next)=>{
    let _result = await user_module.getInfo(req.session.userinfo.userid)
    
        res.render('user',{
            status:200,
            data:JSON.stringify({
                userid: _result._id,
                username: _result.username,
                nickname: _result.nickname,
            })
        })
    
}


const logout=(req,res,next)=>{
    console.log(req.session.userinfo,1)
    req.session.userinfo = null
    console.log(req.session.userinfo,2)
    res.render('user', { status: 200, data: JSON.stringify({ msg: '删除成功' }) })
}


module.exports={
    isSignIn,
    logout,
    getInfo
}