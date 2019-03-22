const shop = require('./shop_module')
const mongoose = require("../utils/mongoose");
//引入处理时间戳
const Moment = require("moment");
//创建model模型
var Active = mongoose.model("actives",new mongoose.Schema({
    id: String, // 活动id
    pic: String, // 活动封面
    end: String, // 结束时间
    type: Array, // 活动类型
    name: String, // 活动时间
    desc: String, // 活动描述
    start: String, // 开始时间ID
  })
);

//返回活动的列表
const list = (query) => {
  let _query = {}; ////查询的约定条件
  return Active.find(_query)
    .sort({ createTime: -1 }) //按时间降序排列
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
}
const pic = () => {////查询的约定条件
  return Active.find()
    .sort({ createTime: -1 }) //按时间降序排列
    .then((results) => {
      let pics = []
      results.forEach(item => {
        pics.push(item.pic)
      })
      return pics
    })
    .catch((err) => {
      return false;
    });
}

const activeInfo = (query) => {
  console.log(query,9090)
  return Active.find(query).then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
};
//返回列表结束

//保存添加活动数据
const save = (body) => {
  let _timestamp = Date.now(); //保存时间
  let moment = Moment(_timestamp);
  return new Active({
    ...body,
    createTime: _timestamp,
    formaTime: moment.format("YYYY-MM-DD, hh:mm")
  }).save()
  .then(results => {
      return results;
    })
    .catch((err) => {
      return false;
    });
};
const savePic = async(req) => {
  req.body.pic ='http://localhost:9090' + req.body.pic
  console.log(req)
  return Active.updateOne({ _id: req.body._id }, req.body)
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
  }

const remove = ( { _id } ) => {//传入iD删除这条信息
  //数据库操作删除，active是数据库模板
   //数据库中存的是_id所以要找到_id中的id
  return Active.deleteOne({ _id: _id }).then( (results) => {
    results.deleteid = id //找到这个id
    return results;
  }).catch( (err) => {
    return false;
  })
 
}

//删除店铺信息结束

//查找ID
const selectID = ({ id }) =>{
  return active.findById(id)
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
}

//修改表单提交
const  update = (req) =>{
  return Active.updateOne({ _id: req.body.id }, req.body)
    .then((results) => {
      console.log(results,198)
      return results
    })
    .catch((err) => {
      return false;
    });
}

module.exports = {
  list,
  pic,
  savePic,
  activeInfo,
  save,
  remove,
  selectID,
  update
};
