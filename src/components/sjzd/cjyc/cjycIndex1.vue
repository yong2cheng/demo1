<template>
    <div class="wrap">
        <router-view/>
        <div class="mxian_succ">
            <h2 class="topTil">日冻结采集工况</h2>
            <!-- 顶部标题 工具栏 -->
            <div class="topTools">
                <div class="tools_s" >
                    <span>单位 : </span>
                    <!-- <select class="areaList" @change="changeAreaId" >
                        <option :key="index" v-for="(area,index) in areaIdArr" :value="area.mrId" :areaid="area.areaId" >{{area.areaName}}</option>
                    </select> -->
                    <select v-model="areaId" name="" id="">
                        <option :key="index" v-for="(item,index) in diquNames" :value="item.areaId">{{item.areaName}}</option>
                    </select>
                </div>
                <div class="tools_s">
                    <span>电压等级 : </span>
                    <select class="bvidList" @change="changeBvId" >
                        <option class="txt" :key="index" v-for="(bv,index) in bvIdArr" :value="bv.bvId" >{{bv.dydj}}kV</option>
                    </select>
                </div>
                <div class="tools_m">
                    
                    <input placeholder="厂站定位" type="text" class="txt">
                </div>
                <div class="unusual tools_s">
                    <input type="checkbox" name="yichang" id="yichang" @click="changeCheckedStatus(unusualDataArr,isChecked)" :checked="isChecked" >
                    <label for="yichang">异常</label>
                </div>
                <div class="dateCtrl tools_m">
                    <el-date-picker v-model="currentDate" type="month" placeholder="选择月" value-format="yyyy-MM" />
                </div>
                <div class="searchBtn">
                    <div class="btn" @click="searchData" >查询</div>
                </div>
            </div>

            <!-- 异常数据表格 -->
            <div class="unDataBox">
                <div class="unDataTab">
                    <table class="table">
                        <thead>
                            <tr>
                                <td width="7%" rowspan="2">厂站名称</td>
                                <td width="93%" :colspan="MaxDays" align="center"><span class="areaNameUpdate"></span> <span class="monthUpdate"></span>月日冻结缺数情况</td>
                            </tr>
                            <tr>
                                <td :key="i" v-for="(td,i) in MaxDays" >
                                    {{i+1}}日
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="index" v-for="(tr,index) in dataArr" >
                                <td v-if="tr[0]?true:false">{{tr[0].stName}}</td>
                                <td :key="i" v-for="(td,i) in tr" :areaid="td.areaId" :areaname="td.areaName" :bvid="td.bvId" :day="td.day" :stid="td.stId" :stname="td.stName" 
                                    @click="i>0 && td.missCount>0?unusualTkBox(td.day,td.stId,td.stName):''" >
                                        <span :class="td.missCount>0?'unusual_span':''" >
                                            {{td.missCount}}
                                        </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <overlay :close.sync="close"  class="tk_box" >
                <div class="cyxf_box tk_box">
                    <div class="boxTopTil">
                        <div class="inbl margin_r_l">采集异常修复操作</div>
                        <div class="inbl red_font margin_r_l">{{stName}}</div>
                        <div class="inbl red_font margin_r_l">{{tkTime}}</div>
                        <div class="inbl iconbtn">
                            <iconBtn  v-bind:icon="iconBtnList" />
                        </div>
                    </div>
                    <div class="tab_box">
                        <table class="table">
                            <thead>
                                <tr>
                                    <td>
                                        <input type="checkbox" name="all" id="all">
                                    </td>
                                    <td>序号</td>
                                    <td>异常计量点名称</td>
                                    <td>正向有功</td>
                                    <td>反向有功</td>
                                    <td>正向无功</td>
                                    <td>反向无功</td>
                                </tr>
                            </thead>
                        </table>
                        <table class="table">
                            <tbody>
                                <tr :key="i" v-for="(tr,i) in unTkBoxDataArr" :meterid="tr.meterId" :ratio="tr.ratio" >
                                    <td>
                                        <input type="checkbox" name="one" id="" class="pickOne">
                                    </td>
                                    <td>{{i+1}}</td>
                                    <td>{{tr.meterName}}</td>
                                    <td> 
                                        <input type="number" class="txt td_input" :readonly="forGeted ? false : 'readonly'" v-model="tr.mainTariffPap" @input="changeTips($event,i,tr.vlId,tr.meterId,tr.ratio,1)" @click="showTips($event,tr.vlId,tr.meterId,tr.ratio,1)" @blur="hideTips" />
                                    </td>
                                    <td>
                                        <input type="number" class="txt td_input" :readonly="forGeted ? false : 'readonly'" v-model="tr.mainTariffRap" @input="changeTips($event,i,tr.vlId,tr.meterId,tr.ratio,2)" @click="showTips($event,tr.vlId,tr.meterId,tr.ratio,2)" @blur="hideTips" >
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </overlay>
        </div>
        <!-- 母平计算 -->
        <div class="xzts" v-show="mpjsShow" :style="`left:${tipsLeft}px;top:${tipsTop}px;`" >
            <ul class="dataAdd" v-show="Participate">
                <li>母平：{{newMpFormulaNum ? newMpFormulaNum : oriMpFormulaNum}}%<i class="icon-up red"></i>{{newMpFormulaNum ? mpDiffVal : 0}}%</li>
                <li>线损：0%<i class="icon-down red"></i>0%</li>
            </ul>
            <!-- 不参与母平计算 -->
             <ul class="dataAdd" v-show="!Participate">
                <li>该计量点未参与母线配置</li>
                <li>修改底码不会参与计算</li>
            </ul>
        </div>
    </div>
