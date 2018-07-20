<template>
    <div class="wrap">
      <!-- 我的代码 -->
        <router-view/>
        <div class="mxian_succ after main_position">
            <!-- 遮罩 -->
            <div class="tkzz"  v-show="treeShow"></div>
            <!-- 顶部工具组 -->
            <div class="topBar">
                <iconBtn v-bind:icon="iconBtnList" />
                <span  class="stName">地区:</span><span class="stName">{{areaObj.name?areaObj.name:'-'}}</span>
                <span  class="stName">厂站:</span><span class="stName">{{stObj.name?stObj.name:'-'}}</span>
                <div class="date_selec right">
                  <div class="inbl" >
                    <ul class="ulCls">
                       <li :class="{liCls:dateShow}" @click="dateTab(1)" >月数据</li>
                       <li :class="{liCls:!dateShow}" @click="dateTab(0)" >日数据</li>                     
                    </ul>
                    <ul>
                        <li v-show="!dateShow">
                            <el-date-picker
                                v-model="dayDate"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd" 
                            />
                        </li>
                        <li v-show="dateShow">
                            <el-date-picker v-model="monthDate" type="month" placeholder="选择月" value-format="yyyy-MM" />
                        </li>
                    </ul>
                </div>
                <button class="btn" @click="httpGetData">查询</button>
              </div> 
            </div>
             <!-- <router-link class="color_warning" :to="{path: '/sjbj', 
             query:{sysId:$route.query.sysId,sonid:$route.query.sonid,date:dateShow?dayDate:monthDate}}" 
             target="_blank">
                数据分析
              </router-link> -->
            <!-- 侧边 厂站树 -->
            <div class="btn_left_side" :class="treeShow?'btn_side_l':'btn_side_r'" @click="sideTree"></div>
            <div class="side_nav" v-show="treeShow">
                <div class="tree_box" >
                    <tree :data='firstData' @sendTreeInfo="getMenu" lastAttr="sbtId"></tree>
                </div>
            </div>
            <!-- 表格渲染 -->
            <div class="tab_rendering"> <!-- 静态初始表格模板 -->
                <div v-if="!tabData">
                    <table class="table">
                        <thead style="text-align:center">
                            <tr>
                                <td rowspan="2" width="8%">设备名称</td>
                                <td rowspan="2" width="4%">倍率</td>
                                <td colspan="2" width="10%">主表数据(电量)</td>
                                <td colspan="2" width="10%">上底码</td>
                                <td colspan="2" width="10%">下底码</td>
                                <td colspan="2" width="10%">预估结果（电量）</td>
                                <td colspan="2" width="10%">预估结果（零点）</td>
                                <td colspan="2" width="10%">偏差系数</td>
                                <td colspan="2" width="10%">功率积分（标杆）</td>
                                <td colspan="2" width="10%">副表数据</td>
                                <td colspan="2" width="10%">对端数据</td>
                                <td rowspan="2" width="8%">最后处理时间</td>
                            </tr>
                            <tr>
                                <td width="5%">P+</td>
                                <td width="5%">P-</td>
                                <td width="5%">P+</td>
                                <td width="5%">P-</td>
                                <td width="5%">P+</td>
                                <td width="5%">P-</td>
                                <td width="5%">P+</td>
                                <td width="5%">P-</td>
                                <td width="5%">P+</td>
                                <td width="5%">P-</td>
                                <td width="5%">P+</td>
                                <td width="5%">P-</td>
                                <td width="5%">P+</td>
                                <td width="5%">P-</td>
                                <td width="5%">P+</td>
                                <td width="5%">P-</td>
                                <td width="5%">P+</td>
                                <td width="5%">P-</td>
                            </tr>
                        </thead>
                        <tbody>
                            <h5>无相关数据!</h5>
                        </tbody>
                    </table>
                </div>
                <!-- 动态数据表格 -->
                <div v-show="tabData">
                    <div class="sjxfbox" v-for="(kvName,i) of kvArrData" :key="i" >
                        <h2 class="allbtn" @click="slideTil(i)" >
                            <div class="zd_anniu">{{kvName}}</div>
                            <ul class="buttlist zdgdup">
                                <li>导出</li>
                                <li>历史</li>
                            </ul>
                        </h2>
                        <div :class="'xScroll'+i">
                            <div class="overScroll" v-show="isShowTab == i" >
                                <div >
                                    <!-- 表格渲染 -->
                                    <table class="table" width="100%" border="0" cellspacing="0" cellpadding="0" >
                                        <thead style="text-align:center">
                                            <tr>
                                                <td rowspan="2" width="180px">设备名称</td>
                                                <td rowspan="2" width="100px">倍率</td>
                                                <td colspan="2" width="240px">主表数据(电量)</td>
                                                <td colspan="2" width="240px">                                               
                                                <span>上底码</span></td>
                                                <td colspan="2" width="240px">                                               
                                                <span>下底码</span></td>
                                                <td colspan="2" width="240px">预估结果(电量)</td>
                                                <td colspan="2" width="240px">预估初底码</td>
                                                <td colspan="2" width="240px">偏差系数</td>
                                                <td colspan="2" width="240px" :class="{'bgSelect' : radioChecked==1 }" @click="radioStatus(1)" >
                                                    <input type="radio" :name="'change'+i" data-select="1" class="selected" value="1" v-model="radioChecked">
                                                    功率积分
                                                </td>
                                                <td colspan="2" width="240px" :class="{'bgSelect' : radioChecked==2 }" @click="radioStatus(2)" >
                                                    <input type="radio" :name="'change'+i" data-select="2" class="selected" value="2" v-model="radioChecked">
                                                    副表数据
                                                </td>
                                                <td colspan="2" width="240px" :class="{'bgSelect' : radioChecked==3 }" @click="radioStatus(3)" >
                                                    <input type="radio" :name="'change'+i" data-select="3" class="selected" value="3" v-model="radioChecked">
                                                    对端数据
                                                </td>
                                                <td rowspan="2" width="120px">最后处理时间</td>
                                            </tr>
                                            <tr>
                                                <td width="120px">P+</td>
                                                <td width="120px">P-</td>
                                                <td width="120px">P+</td>
                                                <td width="120px">P-</td>
                                                <td width="120px">P+</td>
                                                <td width="120px">P-</td>
                                                <td width="120px">P+</td>
                                                <td width="120px">P-</td>
                                                <td width="120px">P+</td>
                                                <td width="120px">P-</td>
                                                <td width="120px">P+</td>
                                                <td width="120px">P-</td>
                                                <td width="120px">P+</td>
                                                <td width="120px">P-</td>
                                                <td width="120px">P+</td>
                                                <td width="120px">P-</td>
                                                <td width="120px">P+</td>
                                                <td width="120px">P-</td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div :class="'tablebox'+i" class="height210" v-show="isShowTab == i" >
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table tableDatas" id="sjxfKNO_tab">
                                        <tbody v-show="tabData">
                                            <tr v-for="(tabArr,ix) of tabArrData[i]" :key="ix" :class="kvName" :devid="tabArr.devId" >
                                                <td width="180px">
                                                    <router-link :class="color_warning" :to="{path: '/sjbj', 
                                                    query:{sysId:$route.query.sysId,sonid:$route.query.sonid,date:dateShow?monthDate:dayDate,stbId:stObj.id,devId:tabArr.devId,devName:tabArr.devName}}" 
                                                    target="_blank" class="quxianbutt" >
                                                        {{tabArr.devName}}
                                                    </router-link>
                                                </td>
                                                <td width="100px"><span class="bltkbutt">{{tabArr.ratio}}</span></td>
                                                <td width="120px">
                                                    <p style="padding:2px;min-height: 20px;" data-formula="1" data-edit="1" class="" data-error="">{{filterComputeFixd(tabArr.mainElecPap,4)}}</p>
                                                </td>
                                                <td width="120px">
                                                    <p style="padding:2px;min-height: 20px;" data-formula="2" data-edit="1" class="" data-error="">{{filterComputeFixd(tabArr.mainElecRap,4)}}</p>
                                                </td>
                                                <td width="120px"><p class="sxdima" data-self="" data-error="">{{filterComputeFixd(tabArr.mainTariffPap , 4)}}</p></td>
                                                <td width="120px"><p class="sxdima" data-self="" data-error="">{{filterComputeFixd(tabArr.mainTariffRap , 4)}}</p></td>
                                                <td width="120px"><p class="sxdima" data-self="" data-error="">{{filterComputeFixd(tabArr.estimateElecPap , 4)}}</p></td>
                                                <td width="120px"><p class="sxdima" data-self="" data-error="">{{filterComputeFixd(tabArr.estimateElecRap , 4)}}</p></td>
                                                <td width="120px"><p class="tableAdd " data-error="">{{tabArr.estimateTariffPap}}</p></td>
                                                <td width="120px"><p class="tableMinus " data-error="">{{tabArr.estimateTariffRap}}</p></td>
                                                <td width="120px"><p class="" data-error="">{{tabArr.deviationRatePap}}</p></td>
                                                <td width="120px"><p class="" data-error="">{{tabArr.deviationRateRap}}</p></td>
                                                
                                                <td width="120px"><p class=" biasAdd" data-error="">{{ZfactorPap[ix]}}</p></td>
                                                <td width="120px"><p class=" biasMinus" data-error="">{{ZfactorRap[ix]}}</p></td>
                                                <td width="120px"><p class=" powerAdd" data-error="">{{tabArr.powerIntegrationPapStatus}}</p></td>
                                                <td width="120px"><p class=" powerMinus" data-error="">{{tabArr.powerIntegrationRapStatus}}</p></td>
                                                <td width="120px"><p class=" SubtableAdd" data-error="">{{tabArr.secondElecPapStatus}}</p></td>
                                                <td width="120px"><p class=" SubtableMinus" data-error="">{{tabArr.secondElecRapStatus}}</p></td>
                                                <td width="120px"><p class=" oppositeAdd" data-error="">{{tabArr.endtoEndDataPapStatus}}</p></td>
                                                <td width="120px"><p class=" oppositedMinus" data-error="">{{tabArr.endtoEndDataRapStatus}}</p></td>
                                                <td width="120px">{{tabArr.lastRefreshTime}}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td width="180px">合计</td>
                                                <td width="100px"></td>
                                                <td width="120px">{{filterComputeFixd(mainElecPapSum[i] , 4 , 0)}}</td>
                                                <td width="120px">{{filterComputeFixd(mainElecRapSum[i] , 4 , 0)}}</td>
                                                <td width="120px"></td>
                                                <td width="120px"></td>
                                                <td width="120px"></td>
                                                <td width="120px"></td>
                                                <td width="120px">{{filterComputeFixd(forElecPapSum[i] , 4 , 0)}}</td>
                                                <td width="120px">{{filterComputeFixd(forElecRapSum[i] , 4 , 0)}}</td>
                                                <td width="120px"></td>
                                                <td width="120px"></td>
                                                <td width="120px"></td>
                                                <td width="120px"></td>
                                                <td width="120px"></td>
                                                <td width="120px"></td>
                                                <td width="120px">{{filterComputeFixd(subElecPapSum[i] , 4 , 0)}}</td>
                                                <td width="120px">{{filterComputeFixd(subElecRapSum[i] , 4 , 0)}}</td>
                                                <td width="120px">{{filterComputeFixd(endElecPapSum[i] , 4 , 0)}}</td>
                                                <td width="120px">{{filterComputeFixd(endElecRapSum[i] , 4 , 0)}}</td>
                                                <td width="120px"></td>
                                            </tr>
                                            <tr>
                                                <td>不平衡</td>
                                                <td width="100px"></td>
                                                <td width="240px" colspan="2">{{mainElecRapSum[i] - mainElecPapSum[i]}}</td>
                                                <td width="240px" colspan="2"></td>
                                                <td width="240px" colspan="2"></td>
                                                <td width="240px" colspan="2">{{forElecRapSum[i] - forElecPapSum[i]}}</td>
                                                <td width="240px" colspan="2"></td>
                                                <td width="240px" colspan="2"></td>
                                                <td width="240px" colspan="2"></td>
                                                <td width="240px" colspan="2">{{subElecRapSum[i] - subElecPapSum[i]}}</td>
                                                <td width="240px" colspan="2">{{endElecRapSum[i] - endElecPapSum[i]}}</td>
                                                <td width="120px"></td>
                                            </tr>
                                            <tr>
                                                <td>不平衡率</td>
                                                <td width="100px"></td>
                                                <td width="240px" colspan="2">{{unbalanceRate(mainElecRapSum[i] , mainElecPapSum[i])}}</td>
                                                <td width="240px" colspan="2"></td>
                                                <td width="240px" colspan="2"></td>
                                                <td width="240px" colspan="2">{{unbalanceRate(forElecRapSum[i] , forElecPapSum[i])}}</td>
                                                <td width="240px" colspan="2"></td>
                                                <td width="240px" colspan="2"></td>
                                                <td width="240px" colspan="2">{{unbalanceRate(subElecRapSum[i] , subElecPapSum[i])}}</td>
                                                <td width="240px" colspan="2">{{unbalanceRate(endElecRapSum[i] , endElecPapSum[i])}}</td>
                                                <td width="240px" colspan="2"></td>
                                                <td width="120px"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <loading :isLoading='loading'></loading>
    </div>
