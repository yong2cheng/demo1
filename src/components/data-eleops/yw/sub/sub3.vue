<template>
    <!-- 线端,开关，机组 -->
    <div class="tsub3">
        <div class="t_title">{{name}}信息</div>
        <div class="t_sousuo" style="text-align:right;"><button @click="del" class="warning">删除</button></div>
        <table class="table">
            <thead>
                <tr>
                    <td><input :checked="quanxuan" @click="quanxuan=!quanxuan" type="checkbox"></td>
                    <td>序号</td>
                    <td colspan="2">MRID</td>
                    <td colspan="2">设备全路径名称</td>
                    <td colspan="2">电量主站设备名称</td>
                    <td v-if="name!='变压器'">电压等级</td>
                    <td>投运状态</td>
                </tr>
            </thead>
        </table>
        <div class="scroll">
            <table class="table">
                <tr v-if="medols.length<=0">
                    <td colspan="7">暂无数据</td>
                </tr>
                <tr :key="index" v-for="(item,index) in medols">
                    <td><input type="checkbox" v-model="delData" :value="item.mrid"></td>
                    <td>{{index-(-1)}}</td>
                    <td colspan="2"><span @click="modify(index)" class="color_warning">{{item.mrid}}</span> </td>
                    <td colspan="2">{{item.pathName}}</td>
                    <td colspan="2">{{item.localName}}</td>
                    <td v-if="name!='变压器'">{{item.dydj}}</td>
                    <td>{{item.isInUseName}}</td>
                </tr>
            </table>
        </div>
        <overlay owidth="500px" oheight="450px" :close.sync="close">
            <div style="padding:20px 10px;">
                <div class="t_title">
                    {{name}}
                </div>
                <div>
                    <p style="line-height:50px;text-align:center;">
                        <span style="width:150px;display:inline-block;text-align:right;">设备全路径名称：</span>
                        <input v-model="sName" type="text" class="txt" disabled>
                    </p>
                    <p style="line-height:50px;text-align:center;">
                        <span style="width:150px;display:inline-block;text-align:right;">电量主站设备名称：</span>
                        <input v-model="dName" type="text" class="txt"/>
                    </p>
                    <p style="line-height:50px;text-align:center;">
                        <span style="width:150px;display:inline-block;text-align:right;">关联ID：</span>
                        <input v-model="otherKey3" type="text" class="txt"/>
                    </p>
                    <p style="line-height:50px;text-align:center;">
                        <span style="width:150px;display:inline-block;text-align:right;">关联地区：</span>
                        <select style="width:154px;" v-model="otherKey4" name="" id="">
                            <option :key="index" :value="item.areaId" v-for="(item,index) in areaid">{{item.areaName}}</option>
                        </select>
                    </p>
                    <p style="line-height:50px;text-align:center;">
                        <span style="width:150px;display:inline-block;text-align:right;">投运状态：</span>
                        <select style="width:154px;" v-model="isInUse" name="" id="">
                            <option value="0">未投运</option>
                            <option value="1">投运</option>
                        </select>
                    </p>
                    <p v-if="name!='变压器'" style="line-height:50px;text-align:center;">
                        <span style="width:150px;display:inline-block;text-align:right;">电压等级：</span>
                        <select style="width:154px;" v-model="bvId" name="" id="">
                            <option value="1">1000kV</option>
                            <option value="2">800kV</option>
                            <option value="4">750kV</option>
                            <option value="6">500kV</option>
                            <option value="8">400kV</option>
                            <option value="9">330kV</option>
                            <option value="10">220kV</option>
                            <option value="12">110kV</option>
                            <option value="13">66kV</option>
                            <option value="14">35kV</option>
                            <option value="15">20kV</option>
                            <option value="16">15kV</option>
                            <option value="17">13kV</option>
                            <option value="18">10kV</option>
                            <option value="19">6kV</option>
                        </select>
                    </p>
                </div>
                <div style="line-height:50px;" class="t_foot">
                    <button @click="save">确定</button>
                    <button @click="chongz" class="warning">重置</button>
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
import overlay from "@/components/common/overlay";
import Bus from "@/assets/eventBus.js";
import BScroll from "better-scroll";
import $areaid from "@/assets/config/areaMap";
export default {
  props: ["name","medols","stId"],
  components: {
    overlay
  },
  data: function() {
    return {
        token:sessionStorage.getItem("accessToken"),
      sName: "",
      dName: "",
      bvId: 1,
      mrid:"",
      close: false,
      medol:{},
      quanxuan:false,
      delData:[],
      scroll:'',
      isLoading:false,
      otherKey3:"",
      otherKey4:"",
      isInUse:"",
      areaid:$areaid
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(".scroll", {
        scrollbar: { fade: false, interactive: true },
        preventDefault: false,
        mouseWheel: true,
        startY:0
      });
    });
  },
  methods:{
      modify(index){
          this.close=true;
          this.medol=this.medols[index];
          this.sName=this.medols[index].pathName;
          this.dName=this.medols[index].localName;
          this.bvId=this.medols[index].bvId;
          this.otherKey3=this.medols[index].otherKey3;
          this.otherKey4=this.medols[index].otherKey4;
          this.status=this.medols[index].status;
          this.isInUse=this.medols[index].isInUse;
          this.mrid=this.medols[index].mrid;
      },
      chongz(){
          this.sName=this.medol.pathName;
          this.dName=this.medol.localName;
          this.bvId=this.medol.bvId;
          this.otherKey3=this.medol.otherKey3;
          this.otherKey4=this.medol.otherKey4;
          this.status=this.medol.status;
          this.isInUse=this.medol.isInUse;
      },
      getAreaName(areaId){
          for(var a of $areaid){
              if(a.areaId==areaId){
                  return a.areaName;
              }
          }
      },
      save(){
          this.isLoading=true;
          var arr={
              bvId:this.bvId,
              localName:this.dName,
              pathName:this.sName,
              mrid:this.mrid,
              stId:this.stId,
              otherKey3:this.otherKey3,
              otherKey4:this.getAreaName(this.otherKey4),
              isInUse:this.isInUse
          }
          if(this.name=="线端"){
              var query='updateAclineend';
          }else if(this.name=="变压器"){
              var query="updatePowertransformer";
          }else if(this.name=="开关"){
              var query='updateBreaker';
          }else if(this.name=="机组"){
               var query='updateGeneratingUnit';
          }else if(this.name=="电容"){
              var query="updateCompensator";
          }else if(this.name=="负荷"){
              var query="updateEnergyConsumer"
          }else if(this.name=="虚拟设备"){
              var query="updateVirtureEquipment";
          }
          this.$http.post("http://10.172.246.77:23880/maintenanceService/maintenance/"+query+"?sign="+this.token,
              arr)
              .then(res=>{
                  if(res.data.code==1){
                      this.$notify({
                        title: '成功',
                        message: '保存成功',
                        type: 'success'
                        });
                        this.isLoading=false;
                        this.close=false;
                        Bus.$emit("TstId","");
                        Bus.$emit("TstId",this.stId);
                  }
              })
      },
      del(){
          console.log(this.delData);
      }
  },
  watch: {
    quanxuan: function() {
      if (this.quanxuan) {
        console.log(1);
        for(var a of this.medols){
            this.delData.push(a.mrid);
        }
      } else {
        this.delData = [];
      }
    },
    name:function(){
        if(this.scroll){
            this.scroll.destroy();
        }
            this.$nextTick(() => {
          this.scroll = new BScroll(".scroll", {
            scrollbar: { fade: false, interactive: true },
            preventDefault: false,
            mouseWheel: true
          });
        }); 
    }
  }
};
</script>
<style>
.tsub3{
    position:relative;
    height:100%;
}
.tsub3 .scroll {
  height: calc(100% - 109px);
  position: relative;
  overflow: hidden;
}
</style>
