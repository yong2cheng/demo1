<template>
    <div class="main ywIndex">
        <div class="t_title">运维</div> 
        <span class="right">所属厂站({{tName}} id({{stId}}))</span>
        <div style="position:relative;">
            <!-- 折叠按钮 -->
      <div @click="foldButton()" class="fold_button" :class="{fold_right:isColse}"></div>
      <!-- 树状图 -->
        <div id="treeDatas" style="overflow:hidden;position:relative;" class="treeDatas" :class="{colse:isColse}">
            <tree-folder-contents :children="children"></tree-folder-contents>
        </div>
        
        <div v-show="tubiao=='left'" class="float_right" style="float:right;height:651px;" :style="{width:twidth}" >
            <div class="ywcard">
                <ul>
                    <li :class="{active:check=='one'}" @click="check='one'">电表</li>
                    <li :class="{active:check=='two'}" @click="check='two'">变压器</li>
                    <li :class="{active:check=='three'}" @click="check='three'">线端</li>
                    <li :class="{active:check=='four'}" @click="check='four'">开关</li>
                    <li :class="{active:check=='fives'}" @click="check='fives'">机组</li>
                    <li :class="{active:check=='six'}" @click="check='six'">电容</li>
                    <li :class="{active:check=='seven'}" @click="check='seven'">负荷</li>
                    <li :class="{active:check=='eight'}" @click="check='eight'">虚拟设备</li>
                </ul>
            </div>
            <div style="border:1px solid #0d7474;padding:20px;height:calc(100% - 86px);">
                <!-- 电表 -->
                <div v-show="check=='one'" class="tsub1">
                    <div class="t_title">电表信息</div>
                    <div class="t_sousuo" style="text-align:right;"><button @click="delMeter" class="warning">删除</button></div>
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
                                <td><input v-model="delMeters" :value="item.mrid" type="checkbox"></td>
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
                                        <input type="text" class="txt" disabled v-model="meter.pathName">
                                    </label>
                                    <label>
                                        <span>电量主站电表名称：</span>
                                        <input type="text" class="txt" v-model="meter.localName">
                                    </label>
                                    </li>
                                    <li>
                                    <label>
                                        <span>CT1：</span>
                                        <input type="text" class="txt"  v-model="meter.ct1">
                                    </label>
                                    <label>
                                        <span>CT2</span>
                                        <input type="text" class="txt"  v-model="meter.ct2">
                                    </label>
                                    </li>
                                    <li>
                                    <label>
                                        <span>PT1:</span>
                                        <input type="text" class="txt"  v-model="meter.pt1">
                                    </label>
                                    <label>
                                        <span>PT2:</span>
                                        <input type="text" class="txt" v-model="meter.pt2">
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
                <div v-if="check=='two'" style="height:100%">
                  <sub2 style="height:50%;" :medols="datat" :stId="stId" name="绕组"></sub2>
                  <sub3  style="height:50%;"  :medols="datap" :stId="stId" name="变压器"></sub3>
                </div>
                <sub3 v-if="check=='three'" :medols="data1" :stId="stId" name="线端"></sub3>
                <sub3 v-if="check=='four'" :medols="data3" :stId="stId"  name="开关"></sub3>
                <sub3 v-if="check=='fives'" :medols="data2" :stId="stId"  name="机组"></sub3>
                <sub3 v-if="check=='six'" :medols="data4" :stId="stId"  name="电容"></sub3>
                <sub3 v-if="check=='seven'" :medols="data5" :stId="stId"  name="负荷"></sub3>
                <sub3 v-if="check=='eight'" :medols="data6" :stId="stId"  name="虚拟设备"></sub3>
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
import treeFolderContents from "@/components/tree/treeFolderContents";
import sub2 from "./sub/sub2.vue";
import sub3 from "./sub/sub3.vue";
import czdw from "@/components/common/czdw.vue";
import Bus from "@/assets/eventBus.js";
import BScroll from "better-scroll";
import $bvid from "@/assets/config/bvidMap";
import $areaid from "@/assets/config/areaMap";
import overlay from "@/components/common/overlay";
export default {
  data() {
    return {
      activeName: "first",
      tabPosition: "top",
      isColse: false,
      twidth: "78%",
      tubiao: "left",
      children: [],
      stId: "",
      datap: [],
      tName: "",
      check: "one",
      datap: [],
      datat: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: [],
      isLoading: false,
      token: sessionStorage.getItem("accessToken"),
      totalCount: 1, //总条数
      currentPage: 1, //当前页码
      pageSizes: [30, 60, 100],
      pageSize: 30,
      close1: false,
      meters: [],
      meter: {},
      meterCZ: {},
      delMeters: [],
      quanxuan: false
    };
  },
  components: {
    czdw,
    sub2,
    sub3,
    overlay
  },
  mounted() {
    this.$nextTick(() => {
      let scroll = new BScroll(".treeDatas", {
        scrollbar: { fade: false, interactive: true },
        preventDefault: false,
        mouseWheel: true
      });
      let scroll1 = new BScroll(".scroll1", {
        scrollbar: { fade: false, interactive: true },
        preventDefault: false,
        mouseWheel: true
      });
    });
    this.$http
      .get(
        "/treeService/tree/getAllSystemTreeNode?&sign=" +
          sessionStorage.getItem("accessToken")
      )
      .then(res => {
        if (res.data.code == 0) {
          this.isLoading = false;
          this.$notify.error({
            title: "错误",
            message: "系统错误（code==0）"
          });
          return;
        }
        this.isLoading = false;
        console.log(res);
        this.children = res.data.data.allSubSystems;
        console.log(this.children);
      })
      .catch(error => {
        this.isLoading = false;
        this.$notify.error({
          title: "错误",
          message: "系统错误（error）"
        });
      });
    Bus.$on("tName", target => {
      this.tName = target;
    });
    Bus.$on("TstId", target => {
      if(target!=""){
        this.stId = target;
        this.getSubstationModel();
        this.getMeter();
      }
    });
  },
  computed: {
    yeshu: function() {
      return (this.currentPage - 1) * this.pageSize;
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      Bus.$emit("tScroll", tab.index);
    },
    getBvId(bvId) {
      for (var a of $bvid) {
        if (a.bvId == bvId) {
          return a.dydj + "kV";
        }
      }
    },
    getAreaId(areaName){
      for(var a of $areaid){
        if(a.areaName==areaName){
          return a.areaId
        }
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
    getSubstationModel() {
      if (this.stId == "") {
        return;
      }
      this.data1 = [];
      this.data2 = [];
      this.data3 = [];
      this.data4 = [];
      this.data5 = [];
      this.data6 = [];
      this.datat=[];
      this.datap=[];
      this.$http
        .get(
          "/analysisService/analy/getSubstationModel?sign=" +
            sessionStorage.getItem("accessToken") +
            "&stId=" +
            this.stId
        )
        .then(res => {
          if (res.data.code == 1) {
            var data = res.data.data.substationModel.voltageLevelModels;
            var data2 = res.data.data.substationModel.powerTransformerModels;
            var transformerWindingModels = [];
            for (var a of data2) {
              this.datap.push({
                mrid: a.mrid,
                pathName: a.pathName,
                localName: a.localName,
                dydj: this.getBvId(a.bvId),
                bvId: a.bvId,
                isInUse: a.isInUse,
                isInUseName:a.isInUse == 1 ? "投运" : "未投运",
                otherKey3:a.otherKey3,
                otherKey4:this.getAreaId(a.otherKey4)
              });
              for(var b of a.transformerWindingModels){
                this.datat.push({
                mrid: b.mrid,
                poId:a.mrid,
                pathName: b.pathName,
                localName: b.localName,
                dydj: this.getBvId(b.bvId),
                bvId: b.bvId,
                isInUse: a.isInUse,
                isInUseName:a.isInUse == 1 ? "投运" : "未投运",
                otherKey3:a.otherKey3,
                otherKey4:this.getAreaId(a.otherKey4)
              });
              }
            }
           
             console.log(this.datat);

            var compensatorModels = [];
            var energyconsumerModels = [];
            var generatingUnitModels = [];
            var lineEndModels = [];
            var virtureEquipmentModels = [];
            for (var a of data) {
              lineEndModels = lineEndModels.concat(a.lineEndModels);
              compensatorModels = compensatorModels.concat(a.compensatorModels);
              energyconsumerModels = energyconsumerModels.concat(
                a.energyconsumerModels
              );
              generatingUnitModels = generatingUnitModels.concat(
                a.generatingUnitModels
              );
              virtureEquipmentModels = virtureEquipmentModels.concat(
                a.virtureEquipmentModels
              );
            }
            for (var a of lineEndModels) {
              this.data1.push({
                mrid: a.mrid,
                pathName: a.pathName,
                localName: a.localName,
                dydj: this.getBvId(a.bvId),
                bvId: a.bvId,
                isInUse: a.isInUse,
                isInUseName:a.isInUse == 1 ? "投运" : "未投运",
                otherKey3:a.otherKey3,
                otherKey4:this.getAreaId(a.otherKey4)
              });
              var b = a.breakerModel;
              if (b) {
                this.data3.push({
                  mrid: b.mrid,
                  pathName: b.pathName,
                  localName: b.localName,
                  dydj: this.getBvId(b.bvId),
                  bvId: b.bvId,
                  isInUse: b.isInUse,
                isInUseName:b.isInUse == 1 ? "投运" : "未投运",
                otherKey3:b.otherKey3,
                otherKey4:this.getAreaId(b.otherKey4)
                });
              }
            }

            for (var a of generatingUnitModels) {
              this.data2.push({
                mrid: a.mrid,
                pathName: a.pathName,
                localName: a.localName,
                dydj: this.getBvId(a.bvId),
                bvId: a.bvId,
                isInUse: a.isInUse,
                isInUseName:a.isInUse == 1 ? "投运" : "未投运",
                otherKey3:a.otherKey3,
                otherKey4:this.getAreaId(a.otherKey4)
              });
              var b = a.breakerModel;
              if (b) {
                this.data3.push({
                  mrid: b.mrid,
                  pathName: b.pathName,
                  localName: b.localName,
                  dydj: this.getBvId(b.bvId),
                  bvId: b.bvId,
                  isInUse: a.isInUse,
                isInUseName:a.isInUse == 1 ? "投运" : "未投运",
                otherKey3:a.otherKey3,
                otherKey4:this.getAreaId(a.otherKey4)
                });
              }
            }

            for (var a of compensatorModels) {
              this.data4.push({
                mrid: a.mrid,
                pathName: a.pathName,
                localName: a.localName,
                dydj: this.getBvId(a.bvId),
                bvId: a.bvId,
                isInUse: a.isInUse,
                isInUseName:a.isInUse == 1 ? "投运" : "未投运",
                otherKey3:a.otherKey3,
                otherKey4:this.getAreaId(a.otherKey4)
              });
            }

            for (var a of energyconsumerModels) {
              this.data5.push({
                mrid: a.mrid,
                pathName: a.pathName,
                localName: a.localName,
                dydj: this.getBvId(a.bvId),
                bvId: a.bvId,
                isInUse: a.isInUse,
                isInUseName:a.isInUse == 1 ? "投运" : "未投运",
                otherKey3:a.otherKey3,
                otherKey4:this.getAreaId(a.otherKey4)
              });
            }

            for (var a of virtureEquipmentModels) {
              this.data6.push({
                mrid: a.mrid,
                pathName: a.pathName,
                localName: a.localName,
                dydj: this.getBvId(a.bvId),
                bvId: a.bvId,
                isInUse: a.isInUse,
                isInUseName:a.isInUse == 1 ? "投运" : "未投运",
                otherKey3:a.otherKey3,
                otherKey4:this.getAreaId(a.otherKey4)
              });
            }
            console.log(this.data1);
          }
        });
    },
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
      this.isLoading = true;
      this.$http
        .post(
          "http://10.172.246.77:23880/maintenanceService/maintenance/updateMeter?sign=" + this.token,
          this.meter
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success"
            });
            this.close1=false;
            this.isLoading = false;
          }
        });
    },
    delMeter(){
      console.log(this.delMeters);
    }
  },
  watch: {
    quanxuan: function() {
      if (this.quanxuan) {
        for(var a of this.meters){
          this.delMeters.push(a.mrid);
        }
      } else {
        this.delMeters = [];
      }
    }
  }
};
</script>
<style>
.ywIndex {
  background: #043434;
  padding: 10px 20px;
  height: 715px;
  border: 1px solid #0d7474;
}
/* 折叠按钮 */
.ywIndex .fold_button {
  position: absolute;
  top: 50%;
  left: -20px;
  top: 270px;
  width: 20px;
  height: 20px;
  background: url("../../../assets/img/icons.png") no-repeat -59px -224px;
  cursor: pointer;
}
.ywIndex .fold_right {
  background: url("../../../assets/img/icons.png") no-repeat -82px -255px;
}
.ywIndex .fold_button:hover {
  background-color: #0a2d2d;
}
.ywIndex .colse {
  width: 0 !important;
  padding: 0 !important;
}
.ywIndex .colse > ul {
  display: none;
}
/* 树 */
.ywIndex .treeDatas {
  float: left;
  width: 20%;
  height: 672px;
  background: #012828 /*#011B1B*/;
  margin: 0 1% 0 0;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding-left: 20px;
}

.ywIndex .ywcard ul li {
  float: left;
  padding: 10px 20px;
  border-left: 1px solid #0d7474;
  border-top: 1px solid #0d7474;
  border-bottom: 1px solid #0d7474;
  position: relative;
  top: 1px;
  cursor: pointer;
}
.ywIndex .ywcard ul li:first-child {
  border-radius: 5px 0 0 0;
}
.ywIndex .ywcard ul li:last-child {
  border-radius: 0 5px 0 0;
  border-right: 1px solid #0d7474;
}
.ywIndex .ywcard ul li.active {
  border-bottom-color: #043434;
  color: #49f5f5;
}
.ywIndex .ywcard::after {
  content: "";
  display: block;
  clear: both;
}
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
