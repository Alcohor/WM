const bcrypt = require('bcrypt')


const hash = (password) => {  
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hash = bcrypt.hashSync(password, salt);
     //把hash值赋值给password变量
    password = hash;
    return password
  
}

module.exports={hash}
