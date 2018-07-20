<template lang="html">
 <div class="tuxing" >
    <cceOne></cceOne>
    <cceTwo></cceTwo>
    <cctOne></cctOne>
        
        
       
    </div>
     

</template>
<script>
import cceOne from'./part/echartOne';
import cceTwo from'./part/echartTwo';
import cctOne from'./part/tableOne';
import BScroll from "better-scroll";
export default {
  data() {
  },
  created() {
    // this.getData();
  },
   mounted: function() {
    },
  methods: {
  },
  components:{
      cceOne,
      cceTwo,
      cctOne
  }
};
</script>

<style>
.tuxing .hzfl_table {float:left; width:96%; height:290px; margin:0 2%}
</style>

