<template>
<div class="main">
  <div class="mxian_succ">
    <div class="tool_bar sjss_tool_bar">
      <!-- <button type="button" @click="event1=true;event4=true;">全选</button> -->
      <label><input type="checkbox" v-model='event1'>日冻结底码</label>
      <!-- <label><input type="checkbox" v-model='event4'>电网模型 </label>
      <label><input type="checkbox" name="" disabled>事件</label> -->
      <label><input type="checkbox" name="" disabled>费率日冻结</label>
      <span class="rzx_"></span>
      <label>时间：</label>
      <el-date-picker class="modified_ate" 
      v-model="startTime" 
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime" 
      placeholder="选择开始时间">
      </el-date-picker>
      <el-date-picker 
      v-model="endTime" 
      value-format="yyyy-MM-dd HH:mm:ss"
      class="modified_ate" 
      type="datetime" 
      placeholder="选择结束时间">
      </el-date-picker>    
      <button type="button" @click="addEvent()">手动任务</button>
      <button type="button" @click="autoAddEvent()">自动任务</button>
    </div>
    <div class="sjss_wrap_main">
      <div class="sjss_main">   
      <div class="tree_wrap">
        <div class="treeZone">
          <div class="zone" v-show='showTree'>
            <div class="tree_search">
              <input type="text" class="txt" placeholder="输入厂站" v-model='meterName' >
              <button class=" primary" @click="searchSubs()" >搜索</button>
            </div>
            <!-- <div style="padding-top:10px;">
              <input type="text" placeholder="厂站搜索" value="" class="txt sjss_search_input">
              <button type="button" name="button">搜索</button>
            </div> -->
            <tree :data='firstData' @sendTreeInfo="getMenu" lastAttr="sbtId"></tree>
          </div>
        </div>
        <div class="tree_tollgo" @click="showTree=!showTree"></div>
      </div>
      <div class="sjss_table_main">   
        <div class="sjss_sec_tool">         
          <span>地区:</span><span class="stName">{{systemName?systemName:'-'}}</span>
          <span>厂站:</span><span class="stName">{{pathName?pathName:'-'}}</span>
          <button type="button" name="button" class="warning right" @click="cleanInfoList()">清除任务</button>
          <!-- <button type="button" name="button" class="right" @click='getTariffLogs()'>刷新</button> -->
        </div>   
        <table class="table">
          <thead>
            <tr>
              <td width="6%">序号</td>
              <td style="position: relative;">设备名称
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='stName';direction=1;getData()"></span>
                    <span class="reverse_order" @click="orderColumn='stName';direction=0;getData()"></span>
                  </div>
              </td>
              <td style="position: relative;">任务类型
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='taskType';direction=1;getData()"></span>
                    <span class="reverse_order" @click="orderColumn='taskType';direction=0;getData()"></span>
                  </div>
              </td>
              <td style="position: relative;">开始时间
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='startTime';direction=1;getData()"></span>
                    <span class="reverse_order" @click="orderColumn='startTime';direction=0;getData()"></span>
                  </div>
              </td>
              <td style="position: relative;">结束时间
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='endTime';direction=1;getData()"></span>
                    <span class="reverse_order" @click="orderColumn='endTime';direction=0;getData()"></span>
                  </div>
              </td>           
              <td style="position: relative;" width="18%">任务召测时间
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='occurTime';direction=1;getData()"></span>
                    <span class="reverse_order" @click="orderColumn='occurTime';direction=0;getData()"></span>
                  </div>
              </td>
              <td style="position: relative;">任务进度
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='taskProgress';direction=1;getData()"></span>
                    <span class="reverse_order" @click="orderColumn='taskProgress';direction=0;getData()"></span>
                  </div>
              </td>
            </tr>
          </thead>
        </table>
        <div class="sjss_table_wrap">
          <table class="table">
            <tbody>
              <tr v-for="(item,index) in dataList" :key="index">
                <td width="6%">
                   {{index + 1}}
                </td>
                <td>{{item.stName}}</td>
                <td>{{eventZn[item.taskType]}}</td>
                <td>{{item.startTime}}</td>
                <td>{{item.endTime}}</td>              
                <td width="18%">{{item.occurTime}}</td>
                <td><span 
                class="clickSatus"
                :style="{color:eventStatus[item.taskProgress]['color']}"
                @click="close1=true;clickSatus(item);clearTimer()">
                  {{eventStatus[item.taskProgress]['name']}}
                </span></td>
              </tr>
            </tbody>
          </table>
          <p v-if='loading'>{{errorMsg}}</p>
        </div>  
      </div>
    </div>
    </div>
  </div>
  <!-- 日志 -->
  <overlay :close.sync="close1">
     <div class="logs_wrap">
          <h4 class="logs_titles">采集日志</h4>
          <div class="logs_main">
             <div class="logs_top">
            <span>设备名称:</span><span class="logs_devname">{{logInfo.stName?logInfo.stName:''}}</span>
            <span>任务类型:</span><span class="logs_devname">{{logInfo.taskType?logInfo.taskType:''}}</span>
            <span>开始时间:</span><span class="logs_devname">{{logInfo.startTime?logInfo.startTime:''}}</span>
            <span>结束时间:</span><span class="logs_devname">{{logInfo.endTime?logInfo.endTime:''}}</span>
            <!-- <button type="button" name="button" class="right" @click="getTariffLogs()">刷新日志</button> -->
          </div>
          <div class="log_comtent">
            <div>          
              <p v-for="(item,index) in logArr" :key="index">
                <em>{{item.occurTime}}</em>
                <span>{{item.stepInfo}}</span>
              </p>
              <p v-show ="logArr.length<=0" >日志信息...</p>     
            </div>     
          </div>
          </div>
        </div>
  </overlay>
  <overlay :close.sync="close">
    <div class="searchWrap">
        <h4 class="search_title">搜索结果</h4>
        <div class="searchList_sjss">
          <ul>
            <li v-for="(item,index) in searchList" :key="index" @click="chooseSearch(item);close=false">
              {{item.pathName}}
            </li>
          </ul>
        </div>
    </div>
  </overlay>
  <loading :isLoading='loading'></loading>
