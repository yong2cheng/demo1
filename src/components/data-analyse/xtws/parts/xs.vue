<template>
    <div class="xs_main">
        <div class="xs_tool_bar">
            <div class="time_con">
                <div class="time_wrap">
                    <ul class="time_con_li">
                        <li :class="{'li_now':timeFormat=='yyyy-MM-dd'}"  @click="timeFormat='yyyy-MM-dd';timeType='date'">日数据</li>
                        <li :class="{'li_now':timeFormat=='yyyy-MM'}"  @click="timeFormat='yyyy-MM';timeType='month'">月数据</li>
                    </ul>
                    <el-date-picker
                    class="modified_ate"
                    v-model="time"
                    :type="timeType"
                    :value-format="timeType"
                    placeholder="选择日期">
                    </el-date-picker>
                    <button  class="icon-search primary"> 搜索</button>
                </div>              
            </div>
            <div class="vol_con">
                <ul class="xx_but">
                    <li class="nowlis">500kV</li>
                    <li>220kV</li>
                    <li>110kV</li>
                    <li>35kV</li>
                </ul>
            </div>
        </div>
        <div class="xs_content">
            <one />     
        </div>
    </div>
</template>
<script>
import one from './xsOne';
export default {
  data() {
    return {
      time: "",
      timeType: "date",
      timeFormat: "yyy-MM-dd",    
    };
  },components:{
      one,
   }
};
</script>
<style>
.xs_tool_bar {
  width: 99%;
  margin: 5px 0.5%;
  position: relative;
  border-bottom: 1px solid #0d7474;
  height: 70px;
  /* line-height: 70px; */
  display: flex;
}
.time_wrap {
  position: relative;
  height: 30px;
  margin-top: 26px;
}
.time_con_li {
  height: 24px;
  position: absolute;
  left: 0;
  top: -24px;
}
.time_con_li li {
  float: left;
  line-height: 24px;
  padding: 0 18px;
  background: #0d7474;
  color: #fff;
  margin-right: 5px;
  font-size: 12px;
  cursor: pointer;
}
.time_con_li .li_now {
  background: #009f95;
}
.vol_con {
  flex: 1;
  margin-left: 40px;
}
.xx_but {
  margin-top: 20px;
}
.xx_but li {
  float: left;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #075d5d;
  margin: 0 30px;
  color: #84f1f1;
  font-size: 13px;
  cursor: pointer;
  transition: all 500ms;
}
.xx_but li:hover {
  border-color: #dd6b66;
  color: #dd6b66;
}
.xx_but li.nowlis {
  border-color: #dd6b66;
  background: #dd6b66;
  color: #fff;
}
.xs_content{
    padding: 0.5%;
}
</style>


