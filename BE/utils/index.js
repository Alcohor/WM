const hash = require('./hash')
const none = ()=>{}

//数据处理
const dataHandler = (data,res,template,callbacks = {})=>{
    
    let{success,fail} = {
        success:callbacks.success||none,
        fail:callbacks.fail||none,
    }
    if(!data){//失败
        fail();
        response.call(res,{template,"code":"500","data":JSON.stringify("发生了一个预期之外的错误的错误")})
    }else{
        success();
        response.call(res,{template,"code":'200',"data":JSON.stringify(data)})
    }
}

const response = function({template,code,data}){
    this.render(template,{
        "code":code,
        "data":data
    })
} 


module.exports = {
    dataHandler,
    hash
}