</template>
<script>
import iconBtn from "../common/IconBtn";
import tree from "@/components/common/tree.vue";
import treeMinx from "@/components/mixins/tree";
import BScroll from "better-scroll";
import loading from "@/components/common/loading";
export default {
  data: function() {
    return {
      loading:false,
      ish: false,
      radioChecked: 1,
      iconBtnList: [
        {
          iconName: "智能研判",
          iconFont: "icon-yanpan"
        },
        {
          iconName: "算法特征",
          iconFont: "icon-suanfatezheng"
        },
        {
          iconName: "数据校验",
          iconFont: "icon-shuju"
        },
        {
          iconName: "自动修复",
          iconFont: "icon-zidongxiufu"
        },
        {
          iconName: "评估报告",
          iconFont: "icon-pinggubaogao"
        }
      ],
      stObj:{},
      dayDate: this.$day().format("YYYY-MM-DD"),
      monthDate: this.$route.query.date?this.$route.query.date:this.$day().format("YYYY-MM"),
      dateShow: true,
      treeShow: false,
      tabData: false,
      ZfactorPap: [], //偏差系数 P+
      ZfactorRap: [], //偏差系数 P-
      mainElecPapSum: [], //主表电量 p+ 合计
      mainElecRapSum: [], //主表电量 p- 合计
      forElecPapSum: [], //预估电量 p+ 合计
      forElecRapSum: [], //预估电量 p- 合计
      subElecPapSum: [], //副表电量 p+ 合计
      subElecRapSum: [], //副表电量 p- 合计
      endElecPapSum: [], //对端数据 p+ 合计
      endElecRapSum: [], //对端数据 p- 合计
      allRenderTabData: [], //所有渲染表格的数据
      kvArrData: [], //分类的千伏数数组
      tabArrData: [], //渲染tbody的数据
      isShowTab: 0, //默认显示第一个tab数据
      scrollFlag: [], //滚动条是否重加载
      sbtId: this.$route.query.stbId||'', //厂站ID
      vlId: "", //母线ID
      color_warning:'color_warning'
    };
  },
  components: {
    iconBtn,
    tree,
    loading
  },
  mixins: [treeMinx],
  created(){
    this.$route.query.sbtName?this.stObj.name=this.$route.query.sbtName:this.stObj={};
    this.$route.query.stbId?this.stObj.id=this.$route.query.stbId:this.stObj={};
    this.$route.query.areaName?this.areaObj.name=this.$route.query.areaName:this.areaObj={};
  },
  methods: {
    filterComputeFixd(num, fixed, type) {//过滤数字类型
      // fixed => 保留的小数位(需求不同)  type => 过滤数据保留 0/空(需求不同),默认为空
      if (num == "") {
        if (type == 0) {
          return 0;
        } else {
          return "";
        }
      } else if (num == null) {
        if (type == 0) {
          return 0;
        } else {
          return "";
        }
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
    dateTab(req) {//时间控件切换
      if (!req) {
        //切换到 日
        this.dateShow = false;
      } else {
        //切换到 月
        this.dateShow = true;
      }
    },
    radioStatus(idx) { //选择 '功率积分'、'副表数据'、'对端数据'  时 重计算'偏差系数'的值
      //计算偏差系数方法
      function countFactor(num1, num2) {
        if (num1 == 0 || num2 == 0) {
          return 0 + "%";
        } else if (num1 == undefined || num2 == undefined) {
          return 0 + "%";
        } else if (isNaN(num1) || isNaN(num2)) {
          return 0 + "%";
        } else if (!num1 || !num2) {
          return 0 + "%";
        } else if (num1 == "" || num2 == "") {
          return 0 + "%";
        } else if (num1 == null || num2 == null) {
          return 0 + "%";
        } else {
          return (((num1 - num2) / num1).toFixed(4) * 100).toFixed(2) + "%";
        }
      }
      this.radioChecked = idx;
      if (this.radioChecked == 1) {
        this.tabArrData.forEach((v, i) => {
          v.forEach((vl, ix) => {
            this.ZfactorPap.push(
              countFactor(vl.estimateTariffPap, vl.powerIntegrationPapStatus)
            );
            this.ZfactorRap.push(
              countFactor(vl.estimateTariffRap, vl.powerIntegrationRapStatus)
            );
          });
        });
      } else if (this.radioChecked == 2) {
        this.tabArrData.forEach((v, i) => {
          v.forEach((vl, ix) => {
            this.ZfactorPap.push(
              countFactor(vl.estimateTariffPap, vl.secondElecPapStatus)
            );
            this.ZfactorRap.push(
              countFactor(vl.estimateTariffRap, vl.secondElecRapStatus)
            );
          });
        });
      } else if (this.radioChecked == 3) {
        this.tabArrData.forEach((v, i) => {
          v.forEach((vl, ix) => {
            this.ZfactorPap.push(
              countFactor(vl.estimateTariffPap, vl.endtoEndDataPapStatus)
            );
            this.ZfactorRap.push(
              countFactor(vl.estimateTariffRap, vl.endtoEndDataRapStatus)
            );
          });
        });
      }
    },
    countSum() {//计算 '合计' '不平衡' '不平衡率'
      this.tabArrData.forEach((v, i) => {
        this.mainElecPapSum[i] = 0;
        this.mainElecRapSum[i] = 0;
        this.forElecPapSum[i] = 0;
        this.forElecRapSum[i] = 0;
        this.subElecPapSum[i] = 0;
        this.subElecRapSum[i] = 0;
        this.endElecPapSum[i] = 0;
        this.endElecRapSum[i] = 0;
        v.forEach((vl, ix) => {
          this.mainElecPapSum[i] += Number(vl.mainElecPap);
          this.mainElecRapSum[i] += Number(vl.mainElecRap);
          this.forElecPapSum[i] += Number(vl.estimateTariffPap);
          this.forElecRapSum[i] += Number(vl.estimateTariffRap);
          this.subElecPapSum[i] += Number(vl.secondElecPapStatus);
          this.subElecRapSum[i] += Number(vl.secondElecRapStatus);
          this.endElecPapSum[i] += Number(vl.endtoEndDataPapStatus);
          this.endElecRapSum[i] += Number(vl.endtoEndDataRapStatus);
        });
      });
    },
    unbalanceRate(rap, pap) {//  '不平衡率' 计算
      if (pap == 0 || rap == 0) {
        //当pap 或 rap 任一数为0时
        return 0;
      } else if (isNaN((pap - rap) / pap)) {
        //判断是否为 NaN
        return 0;
      } else {
        return ((rap - pap) / rap * 100).toFixed(2) + "%";
      }
    },
    renderingTabData() {//处理数据
      this.allRenderTabData.forEach((v, i) => {
        if (this.kvArrData.indexOf(v.vlName) == -1) {
          this.kvArrData.push(v.vlName);
        }
      });
      console.log(this.kvArrData);
      this.kvArrData.forEach((v, i) => {
        this.tabArrData[i] = [];
        this.allRenderTabData.forEach((vl, ix) => {
          if (v == vl.vlName) {
            this.tabArrData[i].push(vl);
          }
        });
      });
      console.log(this.tabArrData);
    },
    sideTree() {//切换树
      this.treeShow = !this.treeShow;
    },
    slideTil(res) {//判断点击显示哪个kv的表
      this.isShowTab = res;
      if (this.scrollFlag.indexOf(res) == -1) {
        this.scrollFlag.push(res);
        var scrollbox = new BScroll(`.tablebox${res}`, {
          scrollbar: { fade: false, interactive: true },
          mouseWheel: true,
          bounce: {
            top: false,
            bottom: false,
            left: false,
            right: false
          }
        });
        var xScroll = new BScroll(`.xScroll${res}`, {
          scrollbar: { fade: false, interactive: true },
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
      }
    },
    httpGetData() {//列表数据
      if (this.sbtId) {  
        this.loading = true;
        this.$http
          .get(
            `/dataDiagnoseService/dataDiagnose/getEnergyData?sign=${
              sessionStorage.accessToken
            }&sbtId=${this.sbtId}&vlId=${this.vlId}&date=${
              this.dateShow ? this.monthDate : this.dayDate
            }`
          )
          .then(res => {
            this.loading = false;
            this.allRenderTabData = res.data.data.energyDataVOS;
            this.renderingTabData(); //转换处理表格数据
            if (this.allRenderTabData.length) {
              this.tabData = true;
            }
          })
           .then((res) => {
            if (this.allRenderTabData.length) {
               this.slideTil(0); //初次第一个kv表格加载滚动条
               this.radioStatus(1); //默认计算 '功率积分'
               this.countSum();
            }          
          }).catch(error=>{
            this.loading = false;
            this.$notify({
              title: "提示",
              message: "月份时间暂无相关数据，请查看5月份日数据！",
              duration: 3000,
              type: "warning"
            });
          })
      } else {
        this.$notify({
          title: "提示",
          message: "请先选择需要查询的厂站",
          duration: 3000,
          type: "warning"
        });
      }
    },
    getMenu(item, callback) {//树菜单
      //监听回调函数，通过callback返回下级菜单数据 ，如果需要的话
      if (item.attribute == "systemId") {
        this.areaObj = item;
        //根据地区id加载电压等级
        this.getBvidMenu(item, callback);
      } else if (item.attribute == "bvId") {
        //根据电压等级加载厂站
        this.getSubMenu(item, callback);
      } else if (item.attribute == "sbtId") {
        this.treeShow = false;
        this.sbtId = item.id;
        this.stObj = item;
         console.log( this.sbtId)
        // this.getVlMenu(item, callback)
        //根据厂站加载计量点
      } else if (item.attribute == "vlId") {
        this.vlId = item.id;
        console.log( this.vlId)
        //其他类型子菜单，如模型维护=》线路类型菜单
      }
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      let scroll = new BScroll(".side_nav", {
        scrollbar: true,
        mouseWheel: true
      });
    });
    this.httpGetData();
  },
  watch:{
    areaObj: {
      handler(news) {
        this.stObj= {};
      },
      deep: true
    },
  }
};
</script>

<style>
.overScroll {
  width: 3000px;
}
.overScroll table td {
  box-sizing: border-box;
}
.bgSelect {
  background: #022828 !important;
}
.ulCls {
  width: 220px;
}
.ulCls > li {
  width: 70px;
  background-color: #0d7474;
  margin: 0 2px;
  cursor: pointer;
}
li.liCls {
  background-color: #009f95;
}
.side_nav {
  position: absolute;
  top: 0px;
  left: 0px;
  background: #012828;
  /* width: 20%; */
  width: 280px;
  z-index: 10000;
  height: 100%;
  overflow: hidden;
}
.main_position {
  position: relative;
  min-height: 70vh !important;
  /* overflow: auto !important; */
}
.stName {
  /* margin-left: 10px; */
  padding-right: 10px;
  color: rgb(147, 117, 5);
  font-size: 12px;
}
.tree_box {
  z-index: 11;
  background: #012828;
}
.tree-menu span:hover {
  background: rgb(13, 116, 116);
}
.btn_left_side {
  position: absolute;
  top: 50%;
  left: -21px;
  width: 20px;
  height: 20px;
  background: url("../../../assets/img/icons.png") no-repeat;
  cursor: pointer;
}
.btn_side_r {
  background-position: -82px -254px;
}
.btn_side_l {
  background-position: -59px -224px;
}
.tab_rendering {
  min-height: 400px;
  width: 99%;
  margin: 0 auto;
}
.sjxfbox {
  overflow: hidden;
  position: relative;
}
.allbtn {
  width: 100%;
  height: 34px;
  line-height: 34px;
  margin-bottom: 5px;
  background: #0d7474;
  font-size: 16px;
  color: #84f1f1;
  text-indent: 10px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  font-weight: normal;
  position: relative;
  cursor: pointer;
  z-index: 9;
}
.zd_anniu {
  height: 34px;
  position: absolute;
  left: 0;
  cursor: pointer;
}
.zdgdup {
  position: absolute;
  right: 0;
}
.buttlist li,
.tltitle span {
  height: 24px;
  padding: 0 8px;
  background: #043434;
  border-radius: 3px;
  font-size: 13px;
  line-height: 24px;
  margin: 5px 5px 0 0;
  text-indent: 0;
  display: inline-block;
  cursor: pointer;
}
.height210 {
  overflow: hidden;
  max-height: 450px;
  position: relative;
  cursor: pointer;
}
.scrollbox {
  overflow: hidden;
  /* height: 210px; */
  width: auto;
}
.tablebox > div {
  overflow: hidden;
  height: 210px;
}
.tree_box {
  margin-left: 25px;
  /* margin-top: 15px; */
}
.date_selec{
  margin-top: -13px;
}
</style>
