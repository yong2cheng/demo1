<template lang="html">
  <div class="yw_right">
    <div class="sys_wrap">
        <div class="sys_left">
          <p class="ico ico_yx">
            <img src="@/assets/img/ico_yx_zc.png" alt="">
          </p>
          <div class="run_status">
            <table class="table">
              <tr>
                <td width="80%">数据库服务:</td>
                <td><i class="icon-down"></i></td>
              </tr>
              <tr>
                <td width="80%"></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="sys_right">
          <p class="ico ico_zc">
            <img src="@/assets/img/ico_yx_yc.png" alt="">
          </p>
          <div class="run_status">
            <table class="table">
              <tr>
                <td width="80%">事件传输服务:</td>
                <td><i class="icon-yichang"></i></td>
              </tr>
              <tr>
                <td width="80%"></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css">
.yw_right{
  background: #043434;
  border: 1px solid #0d7474;
  margin-bottom: 20px;
}
.sys_wrap{
  display: flex;
}
.sys_left,.sys_right{
  width: 46%;
  padding: 15px 2% 10px;
  text-align: center;
}
.sys_left{
  border-right:1px solid #0d7474;
}
.sys_wrap .ico{
  width: 40px;
  height: 40px;
  padding: 10px;
  margin: 0 auto;
  background: #0d7474;
  border-radius: 50%;
}
.sys_wrap table tr{
  padding: 0 2px;
}
.run_status{
  margin-top: 15px;
  font-size: 12px;
}
.run_status i {
    height: 15px;
    width: 15px;
    text-align: center;
    line-height: 18px;
    border-radius: 50%;
    display: block;
}
.run_status [class$="-down"] {
    background: #24A5CD;
}
.run_status [class$="-yichang"] {
    background: #E72F2F;
}
</style>
