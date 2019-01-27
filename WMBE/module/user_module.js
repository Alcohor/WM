const mongoose  = require('../utils/mongoose')

const UsersModel = mongoose.model('users')

const getInfo =  (id) => {
    return UsersModel.findById(id)
        .then((result) => {
            return result
        }).catch((err) => {
            return false
        })
}





module.exports= {
    getInfo
}
