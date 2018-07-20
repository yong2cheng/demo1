<template lang="html">
  <div class="main">
    <span class="bread_nav">
      <router-link :to="{path:'/dlywkhd/sjtj',query:{sysId:$route.query.sysId,sonid:$route.query.sonid}}">事件提交></router-link>
    </span>
    <span class="bread_nav">表计倍率更换事件</span>
    <div class="mxian_succ ">
      <div class="tool_bar event_tool_bar">
        
        <!-- <label style="margin-left:10px;">状态：</label>
        <select  v-model='status'>
          <option value="">请选择状态</option>
          <option value="1">处理中</option>
          <option value="2">未处理</option>
          <option value="3">处理完成</option>
        </select> -->
        <label >电表：</label>
        <input type="text" class="txt" placeholder="输入电表或者厂站" v-model='meterName' >
        <label style="margin-left:18px;">时间：</label>
        <el-date-picker
          class="modified_ate"
          v-model="time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
        <el-date-picker
          class="modified_ate"
          v-model="time1"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
        <button class="primary right status_btn" @click="getData()">查询</button>
        
      </div>
      <div class="events_wrap">
        <!-- <div class="tree_wrap">
          <div class="treeZone">
            <div class="zone" v-show='showTree'>r
              <tree :data='firstData' @sendTreeInfo="getMenu" lastAttr="sbtId"></tree>
            </div>
          </div>
          <div class="tree_tollgo" @click="showTree=!showTree"></div>
        </div> -->
        <div class="event_table_main">
          <div class="table_tool">
            <router-link class="right btn" :to="{ path: paths+'/addctpt', query: {sysId:$route.query.sysId,sonid:$route.query.sonid} }">新增</router-link>
            <router-link class="right btn" :to="{ path: paths+'/status', query: {sysId:$route.query.sysId,sonid:$route.query.sonid,type:1,} }">查看重计算任务状态</router-link>
            <button type="button" class="warning right" @click="open2()">删除</button>
          </div>
          <table class="table">
            <thead>
              <tr>
               <td width="8%">
                  <input type="checkbox"  v-model='hasCheckAll' @change="checkAll()">
                  勾选
                </td>
                <td width="8%">
                  序号
                </td>
                <td style="position: relative;">平台电表名称
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='meterName';direction=1;getData()"></span>
                    <span class="reverse_order" @click="orderColumn='meterName';direction=0;getData()"></span>
                  </div>
                </td>
                 <td style="position: relative;">电压等级
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='bvId';direction=1;getData()"></span>
                    <span class="reverse_order" @click="orderColumn='bvId';direction=0;getData()"></span>
                  </div>
                 </td>
                <td style="position: relative;">厂站名称
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='stName';direction=1;getData()"></span>
                    <span class="reverse_order" @click="orderColumn='stName';direction=0;getData()"></span>
                  </div>
                </td>
                  <td style="position: relative;">地区
                    <div class="common_sort">
                      <span class="positive_sequence" @click="orderColumn='systemName';direction=1;getData()"></span>
                      <span class="reverse_order" @click="orderColumn='systemName';direction=0;getData()"></span>
                    </div>
                  </td>
                <td style="position: relative;">
                  操作时间
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='ctptChangeTime';direction=1;getData()"></span>
                    <span class="reverse_order" @click="orderColumn='ctptChangeTime';direction=0;getData()"></span>
                  </div>
                </td>
              </tr>
            </thead>
          </table>
          <div class="event_table">
            <table class="table">
              <tbody>
                <tr v-for="(item,index) in dataList">
                 <td width="8%">
                    <input type="checkbox" :value="item.id" v-model="deletArr">
                  </td>
                  <td width="8%">
                    {{pageSize*(currentPage-1)+index +1}}
                  </td>  
                  <td @mouseenter.stop="showFloat($event,item.id)"
                  @mouseleave.stop="hideFloat($event)">
                    <span class="color_warning">{{item.meterName}}</span>
                  </td>
                  <td>{{mapBvId(item.bvId)}}</td>
                  <td>{{item.stName}}</td>
                 
                   <td>{{item.systemName}}</td>
                  <td>{{item.ctptChangeTime}}</td>                  
                </tr>
              </tbody>
            </table>
          </div>
          <el-pagination
            class="pagination_margin"
            background
            @current-change='changePage'
            @size-change="changePageSize"
            :current-page.sync="currentPage"
            layout="total,sizes,prev, pager, next,jumper"
            :page-sizes="pageSizes"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <float v-if='tip' ref='tips' :x='xx' :y="yy" :data='floatData'></float>
    <loading :isLoading='loading'></loading>
  </div>
