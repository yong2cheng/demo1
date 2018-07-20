<template lang="html">
  <div class="wrap">
    <!-- <htop/> -->
    <sec_nav/>
    <main>
      <router-view/>
    </main>
    <foot/>
  </div>
</template>
<script>
import htop from '@/components/common/htop'
import sec_nav from '@/components/common/ops-nav'
import foot  from '@/components/common/foot'
export default {
  components:{
    sec_nav,
    htop,
    foot
  }
}
</script>
<style lang="css">
</style>
