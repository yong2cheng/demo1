<template lang="html">
  <div class="sjzl_sub_wrap">
    <div class="tool_bar sjzl_tool_bar">
      <el-date-picker
        class="modified_ate"
        v-model="time"
        type="month"
        value-format="yyyy-MM"
        placeholder="选择日期">
      </el-date-picker>
      <button type="button" class="text" @click="getData()">查询</button>
    </div>
    <div class="sjzl_table_wrap">
      <table class="table">
        <thead>
          <tr>
            <td rowspan="2">序号</td>
            <td rowspan="2">地区</td>
            <td colspan="3">厂站</td>
            <td colspan="3">母线</td>
            <td colspan="3">计量点</td>
            <td colspan="3">指标达标</td>
            <td rowspan="2">电量值偏差</td>
          </tr>
          <tr>
            <td>本系统</td>
            <td>线损系统</td>
            <td>偏差</td>
            <td>本系统</td>
            <td>线损系统</td>
            <td>偏差</td>
            <td>本系统</td>
            <td>线损系统</td>
            <td>偏差</td>
            <td>本系统</td>
            <td>线损系统</td>
            <td>偏差</td>
          </tr>
        </thead>
      </table>
      <div class="sjzl_table">
        <table class="table">
          <tbody>
            <tr v-for="(item,index) in dataArr">
              <td>{{index + 1}}</td>
              <td>{{item.areName}}</td>
              <td>{{item.substationCount}}</td>
              <td>{{item.mpSubstationCount}}</td>
              <td>
                <span class="color_warning"
                @click='close=true;
                queryObj=item'>
                    {{item.substationDeviation}}
                </span>
              </td>
              <td>{{item.busbarCount}}</td>
              <td>{{item.mpBusbarCount}}</td>
              <td>
                <span class="color_warning"
                @click='close=true;
                queryObj=item'>
                  {{item.busbarDeviation}}
                </span>
              </td>
              <td>{{item.meteringPointCount}}</td>
              <td>{{item.mpMeteringPointCount}}</td>
              <td>
                <span class="color_warning"
                @click='close=true;
                queryObj=item'>
                  {{item.meteringPointDeviation}}
                </span>
              </td>
              <td>{{item.standardCount}}</td>
              <td>{{item.mpStandardCount}}</td>
              <td>
                <span class="color_warning"
                @click='close=true;
                queryObj=item'>
                  {{item.standardDeviation}}
                </span>
              </td>
              <td>
                <span class="color_warning"
                @click='close=true;
                queryObj=item'>
                  {{item.electricDeviation}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <overlay :close.sync="close">
      <div class="alert_wrap">
        <alert :query='queryObj' :times='time' v-if="close"></alert>
      </div>
    </overlay>
  </div>
</template>
<script>
import overlay from '@/components/common/overlay'
import alert from '../flow/alert.vue'
import BScroll from 'better-scroll'
export default {
  name:'sub4',
  data(){
    return{
      time:this.$day().format('YYYY-MM'),
      dataArr:[],
      close:false,
      queryObj:{},
    }
  },
  methods:{
    getData(){
      this.$http.get("/dataGovernanceService/dataGovernace/getSystemDeviation",{
        params:{
          type:1,
          day:this.time,
          sign:sessionStorage.getItem('accessToken'),
        }
      })
      .then(res=>{
        if (res.data.code ===1) {
           console.log(res);
           this.dataArr = res.data.data.systemDataDeviationVOList;
        }      
      })
    },
  },
  created(){
    this.getData();
  },
  mounted() {
    this.$nextTick(() => {
      let sjzl_table = new BScroll('.sjzl_table', {
        scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
         preventDefault:false
       // click: true,
      })
    })
  },
  components:{
    overlay,
    alert
  }
}
</script>

<style lang="css">
.tool_bar{
  width: 99%;
  margin: 5px .5%;
  position: relative;
  border-bottom: 1px solid #0d7474;
  height: 70px;
  line-height: 70px;
}
.sjzl_tool_bar{
  box-sizing: border-box;
  text-align: right;
  padding-right: 15px;
}
.sjzl_table_wrap{
  margin: 0 20px;
}
.sjzl_table{
  height: 500px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}
.alert_wrap{
    width: 50vw;
    height: 60vh;
    background: #043434;
    border: 1px solid #0d7474;
    padding: 8px;
}
</style>
