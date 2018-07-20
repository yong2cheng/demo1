<template>
<li class="tree-menu" :class="{'isFoldesr':model.attribute=='systemId'&&zIndex>1||isFolder}">
  <span @click.stop="toggle(model)" :class="chooseClass(model)">
        <i :class="['icon']"></i>
          {{model[name]||model.name }}
  </span>
  <ul>
    <tree-menu v-if="open" v-for="(models,index) in model.children" :model="models" :key='index' @getSubMenu="Sectoggle"></tree-menu>
  </ul>
</li>
</template>
<script>
export default {
  name: 'treeMenu',
  props: {
    model: null,
    name: String,
    zIndex: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      open: false,
      icon_open:false,
      classObj:['systemId','bvId','sbtId'],
    }
  },
  computed: {
    isFolder: function() {
      return this.model.children &&
        this.model.children.length
    },
  },
  methods: {
    toggle(item) { //第二层
      this.$emit("getSubMenu", item)
      console.log(item);
      if (this.isFolder) {
        console.log("开关");
        this.open = !this.open
        this.icon_open = !this.icon_open
        console.log(this.icon_open);
      }
    },
    Sectoggle(item) { //第三层后
      this.$emit("getSubMenu", item)
        console.log("开关");
        this.icon_open = !this.icon_open
        console.log("开关"+this.icon_open);
    },
    chooseClass(model){
      var classData = ''
      this.classObj.forEach((item,index)=>{
      if (model.attribute==item) {
          console.log(item);
          classData =item
        }
      })
      return classData
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.open = true
    })
  },
}
</script>
<style scoped>
.tree-menu ul {
  list-style: none;
  padding-left: 20px;
}
.tree-menu {
  line-height: 20px;
}
.isOpen{
  list-style-image: url(../../assets/img/st_icon_open.png) !important;
}
.isFoldesr {
    list-style-image: url(../../assets/img/st_icon.png);
}

.tree-menu span {
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
.systemId{
  background-image: url(../../assets/img/area5.gif);
  background-repeat: no-repeat;
}
.bvId{
  background-image: url(../../assets/img/voltaglevel/Vol5.gif);
  background-repeat: no-repeat;
}
.sbtId{
  background-image: url(../../assets/img/factory/Fac1_Vol7.gif);
  background-repeat: no-repeat;
}
</style>
