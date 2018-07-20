<template>
    <div>
        <div class="bankuaibox">
            <div class="mxian_succ">
                <!-- 顶部工具栏 -->
                <cjxq ref="top" @showHistoryList="getRestList"></cjxq>
                <!-- echart曲线 and 取值操作 -->
                <sjtj ref="chart"></sjtj>
            </div>
        </div>
        <overlay :close.sync="close">
          <log v-if="close" ></log>
        </overlay>
    </div>
</template>

<script>
import cjxq from "./parts/ModelTop";
import sjtj from "./parts/ModelChart";
import log from"./parts/logs";
import iconBtn from "../common/IconBtn";
import overlay from "@/components/common/overlay";
import hub from "@/assets/eventBus.js";
export default {
  data: function() {
    return {
      close:false,//历史记录
      close1:false,//电表
    };
  },
  components: { cjxq, sjtj, iconBtn,overlay,log },
  methods: {
    getRestList(msg){
      this.close = msg;
    },
  },
  mounted: function() {}
};
</script>

<style>
#dbpgqx_data div {
  width: 48%;
  height: 48%;
  float: left;
}
#dbpgqx_data div:last-child {
  float: right;
  margin-right: 4%;
}
.zero {
  box-shadow: none !important;
  background: #043434 !important;
}
.historyLogs {
  text-align: center !important;
  font-size: 14px;
}
.logWrap {
  padding-top: 30px;
  width: 75%;
  margin: 0 auto;
  height: 400px;
  overflow: hidden;
  position: relative;
}
.btnWrap {
  width: 75%;
  padding-top: 30px;
  margin: 0 auto;
  overflow: hidden;
}
.rightTable td {
  text-align: center !important;
  font-size: 13px !important;
  cursor: pointer;
}
.btnWrap button {
  float: right;
  margin-right: 18px;
}
.hisTable {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.fixedHead {
  position: absolute;
  width: 98.3%;
  top: 30px;
  left: 0;
  z-index: 100;
}
/* .switch {
  background: #043434 !important;
} */
table td {
  text-align: center;
  font-size: 13px;
}
.devName {
  display: inline-block;
  width: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #f6726c;
  font-size: 12px;
  cursor: pointer;
}
#jld_data_xd ul {
  height: 28px;
  width: 100%;
  margin-left: 12%;
}
#jld_data_xd li {
  text-align: center;
  float: left;
  width: 13%;
}
#jld_data_xd ul:last-child {
  color: #ddd;
}
.aa {
  transform: scale(0.6, 0.6);
}
.error_color {
  width: 520px;
}
.timeSwitch li {
  float: left;
}
#toDay,
#toMon {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  padding: 0 10px;
  background: #0d7474;
  color: #fff;
  margin-right: 2px;
  font-size: 13px;
  cursor: pointer;
}
.activeColor {
  background: #009f95 !important;
}
.xzts {
  min-width: 165px;
  max-width: 200px;
}
.xzts li {
  overflow: hidden;
}
.xzts li span {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}
.xzts li span:first-child {
  max-width: 60%;
}
.xzts li span:last-child {
  max-width: 25%;
}
.bubbly {
  position: absolute;
  width: 108px;
  height: 45px;
  line-height: 45px;
  background: rgba(13, 116, 116, 0.7);
  text-align: center;
  border-radius: 8px;
  color: #f6726c;
  top: 0;
  right: -128px;
  /* opacity: .7; */
}
.bubbly::after {
  content: "";
  display: inline-block;
  position: absolute;
  height: 0;
  width: 0;
  border: 10px solid transparent;
  border-right: 10px solid rgba(13, 116, 116, 0.7);
  left: -20px;
  top: 50%;
  transform: translateY(-10px);
}
.ulCls {
  width: 220px;
}
.ulCls > li {
  width: 70px;
  background-color: #0d7474;
  margin: 0 2px;
  cursor: pointer;
}
li.liCls {
  background-color: #009f95;
}
.inbl {
  display: inline-block;
}
.cjxq_bar {
  width: 97%;
  height: 80px;
  padding: 10px 1%;
  margin: 0.5em 0.5%;
  background: #035252;
  box-shadow: inset 0 0 0 1px #0d7474;
  color: #84f1f1;
  font-size: 15px;
}
.dbqx_time {
  line-height: 30px;
  padding: 0 10px;
  display: block;
  font-size: 12px;
  text-align: center;
}
.devName {
  display: inline-block;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #f6726c;
  font-size: 12px;
  cursor: pointer;
}
.znyp_dbqx_data {
  width: 57%;
  margin-left: 10px;
}
.search_box {
  margin-left: -10px;
  margin-top: 30px !important;
}
.search_btn {
  width: 32px;
  height: 32px;
  background: #0d7474;
  border: none;
  cursor: pointer;
  position: relative;
  color: #84f1f1;
  font-size: 15px;
  text-align: center;
  line-height: 32px !important;
  transition: all 100ms;
}
.margin-bom {
  vertical-align: top;
  margin-top: 10px;
}
.tbn_fun {
  margin-top: 15px !important;
}
.render_box {
  width: 99%;
  margin: 0 auto;
  background: #043434;
  font-size: 15px;
  position: relative;
}
.echart_left {
  width: 80%;
  margin: 0;
  padding: 0;
  display: inline-block;
}
.operate_right {
  width: 19%;
  display: inline-block;
  margin: 0;
  padding: 0;
}
.btn_left_side {
  position: absolute;
  top: 50%;
  left: -21px;
  width: 20px;
  height: 20px;
  background: url("../../../assets/img/icons.png") no-repeat;
  cursor: pointer;
}
.btn_side_r {
  background-position: -82px -254px;
}
.btn_side_l {
  background-position: -59px -224px;
}
.side_nav {
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgb(13, 116, 116);
  width: 21%;
  z-index: 10000;
  height: 100%;
  overflow: hidden;
}
.tree_box {
  z-index: 11;
  background: #0d7474;
  margin-top: 10px;
  margin-left: 18px;
}
#dbpgqx_data div {
  width: 48%;
  height: 48%;
}
.sjbg,
.shbg {
  width: 96%;
  height: 386px;
  margin: 0 2%;
  text-align: center;
}
.text_sjbj {
  width: 90%;
  margin: 0 5%;
  padding: 3px 0;
  color: #fff;
  background: #012323;
  border-radius: 4px;
  display: block;
  text-align: center;
  font-size: 14px;
  box-shadow: inset 0 2px 5px 1px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.2);
  outline: none;
  border: none;
}
.sjbg table tbody tr td i {
  float: right;
  width: 24px;
  font-size: 18px;
  cursor: pointer;
  color: #f6726c;
}
[class^="icon-"],
[class*=" icon-"] {
  font-family: "icomoon" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.xzts {
  position: absolute;
  top: -25px;
  left: 95%;
  width: 155px;
  padding: 5px 10px;
  border-radius: 5px;
  background: #0d7474;
  z-index: 50;
  box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.3), inset 0 0 0 1px #0a9c9c;
  text-align: left;
  line-height: 28px;
  min-width: 165px;
  max-width: 200px;
}
.xzts li {
  overflow: hidden;
}
.xzts li {
  font-size: 12px !important;
}
.xzts li span:first-child {
  max-width: 60%;
}
.xzts li span {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}
.xzts li i.red {
  color: #e72f2f;
}
.xzts li i {
  padding: 0 2px 0 5px;
  color: #fff;
}
.xzts li span:last-child {
  max-width: 25%;
}
.sjbg table tbody tr th {
  position: relative;
}
</style>

