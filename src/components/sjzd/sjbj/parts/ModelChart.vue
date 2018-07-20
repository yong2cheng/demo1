<template>
  <div class="render_box">
    <!-- 侧边 厂站树 -->
    <!-- 我的代码 -->
    <div class="btn_left_side" :class="treeShow?'btn_side_l':'btn_side_r'" @click="sideTree"></div>
    <div class="side_nav" v-show="treeShow">
        <div class="tree_box" >
            <tree :data='firstData' @sendTreeInfo="getMenu" lastAttr="dvId"></tree>
        </div>
    </div>
    <!-- 左边echart -->
    <div class="echart_left">
        <!--数据评估曲线-->
      <div class="sjbg " style=" width:100%;float: none !important; height: 550px;" id="dbpgqx_data">
        <div id="pap_chart"></div>
        <div id="area_one"></div>
        <div id="rap_chart"></div>
        <div id="area_tow"></div>
      </div>
    </div>
    <!-- 右边操作 -->
    <div class="operate_right">
        <div class="sjbg" style="height:500px; margin-top:5px;text-align:center;position:relative;">
            <div class="bubbly" v-if="bubbly"><span>数据已重置</span></div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:0" class="rightTable table">
                <thead>
                    <tr>
                        <td :class="switchTariff ? 'switch':''">
                            <label @click="switchTariff=true;switchTariffs();" style="cursor:pointer"><input type="radio" checked name="switch"> 上表码</label>
                        </td>
                        <td  :class="!switchTariff ? 'switch':''">
                            <label @click="switchTariff=false;switchTariffs();" style="cursor:pointer"><input type="radio" name="switch"> 下表码</label>
                        </td>
                    </tr>
                    <tr>
                        <td width="50%">P+</td>
                        <td width="50%">P-</td>
                    </tr>
                </thead>
                <template v-if="switchTariff">
                    <tbody>
                        <tr>
                            <td>
                                <span>{{filterComputeFixd(mainUperTariffPaps,4)}}</span>
                            </td>
                            <td>
                                <span>{{filterComputeFixd(mainUperTariffRaps,4)}}</span>
                            </td>
                        </tr>
                    </tbody>
                </template>
                <template v-else>
                    <tbody>
                        <tr>
                            <td>
                              <span>{{filterComputeFixd(mainLowerTariffPaps,4)}}</span>
                            </td>
                            <td>
                              <span>{{filterComputeFixd(mainLowerTariffRaps,4)}}</span>
                            </td>
                        </tr>
                    </tbody>
                </template>
                <thead>
                    <tr>
                      <td colspan="2">主表数据（电量）</td>
                    </tr>
                    <tr>
                      <td width="50%">P+</td>
                      <td width="50%">P-</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th style="border-bottom:none" class="zb_pz">
                            <input type="text" class="text_sjbj" v-model="zerop" @focus="fous=false;bubly=1" @blur="fous=true;bubly=3" @change="pPlus()" />
                            <div class="xzts" v-show='!fous && bubly==1'>
                                <ul>
                                  <li><span :title="lossRateBus*100+'%'">母平：{{filterComputeFixd(lossRateBus*100,2)}}%</span><i :class="(lossRateBus-RateBus) < 0?'icon-down':'icon-up red'"></i><span :title="differBu()*100+'%'">{{differBu()*100}}%</span></li>
                                  <li>线损：{{lossRateAc*100}}%<i :class="(lossRateAc-RateAc)<0?'icon-down':'icon-up red'"></i>{{differAc*100}}%</li>
                                </ul>
                            </div>
                        </th>
                        <th style="border-bottom:none" class="zb_pf">
                            <input type="text" class="text_sjbj" v-model="zeroj" @focus="fous=false;bubly=2" @blur="fous=true;bubly=3" @change="pPrev()" />
                            <div class="xzts" v-show='!fous && bubly==2'>
                                <ul>
                                  <li><span :title="lossRateBus*100+'%'">母平：{{(lossRateBus*100).toFixed(2)}}%</span><i :class="(lossRateBus-RateBus) < 0?'icon-down':'icon-up red'"></i><span :title="differBu()*100+'%'">{{differBu()*100}}%</span></li>
                                  <li>线损：{{lossRateAc*100}}%<i :class="(lossRateAc-RateAc)<0?'icon-down':'icon-up red'"></i>{{differAc*100}}%</li>
                                </ul>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
            <div style="width:100%; height:316px ;position:relative;overflow:hidden;" class="scrollbox_r_b">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="rightTable table">
                    <thead>
                      <tr>
                        <td colspan="2">预估结果（零点冻结值）</td>
                      </tr>
                      <tr>
                        <td width="50%">P+</td>
                        <td width="50%">P-</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span>{{fmtNum(rightTable.estimateTariffPap)}}</span>
                          <i class="icon-up th_an_z" title="替代主数据" @click="clickPapPlus(rightTable.estimateTariffPap,3);"></i>
                        </td>
                        <td>
                          <span>{{fmtNum(rightTable.estimateTariffRap)}}</span>
                          <i class="icon-up th_an_f" title="替代主数据" @click="clickRapPrev(rightTable.estimateTariffRap,3);"></i>
                        </td>
                      </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <td colspan="2">预估结果（电量）</td>
                        </tr>
                        <tr>
                            <td width="50%">P+</td>
                            <td width="50%">P-</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span>{{fmtNum(rightTable.estimateElecPap)}}</span>
                                <i class="icon-up th_an_z" title="替代主数据" @click="clickPlus(rightTable.estimateElecPap,1);"></i>
                            </td>
                            <td>
                                <span>{{fmtNum(rightTable.estimateElecRap)}}</span>
                                <i class="icon-up th_an_f" title="替代主数据" @click="clickPrev(rightTable.estimateElecRap,1);"></i>
                            </td>

                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <td colspan="2">副表数据（电量）</td>
                        </tr>
                        <tr>
                            <td width="50%">P+</td>
                            <td width="50%">P-</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span>{{fmtNum(rightTable.secondElecPap)}}</span>
                                <i class="icon-up th_an_z" title="替代主数据" @click="clickPlus(rightTable.secondElecPap,4);;"></i>
                            </td>
                            <td>
                                <span>{{fmtNum(rightTable.secondElecRap)}}</span>
                                <i class="icon-up th_an_f" title="替代主数据" @click="clickPrev(rightTable.secondElecRap,4);"></i>
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                          <td colspan="2">功率积分电量</td>
                        </tr>
                        <tr>
                            <td width="50%">P+</td>
                            <td width="50%">P-</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span>{{fmtNum(rightTable.powerIntegrationPap)}}</span>
                                <i class="icon-up th_an_z" title="替代主数据" @click="clickPlus(rightTable.powerIntegrationPap,2);"></i>
                            </td>
                            <td>
                                <span>{{fmtNum(rightTable.powerIntegrationRap)}}</span>
                                <i class="icon-up th_an_f" title="替代主数据" @click="clickPrev(rightTable.powerIntegrationRap,2);"></i>
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <td colspan="2">对端数据</td>
                        </tr>
                        <tr>
                            <td width="50%">P+</td>
                            <td width="50%">P-</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span>{{fmtNum(rightTable.endtoEndDataPap)}}</span>
                                <i class="icon-up th_an_z" title="替代主数据" @click="clickPlus(rightTable.endtoEndDataPap,3);"></i>
                            </td>
                            <td>
                                <span>{{fmtNum(rightTable.endtoEndDataRap)}}</span>
                                <i class="icon-up th_an_f" title="替代主数据" @click="clickPrev(rightTable.endtoEndDataRap,3);"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import tree from "@/components/common/tree.vue";
