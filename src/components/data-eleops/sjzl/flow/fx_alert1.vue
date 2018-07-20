<template lang="html">
  <div class="fx_alert_wrap">
    <div class="fx_alert_top">
      <p class="top_title">计量点偏差统计</p>
      <p class="top_title_right">
        <input type="checkbox" id="fors" v-model='displayType' @change="sendType()">
        <label for="fors">仅显示偏差</label>
      </p>
    </div>
    <div class="fx_alert_main">
      <table class="table">
        <thead>
          <tr>
            <td >分线名称</td>
            <td>源端系统</td>
            <td>线损系统</td>
          </tr>
        </thead>
      </table>
      <div class=" fx_alert_table_main1">
        <table class="table">
          <tbody>
              <tr v-for="(item,index) in dataList">
                <td @click="
                  lineName='';
                  mpLineName=item.aclineName;
                  getFinalData(item);">
                  <span class="color_warning">{{item.aclineName}}</span>
                </td>
                <template v-for="(it,indx) in item.meteringPoints">
                  <td>{{it.meterName}}</td>
                  <td>{{it.mpMeterName}}</td>
                </template>
              </tr>
          </tbody>
        </table>
      </div>
      <table class="table">
        <tbody>
          <tr>
            <td>计量点总数</td>
            <td>
              {{count.aclineMeters}}
            </td>
            <td>{{count.mpAclineMeters}}</td>
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
      close: false,
      displayType: true,
      queryObj: {},
      finalCount: [],
      finalDataList: [],
      lineName: "",
      mpLineName: ""
    };
  },
  props: ["dataList", "count", "other", "times"],
  methods: {
    sendType() {
      this.$emit("displayDeviation", this.displayType);
    },
    getFinalData(item) {
      this.queryObj = {
        systemId:this.other.systemId,
        bvId:this.other.searchBvid,
        day:this.times,
        lineType:2//2为分线
      };
      this.$http
        .get("/maintenanceService/maintenance/aclineComparsion", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            date: this.times,
            aclineId: "",
            lineName: this.aclineName,
            mpLineName: this.mpLineName
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.close = true;
            this.finalDataList = res.data.data.energyComparisonVOList;
            for (var attr in res.data.data.elecDeviationCount) {
              this.finalCount = res.data.data.elecDeviationCount[attr][0];
            }
          }
        });
    }
  },
  mounted() {
    this.$nextTick(() => {
      let fx_alert_table_main1 = new BScroll(".fx_alert_table_main1", {
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
.fx_alert_top p {
  line-height: 25px;
}
.fx_alert_top .top_title_right {
  text-align: right;
}
.fx_alert_main {
  margin-top: 10px;
}
.fx_alert_table_main1 {
  max-height: 40vh !important;
  overflow: hidden;
  position: relative;
}
</style>
