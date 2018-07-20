<template lang="html">
<div class="yw_right">
  <div class="title_bars">
    <h4>工具栏</h4>
  </div>
  <div class="ywtool_wraps">
    <ul class="ywtool_list1">
      <li v-for="(item,index) in NavList.childSystemFuncList" :key="index">
      <router-link :to="{path:NavList.filePath+item.filePath,query:{sysId:$route.query.sysId,sonid:item.sysfuncId}}">
          <i :class="classArr[index].name" :style="{background:classArr[index].color}"></i>
          {{item.sysfuncName}}
      </router-link>
      </li>
    </ul>
  </div>

</div>
</template>
<script>
import Bus from "@/assets/eventBus.js";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      NavList: [],
      classArr: [
        {
          name: "icon-mxwh",
          color: "#f63c6b"
        },
        {
          name: "icon-sjzl",
          color: "#fd5e1c"
        },
        {
          name: "icon-sjtj",
          color: "#24A5CD"
        },
        {
          name: "icon-dbsx",
          color: "#f94534"
        },
        {
          name: "icon-duiying",
          color: "rgb(147, 117, 5)"
        },
        {
          name: "icon-mxzc",
          color: "#37c24b"
        },
        {
          name: "icon-sjss",
          color: "#9a35fb"
        }
      ]
    };
  },
  created() {
    console.log("created");
    Bus.$on("secList", arr => {
      this.NavList = arr;
    });
  },
  mounted() {
    this.$nextTick(() => {
      let ywtool_wrap = new BScroll(".ywtool_wraps", {
        scrollbar: true,
        mouseWheel: true
      });
    });
  }
};
</script>

<style lang="css">
.ywtool_list1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 8px 4px 15px;
}
.ywtool_wraps {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.ywtool_list1 li {
  width: 80px;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  color: #84f1f1;
  margin: 15px 0 0 0;
}
.ywtool_list1 li a {
  color: #84f1f1;
  display: inline-block;
}
.ywtool_list1 li i {
  display: block;
  width: 50px;
  height: 50px;
  margin: 0 15px;
  border-radius: 50%;
  line-height: 50px;
  font-size: 24px;
  background: #0d7474;
  color: #fff;
}
@media (max-width: 1399px) {
  .ywtool_list1 li {
    width: 75px;
  }
  .ywtool_list1 li i {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
}
.title_bars h4 {
  height: 34px;
  background: #024243;
  padding: 0 10px;
  border-bottom: 1px solid #035e5f;
  color: #84f1f1;
  font-size: 16px;
  line-height: 32px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
}
</style>
