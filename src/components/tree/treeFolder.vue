<template>
  <p :class="{'tree_close':isClose,'tree_open':!isClose}">
  <span :class="{treeBvId:folder.attribute=='bvId',
  treeBvId9:folder.attribute=='bvId'&&folder.id==1,
  treeBvId8:folder.attribute=='bvId'&&folder.id==4,
  treeBvId7:folder.attribute=='bvId'&&folder.id==6,
  treeBvId6:folder.attribute=='bvId'&&folder.id==9,
  treeBvId5:folder.attribute=='bvId'&&folder.id==10,
  treeBvId4:folder.attribute=='bvId'&&folder.id==12,
  treeBvId3:folder.attribute=='bvId'&&folder.id==14,
  treeBvId2:folder.attribute=='bvId'&&folder.id==18,
  treeSystemId:folder.attribute=='systemId',
  treeSystemId15:folder.attribute=='systemId'&&folder.id==15,
  treeSystemId16:folder.attribute=='systemId'&&folder.id==16,
  treeSystemId0:folder.attribute=='systemId'&&folder.id==0}" @click="handleSwitch()">{{ folder.name }}</span>
    <tree-load :timeUnit="timeUnit" :date="date" v-if="isLoad" :jiekou="folder.attribute" :childrenId="folder.id" :parentId="folder.parentId"></tree-load>
  
</p>
</template>
<script>
import treeLoad from '@/components/tree/treeLoad'
export default {
  props:["folder","date","timeUnit"],
  data:function(){
    return{
      isClose:true,
      isLoad:false,
      hasLoad:false
    }
  },
  components:{
    treeLoad
  },
  methods:{
    handleSwitch(){
      this.isClose=!this.isClose;
      if(!this.hasLoad){
        this.isLoad=!this.isLoad;
        this.hasLoad=true;
      }
    }
  }
}
</script>
<style>
  .tree_close:before{
    content:"";
    display:inline-block;
    width:0;
    height:0;
    border:4px solid transparent;
    border-left:4px solid #41F4F3;
  }
  .tree_close ul{
    display:none;
  }
  .tree_open:before{
    content:"";
    display:inline-block;
    width:0;
    height:0;
    border:4px solid transparent;
    border-top:4px solid #41F4F3;
  }
  .tree_open> ul{
    display:block;
  }
  .treeBvId:before{
  content:'';
  display:inline-block;
  width:18px;
  height:16px;
  vertical-align: bottom;
  background:url('../../assets/img/voltaglevel/Vol1.gif') no-repeat;
}
.treeBvId9:before{
  background:url('../../assets/img/voltaglevel/Vol9.gif') no-repeat !important;
}
.treeBvId8:before{
  background:url('../../assets/img/voltaglevel/Vol8.gif') no-repeat !important;
}
.treeBvId7:before{
  background:url('../../assets/img/voltaglevel/Vol7.gif') no-repeat !important;
}
.treeBvId6:before{
  background:url('../../assets/img/voltaglevel/Vol6.gif') no-repeat !important;
}
.treeBvId5:before{
  background:url('../../assets/img/voltaglevel/Vol5.gif') no-repeat !important;
}
.treeBvId4:before{
  background:url('../../assets/img/voltaglevel/Vol4.gif') no-repeat !important;
}
.treeBvId3:before{
  background:url('../../assets/img/voltaglevel/Vol3.gif') no-repeat !important;
}
.treeBvId2:before{
  background:url('../../assets/img/voltaglevel/Vol2.gif') no-repeat !important;
}
.treeSystemId:before{
  content:'';
  display:inline-block;
  width:18px;
  height:16px;
  vertical-align: bottom;
  background:url('../../assets/img/areas/area5.gif') no-repeat;
}
.treeSystemId15:before{
  background:url('../../assets/img/areas/area0.gif') no-repeat !important;
}
.treeSystemId16:before{
  background:url('../../assets/img/areas/area1.gif') no-repeat !important;
}
.treeSystemId0:before{
  background:url('../../assets/img/areas/area3.gif') no-repeat !important;
}
</style>