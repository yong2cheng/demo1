<template lang="html">
  <div class="fx_alert_wrap">
    <div class="fx_alert_top">
      <p class="top_title">{{other.type}}偏差统计</p>
      <p class="top_title_right">
        <input type="checkbox" id="fors" v-model='displayType' @change="sendType()">
        <label for="fors">仅显示偏差</label>
      </p>
    </div>
    <div class="fx_alert_main">
      <table class="table">
        <thead>
          <tr>
            <td width="30%">地区</td>
            <td>源端系统</td>
            <td>线损系统</td>
          </tr>
        </thead>
      </table>
      <div class="fx_alert_table_main">
        <table class="table">
          <tbody>
            <template v-if="other.type=='厂站'">
              <tr v-for="(item,index) in dataList">
                <td width="30%">{{index + 1}}</td>
                <td @click="
                  lineName=item.substation;
                  mpLineName='';
                  getFinalData(item);">
                  <span class="color_warning">{{item.substation}}</span>
                  </td>
                <td  @click="
                  lineName='';
                  mpLineName=item.mpSubstation;
                  getFinalData(item);">
                  <span class="color_warning">{{item.mpSubstation}}</span>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="(item,index) in dataList">
                <td width="30%">{{index + 1}}</td>
                <td @click="
                  lineName=item.lineName;              
                  mpLineName='';
                  getFinalData(item);">
                  <span class="color_warning">{{item.lineName}}</span>
                  </td>
                <td @click="               
                  lineName='';
                  mpLineName=item.mpLineName;
                  getFinalData(item)">
                  <span class="color_warning">{{item.mpLineName}}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="fixed_div">
            {{other.name}}
        </div>
      </div>
      <table class="table">
        <tbody>
          <tr v-if="other.type=='厂站'">
            <td width="30%">{{other.type}}总数</td>
            <td>
              {{count.substation}}
            </td>
            <td>{{count.mpSubstation}}</td>
          </tr>
          <tr v-else>
            <td width="30%">{{other.type}}总数</td>
            <td>
              {{count.lineName}}
            </td>
            <td>{{count.mpLineName}}</td>
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
      this.$emit("displayDeviation", this.displayType, this.other.type);
    },
    getFinalData(item) {
      this.queryObj = {
        systemId: this.other.systemId,
        bvId: this.other.searchBvid,
        day: this.times,
        lineName:this.lineName,
        mpLineName:this.mpLineName,
        lineType: 2 //2为分线
      };
      this.$http
        .get("/maintenanceService/maintenance/aclineComparsion", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            date: this.times,
            aclineId: "",
            lineName: this.lineName,
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
      let fx_alert_table_main = new BScroll(".fx_alert_table_main", {
        scrollbar: true,
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
.fx_alert_table_main {
  height: 40vh;
  overflow: hidden;
  position: relative;
}
.fixed_div {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 30%;
  box-sizing: border-box;
  background-color: rgb(4, 52, 52);
  border-left: 1px solid #0d7474;
  border-right: 1px solid #0d7474;
  text-align: center;
  line-height: 40vh;
}
</style>
