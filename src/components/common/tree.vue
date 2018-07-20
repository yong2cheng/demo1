<template lang="html">
  <ul class="tree_main">
    <li class="tree-menu" v-for="(item,index) in data" :class="[bindIcon(item),item.attribute==$attrs.lastAttr?'noFoldesr':'',open[index]?'isOpen':'']">
      <span @click.stop="sendData(item,index)">{{item.name}}</span>
      <tree v-if="item.children&&open[index]" @sendTreeInfo="sendChildData" :lastAttr=$attrs.lastAttr :data="item.children"></tree>
      <!--  lastAttr的值有父级传过来，声明最后层级的属性-->
    </li>
  </ul>
</template>
<script>
export default {
  name: "tree",
  data() {
    return {
      open: {},
      folderIconList: []
    };
  },
  props: ["data"],
  inheritAttrs: false, //获取父级上非props的属性，$attrs
  created() {
    //  console.log(this.$attrs)
  },
  methods: {
    loadingIcon(index) {
      this.$set(this.open, index, !this.open[index]);
      this.folderIconList[index] = this.open[index] ? "isOpen" : "tree-menu";
    },
    sendData(item, index) {
      this.$emit("sendTreeInfo", item, callbackData => {
        //回调函数返回点击加载的下一级菜单
        console.log("传给树的数据" + callbackData);
        if (callbackData.children) {
          // console.log(index);
        }
      });
      this.$set(this.open, index, !this.open[index]);
    },
    sendChildData(item, index) {
      //递归也需要触发事件函数
      this.$emit("sendTreeInfo", item, callbackData => {
        //回调函数返回点击加载的下一级菜单
        if (callbackData.children) {
          // console.log(callbackData);
        }
      });
    },
    bindIcon(type) {
      //绑定菜单
      let iconClass = "";
      if (type.attribute == "systemId") {
        //绑定地区图标
        if (type.id == 15) {
          iconClass = "systemId1";
        } else if (type.id == 16) {
          iconClass = "systemId2";
        } else if (type.id == 0) {
          iconClass = "systemId3";
        } else {
          iconClass = "systemId";
        }
      } else if (type.attribute == "bvId") {
        //绑定电压图标
        if (type.id == 1) {
          iconClass = "bvId1";
        } else if (type.id == 3) {
          iconClass = "bvId2";
        } else if (type.id == 6) {
          iconClass = "bvId3";
        } else if (type.id == 10) {
          iconClass = "bvId5";
        } else if (type.id == 12) {
          iconClass = "bvId6";
        } else if (type.id == 14) {
          iconClass = "bvId7";
        } else if (type.id == 18) {
          iconClass = "bvId8";
        } else {
          iconClass = "bvId9";
        }
      } else if (type.attribute == "sbtId") {
         if (type.parentId == 1) {
          iconClass = "sbtId1";
        } else if (type.parentId == 3) {
          iconClass = "sbtId2";
        } else if (type.parentId == 6) {
          iconClass = "sbtId3";
        } else if (type.parentId == 10) {
          iconClass = "sbtId5";
        } else if (type.parentId == 12) {
          iconClass = "sbtId6";
        } else if (type.parentId == 14) {
          iconClass = "sbtId7";
        } else if (type.parentId == 18) {
          iconClass = "sbtId8";
        } else {
          iconClass = "sbtId";
        }
        //绑定厂站图标
      } else if (type.attribute == "dvId") {
        iconClass = "dvId";
        //绑定计量点图标
      } else {
        iconClass = "other";
        //绑定其他图标
      }
      return iconClass;
    }
  }
};
</script>

