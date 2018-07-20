<template lang="html">
  <div class="dash_sub_wrap dash_sub1_wrap">
    <ul class="dash_sub_input">
      <li>
        <label>
          <span>厂站名称：</span>
          <input type="text" class="txt"  v-model="list.pathName">
        </label>
        <label>
          <span>MRID：</span>
          <input type="text" class="txt"  v-model="list.mrid" readonly="readonly">
        </label>
      </li>
      <li>
        <label>
          <span>电量主站厂站名称：</span>
          <input type="text" class="txt" v-model="list.localName">
        </label>
        <label>
          <span>电量主站ID：</span>
          <input type="text" class="txt" v-model="list.localId" readonly="readonly">
        </label>
      </li>
      <li>
        <label>
          <span>厂站类型：</span>
          <select v-model="st" id="bvid">
            <option v-for="(item,index) in menuList" :value="item.actualValue" :key="index">
              {{item.displayValue}}
            </option>
          </select>
        </label>
        <label>
          <span>电压等级：</span>
          <select v-model="bvid" id="bvid">
            <option v-for="(item,index) in bvidArr" :value="item.bvId" :key="index">
              {{item.dydj}}kV
            </option>
          </select>
        </label> 
      </li>
      <li>
        <label>
          <span>投运状态:</span>
            <input type="text" class="txt" v-model="isInUseStr" readonly="readonly">
        </label>
        <label></label>
      </li>
    </ul>
    <div class="btn_content btn_content1">
      <button type="button" @click="modified()">修改</button>
      <button type="button" @click="operationBtn()">投运</button>
      <button type="button"  @click="retireBtn()">退役</button>
      <button type="button" class="warning" @click="backDataFun()">重置</button>
    </div>
    <!-- {{callbackdata}} -->
    <overlay :close.sync="close1">
      <touyun :type='2' :ids='callbackdata.mrid' @tiuyun="operation()" @cancel="close1=false"></touyun>
    </overlay>
    <overlay :close.sync="close2">
      <tuiyi :type='2' :ids='callbackdata.mrid' @tuiyi="retire()" @cancel="close2=false"></tuiyi>
    </overlay>
    <overlay :close.sync="close3">
      <gaizao :type='2' :ids='callbackdata.mrid' @cancel="close3=false" v-if="close3"></gaizao>
    </overlay>
  </div>
</template>

<script>
import qs from "qs";
import bvids from "@/assets/config/bvidMap";
import overlay from "@/components/common/overlay";
import touyun from "../float/touyun";
import tuiyi from "../float/tuiyi";
import gaizao from "../float/gaizao";
export default {
  data() {
    return {
      bvidArr: bvids, //电压等级映射
      menuList: [],
      bvid: "", //默认选中
      st: "",
      dataObj: {}, //提交的数据集合
      nowData: {},
      backData: {},
      close1: false,
      close2: false,
      close3: false,
      isInUseStr: "投运",
      flag: true
    };
  },
  props: ["callbackdata"],
  components: {
    overlay,
    touyun,
    tuiyi,
    gaizao
  },
  created() {
    this.getMenuType();
  },
  computed: {
    list() {
      this.bvid = this.callbackdata.bvId;
      this.st = this.callbackdata.stType;
      console.log(this.nowData);
      this.nowData.isInUse
        ? (this.isInUseStr = "投运")
        : (this.isInUseStr = "退役");
      return this.nowData;
    }
  },
  watch: {
    callbackdata: function(newVal) {
      for (const attr in this.callbackdata) {
        this.backData[attr] = this.callbackdata[attr];
        this.nowData[attr] = this.callbackdata[attr];
      }
    }
  },
  methods: {
    //厂站类型
    getMenuType() {      
      this.$http
        .get(
          "/dataInteractiveService/interaction/getMenu?menuName=SUBSTATION_TYPE&sign=" +
            sessionStorage.getItem("accessToken")
        )
        .then(res => {
          if (res.data.msg == "操作成功！") {
            this.menuList = res.data.data.menuList;
          }
        });
    },
    //重置
    backDataFun() {
      this.nowData = this.backData;
      // console.log(this.nowData);
    },
    //修改
    modified() {
      if (this.flag) {
        this.nowData.stType = this.st;
        this.nowData.bvId = this.bvid;
        this.flag = false;
        this.$http
          .post(
            "/maintenanceService/maintenance/updateSubstation?sign=" +
              sessionStorage.getItem("accessToken"),
            this.nowData
          )
          .then(res => {
            if (res.data.code === 1) {
              this.$emit('refreshData','uppdata after modifty')
              this.flag = true;
              this.$notify({
                title: "提示",
                message: "修改成功！",
                duration: 1500,
                type: "success"
              });
            } else {
              this.flag = true;
              this.$notify({
                title: "提示",
                message: "修改失败",
                duration: 1500,
                type: "error"
              });
            }
          });
      }
    },
    operationBtn() {
      this.close1 = true;
    },
    //投运
    operation() {
      let querys = {};
      querys.mrids = this.callbackdata.mrid;
      querys.modelType = 2;
      this.$http
        .post(
          "/maintenanceService/maintenance/commissioningModel?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify(querys)
        )
        .then(res => {
          if (res.data.code === 1) {
            this.$emit('refreshData','uppdata after modifty')
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
    //退役
    retire() {
      this.$http
        .post(
          "/maintenanceService/maintenance/decommissionModel?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            mrids: this.callbackdata.mrid,
            modelType: 2
          })
        )
        .then(res => {
          if (res.data.code === 1) {
            this.$emit('refreshData','uppdata after modifty')
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
    refromBtm() {
      this.close3 = true;
    }
  }
};
</script>

<style lang="css">
.dash_sub_wrap {
  width: 100%;
  overflow: hidden;
}
.dash_sub_input {
  padding: 0 20px;
}
.dash_sub_input li {
  display: flex;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 28px;
  justify-content: space-around;
}
.dash_sub_input li label {
  display: block;
  width: 50%;
}
.dash_sub_input li label span {
  text-align: right;
  display: inline-block;
  width: 150px;
  color: #fff;
}
.btn_content {
  text-align: center;
  margin-bottom: 18px;
}
.btn_content1 {
  margin-top: 170px;
}
.btn_content button {
  margin-right: 10px;
}
.dash_sub1_wrap {
  margin-top: 40px;
}
</style>
