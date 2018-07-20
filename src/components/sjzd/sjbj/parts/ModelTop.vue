<template>
    <div class="cjxq_bar">
      <!-- 我的代码 -->
        <div class="inbl">
            <span class="dbqx_time">{{currentDate}}</span>
            <!-- <span class="devName" @click="showMeter()">{{exceptData.pathName||'设备名称'}}</span> -->
            <span class="devName" @click="showMeter()">{{$route.query.devName||'设备名称'}}</span>
        </div>
        <div class="inbl znyp_dbqx_data">
            <table class="table" border="0" cellspacing="0" cellpadding="0" >
                <tbody>
                    <tr>
                        <td>待消缺:</td>
                        <td>
                            <span class="erro_color">{{exceptData.untreatedExceptRate?exceptData.untreatedExceptRate:0}}</span>
                        </td>
                        <td>母平：</td>
                        <td>
                            <span>{{(exceptData.busbarLossRate*100?exceptData.busbarLossRate*100:0).toFixed(2)}}%</span>
                        </td>
                        <td>分线：</td>
                        <td>
                            <span>{{(exceptData.aclineLossRate*100?exceptData.aclineLossRate*100:0).toFixed(2)}}%</span>
                        </td>
                        <td>分压</td>
                        <td>
                            <span class="erro_color">{{exceptData.transformerLossRate*100?exceptData.transformerLossRate*100:0}}%</span>
                        </td>
                        <td>本月异常发生:</td>
                        <td>
                            <span>{{exceptData.exceptCount?exceptData.exceptCount:0}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>已消缺：</td>
                        <td>
                            <span>{{exceptData.treatedExceptRate?exceptData.treatedExceptRate:0}}</span></td>
                                <template v-if="erroTypeSzie<6">
                            <td v-for="(item,index) in exceptData.exceptionDeals" :key="index">{{item.exceptName}}：<span>{{item.treatedExceptCount}}/{{item.untreatedExceptCount}}</span>
                            </td>
                            <td v-for="(n,index) in (6 - erroTypeSzie)" :key="index"></td>
                                </template>
                        <template v-else>
                            <td v-for="(item,index) in exceptData.exceptionDeals" :key="index">{{item.exceptName}}：<span>{{item.treatedExceptCount}}/{{item.untreatedExceptCount}}</span>
                            </td>
                        </template>
                        <td>本月异常处理：</td>
                        <td>
                            <span>{{exceptData.exceptHandledCount?exceptData.exceptHandledCount:0}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="margin-bom inbl tbn_fun right" >
          <button style="margin-top: 15px;" @click="saveData();updateStatus()"> <i class="icon-baocun an_icon" ></i>保存</button>
          <button style="margin-top: 15px;" @click="showHistoryList()"> <i class="icon-huanyuan an_icon"></i>还原</button>
        </div>
        <div class="inbl search_box margin-bom right" style="margin-right:10px;">
          <button class="search_btn icon-search" @click="search"></button>
        </div>
         <div class="inbl margin-bom right" style="width:184px;margin-right:4px;">
            <!-- 时间控件 -->
            <ul class="ulCls ">
              <li :class="{liCls:dateShow}" @click="dateShow=true;currentDate = dayDate" >日数据</li>
              <li :class="{liCls:!dateShow}" @click="dateShow=false;currentDate = monthDate" >月数据</li>
            </ul>
            <ul>
              <li v-show="dateShow" style="width:180px;">
                <el-date-picker v-model="dayDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="dayDates()"  class="data_checked"/>
              </li>
              <li v-show="!dateShow" style="width:180px;">
                <el-date-picker v-model="monthDate" type="month" placeholder="选择月" value-format="yyyy-MM" @change="monthDates()" class="data_checked"/>
              </li>
            </ul>
        </div>
        <overlay :close.sync="close">
          <meters v-if="close" :querys="devId"></meters>
        </overlay>
    </div>
</template>

<script>
import overlay from "@/components/common/overlay";
import hub from "@/assets/eventBus.js";
import meters from "./meter";
import qs from "qs";
export default {
  data() {
    return {
      user: "",
      devId: this.$route.query.devId,
      stbId: this.$route.query.stbId,
      currentDate: this.$route.query.date, //当前选中的是月份时间或者是日期时间(默认是传过来的月份)
      dayDate: "", //选择的天数
      monthDate: "", //选择的月份
      dateShow: true,
      treeShow: false,
      tabData: true,
      exceptData: {},
      erroTypeSzie: 0,
      dataChangeLogs: {
        devId: this.$route.query.devId,
        occurTimeStr: this.$day().format("YYYY-MM-DD HH:mm:ss"),
        dateTimeStr: this.currentDate,
        originPap: 0,
        originRap: 0,
        newPap: 0,
        newRap: 0,
        policy: 1,
        policyName: "手动修改",
        userId: this.user
      },
      close: false,
      showHis: false,
      reBusBar: {
        pathName: ""
      },
      pickLogs: {},
      hisLogs: [],
      picked: {},
      change: false,
      switchTariff: true
    };
  },
  components: { meters, overlay },
  created() {
    if (this.patch("-", this.$route.query.date) > 1) {
      //时间控件显示月还是日
      this.dateShow = true;
      this.dayDate = this.currentDate;
    } else {
      this.dateShow = false;
      this.monthDate = this.currentDate;
    }
    this.exception();
  },
  mounted() {
    var that = this;
    hub.$on("getMsg", function(res) {
      //修改主表电量，更新pap rap底码相关数据
      that.dataChangeLogs.devId = that.devId;
      that.dataChangeLogs.dataTimeStr = that.currentDate;
      that.dataChangeLogs.newPap = res.newPap;
      that.dataChangeLogs.newRap = res.newRap;
      that.dataChangeLogs.occurTimeStr = res.occurTime;
      that.dataChangeLogs.originPap = res.originPap;
      that.dataChangeLogs.originRap = res.originRap;
      that.dataChangeLogs.policy = res.policy;
      that.dataChangeLogs.userId = sessionStorage.getItem("userId");
      that.policyName = res.policyName;
    });
    hub.$on("hasEditor", res => {
      this.change = res;
      console.log("是否编辑:" + this.change);
    });
    hub.$on("editorType", res => {
      this.switchTariff = res;
      console.log(this.switchTariff);
    });
    hub.$on("restore", picked => {
      //还原
      console.log(picked);
      this.change = true;
      this.dataChangeLogs.newPap = picked.newPap;
      this.dataChangeLogs.newRap = picked.newRap;
      // this.saveData();
      this.updateStatus();
    });
    hub.$on("sendDevId", res => {
      //更新母线Id
      this.devId = res;
    });
    hub.$on("clickDevId", () => {
      //选中设备时重新加载
      this.exception();
    });
  },
  methods: {
    exception: function() {
      //获取所有异常情况和指标情况
      this.$http
        .get("/dataDiagnoseService/dataDiagnose/getLossRateAndExcept", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            devId: this.devId,
            date: this.currentDate
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.exceptData = res.data.data.lossRateAndExceptVO;
            res.data.data.lossRateAndExceptVO.exceptionDeals
              ? (this.erroTypeSzie =
                  res.data.data.lossRateAndExceptVO.exceptionDeals.length)
              : (this.erroTypeSzie = 0);
          }
        });
    },
    saveData: function() {
      //保存记录
      var that = this;
      if (that.change) {
        this.$http
          .post(
            "/dataDiagnoseService/dataDiagnose/postDataChangedLogs?sign=" +
              sessionStorage.getItem("accessToken"),
            qs.stringify({
              dataChangeLogsJson: JSON.stringify(that.dataChangeLogs)
            })
          )
          .then(res => {
            console.log(res);
          });
      }
    },
     //更新电表底码状态，然后重计算
    updateStatus: function() {
      if (this.change) {
        if (this.switchTariff) {
          this.$http
            .post(
              "/dataDiagnoseService/dataDiagnose/updateStatus?sign=" +
                sessionStorage.getItem("accessToken"),
              qs.stringify({
                devId: this.devId,
                value: this.dataChangeLogs.newPap,
                pulseType: 1,
                date: this.currentDate,
                type: 1
              })
            )
            .then(res => {
              if (res.data.code === 1) {
                this.$http
                  .post(
                    "/dataDiagnoseService/dataDiagnose/updateStatus?sign=" +
                      sessionStorage.getItem("accessToken"),
                    qs.stringify({
                      devId: this.devId,
                      value: this.dataChangeLogs.newRap,
                      pulseType: 2,
                      date: this.currentDate,
                      type: 1
                    })
                  )
                  .then(res => {
                    if (res.data.code === 1) {
                      // alert('冲计算')
                      this.reCalculation();
                    }
                  });
              }
            });
        } else {
          this.$http
            .post(
              "/dataDiagnoseService/dataDiagnose/updateStatus?sign=" +
                sessionStorage.getItem("accessToken"),
              qs.stringify({
                devId: this.devId,
                value: this.dataChangeLogs.newPap,
                pulseType: 1,
                date: this.currentDate,
                type: 2
              })
            )
            .then(res => {
              if (res.data.code === 1) {
                this.$http
                  .post(
                    "/dataDiagnoseService/dataDiagnose/updateStatus?sign=" +
                      sessionStorage.getItem("accessToken"),
                    qs.stringify({
                      devId: this.devId,
                      value: this.dataChangeLogs.newRap,
                      pulseType: 2,
                      date: this.currentDate,
                      type: 2
                    })
                  )
                  .then(res => {
                    if (res.data.code === 1) {
                      this.reCalculation();
                    }
                  });
              }
            });
        }
      }
    },
    reCalculation: function() {
      //重计算
      this.$http
        .post(
          "/analysisService/analy/reEnergys?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            stId: this.stbId,
            devIds: this.devId,
            taskDetail: "电量重计算",
            date: this.currentDate,
            type: this.switchTariff ? 1 : 2
          })
        )
        .then(res => {
          if (res.data.code === 1) {
            this.$notify({
              title: "提示",
              message: "保存成功！",
              duration: 1500,
              type: "success"
            });
          }
        });
    },
    showHistoryList() {
      //切换历史记录
      this.$emit("showHistoryList", true);
    },
    showMeter() {
      //切换电表词云
      this.close = true;
    },
    patch: function(re, s) {
      //匹配某一字符串出现的个数
      re = eval("/" + re + "/ig");
      return s.match(re).length;
    },
    dayDates() {
      //传递时间
      this.currentDate = this.dayDate;
    },
    monthDates() {
      this.currentDate = this.monthDate;
    },
    search() {
      //点击查询按钮
      this.exception();
      hub.$emit("updateChart", "更新！");
      // hub.$emit("timeSearch","点击时间搜索");
    }
  },
  watch: {
    currentDate: function(val) {
      hub.$emit("sendTime", this.currentDate);
    }
  }
};
</script>

<style >
.data_checked {
  width: 180px !important;
}
</style>