import treeMinx from "@/components/mixins/tree";
import BScroll from "better-scroll";
import hub from "@/assets/eventBus.js";
import chart from "../mixins/chart.js";
export default {
  data() {
    return {
      stbId:this.$route.query.stbId,
      devId: this.$route.query.devId,
      currentDate: this.$route.query.date, //当前选中的是月份时间或者是日期时间(默认是传过来的月份)
      dayDate: this.$day().format("YYYY-MM-DD"), //选择的天数
      monthDate: this.$day().format("YYYY-MM"), //选择的月份
      dateShow: true,
      treeShow: false,
      tabData: true,
      papData: { //正向有功，数据集合
        days: [],
        elec: [],
        mean: [],
        max: [],
        min: [],
        sqareError: [],
        tariff: [],
        endtoEndData: [],
        endtoEndData: [],
        secondElec: [],
        estimateTariff: []
      },
      rapData: {
        //反向有功，数据集合
        days: [],
        elec: [],
        mean: [],
        max: [],
        min: [],
        sqareError: [],
        tariff: [],
        endtoEndData: [],
        endtoEndData: [],
        secondElec: [],
        estimateTariff: []
      },
      mainElecPaps: 0, //主表数据（电量）
      mainElecRaps: 0, //主表数据（电量）
      zerop: 0, //主表电量p+,参与计算
      zeroj: 0, //主表电量p-，参与计算
      mainUperTariffPap: 0, //主表底码p+,上表底
      mainUperTariffRap: 0, //主表底码p-，上表底
      mainUperTariffPaps: 0, //主表底码p+,用作计算，上表底
      mainUperTariffRaps: 0, //主表底码p-,用作计算，上表底
      mainLowerTariffPap: 0,
      mainLowerTariffRap: 0,
      mainLowerTariffPaps: 0,
      mainLowerTariffRaps: 0,
      ratio: 1,
      fous: true,
      rightTable: {}, //右侧表格
      policy: 1, //修复策略Id
      bubly: 3, //气泡
      change: false, //防止没有任何更改时，提交数据
      busbarId: "", //母平模型id
      aclineId: "", //分线模型Id
      formulaBus: {}, //母平公式
      formulaAc: {}, //分线公式
      lossRateBus: 0, //当前时间母平损耗率
      lossRateAc: 0, //当前时间分线损耗率
      RateBus: null, //母平，用作计算
      RateAc: null, //分线，用作计算
      switchTariff: true, //上表码，下表吗状态切换
      differBus: 0,
      differAc: 0,
      meta: "日", //单位
      bubbly: false,
      policyName: ["手动修改", "积分电量", "对端电量", "副表电量"] //修改规则
    };
  },
  components: { tree },
  mixins: [treeMinx, chart],
  created() {//先获取传过来的参数(时间，ID等...)
   if (this.patch("-", this.$route.query.date) > 1) {//时间控件显示月还是日
      this.dateShow = true;
    } else {
      this.dateShow = false;
    }
    this.metaFun();
    this.getLeftPap();
    this.getTableData();
    this.getModelIdByMeterId1()//母线计算公式
    // this.getModelIdByMeterId2()//分线计算公式
  },
  mounted() {//滚动条
    hub.$on('updateChart',(res)=>{
      console.log(res)
      this.metaFun();
      this.getLeftPap();
      this.getTableData();
      this.getModelIdByMeterId1()//母线计算公式
      // this.getModelIdByMeterId2()//分线计算公式
    })
    hub.$on('sendTime',(res)=>{
      this.currentDate = res;
      console.log( this.currentDate)
    })
    var scrollbox_r_b = new BScroll(`.scrollbox_r_b`, {
        scrollbar: { fade: false, interactive: true },
        mouseWheel: true,
      });
    let scroll = new BScroll(`.side_nav`, {
        scrollbar: true,
        mouseWheel: true
    });
  },
  methods: {
    clickPlus: function(val, policy) {//点击箭头重新赋值主表电量，触发运算
      if (val) {
        this.zerop = val;
        this.policy = policy;
        this.pPlus();
      }
    },
    clickPrev: function(val, policy) {
      if (val) {
        this.zeroj = val;
        this.policy = policy;
        this.pPrev();
      }
    },
    clickPapPlus(val, policy) {
      console.log(val);
      if (val) {
        this.mainUperTariffPaps = val;
        this.policy = policy;
        this.zerop =
          Math.floor(
            (this.mainUperTariffPap - val) * this.ratio +
              Number(this.mainElecPaps) * 10000
          ) / 10000; //算法,反推电量
        this.pPlus();
      }
    },
    clickRapPrev(val, policy) {
      console.log(val);
      if (val) {
        this.mainUperTariffRaps = val;
        this.policy = policy;
        this.zeroj =
          Math.floor(
            (this.mainUperTariffRap - val) * this.ratio +
              Number(this.mainElecRaps) * 10000
          ) / 10000; //算法,反推电量
        console.log(this.zeroj);
        this.pPrev();
      }
    },
    filter_data_uper: function(to, froms, target, tariff, newTariff) { //数据过滤,筛选出当前日期的数据（主要用于正向有功反向有功的运算）
      froms.forEach((item, index) => {
        if (item == this.currentDate) {
          // app1.dataChangeLogs.dataTimeStr = this.currentDate;
          to[index] = Number(target);
          tariff[index] = Number(newTariff);
        }
      });
      return to;
    },
    filter_data_lower: function(to, froms, target, tariff, newTariff) {//数据过滤,筛选出当前日期的数据（主要用于正向有功反向有功的运算）
      froms.forEach((item, index) => {
        if (item == this.currentDate) {
          to[index] = Number(target);
          if (this.patch("-", this.currentDate) > 1) {
            //说明是月数据
            tariff[index + 1] = Number(newTariff);
          }
        }
      });
      return to;
    },
    getTableData: function() {//右侧表格的数据
      var that = this;
      this.$http
        .get(
          `/dataDiagnoseService/dataDiagnose/getAllElecAndTariff`,
          {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              devId:this.devId,
              date:this.currentDate
            }
          }
        )
        .then(res => {
          if (res.data.code === 1) {
            if ( res.data.data.allElecAndTariffVO) {
              that.rightTable = res.data.data.allElecAndTariffVO;
              that.mainElecPaps = res.data.data.allElecAndTariffVO.mainElecPap;
              that.mainElecRaps = res.data.data.allElecAndTariffVO.mainElecRap;         
              that.zerop = res.data.data.allElecAndTariffVO.mainElecPap;            
              that.zeroj = res.data.data.allElecAndTariffVO.mainElecRap;           
              that.mainUperTariffPap = res.data.data.allElecAndTariffVO.mainUpperTariffPap//上底码PAP,备份      
              that.mainUperTariffRap = res.data.data.allElecAndTariffVO.mainUpperTariffRap;//下底码RAP,备份
              that.mainUperTariffPaps = res.data.data.allElecAndTariffVO.mainUpperTariffPap;//上底码PAP
              that.mainUperTariffRaps = res.data.data.allElecAndTariffVO.mainUpperTariffRap;//下底码RAP
              that.mainLowerTariffPap = res.data.data.allElecAndTariffVO.mainLowerTariffPap;
              that.mainLowerTariffRap = res.data.data.allElecAndTariffVO.mainLowerTariffRap;
              that.mainLowerTariffPaps = res.data.data.allElecAndTariffVO.mainLowerTariffPap;
              that.mainLowerTariffRaps = res.data.data.allElecAndTariffVO.mainLowerTariffRap;
              that.ratio = res.data.data.allElecAndTariffVO.ratio;
            }
          }
        });
    },
    getLeftPap: function() {//获取正向有功，与反向有功数据,图表数据
      var that = this;
      that.papData.elec = []; //电量集合
      that.papData.days = []; //日期集合
      that.papData.mean = []; //平均值
      that.papData.max = []; //最大值
      that.papData.min = []; //最小值
      that.papData.sqareError = []; //方差
      that.papData.tariff = []; //底码
      that.papData.endtoEndData = []; //对端电量
      that.papData.powerIntegration = []; //积分电量
      that.papData.secondElec = []; //副表电量
      that.papData.estimateTariff = []; //预估值
      that.rapData.elec = [];
      that.rapData.days = [];
      that.rapData.mean = [];
      that.rapData.max = [];
      that.rapData.min = [];
      that.rapData.sqareError = [];
      that.rapData.tariff = [];
      that.rapData.endtoEndData = [];
      that.rapData.powerIntegration = [];
      that.rapData.secondElec = [];
      that.rapData.estimateTariff = [];
      this.$http
        .get(`/dataDiagnoseService/dataDiagnose/getElecDataCurve`, {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            devId:this.devId,
            date:this.currentDate
          }
        })
        .then(res => {
          var elecPAP = res.data.data.elecDataCurvePAPs;
          var elecRAP = res.data.data.elecDataCurveRAPs;
          for (var i = 0; i < elecPAP.length; i++) {
            that.papData.days.push(elecPAP[i].date);
            that.papData.elec.push(elecPAP[i].elec);
            that.papData.mean.push(elecPAP[i].mean);
            that.papData.max.push(elecPAP[i].max);
            that.papData.min.push(elecPAP[i].min);
            that.papData.sqareError.push(elecPAP[i].sqareError);
            that.papData.tariff.push(elecPAP[i].tariff);
            that.papData.endtoEndData.push(elecPAP[i].endtoEndData);
            that.papData.powerIntegration.push(elecPAP[i].powerIntegration);
            that.papData.secondElec.push(elecPAP[i].secondElec);
            that.papData.estimateTariff.push(elecPAP[i].estimateTariff);
          }
          // console.log(  that.papData.days);
          for (var k = 0; k < elecRAP.length; k++) {
            that.rapData.days.push(elecRAP[k].date);
            that.rapData.elec.push(elecRAP[k].elec);
            that.rapData.mean.push(elecRAP[k].mean);
            that.rapData.max.push(elecRAP[k].max);
            that.rapData.min.push(elecRAP[k].min);
            that.rapData.sqareError.push(elecRAP[k].sqareError);
            that.rapData.tariff.push(elecRAP[k].tariff);
            that.rapData.endtoEndData.push(elecRAP[k].endtoEndData);
            that.rapData.powerIntegration.push(elecRAP[k].powerIntegration);
            that.rapData.secondElec.push(elecRAP[k].secondElec);
            that.rapData.estimateTariff.push(elecRAP[k].estimateTariff);
          }
          that.chart1();
          that.chart2();
          that.chart3();
          that.chart4();
        });
    },
    getRightPap: function() { //获取设备名称与母平，分线,分压损耗率数据
      var that = this;
      this.$http
        .get(
          `/dataDiagnoseService/dataDiagnose/getElecDataStandardCurve`
        ,{
          params:{
            sign:sessionStorage.getItem('accessToken'),
            devId:this.devId,
            date:this.currentDate
          }
        })
        .then(res => {
          // this.$emit("sendBusBar", { //修改主表电量，重计算电表底码，跟新保存记录
          //   pathName: res.busbarsectionName,
          // });
        });
    },
    getEnergyData: function(sbtId, vlId, lineId) {//获取计算母平，分线，分压所需数据
      var that = this;
      this.$http
        .get(`/dataDiagnoseService/dataDiagnose/getEnergyData`, {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            sbtId: sbtId,
            vlId: vlId,
            lineId: lineId,
            date: this.currentDate
          }
        })
        .then(res => {
          if (sbtId) {
            // that.trans = energyData;
            console.log(that.trans);
          } else if (vlId) {
            that.busbar = res.data.data.energyDataVOS;
          } else if (lineId) {
            that.acs = res.data.data.energyData;
          }
        });
    },
    getIndexFormulaBus: function(modelId) {//获取母平计算公式
      this.$http
        .get(
          `/dataDiagnoseService/dataDiagnose/getIndexFormula`
        ,{
          params:{
            sign:sessionStorage.getItem('accessToken'),
            mrid:modelId,
            occurTime:this.currentDate,
            modelType:1
          }
        })
        .then(res => {
         if (res.data.code ===1) {
           this.formulaBus = res.data.data.formulaAndDataVOs;
           this.lossRateBus = this.calculateInit(res.data.data.formulaAndDataVOs); //计算后的母平损耗率
           this.RateBus = this.calculateInit(res.data.data.formulaAndDataVOs);
           console.log(this.lossRateBus);
           console.log(this.RateBus);
         }
        });
    },
    getIndexFormulaAc: function(modelId) {//获取分线计算公式
      this.$http
        .get(
          `/dataDiagnoseService/dataDiagnose/getIndexFormula`
         ,{
          params:{
            sign:sessionStorage.getItem('accessToken'),
            mrid:modelId,
            occurTime:this.currentDate,
            modelType:2
          }
        })
        .then(res => {
          that.formulaAc = res.data.data.formulaAndDataVOs;
          that.lossRateAc = that.calculateInit(res.data.data.formulaAndDataVOs); //分线损耗率
          that.RateAc = that.calculateInit(res.data.data.formulaAndDataVOs);
        });
    },
    getModelIdByMeterId1: function() { //获取计算公式前置，获取模型id,母线
      var that = this;
      var id = "";
      this.$http
        .get(
          `/dataDiagnoseService/dataDiagnose/getModelIdByMeterId`
         ,{
          params:{
            sign:sessionStorage.getItem('accessToken'),
            devId:this.devId,
            occurTime:this.currentDate,
            modelType:1
          }
        })
        .then(res => {
          if (Object.keys(res.data.data).length !== 0) {
            that.busbarId = res.data.data.vlId;
            id = res.data.data.vlId;
            that.getIndexFormulaBus(id);
            // that.getEnergyData("", id, "");
          } else {
            // alert("母线Id获取异常！！");
             this.$notify({
              title: "错误",
              message: "母线Id获取异常！！",
              duration: 3000,
              type: "error"
            });
          }
        });
    },
    getModelIdByMeterId2: function() {//获取计算公式前置，获取模型id,分线
      var that = this;
      var id = "";
      this.$http
        .get(
          `/dataDiagnoseService/dataDiagnose/getModelIdByMeterId`
         ,{
          params:{
            sign:sessionStorage.getItem('accessToken'),
            devId:this.devId,
            occurTime:'2018-03',
            modelType:2
          }
        })
        .then(res => {
          if (Object.keys(res.data.data).length !== 0) {
            that.aclineId = res.data.data.aclineId;
            id = res.data.data.aclineId;
            that.getIndexFormulaAc(id);
            // that.getEnergyData("", "", id);
          } else {
            alert("分线Id获取异常！！");
          }
        });
    },
    switchTariffs: function() { //切换上下底码,重置数据,触发计算流程
      this.switchTariff?hub.$emit('editorType',true):hub.$emit('editorType',false)
      hub.$emit('hasEditor',false)
      this.bubbly = true;
      setTimeout(() => {
        this.bubbly = false;
      }, 800);
      this.mainUperTariffPaps = this.mainUperTariffPap;
      this.mainUperTariffRaps = this.mainUperTariffRap;
      this.mainLowerTariffPaps = this.mainLowerTariffPap;
      this.mainLowerTariffRaps = this.mainLowerTariffRap;
      this.zerop = this.mainElecPaps;
      this.zeroj = this.mainElecRaps;
      this.pPlus();
      this.pPrev();
      this.chart1();
      this.chart2();
      this.chart3();
      this.chart4();
    },
    pPlus: function() {//计算底码PAP
      var that = this;
      hub.$emit('hasEditor',true)
      if (that.switchTariff) {//上底码PAP
        this.mainUperTariffPaps =
          this.mainUperTariffPap -
          (Number(this.zerop) - Number(this.mainElecPaps)) / that.ratio; //算法
        that.filter_data_uper(
          this.papData.elec,
          this.papData.days,
          this.zerop,
          this.papData.tariff,
          this.mainUperTariffPaps
        ); //匹配那一天的数据
        hub.$emit("getMsg", {//修改主表电量，重计算电表底码，跟新保存记录
          originPap: this.mainUperTariffPap,
          newPap: this.mainUperTariffPaps,
          originRap: this.mainUperTariffRap,
          newRap: this.mainUperTariffRaps,
          occurTime: this.$day().format('YYYY-MM-DD HH:mm:ss'),
          policy: this.policy,
          policyName: this.policyName[this.policy - 1]
        });
        console.log("更改主表数据，重计算后，正向有功所有折线图数据");
        // console.log(this.papData.elec);
      } else {//下底码PAP
        this.mainLowerTariffPaps =
          (Number(this.zerop) - Number(this.mainElecPaps)) / that.ratio +
          this.mainLowerTariffPap; //算法
        that.filter_data_lower(
          that.papData.elec,
          this.papData.days,
          this.zerop,
          this.papData.tariff,
          this.mainLowerTariffPaps
        ); //匹配那一天的数据
        hub.$emit("getMsg", {//修改主表电量，重计算电表底码，跟新保存记录
          originPap: this.mainLowerTariffPap,
          newPap: this.mainLowerTariffPaps,
          originRap: this.mainLowerTariffRap,
          newRap: this.mainLowerTariffRaps,
          occurTime: this.$day().format('YYYY-MM-DD HH:mm:ss'),
          policy: this.policy,
          policyName: this.policyName[this.policy - 1]
        });
        // console.log("更改主表数据，重计算后，正向有功所有折线图数据");
      }
      console.log(this.zerop)
      this.chart1();
      this.chart3();
    },
    pPrev: function() {//计算底码RAP
      var that = this;
      var rate = 2000; //倍率
      hub.$emit('hasEditor',true)
      if (that.switchTariff) {
        this.mainUperTariffRaps =
          this.mainUperTariffRap -
          (Number(this.zeroj) - Number(this.mainElecRaps)) / that.ratio; //算法
        that.filter_data_uper(
          that.rapData.elec,
          this.rapData.days,
          this.zeroj,
          this.rapData.tariff,
          this.mainUperTariffRaps
        ); //匹配那一天的数据
        hub.$emit("getMsg", {
          originPap: this.mainUperTariffPap,
          newPap: this.mainUperTariffPaps,
          originRap: this.mainUperTariffRap,
          newRap: this.mainUperTariffRaps,
          occurTime:this.$day().format('YYYY-MM-DD HH:mm:ss'),
          policy: this.policy,
          policyName: this.policyName[this.policy - 1]
        });
        // that.calculate();
      } else {
        this.mainLowerTariffRaps =
          (this.zeroj - this.mainElecRaps) / that.ratio +
          this.mainLowerTariffRap; //算法
        that.filter_data_lower(
          that.rapData.elec,
          this.rapData.days,
          this.zeroj,
          this.rapData.tariff,
          this.mainLowerTariffRaps
        ); //匹配那一天的数据
        hub.$emit("getMsg", {
          originPap: this.mainLowerTariffPap,
          newPap: this.mainLowerTariffPaps,
          originRap: this.mainLowerTariffRap,
          newRap: this.mainLowerTariffRaps,
          occurTime: this.$day().format('YYYY-MM-DD HH:mm:ss'),
          policy: this.policy,
          policyName: this.policyName[this.policy - 1]
        });
      }
      this.chart2();
      this.chart4();
      //假装有公式
    },
    calculateBus: function(formulas, val, type) {//计算母平，分线损耗率
      if (formulas.formula) {
        let formula = formulas.formula;
        formulas.configDatas.forEach((item, i) => {
          let reg = new RegExp(eval("/@" + String(item.numero) + "/g"));
          if (item.devId == this.devId && item.pulseType == type) {
            item.value = val
          }
          if (formula.indexOf(String(item.numero)) >= 0) {
            formula = formula.replace(reg, String(item.value || 0));
          }
        });
        console.log(formula)
        return this.filterComputeFixd(eval(formula) * 100, 2);
      }
    },
    calculateInit(formulas) {//计算母平不平衡率初始值
      if (formulas.formula) {
        let formula = formulas.formula;
        formulas.configDatas.forEach((v, i) => {
          let reg = new RegExp(eval("/@" + String(v.numero) + "/g"));
          if (formula.indexOf(String(v.numero)) >= 0) {
            formula = formula.replace(reg, String(v.value || 0));
          }
      });
        console.log(formula)
        return this.filterComputeFixd(eval(formula) * 100, 2);
      }
    },
    patch: function(re, s) {//匹配某一字符串出现的个数
      re = eval("/" + re + "/ig");
      return s.match(re).length;
    },
    splitPapDay: function(arr) {//截取图表x轴日期单位,
      var that = this;
      var result = [];
      if (arr.length) {
        for (var item of arr) {
          result.push(item.split("-").pop());
        }
      }
      return result;
    },
    fmtNum(val) {
      if (val == "NaN" || val == "undefined") {
        return "";
      } else if (val == "0") {
        return 0;
      } else {
        return val;
      }
    },
    differBu() {//不平衡率变化差值
      return (this.lossRateBus - this.RateBus).toFixed(4);
    },
    filterComputeFixd(num, fixed) { //过滤数字类型
      if (num == "") {
        return;
      } else if (num == undefined) {
        return 0;
      } else if (num == 0) {
        return 0;
      } else if (num == Infinity || num == -Infinity) {
        return 0;
      } else if (isNaN(num)) {
        return 0;
      } else {
        return Number(num).toFixed(fixed);
      }
    },
    metaFun: function() { //日期单位是日还是月
      if (this.patch('-', this.currentDate) > 1) {
        this.meta = '日';
      } else {
        this.meta = '月';
      }
    },
    sideTree() { //切换树
      this.treeShow = !this.treeShow;
    },
    getFirstMenu(){//树菜单
      this.$http.get("/treeService/tree/getConductionEquipmentBySubstationId",{
          params:{
            sign:sessionStorage.getItem("accessToken"),
            stId:this.stbId,
            // stId:'1000000160601031897'
          }
        }).then(res=>{
          if (res.data.code ===1) {
            this.firstData = res.data.data.allTreeNodes
          }
        })
    },
    getMenu(item, callback) { //监听回调函数，通过callback返回下级菜单数据 
      if (item.attribute == 'vlId') {// 母线devId
        this.devId = item.id;
        hub.$emit("sendDevId",item.id);
        //重新加载
        this.metaFun();
        this.getLeftPap();
        this.getTableData();
        this.getModelIdByMeterId1()//母线计算公式
        // this.getModelIdByMeterId2()//分线计算公式
        hub.$emit('clickDevId',"更新expection")
      } 
    },
  },
  watch: {
    zerop: {
      handler: function(news, old) {
        if (news !== "") {
          this.lossRateBus = this.formulaBus.formula
            ? this.calculateBus(this.formulaBus, news, 1)
            : this.RateBus; //计算后的母平损耗率
          // this.lossRateAc = this.calculateBus(this.formulaAc);//计算后分线损耗率
          // this.differBus = Math.floor(Math.abs(this.lossRateBus - this.RateBus) * 10000) / 10000; //母平差值
          // this.differAc =  Math.floor(Math.abs(this.lossRateAc - this.RateAc)* 10000)/10000;//分线差值
        }
      },
      deep: true
    },
    zeroj: {
      handler: function(news, old) {
        if (news != "") {
          this.lossRateBus = this.formulaBus.formula
            ? this.calculateBus(this.formulaBus, news, 2)
            : this.RateBus; //计算后的母平损耗率
          // this.lossRateAc = this.calculateBus(this.formulaAc);//分线损耗率
          // this.differBus = Math.round(Math.abs(this.lossRateBus - this.RateBus) * 10000) / 10000; //母平差值
          // this.differAc =  Math.floor(Math.abs(this.lossRateAc - this.RateAc)* 10000)/10000;//分线差值
        }
      },
      deep: true
    }
  }
};
</script>

