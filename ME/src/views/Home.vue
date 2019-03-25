<template>
  <section>
    <el-row :gutter="20" style="padding:10px;">
      <el-col :span="12">
        <el-card style="height:230px;">
          <div>
            <span>总销售额</span>
          </div>
          <br>
          <div>
            <span style="font-family:Arial;font-size:30px;">￥{{allSum.toFixed(2)}}</span>
            <span style="font-family:PingFang SC;font-size:14px;">总订单量：{{allOrder.length}}笔</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="height:230px;">
          <div style="height:10px;">
            <span>销售来源</span>
          </div>
          <div id="sitein" style="height:200px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="height:230px;">
          <div>
            <span>访问量</span>
          </div>
          <div id="sitecount" style="height:200px;"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="height:230px;">
          <div>
            <span>客户占比</span>
          </div>
          <div id="customer" style="height:200px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="padding:10px;">
      <el-col :span="24">
        <el-card class="box-card" style="height:500px;">
          <el-tabs v-model="activeName">
            <el-tab-pane label="销售额" name="first">
              <div>
                <el-col :span="19" id="chartSale" style="height:500px;"></el-col>
                <el-col :span="5">
                  <el-table :data="dataTable" style="width: 100%">
                    <el-table-column prop="rage" label="地区" sortable></el-table-column>
                    <el-table-column prop="money" label="成交额" sortable width="100"></el-table-column>
                  </el-table>
                </el-col>
              </div>
            </el-tab-pane>
            <el-tab-pane label="访问量" name="last">访问量</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="padding:10px;">
      <el-col :span="12">
        <el-card class="box-card" style="height:400px;">
          <div slot="header" class="clearfix">
            <span>总销售额</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="height:400px;">
          <div slot="header" class="clearfix">
            <span>总销售额</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import echarts from "echarts";
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      allOrder: [],
      activeName: "first",
      dataTable: [
        {
          rage: "上海",
          money: "￥10000.00"
        },
        {
          rage: "北京",
          money: "￥2300.01"
        },
        {
          rage: "广东",
          money: "￥12330.01"
        },
        {
          rage: "深圳",
          money: "￥231100.01"
        },
        {
          rage: "杭州",
          money: "￥89000.01"
        },
        {
          rage: "重庆",
          money: "￥89000.01"
        },
        {
          rage: "香港",
          money: "￥89000.01"
        }
      ]
    };
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    allSum() {
      let allSum = 0
      this.allOrder.forEach(order => {
       allSum += order.sum
      });
      return allSum
    },
    shopDada() {
      let info = {}
      let arr = []
      this.allOrder.forEach(order => {
        if (info[order.shopName]) {
          info[order.shopName] += order.sum
        } else {
          info[order.shopName] = order.sum
        }
      })
      for (let key in info) {
        arr.push({name: key, value: info[key].toFixed(2)})
      }
      return arr
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let siteIn = echarts.init(document.getElementById("sitein"));
      let siteCount = echarts.init(document.getElementById("sitecount"));
      // let chartSale = echarts.init(document.getElementById("chartSale"));
      // let customer = echarts.init(document.getElementById("customer"));
    
      // 绘制图表
      siteIn.setOption({
        series: [
          {
            type: "pie",
            radius: "55%",
            data: this.shopDada
          }
        ]
      });

      var base = +new Date(1968, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];

      var data = [Math.random() * 300];

      for (var i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }

      // 绘制图表
      siteCount.setOption({
        tooltip: {
          trigger: "axis",
          position: function(pt) {
            return [pt[0], "10%"];
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "10%"]
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10
          }
        ],
        series: [
          {
            name: "模拟数据",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              normal: {
                color: "#3398DB"
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#3398DB"
                  },
                  {
                    offset: 1,
                    color: "#3398DB"
                  }
                ])
              }
            },
            data: data
          }
        ]
      });

      // 绘制图表
      // customer.setOption({
      //   visualMap: {
      //     top: "middle",
      //     right: 10,
      //     color: ["red", "yellow"]
      //   },
      //   radar: {
      //     indicator: [
      //       { text: "10-20", max: 400 },
      //       { text: "20-30", max: 400 },
      //       { text: "30-40", max: 400 },
      //       { text: "40-50", max: 400 },
      //       { text: "50以上", max: 400 }
      //     ]
      //   },
      //   series: (function() {
      //     var series = [];
      //     for (var i = 1; i <= 28; i++) {
      //       series.push({
      //         type: "radar",
      //         symbol: "none",
      //         itemStyle: {
      //           normal: {
      //             lineStyle: {
      //               width: 1
      //             }
      //           },
      //           emphasis: {
      //             areaStyle: { color: "rgba(0,250,0,0.3)" }
      //           }
      //         },
      //         data: [
      //           {
      //             value: [
      //               (40 - i) * 10,
      //               (38 - i) * 4 + 60,
      //               i * 5 + 10,
      //               i * 9,
      //               (i * i) / 2
      //             ],
      //             name: i + 2000 + ""
      //           }
      //         ]
      //       });
      //     }
      //     return series;
      //   })()
      // });

      // 绘制图表
      // chartSale.setOption({
      //   color: ["#3398DB"],
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       // 坐标轴指示器，坐标轴触发有效
      //       type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      //     }
      //   },
      //   grid: {
      //     left: "1%",
      //     right: "5%",
      //     bottom: "20%",
      //     containLabel: true
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       data: [
      //         "1月",
      //         "2月",
      //         "3月",
      //         "4月",
      //         "5月",
      //         "6月",
      //         "7月",
      //         "8月",
      //         "9月",
      //         "10月",
      //         "11月",
      //         "12月"
      //       ],
      //       axisTick: {
      //         alignWithLabel: true
      //       }
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: "value"
      //     }
      //   ],
      //   series: [
      //     {
      //       name: "直接访问",
      //       type: "bar",
      //       barWidth: "30%",
      //       data: [
      //         1000,
      //         5200,
      //         20000,
      //         33400,
      //         39000,
      //         33000,
      //         22000,
      //         3000,
      //         10000,
      //         2000,
      //         10000,
      //         30000
      //       ]
      //     }
      //   ]
      // });
    },
    ...mapActions('user', ['GET_USER_INFO'])
  },
  watch: {
    shopDada() {
      this.drawLine()
    }
  },
  mounted() {
    if (this.userInfo.userType === 1) {
      axios.get('be/api/order/list').then(
        data => {
          this.allOrder = data.data.data.orderList
        }
      )
    }
    this.drawLine()
  }
};
</script>