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
  name:'zbgzindex',
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
  .count_top_tc .btnes {float: right;margin-top: 10px;} 
  .count_bottom .count_bottom_title {height: 50px;;line-height: 50px;color:#84f1f1;  font-size:16px; text-shadow:0 1px 1px rgba(0,0,0,.8);}
	.pagings {width: 94%;margin: 15px 3%;text-align: right}
  .cover_title .checked{background: #f6726c;}
  .count_tc_detail_title {float: left;margin:0 10px;font-size: 16px}
</style>
  
