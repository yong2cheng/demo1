<template>
  <div style="margin:0;border:0;" class="mxphl gather_cover">
      <div style="width:100%;margin:0;" class="gather_cover">
        <div class="bkbt">
          <h2>母线平衡率</h2>
          <div class="right">
                <button @click="selectMounth('this')" class="btn-small" :class="{btn_checked:tmounth=='this'}">当月</button>
            <button @click="selectMounth('pre')" class="btn-small" :class="{btn_checked:tmounth=='pre'}">上月</button>
          </div>
          
        </div>
        <!-- 平衡条数/总数 -->
          <div class="box1">
              <table class="table">
                  <thead>
                      <tr>
                          <th colspan="2">平衡条数/总数</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr :key="indexd" v-for="(item,indexd) in tbodys1">
                        <td :key="indexm" v-for="(child,indexm) in item" :colspan="child.numone" :rowspan="child.numtwo">{{child.name}}</td>
                    </tr>
                  </tbody>
              </table>
          </div>
          <!-- 地图 -->
          <div class="box2">
              <div id="dbl_map">

              </div>
          </div>
          <!-- 地区排名 -->
          <div class="box3 right">
              <table class="table">
                    <thead>
                        <tr>
                        <td>排名</td>
                        <td>城市</td>
                        <td>KPI</td>
                        </tr>
                    </thead>
              </table>
              <div style="position:relative;height:90%;overflow:hidden;" id="dq_pm">
                  <table class="table">
                    <tbody>
                        <tr :key="indexd" v-for="(item,indexd) in tbodys2">
                            <td :key="indexm" v-for="(child,indexm) in item" :colspan="child.numone" :rowspan="child.numtwo">{{child.name}}</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
          </div>
      </div>
      <!-- 母线平衡详情 -->
      <div style="padding:10px;box-sizing:border-box;margin:0;padding-top:20px;border-bottom:0;" class="box4 gather_cover">
            <div class="bkbt">
            <h2>母线平衡率详细</h2>
            <div class="right">
                <button @click="selectMounth('this')" class="btn-small" :class="{btn_checked:tmounth=='this'}">当月</button>
                <button @click="selectMounth('pre')" class="btn-small" :class="{btn_checked:tmounth=='pre'}">上月</button>
          </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <td colspan="16">
                            <span>各地区{{dayDate}}月份母线平衡明细</span>
                            <button class="right btn-small" @click="downloadBS()">下载</button>
                        </td>
                    </tr>
                    <tr>
                        <td rowspan="2">单位</td>
                        <td colspan="3">500kV</td>
                        <td colspan="3">220kV</td>
                        <td colspan="3">110kV</td>
                        <td colspan="3">35kV</td>
                        <td colspan="3">10kV</td>
                    </tr>
                    <tr>
                        <td>总条数</td>
                        <td>不平衡条数</td>
                        <td>占比(%)</td>
                        <td>总条数</td>
                        <td>不平衡条数</td>
                        <td>占比(%)</td>
                        <td>总条数</td>
                        <td>不平衡条数</td>
                        <td>占比(%)</td>
                        <td>总条数</td>
                        <td>不平衡条数</td>
                        <td>占比(%)</td>
                        <td>总条数</td>
                        <td>不平衡条数</td>
                        <td>占比(%)</td>
                    </tr>
                    <tr>
                        <td :key="index" v-for="(item,index) in theads3">{{item}}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="indexd" v-for="(item,indexd) in tbodys3">
                            <td @click="indexm==0?getDiquDetails(child.name,indexd,child.mrId,child.areaId):getdiyaDetails(child.bvId,child.type,child.areaId,child.areaName,child.clickable);" :class="{clickable:child.clickable}" :key="indexm" v-for="(child,indexm) in item">{{child.name}}</td>
                        </tr>
                </tbody>
            </table>
         </div>
         <!-- 点击地区弹框 -->
        <overlay class="diqu_t" style="min-height:500px;" oheight="60%" :close.sync="isShow">
            <div class="yiji_t" style="height:100%;padding:0 10px;box-sizing:border-box;">
              <div class="t_title"><span>{{diquName}}母线平衡率</span> </div> 
                <div style="height:50px;padding:10px;box-sizing:border-box;background:none;" class="t_Bullet">
                    <div style="text-align:right;">
                    厂站搜索:
                    <input v-model="inputName" type="text" class="txt"/>
                    <el-date-picker
                    type="month"
                    v-model="dayDated"
                    value-format="yyyy-MM"
                    placeholder="yyyy-MM">
                    </el-date-picker>
                    <button @click="getMain()">查询</button>
                 </div>
                </div>
               
                <div style="width:100%;height:calc(100% - 103px);">
                    <div style="width:25%;position:relative;overflow:hidden;height:100%;margin:0;box-sizing:border-box;background:none;" class="scrollf gather_cover">
                      <div style="height:36px;line-height:36px;">
                        <button class="btn-small" :class="{btn_checked:dqt=='hz'}" @click="dqt='hz'">汇总</button>
                        <button class="btn-small" :class="{btn_checked:dqt=='sjhz'}" @click="dqt='sjhz'">事件汇总</button>
                        <button class="btn-small" :class="{btn_checked:dqt=='whtj'}" @click="dqt='whtj'">维护统计</button>
                      </div>
                        <div style="height: calc(100% - 36px);">
                            <table v-if="dqt=='hz'" class="table">
                                <thead>
                                    <tr>
                                    <td>母线</td>
                                    <td>总数</td>
                                    <td>本月新增</td>
                                    <td>退役</td>
                                </tr>
                                </thead>
                            </table>
                            <div v-if="dqt=='hz'" class="hzScroll" style="height: calc(100% - 36px);position:relative;overflow:hidden;">
                              <table class="table">
                                <tbody>
                                    <tr :key="indexd" v-for="(item,indexd) in Summary">
                                      <td :key="indexm" v-for="(child,indexm) in item">{{child.name}}</td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                            <table v-if="dqt=='sjhz'" class="table">
                                <tbody>
                                    <tr>
                                        <td>电表轮换</td>
                                        <td>{{meterChanges}}</td>
                                    </tr>
                                    <tr>
                                        <td>CT/PT轮换</td>
                                        <td>{{ctptChanges}}</td>
                                    </tr>
                                    <tr>
                                        <td>旁路事件</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>数据编号</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table v-if="dqt=='whtj'" class="table">
                                <tr>
                                    <td></td>
                                    <td>总数</td>
                                    <td>待处理</td>
                                    <td>进行中</td>
                                    <td>已完成</td>
                                </tr>
                                <tr>
                                    <td>线路问题</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>现场问题</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                        
                    </div>
                    <div style="width:calc(75% - 5px);height:100%;margin:0;box-sizing:border-box;background:none;" class="gather_cover">
                        <div style="text-align:center;height:36px;line-height:36px;background:none;" class="bkbt">
                            <ul style="float:left;display:inline-block;vertical-align:top;margin-right:15px;">
                                <li style="float:left;margin-left:15px;" :key="index" v-for="(item,index) in bvList">
                                    <button class="btn-small" @click="changeDy(item.bvId,index)" :class="{btn_checked:index==checkBvid}">{{item.dydj}}kV</button>
                                </li>
                            </ul>
                            <div class="right">
                              指标>=
                              <select v-model="diquzhibiao" name="" id="">
                                  <option value="0">----</option>
                                  <option value="10">10%</option>
                                  <option value="5">5%</option>
                                  <option value="2">2%</option>
                                  <option value="1">1%</option>
                              </select>
                            </div>
                            
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <td colspan="3">厂站名称</td>
                                    <td colspan="1">电压等级</td>
                                    <td colspan="2">输入</td>
                                    <td colspan="2">输出</td>
                                    <td colspan="1">是否平衡</td>
                                    <td colspan="1">不平衡率(%)</td>
                                </tr>
                            </thead>
                        </table>
                        <div class="scroll" style="position:relative;height:calc(100% - 73px);overflow:hidden;">
                            <table class="table">
                            <tbody>
                                <tr v-if="mainList.length<=0">
                                  <td colspan="10">
                                    暂无数据
                                  </td>
                                </tr>
                                <tr :key="indexd" v-for="(item,indexd) in mainList">
                                    <td @click="child.isStation?toJumpo(child.isClick,child.substationId):toJumpt(child.isClick,child.vlId,child.fullName,child.substationId,child.bvId)" :class="{clickable:child.isClick}" :key="indexm" v-for="(child,indexm) in item" :rowspan="child.numtwo" :colspan="child.colspan">{{child.name}}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>

                    </div>
                </div>
                
            </div>
        </overlay>
        <!-- 点击数字弹框 -->
        <overlay style="min-height:500px;" oheight="60%"  :close.sync="isShowt">
            <div class="yiji_t" style="height:100%;padding:0 10px;box-sizing:border-box;">
              <div class="t_title">
                <span>{{sdiquName}}{{sdydj}}kV母线平衡明细</span>
                <button style="margin-top:3px;margin-right:5px;" class="t_right right" @click="downloadBD()">下载</button>
              </div>
                <table class="table">
                    <thead>
                        <tr>
                          <td style="height:50px;background:none;border:none;text-align:right;" class="t_Bullet" colspan="11">
                           
                            
                            <el-date-picker
                            type="month"
                            v-model="dayDatet"
                            value-format="yyyy-MM"
                            placeholder="yyyy-MM">
                            </el-date-picker>
                            <button @click="changeTime()">查询</button>
                            
                          </td>
                        </tr>
                        <tr>
                            <td colspan="1">序号</td>
                            <td colspan="3" style="position: relative;">母线
                                <div class="common_sort">
                                  <span class="positive_sequence" @click="orderColumn='name';direction=1;getdiyaDetails(szBvId,szType,areaId,sdiquName,clickabled)"></span>
                                  <span class="reverse_order" @click="orderColumn='name';direction=0;getdiyaDetails(szBvId,szType,areaId,sdiquName,clickabled)"></span>
                                </div>
                            </td>
                            <td colspan="2" style="position: relative;">输入
                                <div class="common_sort">
                                  <span class="positive_sequence" @click="orderColumn='inputValue';direction=1;getdiyaDetails(szBvId,szType,areaId,sdiquName,clickabled)"></span>
                                  <span class="reverse_order" @click="orderColumn='inputValue';direction=0;getdiyaDetails(szBvId,szType,areaId,sdiquName,clickabled)"></span>
                                </div>
                            </td>
                            <td colspan="2" style="position: relative;">输出
                                <div class="common_sort">
                                  <span class="positive_sequence" @click="orderColumn='outputValue';direction=1;getdiyaDetails(szBvId,szType,areaId,sdiquName,clickabled)"></span>
                                  <span class="reverse_order" @click="orderColumn='outputValue';direction=0;getdiyaDetails(szBvId,szType,areaId,sdiquName,clickabled)"></span>
                                </div>
                            </td>
                            <td colspan="1" style="position: relative;">是否平衡
                                <div class="common_sort">
                                  <span class="positive_sequence" @click="orderColumn='balanceConvert';direction=1;getdiyaDetails(szBvId,szType,areaId,sdiquName,clickabled)"></span>
                                  <span class="reverse_order" @click="orderColumn='balanceConvert';direction=0;getdiyaDetails(szBvId,szType,areaId,sdiquName,clickabled)"></span>
                                </div>
                            </td>
                            <td colspan="2">不平衡率(%)<select v-model="zhibiaot" name="" id="">
                                <option value="0">----</option>
                                <option value="10">>=10%</option>
                                <option value="5">>=5%</option>
                                <option value="2">>=2%</option>
                                <option value="1">>=1%</option>
                            </select></td>
                        </tr>
                    </thead>
                </table>
                <div v-if="isShowt" class="scroll2" style="position:relative;width:100%;height:calc(100% - 138px);overflow:hidden;border:1px solid #0d7474;">
                    <table class="table">
                        <tbody>
                            <tr>
                              <td v-if="mainListt.length<=0" colspan="11">暂无数据</td>
                            </tr>
                            <tr :key="indexd" v-for="(item,indexd) in mainListt">
                                <td @click="toJumpt(child.isClick,child.vlId,child.name,child.substationId,child.bvId)" :class="{clickable:child.isClick}" :key="indexm" v-for="(child,indexm) in item" :colspan="child.colspan">{{child.name}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </overlay>
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
import $areaId from "../../../assets/config/areaMap";
import $bvId from "../../../assets/config/bvidMap";
import overlay from "@/components/common/overlay";
import BScroll from "better-scroll";
export default {
  data: function() {
    return {
      tbodys1: [],
      tbodys2: [],
      dayDate: this.$day().format("YYYY-MM"),
      theads3: [],
      tbodys3: [],
      isHidden: false, //控制排名加载前的（加载中）
      mounth: this.$day().format("YYYY-MM"),
      tmounth: "this",
      isShow: false, //控制点击地区弹框
      isShowt: false, //控制点击数字弹框
      //   点击地区弹框
      diquName: "",
      Summary: [], //汇总
      bvList: [],
      mainListAll: [],
      mainList: [],
      checkBvid: 0,
      areaId: "",
      mrId: "",
      bvId: "",
      dayDated: "",
      inputName: "",
      diquzhibiao: 0,
      ctptChanges: 0, //CT/PT轮换次数
      meterChanges: 0, //电表轮换次数
      //点击数字弹框
      sdydj: "",
      sdiquName: "",
      mainListt: [],
      dayDatet: "",
      zhibiaot: 0,
      isLoading: true,
      dqt: "hz",
      clickabled: "",
      orderColumn: "name",
      direction: 0,
      hzScroll: ""
    };
  },
  components: {
    overlay
  },
  mounted: function() {
    this.dayDated = this.dayDate;
    this.dayDatet = this.dayDate;
    this.allLoad();
    this.$nextTick(() => {
      let scroll = new BScroll(".scroll", {
        scrollbar: { fade: false, interactive: true },
        preventDefault: false,
        mouseWheel: true
      });
      this.hzScroll = new BScroll(".hzScroll", {
        scrollbar: { fade: false, interactive: true },
        preventDefault: false,
        mouseWheel: true
      });
      // let scrollf = new BScroll(".scrollf", {
      //   scrollbar: { fade: false, interactive: true },
      //   mouseWheel: true
      // });
      let scroll1 = new BScroll("#dq_pm", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        preventDefault: false,
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
      // 加载地图
      var mapdbl = echarts.init(document.getElementById("dbl_map"), "dark");
      var chart = {
        title: {
          text: "地区达标率情况",
          textStyle: { color: "#84f1f1", fontSize: "16" },
          x: "5",
          y: "3"
        },
        tooltip: {
          trigger: "item"
        },
        /*legend: {
                    orient: 'vertical',
                    x:'right',
                    data:['地区达标率']
                },*/

        dataRange: {
          x: "left",
          y: "35",
          textStyle: { color: "#fff" },
          show: true, //显示设参数true false
          splitList: [
            { start: 95, color: "#2ff1b9" },
            { start: 80, end: 95, color: "#33abd3" },
            { start: 60, end: 80, color: "#efe52e" },
            { start: 40, end: 60, color: "#d96304" },
            { end: 40, color: "#d9042b" }
          ],
          color: ["#E0022B", "#E09107", "#A3E00B"]
        },
        series: [
          {
            name: "地区达标率(%)",
            type: "map",
            map: "湖北",
            x: "25%",
            y: "50",
            selectedMode: "single",
            label: {
              normal: {
                show: true, //显示省份标签
                textStyle: { color: "#000" }, //省份标签字体颜色
                x: "5%"
              },
              emphasis: {
                //对应的鼠标悬浮效果
                show: true,
                textStyle: { color: "#000" }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 1, //区域边框宽度
                borderColor: "#fff" //区域边框颜色
                //  areaColor:"#ffdead",//区域颜色
              },
              emphasis: {
                borderWidth: 1,
                borderColor: false, //边框颜色
                areaColor: false
              }
            },
            data: []
          }
        ]
      };

      // 指定的配置项和数据显示图表。
      mapdbl.setOption(chart);
      //   加载平衡条数/总数和加载母线平衡率详细
      this.$http
        .get(
          "/quotaService/quota/getBusbarSummary?sign=" +
            sessionStorage.getItem("accessToken") +
            "&month=" +
            this.mounth
        )
        .then(res => {
          if (res.data.code == 1) {
            console.log(res);
            count++;
            this.handleLoad(2, count);
            var data = res.data.data.voltageBusbarSummaries;
            var data2 = res.data.data.busbarSummaries;
            for (var a of data2) {
              var value =
                ((a.totalCount - a.unbalanceCount) / a.totalCount).toFixed(2) *
                100;
              chart.series[0].data.push({ name: a.areaName, value: value });
            }
            mapdbl.setOption(chart);
            this.theads3 = ["合计"];
            //||a.bvId==10||a.bvId==12||a.bvId==14||a.bvId==18
            var has = false;
            for (var i = 0; i < data.length; i++) {
              var a = data[i];
              if (a.bvId == 6) {
                has = true;
                this.tbodys1.push([
                  {
                    name: a.baseVoltage,
                    numone: 1,
                    numtwo: 1
                  },
                  {
                    name: a.balCount + "条/" + a.configCount + "条",
                    numone: 1,
                    numtwo: 1
                  }
                ]);
                this.theads3.push(a.count);
                this.theads3.push(a.unBalCount);
                this.theads3.push(a.unBalRate);
              }
            }
            if (i == data.length && has == false) {
              this.theads3.push("-");
              this.theads3.push("-");
              this.theads3.push("-");
            }
            has = false;
            for (var i = 0; i < data.length; i++) {
              var a = data[i];
              if (a.bvId == 10) {
                has = true;
                this.tbodys1.push([
                  {
                    name: a.baseVoltage,
                    numone: 1,
                    numtwo: 1
                  },
                  {
                    name: a.balCount + "条/" + a.configCount + "条",
                    numone: 1,
                    numtwo: 1
                  }
                ]);
                this.theads3.push(a.count);
                this.theads3.push(a.unBalCount);
                this.theads3.push(a.unBalRate);
              }
            }
            if (i == data.length && has == false) {
              this.theads3.push("-");
              this.theads3.push("-");
              this.theads3.push("-");
            }
            has = false;
            for (var i = 0; i < data.length; i++) {
              var a = data[i];
              if (a.bvId == 12) {
                has = true;
                this.tbodys1.push([
                  {
                    name: a.baseVoltage,
                    numone: 1,
                    numtwo: 1
                  },
                  {
                    name: a.balCount + "条/" + a.configCount + "条",
                    numone: 1,
                    numtwo: 1
                  }
                ]);
                this.theads3.push(a.count);
                this.theads3.push(a.unBalCount);
                this.theads3.push(a.unBalRate);
              }
            }
            if (i == data.length && has == false) {
              this.theads3.push("-");
              this.theads3.push("-");
              this.theads3.push("-");
            }
            has = false;
            for (var i = 0; i < data.length; i++) {
              var a = data[i];
              if (a.bvId == 14) {
                has = true;
                this.tbodys1.push([
                  {
                    name: a.baseVoltage,
                    numone: 1,
                    numtwo: 1
                  },
                  {
                    name: a.balCount + "条/" + a.configCount + "条",
                    numone: 1,
                    numtwo: 1
                  }
                ]);
                this.theads3.push(a.count);
                this.theads3.push(a.unBalCount);
                this.theads3.push(a.unBalRate);
              }
            }
            if (i == data.length && has == false) {
              this.theads3.push("-");
              this.theads3.push("-");
              this.theads3.push("-");
            }
            has = false;
            for (var i = 0; i < data.length; i++) {
              var a = data[i];
              if (a.bvId == 18) {
                has = true;
                this.tbodys1.push([
                  {
                    name: a.baseVoltage,
                    numone: 1,
                    numtwo: 1
                  },
                  {
                    name: a.balCount + "条/" + a.configCount + "条",
                    numone: 1,
                    numtwo: 1
                  }
                ]);
                this.theads3.push(a.count);
                this.theads3.push(a.unBalCount);
                this.theads3.push(a.unBalRate);
              }
            }
            if (i == data.length && has == false) {
              this.theads3.push("-");
              this.theads3.push("-");
              this.theads3.push("-");
            }
            if (sessionStorage.getItem("systemId") != undefined) {
              for (var a of $areaId) {
                if (sessionStorage.getItem("systemId") == a.areaId) {
                  var areaIdarr = [a];
                }
              }
            } else {
              var areaIdarr = $areaId;
            }
            for (var a of areaIdarr) {
              this.tbodys3.push([
                {
                  name: a.areaName,
                  clickable: true,
                  mrId: a.mrId,
                  areaId: a.areaId,
                  type: "diqu"
                }
              ]);
              var arr = [[], [], [], [], []];
              for (var b of data2) {
                if (a.areaId == b.areaId) {
                  //500kV
                  arr[0].push({
                    name: b.configCount500,
                    clickable: true && b.configCount500 != 0,
                    diya: "500kV",
                    newCount: b.newCount500,
                    retireCount: b.retireCount500,
                    areaId: a.areaId,
                    type: 1,
                    areaName: a.areaName,
                    bvId: 6
                  });
                  arr[0].push({
                    name: b.unbalance500,
                    bvId: 6,
                    type: 3,
                    areaId: a.areaId,
                    areaName: a.areaName
                  });
                  // if (b.configCount500 == 0 || b.configCount500 == null) {
                  //   var bfb = 0;
                  // } else {
                  //   var bfb = parseFloat(
                  //     (b.unbalance500 / b.configCount500 * 100).toFixed(2)
                  //   );
                  // }
                  arr[0].push({ name: b.rate500, clickable: false });

                  //220kV
                  arr[1].push({
                    name: b.configCount220,
                    clickable: true && b.configCount220 != 0,
                    diya: "220kV",
                    newCount: b.newCount220,
                    retireCount: b.retireCount220,
                    areaId: a.areaId,
                    type: 1,
                    areaName: a.areaName,
                    bvId: 10
                  });
                  arr[1].push({
                    name: b.unbalance220,
                    bvId: 10,
                    type: 3,
                    areaId: a.areaId,
                    areaName: a.areaName
                  });
                  // if (b.configCount220 == 0 || b.configCount220 == null) {
                  //   var bfb = 0;
                  // } else {
                  //   var bfb = parseFloat(
                  //     (b.unbalance220 / b.configCount220 * 100).toFixed(2)
                  //   );
                  // }
                  arr[1].push({ name: b.rate220, clickable: false });
                  //110kV

                  arr[2].push({
                    name: b.configCount110,
                    clickable: true && b.configCount110 != 0,
                    diya: "110kV",
                    newCount: b.newCount110,
                    retireCount: b.retireCount110,
                    areaId: a.areaId,
                    type: 1,
                    areaName: a.areaName,
                    bvId: 12
                  });
                  arr[2].push({
                    name: b.unbalance110,
                    bvId: 12,
                    type: 3,
                    areaId: a.areaId,
                    areaName: a.areaName
                  });
                  // if (b.configCount110 == 0 || b.configCount110 == null) {
                  //   var bfb = 0;
                  // } else {
                  //   var bfb = parseFloat(
                  //     (b.unbalance110 / b.configCount110 * 100).toFixed(2)
                  //   );
                  // }
                  arr[2].push({ name: b.rate110, clickable: false });
                  //35kV

                  arr[3].push({
                    name: b.configCount35,
                    clickable: true && b.configCount35 != 0,
                    diya: "35kV",
                    newCount: b.newCount35,
                    retireCount: b.retireCount35,
                    areaId: a.areaId,
                    type: 1,
                    areaName: a.areaName,
                    bvId: 14
                  });
                  arr[3].push({
                    name: b.unbalance35,
                    bvId: 14,
                    type: 3,
                    areaId: a.areaId,
                    areaName: a.areaName
                  });
                  // if (b.configCount35 == 0 || b.configCount35 == null) {
                  //   var bfb = 0;
                  // } else {
                  //   var bfb = parseFloat(
                  //     (b.unbalance35 / b.configCount35 * 100).toFixed(2)
                  //   );
                  // }
                  arr[3].push({ name: b.rate35, clickable: false });
                  //10kV

                  arr[4].push({
                    name: b.configCount10,
                    clickable: true && b.configCount10 != 0,
                    diya: "10kV",
                    newCount: b.newCount10,
                    retireCount: b.retireCount10,
                    areaId: a.areaId,
                    type: 1,
                    areaName: a.areaName,
                    bvId: 18
                  });
                  arr[4].push({
                    name: b.unbalance10,
                    bvId: 18,
                    type: 3,
                    areaId: a.areaId,
                    areaName: a.areaName
                  });
                  // if (b.configCount10 == 0 || b.configCount10 == null) {
                  //   var bfb = 0;
                  // } else {
                  //   var bfb = parseFloat(
                  //     (b.unbalance10 / b.configCount10 * 100).toFixed(2)
                  //   );
                  // }
                  arr[4].push({ name: b.rate10, clickable: false });
                }
              }
              for (var c in arr) {
                if (arr[c].length > 0) {
                  for (var d of arr[c]) {
                    this.tbodys3[this.tbodys3.length - 1].push(d);
                  }
                } else {
                  if (c == 0) {
                    var diya = "500kV";
                  }
                  if (c == 1) {
                    var diya = "220kV";
                  }
                  if (c == 2) {
                    var diya = "110kV";
                  }
                  if (c == 3) {
                    var diya = "35kV";
                  }
                  if (c == 4) {
                    var diya = "10kV";
                  }
                  this.tbodys3[this.tbodys3.length - 1].push({
                    name: "",
                    diya: diya,
                    newCount: "",
                    retireCount: ""
                  });
                  this.tbodys3[this.tbodys3.length - 1].push({ name: "" });
                  this.tbodys3[this.tbodys3.length - 1].push({ name: "" });
                }
              }
            }
            console.log(this.tbodys3);
          } else {
            count++;
            this.handleLoad(2, count);
            // this.$notify.error({
            //   title: "错误",
            //   message: "系统错误（code==0）"
            // });
          }
        })
        .catch(error => {
          count++;
          this.handleLoad(2, count);
        });

      // 加载地区排名
      this.$http
        .get(
          "/maintenanceService/areaRankServiceApi/getAreaRankToday?date=" +
            this.dayDate +
            "&sign=" +
            sessionStorage.getItem("accessToken")
        )
        .then(res => {
          if (res.data.code == 1) {
            count++;
            this.handleLoad(2, count);
            console.log(result);
            var result = res.data;
            var arr = [];
            var arr2 = [];
            var sc = result.data.allScoringSystems;
            for (var dd of sc) {
              if (arr.indexOf(dd.systemId) == -1) {
                arr.push(dd.systemId);
                arr2[dd.systemId] = [dd.rank, dd.score.toFixed(2)];
              }
            }
            console.log(arr2);
            var arr3 = [];
            for (var i in arr2) {
              for (var dd of $areaId) {
                if (dd.areaId == i) {
                  arr3.push([dd.areaName, arr2[i]]);
                }
              }
            }
            console.log(arr3);
            var arr4 = [];
            for (var rank of arr3) {
              arr4[rank[1][0]] = [rank[0], rank[1][1]];
            }
            for (var i = 1; i < arr4.length; i++) {
              this.tbodys2.push([
                {
                  name: i,
                  numone: 1,
                  numtwo: 1
                },
                {
                  name: arr4[i][0],
                  numone: 1,
                  numtwo: 1
                },
                {
                  name: arr4[i][1],
                  numone: 1,
                  numtwo: 1
                }
              ]);
            }
          } else {
            count++;
            this.handleLoad(2, count);
            // this.$notify.error({
            //   title: "错误",
            //   message: "系统错误（code==0）"
            // });
          }
        });
    },
    downloadBS() {
      this.$http
        .get(
          "/quotaService/quota/outBusbarSummary?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&type=1&month=" +
            this.mounth
        )
        .then(res => {
          window.location = res.request.responseURL;
        });
    },
    selectMounth(mth) {
      if (this.tmounth != mth) {
        if (mth == "this") {
          this.dayDate = this.$day().format("YYYY-MM");
        } else {
          this.dayDate = this.$day()
            .add(-1, "month")
            .format("YYYY-MM");
        }
        this.dayDated = this.dayDate;
        this.dayDatet = this.dayDate;
        this.tbodys1 = [];
        this.tbodys2 = [];
        this.theads3 = [];
        this.tbodys3 = [];
        this.isHidden = false;
        this.mounth = this.dayDate;
        this.tmounth = mth;
      }
    },
    //   点击地区弹框
    getDiquDetails(name, indexd, mrId, areaId) {
      console.log("check");
      this.checkBvid = 0;
      this.areaId = areaId;
      this.mrId = mrId;
      this.isShow = true;

      this.diquName = name;
      this.getMain(true);
    },
    getMain(xin) {
      //   for(var a of $areaId){
      //       if(this.mrid==a.mrid){
      //           var areaId=a.areaId;
      //       }
      //   }
      //获取汇总
      if (xin) {
        this.inputName = "";
      }
      this.$http
        .get(
          "/quotaService/quota/getBusbarSummary?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&month=" +
            this.dayDated
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            // this.$notify.error({
            //   title: "错误",
            //   message: "系统错误（code==0）"
            // });
            return;
          }
          var data = res.data.data.busbarSummaries;
           var data1 = res.data.data.busbarSummaryVOList;
          var data2 = [],dataobj = {}
          this.Summary = [];
          console.log(this.areaId)
          for(var a of data1) {
            if (a.areaId == this.areaId) {
              data2.push(a)
            }
          }
          console.log(data2)
          for (var i in data2) {
            for (var a of $bvId) {
              if (data2[i].bvId == a.bvId) {
                dataobj[a.bvId] = a.dydj+"KV"
                this.Summary.push([
                  {
                    name: a.dydj+"kV"
                  },
                  {
                    name: data2[i].totalCount
                  },
                  {
                    name: data2[i].newCount
                  },
                  {
                    name: data2[i].retireCount
                  }
                ])
              }
            }
          }
          console.log(this.Summary)
          // for (var a of data) {
          //   if (a.areaId == this.areaId) {
          //     this.Summary.push(
          //       [
          //         {
          //           name: "1000kV"
          //         },
          //         {
          //           name: a.total1000
          //         },
          //         {
          //           name: a.newCount1000
          //         },
          //         {
          //           name: a.retireCount1000
          //         }
          //       ],
          //       [
          //         {
          //           name: "750kV"
          //         },
          //         {
          //           name: a.total750
          //         },
          //         {
          //           name: a.newCount750
          //         },
          //         {
          //           name: a.retireCount750
          //         }
          //       ],
          //       [
          //         {
          //           name: "500kV"
          //         },
          //         {
          //           name: a.total500
          //         },
          //         {
          //           name: a.newCount500
          //         },
          //         {
          //           name: a.retireCount500
          //         }
          //       ],
          //       [
          //         {
          //           name: "330kV"
          //         },
          //         {
          //           name: a.total330
          //         },
          //         {
          //           name: a.newCount330
          //         },
          //         {
          //           name: a.retireCount330
          //         }
          //       ],
          //       [
          //         {
          //           name: "220kV"
          //         },
          //         {
          //           name: a.total220
          //         },
          //         {
          //           name: a.newCount220
          //         },
          //         {
          //           name: a.retireCount220
          //         }
          //       ],
          //       [
          //         {
          //           name: "110kV"
          //         },
          //         {
          //           name: a.total110
          //         },
          //         {
          //           name: a.newCount110
          //         },
          //         {
          //           name: a.retireCount110
          //         }
          //       ],
          //       [
          //         {
          //           name: "35kV"
          //         },
          //         {
          //           name: a.total35
          //         },
          //         {
          //           name: a.newCount35
          //         },
          //         {
          //           name: a.retireCount35
          //         }
          //       ],
          //       [
          //         {
          //           name: "10kV"
          //         },
          //         {
          //           name: a.total10
          //         },
          //         {
          //           name: a.newCount10
          //         },
          //         {
          //           name: a.retireCount10
          //         }
          //       ]
          //     );
          //   }
          // }
          console.log(this.Summary);
        });
      //获取电表轮换次数
      var count = 0;
      this.isLoading = true;
      this.$http
        .get(
          "/quotaService/quota/getMeterChangedLog?sign=" +
            sessionStorage.getItem("accessToken") +
            "&systemId=" +
            this.areaId +
            "&month=" +
            this.dayDated
        )
        .then(res => {
          if (res.data.code == 0) {
            count++;
            this.handleLoad(4, count);
            // this.$notify.error({
            //   title: "错误",
            //   message: "系统错误（code==0）"
            // });
            return;
          }
          count++;
          this.handleLoad(4, count);
          this.meterChanges = res.data.data.meterChangedLogsVO.length;
        })
        .catch(error => {
          count++;
          this.handleLoad(4, count);
          // this.$notify.error({
          //   title: "错误",
          //   message: "系统错误（error）"
          // });
        });
      //获取CT/PT轮换次数
      this.$http
        .get(
          "/quotaService/quota/getCtptChangedLog?sign=" +
            sessionStorage.getItem("accessToken") +
            "&systemId=" +
            this.areaId +
            "&month=" +
            this.dayDated
        )
        .then(res => {
          if (res.data.code == 0) {
            count++;
            this.handleLoad(4, count);
            // this.$notify.error({
            //   title: "错误",
            //   message: "系统错误（code==0）"
            // });
            return;
          }
          count++;
          this.handleLoad(4, count);
          this.ctptChanges = res.data.data.ctPtChangedLogs.length;
        })
        .catch(error => {
          count++;
          this.handleLoad(4, count);
          // this.$notify.error({
          //   title: "错误",
          //   message: "系统错误（error）"
          // });
        });
      this.$http
        .get(
          "/treeService/tree/getAllBaseVoltageTreeNodeBySystemId?sign=" +
            sessionStorage.getItem("accessToken") +
            "&systemId=" +
            this.areaId
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            count++;
            this.handleLoad(4, count);
            // this.$notify.error({
            //   title: "错误",
            //   message: "系统错误（code==0）"
            // });
            return;
          }
          count++;
          this.handleLoad(4, count);
          var data = res.data.data.allSubStations;
          for (var i in data) {
            for (var a of $bvId) {
              if (data[i].id == a.bvId) {
                data[i] = { bvId: a.bvId, dydj: a.dydj };
              }
            }
          }
          this.bvList = data;
          if (this.bvId == "" || xin) {
            this.bvId = data[0].bvId;
          }
          console.log(data);
          this.$http
            .get(
              "/quotaService/quota/getBusbarDetail?appkey=3917230828&sign=" +
                sessionStorage.getItem("accessToken") +
                "&month=" +
                this.dayDated +
                "&systemId=" +
                this.areaId +
                "&type=1&substationBvId=" +
                this.bvId
            )
            .then(res => {
              if (res.data.code == 0) {
                count++;
                this.handleLoad(4, count);
                // this.$notify.error({
                //   title: "错误",
                //   message: "系统错误（code==0）"
                // });
                return;
              }
              count++;
              this.handleLoad(4, count);
              console.log(res);
              var data = res.data.data.busbarDetailVO;
              this.mainListAll = data;
              this.mainList = [];
              if (data.length > 0) {
                var arr = [];
                var arr2 = [];
                var index;
                var i;
                var dydj;
                for (var a of data) {
                  for (var b of $bvId) {
                    if (a.bvId == b.bvId) {
                      dydj = b.dydj;
                    }
                  }
                  if (a.rate != undefined && a.rate != null) {
                    var rate = a.rate.toFixed(2);
                  } else {
                    var rate = "";
                  }
                  if (
                    rate == "" ||
                    (rate != "" && Math.abs(rate) >= this.diquzhibiao)
                  ) {
                    if (
                      a.substationName.indexOf(this.inputName) != -1 ||
                      this.inputName == null ||
                      this.inputName == ""
                    ) {
                      if (arr2.indexOf(a.substationId) == -1) {
                        arr2.push(a.substationId);
                        if (arr.length > 0) {
                          arr[index][0].numtwo = i;
                        }
                        i = 1;
                        index = arr.length;
                        arr.push([
                          {
                            name: a.substationName,
                            numtwo: 1,
                            bvId: a.bvId,
                            substationId: a.substationId,
                            isStation: true,
                            isClick: true,
                            colspan: 3
                          },
                          {
                            name: dydj + "kV",
                            numtwo: 1,
                            bvId: a.bvId,
                            vlId: a.vlId,
                            substationId: a.substationId,
                            fullName: a.name,
                            isClick: false,
                            colspan: 1
                          },
                          {
                            name: a.inputValue,
                            numtwo: 1,
                            isClick: false,
                            colspan: 2
                          },
                          {
                            name: a.outputValue,
                            numtwo: 1,
                            isClick: false,
                            colspan: 2
                          },
                          {
                            name: a.balanceConvert,
                            numtwo: 1,
                            isClick: false,
                            colspan: 1
                          },
                          {
                            name: rate,
                            numtwo: 1,
                            isClick: false,
                            colspan: 1
                          }
                        ]);
                      } else {
                        i++;
                        arr.push([
                          {
                            name: dydj + "kV",
                            numtwo: 1,
                            vlId: a.vlId,
                            bvId: a.bvId,
                            substationId: a.substationId,
                            fullName: a.name,
                            isClick: false,
                            colspan: 1
                          },
                          {
                            name: a.inputValue,
                            numtwo: 1,
                            isClick: false,
                            colspan: 2
                          },
                          {
                            name: a.outputValue,
                            numtwo: 1,
                            isClick: false,
                            colspan: 2
                          },
                          {
                            name: a.balanceConvert,
                            numtwo: 1,
                            isClick: false,
                            colspan: 1
                          },
                          {
                            name: rate,
                            numtwo: 1,
                            isClick: false,
                            colspan: 1
                          }
                        ]);
                      }
                    }
                  }
                }
                if (arr.length > 0) {
                  arr[index][0].numtwo = i;
                  this.mainList = arr;
                } else {
                  this.mainList = arr;
                }

                console.log(this.mainListAll);
              }
            })
            .catch(error => {
              count++;
              this.handleLoad(4, count);
              // this.$notify.error({
              //   title: "错误",
              //   message: "系统错误（error）"
              // });
            });
        })
        .catch(error => {
          count++;
          this.handleLoad(4, count);
          // this.$notify.error({
          //   title: "错误",
          //   message: "系统错误（error）"
          // });
        });
    },
    changeDy(bvId, index) {
      this.checkBvid = index;
      this.bvId = bvId;
      this.getMain();
    },
    toJumpo(isClick, substationId) {
      if (isClick) {
        var { href } = this.$router.resolve({
          name: "/mxphl/jumpo",
          path: "/mxphl/jumpo",
          query: {
            sysId: this.$route.query.sysId,
            sonid: this.$route.query.sonid,
            stId: substationId,
            date: this.dayDated
          }
        });
        window.open(href, "_blank");
      }
    },
    toJumpt(isClick, vlId, name, substationId, bvId) {
      if (isClick) {
        //this.$router.push('/mxphl/jumpt?'+this.$route.fullPath.split('?')[1]+"&vlId="+vlId+"&systemId="+this.areaId+"&name="+name+"&date="+this.dayDated);
        var { href } = this.$router.resolve({
          name: "/mxphl/jumpt",
          path: "/mxphl/jumpt",
          query: {
            sysId: this.$route.query.sysId,
            sonid: this.$route.query.sonid,
            vlId: vlId,
            systemId: this.areaId,
            name: name,
            date: this.dayDated,
            substationId: substationId,
            bvId: bvId
          }
        });
        window.open(href, "_blank");
      }
    },
    //点击数字弹框
    getdiyaDetails(bvId, type, areaId, areaName, clickable) {
      this.clickabled = clickable;
      if (clickable) {
        this.isShowt = true;
        this.isLoading = true;
        this.$nextTick(() => {
          let scroll2 = new BScroll(".scroll2", {
            scrollbar: {
              fade: false,
              interactive: true
            },
            preventDefault: false,
            mouseWheel: true
          });
        });
        this.areaId = areaId;
        for (var a of $bvId) {
          if (bvId == a.bvId) {
            this.sdydj = a.dydj;
          }
        }
        this.sdiquName = areaName;
        this.szBvId = bvId;
        this.szType = type;
        this.$http
          .get(
            "/quotaService/quota/getBusbarDetailPage?appkey=3917230828&sign=" +
              sessionStorage.getItem("accessToken") +
              "&month=" +
              this.dayDatet +
              "&systemId=" +
              this.areaId +
              "&bvId=" +
              this.szBvId +
              "&type=4" +
              "&orderColumn=" +
              this.orderColumn +
              "&direction=" +
              this.direction
          )
          .then(res => {
            if (res.data.code == 0) {
              this.isLoading = false;
              // this.$notify.error({
              //   title: "错误",
              //   message: "系统错误（code==0）"
              // });
              return;
            }
            this.isLoading = false;
            console.log(res);
            var data = res.data.data.busbarDetailVO;
            this.mainListt = [];
            for (var i in data) {
              var a = data[i];
              if (a.rate == undefined || a.rate == null) {
                var b = "";
              } else {
                var b = a.rate.toFixed(2);
              }
              this.mainListt.push([
                {
                  name: i - -1,
                  isClick: false,
                  colspan: 1
                },
                {
                  name: a.name,
                  isClick: true,
                  vlId: a.vlId,
                  bvId: a.bvId,
                  substationId: a.substationId,
                  colspan: 3
                },
                {
                  name: a.inputValue,
                  isClick: false,
                  colspan: 2
                },
                {
                  name: a.outputValue,
                  isClick: false,
                  colspan: 2
                },
                {
                  name: a.balanceConvert,
                  isClick: false,
                  colspan: 1
                },
                {
                  name: b,
                  isClick: false,
                  colspan: 2
                }
              ]);
            }
          })
          .catch(error => {
            this.isLoading = false;
            // this.$notify.error({
            //   title: "错误",
            //   message: "系统错误（error）"
            // });
          });
      }
    },
    //改变时间
    changeTime() {
      this.isLoading = true;
      this.$http
        .get(
          "/quotaService/quota/getBusbarDetailPage?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&month=" +
            this.dayDatet +
            "&systemId=" +
            this.areaId +
            "&bvId=" +
            this.szBvId +
            "&type=" +
            this.szType +
            "&orderColumn=" +
            this.orderColumn +
            "&direction=" +
            this.direction
        )
        .then(res => {
          if (res.data.code == 0) {
            this.isLoading = false;
            // this.$notify.error({
            //   title: "错误",
            //   message: "系统错误（code==0）"
            // });
            return;
          }
          this.isLoading = false;
          console.log(res);
          var data = res.data.data.busbarDetailVO;
          this.mainListt = [];
          for (var i in data) {
            var a = data[i];
            if (a.rate == undefined || a.rate == null) {
              var b = "";
            } else {
              var b = a.rate.toFixed(2);
            }
            if (b == "" || (b != "" && Math.abs(b) >= this.zhibiaot)) {
              this.mainListt.push([
                {
                  name: this.mainListt.length - -1,
                  isClick: false
                },
                {
                  name: a.name,
                  isClick: true,
                  vlId: a.vlId,
                  bvId: a.bvId,
                  substationId: a.substationId,
                  colspan: 3
                },
                {
                  name: a.inputValue,
                  isClick: false,
                  colspan: 2
                },
                {
                  name: a.outputValue,
                  isClick: false,
                  colspan: 2
                },
                {
                  name: a.balanceConvert,
                  isClick: false
                },
                {
                  name: b,
                  isClick: false,
                  colspan: 2
                }
              ]);
            }
          }
        })
        .catch(error => {
          this.isLoading = false;
          // this.$notify.error({
          //   title: "错误",
          //   message: "系统错误（error）"
          // });
        });
    },
    downloadBD() {
      this.$http
        .get(
          "/quotaService/quota/outBusbarDetail?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&month=" +
            this.dayDatet +
            "&areaId=" +
            this.areaId +
            "&bvId=" +
            this.szBvId +
            "&type=" +
            this.szType
        )
        .then(res => {
          window.location = res.request.responseURL;
        });
    }
  },
  watch: {
    mounth: function() {
      this.allLoad();
    },
    diquzhibiao: function() {
      var data = this.mainListAll;
      console.log(this.diquzhibiao);
      if (data.length > 0) {
        var arr = [];
        var arr2 = [];
        var index;
        var i;
        var dydj;
        for (var a of data) {
          for (var b of $bvId) {
            if (a.bvId == b.bvId) {
              dydj = b.dydj;
            }
          }
          if (a.rate != undefined && a.rate != null) {
            var rate = a.rate.toFixed(2);
          } else {
            var rate = "";
          }
          if (
            Math.abs(parseFloat(rate)) >= parseFloat(this.diquzhibiao) ||
            rate == ""
          ) {
            if (
              a.substationName.indexOf(this.inputName) != -1 ||
              this.inputName == null ||
              this.inputName == ""
            ) {
              if (arr2.indexOf(a.substationId) == -1) {
                arr2.push(a.substationId);
                if (arr.length > 0) {
                  arr[index][0].numtwo = i;
                }
                i = 1;
                index = arr.length;
                arr.push([
                  {
                    name: a.substationName,
                    numtwo: 1,
                    bvId: a.bvId,
                    substationId: a.substationId,
                    isStation: true,
                    isClick: true,
                    colspan: 3
                  },
                  {
                    name: dydj + "kV",
                    numtwo: 1,
                    bvId: a.bvId,
                    vlId: a.vlId,
                    fullName: a.name,
                    isClick: false,
                    colspan: 1
                  },
                  {
                    name: a.inputValue,
                    numtwo: 1,
                    isClick: false,
                    colspan: 2
                  },
                  {
                    name: a.outputValue,
                    numtwo: 1,
                    isClick: false,
                    colspan: 2
                  },
                  {
                    name: a.balanceConvert,
                    numtwo: 1,
                    isClick: false,
                    colspan: 1
                  },
                  {
                    name: rate,
                    numtwo: 1,
                    isClick: false,
                    colspan: 1
                  }
                ]);
              } else {
                i++;
                arr.push([
                  {
                    name: dydj + "kV",
                    numtwo: 1,
                    vlId: a.vlId,
                    bvId: a.bvId,
                    fullName: a.name,
                    isClick: false,
                    colspan: 1
                  },
                  {
                    name: a.inputValue,
                    numtwo: 1,
                    isClick: false,
                    colspan: 2
                  },
                  {
                    name: a.outputValue,
                    numtwo: 1,
                    isClick: false,
                    colspan: 2
                  },
                  {
                    name: a.balanceConvert,
                    numtwo: 1,
                    isClick: false,
                    colspan: 1
                  },
                  {
                    name: rate,
                    numtwo: 1,
                    isClick: false,
                    colspan: 1
                  }
                ]);
              }
            }
          }
        }
        if (arr.length > 0) {
          arr[index][0].numtwo = i;
          this.mainList = arr;
        } else {
          this.mainList = [];
        }

        console.log(this.mainListAll);
      }
    },
    zhibiaot: function() {
      this.changeTime();
    },
    dqt: function() {
      if (this.dqt == "hz") {
        this.$nextTick(() => {
          this.hzScroll.destroy();
          this.hzScroll = new BScroll(".hzScroll", {
            scrollbar: { fade: false, interactive: true },
            preventDefault: false,
            mouseWheel: true
          });
        });
      }
    }
  }
};
</script>
<style>
.clickable {
  color: #f6726c !important;
  cursor: pointer !important;
}
.mxphl .box1 {
  vertical-align: top;
  height: 345px;
  box-sizing: border-box;
  width: 24%;
  padding: 5px;
  display: inline-block;
}
.mxphl .box2 {
  vertical-align: top;
  height: 345px;
  width: 50%;
  box-sizing: border-box;
  border: 1px solid #0d7474;
  border-bottom: 0;
  padding: 5px;
  display: inline-block;
}
.mxphl .box3 {
  vertical-align: top;
  height: 326px;
  width: 24%;
  box-sizing: border-box;
  padding: 5px;
  display: inline-block;
}
.mxphl .box4 {
  width: 100%;
}
.mxphl #dq_pm {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.mxphl #dbl_map {
  width: 100%;
  height: 100%;
}
.mxphl .bkbt {
  padding: 0 !important;
  margin: 0;
}
.mxphl .diqu_t .gather_cover {
  display: inline-block;
  vertical-align: top;
}
</style>
