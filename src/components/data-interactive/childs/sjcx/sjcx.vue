<template>
  <div style="position:relative;" class="main main_se sjcx">
      <div class="head_bar" style="font-size:13px;color:#84f1f1;">
          <div class="mianbaoxue">
              <span>{{area}}>></span>
              <span>{{acname}}>></span>
              <span>{{factoryStation}}</span>
          </div>
          <div class="xzdata">
            <span>地区：</span>
              <select name="" id="" v-model="mrId">
                  <option v-if="hasSysTemId" value="">所有地区</option>
                  <option :key="index" v-for="(item,index) in diquNames" :value="item.areaId">{{item.areaName}}</option>
              </select>
          </div>
          <div style="width:241px;" class="cxbox">
            <span style="font-size:13px;">厂站名称：</span>
              <input v-model="factoryStationName" style="width:92px;" type="text" placeholder="厂站定位" class="txt" />
              <button @click="findFactoryStation()">搜索</button>
          </div>
          <div @click="tubiaochange()" class="tubiaobut" style="margin-top:20px">
              <p>
                  <span>表</span>
                  <span>图</span>
              </p>
              <div :class="{tsleft:tubiao=='left',tsright:tubiao=='right'}" class="tsblock"></div>
          </div>
          
          <div style="float:right;margin-top:25px">
              <button class="btn-small" @click="isRi=true;" :class="{btn_checked:isRi}">日数据</button>
                <button class="btn-small" @click="isRi=false;" :class="{btn_checked:!isRi}">月数据</button>
                <el-date-picker
                v-show="isRi"
                type="date"
                v-model="dayDater"
                value-format="yyyy-MM-dd"
                placeholder="选择一个日期">
                </el-date-picker>
                <el-date-picker
                v-show="!isRi"
                type="month"
                v-model="dayDatey"
                value-format="yyyy-MM"
                placeholder="选择一个日期">
                </el-date-picker>
                <button @click="getSubstationEnergy(TstId,factoryStation)">查询</button>
          </div>
      </div>
      <!-- 折叠按钮 -->
      <div @click="foldButton()" class="fold_button" style="left:0;" :class="{fold_right:isColse}"></div>
      <!-- 树状图 -->
        <div id="treeDatas" style="overflow:hidden;position:relative;" class="treeDatas" :class="{colse:isColse}">
            <tree-folder-contents :timeUnit.sync="timeUnit" :date.sync="dayDate" :children="children"></tree-folder-contents>
        </div>
        
        <div v-show="tubiao=='left'" class="float_right" :style="{width:twidth}" >
          <table class="table right" style="width:100%;">
          <thead>
              <tr>
                <td style="width:15%;" rowspan="2">设备</td>
                <td style="width:14%;" rowspan="2">MRID</td>
                <td style="width:5%;" rowspan="2">倍率</td>
                <td style="width:11%;" colspan="2">初冻结</td>
                <td style="width:11%;" colspan="2">末冻结</td>
                <td style="width:11%;" colspan="2">采集电量</td>
                <td style="width:11%;" colspan="2">功率积分电量</td>
                <td style="width:11%;" colspan="2">模型对端电量</td>
                <td style="width:11%" colspan="2">副表电量</td>
              </tr>
              <tr>
                <td>正向有功</td>
                <td>反向有功</td>
                <td>正向有功</td>
                <td>反向有功</td>
                <td>正向有功</td>
                <td>反向有功</td>
                <td>正向有功</td>
                <td>反向有功</td>
                <td>正向有功</td>
                <td>反向有功</td>
                <td>正向有功</td>
                <td>反向有功</td>
              </tr>
          </thead>
        </table>
        <div class="scroll2" style="width:100%;height:745px;overflow:hidden;position:relative;padding:0 1px;">
          <table class="table">
                
                <tbody>
                    <tr :class="{heji:item[0].heji,isBalance:item[0].isBalance}" :key="indexd" v-for="(item,indexd) in tbodys">
                        <td :title="child.isBalance?'点击跳转到配置页面':''" @click="item[0].heji==true?toone(child.isBalance,child.vlId,child.bvId):getCtpt(indexm,child.name,child.equipmentId,child.name)" :class="{nothing:child.name=='暂无数据',wpz:child.isBalance}" :key="indexm" v-for="(child,indexm) in item" :colspan="child.numone" :rowspan="child.numtwo">{{child.name}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
            
        </div>
        <div v-html="svgHtml" v-show="tubiao=='right'"  :style="{width:twidth}" class="float_right">
        </div>
        <!-- 厂站搜索弹框 -->
        <overlay oheight="60%" :close.sync="isShow">
          <div class="yiji_t">
            <div class="t_title">
              <span>厂站搜索结果</span>
            </div>
            <div style="height:calc(100% - 46px);overflow:hidden;position:relative;" class="stationBox">
                <ul>
                    <li @click="getSubstationEnergy(item.mrid,item.localName,item.bvId,item.systemName)" :key="index" v-for="(item,index) in factoryStationNames">{{item.localName}}</li>
                </ul>
            </div>
          </div>
            
        </overlay>
        <!-- 点击设备弹框 -->
        <overlay oheight="60%" :close.sync="isShowd">
            <div class="yiji_t">
              <div class="t_title">
                <span>{{equipmentName}}</span><button class="right" style="margin-top:3px;" @click="outEquip()">下载</button>
              </div>
                <table class="table">
                  <thead>
                      <tr>
                          <td rowspan="2">日期</td>
                          <td rowspan="2">倍率</td>
                          <td colspan="2">主表初冻结</td>
                          <td colspan="2">主表末冻结</td>
                          <td colspan="2">副表初冻结</td>
                          <td colspan="2">副表末冻结</td>
                          <td colspan="2">主表电量</td>
                          <td colspan="2">副表电量</td>
                      </tr>
                      <tr>
                          <td>正向有功</td>
                          <td>反向有功</td>
                          <td>正向有功</td>
                          <td>反向有功</td>
                          <td>正向有功</td>
                          <td>反向有功</td>
                          <td>正向有功</td>
                          <td>反向有功</td>
                          <td>正向有功</td>
                          <td>反向有功</td>
                          <td>正向有功</td>
                          <td>反向有功</td>
                      </tr>
                  </thead>
              </table>
              <div class="scroll3" style="position:relative;overflow:hidden;height: calc(100% - 117px);">
                  <table class="table">
                      <tbody>
                          <tr :key="indexd" v-for="(item,indexd) in equipments">
                              <td :key="index" v-for="(child,index) in item">{{child.name}}</td>
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
import treeFolderContents from "@/components/tree/treeFolderContents";
import createTable from "@/components/data-interactive/createTable";
import overlay from "@/components/common/overlay";
import $areaId from "../../../../assets/config/areaMap";
import $bvid from "../../../../assets/config/bvidMap";
import BScroll from "better-scroll";
import Bus from "../../../../assets/eventBus.js";
export default {
  data: function() {
    return {
      area: "区域",
      acname: "电压等级",
      factoryStation: "厂站",
      diquNames: [],
      mrId: "",
      isColse: false,
      children: [],
      theads: [
        [
          {
            name: "设备",
            numone: 1,
            numtwo: 2
          },
          {
            name: "MRID",
            numone: 1,
            numtwo: 2
          },
          {
            name: "倍率",
            numone: 1,
            numtwo: 2
          },
          {
            name: "初冻结",
            numone: 2,
            numtwo: 1
          },
          {
            name: "末冻结",
            numone: 2,
            numtwo: 1
          },
          {
            name: "采集电量",
            numone: 2,
            numtwo: 1
          },
          {
            name: "功率积分电量",
            numone: 2,
            numtwo: 1
          },
          {
            name: "模型对端电量",
            numone: 2,
            numtwo: 1
          },
          {
            name: "副表电量",
            numone: 2,
            numtwo: 1
          }
        ],
        [
          {
            name: "正向有功",
            numone: 1,
            numtwo: 1
          },
          {
            name: "反向有功",
            numone: 1,
            numtwo: 1
          },
          {
            name: "正向有功",
            numone: 1,
            numtwo: 1
          },
          {
            name: "反向有功",
            numone: 1,
            numtwo: 1
          },
          {
            name: "正向有功",
            numone: 1,
            numtwo: 1
          },
          {
            name: "反向有功",
            numone: 1,
            numtwo: 1
          },
          {
            name: "正向有功",
            numone: 1,
            numtwo: 1
          },
          {
            name: "反向有功",
            numone: 1,
            numtwo: 1
          },
          {
            name: "正向有功",
            numone: 1,
            numtwo: 1
          },
          {
            name: "反向有功",
            numone: 1,
            numtwo: 1
          },
          {
            name: "正向有功",
            numone: 1,
            numtwo: 1
          },
          {
            name: "反向有功",
            numone: 1,
            numtwo: 1
          }
        ]
      ],
      tbodys: [],
      isRi: true,
      factoryStationName: "",
      factoryStationNames: [],
      isShow: false,
      dayDate: this.$day().format("YYYY-MM-DD"),
      dayDater: this.$day().format("YYYY-MM-DD"),
      dayDatey: this.$day().format("YYYY-MM"),
      timeUnit: "DAY",
      twidth: "78%",
      tubiao: "left",
      svgHtml: "",
      isShowd: false,
      equipments: [],
      equipmentName: "",
      equiphasScroll: false,
      isLoading: false,
      TstId: "",
      hasStation: false,
      equipmentId: "",
      hasSysTemId:sessionStorage.getItem("sysTemId")==undefined
    };
  },
  components: {
    treeFolderContents,
    createTable,
    overlay
  },
  methods: {
    toone(isBalance,vlId,bvId) {
      if(isBalance){
        var areaId;
        console.log(vlId,bvId,this.TstId,this.factoryStation);
        for(var a of $areaId){
          if(a.areaName==this.area){
            areaId=a.areaId;
          }
        }
        console.log(areaId);
        var { href } = this.$router.resolve({
          name: "/mxphpzl/one",
          path: "/mxphpzl/one",
          query: {
            sysId: 8000600031,
            sonid: 8000600033,
            substationId: this.TstId,
            vlId: vlId,
            name: this.factoryStation,
            dy: this.getDydj(bvId)+'kV',
            bvId: bvId,
            areaId:areaId
          }
        });
        window.open(href, "_blank");
      }
      
    },
    getDydj(bvId){
      for(var a of $bvid){
        if(a.bvId==bvId){
          return a.dydj;
        }
      }
    },
    handleLoad(num, count) {
      if (num == count) {
        this.isLoading = false;
      }
    },
    foldButton() {
      this.isColse = !this.isColse;
      if (this.isColse) {
        this.twidth = "98%";
      } else {
        this.twidth = "78%";
      }
    },
    findFactoryStation() {//场站搜索
      this.isLoading = true;
      this.factoryStationNames = [];
      if (this.mrId == "") {
        var mrId = "";
      } else {
        var mrId = "&systemId=" + this.mrId;
      }
      this.$http
        .get(
          "/treeService/tree/getAllSubStationBySystemIdAndStationName?" +
            "&stationName=" +
            this.factoryStationName +
            "&sign=" +
            sessionStorage.getItem("accessToken") +
            mrId
        )
        .then(res => {
          if (res.data.code == 0) {
            this.isLoading = false;
        //     this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
            return;
          }
          this.isLoading = false;
          this.factoryStationNames = res.data.data.allSubStations;
          console.log(this.factoryStationNames);
        })
        .catch(function(error) {
          this.isLoading = false;
        //   this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
        });
      this.isShow = true;
      if (!this.hasStation) {
        this.$nextTick(() => {
          let scroll4 = new BScroll(".stationBox", {
            scrollbar: { fade: false, interactive: true },
            preventDefault:false,
            mouseWheel: true
          });
        });
        this.hasStation = true;
      }
    },
    getFixed(num, dian) {
      
      if (dian == null || dian == undefined || dian === "") {
        return "";
      } else {
        return dian.toFixed(num);
      }
    },
    getSubstationEnergy(stId, localName,bvId,systemName) {//按条件查找
      if(stId==""){
        this.$notify.info({
          title: '消息',
          message: '请先选择厂站'
        });
        return;
      }
      this.isShow = false;
      this.isLoading = true;
      var count = 0;
      if(bvId){
        this.factoryStation = localName;
        this.acname = this.getDydj(bvId)+"kV";
        this.area=systemName;
      }
      // for (var a of $areaId) {
      //   if (this.mrId == a.areaId) {
      //     this.area = a.areaName;
      //   }
      // }
      
      Bus.$emit("TstId", stId);
      //if(this.dayDate-this.$day().format("YYYY-MM-DD")){}
      console.log(this.dayDate - this.$day().format("YYYY-MM-DD"));
      var smonth = new Date(this.dayDate).getMonth() + 1;
      var syear = new Date(this.dayDate).getFullYear();
      var nmonth = new Date().getMonth() + 1;
      var nyear = new Date().getFullYear();
      var query;
      // if (nmonth >= 10) {
      //   if (smonth < 10) {
      //     query = "getSubstationEnergyHistory";
      //   } else {
      //     query = "getSubstationEnergy";
      //   }
      // } else if (nmonth >= 7) {
      //   if (smonth < 7) {
      //     query = "getSubstationEnergyHistory";
      //   } else {
      //     query = "getSubstationEnergy";
      //   }
      // } else if (nmonth >= 4) {
      //   if (smonth < 4) {
      //     query = "getSubstationEnergyHistory";
      //   } else {
      //     query = "getSubstationEnergy";
      //   }
      // } else {
      //   query = "getSubstationEnergy";
      // }
      // if (syear < nyear) {
      //   query = "getSubstationEnergyHistory";
      // }
      this.$http
        .get(
          "/dataInteractiveService/interaction/getSubstationEnergy?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&day=" +
            this.dayDate +
            "&stId=" +
            stId +
            "&timeUnit=" +
            this.timeUnit
        )
        .then(res => {
          if (res.data.code == 0) {
            count++;
            this.handleLoad(2, count);
            if(confirm("系统错误（code==0）")){
              this.$http.get("datainteractive/fixEquipmentService/fixEquipmentVlId?sign="+sessionStorage.getItem("accessToken")+"&stId="+stId)
                .then(res=>{
                  if(res.data.code==0){
        //             this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
                    return
                  }
                  this.$notify({
          title: '成功',
          message: '修复成功!',
          type: 'success'
        });
                })
        //         .catch(error=>{
        //           this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
        //         });
            }
            return;
          }
          count++;
          this.handleLoad(2, count);
          console.log(res);
          var data = res.data.data.substationEnergys;
          var arr = [];
          if (data.length) {
            for (var b of data) {
              for (var i in b) {
                var a = b[i];
                if (i == b.length - 1) {
                  var balance = this.getFixed(2, a.balance);
                  var balanceRatio = this.getFixed(2, a.balanceRatio);

                  var startTariffInputValue = this.getFixed(
                    4,
                    a.startTariffInputValue
                  );
                  var startTariffOutputValue = this.getFixed(
                    4,
                    a.startTariffOutputValue
                  );
                  var endTariffInputValue = this.getFixed(
                    4,
                    a.endTariffInputValue
                  );
                  var endTariffOutputValue = this.getFixed(
                    4,
                    a.endTariffOutputValue
                  );

                  var inboundData1 = this.getFixed(2, a.inboundData1);
                  var inboundData2 = this.getFixed(2, a.inboundData2);
                  var inboundData3 = this.getFixed(2, a.inboundData3);
                  var inboundData4 = this.getFixed(2, a.inboundData4);
                  var outboundData1 = this.getFixed(2, a.outboundData1);
                  var outboundData2 = this.getFixed(2, a.outboundData2);
                  var outboundData3 = this.getFixed(2, a.outboundData3);
                  var outboundData4 = this.getFixed(2, a.outboundData4);
                  if (a.day == null || a.day == "") {
                    if (a.isBalance) {
                        arr.push([
                          {
                            name: a.equipmentName,
                            equipmentId: a.equipmentId,
                            vlId: a.vlId,
                            isBalance: a.isBalance==0,
                            numone: 1,
                            numtwo: 1,
                            heji: i == b.length - 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "不平衡",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: balance,
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "不平衡率(%)",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: balanceRatio,
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: outboundData1,
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: inboundData1,
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          // {
                          //   name: "",
                          //   numone: 1,
                          //   numtwo: 1
                          // }
                        ]);
                      }else{
                         arr.push([
                          {
                            name: a.equipmentName,
                            equipmentId: a.equipmentId,
                            vlId: a.vlId,
                            bvId:a.bvId,
                            isBalance: a.isBalance==0,
                            numone: 15,
                            numtwo: 1,
                            heji: i == b.length - 1
                          }
                         ])
                      }
                  } else {
                    arr.push([
                      {
                        name: a.equipmentName,
                        equipmentId: a.equipmentId,
                        numone: 1,
                        numtwo: 1,
                        isBalance:a.isBalance==0
                      },
                      {
                        name: a.meterMrid,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: a.ratio,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: startTariffInputValue,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: startTariffOutputValue,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: endTariffInputValue,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: endTariffOutputValue,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: inboundData1,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: outboundData1,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: inboundData2,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: outboundData2,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: inboundData3,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: outboundData3,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: inboundData4,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: outboundData4,
                        numone: 1,
                        numtwo: 1
                      }
                    ]);
                  }
                } else {
                  var startTariffInputValue = this.getFixed(
                    4,
                    a.startTariffInputValue
                  );
                  var startTariffOutputValue = this.getFixed(
                    4,
                    a.startTariffOutputValue
                  );
                  var endTariffInputValue = this.getFixed(
                    4,
                    a.endTariffInputValue
                  );
                  var endTariffOutputValue = this.getFixed(
                    4,
                    a.endTariffOutputValue
                  );

                  var inboundData1 = this.getFixed(2, a.inboundData1);
                  var inboundData2 = this.getFixed(2, a.inboundData2);
                  var inboundData3 = this.getFixed(2, a.inboundData3);
                  var inboundData4 = this.getFixed(2, a.inboundData4);
                  var outboundData1 = this.getFixed(2, a.outboundData1);
                  var outboundData2 = this.getFixed(2, a.outboundData2);
                  var outboundData3 = this.getFixed(2, a.outboundData3);
                  var outboundData4 = this.getFixed(2, a.outboundData4);
                  arr.push([
                    {
                      name: a.equipmentName,
                      equipmentId: a.equipmentId,
                      numone: 1,
                      numtwo: 1,
                      heji: i == b.length - 1,
                      isBalance:a.isBalance==0
                    },
                    {
                      name: a.meterMrid,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: a.ratio,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: startTariffInputValue,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: startTariffOutputValue,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: endTariffInputValue,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: endTariffOutputValue,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: inboundData1,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: outboundData1,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: inboundData2,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: outboundData2,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: inboundData3,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: outboundData3,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: inboundData4,
                      numone: 1,
                      numtwo: 1
                    },
                    {
                      name: outboundData4,
                      numone: 1,
                      numtwo: 1
                    }
                  ]);
                }
              }
            }
          } else {
            arr = [
              [
                {
                  name: "暂无数据",
                  numone: 14
                }
              ]
            ];
          }
          this.tbodys = arr;
        })
        .catch(error => {
          count++;
          this.handleLoad(2, count);
        //   this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
        });
      this.$http
        .get(
          "/analysisService/analy/getSubstationSVG?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&stId=" +
            stId
        )
        .then(res => {
          if (res.data.code == 0) {
            count++;
            this.handleLoad(2, count);
            this.$notify.error({
          title: '错误',
          message: "系统错误（code==0）"
        });
            return;
          }
          count++;
          this.handleLoad(2, count);
          this.svgHtml = res.data;
        })
        .catch(error => {
          count++;
          this.handleLoad(2, count);
        //   this.$notify.error({
        //   title: '错误',
        //   message:error
        // });
        });
    },
    tubiaochange() {
      if (this.tubiao == "left") {
        this.tubiao = "right";
      } else {
        this.tubiao = "left";
      }
    },
    getCtpt(indexm, name, equipmentId, equipmentName) {
      if (indexm == 0 && name != "暂无数据") {
        this.isLoading=true;
        this.isShowd = true;
        if (!this.equiphasScroll) {
          this.$nextTick(() => {
            let scroll3 = new BScroll(".scroll3", {
              scrollbar: { fade: false, interactive: true },
              preventDefault:false,
              mouseWheel: true
            });
          });
          this.equiphasScroll=true;
        }
        this.equipmentId = equipmentId;
        this.equipmentName = equipmentName;
        var year = this.dayDate.split("-")[0];
        var month = this.dayDate.split("-")[1];
        this.$http
          .get(
            "/dataInteractiveService/interaction/getTariffEnergy?sign=" +
              sessionStorage.getItem("accessToken") +
              "&date=" +
              year +
              "-" +
              month +
              "&equipmentId=" +
              equipmentId
          )
          .then(res => {
            if (res.data.code == 0) {
              this.isLoading=false;
        //       this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
              return;
            }
            this.isLoading=false;
            var data = res.data.data.equipmentEnergies;
            this.equipments = [];
            if (data.length > 0) {
              for (var a of data) {
                this.equipments.push([
                  {
                    name: a.day.split(" ")[0]
                  },
                  {
                    name: a.ratio
                  },
                  {
                    name: a.startTariffInputValue
                  },
                  {
                    name: a.startTariffOutputValue
                  },
                  {
                    name: a.endTariffInputValue
                  },
                  {
                    name: a.endTariffOutputValue
                  },
                  {
                    name: a.startTariffInputValueAttached
                  },
                  {
                    name: a.startTariffOutputValueAttached
                  },
                  {
                    name: a.endTariffInputValueAttached
                  },
                  {
                    name: a.endTariffOutputValueAttached
                  },
                  {
                    name: a.papRawStatus
                  },
                  {
                    name: a.rapRawStatus
                  },
                  {
                    name: a.papRawStatusAttached
                  },
                  {
                    name: a.rapRawStatusAttached
                  }
                ]);
              }
            }
          })
          .catch(error=>{
            this.isLoading=false;
        //     this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
          });
      }
    },
    outEquip() {
      var year = this.dayDate.split("-")[0];
      var month = this.dayDate.split("-")[1];
      this.$http
        .get(
          "/dataInteractiveService/interaction/outTariffEnergy?sign=" +
            sessionStorage.getItem("accessToken") +
            "&date=" +
            year +
            "-" +
            month +
            "&equipmentId=" +
            this.equipmentId
        )
        .then(res => {
          window.location = res.request.responseURL;
        });
    }
  },
  watch: {
    isRi: function() {
      if (this.isRi) {
        this.timeUnit = "DAY";
        this.dayDate = this.dayDater;
      } else {
        this.timeUnit = "MONTH";
        this.dayDate = this.dayDatey;
      }
    },
    dayDater: function() {
      if (this.isRi) {
        this.dayDate = this.dayDater;
      } else {
        this.dayDate = this.dayDatey;
      }
    },
    dayDatey: function() {
      if (this.isRi) {
        this.dayDate = this.dayDater;
      } else {
        this.dayDate = this.dayDatey;
      }
    }
  },
  mounted: function() {
    console.log(this.dayDate);
    console.log(new Date(this.dayDate));
    this.isLoading = true;
    Bus.$on("Ttbodys", target => {
      this.tbodys = target;
    });
    Bus.$on("Tarea", target => {
      this.area = target;
    });
    
    Bus.$on("Tacname", target => {
      this.acname = target+"kV";
    });
    Bus.$on("TfactoryStation", target => {
      this.factoryStation = target;
    });
    Bus.$on("TsvgHtml", target => {
      this.svgHtml = target;
    });
    Bus.$on("isLoading", target => {
      this.isLoading = target;
    });
    Bus.$on("TstId", target => {
      this.TstId = target;
    });
    this.$nextTick(() => {
      let scroll = new BScroll("#treeDatas", {
        scrollbar: { fade: false, interactive: true },
        preventDefault:false,
        mouseWheel: true
      });
      let scroll2 = new BScroll(".scroll2", {
        scrollbar: { fade: false, interactive: true },
        preventDefault:false,
        mouseWheel: true
      });
      let scroll3 = new BScroll(".scroll3", {
        scrollbar: { fade: false, interactive: true },
        preventDefault:false,
        mouseWheel: true
      });
    });
    console.log(sessionStorage.getItem("systemId"));
    if (
      sessionStorage.getItem("systemId") === null ||
      sessionStorage.getItem("systemId") == "undefined" ||
      sessionStorage.getItem("systemId") == 15
    ) {
      console.log("diqu");
      this.diquNames = this.diquNames.concat($areaId);
      this.mrId = "";
    } else {
      for (var a of $areaId) {
        if (a.areaId == sessionStorage.getItem("systemId")) {
          this.diquNames.push(a);
          this.mrId = a.areaId;
        }
      }
    }
    this.$http
      .get(
        "/treeService/tree/getAllSystemTreeNode?&sign=" +
          sessionStorage.getItem("accessToken")
      )
      .then(res => {
        if (res.data.code == 0) {
          this.isLoading = false;
        //   this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
          return;
        }
        this.isLoading = false;
        console.log(res);
        this.children = res.data.data.allSubSystems;
        console.log(this.children);
      })
      .catch(error => {
        this.isLoading = false;
        // this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
      });
  }
};
</script>
<style>
.float_right {
  float: right;
}
/* .sjcx{
  min-width:
} */
.sjcx:after {
  content: "";
  display: block;
  clear: both;
}
.xzdata {
  margin: 20px 10px 0 20px;
  font-size: 13px;
}
.cxbox {
  float: left;
  width: 150px;
  margin: 20px 0;
}
/* 树 */
.sjcx .treeDatas {
  width: 20%;
  height: 745px;
  background: #012828 /*#011B1B*/;
  margin: 0 0 0 1%;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding-left: 20px;
}
/* 折叠按钮 */
.sjcx .fold_button {
  position: absolute;
  top: 50%;
  right: -21px;
  width: 20px;
  height: 20px;
  background: url("../../../../assets/img/icons.png") no-repeat -59px -224px;
  cursor: pointer;
}
.sjcx .fold_right {
  background: url("../../../../assets/img/icons.png") no-repeat -82px -255px;
}
.sjcx .fold_button:hover {
  background-color: #0a2d2d;
}
.sjcx .colse {
  width: 0 !important;
  padding: 0 !important;
}
.sjcx .colse > ul {
  display: none;
}
.sjcx .stationBox {
  margin: auto auto;
  text-align: center;
}
.sjcx .stationBox ul {
  display: block;
}
.sjcx .stationBox ul::after {
  content: "";
  display: block;
  clear: both;
}
.sjcx .stationBox ul li {
  width: 20%;
  float: left;
  margin-left: 3%;
  text-align: center;
  cursor: pointer;
  color: #84f1f1;
  border-bottom: 1px solid#84f1f1;
}
.sjcx .stationBox ul li:hover {
  color: #fff;
  background-color: #1e90ff;
}
.sjcx .float_right .table {
  table-layout: auto !important;
}
.sjcx .float_right table td {
  width: 100px;
  box-sizing: border-box;
}
.sjcx .float_right tbody td{
  width:5.5%;
}
.sjcx .float_right tbody td:first-child {
  color: #ff574f;
  font-weight: bold;
  cursor: pointer;
  font-family: "Helvetica Neue", "Microsoft Yahei", Arial, sans-serif;
  /* white-space: nowrap; */
  width:15%;
}
.sjcx .float_right tbody td:nth-child(2){
  width:14%;
}
.sjcx .float_right tbody td:nth-child(3){
  width:5%;
}
.sjcx .float_right thead tr td {
  font-size: 12px;
}
.sjcx .float_right td {
  font-size: 12px;
}
.sjcx .nothing {
  color: #fff !important;
  cursor: default !important;
}
.sjcx .tubiaobut {
  position: relative;
  width: 80px;
  padding: 0 3px;
  text-align: center;
  cursor: pointer;
  border-radius: 40px;
  background: #012323;
  box-shadow: inset 0 2px 5px 1px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.2);
}
.sjcx .tubiaobut p span {
  float: left;
  width: 40px;
  height: 32px;
  line-height: 32px;
  font-size: 13px;
}
.sjcx .tubiaobut p {
  float: left;
  width: 80px;
  position: absolute;
  z-index: 2;
}
.sjcx .tubiaobut .tsblock {
  float: left;
  width: 40px;
  height: 26px;
  background: #dd6b66;
  border-radius: 13px;
  margin-top: 3px;
  transition: all 0.3s;
}
.sjcx .tubiaobut .tsleft {
  margin-left: 0;
}
.sjcx .tubiaobut .tsright {
  margin-left: 40px;
}
.sjcx .heji {
  background: #035252 !important;
}
.sjcx .heji td {
  color: #84f1f1 !important;
  cursor: default !important;
}
.sjcx .heji .wpz{
  color:#ff574f !important;
  font-weight: bold;
  cursor:pointer !important;
}
.sjcx .isBalance{
  background:rgb(5, 36, 36);
}
.sjcx .ybt tr:first-child td:first-child{
  width:273px;
}
</style>