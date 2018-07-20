<template lang="html">
  <div class="dash_sub_wrap dash_sub3_wrap">
      <!-- {{callbackdata}} -->
    <h4 class="lines">绕组信息</h4>
    <div class="dash_top_btn">
      <button type="button" class="warning" @click="operationBtn(10)">投运</button>
      <button type="button" class="warning" @click="retireBtn(10)">退役</button>
    </div>
    <table  class="table">
      <tr>
        <td width="8%">
          <input type="checkbox" @change="checkAll($event)">
          勾选
        </td>
        <td width="8%">
          序号
        </td>
        <td>MRID</td>
        <td>设备全路径名称</td>
        <td>电量主站设备名称</td>
        <!-- <td>所属厂站ID</td> -->
        <td>电压等级</td>
        <td>投运状态</td>
      </tr>
    </table>
    <div class="table_content sub3_two">
      <table class="table">
        <tr v-for="(item,index) in rData">
          <td  width="8%">
            <input type="checkbox" :value="item.mrid" v-model="operation">       
          </td>
          <td  width="8%">
            {{index + 1}}
          </td>
          <td @click="close=true;getItem(item);">
            <span class="color_warning">{{item.mrid}}</span>
          </td>
          <td>{{item.pathName}}</td>
          <td>{{item.localName}}</td>
          <!-- <td>{{callbackdata.mrid}}</td> -->
          <td>{{mapBvid(item.bvId)}}</td>
          <td>{{item.isInUse==1?'投运':'退役'}}</td>
        </tr>
      </table>
    </div>
    <h4 class="lines">变压器信息</h4>
    <div class="dash_top_btn">
      <button type="button" class="warning" @click="operationBtn(12)">投运</button>
      <button type="button" class="warning" @click="retireBtn(12)">退役</button>
    </div>
    <table  class="table">
      <tr>
        <td  width="8%">
          <input type="checkbox" @change="checkAll1($event)">
          勾选
        </td>
        <td  width="8%">
          序号
        </td>
        <td>MRID</td>
        <td>设备全路径名称</td>
        <td>电量主站设备名称</td>
         <td>投运状态</td>
      </tr>
    </table>
    <div class="table_content sub3_one">
      <table class="table">
        <tr v-for="(item,index) in callbackdata.list">
          <td  width="8%">
            <input type="checkbox" :value="item.mrid" v-model="operation1">
          </td>
          <td  width="8%">
            {{index + 1}}
          </td>
          <td  @click="close1=true;getItem1(item);">
            <span class="color_warning">{{item.mrid}}</span>
          </td>
          <td>{{item.pathName}}</td>
          <td>{{item.localName}}</td>
           <td>{{item.isInUse==1?'投运':'退役'}}</td>
        </tr>
      </table>
    </div>
    <!--  变压器信息-->
    <overlay :close.sync="close1" @changeSatus='backData1()'>
      <div class="sub3_wrap">
         <div class="sub_wrap_sec_title tc_count_title">
            <h4>变压器详情信息</h4>
         </div>
          <div class="sub_main">
            <ul class="sub2_input sub3_input">
            <li>
              <label>
                <span>设备全路径名称:</span>
                <input type="text" class="txt" v-model="subData1.pathName" readonly>
              </label>
            </li>
            <li>
              <label>
                <span>电量主站设备名称:</span>
                <input type="text" class="txt"  v-model="subData1.localName">
              </label>
            </li>
            </ul>
            <div class="btn_content">
              <button type="button" @click="saveEquipment(subData1)">确定</button>
              <button type="button" class="warning" @click="backData1()">重置</button>
            </div>
          </div>
      </div>
    </overlay>
    <!--  绕组信息-->
    <overlay :close.sync="close" @changeSatus='backData()'>
      <div class="sub3_wrap">
         <div class="sub_wrap_sec_title tc_count_title">
            <h4>绕组详情信息</h4>
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
            <button type="button" @click="updateTransformerWinding(subData)">确定</button>
            <button type="button" class="warning" @click="backData()">重置</button>
          </div>
         </div> 
      </div>
    </overlay>

    <overlay :close.sync="close2">
      <touyun :type='type' :ids="operations.join(',')" @tiuyun="operate(operations)" @cancel="close2=false" v-if="close2"></touyun>
    </overlay>
    <overlay :close.sync="close3">
      <tuiyi :type='type' :ids="operations.join(',')" @tuiyi="reoperate(operations)" @cancel="close3=false" v-if="close3"></tuiyi>
    </overlay>
  </div>