</div>
</template>
<script>
import tree from "@/components/common/tree.vue";
import treeMinx from "@/components/mixins/tree";
import area from "@/assets/config/areaMap";
import BScroll from "better-scroll";
import overlay from "@/components/common/overlay";
import loading from "@/components/common/loading";
import qs from "qs";
export default {
  name: "sjss",
  data() {
    return {
      logsTimee: "",
      close: false,
      close1:false,
      showTree: true,
      eventZn: {
        "1": "日冻结底码",
        "2": "费率日冻结",
        "3": "事件",
        "4": "电网模型"
      },
      event1: true,
      event4: false,
      clickType: 1, //1.自动任务，2.手动任务
      eventStatus: {
        "0": { name: "准备", color: "" },
        "1": { name: "运行中", color: "#e6a54a" },
        "2": { name: "成功", color: "#33FF77" },
        "3": { name: "失败", color: "#f6726c" },
        "4": { name: "取消", color: "" },
        "5": { name: "等待", color: "" }
      },
      dataList: [],
      startTime: "",
      endTime: "",
      autoIp: "", //动态ip
      allIp: [], //所有ip集合
      subareaId: "",
      areaObj: {}, //地区信息
      stObj: {}, //厂站信息
      logArr: [], //日志集合
      isCheck: false,
      meterName: "",
      searchList: [],
      errorMsg: "加载中.....",
      systemId: "", //地区id
      systemName: "", //地区名字
      pathName: "", //厂站名字
      subId: "", //厂站id
      loading: true,
      orderColumn: "stName",
      direction: 0,
      logInfo:{
        startTime:'',
        endTime:'',
      }
    };
  },
  mixins: [treeMinx],
  created() {
    this.getData();
    this.dynamicAllIp();
  },
  methods: {
    //树
    getMenu(item, callback) {
      if (item.attribute == "systemId") {
        this.areaObj = item;
        this.systemId = item.id;
        this.systemName = item.name;
        this.dynamicIp(item.id);
        this.getBvidMenu(item, callback);
      } else if (item.attribute == "bvId") {
        this.getSubMenu(item, callback);
      } else if (item.attribute == "sbtId") {
        this.stObj = item;
        this.pathName = item.name;
        this.subId = item.id;
      }
    },
    //获取列表
    getData() {
      this.loading = true;
      this.$http
        .get("maintenanceService/dataUpperTaskServiceApi/getDataUpperTask", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            orderColumn: this.orderColumn,
            direction: this.direction
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.dataList = res.data.data.dataUpperTaskVOList;
            this.loading = false;
          } else {
            this.errorMsg = "未知错误,请尝试刷新页面";
          }
        })
        .catch(error => {
          this.loading = false;
          this.$notify({
            title: "提示",
            message: "未知错误,请尝试刷新页面",
            duration: 1500,
            type: "error"
          });
        });
    },
    //自动任务
    autoAddEvent() {
      this.clickType = 1;
      if (this.event1) {
        //底码
        this.getEventData();
      }
      if (this.event4) {
        //模型
        this.getMos();
        this.getMosLog();
      }
      this.clearTimer();
    },
    //手动任务
    addEvent() {
      this.clickType = 2;
      if (this.startTime && this.endTime) {
        this.clearTimer();
        if (this.event1) {
          this.getEventData();
        }
        if (this.event4) {
          this.getMos();
          this.getMosLog();
        }
      } else {
        this.$notify({
          title: "提示",
          message: "请选择时间！",
          duration: 1500,
          type: "warning"
        });
      }
    },
    //获取动态ip
    dynamicIp(id) {
      area.forEach((item, index) => {
        if (item.areaId == id) {
          this.subareaId = item.mrId;
        }
      });
      this.$http
        .get(
          "prefectureLevelCityService/prefectureLevelCityApi/getSubsystemList",
          {
            params: {
              sign: sessionStorage.getItem("accessToken")
            }
          }
        )
        .then(res => {
          // console.log(res);
          res.data.data.allSubSystems.forEach((item, index) => {
            if (item.systemId == id) {
              this.autoIp = item.fetchUrl;
            }
          });
        });
    },
    //加载时获取所有ip
    dynamicAllIp() {
      this.$http
        .get(
          "prefectureLevelCityService/prefectureLevelCityApi/getSubsystemList",
          {
            params: {
              sign: sessionStorage.getItem("accessToken")
            }
          }
        )
        .then(res => {
          if (res.data.code === 1) {
            this.allIp = res.data.data.allSubSystems;
          }
        })
        .catch(error => {
          this.$notify({
            title: "提示",
            message: "未知错误！",
            duration: 1500,
            type: "error"
          });
        });
    },
    //底码事件,type,1为自动任务，2，为手动任务
    getEventData() {
      let queryObj = {
        sign: sessionStorage.getItem("accessToken"),
        areaId: this.subareaId,
        stId: this.subId
      };
      if (this.clickType == 2) {
        (queryObj.startDate = this.startTime),
          (queryObj.endDate = this.endTime);
      }
      this.$http
        .get(this.autoIp + "/sendDayTariffTask", {
          params: queryObj
        })
        .then(res => {
          this.getTariffLogs();
        })
        .catch(error => {
          this.getTariffLogs();
          this.$notify({
            title: "提示",
            message: "未知错误！",
            duration: 1500,
            type: "error"
          });
        });
    },
    //电网模型注册
    getMos() {
      this.$http
        .post(
          this.autoIp +
            "/modelRegister?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            subareaId: this.subareaId,
            systemId: this.systemId,
            stName: this.pathName
          })
        )
        .then(res => {
          // console.log(res);
          console.log("模型注册");
          this.getModelLogsFun(this.autoIp, this.pathName);
        });
    },
    //电网模型注册任务记录
    getMosLog() {
      this.$http
        .post(
          "/maintenanceService/dataUpperTaskServiceApi/addModelRegisterTask?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            systemId: this.systemId,
            stId: this.subId
          })
        )
        .then(res => {
          console.log(res);
        });
    },
    //电网模型日志
    getModelLogsFun(autoip, stNames) {
      this.$http
        .get(autoip + "/modelRegisterInfo", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            stName: stNames
          }
        })
        .then(res => {
          //  res.data.modelRegisterInfo;
        });
    },
    //拉取底码日志
    getTariffLogs() {
      this.logArr = [];
      this.logsTimee = setInterval(() => {
        this.$http
          .get(this.autoIp + "/getDayTariffTaskResult", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              systemId: this.systemId,
              stId: this.subId
            }
          })
          .then(res => {
            if (res.data.status && res.data.status == "FAILED") {
              clearInterval(this.logsTimee);
              alert(res.data.extMessage);
              return false;
            } else {
              this.logArr.forEach(item => {
                if (item.stepInfo.indexOf("结束") > -1) {
                  clearInterval(this.logsTimee);
                  this.getData();
                }
              });
              // this.logArr = [...res.data.traceInfoVOList];
            }
          });
      }, 5000);
    },
    //点击任务状态，拉日志
    clickSatus(obj) {
      console.log(obj);
      this.logInfo.startTime = obj.startTime;
      this.logInfo.endTime = obj.endTime;
      this.logInfo.taskType = this.eventZn[obj.taskType];
      this.logInfo.stName = obj.stName;
      let ip = "";
      let stId = "";
      let systemId = "";
      this.allIp.forEach((item, index) => {
        if (item.systemId == obj.systemId) {
          ip = item.fetchUrl;
          stId = obj.stId;
          systemId = item.systemId;
        }
      });
      this.logArr = [];
      this.logsTimee = setInterval(() => {
        this.$http
          .get(ip + "/getDayTariffTaskResult", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              systemId: systemId,
              stId: stId
            }
          })
          .then(res => {
            if (res.data.status && res.data.status == "FAILED") {
              clearInterval(this.logsTimee);
              alert(res.data.extMessage);
              return false;
            } else {
              this.logArr.forEach(item => {
                if (item.stepInfo.indexOf("结束") > -1) {
                  clearInterval(this.logsTimee);
                  this.getData();
                }
              });
              this.logArr = [...res.data.traceInfoVOList];
            }
          })
          .catch(error => {
           this.$notify({
            title: "提示",
            message: "未知错误,请尝试刷新页面",
            duration: 1500,
            type: "error"
          });
        });;
      },5000);
    },
    // 清除定时器
    clearTimer(){
      setTimeout(()=>{
        this.$confirm("上送时间过长, 是否继续?", "提示", {
          confirmButtonText: "继续",
          cancelButtonText: "断开",
          type: "warning"
        })
          .then(() => {})
          .catch(() => {
             clearInterval(this.logsTimee)
          });
      },40000)
    },
    //清除任务
    cleanInfoList() {
      this.$http
        .post(
          "maintenanceService/dataUpperTaskServiceApi/cleanInfoList?sign=" +
            sessionStorage.getItem("accessToken")
        )
        .then(res => {
          console.log(res);
          if (sessionStorage.getItem("systemId")) {
            alert("删除成功");
            this.getData();
          } else {
            alert("管理员用户，无法清除任务！");
          }
        });
    },
    searchSubs() {
      if (this.meterName) {
        this.close = true;
        this.$http("/treeService/tree/getSubstationsByPathName", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            pathName: this.meterName
          }
        }).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.searchList = res.data.data.allSubStations;
          }
        });
      }
    },
    chooseSearch(item) {
      this.dynamicIp(item.systemId);
      this.systemId = item.systemId;
      this.systemName = item.systemName;
      this.pathName = item.pathName;
      this.subId = item.mrid;
    }
  },
  mounted() {
    this.$nextTick(() => {
      let treeZone = new BScroll(".treeZone", {
        scrollbar: true,
        mouseWheel: true,
        preventDefault: false
      });
      let sjss_table_wrap = new BScroll(".sjss_table_wrap", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
        preventDefault: false
      });
      let log_comtent = new BScroll(".log_comtent", {
        scrollbar: true,
        mouseWheel: true,
        preventDefault: false
      });
      let searchList = new BScroll(".searchList_sjss", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
        preventDefault: false
      });
    });
  },
  watch: {
    areaObj: {
      handler(news) {
        this.pathName = "";
      },
      deep: true
    }
  },
  components: {
    tree,
    overlay,
    loading
  }
};
</script>
<style lang="css">
.rzx_ {
  margin-left: 28px;
}
.sjss_main {
  display: flex;
}
.tree_search {
  margin: 8px 0;
}
.tool_bar {
  width: 99%;
  margin: 5px 0.5%;
  position: relative;
  border-bottom: 1px solid #0d7474;
  height: 70px;
  line-height: 70px;
}
.sjss_tool_bar {
  margin-bottom: 0;
}
.sjss_table_main {
  flex: 1;
  padding: 18px;
  margin: 18px 30px;
  border: 1px solid #0d7474;
}

