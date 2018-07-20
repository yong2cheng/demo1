<template>
    <!-- 电表 -->
    <div class="tsub1">
        <div class="t_title">电表信息</div>
        <div class="t_sousuo" style="text-align:right;"><button class="warning">删除</button></div>
        <table class="table">
            <thead>
                <tr>
                    <td><input :checked="quanxuan" @click="quanxuan=!quanxuan" type="checkbox"></td>
                    <td>序号</td>
                    <td colspan="2">MRID</td>
                    <td colspan="2">电表全路径名称</td>
                    <td>CT1</td>
                    <td>CT2</td>
                    <td>PT1</td>
                    <td>PT2</td>
                    <td>精度</td>
                    <td>积分周期</td>
                    <td>投运状态</td>
                    <td colspan="2">日冻结底码采集时标</td>
                </tr>
            </thead>
        </table>
        <div class="scroll1" style="position:relative;overflow:hidden;height:415px">
            <table class="table">
                <tr :key="index" v-for="(item,index) in meters">
                    <td><input v-model="delMeters" :value="index" type="checkbox"></td>
                    <td>{{yeshu+index-(-1)}}</td>
                    <td colspan="2"><span @click="modifyMeter(index)" class="color_warning">{{item.mrid}}</span></td>
                    <td colspan="2">{{item.pathName}}</td>
                    <td>{{item.ct1}}</td>
                    <td>{{item.ct2}}</td>
                    <td>{{item.pt1}}</td>
                    <td>{{item.pt1}}</td>
                    <td>{{item.dataPrecision}}</td>
                    <td>{{item.dataInterval}}</td>
                    <td>{{item.isInUse==1?'是':'否'}}</td>
                    <td colspan="2">{{item.class2TimeTag}}</td>
                </tr>
            </table>
        </div>
        <el-pagination
            style="box-sizing:border-box;padding-top:10px;border-top:1px solid #0d7474;"
            background
            @current-change='changePage'
            @size-change="changePageSize"
            :current-page.sync="currentPage"
            layout="total,sizes,prev, pager, next,jumper"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            :total="totalCount">
          </el-pagination>
          <overlay oheight="450px" :close.sync="close1">
              <div class="yiji_t">
                  <div class="t_title">电表详细信息( <span>设备id：{{meter.mrid}}</span> )</div>
                    <ul class="sub1_input">
                        
                        <li>
                        <label>
                            <span>电表全路径名称:</span>
                            <input type="text" class="txt" v-model="meter.pathName">
                        </label>
                        <label>
                            <span>电量主站电表名称：</span>
                            <input type="text" class="txt" v-model="meter.localName">
                        </label>
                        </li>
                        <li>
                        <label>
                            <span>CT1：</span>
                            <input type="text" class="txt"  v-model="meter.ct1" disabled="disabled">
                        </label>
                        <label>
                            <span>CT2</span>
                            <input type="text" class="txt"  v-model="meter.ct2" disabled="disabled">
                        </label>
                        </li>
                        <li>
                        <label>
                            <span>PT1:</span>
                            <input type="text" class="txt"  v-model="meter.pt1" disabled="disabled">
                        </label>
                        <label>
                            <span>PT2:</span>
                            <input type="text" class="txt" v-model="meter.pt2" disabled="disabled">
                        </label>
                        </li>
                        <li>
                        <label>
                            <span>精度:</span>
                            <input type="text" class="txt" v-model="meter.dataPrecision">
                        </label>
                        <label>
                            <span>积分周期:</span>
                            <input type="text" class="txt" v-model="meter.dataInterval">
                        </label>
                        </li>
                        <li>
                        <label>
                            <span>投运状态:</span>
                            <select v-model="meter.isInUse" id="bvid" style="width:170px;margin:0;">
                            <option value="1">投运</option>
                            <option value="0">未投运</option>
                            </select>
                        </label>
                        <label>
                            <span>日冻结底码采集时标:</span>
                            <el-date-picker
                            class="modified_ate"
                            v-model="meter.class2TimeTag"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期">
                            </el-date-picker>
                        </label>
                        </li>
                        <li>
                        <label>
                            <span>分时底码采集时标:</span>
                            <el-date-picker
                            class="modified_ate"
                            v-model="meter.class3TimeTag"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期">
                            </el-date-picker>
                        </label>
                        <label>
                            <span>电表ID:</span>
                            <input type="text" class="txt" v-model="meter.mrid" readonly="readonly">
                        </label>
                        </li>
                    </ul>
                    <div class="t_foot">
                        <button @click="saveMeter">保存</button>
                        <button @click="chongz">重置</button>
                    </div>
              </div>
          </overlay>
    </div>
    
