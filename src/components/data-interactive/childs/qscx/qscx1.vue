<template>
   <div class="main main_se yxdady">
      <div class="head_bar">
          <h2 class="cjxqbt" style="text-align:center;font-size:16px;margin:5px;">日冻结采集工况</h2>

            <span>单位：</span>

            <select @change="getAreaBvList()" v-model="mrId"  name="" id="">
                <option :key="index" v-for="(item,index) in diquNames" :value="item.mrId">{{item.areaName}}</option>
            </select>

            <span> 电压等级：</span>
            <select id="dydjsel">
                <option :key="index" v-for="(item,index) in diyas" :value="item.mrId">{{item}}</option>
            </select>

            <span> 厂站定位：</span>
            <input type='text' class="txt" id='xlmc-name' />

            <label><input type="checkbox" name="cjcg" id="queCheck"> 缺数</label>&nbsp;&nbsp;&nbsp;&nbsp;
            <label><input type="checkbox" name="cjcg"> 数据异常</label>	
            <div style="float:right;">
                <el-date-picker
                type="month"
                v-model="mounthDate"
                value-format="yyyy-M"
                placeholder="yyyy-M">
                </el-date-picker>
                <button>提交</button>
            </div>
      </div>
    
        <table class="table">
      <thead>
          <tr :key="indexd" v-for="(item,indexd) in theads">
              <td :key="indexm" v-for="(child,indexm) in item" :colspan="child.numone" :rowspan="child.numtwo">{{child.name}}</td>
          </tr>
      </thead>
      <tbody>
          <tr :key="indexd" v-for="(item,indexd) in tbodys">
              <td :key="indexm" v-for="(child,indexm) in item" :colspan="child.numone" :rowspan="child.numtwo">{{child.name}}</td>
          </tr>
      </tbody>
  </table>
   </div>
</template>
<script>
import $areaId from "../../../../assets/config/areaMap"
import $bvid from "../../../../assets/config/bvidMap"
export default {
  data:function(){
      return{
          theads:[],
          tbodys:[],
          mounthDate:"",
          diquNames:[],
          diyas:[],
          mrId:''
      }
  },
  mounted:function(){
      var a=new Date();
     // a=a.getMonth();
      var year=a.getFullYear();
      var mounth=a.getMonth()+1;
      this.mounthDate=year+'-'+mounth;

      if(sessionStorage.getItem("systemId")===null||sessionStorage.getItem("systemId")=='undefined'||sessionStorage.getItem("systemId")==15){
          this.diquNames=this.diquNames.concat($areaId);
          this.mrId=1000000;
      }else if(sessionStorage.getItem("systemId")==16){
          $areaId.splice(0,1);
          this.diquNames=this.diquNames.concat($areaId);
            this.mrId=1030000;
      }else if(sessionStorage.getItem("systemId")==0){
          $areaId.splice(0,2);
          this.diquNames=this.diquNames.concat($areaId);
          this.mrId=4200000;
      }else{
          for(var a in $areaId){
              if(a.areaId==sessionStorage.getItem("systemId")){
                  this.diquNames.this.diquNames.concat(a);
                  this.mrId=a.mrId;
              }
          }
      }
        this.$http.get("/servicequery/query/getAreaBvList?appkey=3917230828&sign=b.vHKm2ilHJdzoK0vuMBui1El1xl7FT_PIX32Dr0om.MOCg9TMJTssZiXGMpTwLipduig7o94vrCLLd6xsZt1g--___1524538673138___8000400001___8000400001___8000400001___2___&areaId="+this.mrId)
        .then((res)=>{
            var data=res.data.bvList;
            console.log(data);
            for(var b of data){
                for(var a of $bvid){
                if(a.bvId==b){
                    this.diyas.push(a.dydj+'kV');
                }
            }
            }
            console.log(this.diyas);
        })
        .catch(function(error) {
        alert(error);
        });
  },
  methods:{
      getAreaBvList(){
          this.$http.get("/servicequery/query/getAreaBvList?appkey=3917230828&sign=b.vHKm2ilHJdzoK0vuMBui1El1xl7FT_PIX32Dr0om.MOCg9TMJTssZiXGMpTwLipduig7o94vrCLLd6xsZt1g--___1524538673138___8000400001___8000400001___8000400001___2___&areaId="+this.mrId)
        .then((res)=>{
            var data=res.data.bvList;
            console.log(data);
            this.diyas=[];
            for(var b of data){
                for(var a of $bvid){
                if(a.bvId==b){
                    this.diyas.push(a.dydj+'kV');
                }
            }
            }
            console.log(this.diyas);
        })
        .catch(function(error) {
        alert(error);
        });
      }
  }
}
</script>
<style>

</style>