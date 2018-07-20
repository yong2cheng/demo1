<template>
  <ul>
  <li :key="index" v-for="(child,index) in children">
    <tree-folder v-if="child.attribute!='sbtId'" :date="date" :folder="child"/>
    <span class="treeStation" @click="getSubstationEnergy(child.id,child.grandpa,child.name)" :class="{checked:id==child.id,
    tree_c9:child.parentId==1,
    tree_c8:child.parentId==4,
    tree_c7:child.parentId==6,
    tree_c6:child.parentId==9,
    tree_c5:child.parentId==10,
    tree_c4:child.parentId==12,
    tree_c3:child.parentId==14,
    tree_c2:child.parentId==18}" v-else>{{ child.name }}</span>
  </li>
</ul>
</template>
<script>  
import treeFolder from './treeFolder'
import Bus from '../../../../../assets/eventBus.js'
import $areaId from "../../../../../assets/config/areaMap"
export default {
  props:["children","date"],
  data:function(){
      return{
          id:'',
          mrid:''
      }
  },
  mounted:function(){
    // if(child.attribute=='sbtId'){
    //   console.log(this.children);
    // this.mrid=this.children[0].id;
    // }
    Bus.$on('TstId', target => {  
                this.id=target;
            }); 
  },
  components:{
    treeFolder
  },
  methods:{
    getSubstationEnergy(id,parentId,name){
      Bus.$emit("isLoading",true);
      this.$http.get('/quotaService/quota/getMeter?sign='+sessionStorage.getItem('accessToken')+"&stId="+id)
        .then(res=>{
          if(res.data.code==0){
            Bus.$emit("isLoading",false);
        //                     this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
                            return;
                        }
            console.log(res);
            Bus.$emit("isLoading",false);
            var data=res.data.data.meters;
            if(data.length>0){
                var meterData=[];
                for(var i in data){
                    meterData.push([i-(-1),data[i].mrid,data[i].pathName]);
                }
                Bus.$emit("TmeterData",meterData);
            }else{
              Bus.$emit("TmeterData",[]);
            }
        })
        .catch(error=>{
          Bus.$emit("isLoading",false);
        //     this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
        });
    }
  }
}
</script>
<style>
#treeDatas1 span{
  cursor:pointer;
  color:#84f1f1;
  display:inline-block;
  font-size: 13px;
  padding:5px;
}
#treeDatas1 span:hover{
  color:#fff;
  background-color:#044747;
}
#treeDatas1> ul ul{
  margin-left:10px;
}
#treeDatas1> ul ul ul{
  margin-left:23px;
}
.checked{
  color:#fff;
  background-color:#044747;
}
#treeDatas1 .treeStation:before{
  content:'';
  display:inline-block;
  width:18px;
  height:16px;
  vertical-align: bottom;
  background:url('../../../../../assets/img/factory/Fac2_Vol1.gif') no-repeat;
}
#treeDatas1 .tree_c9:before{
  background:url('../../../../../assets/img/factory/Fac3_Vol9.gif') no-repeat !important;
}
#treeDatas1 .tree_c8:before{
  background:url('../../../../../assets/img/factory/Fac3_Vol8.gif') no-repeat !important;
}
#treeDatas1 .tree_c7:before{
  background:url('../../../../../assets/img/factory/Fac3_Vol7.gif') no-repeat !important;
}
#treeDatas1 .tree_c6:before{
  background:url('../../../../../assets/img/factory/Fac3_Vol6.gif') no-repeat !important;
}
#treeDatas1 .tree_c5:before{
  background:url('../../../../../assets/img/factory/Fac3_Vol5.gif') no-repeat !important;
}
#treeDatas1 .tree_c4:before{
  background:url('../../../../../assets/img/factory/Fac3_Vol4.gif') no-repeat !important;
}
#treeDatas1 .tree_c3:before{
  background:url('../../../../../assets/img/factory/Fac3_Vol3.gif') no-repeat !important;
}
#treeDatas1 .tree_c2:before{
  background:url('../../../../../assets/img/factory/Fac3_Vol2.gif') no-repeat !important;
}
</style>
