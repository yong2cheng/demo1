<template lang="html">
  <div class="main">
    <div class="section">
        <div class="left_content centent">
          <quota :rankArrs = "rankArr" :scores="score" :ranks='rank' />
          <rank :datas='chartArr' />
        </div>
        <div class="middle_content centent">
          <workInfo @status="load" ></workInfo>
        </div>
        <div class="right_centent centent">
          <sysInfo/>
          <tools/>
          <forms/>
        </div>
    </div>
    <!-- {{NavList}} -->
    <loading :isLoading='loading'></loading>
  </div>
</template>
<script>
import Bus from "@/assets/eventBus.js";
import quota from "./parts/quota";
import forms from "./parts/forms";
import rank from "./parts/rank";
import sysInfo from "./parts/sysInfo";
import tools from "./parts/tools";
import workInfo from "./parts/workInfo";
import loading from "@/components/common/loading"
export default {
  name: "yw",
  data() {
    return {
      NavList: [],
      score: "",
      rank: "",
      rankArr: [],
      chartArr:[],
      status:0,
      loading:false
    };
  },
  components: {
    quota,
    forms,
    rank,
    sysInfo,
    tools,
    workInfo,
    loading
  },
  methods: {
    getRankData() {
      // 加载地区排名
      this.$http
        .get(
          "/maintenanceService/areaRankServiceApi/getAreaRankToday?date=" +
            this.dayDate +
            "&sign=" +
            sessionStorage.getItem("accessToken")
        )
        .then(res => {
          var id = sessionStorage.getItem("systemId")
            ? sessionStorage.getItem("systemId")
            : "0";
          var arr = [];
          var arr2 = [];
          var sc = res.data.data.allScoringSystems;
          if (res.data.data.allScoringSystems) {
             this.status++;
            sc.forEach(item => {
              if (arr.indexOf(item.systemId) == -1) {
                arr.push(item.systemId);
                this.chartArr.push(item)
                arr2[item.systemId] = item;
              }
              if (item.systemId == id) {
                this.rankArr.push(item);
              }             
            });
            arr2.forEach(item => {
              if (item.systemId == id) {
                this.score = item.score.toFixed(2);
                this.rank = item.rank;
              }
            });
          }
        });
    },
    load(res){
      if (res) {
        this.status++;
        if (this.status>=4) {//关闭加载框
          // this.loading =false
        }
      }
    },
  },
  created() {
    this.getRankData();
    Bus.$on("secList", arr => {
      this.NavList = arr;
    });
  }
};
</script>

<style lang="css">
.section {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.section .centent {
  min-height: 300px;
  /* background: #024243; */
}
.left_content {
  width: 632px;
}
.middle_content {
  width: 454px;
}
.right_centent {
  width: 277px;
}
@media (max-width: 1399px) {
  .left_content {
    width: 545px;
  }
  .middle_content {
    width: 390px;
  }
  .right_centent {
    width: 237px;
  }
}
</style>
