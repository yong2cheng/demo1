<template>
<div class="menu">
  <ul>
    <li v-for="(item,index) in list" :key="index">
      <router-link :to="{path:item.filePath,query:{sysId:item.sysfuncId}}">
        <span>
          <img src="@/assets/img/ico_zbgz.png" alt="">
        </span>
        {{item.sysfuncName}}
      </router-link>
    </li>
  </ul>
</div>
</template>

<script>
import menu from "@/mock/menu.js";
export default {
  name: "indexHeader",
  data() {
    return {
      list: []
    };
  },
  methods: {
    getMenu() {
      this.$http
        .get(
          "/systemManagementService/userService/getSystemFuncList?sign=" +
            sessionStorage.getItem("accessToken")
        )
        .then(res => {
          if (res.data.code === 1) {
            res.data.data.systemFuncVOList.forEach(element => {
              if (element.sysfuncId === 1) {
                var data = element.childSystemFuncList;
                // console.log(data);
                this.list = data;
              }
            });
          }
        });
    }
  },
  created() {
    this.getMenu();
    // this.list = menu;
  }
};
</script>

<style>
.menu ul {
  height: 31px;
  width: 100%;
  line-height: 31px;
  border-top: 1px solid #057b7b;
  border-bottom: 1px solid #058687;
  background: url(../../assets/img/menu_bg.png) repeat-x 0 0;
}

.menu ul li {
  float: left;
  color: whitesmoke !important;
  cursor: pointer;
  padding: 0 14px;
  font-size: 18px;
  background: url(../../assets/img/menu_ge.png) no-repeat 0 center;
  /* letter-spacing: 2px; */
}
.menu li span img {
  padding-right: 5px;
  margin-top: 5px;
  vertical-align: top;
}
.menu ul li a {
  display: inline-block;
  height: 100%;
  width: 100%;
}
</style>
