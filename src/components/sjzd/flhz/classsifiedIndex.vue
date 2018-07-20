<template>
  <div class="flhz">
    <div class="bankuaibox">
      <!--线损与变损切换-->
      <ul class="xxkbox">
        <li :class="{dqxz:currentView=='cf'}" @click="currentView='cf'">分类汇总</li>
        <li :class="{dqxz:currentView=='ar'}" @click="currentView='ar'">分析报告</li>
        <li :class="{dqxz:currentView=='di'}" @click="currentView='di'">关口详细信息
        </li>
      </ul>

      <!-- tab跳转 -->
      <div class="mxian_succ xiansunbox" style="position:relative;display:block">
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
import cf from'./collectClassified/index'
import ar from'./analysisReport/index'
import di from'./detailedInformation/index'
import BScroll from "better-scroll";
export default {
  name: "flhz",
  data() {
    return {
     currentView:'cf'
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {}
  },
  components:{
      cf,
      ar,
      di
  }
};
</script>

<style lang="css">
.flhz .bankuaibox { 
  width:1400px; 
  margin:0 auto; 
  color:#eee; 
  position:relative;
  font-size: 13px; }
@media (max-width:1399px){
	.bankuaibox { width:1208px; }
}


.flhz .xxkbox { 
  /* float:left;  */
  display: inherit;
  overflow: hidden;
  margin-top:30px; 
  }
.flhz .xxkbox li{ 
  float:left; 
  position:relative;
  z-index:601; 
  padding: .3em 1em; 
  line-height:24px; 
  cursor:pointer; 
  margin-right:5px; 
  background: #043434;  
  border:1px solid #0d7474; 
  border-bottom:none;  
  border-radius: .5em .5em 0 0; 
  color:#84f1f1}
.flhz .xxkbox li.dqxz{ 
  background:#035252; 
  color:#fff;} 
.flhz .xxkbox li.dqxz:before,.xxkbox li.dqxz:after{
  content: ""; 
  width: 0; 
  height: 0; 
  border-style: solid; 
  border-width: 7px; 
  border-color:transparent transparent #009F95  ; 
  position: absolute; top:18px; 
  left: 50%; 
  margin-left: -7px;}
.flhz .xxkbox li.dqxz:after{ 
  border-color: transparent transparent #043434; 
  top: 19px;}

.flhz .mxian_succ { 
  width:1398px;  
  margin-top:30px;
   position:relative; 
  border:1px solid #0d7474; 
  background:#043434; 
  box-shadow:0 1px 2px rgba(0,0,0,.8);
  /* overflow: hidden;  */
  }
.flhz .xiansunbox{
    overflow: hidden;
  }
.flhz .mxian_succ .huizong { 
  width:380px; 
  min-height:670px}
.flhz .xiansunbox{ 
  margin-top:0}
.flhz_tab { float:left; width:100%; border-collapse:collapse; margin-bottom:10px;}
.flhz_tab tr td,.flhz_tab tr th { height:34px; padding:0 5px; border:1px solid #0d7474;  color:#ddd;}
.flhz_tab tr th { font-size:15px; font-weight:normal; color:#84f1f1}
.flhz_tab thead tr td,.flhz_tab thead tr th  { text-align:center;  color:#84f1f1; font-size:14px; background:#035252;}
.flhz_tab a { color:#f6726c; text-decoration:none} 
/* .scrollbox { overflow-y: scroll;}  */
 .scroll2 {position:relative;height:100%;overflow:hidden}



</style>
