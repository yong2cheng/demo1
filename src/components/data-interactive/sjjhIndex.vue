<template>
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
<style>
  .main_se{
        border:1px solid #0d7474;
        background-color:#043434;
        box-shadow:0 1px 2px rgba(0,0,0,.8);
        padding:0 10px;
  }
    .head_bar {
    width: 99%;
    margin: 5px .5%;
    position: relative;
    border-bottom: 1px solid #0d7474;
}
     .head_bar> div{
        float:left;
    }
    .head_bar:after{
        content:"";
        display:block;
        clear: both;
    }
    .mianbaoxue {
    float: left;
    font-size: 13px;
    line-height: 30px;
    padding-left: 5px;
    margin: 20px 0 20px 10px;
    color: #51a5a5;
}
.mianbaoxue span {
    color: #84f1f1;
}
/* 缺数查询 */
.topTil {
        width: 100%;
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: normal;
    }
    .red_font{
        color: #f6726c;
    }
    .margin_r_s{
        margin-right: 10px;
    }
    .margin_r_m{
        margin-right: 20px;
    }
    .margin_r_l{
        margin-right: 30px;
    }
    .topTools{
        width: 97%;
        height: 30px;
        padding: 10px 1%;
        margin: 0 .5%;
        background: #035252;
        position: relative;
        box-shadow: inset 0 0 0 1px #0d7474;
        color: #84f1f1;
        font-size: 15px;
    }
    .areaList , .bvidList{
        background-color: #012323;
        color: inherit;
        width: auto;
        padding: 0 5px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #0d7474;
        color: #84f1f1;
        margin-right: 20px;
        padding-right: 20px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: #022626 url(../../assets/img/icon_select.gif) no-repeat right center;
    }
    .unusual{
        margin-left: 20px;
        display: inline-block;
    }
    .unusual_span{
        background: #FF4144;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        padding: 0 5px;
        border-radius: 5px;
        position: relative;
    }
    .dateCtrl{
        display: inline-block;
        /* margin-left: 400px; */
    }
    .searchBtn{
        position: absolute;
        right: 30px;
        display: inline-block;
    }
    .searchBtn>.btn{
        height: 25px;
        vertical-align: middle;
        line-height: 25px;
    }
    .unDataBox{
        min-height: 400px;
        width:  98%;
        margin: 10px ;
    }
    .unDataTab{
        height: 100%;
        width: 100%;
    }
    .boxTopTil{
        min-height: 40px;
        position: relative;
        width: 100%;
        border-bottom:1px solid #0d7474;
        margin: 10px 0;
    }
    .cyxf_box{
        width: 1300px;
        min-height: 400px;
    }
    .iconbtn{
        position: absolute;
        right: 20px;
    }
    /* 母平计算 tips */
    .xzts {
        position: fixed;
        width: 170px;
        padding: 5px 10px;
        border-radius: 5px;
        background: #0d7474;
        z-index: 100;
        box-shadow: 0 2px 5px 5px rgba(0,0,0,.3), inset 0 0 0 1px #0A9C9C;
        text-align: left;
        line-height: 28px;
    }
    .xzts:before {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px;
        border-color: transparent #0d7474 transparent transparent;
        position: absolute;
        z-index: 52;
        top: 30px;
        left: -20px;
    }
    .xzts li {
        white-space: nowrap;
        overflow: hidden;
        font-size: 12px !important;
    }
    .xzts li i {
        padding: 0 2px 0 5px;
        color: #fff;
    }
    .xzts li i.red {
        color: #E72F2F;
    }
    .main_suc{
        width: 1398px;
        margin-top: 30px;
        border: 1px solid #0d7474;
        background: #043434;
        box-shadow: 0 1px 2px rgba(0,0,0,.8);
        position: relative;
    }
    .after:after{
        content:'';
        display: block;
        clear: both;
    }
    .inbl{display: inline-block}
    .topBar{
        width: 99%;
        margin: 5px .5%;
        position: relative;
        padding-bottom: 20px;
        padding-top: 20px;
        border-bottom: 1px solid #0d7474;
    }
    .show_box{
        margin:8px 13px 13px 10px;
        padding: 0;
    }
    .tkzz {
        /* float: left; */
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        position: absolute;
        z-index: 10;
    }
    .tools_s{
        display: inline-block;
        width: 15%;
    }
    .tools_m{
        display: inline-block;
        width: 20%;
    }
    .tools_l{
        display: inline-block;
        width: 30%;
    }
    .tools_xl{
        display: inline-block;
        width: 30%;
    }
    .sjzd_left{
        text-align: left;
        padding-left: 10px;
    }
    .sjzd_right{
        text-align: right;
    }
    .ulCls{
        display: inline-block;
        position: relative;
    }
    .ulCls>li{
        display: inline-block;
        list-style-type: none;
        float: left;
        text-align: center;
    }
</style>
