<template>
  <div class="main sbsh">
    <div class="mxian_succ sbsh_main">
        <ul class="xxkbox">
            <li :class="{dqxz:currentView=='xs'}" @click="currentView='xs'">线损</li>
            <li :class="{dqxz:currentView=='bs'}" @click="currentView='bs'">变损</li>
        </ul>
         <transition name="component-fade" mode="out-in">
            <keep-alive>    
                <component :is="currentView"></component>
            </keep-alive>    
        </transition>
    </div>
  </div>
</template>

<script>
import xs from'./parts/xs/xs'
import bs from'./parts/bs/bs'
import BScroll from "better-scroll";
export default {
  name: "xtws",
  data() {
    return {
     currentView:'xs'
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {}
  },
  components:{
      xs,
      bs
  }
};
</script>

<style lang="css">
.sbsh_main {
  position: relative;
  margin-top: 80px;
  overflow:visible !important;
}
.sbsh .xxkbox {
  height: 32px;
  position: absolute;
  left: 0;
  top: -32px;
  margin:0;
}
.xxkbox li {
  float: left;
  z-index: 10;
  padding: 0 10px;
  line-height: 30px;
  cursor: pointer;
  margin-right: 5px;
  background: #043434;
  border: 1px solid #0d7474;
  border-bottom: none;
  border-radius: 0.5em 0.5em 0 0;
  color: #84f1f1;
  position: relative;
  font-size: 12px;
}
.xxkbox li.dqxz {
  background: #035252;
  color: #fff;
}
.dqxz:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px;
  border-color: transparent transparent #009f95;
  position: absolute;
  top: 16px;
  left: 50%;
  margin-left: -7px;
}
</style>
