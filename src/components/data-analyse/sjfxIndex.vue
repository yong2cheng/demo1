<template lang="html">
<div class="wrap">
    <!-- <htop/> -->
    <sec_nav/>
    <main>
      <router-view/>
    </main>
    <foot></foot>
  </div>
</template>

<script>
import htop from '@/components/common/htop'
import sec_nav from '@/components/common/sec-nav'
import foot from '@/components/common/foot'
export default {
  components:{
    sec_nav,
    htop,
    foot
  }
}
</script>

<style lang="css">
.gather_cover {
    display:inline-block;
    border: 1px solid #0d7474;
    background: #043434;
    box-shadow: 0 1px 2px rgba(0,0,0,.8);
    vertical-align: top;
}
.bkbt {
    height: 34px;
    background: #024243;
    padding: 0 10px;
    border-bottom: 1px solid #035e5f;
    color: #84f1f1;
    font-size: 16px;
    line-height: 32px;
    margin-bottom:5px;
    text-shadow: 0 1px 1px rgba(0,0,0,.8);
}
.bkbt> span{
    float:right;
}
.bkbt> h2{
    display:inline-block;
    font-size:16px;
}
.hidden{
    display:none;
}
.clickable{
    color:#f6726c !important;
    cursor: pointer !important;
}
.t_Bullet{
    text-align:center;
    background:#035252;
    height:50px;
}
.t_Bullet> h2{
    font-size:20px;
   float:left;
}
.t_Bullet .t_right{
    float:right;
}
</style>
