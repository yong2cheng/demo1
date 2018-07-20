<template>
    <div class="xs_main">
        <div v-show="!toPeizhi" class="t_title">线损
          <div @click="tubiaochange()" class="tubiaobut right">
              <p>
                  <span>图</span>
                  <span>表</span>
              </p>
              <div :class="{tsleft:tubiao=='left',tsright:tubiao=='right'}" class="tsblock"></div>
          </div>
        </div>
        <peizhi v-show="toPeizhi"></peizhi>
        <div v-show="!toPeizhi" class="t_sousuo">
            <div v-show="tubiao=='left'" class="right">
                <input type="text" v-model="queryName" class="txt" placeholder="输入线路或厂站名称"/><button @click="getAcline(false)">按线路搜索</button><button @click="getAcline(true)">按厂站搜索</button>
            </div>
          <div style="clear:both;"></div>
        </div>
        <div v-show="!toPeizhi" class="xs_content">
            <one :bvId="bvId" v-show="tubiao=='left'"/>
            
            <tow v-if="tubiao=='right'"/>
        </div>
    </div>
</template>
<script>
import one from './xsOne';
import tow from './xsTow';
import peizhi from './peizhi';
import $areaId from "@/assets/config/areaMap";
import $bvid from "@/assets/config/bvidMap";
import Bus from "@/assets/eventBus.js";
export default {
  data() {
    return {
      token:sessionStorage.getItem("accessToken"),
      time: "",
      timeType: "date",
      timeFormat: "yyy-MM-dd",
      switchType:true,//图标切换
      tubiao:'left',
      bvId:6,
      tareaId:[],
      diquNames:[],
      tbvid:0,
      bvIdArr:[],
      queryName:"",
      toPeizhi:false
    };
  },components:{
      one,tow,peizhi
   },
   mounted(){
     Bus.$on('toPeizhi',target=>{
       this.toPeizhi=target;
     });
     Bus.$emit("TbvId", 6);
     if (
      sessionStorage.getItem("systemId") === null ||
      sessionStorage.getItem("systemId") == "undefined"
    ) {
      this.diquNames.push({areaId:"",areaName:"请选择",mrId:""})
      this.diquNames = this.diquNames.concat($areaId);
      this.tareaId = "";
    } else {
      for (var a of $areaId) {
        if (a.areaId == sessionStorage.getItem("systemId")) {
          this.diquNames = [a];
          this.tareaId = a.areaId;
        }
      }
    }
   },
   methods:{
     tubiaochange() {
      if (this.tubiao == "left") {
        this.tubiao = "right";
      } else {
        this.tubiao = "left";
      }
    },
    getBvId(systemId) {
      if(systemId===""){
        return;
      }
      this.$http
        .get(
          "/treeService/tree/getAllBaseVoltageTreeNodeBySystemId?sign=" +
            this.token +
            "&systemId=" +
            systemId
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$notify.error({
          title: '错误',
          message: "系统错误（code==0）"
        });
            return;
          }
          var data = res.data.data.allSubStations;
          this.bvIdArr = [];
          for (var a of data) {
            for (var b of $bvid) {
              if (a.id == b.bvId) {
                this.bvIdArr.push(b);
              }
            }
          }
          this.tbvid=this.bvIdArr[0].bvId;
        });
    },
    getAcline(iscz){
      if(iscz){
        Bus.$emit("TstartSbsName", this.queryName);
      }else{
        Bus.$emit("TaclineName", this.queryName);
      }
    }
   },
   watch:{
     tareaId: function() {
      this.getBvId(this.tareaId);
     }
   }
};
</script>
<style>
.xs_main{
  padding:10px 10px 10px 20px;
}
.xs_main .t_sousuo{
  padding-right:8px;
}
.xs_main .xs_tool_bar {
  width: 99%;
  margin: 5px 0.5%;
  position: relative;
  border-bottom: 1px solid #0d7474;
  height: 70px;
  /* line-height: 70px; */
  display: flex;
}
.xs_main .time_wrap {
  position: relative;
  height: 30px;
  margin-top: 26px;
}
.xs_main .time_con_li {
  height: 24px;
  position: absolute;
  left: 0;
  top: -24px;
}
.xs_main .time_con_li li {
  float: left;
  line-height: 24px;
  padding: 0 18px;
  background: #0d7474;
  color: #fff;
  margin-right: 5px;
  font-size: 12px;
  cursor: pointer;
}
.xs_main .time_con_li .li_now {
  background: #009f95;
}
.xs_main .vol_con {
  flex: 1;
  margin-left: 40px;
}
.xs_main .xx_but::after{
  content:"";
  display:block;
  clear:both;
}
.xs_main .xx_but{
  width:50%;
  margin:0 auto;
}
.xs_main .xx_but li {
  float: left;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #075d5d;
  margin: 0 30px;
  color: #84f1f1;
  font-size: 13px;
  cursor: pointer;
  transition: all 500ms;
}
.xs_main .xx_but li:hover {
  border-color: #dd6b66;
  color: #dd6b66;
}
.xs_main .xx_but li.nowlis {
  border-color: #dd6b66;
  background: #dd6b66;
  color: #fff;
}
.xs_main .xs_content{
    padding: 0.5%;
}
.xs_main .t_title{
  line-height:50px;
}
.xs_main .tubiaobut {
  position: relative;
  width: 80px;
  height:32px;
  margin-top:9px;
  padding: 0 3px;
  text-align: center;
  cursor: pointer;
  border-radius: 40px;
  background: #012323;
  box-shadow: inset 0 2px 5px 1px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.2);
}
.xs_main .tubiaobut p span {
  float: left;
  width: 40px;
  height: 32px;
  line-height: 32px;
  font-size: 13px;
}
.xs_main .tubiaobut p {
  float: left;
  width: 80px;
  position: absolute;
  z-index: 2;
}
.xs_main .tubiaobut .tsblock {
  float: left;
  width: 40px;
  height: 26px;
  background: #dd6b66;
  border-radius: 13px;
  margin-top: 3px;
  transition: all 0.3s;
}
.xs_main .tubiaobut .tsleft {
  margin-left: 0;
}
.xs_main .tubiaobut .tsright {
  margin-left: 40px;
}
@media only screen and (max-width: 1399px){
  .xs_main .xx_but li{
    margin:0 10px;
  }
}
</style>


