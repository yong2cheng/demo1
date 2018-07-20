<template lang="html">
  <div class="final_wrap">
    <div class="tool_bar">
      <p>{{query.name}}</p>
    </div>
    <div class="final_table">
      <table class="table">
        <thead>
          <tr>
            <td rowspan="2">序号</td>
            <td rowspan="2">设备测点名称</td>
            <td rowspan="2">同期测点名称</td>
            <td rowspan="2">类型</td>
            <td colspan="4">源端系统</td>
            <td colspan="4">同期线损系统</td>
          </tr>
          <tr>
            <td>倍率</td>
            <td>起码</td>
            <td>止码</td>
            <td>电量</td>
            <td>倍率</td>
            <td>起码</td>
            <td>止码</td>
            <td>电量</td>
          </tr>
        </thead>
      </table>
      <div class="final_table_main">
        <table class="table">
          <tbody>
            <tr v-for="(item,index) in dataLists">
              <td>{{index + 1}}</td>
              <td>{{item.localName}}</td>
              <td>{{item.mpName}}</td>
              <td>{{item.type}}</td>
              <td>
                <span :class="{'color_warning':diff(item)}">
                   {{item.ratio}}
                </span>
              </td>
              <td>
                 <span :class="{'color_warning':diff(item)}">
                   {{item.startTariffValue}}
                </span>
              </td>
              <td>
                 <span :class="{'color_warning':diff(item)}">
                   {{item.endTariffValue}}
                </span>
              </td>
              <td>
                 <span :class="{'color_warning':diff(item)}">
                    {{((item.endTariffValue - item.startTariffValue) * item.ratio).toFixed(4)}}
                </span>
               </td>
              <td>{{item.mpRatio}}</td>
              <td>{{item.mpStartTariff}}</td>
              <td>{{item.mpEndTariff}}</td>
              <td>{{((item.mpEndTariff - item.mpStartTariff) * item.mpRatio).toFixed(4)}}</td>
            </tr>
            
          </tbody>
         <tfoot>
            <tr>
              <td colspan="2" rowspan="2">系统偏差电量</td>
              <td rowspan="2">{{totals.systemDevitionElec}}</td>
              <td rowspan="2">合计</td>
              <td>输入电量：</td>
              <td>{{totals.inputElec}}</td>
              <td>输出电量：</td>
              <td>{{totals.outputElec}}</td>
              <td>输入电量：</td>
              <td>{{totals.mpInputElec}}</td>
              <td>输出电量：</td>
              <td>{{totals.mpOutputElec}}</td>
            </tr>
            <tr>
              <td>平衡差电量</td>
              <td>{{totals.elecDiff}}</td>
              <td>平衡率(%)：</td>
              <td>{{totals.rate}}</td>
              <td>平衡差电量：</td>
              <td>{{totals.mpElecDiff}}</td>
              <td>平衡率(%)：</td>
              <td>{{totals.mpRate}}</td>
            </tr>
         </tfoot>
        </table>
      </div>
      <div class="final_tree_wrap">
        <div class="treeZone">
          <div class="zone"  v-show='showTree'>
            <tree :data='firstData' @sendTreeInfo="getMenu" :lastAttr="typeLine"></tree>
          </div>
        </div>
        <div class="tree_tollgo final_tree_tollgo" @click="showTree=!showTree"></div>
      </div>
    </div>
  </div>
</template>

<script>
import tree from "@/components/common/tree.vue";
import treeMinx from "@/components/mixins/tree.js";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      dataLists:this.dataList,
      totals :this.total,
      isDiff: false,
      showTree: false
    };
  },
  props: ["dataList", "total", "query"],
  mixins: [treeMinx],
  methods: {
    diff(item) {
      let a = (item.endTariffValue - item.startTariffValue) * item.ratio;
      let b = (item.mpEndTariff - item.mpStartTariff) * item.mpRatio;
      if (a != b) {
        return true;
      } else {
        return false;
      }
    },
    getMenu(item, callback) {
      //监听回调函数，通过callback返回下级菜单数据 ，如果需要的话
      console.log(item); //点击时的返回值（地区，电压，厂站等）,可根据需要返回需要的值
      if (item.attribute == "vlId" || item.attribute == "aclineId") {
        this.areaObj = item;
        this.getDatas();
      }
    },
    getFirstMenu() {
      //第一层菜单，根据具体需求更改请求接口
      if (this.query.lineType == 1) {
        //母平进来
        this.$http
          .get("/dataGovernanceService/dataGovernace/getBusbarDeviation", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              day: this.query.day,
              systemId: this.query.systemId
            }
          })
          .then(res => {
            if (res.data.code === 1) {
              this.firstData = res.data.data.busbarDeviationVOList;
            }
          });
      } else {
        this.$http
          .get("/dataGovernanceService/dataGovernace/getCommonAclines", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              day: this.query.day,
              systemId: this.query.systemId,
              bvId: this.query.bvId,
              lineType: 1
            }
          })
          .then(res => {
            if (res.data.code === 1) {
              this.firstData = res.data.data.aclineDeviationVOList;
            }
          });
      }
    },
    getDatas() {
      if (this.query.lineType == 1) {
        //母平进来
        this.getVlData();
      } else {
        this.getAcline();
      }
    },
    getVlData() {
      this.$http
        .get("/maintenanceService/maintenance/energyComparison", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            date: this.query.day,
            vlId: this.areaObj.id
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.dataLists = res.data.data.energyComparisonVOList;
            for (var attr in res.data.data.elecDeviationCount) {
              this.totals = res.data.data.elecDeviationCount[attr][0];
            }
          }
        });
    },
    getAcline() {
      this.$http
        .get("/maintenanceService/maintenance/aclineComparsion", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            date: this.query.day,
            aclineId: "",
            lineName:this.query.lineName,
             mpLineName:this.query.mpLineName,
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.dataLists = res.data.data.energyComparisonVOList;
            for (var attr in res.data.data.elecDeviationCount) {
              this.totals = res.data.data.elecDeviationCount[attr];
            }
          }
        });
    }
  },
  computed: {
    typeLine() {
      var type = "vlId";
      if (this.query.lineType == 1) {
        type = "vlId";
      } else {
        type = "aclineId";
      }
      return type;
    },
    data(){
      this.dataLists = this.dataList;
      return this.dataLists
    }
  },
  mounted() {
    this.$nextTick(() => {
      let final_table_main = new BScroll(".final_table_main", {
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
    tree
  }
};
</script>

<style lang="css">
.final_wrap {
  position: relative;
}
.final_table {
  margin-top: 12px;
  position: relative;
}
.final_table_main {
  height: 55vh;
  overflow: hidden;
  position: relative;
}
.final_tree_wrap {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.1);
}
.final_tree_tollgo {
  left: -31px;
}
</style>
