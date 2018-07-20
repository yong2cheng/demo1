<template>
<div class="sec-menu">
  <ul>
    <!-- 所有菜单 -->
    <li class="yemian_home">
      <router-link to="/">
        <span><img src="@/assets/img/ico_home.png" title="首页" alt=""></span>
      </router-link>
    </li>
    <!-- 地市用户只显示运维 -->
    <!-- <li class="yemian_home" v-if="sysId==null">
      <router-link to="/">
        <span><img src="@/assets/img/ico_home.png" title="首页" alt=""></span>
      </router-link>
    </li>
    <li class="yemian_home" v-else>
      <router-link to="/dlywkhd">
        <span><img src="@/assets/img/ico_home.png" title="首页" alt=""></span>
      </router-link>
    </li> -->
    <li class="yemian_tit">
      <span></span>
      <router-link :to="{path:parent,query:{sysId:$route.query.sysId}}">{{page}}</router-link>
    </li>
    <template v-if="$route.path !='/dlywkhd'">
      <li v-for="(item,index) in secList.childSystemFuncList" :key="index" v-if='$route.path.indexOf(item.filePath)>-1' class=' active_nav'>
        <span></span>
        <router-link :to="{path:parent+item.filePath,query:{sysId:$route.query.sysId,sonid:item.sysfuncId}}">{{item.sysfuncName}}</router-link>
      </li>
    </template>
  </ul>
</div>
</template>
<script>
import menu from "@/mock/menu.js";
import Bus from "@/assets/eventBus.js";
export default {
  name: "secnav",
  data() {
    return {
      page: "",
      parent: "",
      secList: [],
      sysId: sessionStorage.getItem("systemId")
    };
  },
  methods: {
    getSecMenu() {
      this.$http
        .get(
          "/systemManagementService/userService/getSystemFuncList?sign=" +
            sessionStorage.getItem("accessToken")
        )
        .then(res => {
          if (res.data.code === 1) {
            res.data.data.systemFuncVOList.forEach(element => {
              if (element.sysfuncId === 1) {
                let menuList = element.childSystemFuncList;
                menuList.forEach(item => {
                  if (item.sysfuncId == this.$route.query.sysId) {
                    this.secList = item;
                    // console.log(this.secList);
                    this.page = item.sysfuncName;
                    this.parent = item.filePath;
                    Bus.$emit("secList", this.secList);
                  }
                });
              }
            });
          }
        });
    },
    // getSecMenu() {
    //   this.$http
    //     .get(
    //       "/systemManagementService/userService/getSystemFuncList?sign=" +
    //         sessionStorage.getItem("accessToken")
    //     )
    //     .then(res => {
    //       if (res.data.code === 1) {
    //         res.data.data.systemFuncVOList.forEach(element => {
    //           if (element.sysfuncId === 1) {
    //             let menuList = element.childSystemFuncList;
    //             menuList.forEach(item => {
    //               if (
    //                 !sessionStorage.getItem("systemId") &&
    //                 sessionStorage.getItem("systemId") != 0 &&
    //                 typeof sessionStorage.getItem("systemId") != "undefined"
    //               ) {
    //                 if (item.sysfuncId == this.$route.query.sysId) {
    //                   this.secList = item;
    //                   // console.log(this.secList);
    //                   this.page = item.sysfuncName;
    //                   this.parent = item.filePath;
    //                   Bus.$emit("secList", this.secList);
    //                 }
    //               } else {
    //                 if (item.filePath == "/dlywkhd") {
    //                   this.secList = item;
    //                   // console.log(this.secList);
    //                   this.page = item.sysfuncName;
    //                   this.parent = item.filePath;
    //                   Bus.$emit("secList", this.secList);
    //                 }
    //               }
    //             });
    //           }
    //         });
    //       }
    //     });
    // }
  },
  created() {
    this.getSecMenu();
    // menu.forEach(item => {
    //   if (item.parentId == this.$route.query.sysId) {
    //     this.secList = item;
    //     this.page = item.name;
    //     this.parent = item.path;
    //   }
    // });
  },
  mounted() {
    console.log(this.sysId);
  },
  watch: {
    //监听路由变化
    $route(to, from) {
      Bus.$emit("secList", this.secList);
      // console.log(to, from)
    }
  }
};
</script>
<style>
.sec-menu ul {
  border-top: 1px solid #057b7b;
  border-bottom: 1px solid #058687;
  height: 34px;
  width: 100%;
  line-height: 34px;
  background: #024243;
}

.sec-menu ul li {
  float: left;
  cursor: pointer;
  padding: 0 28px;
  position: relative;
}

.sec-menu ul li:first-child {
  padding: 0 15px;
}
.yemian_home span img {
  margin-top: 6px;
  vertical-align: top;
}
.sec-menu ul li a {
  display: inline-block;
  height: 100%;
  width: 100%;
}

/* .current {
  padding: 0 40px !important;
} */

.yemian_home {
  padding: 0 15px;
  height: 33px;
  /* border-bottom: 1px solid #058687; */
  line-height: 32px;
  background: url(../../assets/img/bt_bg.jpg) repeat-x 0 0;
  letter-spacing: 2px;
  font-weight: normal;
  font-size: 18px;
  position: relative;
  color: whitesmoke !important;
}

.yemian_home:before {
  content: "";
  width: 35px;
  height: 35px;
  background: url(../../assets/img/bt_mb.png) no-repeat 0 0;
  position: absolute;
  right: -34px;
  top: 0px;
  z-index: 2;
}

.yemian_tit {
  padding: 0 12px 0 15px;
  height: 33px;
  /* border-bottom: 1px solid #058687; */
  line-height: 32px;
  background: url(../../assets/img/bt_bg.jpg) repeat-x 0 0;
  letter-spacing: 2px;
  font-weight: normal;
  font-size: 18px;
  color: whitesmoke !important;
  position: relative;
}

.yemian_tit:before {
  content: "";
  width: 35px;
  height: 35px;
  background: url(../../assets/img/bt_qiejiao.png) no-repeat 0 0;
  position: absolute;
  right: -35px;
  top: -1px;
}

.active_nav:after,
.active_nav::before {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px;
  border-color: #057b7b transparent transparent;
  position: absolute;
  top: 33px;
  left: 50%;
  margin-left: -10px;
}
.active_nav:after {
  border-color: #024243 transparent transparent;
  top: 32px;
}
</style>
