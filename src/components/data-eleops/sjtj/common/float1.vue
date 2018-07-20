<template lang="html">
<div class="tips_wrap" :style="{top:y+'px',left:(x-20)+'px'}">
  <table class="table">
    <thead>
      <tr>
        <td colspan="2">
          更换时间
        </td>
        <td></td>
        <td>倍率</td>
        <td>正向有功</td>
        <td>正向无功</td>
        <td>反向有功</td>
        <td>反向无功</td>
      </tr>
    </thead>
    <tbody>
        <tr>
          <td colspan="2" rowspan="2">{{data.endTime}}</td>
          <td>更换前</td>
          <td>{{data.ratio}}</td>
          <td>{{data.pap1ViewBefore}}</td>
          <td>{{data.prp1ViewBefore}}</td>
          <td>{{data.rap1ViewBefore}}</td>
          <td>{{data.rrp1ViewBefore}}</td>
        </tr>
        <tr>
          <td>更换后</td>
          <td>{{data.ratio}}</td>
          <td>{{data.pap1ViewAfter}}</td>
          <td>{{data.prp1ViewAfter}}</td>
          <td>{{data.rap1ViewAfter}}</td>
          <td>{{data.rrp1ViewAfter}}</td>
        </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  props:['data','y','x']
}
</script>

<style lang="css">
.tips_wrap{
  width: 750px;
  /* height: 200px; */
  background: #035252;
  box-shadow: 0 2px 5px 5px rgba(0, 0, 0, .3);
  position: absolute;
  z-index: 100;
  box-sizing: border-box;
  padding: 20px;
}
</style>
