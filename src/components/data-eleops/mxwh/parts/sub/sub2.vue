<template lang="html">
  <div class="dash_sub_wrap">
      <div class="dash_top_btn">
        <button type="button" class="warning" @click="operationBtn()">投运</button>
        <button type="button" class="warning" @click="retireBtn()">退役</button>
        <!-- <button type="button" class="warning" @click="refromBtm()">改造</button> -->
      </div>
      <div class="table_wrap">
        <table class="table">
          <thead>
          <tr>
            <td width="5%">
              <input type="checkbox" @change="checkAll($event)">
              勾选
            </td>
            <td width="5%">
              序号
            </td>
            <td>MRID</td>
            <td>电表全路径名称</td>
            <td width="7%">CT1</td>
            <td width="7%">CT2</td>
            <td width="7%">PT1</td>
            <td width="7%">PT2</td>
            <td width="6%">精度</td>
            <td width="7%">积分周期</td>
            <td width="7%">投运状态</td>
            <td>日冻结底码采集时标</td>
          </tr>
          </thead>
        </table>
        <div class="table_content dash_sub1_table">
          <table class="table">
            <tbody>
              <tr v-for="(item,index) in dataList">
                <td  width="5%">
                  <input type="checkbox" :value="item.mrid" v-model="operation">
                </td>
                <td  width="5%">
                  {{pageSize*(currentPage-1)+index + 1}}
                </td>
                <td @click="close=true;getItem(item)"><span class="color_warning">{{item.mrid}}</span></td>
                <td> {{item.pathName}} </td>
                <td  width="7%">{{item.ct1}}</td>
                <td  width="7%">{{item.ct2}}</td>
                <td  width="7%">{{item.pt1}}</td>
                <td  width="7%">{{item.pt2}}</td>
                <td  width="6%">{{item.dataPrecision}}</td>
                <td width="7%">{{item.dataInterval}}</td>
                <td width="7%">{{item.isInUse==1?'投运':'退役'}}</td>
                <td>{{item.class2TimeTag}}</td>
              </tr>
           </tbody>
          </table>
        </div>
         <el-pagination
            background
            @current-change='changePage'
            @size-change="changePageSize"
            :current-page.sync="currentPage"
            layout="total,sizes,prev, pager, next,jumper"
            :page-sizes="pageSizes"
            :total="totalCount">
          </el-pagination>
      </div>
      <overlay :close.sync="close" @changeSatus="backData">
        <div class="sub_wrap">
          <div class="sub_wrap_sec_title tc_count_title">
            <h2 class="left">电表详细信息</h2>
             <!-- <p class="left" style="margin-left:12px;">设备id：{{subData.mrid}}</p> -->
          </div>
          <div class="sub_main">
            <ul class="sub2_input">
              <!-- <p class="left" style="margin-left:12px;">设备id：{{subData.mrid}}</p> -->
            <li>
              <label>
                <span>电表全路径名称:</span>
                <input type="text" class="txt" v-model="subData.pathName">
              </label>
              <label>
                <span>电量主站电表名称：</span>
                <input type="text" class="txt" v-model="subData.localName">
              </label>
            </li>
            <li>
              <label>
                <span>CT1：</span>
                <input type="text" class="txt"  v-model="subObjs.ct1">
              </label>
              <label>
                <span>CT2</span>
                <input type="text" class="txt"  v-model="subObjs.ct2">
              </label>
            </li>
            <li>
              <label>
                <span>PT1:</span>
                <input type="text" class="txt"  v-model="subObjs.pt1">
              </label>
              <label>
                <span>PT2:</span>
                <input type="text" class="txt" v-model="subObjs.pt2">
              </label>
            </li>
            <li>
              <label>
                <span>精度:</span>
                <input type="text" class="txt" v-model="subData.dataPrecision">
              </label>
              <label>
                <span>积分周期:</span>
                <input type="text" class="txt" v-model="subData.dataInterval">
              </label>
            </li>
            <li>
              <label>
                <span>投运状态:</span>
                <select v-model="subData.isInUse" id="bvid" class="txta">
                  <option value="1">投运</option>
                  <option value="0">退役</option>
                </select>
              </label>
              <label>
                <span>日冻结底码采集时标:</span>
                <el-date-picker
                  class="modified_ate"
                  v-model="subData.class2TimeTag"
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
                  v-model="subData.class3TimeTag"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
                </el-date-picker>
              </label>
              <label>
                <span>电表ID:</span>
                <input type="text" class="txt" v-model="subData.mrid" readonly="readonly">
              </label>
            </li>
          </ul>
          <div class="btn_content2">
            <button type="button" @click="saveMeter()" v-if="close">确定</button>
            <!-- <button type="button" class="warning" @click="backData()">重置</button> -->
          </div>
          </div>        
        </div>
      </overlay>
      <overlay :close.sync="close1">
        <touyun :type='15' :ids="operation.join(',')" @tiuyun="operate(operation)" @cancel="close1=false"></touyun>
      </overlay>
      <overlay :close.sync="close2">
        <tuiyi :type='15' :ids="operation.join(',')" @tuiyi="reoperate(operation)" @cancel="close2=false"></tuiyi>
      </overlay>
      <overlay :close.sync="close3">
        <gaizao :type='15' :ids="operation.join(',')" @cancel="close3=false" v-if="close3"></gaizao>
      </overlay>
      <overlay style="min-height:440px;" :close.sync="isShow">
          <div style="width:455px;font-size:14px;height: 150px;">
            <div class="t_title">
              <span>修改ct/pt时间选取</span>
            </div>
              <div style="box-sizing:border-box;text-align:center;margin: 10px 0 20px">
                <el-date-picker
                    style="height: 40px;line-height: 40px;background-color: #012323;"
                    v-model="timeArr"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    unlink-panels>
                </el-date-picker>
              </div>
              <div style="text-align: center">
                <button @click="corfrim">确定</button>
              </div>
          </div>
        </overlay>
  </div>
