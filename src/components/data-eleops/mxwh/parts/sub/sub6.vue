<template>
  <div class="dash_sub_wrap">
    <div class="dash_top_btn">
      <button type="button" class="warning" @click="operationBtn()">投运</button>
      <button type="button" class="warning" @click="retireBtn()">退役</button>
    </div>
    <div class="table_wrap">
      <table  class="table">
        <tr>
          <td width="8%">
            <input type="checkbox" v-model='hasCheckAll' @change="checkAll()">
            勾选
          </td>
          <td width="8%">
            序号
          </td>
          <td  width="14%">MRID</td>
          <td width="20%">设备全路径名称</td>
          <td width="20%">电量主站设备名称</td>
          <!-- <td width="20%">所属厂站ID</td> -->
          <td width="10%">电压等级</td>
          <td width="10%">投运状态</td>
        </tr>
      </table>
      <div class="table_content dash_sub1_table">
        <table class="table">
          <tbody>
            <tr v-for="(item,index) in callbackdata.list" :key="index">
              <td width="8%">
                <input type="checkbox" :value="item.mrid" v-model="operation">
              </td>
              <td width="8%">             
                {{index +1}}
              </td>
              <td width="14%" @click="close=true;getItem(item)"><span class="color_warning">{{item.mrid}}</span></td>
              <td width="20%">{{item.pathName}}</td>
              <td width="20%">{{item.localName}}</td>
              <!-- <td width="20%">{{callbackdata.mrid}}</td> -->
              <td width="10%">{{mapBvid(item.bvId)}}</td>
              <td width="10%">{{item.isInUse==1?'投运':'退役'}}</td>
            </tr>
         </tbody>
        </table>
      </div>
    </div>
     <overlay :close.sync="close" @changeSatus='backData()'>
      <div class="sub3_wrap">
        <div class="sub_wrap_sec_title tc_count_title">
          <h4>机组详情信息</h4>
        </div>  
         <div class="sub_main">
          <ul class="sub2_input sub3_input">
            <li>
              <label>
                <span>设备全路径名称:</span>
                <input type="text" class="txt" v-model="subData.pathName" readonly>
              </label>
            </li>
            <li>
              <label>
                <span>电量主站设备名称:</span>
                <input type="text" class="txt"  v-model="subData.localName">
              </label>
            </li>
            <li>
              <label>
                <span>电压等级:</span>
                <select v-model="subData.bvId" id="bvid">
                      <option :value="0">请选择</option>
                      <option v-for="(item,index) in bvidArr" :value="item.bvId" :key="index">
                        {{item.dydj}}kV
                      </option>
                </select>
              </label>
            </li>
          </ul>
          <div class="btn_content">
            <button type="button" @click="saveEquipment()">确定</button>
            <button type="button" class="warning" @click="backData()">重置</button>
          </div>
         </div>
      </div>
    </overlay>
     <overlay :close.sync="close1">
      <touyun :type='6' :ids="operation.join(',')" @tiuyun="operate(operation)" @cancel="close1=false"></touyun>
    </overlay>
    <overlay :close.sync="close2">
      <tuiyi :type='6' :ids="operation.join(',')" @tuiyi="reoperate(operation)" @cancel="close2=false"></tuiyi>
    </overlay>
  </div>
</template>
<script>
import qs from "qs";
import bvids from "@/assets/config/bvidMap";
import BScroll from "better-scroll";
import overlay from "@/components/common/overlay";
import touyun from "../float/touyun";
import tuiyi from "../float/tuiyi";
export default {
  data() {
    return {
      hasCheckAll: false,
      close: false,
      dataList: [],
      bvidArr: bvids,
      subData: {},
      operation: [], //全选集合
      backupData: {},
      close1: false,
      close2: false
    };
  },
  props: ["callbackdata"],
  methods: {
    saveEquipment() {
      //保存
      let querys = {};
      querys.localName = this.subData.localName;
      querys.mrid = this.subData.mrid;
      querys.bvId = this.subData.bvId;
      querys.pathName = this.subData.pathName;
      querys.stId = this.callbackdata.mrid;
      this.$http
        .post(
          "/maintenanceService/maintenance/updateGeneratingUnit?sign=" +
            sessionStorage.getItem("accessToken"),
          querys
        )
        .then(res => {
          if (res.data.code === 1) {
            // alert(res.data.msg)
            this.$notify({
              title: "提示",
              message: "操作成功",
              duration: 1500,
              type: "success"
            });
            this.close = false;
          } else {
            this.$notify({
              title: "提示",
              message: "保存异常",
              duration: 1500,
              type: "error"
            });
          }
        });
    },
    getItem(item) {
      this.subData = item;
      for (var attr in item) {
        this.backupData[attr] = item[attr];
      }
    },
    backData() {
      //为保存退出，还原数据
      for (var attr in this.backupData) {
        this.subData[attr] = this.backupData[attr];
      }
      console.log(this.subData);
    },
    checkAll() {
      if (this.hasCheckAll) {
        this.operation = [];
        this.callbackdata.list.forEach(item => {
          this.operation.push(item.mrid);
        });
      } else {
        this.operation = [];
      }
    },
    operationBtn() {
      this.close1 = true;
    },
    operate(item) {
      //投运
      var queryStr = item.join(",");
      this.$http
        .post(
          "/maintenanceService/maintenance/commissioningModel?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            mrids: queryStr,
            modelType: 6
          })
        ) //ModelType：4
        .then(res => {
          if (res.data.code === 1) {
            // alert(res.data.msg)
            this.$notify({
              title: "提示",
              message: "投运成功",
              duration: 1500,
              type: "success"
            });
          } else {
            this.$notify({
              title: "提示",
              message: "投运异常",
              duration: 1500,
              type: "error"
            });
          }
        });
    },
    retireBtn() {
      this.close2 = true;
    },
    reoperate(item) {
      //退役
      var queryStr = item.join(",");
      this.$http
        .post(
          "/maintenanceService/maintenance/decommissionModel?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            mrids: queryStr,
            modelType: 6
          })
        )
        .then(res => {
          if (res.data.code === 1) {
            // alert(res.data.msg)
            this.$notify({
              title: "提示",
              message: "退役成功",
              duration: 1000,
              type: "success"
            });
          } else {
            this.$notify({
              title: "提示",
              message: "退役异常",
              duration: 1000,
              type: "error"
            });
          }
        });
    },
    mapBvid(id) {
      //匹配电压等级
      var vol = "";
      bvids.forEach(item => {
        if (item.bvId == id) {
          vol = item.dydj + "kV";
        }
      });
      return vol;
    }
  },
  watch: {
    operation: function(news) {
      if (this.operation.length == this.callbackdata.list.length) {
        this.hasCheckAll = true;
      } else {
        this.hasCheckAll = false;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let scroll7 = new BScroll(".dash_sub1_table", {
        scrollbar: true,
        mouseWheel: true,
        preventDefault: false
      });
    });
  },
  components: {
    overlay,
    touyun,
    tuiyi
  }
};
</script>

<style lang="css">
</style>
