<template>
  <div class="main">
    <div class="mxian_succ sjtj_main">
      <div class="stjt_data_tool">
        <el-date-picker
          class="modified_ate"
          v-model="time"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择日期">
        </el-date-picker>
        <button type="button" name="button" @click="getData()">查询</button>
      </div>
      <div class="sttj_ctst_wrap">
        <p class="sjtj_title">按电压等级分</p>
        <table class="table">
          <thead>
            <tr>
              <td>电压等级</td>
              <td>表计倍率更换事件</td>
              <td>换表事件</td>
              <td>旁路代事件</td>
            </tr>
          </thead>
        </table>
        <div class="StName_table">
          <table class="table">
            <tbody>
              <tr v-for="(item,index) in ctptData" :key="index">
                <td>{{item.statisticName}}</td>
                <td>
                  <router-link :to="{ path: $route.path+'/ctpt', query: {sysId:$route.query.sysId,sonid:$route.query.sonid,bvId:item.id,date:time}}" class="color_warning">
                    {{item.ctptChangeLogCount}}
                  </router-link>
                </td>
                <td>
                  <router-link :to="{ path: $route.path+'/meters', query: {sysId:$route.query.sysId,sonid:$route.query.sonid,bvId:item.id,date:time}}" class="color_warning">
                    {{item.meterChangeLogCount}}
                  </router-link>
                </td>
                <td></td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <table class="table">
          <tr>
            <td>合计</td>
            <td>{{ctptCount1}}</td>
            <td>{{ctptCount2}}</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="sttj_ctst_wrap area">
        <p class="sjtj_title">按地区划分</p>
        <table class="table">
          <thead>
            <tr>
              <td>地区</td>
              <td>表计倍率更换事件</td>
              <td>换表事件</td>
              <td>旁路代事件</td>
            </tr>
          </thead>
        </table>
        <div class="BvName_table">
          <table class="table">
            <tbody>
              <tr v-for="(item,index) in meterData" :key="index">
                <td>{{item.statisticName}}</td>
                <td>
                  <router-link :to="{ path: $route.path+'/ctpt', query: {sysId:$route.query.sysId,sonid:$route.query.sonid,areaId:item.id,date:time}}" class="color_warning">
                    {{item.ctptChangeLogCount}}
                  </router-link>
                </td>
                <td>
                  <router-link :to="{ path: $route.path+'/meters', query: {sysId:$route.query.sysId,sonid:$route.query.sonid,areaId:item.id,date:time}}" class="color_warning">
                    {{item.meterChangeLogCount}}
                  </router-link>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <table class="table">
          <tr>
              <td>合计</td>
              <td>{{meterCount1}}</td>
              <td>{{meterCount2}}</td>
              <td></td>
            </tr>
        </table>
      </div>
    </div>
    <loading :isLoading='loading'></loading>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import loading from "@/components/common/loading"
export default {
  name:"sjtj",
  data(){
    return{
      time:this.$day().format('YYYY-MM'),
      ctptData:[],
      ctptCount1:0,
      ctptCount2:0,
      meterData:[],
      meterCount1:0,
      meterCount2:0,
      loading:true
    }
  },
  components: {
    loading
  },
  created(){
    if (this.$day().format('DD')<10) {//小于10，显示上个月
      this.time = this.$day().subtract(1, 'months').format('YYYY-MM')
    }
    this.getData();
  },
  methods:{
    getData(){
      let querys={
        sign:sessionStorage.getItem('accessToken'),
        day:this.time,
      };
      if(sessionStorage.getItem('systemId')){
        querys.systemId = sessionStorage.getItem('systemId')
      }
       this.ctptData=[];
       this.meterData =[];
       this.ctptCount1=0;
        this.ctptCount2=0;
        this.meterCount1=0;
        this.meterCount2=0;
      this.$http.get("/maintenanceService/eventChangedLogsService/getEventChangeLogsCount",{
        params:querys
      })
      .then(res=>{
        if (res.data.code === 1) {
          this.loading=false;
          this.ctptData = res.data.data.ctptChangeCountByBvName;
          for(var a of this.ctptData){
            this.ctptCount1+=a.ctptChangeLogCount;
            this.ctptCount2+=a.meterChangeLogCount;
          }
          this.meterData = res.data.data.meterChangeCountBySystemName;
          for(var a of this.meterData){
            this.meterCount1+=a.ctptChangeLogCount;
            this.meterCount2+=a.meterChangeLogCount;
          }
        } 
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      let BvName_table = new BScroll('.BvName_table', {
        scrollbar: {
          fade: false,
          interactive: true
        },
         mouseWheel: true,
          preventDefault:false
      })
      let StName_table = new BScroll('.StName_table', {
       scrollbar: {
          fade: false,
          interactive: true
        },
         mouseWheel: true,
          preventDefault:false
        })
    })
  },
}
</script>

<style lang="css">
.sjtj_main{
  box-sizing: border-box;
  padding: 20px;
}
.stjt_data_tool{
  text-align: right;
  padding-bottom: 18px;
    border-bottom: 1px solid #0d7474;
    margin-bottom: 18px;
}
.sttj_ctst_wrap.area{
  margin-top: 60px;
}
.sjtj_title{
  margin-bottom: 20px;
}
.BvName_table,.StName_table{
  max-height: 300px;
  overflow: hidden;
  position: relative;
}
</style>