</template>
<script>
import qs from "qs";
import BScroll from "better-scroll";
import overlay from "@/components/common/overlay";
import touyun from "../float/touyun";
import tuiyi from "../float/tuiyi";
import gaizao from "../float/gaizao";
export default {
  data() {
    return {
      close: false,
      subData: {},
      ct1:'',
      ct2:'',
      pt1:'',
      pt2:'',
      subObjs:{
        ct1 :'',
        ct2 :'',
        pt1 :'',
        pt2 :'',
      },
      backupData: {},
      operation: [], //投运,退役
      dataList: [],
      totalCount: 1, //总条数
      currentPage: 1, //当前页码
      pageSizes: [30, 60, 100],
      pageSize: 30,
      close1: false,
      close2: false,
      close3: false,
      isShow:false,
      isgetTime:false,
      isCtPt:false,
      timeArr:[],
      subObj :{},
      upataQuerys:{},
      startTime:'',
      endTime:''
    };
  },
  props: ["querys"],
  created() {
    this.getData();
  },
  watch: {
    subObjs: {
      handler(news) {
        if(this.subObjs.ct1 == this.subObj.ct1 && this.subObjs.ct2 == this.subObj.ct2 && this.subObjs.pt1 == this.subObj.pt1 && this.subObjs.pt2 == this.subObj.pt2) {
          this.isCtPt = false
        } else {
          this.isCtPt = true
        }
        
      },
      deep:true
    },
  },
  methods: {
    changePage() {
      this.getData();
    },
    changePageSize(val) {
      this.pageSize = val;
      this.getData();
    },
    getData() {
      this.timeArr = []
      //获取厂站Meter
      this.$http
        .get("/quotaService/quota/getMeter", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            stId: this.querys.mrId,
            pageIndex: this.currentPage,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          // console.log(res.data.meters);
          if (res.data.code === 1) {
            this.dataList = res.data.data.meters;
            this.totalCount = res.data.pojoTotalCount;
          }
        });
    },
    getItem(item) {
      this.subData = item;
      this.subObjs = {
        ct1 :item.ct1,
        ct2 :item.ct2,
        pt1 :item.pt1,
        pt2 :item.pt2,
      }
      this.subObj = Object.assign({},this.subObjs);
      for (var attr in item) {
        this.backupData[attr] = item[attr];
      }
    },
    backData() {
      //为保存退出，还原数据
      for (var attr in this.backupData) {
        this.subData[attr] = this.backupData[attr];
      }
      console.log(this.subData);
    },
    saveMeter() {
      //保存修改
      var querys = {};
      querys.mrid = this.subData.mrid;
      querys.localName = this.subData.localName;
      querys.pathName = this.subData.pathName;
      querys.ct1 = this.subObjs.ct1;
      querys.ct2 = this.subObjs.ct2;
      querys.pt1 = this.subObjs.pt1;
      querys.pt2 = this.subObjs.pt2;
      querys.dataPrecision = this.subData.dataPrecision;
      querys.dataInterval = this.subData.dataInterval;
      querys.isInUse = this.subData.isInUse;
      querys.class2TimeTag = this.subData.class2TimeTag;
      querys.class3TimeTag = this.subData.class3TimeTag;
      querys.devId = this.backupData.devId;
      this.upataQuerys = querys
      if(this.isCtPt) {
        this.isShow = true
      } else {
        this.updateMeter(this.upataQuerys)
      }
    },
    operationBtn() {
      this.close1 = true;
    },
    operate(item) {
      //投运
      var queryStr = item.join(",");
      this.$http
        .post(
          "/maintenanceService/maintenance/commissioningModel?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            mrids: queryStr,
            modelType: 15
          })
        )
        .then(res => {
          if (res.data.code === 1) {
            this.getData();
            this.$notify({
              title: "提示",
              message: "投运成功",
              duration: 1500,
              type: "success"
            });
            
          } else {
            this.$notify({
              title: "提示",
              message: "投运异常",
              duration: 1500,
              type: "error"
            });
          }
        });
    },
    retireBtn() {
      this.close2 = true;
    },
    reoperate(item) {
      //退役
      var queryStr = item.join(",");
      this.$http
        .post(
          "/maintenanceService/maintenance/decommissionModel?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            mrids: queryStr,
            modelType: 15
          })
        )
        .then(res => {
          if (res.data.code === 1) {
            this.getData();
            this.$notify({
              title: "提示",
              message: "退役成功",
              duration: 1000,
              type: "success"
            });
          } else {
            this.$notify({
              title: "提示",
              message: "退役异常",
              duration: 1000,
              type: "error"
            });
          }
        });
    },
    refromBtm() {
      this.close3 = true;
    },
    checkAll(event) {
      if (event.target.nodeName == "INPUT") {
        if (event.target.checked) {
          this.dataList.forEach(item => {
            this.operation.push(item.mrid);
          });
        } else {
          this.operation = [];
        }
      }
    },
    hideFloat() {
      this.close1 = false;
      this.close2 = false;
    },
    // 更新电表详细信息
    updateMeter(querys) {
      this.$http
        .post(
          "/maintenanceService/maintenance/updateMeter?sign=" +
            sessionStorage.getItem("accessToken"),
          querys
        )
        .then(res => {
          if (res.data.code === 1) {
            // alert(res.data.msg)
            this.$notify({
              title: "提示",
              message: "操作成功",
              duration: 1500,
              type: "success",

            });
            this.close = false;
            this.getData()
          } else {
            this.$notify({
              title: "提示",
              message: "保存异常",
              duration: 1500,
              type: "error"
            });
          }
        });
    },
    // 修改ct/pt后需要调的方法
    reTaskEnergys() {
      var arr = []
      arr.push({
        type:1,
        stId:this.querys.mrId,
        startTime:this.startTime,
        endTime:this.endTime
      })
      this.$http.post("/maintenanceService/dateMaintenanceService/reTaskEnergys?sign="+sessionStorage.getItem("accessToken"),arr)
        .then(res=>{

        })
    },
    corfrim() {
      if(this.timeArr && this.timeArr.length>0) {
        this.isgetTime = true
        this.startTime = this.timeArr[0]
        this.endTime = this.timeArr[1]
        this.isShow = false
        this.isCtPt = false
        this.updateMeter(this.upataQuerys)
        this.reTaskEnergys()
      } else {
        this.isgetTime = false
        this.$notify({
          title: "提示",
          message: "请选取时间",
          duration: 1500,
          type: "error"
        });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let scroll2 = new BScroll(".dash_sub1_table", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
        preventDefault: false
      });
    });
  },
  components: {
    overlay,
    touyun,
    tuiyi,
    gaizao
  }
};
</script>
<style lang="css">
.sub_main {
  margin: 18px 8px;
  border: 1px solid #0d7474;
}
.btn_content2 {
  text-align: center;
  /* margin-top:170px; */
  margin-bottom: 18px;
}

/* select对齐  @yangchun*/
.txta{
    width: 172px;
    text-align: center;
    text-align-last: center;
    height: 30px;
}
</style>
