const shop = require('./shop_module')
const mongoose = require("../utils/mongoose");
//引入处理时间戳
const Moment = require("moment");
//创建model模型
var Foods = mongoose.model("foods",new mongoose.Schema({
    id: String, // 餐食id
    pic: String, // 餐食缩略图
    type: Array, // 餐食类型
    name: String, // 餐食名称
    price: Number, // 餐食价格
    info: String, // 餐食信息
    saleMount:Number, // 月销量 
    shopId: String, // 店铺ID
    status:Boolean //上下架状态
  })
);

//返回餐食的列表
const list = (query) => {
  return Foods.find(query)
    .sort({ createTime: -1 }) //按时间降序排列
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
}
const pic = () => {////查询的约定条件
  return Foods.find()
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

const foodsInfo = (query) => {
  return Foods.find(query).then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
};
const deleteFood = (query) => {
  return Foods.deleteOne(query).then((results) => {
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
  return new Foods({
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
  // let id = await shop.id({administratorId: req.session.userinfo.userId})
  console.log(req.body._id,909098)
  let id = req.body._id
  return Foods.updateOne({ _id: id }, req.body)
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
  }

//删除店铺信息
const remove = ( { id } ) => {//传入iD删除这条信息
  //数据库操作删除，foods是数据库模板
   //数据库中存的是_id所以要找到_id中的id
  return Foods.deleteOne({ _id: id }).then( (results) => {
    results.deleteid = id //找到这个id
    return results;
  }).catch( (err) => {
    return false;
  })
 
}

//删除店铺信息结束

//查找ID
const selectID = ({ id }) =>{
  return Foods.findById(id)
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
}

//修改表单提交
const  update = (req) =>{
  return Foods.updateOne({ _id: req.body._id }, req.body)
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
  deleteFood,
  foodsInfo,
  save,
  remove,
  selectID,
  update
};
