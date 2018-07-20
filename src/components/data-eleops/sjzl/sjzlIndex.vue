<template lang="html">
  <div class="main">
    <div class="mxian_succ sjzl_wrap">
      <ul class="czxqqhbox" style="margin-top:5px;">
        <!-- <li :class="{dqxz:currentView=='sub1'}" @click="currentView='sub1'">数据查询</li>
        <li :class="{dqxz:currentView=='sub2'}" @click="currentView='sub2'">数据治理</li>
        <li :class="{dqxz:currentView=='sub3'}" @click="currentView='sub3'">智能研判</li> -->
        <li :class="{dqxz:currentView=='sub4'}" @click="currentView='sub4'">同期母平配置比对</li>
        <li :class="{dqxz:currentView=='sub5'}" @click="currentView='sub5'">同期分线线损比对</li>
        <li :class="{dqxz:currentView=='sub6'}" @click="currentView='sub6'">同期分压配置比对</li>
      </ul>
      <div class="sjzl_main">
       <transition name="component-fade" mode="out-in">
         <keep-alive>      
          <component :is="currentView"></component>
         </keep-alive>
       </transition>  
      </div>
    </div>
  </div>
</template>

<script>
import sub4 from './parts/sub4'
import sub5 from './parts/sub5'
import sub6 from './parts/sub6'
export default {
  data(){
    return{
      currentView:'sub4',
    }
  },
  components: {
    sub4,
    sub5,
    sub6
  },
}
</script>

<style lang="css">
.czxqqhbox{
  overflow: hidden;
}
.czxqqhbox li{
    float: left;
    position: relative;
    padding: .3em 1em;
    line-height: 24px;
    cursor: pointer;
    margin-right: 5px;
    background: #043434;
    border: 1px solid #0d7474;
    border-bottom: none;
    border-radius: .5em .5em 0 0;
    color: #84f1f1;
    font-size: 13px;
}
.czxqqhbox li.dqxz{
    background: #035252;
    color: #fff;
}
.dqxz:after {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px;
    border-color: transparent transparent #009F95;
    position: absolute;
    top: 18px;
    left: 50%;
    margin-left: -7px;
}
.sjzl_wrap{
  background: none !important;
  border: none !important;
  box-shadow: none !important;
}
.sjzl_main{
    border: 1px solid #0d7474;
    background: #043434;
    min-height: 540px;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .8);
    box-shadow: 0 1px 2px rgba(0, 0, 0, .8);
}
</style>
