const mongoose = require("../utils/mongoose");
//引入处理时间戳
const Moment = require("moment");

//创建model模型
var Shop = mongoose.model("shops",new mongoose.Schema({
    pic: String,
    administratorId: String, //管理员ID
    shopName: String,//店铺名称
    foodsType: String,// 菜系
    notice: String,// 店铺公告
    mark: Array, // 店铺标签
    delivery: Boolean, // 是否立即配送
    startTime: String,// 营业起始时间
    endTime:String,// 营业结束时间
    startCost: Number,// 起送金额
    deliveryCost: Number,// 配送费
    packageCost: Number,// 打包费
    status: Boolean, //上下架状态
    stars: Number // 店铺评分
  })
);

//返回店铺的列表
const list = (query) => {
  let _query = {}; ////查询的约定条件
  return Shop.find(_query)
    .sort({ createTime: -1 }) //按时间降序排列
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
}

const shopInfo = (query) => {
  return Shop.find(query).then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
};
const id = (query) => {
  return Shop.find(query).then((results) => {
      return results[0].id
    })
    .catch((err) => {
      return false;
    });
};
//返回列表结束

//保存添加店铺数据
const save = (body) => {
  let _timestamp = Date.now(); //保存时间
  let moment = Moment(_timestamp);
  return new Shop({
    ...body,
    createTime: _timestamp,
    formaTime: moment.format("YYYY-MM-DD, hh:mm")
  }).save()
  .then(results => {
      console.log(results,927)
      return results;
    })
    .catch((err) => {
      return false;
    });
};
const saveAvatar = (req) => {
  req.body.pic ='http://localhost:9090' + req.body.pic
  return Shop.updateOne({ administratorId:req.session.userinfo.userId }, req.body)
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });

  }

//删除店铺信息
const remove = ( { id } ) => {//传入iD删除这条信息
  //数据库操作删除，shop是数据库模板
   //数据库中存的是_id所以要找到_id中的id
  return Shop.deleteOne({ _id: id }).then( (results) => {
    results.deleteid = id //找到这个id
    return results;
  }).catch( (err) => {
    return false;
  })
 
}

//删除店铺信息结束

//查找ID
const selectID = ({ id }) =>{
  return Shop.findById(id)
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
}

//修改表单提交
const  update = (req) =>{
  return Shop.updateOne({ administratorId:req.session.userinfo.userId }, req.body)
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
}
const editShop= (body) =>{
  return Shop.updateOne({ _id: body._id }, body)
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
}
const status = (req) =>{
  return Shop.updateOne({ _id: req.body._id }, req.body) 
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
}

module.exports = {
  list,
  id,
  saveAvatar,
  shopInfo,
  save,
  remove,
  selectID,
  update,
  status,
  editShop
};