<style lang="css">
.tree_main li {
  padding-left: 20px;
}
.tree-menu {
  line-height: 20px;
  margin-top: 4px;
}
.isOpen {
  list-style-image: url(../../assets/img/st_icon_open.png) !important;
}
.tree-menu {
  list-style-image: url(../../assets/img/st_icon.png);
}
.noFoldesr {
  list-style-image: none !important;
}
.tree-menu span {
  display: inline-block;
  width: 100%;
  font-size: 13px;
  cursor: pointer;
  color: #84f1f1;
}
.tree-menu span:hover {
  background-color: rgb(5, 59, 59);
  color: #fff;
}
.icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  vertical-align: -2px;
}
.systemId {
  background-image: url(../../assets/img/area5.gif);
  background-repeat: no-repeat;
}
.systemId1 {
  background-image: url(../../assets/img/areas/area0.gif);
  background-repeat: no-repeat;
}
.systemId2 {
  background-image: url(../../assets/img/areas/area5.gif);
  background-repeat: no-repeat;
}
.systemId3 {
  background-image: url(../../assets/img/areas/area3.gif);
  background-repeat: no-repeat;
}
.bvId {
  background-image: url(../../assets/img/voltaglevel/Vol6.gif);
  background-repeat: no-repeat;
}
.bvId1 {
  background-image: url(../../assets/img/voltaglevel/Vol9.gif);
  background-repeat: no-repeat;
}
.bvId2 {
  background-image: url(../../assets/img/voltaglevel/Vol8.gif);
  background-repeat: no-repeat;
}
.bvId3 {
  background-image: url(../../assets/img/voltaglevel/Vol7.gif);
  background-repeat: no-repeat;
}
.bvId4 {
  background-image: url(../../assets/img/voltaglevel/Vol6.gif);
  background-repeat: no-repeat;
}
.bvId5 {
  background-image: url(../../assets/img/voltaglevel/Vol5.gif);
  background-repeat: no-repeat;
}
.bvId6 {
  background-image: url(../../assets/img/voltaglevel/Vol4.gif);
  background-repeat: no-repeat;
}
.bvId7 {
  background-image: url(../../assets/img/voltaglevel/Vol3.gif);
  background-repeat: no-repeat;
}
.bvId8 {
  background-image: url(../../assets/img/voltaglevel/Vol2.gif);
  background-repeat: no-repeat;
}
.bvId9 {
  background-image: url(../../assets/img/voltaglevel/Vol1.gif);
  background-repeat: no-repeat;
}
.sbtId1 {
  background-image: url(../../assets/img/factory/Fac3_Vol9.gif);
  background-repeat: no-repeat;
}
.sbtId2 {
  background-image: url(../../assets/img/factory/Fac3_Vol8.gif);
  background-repeat: no-repeat;
}
.sbtId3 {
  background-image: url(../../assets/img/factory/Fac3_Vol7.gif);
  background-repeat: no-repeat;
}
.sbtId4 {
  background-image: url(../../assets/img/factory/Fac3_Vol6.gif);
  background-repeat: no-repeat;
}
.sbtId5 {
  background-image: url(../../assets/img/factory/Fac3_Vol5.gif);
  background-repeat: no-repeat;
}
.sbtId6 {
  background-image: url(../../assets/img/factory/Fac3_Vol4.gif);
  background-repeat: no-repeat;
}
.sbtId7 {
  background-image: url(../../assets/img/factory/Fac3_Vol3.gif);
  background-repeat: no-repeat;
}
.sbtId8 {
  background-image: url(../../assets/img/factory/Fac3_Vol2.gif);
  background-repeat: no-repeat;
}
.sbtId9 {
  background-image: url(../../assets/img/factory/Fac3_Vol1.gif);
  background-repeat: no-repeat;
}
.sbtId {
  background-image: url(../../assets/img/factory/Fac1_Vol7.gif);
  background-repeat: no-repeat;
}
.dvId {
  background-image: url(../../assets/img/voltaglevel/Vol5.gif);
  background-repeat: no-repeat;
}
.other {
  background-image: url(../../assets/img/voltaglevel/Vol5.gif);
  background-repeat: no-repeat;
}
</style>
