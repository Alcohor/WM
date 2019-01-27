const userloginAuth=(req,res,next)=>{
    if(req.session.userinfo){
        next()
    }else{
        res.render('user',{
            status:403,
            data:JSON.stringify('登录可能过期，请重新登录')
        })
    }
}