</template>
<script>
import bvid from "@/assets/config/bvidMap";
// import tree from "@/components/common/tree.vue";
// import treeMinx from "@/components/mixins/tree";
import float from "../common/float";
import BScroll from "better-scroll";
import loading from "@/components/common/loading";
export default {
  name: "ctpt",
  data() {
    return {
      showTree: false,
      time: this.$route.query.date + "-01",
      time1: this.$day(this.$route.query.date)
        .add(1, "month")
        .format("YYYY-MM-DD"),
      status: "",
      meterName: "",
      vlId: "",
      dataList: [], //列表集合
      tip: false,
      xx: 0,
      yy: 0,
      floatData: {},
      deletArr: [],
      sort: "desc", //排序
      totalCount: 1, //总条数
      currentPage: 1, //当前页码
      pageSizes: [20, 40, 80],
      pageSize: 20,
      hasCheckAll: false,
      loading: true,
      con: false,
      orderColumn:'',
      direction:1
    };
  },
  created() {
    this.getData();
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
      //搜索
      let querys = {
        sign: sessionStorage.getItem("accessToken"),
        eventType: 1,
        bvId: this.$route.query.bvId ? this.$route.query.bvId : "",
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        startTime: this.time,
        endTime: this.time1,
        orderColumn :this.orderColumn,
        direction :this.direction
      };
      if (this.$route.query.areaId) {
        querys.systemId = this.$route.query.areaId;
      }
      if (this.vlId) {
        querys.vlId = this.vlId;
      }
      if (this.meterName) {
        querys.meterName = this.meterName;
      }
      if (this.status) {
        querys.status = this.status;
      }
      this.loading = true;
      this.$http
        .get("/maintenanceService/eventChangedLogsService/getEventChangeLogs", {
          params: querys
        })
        .then(res => {
          if (res.data.code === 1) {
            this.loading = false;
            this.dataList = res.data.data.eventChangeVOS;
            this.totalCount = res.data.pojoTotalCount;
          }
        });
    },
    getFloatData(id) {//浮动框
      this.$http
        .get("maintenanceService/eventChangedLogsService/getEventChangeById", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            id: id,
            eventType: 1
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            // console.log(res);
            this.floatData = res.data.data.eventChange;
          }
        });
    },
    showFloat(event, id) {
      //显示浮动
      this.tip = true;
      this.xx = event.currentTarget.getBoundingClientRect().right+23;
      this.yy = event.currentTarget.getBoundingClientRect().top;
      this.getFloatData(id);
    },
    hideFloat() {
      //隐藏
      this.tip = false;
    },
    deletLogs() {//删除
      if (this.deletArr.length > 0) {
        // let con = window.confirm('【系统提示】确认删除此记录吗?')
        if (this.con) {
          this.$http
            .delete(
              "maintenanceService/eventChangedLogsService/delEventChangeLogs",
              {
                params: {
                  sign: sessionStorage.getItem("accessToken"),
                  ids: this.deletArr.join(","),
                  eventType: 1
                }
              }
            )
            .then(res => {
              console.log(res);
              this.deletArr = [];
              this.$notify({
                title: "提示",
                message: "删除成功",
                duration: 1500,
                type: "success"
              });
              this.getData();
            });
        }
      } else {
        this.$notify({
          title: "提示",
          message: "请先勾选电表",
          duration: 1500,
          type: "warning"
        });
      }
    },
    open2() {
      this.$confirm('删除事件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.con = true;
          this.deletLogs();
        }).catch(() => {});
    },
    goback(num) {
      this.$router.go(num);
    },
    checkAll() {
      if (this.hasCheckAll) {
        this.deletArr = [];
        this.dataList.forEach(item => {
          this.deletArr.push(item.id);
        });
        // console.log(this. deletArr)
      } else {
        this.deletArr = [];
      }
    },
    mapBvId(id) {
      var bv = "";
      bvid.forEach(element => {
        if (element.bvId == id) {
          bv = element.dydj + "kV";
        }
      });
      return bv;
    }
  },
  computed: {
    paths() {
      //转跳路径
      var pathArr = this.$route.path.split("/");
      return "/" + pathArr[1] + "/" + pathArr[2];
    }
  },
  // mixins: [treeMinx],
  components: {
    // tree,
    float,
    loading
  },
  watch: {
    deletArr: function(news) {
      if (this.deletArr.length == this.dataList.length) {
        this.hasCheckAll = true;
      } else {
        this.hasCheckAll = false;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let event_table = new BScroll(".event_table", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        preventDefault: false,
        mouseWheel: true
        // disableMouse: true
      });
    });
  }
};
</script>

<style lang="css">
.tool_bar {
  width: 99%;
  margin: 5px 0.5%;
  position: relative;
  border-bottom: 1px solid #0d7474;
  height: 70px;
  line-height: 70px;
}
.event_tool_bar {
  box-sizing: border-box;
  padding: 0 1%;
}
.status_btn {
  margin-top: 20px;
}
.events_wrap {
  box-sizing: border-box;
  min-height: 200px;
  display: flex;
}
.table_tool {
  overflow: hidden;
  margin: 10px 0;
  padding-bottom: 12px;
  border-bottom: 1px dashed #0d7474;
}
.event_table_main {
  margin: 15px;
  padding: 10px;
  flex: 1;
  border: 1px solid #0d7474;
}
.event_table {
  max-height: 400px;
  overflow: hidden;
  position: relative;
  margin-bottom: 12px;
}
.shang {
  border: 4px solid transparent;
  border-bottom: 4px solid #6bc30d;
}
.xia {
  border: 4px solid transparent;
  border-top: 4px solid #6bc30d;
}
.pagination_margin{
  padding-top: 16px;
  border-top: 1px dashed #0d7474;
}
</style>
