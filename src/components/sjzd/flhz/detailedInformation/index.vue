<template lang="html">
  <div>
    <dieOne></dieOne>
    <ditOne></ditOne>
  </div>
    
</template>

<script>
import ditOne from'./part/tableOne';
import dieOne from'./part/echartOne';
import BScroll from "better-scroll";
export default {
  name: "flhz",
  data() {
    return {
    
    };
  },
  created() {
    
  },
  methods: {
   
  },
  components:{
      ditOne,
      dieOne
  }
};
</script>

<style>
.fxbg_gkxx {float:left;  width:1368px; height:600px;}
@media (max-width:1399px){
	.fxbg_gkxx { width:1170px;}
}
.jkd_table { width:300px; height:calc(100% - 90px); position:absolute; top:90px; right:10px; }
@media (max-width:1399px){
	.jkd_table { width:260px;}
}
</style>
