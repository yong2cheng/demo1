<template>
  <div style="width:100%;height:550px;padding:10px;" class="jumpo gather_cover">
      <div style="width:15%;height:550px;" class="gather_cover">
            <div style="width:100%;" class="gather_cover">
                <div class="bkbt">
                    电量汇总
                </div>
                <table class="table table_r">
                    <tr>
                        <td>输入电量:{{inCount}}</td>
                    </tr>
                    <tr>
                        <td>输出电量:{{outCount}}</td>
                    </tr>
                    <tr>
                        <td>不平衡电量:{{undCount}}</td>
                    </tr>
                    <tr>
                        <td>不平衡率:{{unbalanceRate}}</td>
                    </tr>
                    <tr>
                        <td>站用电量:{{substationValue}}</td>
                    </tr>
                    <tr>
                        <td>旁路电量:{{bypassValue}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:100%;margin-top:30px;" class="gather_cover">
                <div class="bkbt">
                    事件汇总
                </div>
                <table class="table table_r">
                    <tr>
                        <td>电表轮换:
                            <span @click="isShowd=true;" style="color:#dd6b66;cursor:pointer;">{{meterChangeCount}}</span></td>   
                    </tr>
                    <tr><td>CTPT轮换:
                        <span @click="isShowc=true;" style="color:#dd6b66;cursor:pointer;">{{ctptChangeCount}}</span></td></tr>
                    <tr><td>旁路明细: <span style="color:#dd6b66;cursor:pointer;"></span></td></tr>
                    <tr><td>采集事件: <span style="color:#dd6b66;cursor:pointer;"></span></td></tr>
                </table>
            </div>
      </div>
      <div style="width:67%;height:550px;margin-left:1%;" class="gather_cover">
          <div class="bkbt" style="text-align:right">
                    <span style="float:left;">{{fullName}}</span>
                    <button class="btn-small" @click="isRi=true;" :class="{btn_checked:isRi}">日数据</button>
                    <button class="btn-small" @click="isRi=false;" :class="{btn_checked:!isRi}">月数据</button>
                    <el-date-picker
                    type="date"
                    v-if="isRi"
                    v-model="dayDater"
                    value-format="yyyy-MM-dd"
                    placeholder="yyyy-MM-dd">
                    </el-date-picker>
                    <el-date-picker
                    type="month"
                    v-if="!isRi"
                    v-model="dayDate"
                    value-format="yyyy-MM"
                    placeholder="yyyy-MM">
                    </el-date-picker>
                    <button @click="changeDate()">提交</button>
                    <button @click="isShowm=true;">明细</button>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <td colspan="2" rowspan="2">名称</td>
                        <td rowspan="2">倍率</td>
                        <td colspan="4">输入</td>
                        <td colspan="4">输出</td>
                    </tr>
                    <tr>
                        <td>始码</td>
                        <td>止码</td>
                        <td>电量</td>
                        <td>方案</td>
                        <td>始码</td>
                        <td>止码</td>
                        <td>电量</td>
                        <td>方案</td>
                    </tr>
                </thead>
            </table>
            <div class="scroll" style="max-height:364px;position:relative;overflow:hidden;">
                
                <table class="table">
                    <tbody>
                        <tr :key="index" v-for="(item,index) in tbodys">
                            <td :key="indexm" v-for="(child,indexm) in item" :colspan="child.numone">{{child.name}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table class="table">
              <tr>
                  <td style="text-align:left;">公式:</td> 
              </tr>
            </table>
            <button class="icon-search" @click="toone()" style="float:right;margin:5px;">母平配置查询</button>
      </div>
      <div style="width:15%;height:550px;float:right;" class="gather_cover">
          <div style="width:100%;" class="gather_cover">
                <div class="bkbt">
                       参入计算
                </div>
                <table class="table table_r">
                    <tr>
                        <td><input :checked="zb" @click="zb=!zb" type="checkbox">主变电量</td>
                    </tr>
                    <tr>
                        <td><input :checked="xl" @click="xl=!xl" type="checkbox">线路电量</td>
                    </tr>
                    <tr>
                        <td><input :checked="zy" @click="zy=!zy" type="checkbox">站用电量</td>
                    </tr>
                    <tr>
                        <td><input :checked="pl" @click="pl=!pl" type="checkbox">旁路电量</td>
                    </tr>
                    <!-- <tr>
                        <td><input type="checkbox">原始值</td>
                    </tr> -->
                </table>
        </div>
        <div style="width:100%;margin-top:30px;" class="gather_cover">
                <div class="bkbt">
                       比对方案
                </div>
                <table class="table table_r">
                    <tr>
                        <td><input type="radio" name="bidui" @click="bidui=1" checked />功率积分电量</td>
                    </tr>
                    <tr>
                        <td><input type="radio" name="bidui" @click="bidui=2" />副表电量</td>
                    </tr>
                    <tr>
                        <td><input type="radio" name="bidui" @click="bidui=3" />对端电量</td>
                    </tr>
                </table>
        </div>
      </div>
      <!-- 电表轮换弹框 -->
      <overlay style="min-height:500px;" oheight="60%"  :close.sync="isShowd">
        <div class="yiji_t">
          <div class="t_title">
            <span>电表轮换详情</span>
          </div>
          <div class="right t_sousuo">
            <span>电表名称：</span>
                        <input v-model="merterName" class="txt" placeholder="请输入电表名称" type="text">
                        <button @click="merterSousuo()">搜索</button>
                      </div>
          <table class="table">
              <thead>
                  <tr>
                      <td colspan="2" rowspan="2">电表</td>
                      <td rowspan="2">更换时间</td>
                      <td rowspan="2">倍率</td>
                      <td colspan="4">更换前</td>
                      <td colspan="4">更换前</td>
                      <td rowspan="2">历史信息</td>
                  </tr>
                  <tr>
                      <td>正向有功</td>
                      <td>反向有功</td>
                      <td>正向无功</td>
                      <td>反向无功</td>
                      <td>正向有功</td>
                      <td>反向有功</td>
                      <td>正向无功</td>
                      <td>反向无功</td>
                  </tr>
              </thead>
          </table>
          <div class="scrollMerter" style="height:calc(100% - 154px);margin:0 auto;position:relative;overflow:hidden;">
              <table class="table">
                  <tbody>
                      <tr :key="index" v-for="(item,index) in merters">
                            <td :key="indexm" v-for="(child,indexm) in item" :colspan="child.numone">{{child.name}}</td>
                        </tr>
                  </tbody>
              </table>
          </div>
        </div>
          
      </overlay>
      <!-- CTPT轮换弹框 -->
      <overlay style="min-height:500px;" oheight="60%"  :close.sync="isShowc">
        <div class="yiji_t">
          <div class="t_title">
            <span>CTPT轮换详情</span>
          </div>
          <div class="right t_sousuo">
            <span>电表名称：</span>
                        <input v-model="ctptName" class="txt" placeholder="请输入电表名称" type="text">
                      <button @click="ctptSousuo()">搜索</button>
                      </div>
          <table class="table">
              <thead>
                  <tr>
                    <td colspan="2" rowspan="2">电表</td>
                    <td rowspan="2">更换时间</td>
                    <td colspan="4">更换前</td>
                    <td colspan="4">更换前</td>
                    <td rowspan="2">历史信息</td>
                  </tr>
                  <tr>
                    <td>CT1</td>
                    <td>PT1</td>
                    <td>CT2</td>
                    <td>PT2</td>
                    <td>CT1</td>
                    <td>PT1</td>
                    <td>CT2</td>
                    <td>PT2</td>
                  </tr>
              </thead>
          </table>
          <div class="scrollCtpt" style="height:calc(100% - 154px);margin:0 auto;position:relative;overflow:hidden;">
              <table class="table">
                  <tbody>
                      <tr :key="index" v-for="(item,index) in ctpts">
                          <td :key="indexm" v-for="(child,indexm) in item" :colspan="child.numone">{{child.name}}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
        </div>
          
      </overlay>
      <!-- 明细弹框 -->
      <overlay style="min-height:500px;" oheight="60%"  :close.sync="isShowm">
        <div class="yiji_t">
          <div class="t_title">
            <span>明细</span>
          </div>
          <div style="height:200px;" id="mingxi"></div>
          <div style="height:calc(100% - 250px)">
            <table class="table">
              <thead>
                      <tr>
                          <td colspan="2">日</td>
                          <td colspan="2">一</td>
                          <td colspan="2">二</td>
                          <td colspan="2">三</td>
                          <td colspan="2">四</td>
                          <td colspan="2">五</td>
                          <td colspan="2">六</td>
                      </tr>
                  </thead>
            </table>
            <div class="scroll2">
              <table class="table">
                  
                  <tbody>
                      <tr :key="index" v-for="(item,index) in tables">
                          <td :key="indexd" :class="{isRed:itemd.color}" v-for="(itemd,indexd) in item">{{itemd.name}}</td>
                      </tr>
                  </tbody>
              </table>
            </div>
              
          </div>
        </div>
          
      </overlay>
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
import $areaId from "../../../assets/config/areaMap";
import BScroll from "better-scroll";
import overlay from "@/components/common/overlay";
export default {
  data: function() {
    return {
      fullName: "",
      systemId: "",
      dayDate: "",
      dayDater: "",
      vlId: "",
      tbodys: [],
      isLoad: true,
      inCount: 0,
      outCount: 0,
      undCount: 0,
      meterChangeCount: 0,
      hasmeterscroll: false,
      hasctptscroll: false,
      ctptChangeCount: 0,
      isRi: false,
      data: [],
      bidui: 1,
      isShowd: false, //电表轮换弹框
      hasisShowd:false,
      isShowc: false, //CTPT乱换弹框
      hasisShowc:false,
      isShowm: false, //母平配置弹框
      merters: [],
      merterAll: [],
      merterName: "",
      ctpts: [],
      ctptAll: [],
      ctptName: "",
      tables: [],
      isLoading: true,
      hasisShowm:false,
      zb:true,
      xl:true,
      zy:true,
      pl:true,
      unbalanceRate:0,
      substationValue:0,
      bypassValue:0
    };
  },
  components: {
    overlay
  },
  created() {
    this.systemId = this.$route.query.systemId;
    this.fullName = this.$route.query.name;
    this.dayDate = this.$route.query.date;
    this.dayDater = this.$route.query.date+"-01";
    this.vlId = this.$route.query.vlId;
  },
  mounted() {
    this.allLoad();
    this.$nextTick(() => {
      let scroll = new BScroll(".scroll", {
        scrollbar: { fade: false, interactive: true },
        preventDefault:false,
        mouseWheel: true
      });
    });
  },
  methods: {
    handleLoad(num, count) {
      if (num == count) {
        this.isLoading = false;
      }
    },
    allLoad() {
      this.isLoading = true;
      var count = 0;
      if(this.isRi){
        var a='getDayBusbarEnergy';
        var day="&day="+this.dayDater;
      }else{
        var a='getBusbarEnergy';
        var day="&month="+this.dayDate;
      }
      var type="";
      if(this.zb){
        type=type+"1";
      }else{
        type=type+"0";
      }
      if(this.xl){
        type=type+"1";
      }else{
        type=type+"0";
      }
      if(this.zy){
        type=type+"1";
      }else{
        type=type+"0";
      }
      if(this.pl){
        type=type+"1";
      }else{
        type=type+"0";
      }
      this.$http
        .get(
          "/analysisService/analy/"+a+"?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            day +
            "&vlId=" +
            this.vlId +
            "&energyType="+type
        )
        .then(res => {
          if (res.data.code == 0) {
            count++;
            this.handleLoad(3, count);
        //     this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
            return;
          }
          count++;
          this.handleLoad(3, count);
          var data = res.data.data.equipmentEnergies;
          var equipmentEnergySummaryVO =res.data.data.equipmentEnergySummaryVO;
          this.inCount=equipmentEnergySummaryVO.inputValue;
              this.outCount =equipmentEnergySummaryVO.inputValue;
              this.undCount=equipmentEnergySummaryVO.unbalance;
              this.unbalanceRate=equipmentEnergySummaryVO.unbalanceRate;
              this.substationValue=equipmentEnergySummaryVO.substationValue;
              this.bypassValue=equipmentEnergySummaryVO.bypassValue;
          this.data = data;
          console.log(data);
          if (data.length > 0) {
            for (var a of data) {
              
              this.tbodys.push([
                {
                  name: a.equipmentName,
                  numone: 2
                },
                {
                  name: a.rate,
                  numone: 1
                },
                {
                  name: a.startTariffInputValue,
                  numone: 1
                },
                {
                  name: a.endTariffInputValue,
                  numone: 1
                },
                {
                  name: a.inboundData1,
                  numone: 1
                },
                {
                  name: a.inboundData2,
                  numone: 1
                },
                {
                  name: a.startTariffOutputValue,
                  numone: 1
                },
                {
                  name: a.endTariffOutputValue,
                  numone: 1
                },
                {
                  name: a.outboundData1,
                  numone: 1
                },
                {
                  name: a.outboundData2,
                  numone: 1
                }
              ]);
            }
          }
        })
        .catch(error => {
          count++;
          this.handleLoad(3, count);
        //   this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
        });
      this.$http
        .get(
          "/quotaService/quota/getMeterChangedLog?sign=" +
            sessionStorage.getItem("accessToken") +
            "&systemId=" +
            this.systemId +
            day +
            "&vlId=" +
            this.vlId
        )
        .then(res => {
          if (res.data.code == 0) {
            count++;
            this.handleLoad(3, count);
        //     this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
            return;
          }
          count++;
          this.handleLoad(3, count);
          this.meterChangeCount = res.data.data.meterChangedLogsVO.length;
          var data = res.data.data.meterChangedLogsVO;
          this.merters = [];
          if (data.length > 0) {
            for (var a of data) {
              this.merters.push([
                {
                  name: a.meter,
                  numone: 2
                },
                {
                  name: a.endtime
                },
                {
                  name: a.rate
                },
                {
                  name: a.pap1viewbefore
                },
                {
                  name: a.rap1viewbefore
                },
                {
                  name: a.prp1viewbefore
                },
                {
                  name: a.rrp1viewbefore
                },
                {
                  name: a.pap1viewafter
                },
                {
                  name: a.rap1viewafter
                },
                {
                  name: a.prp1viewafter
                },
                {
                  name: a.rrp1viewafter
                },
                {
                  name: a.lastrefreshtime
                }
              ]);
            }
            this.merterAll = this.merters;
          }
        })
        .catch(error => {
          count++;
          this.handleLoad(3, count);
          this.meterChangeCount = "加载失败";
        //   this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
        });
      this.$http
        .get(
          "/quotaService/quota/getCtptChangedLog?sign=" +
            sessionStorage.getItem("accessToken") +
            "&systemId=" +
            this.systemId +
            day +
            "&vlId=" +
            this.vlId
        )
        .then(res => {
          if (res.data.code == 0) {
            count++;
            this.handleLoad(3, count);
        //     this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
            return;
          }
          count++;
          this.handleLoad(3, count);
          this.ctptChangeCount = res.data.data.ctPtChangedLogs.length;
          var data = res.data.data.ctPtChangedLogs;
          this.ctpts = [];
          if (data.length > 0) {
            for (var a of data) {
              this.ctpts.push([
                {
                  name: a.meter,
                  numone: 2
                },
                {
                  name: a.occurTime
                },
                {
                  name: a.oldCt1
                },
                {
                  name: a.oldPt1
                },
                {
                  name: a.oldCt2
                },
                {
                  name: a.oldPt2
                },
                {
                  name: a.newCt1
                },
                {
                  name: a.newPt1
                },
                {
                  name: a.newCt2
                },
                {
                  name: a.newPt2
                },
                {
                  name: ""
                }
              ]);
            }
            this.ctptAll = this.ctpts;
          }
        })
        .catch(error => {
          count++;
          this.handleLoad(3, count);
          this.ctptChangeCount = "加载失败";
        //   this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
        });
    },
    changeDate() {
      this.isLoad = true;
      this.tbodys = [];
      this.inCount = 0;
      this.outCount = 0;
      this.allLoad();
    },
    toone() {
      var name = this.fullName.split("/")[0];
      var dy = this.fullName.split("/")[1];
      var { href } = this.$router.resolve({
        name: "/mxphpzl/one",
        path: "/mxphpzl/one",
        query: {
          sysId: this.$route.query.sysId,
          sonid: this.$route.query.sonid,
          substationId: this.$route.query.substationId,
          vlId: this.$route.query.vlId,
          name: name,
          dy: dy,
          bvId: this.$route.query.bvId,
          areaId:this.$route.query.systemId
        }
      });
      window.open(href, "_blank");
    },
    merterSousuo() {
      // if(this.merterName==""){
      //   alert("请输入关键词");
      //   return;
      // }
      if (!this.hasmeterscroll) {
        this.$nextTick(() => {
          let scroll3 = new BScroll(".scrollMeter", {
            scrollbar: { fade: false, interactive: true },
            preventDefault:false,
            mouseWheel: true
          });
        });
        this.hasmeterscroll = true;
      }
      this.merters = [];
      for (var a of this.merterAll) {
        if (a[0].name.indexOf(this.merterName) != -1) {
          this.merters.push(a);
        }
      }
    },
    ctptSousuo() {
      // if(this.ctptName==""){
      //   alert("请输入关键词");
      //   return;
      // }
      if (!this.hasctptscroll) {
        this.$nextTick(() => {
          let scroll3 = new BScroll(".scrollCtpt", {
            scrollbar: { fade: false, interactive: true },
            preventDefault:false,
            mouseWheel: true
          });
        });
        this.hasctptscroll = true;
      }

      this.ctpts = [];
      for (var a of this.ctptAll) {
        if (a[0].name.indexOf(this.ctptName) != -1) {
          this.ctpts.push(a);
        }
      }
    }
  },
  watch: {
    bidui: function() {
      this.tbodys = [];
      console.log(this.bidui);
      for (var a of this.data) {
        if (this.bidui == 1) {
          var infangan = a.inboundData2;
          var outfangan = a.outboundData2;
        }
        if (this.bidui == 2) {
          var infangan = a.inboundData3;
          var outfangan = a.outboundData3;
        }
        if (this.bidui == 3) {
          var infangan = a.inboundData4;
          var outfangan = a.outboundData4;
        }
        console.log(infangan);
        this.tbodys.push([
          {
            name: a.equipmentName,
            numone: 2
          },
          {
            name: a.rate,
            numone: 1
          },
          {
            name: a.startTariffInputValue,
            numone: 1
          },
          {
            name: a.endTariffInputValue,
            numone: 1
          },
          {
            name: a.inboundData1,
            numone: 1
          },
          {
            name: infangan,
            numone: 1
          },
          {
            name: a.startTariffOutputValue,
            numone: 1
          },
          {
            name: a.endTariffOutputValue,
            numone: 1
          },
          {
            name: a.outboundData1,
            numone: 1
          },
          {
            name: outfangan,
            numone: 1
          }
        ]);
      }
    },
    isShowm: function() {
      if (this.isShowm) {
        console.log(document.querySelector("#mingxi").style);
        document.querySelector("#mingxi").style.width =
          document.body.scrollWidth * 8 / 10 * 9 / 10 + "px";
        let myChart = echarts.init(document.getElementById("mingxi"), "dark");
        myChart.clear();
        var option = {
          /* title: {
                                text: "倍率",
                                textStyle:{color:"#84f1f1",fontSize:"16"},
                                x: "center",
                                y:"0"
                            },*/
          tooltip: {
            trigger: "axis", //item
            formatter: "{a} <br/>{b} : {c}"
          },
          /* legend: {
                                x: 'center',
                                y: "30" ,
                                data: ["倍率"]
                            },*/
          grid: {
            top: "16%",
            left: "3%",
            right: "8%",
            bottom: "5%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              name: "时间",
              splitLine: { show: true }, //false
              data: []
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "率(%)"
            }
          ],
          toolbox: {
            show: true,
            y: "4",
            feature: {
              mark: {
                show: true
              },
              dataView: {
                show: true,
                readOnly: true
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          series: [
            {
              name: "率",
              type: "line",
              data: []
            }
          ]
        };
        if (this.isRi) {
          var date =
            this.dayDate.split("-")[0] + "-" + this.dayDate.split("-")[1];
        } else {
          var date = this.dayDate;
        }
        this.$http
          .get(
            "/analysisService/analy/getBusbarLoss?sign=" +
              sessionStorage.getItem("accessToken") +
              "&vlId=" +
              this.$route.query.vlId +
              "&month=" +
              date
          )
          .then(res => {
            if (res.data.code == 0) {
        //       this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
              return;
            }
            console.log(res);
            var data = res.data.data.busbarLosses;
            for (var i = 0; i < data.length; i++) {
              var obj = new Object();
              var day_str = data[i].day;
              day_str = day_str.split("-")[2];
              if (day_str.split("0")[0] == "") {
                day_str = day_str.split("0")[1];
              }
              option.xAxis[0].data.push(day_str);
              var rate = data[i].value;
              option.series[0].data.push(rate);
            }
            console.log(option.series[0].data);
            myChart.setOption(option);
            var riqiarr = option.xAxis[0].data;
            var shujuarr = option.series[0].data;
            var day = new Date(date + "-01");
            var firstDay = day.getDay();
            this.tables = [];
            this.tables[0] = [];
            for (var i = 0; i < firstDay; i++) {
              this.tables[0].push(
                {
                  name: ""
                },
                { name: "" }
              );
            }
            console.log(firstDay);
            for (var i = 0; i < 7 - firstDay; i++) {
              this.tables[0].push(
                {
                  name: riqiarr[i]
                },
                { name: shujuarr[i], color: true }
              );
            }
            for (var i = 7 - firstDay; i < riqiarr.length; i += 7) {
              this.tables[this.tables.length] = [];
              for (var j = 0; j < 7; j++) {
                this.tables[this.tables.length - 1].push(
                  {
                    name: riqiarr[i + j]
                  },
                  {
                    name: shujuarr[i + j],
                    color: true
                  }
                );
              }
            }
            console.log(this.tables);
          });
      }
      if(!this.hasisShowm){
        let scroll3 = new BScroll(".scroll2", {
          scrollbar: { fade: false, interactive: true },
          preventDefault:false,
          mouseWheel: true
        });
        this.hasisShowm=true;
      }
    },
    isShowc: function() {
      if (!this.hasisShowc) {
        let scroll3 = new BScroll(".scrollCtpt", {
          scrollbar: { fade: false, interactive: true },
          preventDefault:false,
          mouseWheel: true
        });
        this.hasisShowc=true;
      }
    },
    isShowd: function() {
      if (!this.hasisShowd) {
        let scroll3 = new BScroll(".scrollMeter", {
          scrollbar: { fade: false, interactive: true },
          preventDefault:false,
          mouseWheel: true
        });
        this.hasisShowd=true;
      }
    }
  }
};
</script>
<style>
.jumpo {
  margin: 0;
}
.jumpo .gather_cover {
  margin: 0;
}
.jumpo .table_r td{
  text-align: left;
}
.jumpo .scroll2{
  position:relative;
  overflow:hidden;
  height:calc(100% - 36px);
}
</style>