</template>
<script>
import BScroll from "better-scroll";
import overlay from "@/components/common/overlay";
import Bus from "@/assets/eventBus.js";
export default {
  data: function() {
    return {
      token: sessionStorage.getItem("accessToken"),
      totalCount: 1, //总条数
      currentPage: 1, //当前页码
      pageSizes: [30, 60, 100],
      pageSize: 30,
      close1: false,
      meters: [],
      meter: {},
      meterCZ: {},
      isLoading: false,
      delMeters: [],
      quanxuan: false,
      stId: ""
    };
  },
  components: {
    overlay
  },
  mounted() {
    Bus.$on("TstId", target => {
      this.stId = target;
      this.getMeter();
    });
      this.$nextTick(() => {
        let scroll1 = new BScroll(".scroll1", {
          scrollbar: { fade: false, interactive: true },
          preventDefault: false,
          disableMouse: true,
          mouseWheel: true
        });
      });
  },
  computed: {
    yeshu: function() {
      return (this.currentPage - 1) * this.pageSize;
    }
  },
  methods: {
    getMeter() {
      this.isLoading = true;
      this.delMeters = [];
      this.quanxuan = false;
      this.meters = [];
      if (this.stId == "") {
        this.isLoading = false;
        return;
      }
      this.$http
        .get(
          "/quotaService/quota/getMeter?sign=" +
            this.token +
            "&pageIndex=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize +
            "&stId=" +
            this.stId
        )
        .then(res => {
          this.isLoading = false;
          if (res.data.code == 1) {
            var data = res.data.data.meters;
            this.meters = data;
            this.totalCount = res.data.pojoTotalCount;
          }
        });
    },
    changePageSize(val) {
      this.pageSize = val;
      this.getMeter();
    },
    changePage(val) {
      this.currentPage = val;
      this.getMeter();
    },
    modifyMeter(index) {
      this.close1 = true;
      this.meter = this.meters[index];
      for (var key in this.meter) {
        this.meterCZ[key] = this.meter[key];
      }
    },
    chongz() {
      for (var key in this.meterCZ) {
        this.$set(this.meter, key, this.meterCZ[key]);
      }
    },
    saveMeter() {
      delete this.meter["bvId"];
      delete this.meter["bvName"];
      delete this.meter["consNo"];
      delete this.meter["devName"];
      delete this.meter["ratio"];
      delete this.meter["sbtName"];
      delete this.meter["systemName"];
      this.$http
        .post(
          "/maintenanceService/maintenance/updateMeter?sign=" + this.token,
          this.meter
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$notify({
              title: "成功",
              message: "成功",
              type: "success"
            });
          }
        });
    }
  },
  watch: {
    quanxuan: function() {
      if (this.quanxuan) {
        console.log(1);
        this.delMeters = Array.from({ length: this.pageSize }, (v, k) => k);
        console.log(this.delMeters);
      } else {
        this.delMeters = [];
      }
    }
  }
};
</script>
<style>
.tsub1 .sub1_input {
  padding-top: 10px;
}
.tsub1 .sub1_input li {
  text-align: center;
  line-height: 50px;
}
.tsub1 .sub1_input li label {
  display: inline-block;
  width: 49%;
}
.tsub1 .sub1_input li label span {
  display: inline-block;
  width: 150px;
  color: #fff;
  font-size: 13px;
  text-align: right;
}
</style>
