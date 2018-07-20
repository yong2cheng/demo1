<template lang="html">
  <div class="sjzl_sub_wrap">
    <div class="tool_bar sjzl_fx_tool_bar">
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
      <div class="sjzl_table sjzl_table2">
        <table class="table">
          <thead>
            <tr>
              <td rowspan="2">序号</td>
              <td rowspan="2">地区</td>
              <td colspan="3">550kV</td>
              <td colspan="3">220kV</td>
              <td colspan="3">110kV</td>
              <td colspan="3">35kV</td>
              <td colspan="3">10kV</td>
              <td colspan="3">指标达标</td>
              <td rowspan='2' class="row2">电量值偏差</td>
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
              <td>本系统</td>
              <td>线损系统</td>
              <td>偏差</td>
              <td>本系统</td>
              <td>线损系统</td>
              <td>偏差</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataArr">
              <td>{{index +1}}</td>
              <td>{{mapArea(item.subAreaId)}}</td>
              <td>{{item.ac500}}</td>
              <td>{{item.mpac500}}</td>
              <td @click="close=true;">
                <span class="color_warning">
                  {{item.deviation500}}
                </span>
              </td>
              <td>{{item.ac220}}</td>
              <td>{{item.mpac220}}</td>
              <td @click="close=true;">
                <span class="color_warning">
                  {{item.deviation220}}
                </span>
              </td>
              <td>{{item.ac110}}</td>
              <td>{{item.mpac110}}</td>
              <td @click="close=true;">
                <span class="color_warning">
                  {{item.deviation110}}
                </span>
              </td>
              <td>{{item.ac35}}</td>
              <td>{{item.mpac35}}</td>
              <td @click="close=true;">
                <span class="color_warning">
                  {{item.deviation35}}
                </span>
              </td>
              <td>{{item.ac10}}</td>
              <td>{{item.mpac10}}</td>
              <td @click="close=true;">
                <span class="color_warning">
                  {{item.deviation10}}
                </span>
              </td>
              <td>{{item.busbar}}</td>
              <td>{{item.mpbusbar}}</td>
              <td @click="close=true;">
                <span class="color_warning">
                  {{item.deviationbusbar}}
                </span>
              </td>
              <td>{{item.energyDeviation}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <overlay :close.sync="close">
      <div class="alert_wrap">
        正在施工路上.......❤
      </div>
    </overlay>
  </div>
</template>

<script>
import overlay from '@/components/common/overlay'
import BScroll from 'better-scroll'
import bvid from "@/assets/config/bvidMap"
import area from "@/assets/config/areaMap"
export default {
  name:'sub5',
  data(){
    return{
      time:this.$day().format('YYYY-MM'),
      dataArr:[],
      close:false,
      systemId:'',
      alertData:[],//一级弹框数据
      countData:[],//一级弹框总数
      otherData:{},//其他信息数据
    }
  },
  methods:{
    getData(){//获取列表数据
      this.$http.get("/maintenanceService/maintenance/getBusbarGridLoss",{
        params:{
          month:this.time,
          sign:sessionStorage.getItem('accessToken'),
        }
      })
      .then(res=>{
        if (res.data.code === 1) {
           console.log(res);
          this.dataArr = res.data.data.busbarGridLossList;
        }      
      })
    },
    mapBvid(id){//根据电压等级，匹配电压名称
      let bvName='';
      bvid.forEach((item,index)=>{
        if (item.bvId == id) {
            bvName = item.dydj+'kV'
        }
      })
      return bvName;
    },
    mapArea(id){
      let areaName='';
      area.forEach((item,index)=>{
        if (item.mrId == id) {
            areaName = item.areaName
        }
      })
      return areaName;
    },
  },
  mounted() {
    this.$nextTick(() => {
      let sjzl_table2 = new BScroll('.sjzl_table2', {
        scrollbar: {
          fade: false,
          interactive: true
        },
         preventDefault:false,
        mouseWheel: true,
        scrollX : true,
        scrollY:true,
      })
    })
  },
  components:{
    overlay,
  }
}
</script>

<style lang="css">
.sjzl_fx_tool_bar{
  box-sizing: border-box;
  padding-right: 15px;
  text-align: right;
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
.sjzl_table2 table td{
  width: 200px;
}
.sjzl_table2 table thead td[rowspan]{
  width: 100px;
}
</style>