.sjss_sec_tool {
  margin-bottom: 18px;
  padding-bottom: 12px;
  overflow: hidden;
  border-bottom: 1px dashed #0d7474;
}
.sjss_search_input {
  width: 214px;
}
.sjss_table_wrap {
  height: 420px;
  overflow: hidden;
  position: relative;
}
.logs_titles{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px dashed #51a5a5;
  margin-bottom: 16px;
}
.logs_wrap {
  width: 1398px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 1px solid #0d7474;
  color: #84f1f1;
}
@media screen and (max-width: 1399px) {
 .logs_wrap {
  width: 1208px;
}
}
.logs_top {
  overflow: hidden;
  line-height: 30px;
  border-bottom: 1px dashed #51a5a5;
}
.logs_top span {
  font-size: 13px;
}
.logs_main{
  border: 1px solid #0d7474;
  padding: 18px;
}
.logs_devname {
  margin-left: 8px;
  display: inline-block;
  padding-right: 10px;
  color: #fff;
  min-width: 80px;
  max-width: 200px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: bottom;
}
.log_comtent {
  background: #012323;
  margin-top: 6px;
  height: 170px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  padding: 8px;
}
.sjss_sec_tool span {
  color: rgb(147, 117, 5);
}
.stName {
  margin-left: 10px;
  padding-right: 10px;
}
.search_title {
  text-align: center;
  margin: 10px 0;
}
.searchWrap {
  height: 445px;
  width: 530px;
  padding: 0px 20px 20px;
  overflow: hidden;
  position: relative;
}
.searchWrap ul li {
  width: 28%;
  float: left;
  margin-left: 3%;
  text-align: center;
  cursor: pointer;
  color: #84f1f1;
  border-bottom: 1px solid#84f1f1;
  margin-bottom: 10px;
  font-size: 12px;
}
.clickSatus {
  cursor: pointer;
}
.searchWrap ul li:hover {
  color: #fff;
  background-color: #1e90ff;
}
.searchWrap ul:after {
  clear: both;
  content: "";
  display: block;
  overflow: hidden;
  width: 0;
  height: 0;
}
.searchList_sjss {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}
</style>
