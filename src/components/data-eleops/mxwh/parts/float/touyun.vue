<template>
    <div class="retire_wraps">
        <div class="float_itle">
          <h4>设备投运</h4>
        </div>
        <label>投运时间：
         <el-date-picker
            class="modified_ate"
            v-model="times"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
        </el-date-picker>
        </label>
        <label>投运原因：
            <textarea class="textarea" v-model="remark"></textarea>
        </label>
        <div class="tjanbox">
            <input  value="确定" title="确定" type="button" @click="touyun()">             
            <input  value="取消" title="取消" type="button" class="warning" @click="cancel()">
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      times: this.$day().format("YYYY-MM-DD HH:mm:ss"),
      remark: ""
    };
  },
  props: ["type", "ids"], //投运设备的类型
  methods: {
    touyun() {
      if (this.ids) {
        this.$http
          .post(
            "/maintenanceService/isInUseEventService/saveIsInUseEvent?sign=" +
              sessionStorage.getItem("accessToken"),
            qs.stringify({
              type: this.type,
              eventType: 1,
              transportationTime: this.times,
              ids: this.ids,
              remark: this.remark
            })
          )
          .then(res => {
            if (res.data.code === 1) {
              this.$emit("tiuyun");
              this.$emit("cancel", false);
            }
          });
      } else {
        // alert("请先选择设备！");
         this.$notify({
          title: '提示',
          message:  '请先选择设备！',
          duration:1000,
          type:'warning'
        });
      }
    },
    cancel() {
      this.$emit("cancel", false);
    }
  }
};
</script>
<style>
.retire_wraps {
  width: 400px;
  height: 220px;
  padding: 12px 16px;
  position: relative;
  text-align: center;
  background: #043434;
}
.retire_wraps label {
  display: block;
  margin-top: 20px;
  cursor: pointer;
}
.tjanbox {
  position: absolute;
  bottom: 22px;
  left: 22px;
  right: 22px;
}
</style>
