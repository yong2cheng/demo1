var mixins = {
  data() {
    return {
      theData: [],
      menuName: 'name', // 显示菜单名称的属性
      treeObj: {},
      zIndex: 3,
    }
  },
  created() {
    this.getAreaMenu()
  },
  methods: {
    getAreaMenu() { //第一层
      this.$http.get('/treeService/tree/getAllSystemTreeNode')
        .then((res) => {
          console.log(res);
          this.theData = res.data.data.allSubSystems
        })
    },
    getSubMenu(menuItem) {
      if (!menuItem.children) {
        if (menuItem.attribute === "systemId" && this.zIndex >= 2) { //第二层
          this.$http.get(`/treeService/tree/getAllBaseVoltageTreeNodeBySystemId?systemId=${menuItem.id}`)
            .then((res) => {
              menuItem.children = res.data.data.allSubStations;
              console.log(menuItem);
            })
        } else if (menuItem.attribute === "bvId" && this.zIndex >= 3) { //第三层
          console.log('点击电压等级');
          this.$http.get(`/treeService/tree/getAllSubStationTreeNodeBySystemIdAndBvId?systemId=${menuItem.parentId}&bvId=${menuItem.id}`)
            .then((res) => {
              menuItem.children = res.data.data.allSubStations;
              console.log(menuItem);
            })
        } else {
          console.log("传回的值");
          console.log(menuItem);
          this.treeObj = menuItem;
        }
      }
    },
  }
}
export default mixins;
