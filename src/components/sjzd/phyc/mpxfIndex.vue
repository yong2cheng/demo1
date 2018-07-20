<template>
    <div class="wrap">
      <!-- 我的代码 -->
        <router-view/>
        <div class="mxian_succ after main_position">
            <!-- 顶部工具组 -->
            <div class="topBar">
                <div>
                    <div class="inbl">
                        {{plantkv}}&nbsp;&nbsp;母线平衡修复
                    </div>
                    
                    <div class="inbl" >
                        <ul class="ulCls">
                            <li :class="{liCls:dateShow}" @click="dateTab(0)" >日数据</li>
                            <li :class="{liCls:!dateShow}" @click="dateTab(1)" >月数据</li>
                        </ul>
                        <ul>
                            <li v-show="dateShow">
                                <el-date-picker v-model="dayDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
                            </li>
                            <li v-show="!dateShow">
                                <el-date-picker v-model="monthDate" type="month" placeholder="选择月" value-format="yyyy-MM" />
                            </li>
                        </ul>
                    </div>
                    <div class="inbl">
                        <div class="btn" @click="getRenderTabData">提交</div>
                    </div>

                    <iconBtn v-bind:icon="iconBtnList" />
                    <div class="inbl">
                        <button class="primary" @click="saveData();updateStatus()">保存</button>
                        <button class="warning" @click="backout">撤销</button>
                    </div>
                </div>
                <!-- 显示总的输入 输出 平衡 -->
                <div class="sumBalanceTab">
                    <table class="table">
                        <tr>
                            <td width="5%">输入:</td>
                            <td>Σ正向有功={{papVal}}</td>
                            <td>输出:</td>
                            <td>Σ反向有功={{rapVal}}</td>
                            <td>平衡率:</td>
                            <td>{{equilibriumRate}}%</td>
                            <td>平衡率超过10%建议修改配置</td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- 表格渲染 -->
            <div class="tab_rendering">
                <!-- 静态初始表格模板 -->
                <div class="xScroll" >
                    <div class="overScroll" >
                        <div class="theadFixd">
                            <table class="table">
                                <thead style="text-align:center">
                                    <tr>
                                        <td rowspan="2" width="50px">序号</td>
                                        <td rowspan="2" width="170px">计量点</td>
                                        <td rowspan="2" width="120px">倍率</td>
                                        <td colspan="2" width="240px" :class="{'bgSelect' : radioChecked }" @click="radioStatus(radioChecked)" >
                                            <input type="radio" name="cutOutsFun" class="cutOutsFun" data-cutfun="1" :checked="radioChecked" >
                                            上底码
                                        </td>
                                        <td colspan="2" width="240px" :class="{'bgSelect' : !radioChecked }" @click="radioStatus(!radioChecked)" >
                                            <input type="radio" name="cutOutsFun" class="cutOutsFun" data-cutfun="2" :checked="!radioChecked" >
                                            下底码
                                        </td>
                                        <td colspan="2" width="240px">电量</td>
                                        <td colspan="2" width="240px">预估初底码</td>
                                        <td colspan="2" width="240px">积分电量</td>
                                        <td colspan="2" width="240px">副表电量</td>
                                        <td colspan="2" width="240px">对端电量</td>
                                    </tr>
                                    <tr>
                                        <td width="120px">正向有功</td>
                                        <td width="120px">反向有功</td>
                                        <td width="120px">正向有功</td>
                                        <td width="120px">反向有功</td>
                                        <td width="120px">正向有功</td>
                                        <td width="120px">反向有功</td>
                                        <td width="120px">正向有功</td>
                                        <td width="120px">反向有功</td>
                                        <td width="120px">正向有功</td>
                                        <td width="120px">反向有功</td>
                                        <td width="120px">正向有功</td>
                                        <td width="120px">反向有功</td>
                                        <td width="120px">正向有功</td>
                                        <td width="120px">反向有功</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="tbodyScroll" >
                            <!-- tbody 表格数据 -->
                            <table class="table" id="locateTips" >
                                <tbody>
                                    <tr v-for="(tr,i) of allRenderTabData" :key="i">
                                        <td width="50px">{{ i+1 }}</td>
                                        <td width="170px">
                                          <!-- {{ tr.devName }} -->
                                          <router-link class="color_warning" :to="{path: '/sjbj', 
                                              query:{sysId:$route.query.sysId,sonid:$route.query.sonid,date:dateShow?monthDate:dayDate,stbId:sbtId,devId:tr.devId,devName:tr.devName}}" 
                                              target="_blank" >
                                              {{tr.devName }}
                                          </router-link>
                                        </td>
                                        <td width="120px" >{{ tr.ratio }}</td>
                                        <td width="120px" > {{ tr.mainTariffPap }} </td>
                                        <td width="120px" > {{ tr.mainTariffRap }} </td>
                                        <td width="120px" > {{tr.endMainTariffPap}} </td>
                                        <td width="120px" > {{tr.endMainTariffRap}} </td>
                                        <td width="120px" > 
                                            <input type="number" class="txt td_input" :readonly="forGeted ? false : 'readonly'" v-model="tr.mainElecPap" @input="changeTips($event,i,tr.devId,1)" @click="showTips($event,tr.devId)" @blur="hideTips" />
                                        </td>
                                        <td width="120px" >
                                            <input type="number" class="txt td_input" :readonly="forGeted ? false : 'readonly'" v-model="tr.mainElecRap" @input="changeTips($event,i,tr.devId,2)" @click="showTips($event,tr.devId)" @blur="hideTips" >
                                        </td>
                                        <td width="120px" > {{tr.estimateTariffPap}} </td>
                                        <td width="120px" > {{tr.estimateTariffRap}} </td>
                                        <td width="120px" >  </td>
                                        <td width="120px" >  </td>
                                        <td width="120px" > {{tr.secondElecPap}} </td>
                                        <td width="120px" > {{tr.secondElecRap}} </td>
                                        <td width="120px" > {{tr.endtoEndDataPap}} </td>
                                        <td width="120px" > {{tr.endtoEndDataRap}} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 母平计算 -->
        <div class="xzts" v-show="mpjsShow" :style="`left:${tipsLeft}px;top:${tipsTop}px;`" >
            <ul class="dataAdd">
                <li>母平：{{newMpFormulaNum ? newMpFormulaNum : oriMpFormulaNum}}%<i class="icon-up red"></i>{{newMpFormulaNum ? mpDiffVal : 0}}%</li>
                <li>线损：0%<i class="icon-down red"></i>0%</li>
            </ul>
        </div>
    </div>
