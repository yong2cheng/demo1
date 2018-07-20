<template lang="html">
  <div class="yw_right">
    <div class="title_bar">
      <h4>业务报表
         <span class='devStatus'>(开发中...)</span>
      </h4>
      <a href="#" target="_blank">+详情</a>
    </div>
    <ul class="ywbb_list">
      <li>
        <a href="#">厂站电量月报表</a>
      </li>
      <li>
        <a href="#">地区供电量月报表</a>
      </li>
      <li>
        <a href="#">采集异常日报表</a>
      </li>
      <li>
        <a href="#">110kV分压网损报表</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.ywbb_list {
    width: 92%;
    padding: 5px 4% 8px;
}
.ywbb_list li {
  text-align: left;
    width: 100%;
    margin: 8px 0 2px;
}
.ywbb_list li a{
  font-size: 14px;
  color: #84f1f1;
}
.ywbb_list li:first-child a{
  color: #f94534;
}
.ywbb_list li a:hover{
  color: #fff;
}
</style>
