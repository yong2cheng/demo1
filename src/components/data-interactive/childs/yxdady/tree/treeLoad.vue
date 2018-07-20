<template>
  <tree-folder-contentst :date="date" :children="children"></tree-folder-contentst>
</template>
<script>
import $areaId from "../../../../../assets/config/areaMap"
export default {
    props:["childrenId","jiekou","parentId","date"],
    data:function(){
        return{
            children:[]
        }
    },
  mounted:function(){
      if(this.jiekou=="systemId"){
        this.$http.get('/treeService/tree/getAllBaseVoltageTreeNodeBySystemId?systemId='+this.childrenId+'&sign='+sessionStorage.getItem('accessToken'))
        .then((res)=>{
            if(res.data.code==0){
        //                    this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
                            return;
                        }
            console.log(res);
            if(res.data.data!=null){
               this.children=res.data.data.allSubStations; 
            }
            console.log(this.children);
        })
        // .catch(function(error){
        //                this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
        // });
      }else{
          this.$http.get("/treeService/tree/getAllSubStationTreeNodeBySystemIdAndBvId?systemId="+this.parentId+"&bvId="+this.childrenId+'&sign='+sessionStorage.getItem('accessToken'))
        .then((res)=>{
            if(res.data.code==0){
        //                     this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
                            return;
                        }
            console.log(res);
            if(res.data.data!=null){
                this.children=res.data.data.allSubStations;
                for(var a of $areaId){
                    if(a.areaId==this.parentId){
                        var areaName=a.areaName;
                    }
                }
                for(var a of this.children){
                    a.name=a.name;
                }
            }
            console.log(areaName);
            console.log(this.children);
        })
        // .catch(function(error){
        //              this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
        // });
      }
      
  }
}
</script>
<style>

</style>
