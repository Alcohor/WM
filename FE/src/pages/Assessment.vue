<template>
  <div>
    <app-header title="订单评价" :isBackShow="true"></app-header>
    <div style="padding: 10px">
      <mt-field
        label="评价："
        placeholder="请输入您的评价"
        type="textarea"
        rows="4"
        v-model="assessment.remark"
      ></mt-field>
        <el-rate id="rate" v-model="assessment.rate"></el-rate>
    <mt-button style="margin-top: 10px" size="large" @click="commitAssessment" type="primary">提交评价</mt-button>
    </div>
  </div>
</template>


<script>
import AppHeader from "@c/common/CommonHeader";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      baseUserInfo: {
        nickName: "",
        phone: ""
      },
      info: this.$route.params.assessmentData,
      assessment: {
        remark: "",
        rate: null
      }
    };
  },
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters("user", ["userInfo"])
  },
  methods: {
    ...mapActions("user", ["GET_USER_INFO"]),

    isPoneAvailable(phone) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(phone)) {
        return false;
      } else {
        return true;
      }
    },

    handleSave() {
      let isPhone = this.isPoneAvailable(this.baseUserInfo.phone);
      if (!isPhone) {
        Toast("请输入正确的手机号");
        return false;
      }
      axios.post("be/m/api/admin/edit", { ...this.baseUserInfo }).then(data => {
        if (data.data.code === 200) {
          Toast("修改成功");
          setTimeout(() => {
            this.$router.push({ name: "mine" });
          }, 1500);
          this.GET_USER_INFO();
        }
      });
    },
    logout() {
      axios.get("be/m/api/admin/logout").then(data => {
        if (data.data.code === 200) {
          Toast("注销成功");
          location.href = "/login";
        }
      });
    },
    commitAssessment(){
      axios.post("be/api/order/edit-order", {...this.assessment, _id: this.info._id, isReamrked:true}).then(data => {
          if (data.data.code===200&&data.data.data.nModified===1){
            Toast("评价成功！");
            setTimeout(() => {
                this.$router.push({ name: "order" });
            }, 1500);
            this.GET_USER_INFO();
          }
      })
    }
  },
  mounted() {
    this.baseUserInfo = this.userInfo;
    console.log(this.$route.params);
  }
};
</script>


<style lang="scss">
</style>