</template>

<script>
import dateCtrl from "../common/dateCtrl";
import iconBtn from "../common/IconBtn";
import areaMap from "../../../assets/config/areaMap.js";
import bvidMap from "../../../assets/config/bvidMap.js";
import overlay from "@/components/common/overlay";

import $areaId from "../../../assets/config/areaMap";
export default {
  data: function() {
    return {
      iconBtnList: [
        {
          iconName: "召测",
          iconFont: ""
        },
        {
          iconName: "预估",
          iconFont: ""
        },
        {
          iconName: "保存",
          iconFont: ""
        }
      ],
      token: "",
      areaIdArr: areaMap,
      bvIdArr: bvidMap,
      unusualDataArr: [], //原始 处理前的异常数据数组
      dataArr: [], //处理后的异常数据数组
      MaxDays: 31, //数据中月份最大的天数，用于显示thead
      unTkBoxDataArr: [], //异常弹框数据
      newunTkBoxDataArr: [], //copy 新的 异常弹框数据
      isChecked: true, //异常复选框 是否选中
      areaId: "",
      bvId: "",
      currentDate: this.$day().format("YYYY-MM"),
      close: false, //异常弹框是否显示
      stName: "", //弹框中显示的厂站名称
      tkTime: "", //弹框中显示的厂站数据日期
      vlIdArr: [], //vlId的集合
      newvlIdArr: [], //vlId的集合copy
      formulaArr: [], //formula 计算公式的集合
      newFormulaArr: [], //formula 计算公式的集合copy
      Participate: true, //是否参与母平计算

      mpjsShow: false, //母平计算 tips
      tipsLeft: 0, //提示框的 left 值
      tipsTop: 0, //提示框的 right 值
      mpId: "", //母平 ID
      fxId: "", //分线 ID
      mpFormula: "", //母平公式
      fxFormula: "", //分线公式
      radioChecked: true, //上下底码切换
      sbtid: "", //传给下个页面的
      mrid: "", //接收到的mrid
      thisDevId: "", //此次参与计算的 devid
      forGeted: 0, //判断母平公式是否已经获取到
      oriMpFormulaArr: [], //原始的母平公式数据数组
      newMpFormulaArr: [], //新的的母平公式数据数组
      oriMpFormulaNum: 0, //原始的母平公式数据计算结果
      newMpFormulaNum: 0, //新的的母平公式数据计算结果
      oriFxFormulaArr: [], //原始的分线公式数据数组
      newFxFormulaArr: [], //新的的分线公式数据数组
      mpDiffArr: [], //母平值是否已存在
      mpDiffVal: 0, //母平 新值-旧值
      diquNames: [],
      areaId: -1
    };
  },
  components: {
    dateCtrl,
    overlay,
    iconBtn
  },
  methods: {
    timestampToTime: function(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      return Y + M;
    },
    changeCheckedStatus() {
      //改变复选框的选中状态
      this.isChecked = document.getElementById("yichang").checked;
      this.loadAbnormalDatas(this.unusualDataArr, this.isChecked);
    },
    loadAbnormalDatas(getDatas, checked = true) {
      //加载异常数据 / 或所有数据
      var html = ""; //要拼接的表格数据
      var thead = ""; //要拼接的月份多少天
      var MaxDays = 0; //获得天数最多的数字，显示在thead中
      var MaxArr = 0; //天数最多的那个数组 的索引
      var plantName = []; //保存所得到的地区的厂站名称
      var dataArr = []; //将得到的地区每月的数据 处理成想要的数据格式
      if (checked) {
        //显示缺数的
        for (var v of getDatas) {
          //得到地区多有厂站名称 集合
          if (plantName.indexOf(v.stName) == -1) {
            plantName.push(v.stName);
          }
        }

        for (var i = 0, len = plantName.length; i < len; i++) {
          //通过厂站名称集合，对数据进行分类
          var currentNum = 0; //并计数月份最多的天数
          var missNum = 0; //每组数据中不存在缺数的数量
          dataArr[i] = []; //定义每组厂站的数据 并组成数组dataArr 便于后续遍历
          for (var v of getDatas) {
            //将所有数据按 plantName 中的厂站名称进行数据分类
            if (plantName[i] == v.stName) {
              dataArr[i].push(v);
              currentNum++;
            }
          }
          for (var j = 0; j < currentNum; j++) {
            //统计当前数组中不存在缺数数据的个数
            if (dataArr[i][j].missCount == 0) {
              missNum++;
            }
          }
          if (currentNum == missNum) {
            //判断 不存在缺数个数 和 总数是否相同
            dataArr[i] = []; //如果相同、则不显示 不缺数数据
          } else {
            //获得最多月份有多少天有多少天
            if (currentNum > MaxDays) {
              MaxDays = currentNum;
              MaxArr = i;
            }
          }
        }
        console.log(dataArr);
        // console.log("最多的天数 ： "MaxDays);
        this.dataArr = dataArr;
        this.MaxDays = MaxDays;
      } else {
        for (var v of getDatas) {
          //得到地区多有厂站名称 集合
          if (plantName.indexOf(v.stName) == -1) {
            plantName.push(v.stName);
          }
        }

        for (var i = 0, len = plantName.length; i < len; i++) {
          //通过厂站名称集合，对数据进行分类
          var currentNum = 0;
          dataArr[i] = [];
          for (var v of getDatas) {
            if (plantName[i] == v.stName) {
              dataArr[i].push(v);
              currentNum++;
            }
          }
          // currentNum > MaxDays ? MaxDays = currentNum : MaxDays
          if (currentNum == missNum) {
            //判断 不存在缺数个数 和 总数是否相同
            dataArr[i] = []; //如果相同、则不显示 不缺数数据
          } else {
            //获得最多月份有多少天有多少天
            if (currentNum > MaxDays) {
              MaxDays = currentNum;
              MaxArr = i;
            }
          }
        }
        console.log(dataArr);
        // console.log("最多的天数 ： "MaxDays);
        this.dataArr = dataArr;
        this.MaxDays = MaxDays;
      }
    },
    searchData() {
      //点击搜索按钮查询数据
      this.isChecked = document.getElementById("yichang").checked; //得到当前选中状态
      //this.$http.get(`http://10.172.246.233:88/servicequery/query/getDayTariffExceptSummary?appkey=3917230828&sign=SBtODVn0_swo5HuRFiEr5KOLTk5gZm67uAdvU_KuiQXlu_sfeE4MJcgkk27vvdK84lizeiA4T14x49pBLpm_HQ--___1525659240016___8000400001___8000400001___8000400001___2___&month=2018-03&areaId=6101000&bvId=9`)
      this.$http
        .get(
          "/dataDiagnoseService/dataDiagnose/getDayTariffExceptSummary?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&month=" +
            this.currentDate +
            "&areaId=" +
            this.areaId +
            "&bvId=9"
        )
        .then(res => {
          console.log(res);
          this.unusualDataArr = res.data.dayTariffSummaries;
          this.loadAbnormalDatas(this.unusualDataArr, this.isChecked);
        });
    },
    unusualTkBox(day, stId, stName) {
      //异常数据操作弹框
      this.tkTime = day;
      this.stName = stName;
      console.log(day, stId);
      this.close = true;
      this.$http
        .get(
          `http://10.172.246.233:88/servicequery/query/getDayTariffExceptView?appkey=3917230828&sign=SBtODVn0_swo5HuRFiEr5KOLTk5gZm67uAdvU_KuiQXlu_sfeE4MJcgkk27vvdK84lizeiA4T14x49pBLpm_HQ--___1525659240016___8000400001___8000400001___8000400001___2___&day=2018-03-09&type=2&stId=6101000010901000446`
        )
        // this.$http.get(`/dataDiagnoseService/dataDiagnose/getDayTariffExceptView?appkey=3917230828&sign=${this.token}&day=${day}&type=2&stId=${stId}`)
        .then(res => {
          this.unTkBoxDataArr = res.data.dayTariffViews;
          this.unTkBoxDataArr.forEach((v, i) => {
            if (this.vlIdArr.indexOf(v.vlId) == -1) {
              this.vlIdArr.push(v.vlId);
              this.formulaArr.push(v.formula);
            }
          });
          this.newFormulaArr = Object.assign([], this.formulaArr); //拷贝一份数组,便于后面
        });
    },
    changeAreaId() {
      //得到areaId
      this.areaId = document.querySelector(".areaList").value;
      console.log(this.areaId);
    },
    changeBvId() {
      //得到bvId
      this.bvId = document.querySelector(".bvidList").value;
      console.log(this.bvId);
    },
    showTips(e, vlId, meterid, ratio, type) {
      //显示母平弹框
      this.mpjsShow = true;
      this.tipsLeft = e.currentTarget.getBoundingClientRect().right + 12;
      this.tipsTop = e.currentTarget.getBoundingClientRect().top - 26;
      this.computeBalance(e.currentTarget, vlId, meterid, ratio, type);
    },
    hideTips() {
      //隐藏母平弹框
      this.mpjsShow = false;
    },
    filterComputeFixd(num, fixed) {
      //过滤数字类型
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
    mpFormulaSum() {//母平的计算 计算出新母平或旧母平
      let formula = this.mpFormula;
      this.newMpFormulaArr.forEach((v, i) => {
        let reg = new RegExp(eval("/@" + String(v.numero) + "/g"));
        if (formula.indexOf(String(v.numero)) >= 0) {
          formula = formula.replace(reg, String(v.value || 0));
        }
      });
      return this.filterComputeFixd(eval(formula) * 100, 2);
    },
    changeTips(e, i, vlId, meterid, ratio, type) {
      //修改电量input中的值,同时改变tips
      // devId : 匹配到电量两个值 , type : 区分P+/P-
      //匹配更改后的值 替换arr中的
      if (vlId != "") {
        //如果该项 有vlid 则可以参与计算
        let vlIdIdx = this.vlIdArr.indexOf(vlId);
        this.formulaArr[vlIdIdx].configDatas.forEach((v, ix) => {
          if (meterid == v.devId && type == v.pulseType) {
            console.log(
              this.newFormulaArr[vlIdIdx].configDatas[ix].value,
              this.newunTkBoxDataArr[i]["mainTariffPap"],
              this.unTkBoxDataArr[i]["mainTariffPap"],
              this.unTkBoxDataArr[i]["ratio"]
            );
            v.value = this.brakingEleAdd(
              Number(this.newFormulaArr[vlIdIdx].configDatas[ix].value),
              this.newunTkBoxDataArr[i]["mainTariffPap"],
              Number(this.unTkBoxDataArr[i]["mainTariffPap"]),
              this.unTkBoxDataArr[i]["ratio"]
            );
          }
        });
        this.mpFormula = this.formulaArr[vlIdIdx].formula;
        this.newMpFormulaArr = this.formulaArr[vlIdIdx].configDatas;
        console.log(this.newFormulaArr);
        this.newMpFormulaNum = this.mpFormulaSum(); //计算出新 母平值
        console.log(
          "旧值 : " + this.oriMpFormulaNum,
          "新值 : " + this.newMpFormulaNum
        );
      }
      this.mpDiffVal = this.newMpFormulaNum - this.oriMpFormulaNum;
    },
    brakingEleAdd(oldEle, oldEnd, newEnd, ratio) {
      //上底码 推算 电量
      //oldEle=旧电量  oldEnd=旧底码  newEnd=新底码  ratio=倍率
      if (
        ratio == 0 ||
        ratio == -0 ||
        ratio == "" ||
        ratio == undefined ||
        isNaN(ratio)
      ) {
        return 0;
      } else {
        return this.filterComputeFixd(
          Number(oldEle) + (Number(oldEnd) - Number(newEnd)) * Number(ratio),
          2
        );
      }
    },
    async computeBalance(e, vlId, meterid, ratio, type) {
      if (vlId != "") {
        //如果该项 有vlid 则可以参与计算
        this.Participate = true;
        let vlIdIdx = this.vlIdArr.indexOf(vlId);
        if (!this.mpDiffArr[vlIdIdx]) {
          this.mpDiffArr[vlIdIdx] = true;
          console.log(this.formulaArr);
          this.mpFormula = this.formulaArr[vlIdIdx].formula;
          this.newMpFormulaArr = this.formulaArr[vlIdIdx].configDatas;
          this.oriMpFormulaNum = this.mpFormulaSum(); //计算出旧的母平值
          console.log(this.oriMpFormulaNum);
        }
      } else {
        this.Participate = false;
      }
      this.forGeted = true;

      //获得新的母线数据数组
      function copyNewGeneratrixData(oriArr, newArr) {
        for (var i in oriArr) {
          newArr[i] = {};
          for (var j in oriArr[i]) {
            newArr[i][j] = oriArr[i][j];
          }
        }
      }
      copyNewGeneratrixData(this.unTkBoxDataArr, this.newunTkBoxDataArr); //copy一个新的数组，不改变原来的数组
    }
  },
  created: function() {
    this.token = sessionStorage.getItem("accessToken");
  },
  mounted() {
    if (
      sessionStorage.getItem("systemId") === null ||
      sessionStorage.getItem("systemId") == "undefined"
    ) {
      this.diquNames = this.diquNames.concat($areaId);
      this.areaId = 15;
    } else {
      for (var a of $areaId) {
        if (a.areaId == sessionStorage.getItem("systemId")) {
          this.diquNames = [a];
          this.areaId = a.areaId;
        }
      }
    }
  }
};
</script>


<style>
@import "../../../assets/style/iconfont.css";
.topTil {
  width: 100%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: normal;
}
.red_font {
  color: #f6726c;
}
.margin_r_s {
  margin-right: 10px;
}
.margin_r_m {
  margin-right: 20px;
}
.margin_r_l {
  margin-right: 30px;
}
.topTools {
  width: 97%;
  height: 30px;
  padding: 10px 1%;
  margin: 0 0.5%;
  background: #035252;
  position: relative;
  box-shadow: inset 0 0 0 1px #0d7474;
  color: #84f1f1;
  font-size: 15px;
}
.areaList,
.bvidList {
  background-color: #012323;
  color: inherit;
  width: auto;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #0d7474;
  color: #84f1f1;
  margin-right: 20px;
  padding-right: 20px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: #022626 url(../../../assets/img/icon_select.gif) no-repeat right
    center;
}
.unusual {
  margin-left: 20px;
  display: inline-block;
}
.unusual_span {
  background: #ff4144;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  padding: 0 5px;
  border-radius: 5px;
  position: relative;
}
.dateCtrl {
  display: inline-block;
  /* margin-left: 400px; */
}
.searchBtn {
  position: absolute;
  right: 30px;
  display: inline-block;
}
.searchBtn > .btn {
  height: 25px;
  vertical-align: middle;
  line-height: 25px;
}
.unDataBox {
  min-height: 400px;
  width: 98%;
  margin: 10px;
}
.unDataTab {
  height: 100%;
  width: 100%;
}
.boxTopTil {
  min-height: 40px;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #0d7474;
  margin: 10px 0;
}
.cyxf_box {
  width: 1300px;
  min-height: 400px;
}
.iconbtn {
  position: absolute;
  right: 20px;
}
/* 母平计算 tips */
.xzts {
  position: fixed;
  width: 170px;
  padding: 5px 10px;
  border-radius: 5px;
  background: #0d7474;
  z-index: 100;
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
</style>
