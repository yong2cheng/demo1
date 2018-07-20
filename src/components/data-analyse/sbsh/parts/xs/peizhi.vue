<template>
    <div class="peizhi_main">
      <div v-show="!fillClose" class="fill" style="width:100px;height:100px;position:fixed;right:0;bottom:0">
        <el-progress :width="100" type="circle" :percentage="percentage"></el-progress>
        <span style="position:absolute;top:60px;left:22px;color:#60584F;font-size:12px;">自动配置中</span>
      </div>
        <!-- 配置 -->
        <div style="height:800px;z-index:200;">
            <div class="peizhi_t">
               <!-- 模型关联 -->
                <overlay style="min-height:500px;" oheight="60%" :close.sync="isShowtm">
                    <div class="yiji_t" style="height:100%;padding:0 20px;position:relative;">
                        <div class="t_title">
                            模型关联
                        </div>
                        
                        <p style="margin-bottom:10px;"><button @click="guanlian=false" :class="{warning:!guanlian}">未关联</button><button @click="guanlian=true;scroll();" :class="{warning:guanlian}">已关联</button></p>
                        <div style="height:100%;" v-show="!guanlian">
                            <div class="" style="width:40%;height:80%;float:left;">
                                <span style="font-size:14px;font-weight:bold;">TMR</span>
                                <div class="right">
                                  <input v-model="tmrName" type="text" placeholder="请输入设备名称" class="txt"/>
                                <button @click="soutmr()" class="sousuo">搜索</button>
                                </div>
                                
                                <table class="table">
                                    <thead>
                                            <tr>
                                                <td width="15%">选择</td>
                                                <td>设备名称</td>
                                            </tr>
                                    </thead>
                                </table>
                                <div class="scroll8" style="border-bottom:1px solid #0d7474;height:calc(100% - 116px);position:relative;overflow:hidden;">
                                    <table class="table">
                                        <tr :key="index" v-for="(item,index) in wtmr">
                                            <td width="15%"><input @click="tmrmrid=item[0].mrid;tmrtype=item[0].equipmentType" type="radio" :checked="tmrmrid==item[0].mrid" /></td>
                                            <td>{{item[0].name}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <button @click="newguanlian()" style="position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;height:30px;width:70px;">关联</button>
                            <div style="width:40%;height:80%;float:right;">
                                <span style="font-size:14px;font-weight:bold;">EMS</span>
                                <div class="right">
                                  <input v-model="emsName" type="text" placeholder="请输入设备名称" class="txt"/>
                                  <button @click="souems()" class="sousuo">搜索</button>
                                </div>
                                <table class="table" style="margin-top:10px;">
                                    <thead>
                                            <tr>
                                                <td width="15%">选择</td>
                                                <td>设备名称</td>
                                            </tr>
                                    </thead>
                                </table>
                                <div class="scroll9" style="border-bottom:1px solid #0d7474;height:calc(100% - 116px);position:relative;overflow:hidden;">
                                    <table class="table">
                                        <tr :key="index" v-for="(item,index) in wems">
                                            <td width="15%"><input @click="emsmrid=item[0].mrid;emsSystemId=item[0].systemId;" type="radio" :checked="emsmrid==item[0].mrid" /></td>
                                            <td>{{item[0].name}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div style="height:100%;" v-show="guanlian">
                            <table class="table">
                                <thead>
                                    <tr>
                                            <td>TMR</td>
                                            <td>EMS</td>
                                            <td>操作</td>
                                        </tr>
                                </thead>
                                
                            </table>
                            <div style="border-bottom:1px solid #0d7474;height:calc(100% - 150px);position:relative;overflow:hidden;" class="scroll4">
                                <table class="table">
                                    <tbody>
                                        <tr :key="index" v-for="(item,index) in ytmrems">
                                            <td>{{item[0].name}}</td>
                                            <td>{{item[1].name}}</td>
                                            <td class="clickable" @click="jiechugl( item[0].equipmentId, item[0].equipmentType)">解除关联</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                        
                    
                </overlay>
                <!-- 配置保存 -->
                <overlay owidth="400px" oheight="250px" :close.sync="peizhiBC_bt">

                    <div class="title">配置保存</div>
                    <div style="height:88px;font-size:14px;color:#fff;text-align:center;padding-top:50px;">
                        计算生效时间：
                        <el-date-picker
                        type="date"
                        v-model="dayDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择一个日期">
                        </el-date-picker>
                    </div>
                    <div style="text-align:center;">
                        <button @click="saveAclineConfig2()">确定</button>
                        <button @click="peizhiBC_bt=false">取消</button>
                    </div>
                </overlay>
                <!-- 线路平衡自动配置 -->
                <overlay owidth="600px" oheight="350px" :close.sync="peizhiXL_bt">
                    <!-- 自动配置情况 -->
                    <!-- <overlay owidth="600px" oheight="350px" :close.sync="peizhiZD_bt">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th style="font-size:18px;" colspan="5">
                                        线路平衡自动配置
                                    </th>
                                </tr>
                                <tr style="height:50px;">
                                    <td colspan="5">
                                        管理单位：
                                        <select name="" id="" v-model="systemIdt">
                                          <option :key="index" v-for="(item,index) in diquNames" :value="item.areaId">{{item.areaName}}</option>
                                      </select>
                                        电压等级：
                                        <select name="" id="" v-model="bvIdt">
                                            <option :key="index" v-for="(item,index) in dydjs" :value="item.bvId">{{item.dydj=="请选择"?"请选择":item.dydj+'kV'}}</option>
                                        </select>
                                        <button class="right">筛选</button>
                                    </td>

                                </tr>
                            </thead>
                            <tbody>
                                <tr style="height:70px;">
                                    <td colspan="5">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>序号</td>
                                                    <td>设备类型</td>
                                                    <td>电压等级</td>
                                                    <td>所属厂站</td>
                                                    <td>TMR系统</td>
                                                    <td>EMS系统</td>
                                                    <td>关联</td>
                                                </tr>
                                            </thead>
                                        </table>
                                        <div>
                                            <table class="table">
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </overlay> -->
                    <table class="table">
                        <thead>
                            <tr>
                                <th style="font-size:18px;" colspan="5">
                                    线路平衡自动配置
                                </th>
                            </tr>
                            <tr style="height:50px;">
                                <td colspan="5">
                                   管理单位：
                                    <select name="" id="" v-model="systemIdt">
                                      <option :key="index" v-for="(item,index) in diquNames" :value="item.areaId">{{item.areaName}}</option>
                                  </select>
                                    电压等级：
                                    <select name="" id="" v-model="bvIdt">
                                        <option :key="index" v-for="(item,index) in dydjst" :value="item.bvId">{{item.dydj=="请选择"?"请选择":item.dydj+'kV'}}</option>
                                    </select>
                                    <button class="right" :disabled="hasConfig" @click="autoConfig()">开始配置</button>
                                </td>

                            </tr>
                        </thead>
                        <tbody>
                            <tr style="height:70px;">
                                <td colspan="5">
                                  
                                </td>
                            </tr>
                            <tr style="height:195px;">
                                <td colspan="4">
                                  <div class="scroll5">
                                    <ul>
                                      <li></li>
                                    </ul>
                                  </div>
                                  
                                </td>
                                <td colspan="1"><button>自动配置情况</button></td>
                            </tr>
                        </tbody>
                    </table>
                </overlay>
                <!-- 配置恢复 -->
                <overlay owidth="775px" oheight="438px" :close.sync="peizhiHF_bt">
                  <div style="height:100%;width:100%;box-sizing:border-box;padding:10px;">
                      <div class="title">配置恢复</div>
                    <div style="height: calc(55% - 31px);box-sizing:border-box;">
                      <table class="table">
                        <thead>
                          <tr>
                            <td></td>
                            <td>序号</td>
                            <td>线路名称</td>
                            <td>电压等级</td>
                            <td>生效时间</td>
                          </tr>
                        </thead>
                      </table>
                      <div class="scroll6">
                        <table class="table">
                          <tr :key="index" v-for="(item,index) in pzhf">
                            <td><input :checked="pzhfindex==index" @click="pzhfindex=index;" name="pzhf" type="radio"></td>
                            <td>{{index-(-1)}}</td>
                            <td :key="indexd" v-for="(itemd,indexd) in item">{{itemd.name}}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div style="text-align:center;border-top:1px solid #0d7474;border-bottom:1px solid #0d7474;line-height:50px;">
                      <button @click="hfqd()">确定</button>
                      <button @click="peizhiHF_bt=false">取消</button>
                    </div>
                    <div style="height: calc(45% - 31px);">
                      <table class="table">
                        <thead>
                          <tr>
                            <td>序号</td>
                            <td>设备类型</td>
                            <td>电压等级</td>
                            <td>所属厂站</td>
                            <td>TMR系统</td>
                            <td>EMS关联</td>
                            <td>关联</td>
                          </tr>
                        </thead>
                      </table>
                      <div class="scroll7">
                        <table class="table">
                          <tr :key="index" v-for="(item,index) in pzhfd[pzhfindex]">
                            <td>{{index-(-1)}}</td>

                            <td :key="indexd" v-for="(itemd,indexd) in item">{{itemd.name}}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                </overlay> 
                <div style="width:100%;height:100%;">
                    <div class="t_title">
                      <button class="warning left" @click="fromPeizhi">返回</button>
                      线路平衡计算配置</div>
                    <div style="border-bottom: 1px solid #0D7474;line-height: 40px;height: 40px;">
                        <div class="left">
                            管理单位：
                            <select name="" id="" v-model="systemId">
                                <option :key="index" v-for="(item,index) in diquNames" :value="item.areaId">{{item.areaName}}</option>
                            </select>
                            电压等级：
                            <select name="" id="" v-model="bvId">
                                <option :key="index" v-for="(item,index) in dydjs" :value="item.bvId">{{item.dydj=="请选择"?"请选择":item.dydj+'kV'}}</option>
                            </select>
                            线路名称：
                            <input v-model="aclineName" class="txt" type="text"/>
                            <input v-model="status" type="checkbox" />未配置
                            <span style="color:red;">{{xianluName}}</span>
                        </div>
                        <div class="right">
                            <button @click="peizhichax()">查询</button>
                            <button @click="peizhiXL_bt=true;">自动配置</button>
                            
                        </div>
                    </div>
                    <div style="height:calc(100% - 90px)">
                        <div style="width:calc(40% - 1px);height:calc(100% - 4px);" class="left">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <td colspan="1">序号</td>
                                        <td colspan="2">线路名称</td>
                                        <td colspan="1">电压等级</td>
                                        <td colspan="1">配置情况</td>
                                    </tr>
                                </thead>
                            </table>
                            <div class="peizhiscroll">
                                <table class="table">
                                    <tbody>
                                        <tr :key="index" v-for="(item,index) in aclineLossConfigDataStatus">
                                            <td :key="indexd" @click="getAclineConfigData(itemd.isClick,itemd.aclineId,itemd.name,itemd.aclnType)" :class="{clickable:itemd.isClick}" :colspan="itemd.colspan" v-for="(itemd,indexd) in item">{{itemd.name}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div style="width:60%;height:100%;" class="right">
                            <div style="height:50%;">
                                <div style="text-align:center;line-height:50px">
                                    计算生效时间：2016-05-06
                                    <button class="warning" @click="qingkong()">清空</button>
                                    <button class="warning" @click="shanchu()">删除</button>
                                    <button @click="saveAclineConfig()">配置保存</button>
                                    <button @click="pzhftk()">配置恢复</button>
                                </div>
                                <div style="height:calc(100% - 50px);padding:0 50px;">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <td> <input :checked="quanxuan" @click="quanxuan=!quanxuan" type="checkbox"/>勾选 </td>
                                                <td>序号</td>
                                                <td>设备类型</td>
                                                <td colspan="2">设备名称</td>
                                                <td>电压等级</td>
                                                <td colspan="2">所属厂站</td>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div class="scroll2">
                                        <table class="table">
                                                <tbody>
                                                    <tr :key="index" v-for="(item,index) in yipeizhi">
                                                        <td><input v-model="aclineConfig" :value="index" type="checkbox"></td>
                                                        <td>{{index-(-1)}}</td>
                                                        <td  :colspan="indexd==3||indexd==1?2:1" :key="indexd" v-for="(itemd,indexd) in item">{{itemd.name}}</td>
                                                    </tr>
                                                </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div style="height:50%;">
                                <div style="text-align:center;line-height:65px">
                                    切换厂站：<select name="" v-model="substationMrid" id="">
                                        <option :key="index" v-for="(item,index) in substations" :value="item.mrid">{{item.name}}</option>
                                    </select>
                                    <!-- <button @click="xuanqu()">选取</button> -->
                                    <input type="text" v-model="tmrxtName" class="txt" placeholder="输入TMR系统"/>
                                </div>
                                <div style="height:calc(100% - 74px);padding:0 50px;">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <!-- <td>勾选</td> -->
                                                <td>序号</td>
                                                <td colspan="1">设备类型</td>
                                                <td colspan="2">TMR系统</td>
                                                <td colspan="2">EMS系统</td>  
                                                <td>关联</td>  
                                            </tr>
                                        </thead>
                                    </table>
                                    <div class="scroll3">
                                        <table class="table">
                                            <tbody>
                                                <tr @dblclick="xuanqu(item[0].devId,item[3].name)" v-if="item[1].name.indexOf(tmrxtName)>=0"   :key="index" v-for="(item,index) in tmrEms">
                                                    <!-- <td><input :disabled="item[3].name=='未关联'" v-model="tmrEmsIndexs" :value="item[0].devId" type="checkbox"></td> -->
                                                    <td>{{index-(-1)}}</td>
                                                    <td @click="clickGuanlian(itemd.isClick)" :colspan="indexd==0?1:indexd==1?2:indexd==2?2:1" :class="{clickable:itemd.isClick}" :key="indexd" v-for="(itemd,indexd) in item">{{itemd.name}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- loading框 -->
            <div v-if="isLoading" class="loadbox">
                <div class="tkzz"></div>
                <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                </div>
            </div>
    </div>
</template>
<script>
// import chartMix from "./chart.js";
import overlay from "@/components/common/overlay";
import $areaId from "@/assets/config/areaMap";
import $bvid from "@/assets/config/bvidMap";
import BScroll from "better-scroll";
import Bus from "@/assets/eventBus.js";
import qs from "qs";
export default {
  data() {
    return {
      cbvId: this.bvId,
      isLoading: false,
      token: sessionStorage.getItem("accessToken"),
      datalist: ["550kV", "220Kv", "110Kv", "35Kv"],
      peizhi_bt: false,
      hasPeizhi: false,
      peizhiBC_bt: false,
      peizhiXL_bt: false,
      peizhiZD_bt: false,
      peizhiHF_bt: false,
      dayDate: this.$day().format("YYYY-MM-DD HH:mm:ss"),
      systemId: "", //配置弹框
      systemIdt: "",
      data1: [],
      data2: [],
      data3: [],
      diquNames: [],
      bvId: -1,
      bvIdt: -1,
      dydjs: [],
      dydjst: [],
      aclineName: "",
      status: "",
      aclineLossConfigDataStatus: [],
      yipeizhi: [],
      weipeizhi: [],
      aclineConfigData: [],
      aclineConfig: [],
      substations: [],
      substationMrid: "",
      aclineId: "",
      aclnType: "",
      tmrEmsAll: [],
      tmrEms: [],
      tmrEmsIndexs: [], //选中的设备(tmr ems)
      isShowtm: false,
      hasScroll89: false,
      guanlian: false,
      wtmr: [],
      wtmrAll: [],
      wems: [],
      wemsAll: [],
      ytmrems: [],
      tmrmrid: "",
      tmrName: "",
      emsName: "",
      emsSystemId: "",
      tmrtype: "",
      emsmrid: "",
      percentage: 0,
      xianluName: "",
      pzhfindex: -1,
      pzhf: [],
      pzhfd: [],
      hasScroll67: false,
      hasScroll4: false,
      content: "",
      hasConfig: false,
      fillClose: true,
      canvas: document.getElementById("jiazai"),
      quanxuan:false,
      tmrxtName:""
    };
  },
  components: {
    overlay
  },
  mounted() {
    if (
      sessionStorage.getItem("systemId") === null ||
      sessionStorage.getItem("systemId") == "undefined" ||
      sessionStorage.getItem("systemId") == 15
    ) {
      console.log("diqu");
      this.diquNames = this.diquNames.concat($areaId);
      this.systemId = 15;
      this.systemIdt = 15;
    } else {
      for (var a of $areaId) {
        if (a.areaId == sessionStorage.getItem("systemId")) {
          this.diquNames.push(a);
          this.systemId = a.areaId;
          this.systemIdt = a.areaId;
        }
      }
    }
    this.peizhi();
  },
  methods: {
    fromPeizhi() {
      Bus.$emit("toPeizhi", false);
    },
    handleLoad(num, count) {
      if (num == count) {
        this.isLoading = false;
      }
    },
    getTypeName(type, isz) {
      if (isz) {
        return type == 4
          ? "线端"
          : type == 6
            ? "机组"
            : type == 7
              ? "电容"
              : type == 8
                ? "站用电"
                : type == 9
                  ? "开关"
                  : type == 10 ? "绕组" : type == 24 ? "虚拟设备" : "其他";
      } else {
        return type == 4
          ? "aclineend"
          : type == 6
            ? "generating_unit"
            : type == 7
              ? "compensator"
              : type == 8
                ? "energyconsumer"
                : type == 9
                  ? "breaker"
                  : type == 10
                    ? "transformerwinding"
                    : type == 24 ? "virture_equipment" : "unknown";
      }
    },
    peizhi() {
      this.peizhi_bt = true;
      if (!this.hasPeizhi) {
        this.$nextTick(() => {
          let scroll = new BScroll(".peizhiscroll", {
            scrollbar: { fade: false, interactive: true },
            preventDefault: false,
            mouseWheel: true
          });
          let scroll2 = new BScroll(".scroll2", {
            scrollbar: { fade: false, interactive: true },
            preventDefault: false,
            mouseWheel: true
          });
          let scroll3 = new BScroll(".scroll3", {
            scrollbar: { fade: false, interactive: true },
            preventDefault: false,
            mouseWheel: true
          });
        });
        this.hasPeizhi = true;
      }
      this.peizhichax();
    },
    peizhichax() {
      if (this.systemId !== "") {
        var systemId = "&systemId=" + this.systemId;
      } else {
        var systemId = "";
      }
      console.log(this.systemId);
      if (this.bvId !== -1) {
        var bvId = "&bvId=" + this.bvId;
      } else {
        var bvId = "";
      }
      if (this.aclineName) {
        var aclineName = "&aclineName=" + this.aclineName;
      } else {
        var aclineName = "";
      }
      if (this.status) {
        var status = "&status=0";
      } else {
        var status = "";
      }
      this.data1 = [];
      this.data2 = [];
      this.data3 = [];
      // this.aclineName = "";
      this.yipeizhi = [];
      this.aclineConfigData = [];
      this.aclineConfig = [];
      this.substations = [];
      this.substationMrid = "";
      this.aclineId = "";
      this.tmrEmsAll = [];
      this.tmrEms = [];
      this.tmrEmsIndexs = [];
      this.aclineLossConfigDataStatus = [];
      this.isLoading = true;
      this.$http
        .get(
          "/analysisService/analy/getAclineLossConfigDataStatus?sign=" +
            this.token +
            systemId +
            bvId +
            aclineName +
            status
        )
        .then(res => {
          if (res.data.code == 0) {
            this.isLoading = false;
            // this.$notify.error({
            //   title: '错误',
            //   message: "系统错误（code==0）"
            // });
          } else {
            this.isLoading = false;
            var data = res.data.data.aclineConfigOverviewVOS;
            this.aclineLossConfigDataStatus = [];
            if (data.length > 0) {
              for (var i in data) {
                var a = data[i];
                this.aclineLossConfigDataStatus.push([
                  {
                    name: i - -1,
                    colspan: 1
                  },
                  {
                    name: a.aclineName,
                    isClick: true,
                    aclineId: a.aclineId,
                    aclnType: a.aclnType,
                    colspan: 2
                  },
                  {
                    name: a.bvName,
                    colspan: 1
                  },
                  {
                    name: a.configureStatus == 0 ? "未配置" : "已配置",
                    colspan: 1
                  }
                ]);
              }
            } else {
              this.aclineLossConfigDataStatus.push([
                {
                  name: "无数据",
                  colspan: 5
                }
              ]);
            }
          }
        })
        .catch(error => {
          this.isLoading = false;
          //   this.$notify.error({
          //   title: '错误',
          //   message:"系统错误（error）"
          // });
        });
    },
    getBvId(bvId) {
      for (var a of $bvid) {
        if (a.bvId == bvId) {
          return a.dydj + "kV";
        }
      }
    },
    aclinecl(data1, data2, data3, data2full) {
      var data3copy = data3.slice(0);
      console.log('data3one',data3);
      if (data2full != undefined) {
        console.log(data2full);
        var arr = [];
        var arr2 = [];
        for (var a of data2full) {
          arr2[arr2.length] = [];
          arr.push([
            {
              name: this.xianluName,
              validTime: a.validTime,
              aclnId: a.aclnId
            },
            {
              name: this.getBvId(a.bvId)
            },
            {
              name: a.validTime
            }
          ]);
          var emsName = "";
          var isgl = "关联";
          for (var b of a.lineLossConfigDataList) {
            emsName = "";
            isgl = "关联";
            if (b.otherKey3 == null) {
              isgl = "未关联";
            }
            for (var c of data3copy) {
              if (b.devOtherKey3 == c.mrid && b.devOtherKey4 == c.systemId) {
                isgl = "关联";
                emsName = JSON.parse(c.data).pathName;
              }
            }
            arr2[arr2.length - 1].push([
              {
                name: this.getTypeName(b.equipmentType, true)
              },
              {
                name: this.getBvId(b.bvId)
              },
              {
                name: b.stName
              },
              {
                name: b.devPathName
              },
              {
                name: emsName
              },
              {
                name: isgl
              }
            ]);
          }
        }
        this.pzhf = arr;
        this.pzhfd = arr2;
      }
      var data1copy = data1.conductionEquipmentList.slice(0);
      if (data1copy.lenght == 0) {
        this.yipeizhi = [{ name: "无数据", colspan: 5 }];
        this.tmrEms = [{ name: "无数据", colspan: 6 }];
      } else {
        this.yipeizhi = [];
        this.tmrEmsAll = [];
        this.tmrEms = [];
        this.ytmrems=[];
        this.wtmr=[];
        for (var a of data2) {
          for (var i in data1copy) {
            var b = data1copy[i];
            if (a.devId == b.mrid) {
              var has = false;
              for (var j in data3copy) {
                var c = data3copy[j];
                if (a.otherKey3 == c.mrid && a.otherKey4 == c.systemId) {
                  data3copy.splice(j, 1);
                  var pathName = JSON.parse(c.data).pathName;
                  this.ytmrems.push([
                    {
                      name: a.devPathName,
                      equipmentType: this.getTypeName(a.equipmentType, false),
                      equipmentId: a.devId
                    },
                    {
                      name: pathName
                    }
                  ]);
                }
              }

              data1copy.splice(i, 1);
              this.yipeizhi.push([
                {
                  name: this.getTypeName(b.equipmentType, true)
                },
                {
                  name:a.devLocalName
                },
                {
                  name: this.getBvId(b.bvId)
                },
                {
                  name: b.stName
                }
              ]);
              break;
            }
          }
        }
        var arr = [];
        for (var a of data1copy) {
          if (a.otherKey3 == null) {
            arr.push([
              {
                name: this.getTypeName(a.equipmentType, true),
                stId: a.stId
              },
              {
                name: a.pathName
              },
              {
                name: ""
              },
              {
                name: "未关联",
                isClick: true
              }
            ]);
            this.wtmr.push([
              {
                name: a.pathName,
                mrid: a.mrid,
                equipmentType: this.getTypeName(a.equipmentType, false)
              }
            ]);
            this.wtmrAll = this.wtmr;
          } else {
            var has = false;
            for (var i in data3copy) {
              var b = data3copy[i];
              if (a.otherKey3 == b.mrid && a.otherKey4 == b.systemId) {
                has = true;
                data3copy.splice(i, 1);
                var pathName = JSON.parse(b.data).pathName;
                arr.push([
                  {
                    name: this.getTypeName(a.equipmentType, true),
                    otherKey3: a.otherKey3,
                    otherKey4: a.otherKey4,
                    aclnId: this.aclineId,
                    devId: a.mrid,
                    stId: a.stId,
                    bvId: a.bvId,
                    stName: a.stName,
                    status: a.status,
                    pathName: a.pathName,
                    localName: a.localName,
                    emsBrId: a.emsBrId
                  },
                  {
                    name: a.pathName
                  },
                  {
                    name: pathName
                  },
                  {
                    name: "关联",
                    isClick: true
                  }
                ]);
                this.ytmrems.push([
                  {
                    name: a.pathName,
                    equipmentType: this.getTypeName(a.equipmentType, false),
                    equipmentId: a.mrid
                  },
                  {
                    name: pathName
                  }
                ]);
              }
            }
            if (!has) {
              arr.push([
                {
                  name: this.getTypeName(a.equipmentType, true),
                  stId: a.stId
                },
                {
                  name: a.pathName
                },
                {
                  name: ""
                },
                {
                  name: "未关联",
                  isClick: true
                }
              ]);
              this.wtmr.push([
                {
                  name: a.pathName,
                  mrid: a.mrid,
                  equipmentType: this.getTypeName(a.equipmentType, false)
                }
              ]);
              this.wtmrAll = this.wtmr;
            }
          }
        }
        for (var a of data3copy) {
          var pathName = JSON.parse(a.data).pathName;
          this.wems.push([
            {
              name: pathName,
              mrid: a.mrid,
              systemId: a.systemId
            }
          ]);
        }
        this.wemsAll = this.wems;
        this.tmrEmsAll = arr;
        for (var a of this.tmrEmsAll) {
          if (a[0].stId == this.substationMrid) {
            this.tmrEms.push(a);
          }
        }
        this.substations = [];
        for (var a of data1.substations) {
          this.substations.push({
            name: a.pathName,
            mrid: a.mrid
          });
        }
        if (this.substations.length > 0) {
          this.substationMrid = this.substations[0].mrid;
        }
      }
      console.log('data3two',data3);
    },
    getAclineConfigData(isClick, aclineId, name, aclnType) {
      if (isClick) {
        if (aclnType != undefined) {
          this.aclnType = aclnType;
        }
        this.xianluName = name;
        this.isLoading = true;
        this.aclineId = aclineId;
        this.data1 = [];
        this.data2 = [];
        this.data3 = [];
        this.aclineName = "";
        this.yipeizhi = [];
        this.aclineConfigData = [];
        this.aclineConfig = [];
        this.substations = [];
        this.substationMrid = "";
        this.tmrEmsAll = [];
        this.tmrEms = [];
        this.tmrEmsIndexs = [];
        this.wtmr = [];
        this.wems = [];
        this.ytmrems = [];
        var data1;
        var data2;
        var data2full;
        var data3;
        var count = 0;
        this.$http
          .get(
            "/analysisService/analy/getAllendOfOneAcline?sign=" +
              this.token +
              "&aclineId=" +
              aclineId
          )
          .then(res => {
            if (res.data.code == 0) {
              count++;
              this.handleLoad(count, 3);
              // this.$notify.error({
              //   title: '错误',
              //   message: "系统错误（code==0）"
              // });
              return;
            } else {
              count++;
              this.handleLoad(count, 3);
              data1 = res.data.data;
              this.data1 = data1;
              if (count == 3) {
                this.aclinecl(data1, data2, data3, data2full);
              }
            }
          })
          .catch(error => {
            count++;
            this.handleLoad(count, 3);
            // this.$notify.error({
            //   title: '错误',
            //   message:"系统错误（error）"
            // });
          });
        this.$http
          .get(
            "/analysisService/analy/getAclineConfigData?sign=" +
              this.token +
              "&aclineId=" +
              aclineId
          )
          .then(res => {
            if (res.data.code == 0) {
              count++;
              this.handleLoad(count, 3);
              this.$notify.error({
                title: "错误",
                message: "系统错误（code==0）"
              });
              return;
            } else {
              count++;
              this.handleLoad(count, 3);
              data2full = res.data.data.lineLossConfigList;
              if (res.data.data.lineLossConfigList.length > 0) {
                data2 =
                  res.data.data.lineLossConfigList[0].lineLossConfigDataList;
                this.data2 = data2;
                this.aclineConfigData = res.data.data.lineLossConfigList[0];
                //this.aclineConfigData.lineLossConfigDataList=[];
              } else {
                data2 = [];
                this.data2 = data2;
                this.aclineConfigData = { lineLossConfigDataList: [] };
              }

              if (count == 3) {
                this.aclinecl(data1, data2, data3, data2full);
              }
            }
          })
          .catch(error => {
            count++;
            this.handleLoad(count, 3);
            //     this.$notify.error({
            //   title: '错误',
            //   message:"系统错误（error）"
            // });
          });
        this.$http
          .get(
            "/analysisService/analy/getEmsAllendOfOneAcline?sign=" +
              this.token +
              "&aclineId=" +
              aclineId
          )
          .then(res => {
            if (res.data.code == 0) {
              count++;
              this.handleLoad(count, 3);
              this.$notify.error({
                title: "错误",
                message: "系统错误（code==0）"
              });
              return;
            } else {
              count++;
              this.handleLoad(count, 3);
              data3 = res.data.data.conductingEquipmentList;
              this.data3 = data3.slice(0);
              if (count == 3) {
                this.aclinecl(data1, data2, data3, data2full);
              }
            }
          })
          .catch(error => {
            count++;
            this.handleLoad(count, 3);
            //     this.$notify.error({
            //   title: '错误',
            //   message:"系统错误（error）"
            // });
          });
      }
    },
    saveAclineConfig() {
      if (this.aclineConfig.length == 0) {
        this.$notify.info({
          title: "消息",
          message: "请勾选设备"
        });
      } else {
        this.peizhiBC_bt = true;
      }
    },
    saveAclineConfig2() {
      var arr = [];
      console.log(this.aclineConfigData.lineLossConfigDataList);
      for (var a of this.aclineConfig) {
        arr.push(this.aclineConfigData.lineLossConfigDataList[a]);
        delete arr[arr.length - 1]["lastRefreshTime"];
        delete arr[arr.length - 1]["id"];
        //  arr[arr.length - 1].id=1232;
        arr[arr.length - 1].validTime = this.dayDate;
        // arr[arr.length - 1].equipmentType=4
      }
      this.isLoading = true;
      this.$http
        .post(
          "/analysisService/analy/saveAclineConfig?sign=" +
            this.token +
            "&aclnType=" +
            this.aclnType,
          arr
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$notify({
              title: "成功",
              message: "保存成功!",
              type: "success"
            });
            this.isLoading = false;
            this.peizhiBC_bt = false;
            this.quanxuan=false;
            this.getAclineConfigData(true, this.aclineId, this.xianluName);
          }else{
            this.isLoading = false;
            this.peizhiBC_bt = false;
            this.quanxuan=false;
              this.$notify.error({
                title: "错误",
                message: res.data.msg
              });
          }
        })
        .catch(error => {
          this.peizhiBC_bt = false;
          count++;
          this.handleLoad(count, 3);
          //   this.$notify.error({
          //   title: '错误',
          //   message:"系统错误（error）"
          // });
        });
    },
    xuanqu(devId,name) {
      if(name=="未关联"){
        this.$notify.info({
          title: '消息',
          message: "此设备没有关联EMS设备"
        });
        return;
      }
        var tmrEms=this.tmrEms.slice(0);
        console.log(this.tmrEmsAll);
        var b=devId;
          for(var a in tmrEms){
            if(tmrEms[a][0].devId==b){
              this.aclineConfigData.lineLossConfigDataList.push({
                aclnId: this.aclineId,
                devId: tmrEms[a][0].devId,
                devOtherKey3: tmrEms[a][0].otherKey3,
                devOtherKey4: tmrEms[a][0].otherKey4,
                bvId: tmrEms[a][0].bvId,
                status: tmrEms[a][0].status,
                devPathName: tmrEms[a][0].pathName,
                devLocalName: tmrEms[a][0].localName,
                aclnendId: tmrEms[a][0].devId,
                emsBrId: tmrEms[a][0].emsBrId,
                stId:tmrEms[a][0].stId
              });
              this.yipeizhi.push([
                {
                  name: tmrEms[a][0].name,

                },
                {
                  name: tmrEms[a][0].localName
                },
                {
                  name: this.getBvId(tmrEms[a][0].bvId)
                },
                {
                  name: tmrEms[a][0].stName
                }
              ]);
            }
          }
          for (var i in this.tmrEmsAll) {
            if (this.tmrEmsAll[i][0].devId == b) {
              this.tmrEmsAll.splice(i, 1);
            }
          }
          for (var i in this.tmrEms) {
            if (this.tmrEms[i][0].devId == b) {
              this.tmrEms.splice(i, 1);
            }
          }
      
    },
    qingkong() {
      this.yipeizhi = [];
      this.tmrEmsAll = [];
      this.tmrEms = [];
      this.aclinecl(this.data1, [], this.data3);
    },
    shanchu() {
      console.log(this.aclineConfig);
      if (this.aclineConfig.length == 0) {
        this.$notify.info({
          title: "消息",
          message: "请勾选设备"
        });
      } else {
        var arr = [];
        console.log("this.aclineConfigData",this.aclineConfigData);
        for (var a of this.aclineConfig) {
          console.log(a);
          arr.push(this.aclineConfigData.lineLossConfigDataList[a]);
          arr[arr.length - 1].otherKey3 = arr[arr.length - 1].devOtherKey3;
          arr[arr.length - 1].otherKey4 = arr[arr.length - 1].devOtherKey4;
          arr[arr.length - 1].pathName = arr[arr.length - 1].devPathName;
          arr[arr.length - 1].localName = arr[arr.length - 1].devLocalName;
          this.data2.splice(a, 1);
           //this.aclineConfigData.lineLossConfigDataList.splice(a, 1);
        }
        this.aclineConfig = [];
        this.data1.conductionEquipmentList.unshift(arr);
        this.aclinecl(this.data1, this.data2, this.data3);
      }
    },
    clickGuanlian(hasClick) {
      if (hasClick) {
        this.isShowtm = true;
        if (!this.hasScroll89) {
          this.$nextTick(() => {
            //let scroll4 = new BScroll('.scroll4', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true});
            let scroll8 = new BScroll(".scroll8", {
              scrollbar: { fade: false, interactive: true },
              preventDefault: false,
              mouseWheel: true
            });
            let scroll9 = new BScroll(".scroll9", {
              scrollbar: { fade: false, interactive: true },
              preventDefault: false,
              mouseWheel: true
            });
          });
          this.hasScroll89 = true;
        }
      }
    },
    soutmr() {
      if(this.tmrName.toString()==""){
        this.wtmr=this.wtmrAll;
      }else{
        this.wtmr = [];
        for (var a of this.wtmrAll) {
          if (a[0].name.indexOf(this.tmrName.toString()) != -1) {
            this.wtmr.push(a);
          }
        }
      }
      
    },
    souems() {
      if(this.emsName.toString()==""){
        this.wems=this.wemsAll;
      }else{
        this.wems = [];
        for (var a of this.wemsAll) {
          if (a[0].name.indexOf(this.emsName.toString()) != -1) {
            this.wems.push(a);
          }
        }
      }
      
    },
    newguanlian() {
      console.log(this.emsSystemId);
      if (
        this.tmrtype == "" ||
        this.tmrmrid == "" ||
        this.emsmrid == "" ||
        this.emsSystemId == ""
      ) {
        this.$notify.info({
          title: "消息",
          message: "请先选择要关联的配置"
        });
        return;
      }
      this.$http
        .post(
          "/analysisService/analy/associateEquipment?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            equipmentType: this.tmrtype,
            equipmentId: this.tmrmrid,
            emsEquipmentId: this.emsmrid,
            emsSystemId: this.emsSystemId
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.getAclineConfigData(true, this.aclineId, this.xianluName);
            this.tmrtype ="";
            this.tmrmrid ="";
            this.emsmrid ="";
            this.$notify({
              title: "成功",
              message: "关联成功",
              type: "success"
            });
          }
        });
    },
    jiechugl(mrid, type) {
      this.$http
        .post(
          "/analysisService/analy/associateEquipment?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            equipmentType: type,
            equipmentId: mrid
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$notify({
              title: "成功",
              message: "解除成功",
              type: "success"
            });
            console.log(this.aclineId);
            this.getAclineConfigData(true, this.aclineId, this.xianluName);
          }
        });
    },
    scroll() {
      if (!this.hasScroll4) {
        this.$nextTick(() => {
          let scroll4 = new BScroll(".scroll4", {
            scrollbar: { fade: false, interactive: true },
            preventDefault: false,
            mouseWheel: true
          });
        });
        this.hasScroll4 = true;
      }
    },
    autoConfig() {
      var that = this;
      this.hasConfig = true;
      this.peizhiXL_bt = false;
      this.fillClose = false;
      that.percentage = 0;
      var timer = setInterval(function() {
        that.percentage++;
        if (that.percentage >= 90) {
          clearInterval(timer);
          timer = null;
        }
      }, 100);
      var qsArr;
      if (this.bvIdt == -1) {
        qsArr={
              systemId: this.systemIdt
            }
      }else{
        qsArr={
              systemId: this.systemIdt,
              bvId: this.bvIdt
            }
      }
            
        this.$http
          .post(
            "/analysisService/analy/autoAclineConfig?sign=" + this.token,
            qs.stringify(qsArr)
          )
          .then(res => {
            if (res.data.code == 0) {
              this.$notify.error({
                title: "错误",
                message: "自动配置失败"
              });
              this.hasConfig = false;
              this.fillClose = true;
            } else {
              this.percentage = 100;
              setTimeout(()=>{
                this.fillClose = true;
                this.hasConfig = false;
              },500)
              clearInterval(timer);
              timer = null;
              
              this.$notify({
                title: "成功",
                message: "配置成功",
                type: "success"
              });
            }
          })
          .catch(error=>{
            this.hasConfig = false;
              this.fillClose = true;
            this.$notify.error({
                title: "错误",
                message: "自动配置失败"
              });
          });
      
    },
    pzhftk() {
      this.peizhiHF_bt = true;
      if (!this.hasScroll67) {
        this.$nextTick(() => {
          let scroll6 = new BScroll(".scroll6", {
            scrollbar: { fade: false, interactive: true },
            preventDefault: false,
            mouseWheel: true
          });
          let scroll7 = new BScroll(".scroll7", {
            scrollbar: { fade: false, interactive: true },
            preventDefault: false,
            mouseWheel: true
          });
        });
        this.hasScroll67 = true;
      }
    },
    hfqd() {
      if (this.pzhfindex == -1) {
        this.$notify.info({
          title: "消息",
          message: "请先勾选"
        });
      } else {
        this.$http
          .get(
            "/analysisService/analy/reductionAclineConfig?sign=" +
              this.token +
              "&aclineId=" +
              this.pzhf[this.pzhfindex][0].aclnId +
              "&date=" +
              this.pzhf[this.pzhfindex][0].validTime
          )
          .then(res => {});
      }
    }
  },
  watch: {
    systemId: function() {
      if (this.systemId != "") {
        this.$http
          .get(
            "/treeService/tree/getAllBaseVoltageTreeNodeBySystemId?sign=" +
              this.token +
              "&systemId=" +
              this.systemId
          )
          .then(res => {
            if (res.data.code == 0) {
              //       this.$notify.error({
              //   title: '错误',
              //   message: "系统错误（code==0）"
              // });
              return;
            } else {
              var data = res.data.data.allSubStations;
              this.dydjs = [{ bvId: -1, dydj: "请选择" }];
              this.bvId=-1;

              for (var a of data) {
                for (var b of $bvid) {
                  if (a.id == b.bvId) {
                    this.dydjs.push(b);
                  }
                }
              }
            }
          });
      }
    },
    systemIdt: function() {
      if (this.systemIdt != "") {
        this.$http
          .get(
            "/treeService/tree/getAllBaseVoltageTreeNodeBySystemId?sign=" +
              this.token +
              "&systemId=" +
              this.systemIdt
          )
          .then(res => {
            if (res.data.code == 0) {
              //       this.$notify.error({
              //   title: '错误',
              //   message: "系统错误（code==0）"
              // });
              return;
            } else {
              var data = res.data.data.allSubStations;
              this.dydjst = [{ bvId: -1, dydj: "请选择" }];
              this.bvIdt=-1;
              for (var a of data) {
                for (var b of $bvid) {
                  if (a.id == b.bvId) {
                    this.dydjst.push(b);
                  }
                }
              }
            }
          });
      }
    },
    substationMrid: function() {
      this.tmrEms = [];
      for (var a of this.tmrEmsAll) {
        if (a[0].stId == this.substationMrid) {
          this.tmrEms.push(a);
        }
      }
      this.tmrEmsIndexs=[];
      console.log(this.tmrEmsAll);
    },
    quanxuan:function(){
      if(this.quanxuan){
        this.aclineConfig= Array.from({ length: this.yipeizhi.length }, (v, k) => k);
      }else{
        this.aclineConfig=[];
      }
      
    }
  }
  // mixins: [chartMix]
};
</script>
<style>
.peizhi_main {
  position: relative;
}
.peizhi_main .peizhi_t {
  height: 100%;
  padding: 0 5px;
}
.peizhi_main table tr td {
  padding: 0;
}
.peizhi_main .peizhiscroll,
.peizhi_main .scroll2,
.peizhi_main .scroll3 {
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #0d7474;
}
.peizhi_main .scroll2{
  height: calc(100% - 60px);
}
.peizhi_main .scroll3{
  height: calc(100% - 36px);
}
.peizhi_main .peizhiscroll{
  height: calc(100% - 41px);
}
.peizhi_main .scroll {
  overflow: hidden;
  height: calc(100% - 37px);
  position: relative;
}
.peizhi_main .title {
  height: 30px;
  font-size: 18px;
  border-bottom: 1px solid #0d7474;
  text-align: center;
}
.peizhi_main .scroll6,
.peizhi_main .scroll7 {
  position: relative;
  overflow: hidden;
  height: calc(100% - 35px);
}
@media only screen and (max-width: 1399px) {
  .peizhi_main .xx_but li {
    margin: 0 10px;
  }
}
</style>


