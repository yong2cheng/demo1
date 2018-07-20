<template>
    <div class="main">
        <span class="bread_nav">
          <router-link :to="{path:'/dlywkhd/mxwh',query:{sysId:$route.query.sysId,sonid:$route.query.sonid}}">模型维护></router-link>
        </span>
        <span class="bread_nav">设备状态</span>
        <div class="mxian_succ mxian_mxwh " style="margin-top:30px;">
            <ul class="czxqqhbox reform_ul" style="margin-top: 15px;">
                <li :class="{dqxz:currentView=='sub1'}" @click="currentView='sub1';">投运</li> 
                <li :class="{dqxz:currentView=='sub2'}" @click="currentView='sub2';">退役</li> 
                <li :class="{dqxz:currentView=='sub3'}" @click="currentView='sub3';">转检修</li>               
            </ul>
            <div class="collect_list_wrap reform">
               <transition name="component-fade" mode="out-in">
                    <keep-alive>    
                     <component 
                        :is="currentView">
                     </component>
                    </keep-alive>    
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import sub1 from "./parts/device-status/touyun";
import sub2 from "./parts/device-status/tuiyi";
import sub3 from "./parts/device-status/gaizao";
import area from "@/assets/config/areaMap";
export default {
  data() {
    return {
      type: "1",
      currentView: "sub1",
    };
  },
  created() {
  },
  methods: {
  },
  components: {
    sub1,
    sub2,
    sub3
  },
};
</script>
<style>
.tool_bars {
  float: left;width: 90%;line-height: 50px;
}
.tool_bar {
  width: 99%;
  margin: 5px 0.5%;
  position: relative;
  /* border-bottom: 1px solid #0d7474; */
  line-height: 70px;
}
.toright {
  float: right;
}
.collect_list_wrap {
  box-sizing: border-box;
  margin: 15px;
  padding: 0 10px;
  border: 1px solid #0d7474;
}
.reform {
  position: relative;
  margin-top: 0 !important;
}
.czxqqhbox {
  overflow: hidden;
}
.czxqqhbox li {
  float: left;
  position: relative;
  padding: 0.3em 1em;
  line-height: 24px;
  cursor: pointer;
  margin-right: 5px;
  background: #043434;
  border: 1px solid #0d7474;
  border-bottom: none;
  border-radius: 0.5em 0.5em 0 0;
  color: #84f1f1;
  font-size: 13px;
}
.czxqqhbox li.dqxz {
  background: #035252;
  color: #fff;
}
.reform_ul {
  margin-left: 15px;
}
.dqxz:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px;
  border-color: transparent transparent #009f95;
  position: absolute;
  top: 18px;
  left: 50%;
  margin-left: -7px;
}
.status_wraps {
  padding: 15px 0;
  border-top: 1px solid #0d7474;
}
@media (max-width: 1399px) {
  .tool_bars {
    width: 92%;
  }
}
</style>
