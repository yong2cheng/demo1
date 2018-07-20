<template>
  <tree-folder-contents :timeUnit="timeUnit" :date="date" :children="children"></tree-folder-contents>
</template>
<script>
export default {
    props:["childrenId","jiekou","parentId","date","timeUnit"],
    data:function(){
        return{
            children:[]
        }
    },
  mounted:function(){
      if(this.jiekou=="systemId"){
        this.$http.get('/treeService/tree/getAllBaseVoltageTreeNodeBySystemId?systemId='+this.childrenId+'&sign='+sessionStorage.getItem('accessToken'))
        .then((res)=>{
            console.log(res);
            if(res.data.data!=null){
               this.children=res.data.data.allSubStations; 
            }
            console.log(this.children);
            // confirm(this.children);
        })
        // .catch(function(error){
        //                 this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
        // });
      }else{
          this.$http.get("/treeService/tree/getAllSubStationTreeNodeBySystemIdAndBvId?systemId="+this.parentId+"&bvId="+this.childrenId+'&sign='+sessionStorage.getItem('accessToken'))
        .then((res)=>{
            console.log(this.childrenId);
            if(res.data.data!=null){
                this.children=res.data.data.allSubStations;
                for(var a of this.children){
                    a.grandpa=this.parentId;
                    a.bvId=this.childrenId;
                }
            }
            console.log(this.children);
           
        })
        // .catch(function(error){
        //             this.$notify.error({
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
