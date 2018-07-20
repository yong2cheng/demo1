<template>
    <div class="one_main">
        <div class="xs_charts" id="xs_chart"></div>     
    </div>
</template>
<script>
import chartMix from "./chart.js";
export default {
  data() {
    return {
        datalist:['550kV','220Kv','110Kv','35Kv']
    };
  },
  mixins: [chartMix]
};
</script>
<style>
.one_main {
  position: relative;
}
.xs_charts {
  height: 590px;
  width: 100%;
}
.xs_tool {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 60px;
  background: rgba(14, 132, 132, 0.7);
  z-index: 500px;
}
.tool_sh li {
  margin-top: 10px;
}
.tool_sh li span {
  display: block;
  height: 50px;
  padding-top: 8px;
  color: #84f1f1;
  font-size: 28px;
  transition: all 500ms;
  text-align: center;
  font-size: 16px;
}
.tool_sh li span i {
  display: block;
  line-height: 30px;
  font-size: 30px;
  overflow: hidden;
}
.xs_table {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
}
</style>


