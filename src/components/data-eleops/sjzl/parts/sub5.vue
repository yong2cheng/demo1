<template lang="html">
  <div class="sjzl_sub_wrap">
    <div class="tool_bar sjzl_fx_tool_bar">
      <label>电压等级:</label>
      <select v-model="searchBvid">
          <option value="">所有电压</option>
          <option v-for="(item,index) in bvidArr" :value="item.bvId" :key="index">
            {{item.dydj}}kV
        </option>
      </select>
      <label>线路类型:</label>
      <select v-model="lineType">
          <option value="1">输电线路</option>
          <option value="2">T接线路</option>
          <option value="3">派接线路</option>
      </select>
      <el-date-picker
        class="modified_ate"
        v-model="time"
        type="month"
        value-format="yyyy-MM"
        placeholder="选择日期">
      </el-date-picker>
      <button type="button" class="text" @click="getData()">查询</button>
    </div>
    <div class="sjzl_table_wrap">
      <table class="table">
        <thead>
          <tr>
            <td rowspan="2">序号</td>
            <td rowspan="2">地区</td>
            <td colspan="3">厂站</td>
            <td colspan="3">分线</td>
            <td colspan="3">计量点</td>
            <td colspan="3">指标达标</td>
            <td rowspan="2">电量值偏差</td>
          </tr>
          <tr>
            <td>本系统</td>
            <td>线损系统</td>
            <td>偏差</td>
            <td>本系统</td>
            <td>线损系统</td>
            <td>偏差</td>
            <td>本系统</td>
            <td>线损系统</td>
            <td>偏差</td>
            <td>本系统</td>
            <td>线损系统</td>
            <td>偏差</td>
          </tr>
        </thead>
      </table>
      <div class="sjzl_table sjzl_table1">
        <table class="table">
          <tbody>
            <tr v-for="(item,index) in dataArr">
              <td>{{index + 1}}</td>
              <td>{{item.areName}}</td>
              <td>{{item.substationCount}}</td>
              <td>{{item.mpSubstationCount}}</td>
              <td>
                <span class="color_warning"
                 @click="close=true;
                systemId = item.systemId;
                otherData.name=item.areName;
                otherData.type='厂站';
                otherData.systemId =  item.systemId;
                otherData.searchBvid =searchBvid;
                getAllSub();">
                    {{item.substationDeviation}}
                </span>
              </td>
              <td>{{item.aclineCount}}</td>
              <td>{{item.mpAclineCount}}</td>
              <td>
                <span class="color_warning"
                @click='close=true;
                systemId = item.systemId;
                otherData.systemId =  item.systemId;
                otherData.searchBvid =searchBvid;
                getAllFx()'>
                  {{item.aclineDeviation}}
                </span>
              </td>
              <td>{{item.meteringPointCount}}</td>
              <td>{{item.mpMeteringPointCount}}</td>
              <td>
                <span class="color_warning"
                @click='close1=true;
                systemId = item.systemId;
                otherData.systemId =  item.systemId;
                otherData.searchBvid =searchBvid;
                getAllDv();'>
                  {{item.meteringPointDeviation}}
                </span>
              </td>
              <td>{{item.standardCount}}</td>
              <td>{{item.mpStandardCount}}</td>
              <td>
                <span class="color_warning"
                @click='close2=true;
                systemId = item.systemId;
                otherData.systemId =  item.systemId;
                otherData.searchBvid =searchBvid;
                getAllZb();'>
                  {{item.standardDeviation}}
                </span>
              </td>
              <td>
                <span>
                  {{item.electricDeviation}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <overlay :close.sync="close">
      <div class="alert_wrap">
        <alert :dataList='alertData'
        :count='countData'
        :other="otherData"
        :times='time'
        @displayDeviation="displayDev"
        v-if="close"></alert>
      </div>
    </overlay>
    <overlay :close.sync="close1">
      <div class="alert_wrap">
        <alert1 v-if="close1"
        :dataList='alertData'
        :count='countData'
        :other="otherData"
        :times='time'
        @displayDeviation="displayDv"></alert1>
      </div>
    </overlay>
    <overlay :close.sync="close2">
      <div class="alert_wrap">
        <alert2 v-if="close2"
        :dataList='alertData'
        :count='countData'
        :other="otherData"
        :times='time'
        ></alert2>
      </div>
    </overlay>
  </div>
</template>
<script>
import overlay from "@/components/common/overlay";
import alert from "../flow/fx_alert.vue";
import alert1 from "../flow/fx_alert1.vue";
import alert2 from "../flow/fx_alert2.vue";
import BScroll from "better-scroll";
import bvid from "@/assets/config/bvidMap";
export default {
  name: "sub5",
  data() {
    return {
      time: this.$day().format("YYYY-MM"),
      dataArr: [],
      close: false,
      close1: false,
      close2: false,
      bvidArr: bvid,
      searchBvid: "",
      lineType: "1",
      systemId: "",
      displayDeviation: 1, //仅显示偏差
      clickType: "",
      alertData: [], //一级弹框数据
      countData: [], //一级弹框总数
      otherData: {} //其他信息数据
    };
  },
  methods: {
    getData() {
      //获取列表数据
      this.$http
        .get("/dataGovernanceService/dataGovernace/getAclineDeviation", {
          params: {
            lineType: this.lineType,
            bvId: this.searchBvid,
            day: this.time,
            sign: sessionStorage.getItem("accessToken")
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.dataArr = res.data.data.aclineDeviationList;
          }
        });
    },
    getAllSub() {
      //厂长偏差
      this.$http
        .get("/dataGovernanceService/dataGovernace/getAllSubstation", {
          params: {
            systemId: this.systemId,
            day: this.time,
            sign: sessionStorage.getItem("accessToken"),
            displayDeviation: this.displayDeviation
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.alertData = res.data.data.objects;
            this.countData = res.data.data.counts;
          }
        });
    },
    getAllFx() {
      //分线偏差
      this.$http
        .get("/dataGovernanceService/dataGovernace/getAllAcline", {
          params: {
            systemId: this.systemId,
            day: this.time,
            lineType: this.lineType,
            bvId: this.searchBvid,
            sign: sessionStorage.getItem("accessToken"),
            displayDeviation: this.displayDeviation
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            console.log(res);
            this.alertData = res.data.data.objects;
            this.countData = res.data.data.counts;
            this.bvidArr.forEach((item, index) => {
              //匹配电压等级
              if (item.bvId === this.searchBvid) {
                this.otherData.name = item.dydj + "Kv";
                this.otherData.type = "分线";
              }
            });
          }
        });
    },
    displayDev(msg1, msg2) {
      //厂站，分线偏差判断
      console.log(msg1, msg2);
      if (msg2 == "厂站") {
        msg1 ? (this.displayDeviation = 1) : (this.displayDeviation = 2);
        this.getAllSub();
      } else {
        msg1 ? (this.displayDeviation = 1) : (this.displayDeviation = 2);
        this.getAllFx();
      }
    },
    getAllDv() {
      //计量点偏差
      this.$http
        .get("/dataGovernanceService/dataGovernace/getAllMeteringPoint", {
          params: {
            systemId: this.systemId,
            day: this.time,
            lineType: this.lineType,
            bvId: this.searchBvid,
            sign: sessionStorage.getItem("accessToken"),
            displayDeviation: this.displayDeviation
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.alertData = res.data.data.objects;
            this.countData = res.data.data.counts;
          }
        });
    },
    getAllZb() {
      //指标偏差
      this.$http
        .get("/dataGovernanceService/dataGovernace/getAllLineLoss", {
          params: {
            systemId: this.systemId,
            day: this.time,
            lineType: this.lineType,
            bvId: this.searchBvid,
            sign: sessionStorage.getItem("accessToken")
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.alertData = res.data.data.objects;
            this.countData = res.data.data.counts;
          }
        });
    },
    displayDv(msg) {
      //计量点是否只显示偏差
      msg ? (this.displayDeviation = 1) : (this.displayDeviation = 2);
      this.getAllDv();
    }
  },
  mounted() {
    this.$nextTick(() => {
      let sjzl_table1 = new BScroll(".sjzl_table1", {
         scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
         preventDefault:false
        // click: true,
      });
    });
  },
  components: {
    overlay,
    alert,
    alert1,
    alert2
  }
};
</script>

<style lang="css">
.sjzl_fx_tool_bar {
  box-sizing: border-box;
  padding-right: 15px;
  text-align: right;
}
.sjzl_table_wrap {
  margin: 0 20px;
}
.sjzl_table {
  height: 500px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}
.alert_wrap {
  width: 50vw;
  height: 60vh;
  background: #043434;
  border: 1px solid #0d7474;
  padding: 8px;
}
</style>
