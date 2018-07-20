<template lang="html">
  <div class="alert_main">
    <ul class="czxqqhbox" style="margin-top:5px;">
      <li  @click="dataList =sysData;switchs=1; " :class="{dqxz:switchs=='1'}">源端系统档案</li>
      <li  @click="dataList =mpData;switchs=2 " :class="{dqxz:switchs=='2'}">线损系统档案</li>
    </ul>
    <div class="alert_table alert_mp_table">
      <table class="table">
        <tbody>
          <tr v-for="(item,index) in dataList">
            <td width="40%">{{item.substationName}}</td>
            <td width="10%">{{index + 1}}</td>
            <td width="50%">
              <span class="color_warning"
              @click='
              getFinalData(item)'>
                {{item.busbarName}}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <overlay :close.sync="close">
        <div class="overlay_wrap">
          <final v-if='close' :dataList="finalDataList" :total="finalCount" :query='queryObj'></final>
        </div>
    </overlay >
  </div>
</template>

<script>
import overlay from "@/components/common/overlay";
import final from "./final.vue";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      switchs:1,
      close: false,
      dataList: [],
      mpData: [], //线损系统
      sysData: [], //源瑞系统
      queryObj: {},
      dataTime: this.times,
      finalDataList: [],
      finalCount: {}
    };
  },
  props: ["query", "times"],
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get("/dataGovernanceService/dataGovernace/getAllBusbar", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            day: this.times,
            systemId: this.query.systemId
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            console.log(res);
            this.sysData = res.data.data.system;
            this.mpData = res.data.data.mpSystem;
            this.dataList = this.sysData;
          }
        });
    },
    getFinalData(item) {
      this.queryObj = {
        systemId:this.query.systemId,
        day:this.times,
        name:item.busbarName,
        lineType:1//1为母平
      };
      this.$http
        .get("/maintenanceService/maintenance/energyComparison", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            date: this.dataTime,
            vlId: item.vlId
          }
        })
        .then(res => {
          if (res.data.code === 1) {
             this.close=true;
            this.finalDataList = res.data.data.energyComparisonVOList;
            for (var attr in res.data.data.elecDeviationCount) {
              console.log( res.data.data.elecDeviationCount[attr][0])
              this.finalCount =  res.data.data.elecDeviationCount[attr][0];
            }
          }
        });
    }
  },
  mounted() {
    this.$nextTick(() => {
      let alert_mp_table = new BScroll(".alert_mp_table", {
         scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true
        // click: true,
      });
    });
  },
  components: {
    overlay,
    final
  }
};
</script>

<style lang="css">
.alert_table {
  height: 50vh;
  overflow: hidden;
  position: relative;
}
</style>
