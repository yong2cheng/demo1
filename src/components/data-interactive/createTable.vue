<template>
  <table class="table">
      <thead>
          <tr :key="indexd" v-for="(item,indexd) in theads">
              <td :key="indexm" v-for="(child,indexm) in item" :colspan="child.numone" :rowspan="child.numtwo">{{child.name}}</td>
          </tr>
      </thead>
      <tbody>
          <tr :key="indexd" v-for="(item,indexd) in tbodys">
              <td :class="{nothing:child.name=='暂无数据'}" :key="indexm" v-for="(child,indexm) in item" :colspan="child.numone" :rowspan="child.numtwo">{{child.name}}</td>
          </tr>
      </tbody>
  </table>
</template>
<script>
export default {//svg
  props:["theads","tbodys"]
}
</script>
<style>
    /* table{
        width:100%;
       color:#84f1f1;
        display:inline-block;
        font-size: 13px;
        text-align:center;
        border-collapse:collapse;
        margin-left:-1%;
    }
    table thead{
        background-color:#035252;
    }
    table td{
        width:7.2%;
        border:1px solid #555555;
        padding:3px 6px 3px 4px;
    } */
</style>