</template>
<script>
import iconBtn from "../common/IconBtn";
// import tree from "@/components/common/tree.vue";
// import treeMinx from "@/components/mixins/tree";
import BScroll from "better-scroll";
import qs from "qs";
export default {
  data: function() {
    return {
      iconBtnList: [
        {
          iconName: "修改配置",
          iconFont: "icon-zidongxiufu"
        },
        {
          iconName: "图形",
          iconFont: "icon-pinggubaogao"
        }
      ],
      dayDate: this.$day().format("YYYY-MM-DD"),
      monthDate: this.$route.query.time,
      papVal: 0,
      rapVal: 0,
      equilibriumRate: 0,
      dateShow: false, //时间 月/日 显示切换
      allRenderTabData: [], //所有渲染表格的数据
      copyRenderTabData: [], //复制一份渲染表格的数据
      plantsInfo: {}, //厂站信息 ID name
      plantkv: null, //kv名字
      mpjsShow: false, //母平计算 tips
      tipsLeft: 0, //提示框的 left 值
      tipsTop: 0, //提示框的 right 值
      mpId: this.$route.query.vlId, //母平 ID
      fxId: "", //分线 ID
      mpFormula: "", //母平公式
      fxFormula: "", //分线公式
      radioChecked: true, //上下底码切换
      sbtId: "", //传给下个页面的
      mrid: "", //接收到的mrid,即母线Id
      thisDevId: "", //此次参与计算的 devid
      forGeted: 0, //判断母平公式是否已经获取到
      oriMpFormulaArr: [], //原始的母平公式数据数组
      newMpFormulaArr: [], //新的的母平公式数据数组
      oriMpFormulaNum: 0, //原始的母平公式数据计算结果
      newMpFormulaNum: 0, //新的的母平公式数据计算结果
      oriFxFormulaArr: [], //原始的分线公式数据数组
      newFxFormulaArr: [], //新的的分线公式数据数组
      mpDiffVal: 0 //母平 新值-旧值
    };
  },
  components: {
    iconBtn
  },
  filters: {},
  computed: {},
  methods: {
    //日期切换
    dateTab(req) {
      if (!req) {
        //切换到 日
        this.dateShow = true;
      } else {
        //切换到 月
        this.dateShow = false;
      }
    },
    //显示母平弹框
    showTips(e, devId) {
      this.mpjsShow = true;
      this.tipsLeft = e.currentTarget.getBoundingClientRect().right + 12;
      this.tipsTop = e.currentTarget.getBoundingClientRect().top - 26;
      this.computeBalance(e.currentTarget, devId);
    },
     //隐藏母平弹框
    hideTips() { 
      this.mpjsShow = false;
    },
    //过滤数字类型
    filterComputeFixd(num, fixed) {
      if (num == "") {
        return 0;
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
     //母平的计算 计算出新母平或旧母平
    mpFormulaSum() {
      let formula = this.mpFormula;
      this.newMpFormulaArr.forEach((v, i) => {
        let reg = new RegExp(eval("/@" + String(v.numero) + "/g"));
        if (formula.indexOf(String(v.numero)) >= 0) {
          formula = formula.replace(reg, String(v.value || 0));
        }
      });
      return this.filterComputeFixd(eval(formula) * 100, 2);
    },
    //复制一份数组对象
    copyArrObj(newArr, oriArr) {
      for (var i in oriArr) {
        //并将修改的值还原
        newArr[i] = {};
        for (var j in oriArr[i]) {
          newArr[i][j] = oriArr[i][j];
        }
      }
      return newArr;
    },
    //修改电量input中的值,同时改变tips
    changeTips(e, i, devId, type) {
      // devId : 匹配到电量两个值 , type : 区分P+/P-
      // this.showTips(e,devId);
      //匹配更改后的值 替换arr中的
      this.newMpFormulaArr.forEach((v, idx) => {
        if (type == 1) {
          //P+
          if (v.devId == devId && v.pulseType == type) {
            if (this.radioChecked) {
              // true => 上底码 P+
              v.mainTariffPap = this.upOrDownDiMa(
                this.allRenderTabData[i]["mainTariffPap"],
                this.allRenderTabData[i]["mainElecPap"],
                v.value,
                this.allRenderTabData[i]["ratio"],
                1
              );
              this.$set(
                this.allRenderTabData[i],
                "mainTariffPap",
                v.mainTariffPap
              );
            } else {
              // false => 下底码 P+
              v.endMainTariffPap = this.upOrDownDiMa(
                this.allRenderTabData[i]["endMainTariffPap"],
                this.allRenderTabData[i]["mainElecPap"],
                v.value,
                this.allRenderTabData[i]["ratio"],
                1
              );
              this.$set(
                this.allRenderTabData[i],
                "endMainTariffPap",
                v.endMainTariffPap
              );
            }
            v.value = this.allRenderTabData[i]["mainElecPap"];
          }
        } else {
          //P-
          if (v.devId == devId && v.pulseType == type) {
            if (this.radioChecked) {
              //true => 上底码 P-
              v.mainTariffRap = this.upOrDownDiMa(
                this.allRenderTabData[i]["mainTariffRap"],
                this.allRenderTabData[i]["mainElecRap"],
                v.value,
                this.allRenderTabData[i]["ratio"],
                2
              );
              this.$set(
                this.allRenderTabData[i],
                "mainTariffRap",
                v.mainTariffRap
              );
            } else {
              // false => 下底码  P-
              v.endMainTariffRap = this.upOrDownDiMa(
                this.allRenderTabData[i]["endMainTariffRap"],
                this.allRenderTabData[i]["mainElecRap"],
                v.value,
                this.allRenderTabData[i]["ratio"],
                1
              );
              this.$set(
                this.allRenderTabData[i],
                "endMainTariffRap",
                v.endMainTariffRap
              );
            }
            v.value = this.allRenderTabData[i]["mainElecRap"];
          }
        }
      });
      this.newMpFormulaNum = this.mpFormulaSum(); //计算出新 母平值
      this.computeSum(this.allRenderTabData);
      console.log(
        "旧值 : " + this.oriMpFormulaNum,
        "新值 : " + this.newMpFormulaNum
      );

      this.mpDiffVal = this.filterComputeFixd(
        this.newMpFormulaNum - this.oriMpFormulaNum,
        2
      );
    },
     // 上底码 或 下底码的 计算公式
    upOrDownDiMa(val, newkv, oldkv, ratio, type) {
      //  val=底码值  newkv=新电量 oldkv=旧电量 ratio=倍率  type 上底码/下底码
      if (
        ratio == 0 ||
        ratio == -0 ||
        ratio == "" ||
        ratio == undefined ||
        isNaN(ratio)
      ) {
        return 0;
      } else {
        if (type == 1) {
          //上底码
          return this.filterComputeFixd(
            Number(val) - (Number(newkv) - Number(oldkv)) / ratio,
            4
          );
        } else {
          //下底码
          return this.filterComputeFixd(
            (Number(newkv) - Number(oldkv)) / ratio + Number(val),
            4
          );
        }
      }
    },
     //获得新的母线数据数组
    computeBalance(e, devId) {
      function copyNewGeneratrixData(oriArr, newArr) {
        for (var i in oriArr) {
          newArr[i] = {};
          for (var j in oriArr[i]) {
            newArr[i][j] = oriArr[i][j];
          }
        }
      }
      if (!this.mpId) {
        this.$http
          .get(`/dataDiagnoseService/dataDiagnose/getIndexFormula`, {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              mrid: this.mpId,
              modelType: "1",
              occurTime: "2018-06"
            }
          })
          .then(res => {
            //获得母平公式 formulaAndDataVO
            if ( res.data.data.formulaAndDataVOs) {
              this.oriMpFormulaArr = res.data.data.formulaAndDataVO.configDatas;
              this.mpFormula = res.data.data.formulaAndDataVO.formula;
            }
          });
        copyNewGeneratrixData(this.oriMpFormulaArr, this.newMpFormulaArr); //copy一个新的数组，不改变原来的数组
      }
      this.forGeted = 1;
      if (this.thisDevId == devId || this.thisDevId == "") {
        //如果 目前参与计算的id与传进来的id相等，或目前没有id参与计算
        //计算旧的母平率
        if (this.oriMpFormulaNum) {
          this.oriMpFormulaNum = this.mpFormulaSum();
        }
        console.log(this.oriMpFormulaNum);
        this.thisDevId = devId;
      } else {
        //如果 id 存在且不相等
        copyNewGeneratrixData(this.oriMpFormulaArr, this.newMpFormulaArr); //重新new一个新数组数据
        this.oriMpFormulaNum = this.mpFormulaSum(); //再执行计算旧母平率
        this.newMpFormulaNum = 0; //并将新母平率归0
        for (var i in this.copyRenderTabData) {
          //并将修改的值还原
          this.allRenderTabData[i] = {};
          for (var j in this.copyRenderTabData[i]) {
            this.allRenderTabData[i][j] = this.copyRenderTabData[i][j];
          }
        }
        this.thisDevId = devId;
      }
    },
    //切换上下底码选择状态
    radioStatus(status) {
      if (status) {
        this.radioChecked = this.radioChecked; //切换 bgcolor
        this.allRenderTabData = this.copyArrObj(
          this.allRenderTabData,
          this.copyRenderTabData
        ); //还原更改过的电量值
      } else {
        this.allRenderTabData = this.copyArrObj(
          this.allRenderTabData,
          this.copyRenderTabData
        ); //还原更改过的电量值
        this.radioChecked = !this.radioChecked;
      }
    },
    //合计
    computeSum(arr) {
      let pap = 0;
      let rap = 0;
      let balance = 0;
      arr.forEach((v, i) => {
        pap += Number(this.filterComputeFixd(v.mainElecPap, 4));
        rap += Number(this.filterComputeFixd(v.mainElecRap, 4));
      });
      this.papVal = pap;
      this.rapVal = rap;
      this.equilibriumRate = this.filterComputeFixd((rap - pap) / rap * 100, 2);
    },
    //点保存，保存记录
    saveData() {
      this.$http
        .post(
          `/dataDiagnoseService/dataDiagnose/postDataChangedLogs?sign=` +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            dataChangeLogsJson: [
              {
                devId: "6100000001207000789",
                occurTimeStr: "2018-05-21 18:23:53",
                dataTimeStr: "2018-06",
                originPap: null,
                originRap: null,
                newPap: 0,
                newRap: 0,
                policy: 1,
                policyName: "手动修改",
                userId: "8000400001"
              }
            ]
          })
        )
        .then(res => {
          console.log(res);
        });
    },
    //更新电表底码状态，然后重计算
    updateStatus() {
      this.$http
        .get(
          `/dataDiagnoseService/dataDiagnose/updateStatus?sign=` +
            sessionStorage.getItem("accessToken"),
          {
            devId: "6100000001207000789",
            value: 0,//新的底码newPap
            pulseType: 1,
            date: "2018-06",
            type: "1"
          }
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$http
              .get(
                `/servicequery/query/updateStatus?sign=` +
                  sessionStorage.getItem("accessToken"),
                {
                  devId: "6100000001207000789",
                  value: 0,//新的底码newRap
                  pulseType: 2,
                  date: "2018-06",
                  type: 1
                }
              )
              .then(res => {
                if (res.data.code ===1) {
                  // alert('冲计算')
                  this.reCalculation()
                }
              });
          }
        });
    },
    //重计算
    reCalculation: function() {
      this.$http
        .post(
          "/analysisService/analy/reEnergys?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            stId: "6100000000001000179",
            devIds: "6100000001207000789",
            taskDetail: "1%E5%8F%B7%E4%B8%BB%E5%8F%98-%E4%B8%AD",
            date: "2018-06",
            type: 1
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
    //点撤销，刷新数据
    backout() {
      this.copyArrObj(this.allRenderTabData, this.copyRenderTabData);
    },
    //vlId==mrid 从上个页面传过来的
    getRenderTabData() {
      this.$http
        .get(
          `/dataDiagnoseService/dataDiagnose/getEnergyData?sign=${
            sessionStorage.accessToken
          }&vlId=${this.mrid}&date=${
            this.dateShow ? this.dayDate : this.monthDate
          }`
        )
        .then(res => {
          console.log(res);
          // this.allRenderTabData  = res.data.data.energyDataVOS ;
          this.allRenderTabData = res.data.data.energyDataVOS;
          this.computeSum(this.allRenderTabData);
          for (var i in this.allRenderTabData) {
            //复制一份渲染数据的数组
            this.copyRenderTabData[i] = {};
            for (var j in this.allRenderTabData[i]) {
              this.copyRenderTabData[i][j] = this.allRenderTabData[i][j];
            }
          }
        });
    }
  },
  created: function() {
    this.mrid = this.$route.query.vlId;
    this.plantkv = this.$route.query.devName;
    this.monthDate = this.$route.query.time;
    this.getRenderTabData();
    //获得 stbId 和 pathName
    this.$http
      .get(
        `/dataDiagnoseService/dataDiagnose/getSubstationByVlId?sign=${
          sessionStorage.accessToken
        }&vlId=${this.mrid}&date=${
          this.dateShow ? this.dayDate : this.monthDate
        }`
      )
      .then(res => {
        // this.plantsInfo  = res.data.data ;
        this.plantsInfo = res.data;
        this.sbtId = res.data.data.mrid; //传给下个页面的
      });
  },
  mounted: function() {
    this.$nextTick(() => {
      let tbodyScroll = new BScroll(".tbodyScroll", {
        scrollbar: { fade: false, interactive: true },
        mouseWheel: true,
        bounce: {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
      });
      var xScroll = new BScroll(`.xScroll`, {
        scrollbar: { fade: true, interactive: true },
        mouseWheel: false,
        scrollX: true,
        scrollY: false,
        bounce: {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
      });
      tbodyScroll.on("scrollStart", pos => {
        this.hideTips();
        document.querySelectorAll(".td_input").forEach(v => {
          v.blur();
        });
      });
    });
  }
};
</script>

<style>
.sumBalanceTab {
  margin-top: 10px;
}
.theadFixd {
  overflow: hidden;
  /* width: 2200px; */
}
.tbodyScroll {
  position: relative;
  min-height: 500px;
  height: 500px;
  /* width: 2200px; */
  overflow: hidden;
}
.theadFixd table td {
  box-sizing: border-box;
}
.xScroll {
  position: relative;
  overflow: hidden;
}
.overScroll {
  width: 2200px;
}
.tbodyScroll table td {
  box-sizing: border-box;
}
.tab_rendering {
  width: 98%;
  margin: 0 auto;
}
.td_input {
  width: 100%;
}
/* 时间 月/日 切换 */
li.liCls {
  background-color: #009f95 !important;
}
.ulCls > li {
  width: 70px;
  background-color: #0d7474;
  margin: 0 2px;
  cursor: pointer;
}
.ulCls > li {
  display: inline-block;
  list-style-type: none;
  float: left;
  text-align: center;
}
/* 母平计算 tips */
.xzts {
  position: fixed;
  width: 170px;
  padding: 5px 10px;
  border-radius: 5px;
  background: #0d7474;
  z-index: 50;
  box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.3), inset 0 0 0 1px #0a9c9c;
  text-align: left;
  line-height: 28px;
}
.xzts:before {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px;
  border-color: transparent #0d7474 transparent transparent;
  position: absolute;
  z-index: 52;
  top: 30px;
  left: -20px;
}
.xzts li {
  white-space: nowrap;
  overflow: hidden;
  font-size: 12px !important;
}
.xzts li i {
  padding: 0 2px 0 5px;
  color: #fff;
}
.xzts li i.red {
  color: #e72f2f;
}
/* 上下底码切换 */
.bgSelect {
  background: #022828 !important;
}
</style>
