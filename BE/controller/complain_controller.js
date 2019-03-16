const complain_module = require("../module/complain_module")
const {dataHandler} = require("../utils")
const mAdmin_module = require('../module/mAdmin_module')


const list = async(req,res)=>{
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await complain_module.list(req.query);
    dataHandler(_data, res, 'complain');
}

const create = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let data = await complain_module.create(req.body);
    dataHandler(data, res, 'complain');
}
const update = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let data = await complain_module.update(req.body);
    dataHandler(data, res, 'complain');
}
const deleteComplain = async (req, res) => { 
    res.set('content-type', 'application/json; charset=utf8');
    let data = await complain_module.deleteComplain(req.body);
    dataHandler(data, res, 'complain') ;
}

module.exports = {
    list,
    create,
    deleteComplain,
    update
}