</template>

<script>
import qs from "qs";
import bvid from "@/assets/config/bvidMap";
import BScroll from "better-scroll";
import overlay from "@/components/common/overlay";
import touyun from "../float/touyun";
import tuiyi from "../float/tuiyi";
export default {
  data() {
    return {
      bvidArr: bvid,
      rData: [], //绕组
      operation: [],
      operation1: [],
      operations: [], //投运退役传过去的数组集合
      close: false,
      close1: false,
      subData: {},
      backupData: {},
      subData1: {},
      backupData1: {},
      type: 10,
      close2: false,
      close3: false
    };
  },
  props: ["callbackdata"],
  methods: {
    //保存变压器
    saveEquipment(item) {
      let querys = {};
      querys.localName = item.localName;
      querys.mrid = item.mrid;
      querys.pathName = item.pathName;
      querys.stId = this.callbackdata.mrid;
      this.$http
        .post(
          "/maintenanceService/maintenance/updatePowertransformer?sign=" +
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
            this.close1=false;
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
     //绕组
    updateTransformerWinding(item) {
      let querys = {};
      querys.localName = item.localName;
      querys.mrid = item.mrid;
      querys.bvId = item.bvId;
      querys.pathName = item.pathName;
      querys.stId = this.callbackdata.mrid;
      this.$http
        .post(
          "/maintenanceService/maintenance/updateTransformerWinding?sign=" +
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
            this.close=false;
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
     //为保存退出，还原数据
    backData() {
      for (var attr in this.backupData) {
        this.subData[attr] = this.backupData[attr];
      }
      // console.log(this.subData);
    },
    getItem1(item) {
      this.subData1 = item;
      for (var attr in item) {
        this.backupData1[attr] = item[attr];
      }
    },
     //为保存退出，还原数据
    backData1() {
      for (var attr in this.backupData1) {
        this.subData1[attr] = this.backupData1[attr];
      }
      console.log(this.subData1);
    },
    checkAll(event) {
      if (event.target.nodeName == "INPUT") {
        if (event.target.checked) {
          this.rData.forEach(item => {
            this.operation.push(item.mrid);
          });
        } else {
          this.operation = [];
        }
      }
    },
    checkAll1(event) {
      if (event.target.nodeName == "INPUT") {
        if (event.target.checked) {
          this.callbackdata.list.forEach(item => {
            this.operation1.push(item.mrid);
          });
        } else {
          this.operation1 = [];
        }
      }
    },
    operationBtn(type) {
      this.type = type;
      type == 12
        ? (this.operations = this.operation1)
        : (this.operations = this.operation);
      this.close2 = true;
    },
     //投运
    operate(item) {
      var queryStr = item.join(",");
      this.$http
        .post(
          "/maintenanceService/maintenance/commissioningModel?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            mrids: queryStr,
            modelType: this.type
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
    retireBtn(type) {
      this.type = type;
      type == 12
        ? (this.operations = this.operation1)
        : (this.operations = this.operation);
      this.close3 = true;
    },
          //退役
    reoperate(item) {
      console.log(item);
      var queryStr = item.join(",");
      this.$http
        .post(
          "/maintenanceService/maintenance/decommissionModel?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            mrids: queryStr,
            modelType: this.type
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
      //匹配电压等级
    mapBvid(id) {
      var vol = "";
      bvid.forEach(item => {
        if (item.bvId == id) {
          vol = item.dydj + "kV";
        }
      });
      return vol;
    }
  },

  created() {
    this.callbackdata.list.forEach(item => {
      item.transformerWindingModels.forEach(arr => {
        this.rData.push(arr);
      });
    });
  },
  mounted() {
    this.$nextTick(() => {
      let sub3_one = new BScroll(".sub3_one", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
        preventDefault: false
      });
      let sub3_two = new BScroll(".sub3_two", {
        scrollbar: {
          fade: false,
          interactive: true
        },
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
.dash_sub3_wrap {
  overflow: auto !important;
}
.lines {
  border-bottom: 1px dashed #51a5a5;
  line-height: 30px;
  margin-bottom: 10px;
}
.sub3_one,
.sub3_two {
  max-height: 20vh;
}
@media only screen and (max-width: 1399px) {
  .sub3_two {
    max-height: 10vh;
  }
}
</style>
