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
          <td colspan="2" rowspan="2">{{data.lastRefreshTime}}</td>
          <td>更换前</td>
          <td>{{(data.oldCt1 / data.oldCt2) * (data.oldPt1 / data.oldPt2)}}</td>
          <!-- <td>{{data.oldCt1}}</td>
          <td>{{data.oldCt2}}</td>
          <td>{{data.oldPt1}}</td>
          <td>{{data.oldPt2}}</td> -->
          <td>{{data.papViewBefore}}</td>
          <td>{{data.prpViewBefore}}</td>
          <td>{{data.rapViewBefore}}</td>
          <td>{{data.rrpViewBefore}}</td>
        </tr>
        <tr>
          <td>更换后</td>
          <td>{{(data.newCt1 / data.newCt2) * (data.newPt1 / data.newPt2)}}</td>
          <!-- <td>{{data.newCt1}}</td>
          <td>{{data.newCt2}}</td>
          <td>{{data.newPt1}}</td>
          <td>{{data.newPt2}}</td> -->
          <td>{{data.papViewAfter}}</td>
          <td>{{data.prpViewAfter}}</td>
          <td>{{data.rapViewAfter}}</td>
          <td>{{data.rrpViewAfter}}</td>
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
