<template>
<div class="header">
  <div class="hotp_wrap">
    <div class="tLeft">
      <router-link to="/shouye"><img src="../../assets/img/logo.jpg" alt=""></router-link>
    </div>
    <h2 class="title">电能量数据分析与运维系统</h2>
    <div class="tRight">
      <span id="topTime">{{SSTime}}</span> &nbsp;&nbsp;&nbsp;&nbsp;您好:
      <div class="dropWrap">
        <span class="user">{{userName}}</span>
        <!-- <p  @click.stop="drop = !drop">
          <span class="user">{{userName}}</span>
          <span class="caret_down"></span>
        </p>     -->
         <!-- <div class="list" v-show="drop" >
           <ul>
             <li @click.stop="drop=false;close=true;">密码修改</li>
           </ul>
         </div> -->
      </div>
      &nbsp;&nbsp;
      <span @click.stop="drop=false;close=true;" class='color_warning'> 密码修改</span>
       &nbsp;
      <a href="javascript:;" @click="quit()" class='color_warning'>退出</a>
    </div>
  </div>
  
   <overlay :close.sync="close">
    <edit v-if='close' @colsePass="close=false"></edit>
    </overlay>
</div>
</template>
<script>
import edit from '@/components/common/configInfo'
import overlay from '@/components/common/overlay'
export default {
  data: function() {
    return {
      SSTime: "",
      userName: "",
      drop:false,
      close:false
    };
  },
  components:{
     edit,
     overlay
  },
  methods: {
    quit() {
      sessionStorage.clear();
      this.$router.push("/login");
    }
  },
  mounted: function() {
    setInterval(() => {
      var a = new Date();
      this.SSTime = a.toLocaleString();
    }, 1000);
  },
  computed: {
    getUserName() {
      if (sessionStorage.getItem("userAlias")) {
        this.userName = sessionStorage.getItem("userAlias");
        return this.userName;
      } else {
        this.$router.push("/login");
        return false;
      }
    }
  },
  watch: {
    //监听路由变化
    $route(to, from) {
      if (sessionStorage.getItem("userAlias")) {
        this.userName = sessionStorage.getItem("userAlias");
        return this.userName;
      } else {
        this.$router.push("/login");
        return false;
      }
    }
  }
};
</script>
<style>
.header {
  background: url("../../assets/img/htop_bg.jpg") repeat;
  border-bottom: 1px solid #024244;
}
.user{
   cursor: pointer;
}
.user:hover{
  color:whitesmoke;
}
.dropWrap{
  display: inline-block;
}
.header > .hotp_wrap {
  background: url("../../assets/img/t_bg.png") no-repeat right 2%;
}

.header > div > .tLeft {
  display: inline-block;
  vertical-align: bottom;
  padding: 0 10px 0 10px;
  background: url("../../assets/img/top_ge.png") no-repeat right center;
}

.header > div > .title {
  display: inline-block;
  height: 64px;
  margin-left: 10px;
  font-size: 26px;
  line-height: 64px;
  color: #e9fafa;
  font-weight: normal;
  letter-spacing: 2px;
}

.header .tRight {
  float: right;
  font-size: 12px;
  line-height: 32px;
  margin-right: 15px;
  letter-spacing: 1px;
  margin-top: 16px;
}
.caret_down{
  display: inline-block;
  border: 6px solid transparent;
  border-top: 6px solid #ffffff;
  cursor: pointer;
  vertical-align: middle;
  /* margin-top: 6px; */
}
.dropWrap{
  position: relative;
  /* width: 90px; */
  text-align: center;
}
.list{
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  background: #0d7474;
  border-radius: 4px;
  /* padding: 4px 6px; */
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, .5);
  max-height: 130px;
  z-index: 10;
}
/* .list ul li{
  border-bottom: 1px dashed #0d7474;
} */
.list ul li:hover{
  background-color: #024244;
}
</style>
