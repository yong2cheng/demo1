<template lang="html">
    <div class='wrap'>
      <!-- <htop/> -->
      <sec-nav></sec-nav>
      <main><router-view/></main>
      <foot></foot>
    </div>
</template>
<script>
import htop from '@/components/common/htop'
import secNav  from '@/components/common/sec-nav'
import foot from '@/components/common/foot'
import overlay from '@/components/common/overlay'
export default {
  name:'index',
  data(){
    return{
      over:false,
    }
  },
  components:{
    secNav,
    htop,
    foot,
    overlay
  }
}
</script>
<style lang="css">
  .clearfix:after {content:"";height:0;line-height: 0;display: block;visibility: hidden;clear: both;}
    .main_xtgl {width:1398px;margin:30px auto 0;padding: 0 30px;border:1px solid #0d7474; box-sizing: border-box; background:#043434; box-shadow:0 1px 2px rgba(0,0,0,.8);overflow: auto}
    .main_xtgl_bar {text-align: left;padding: 20px 0;border-bottom:1px solid #0d7474;margin-bottom: 20px}
    .main_xtgl_bar div {float: left;}
    .main_xtgl_bar_left {position: relative}
    .main_xtgl_bar_left span {color: #84f1f1}
    .main_xtgl_bar_left input {width:150px;margin-left: 10px}
    .main_xtgl_bar_left img {position: absolute;width: 24px;height: 24px;right: 0;top: 3px}
    .main_xtgl_bar_right button {margin-left: 20px}
	  .main_xtgl_count .checked{background-color: #f6726c }
    .paging {margin: 30px 0;}
    .overlay_tc1 {width:550px}
    .count_top_tc1 {height: 600px;width:100%;box-sizing: border-box}
    .count_tc_title {text-align: center;font-size: 20px;border-bottom:1px solid #0d7474;height: 50px;line-height: 50px;margin-bottom: 10px}
    .userForm{margin-left: 50px}
    .userForm .el-input {width:200px}
    .tc_count_tool img {
        position: absolute;
        width: 24px;
        height: 24px;
        right: 0;
        top: 8px;
    }
    @media (max-width:1399px){
      .main_xtgl{ width:1208px;}
    }
</style>
  
