<template lang="html">
  <div class="main">
    <span class="bread_nav">
       <router-link :to="{path:'/dlywkhd/sjtj',query:{sysId:$route.query.sysId,sonid:$route.query.sonid}}">事件提交</router-link>
      ></span>
      <span class="bread_nav" v-if="$route.query.type===1" @click="goback(-1)">表计倍率更换事件></span>
      <span class="bread_nav" v-if="$route.query.type===2" @click="goback(-1)">换表事件></span>
    <span class="bread_nav"> 任务状态</span>
    <div class="mxian_succ">
      <div class="tool_bar event_tool_bar">
        <label style="margin-left:12px">电表：</label>
        <input type="text" class="txt" placeholder="输入电表" v-model='meterName' >        
        <label style="margin-left:12px">任务状态：</label>
        <select  v-model='status'>
          <option value="">所有状态</option>
          <option value="1">已提交</option>
          <option value="2">正在处理</option>
          <option value="3">处理成功</option>
          <option value="4">处理失败</option>
        </select>
        <label style="margin-left:12px">时间：</label>
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
        <button class=" right status_btn" @click="getData()">查询</button>
        <!-- <button class="right warning status_btn">清空</button> -->
        <button class="right status_btn" @click="getData()">刷新</button>
      </div>
      <div class="event_table_main">
        <table class="table">
          <thead>
            <tr>
              <td width="5%">序号</td>
              <td>电表名称</td>
              <td>事件类型</td>
              <td>事件开始日期</td>
              <td v-if="$route.query.type==2">事件结束日期</td>
              <td v-if="$route.query.type==2">任务处理开始时间</td>
              <td v-if="$route.query.type==2">任务处理结束时间</td>
              <td>任务状态</td>
            </tr>
          </thead>
        </table>
        <div class="event_table">
          <table class="table">
            <tbody>
              <tr v-for="(item,index) in dataList">
                <td width="5%">{{pageSize*(currentPage-1)+index +1}}</td>
                <td>{{item.meterName}}</td>
                <td>{{item.eventType}}</td>
                <td>{{item.startTime}}</td>
                <td v-if="$route.query.type==2">{{item.endTime}}</td>
                <td v-if="$route.query.type==2">{{item.taskTime}}</td>
                <td v-if="$route.query.type==2">{{item.endTaskTime}}</td>
                <td>{{statusMap[item.taskStatus]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
         <el-pagination
            background
            class="pagination_margin"
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
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      time: "",
      time1: "",
      status: '',
      statusMap: {
        "1": "已提交",
        "2": "正在处理",
        "3": "处理成功",
        "4": "处理失败"
      },
      meterName: "",
      dataList: [],
      totalCount: 1, //总条数
      currentPage: 1, //当前页码
      pageSizes: [20, 40, 80],
      pageSize: 20
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
      let querys = {
        sign: sessionStorage.getItem("accessToken"),
        eventType: this.$route.query.type,
        status: this.status,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        startTime: this.time,
        endTime: this.time1
      };
      if (this.meterName) {
        querys.meterName = this.meterName;
      }
      this.$http
        .get(
          "maintenanceService/eventChangedLogsService/getChangeEventReTask",
          {
            params: querys
          }
        )
        .then(res => {
          if (res.data.code === 1) {
            this.dataList = res.data.data.changeEventRetaskVOS;
            this.totalCount = res.data.pojoTotalCount;
          } else {
            // alert(res.data.msg);
            this.$notify({
              title: "提示",
              message: "发生未知错误！",
              duration: 2000,
              type: "error"
            });
          }
        });
    },
    goback(num) {
      this.$router.go(num);
    }
  },
  mounted() {
    this.$nextTick(() => {
      let event_table = new BScroll(".event_table", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
        preventDefault: false
      });
    });
  }
};
</script>

<style lang="css">
.pagination_margin {
  padding-top: 16px;
  border-top: 1px dashed #0d7474;
}
</style>
