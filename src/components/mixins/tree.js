var mixins = {
  data() {
    return {
      areaObj: {}, //地区信息（如果有）
      stObj: {}, //厂站信息（如果有）
      firstData: [], //第一层级
    }
  },
  created() {
    this.getFirstMenu();
  },
  methods: {
    getMenu(item, callback) { //监听回调函数，通过callback返回下级菜单数据 ，如果需要的话
      console.log(item); //点击时的返回值（地区，电压，厂站等）,可根据需要返回需要的值
      if (item.attribute == 'systemId') {
        this.areaObj = item
        //根据地区id加载电压等级
        this.getBvidMenu(item, callback);
      } else if (item.attribute == 'bvId') {
        //根据电压等级加载厂站
        this.getSubMenu(item, callback);
      } else if (item.attribute == 'sbtId') {
        this.stObj = item;
        //根据厂站加载计量点
      } else if (item.attribute == 'other') { //其他类型子菜单，如模型维护=》线路类型菜单

      }
    },
    getFirstMenu() { //第一层菜单，根据具体需求更改请求接口
      this.$http.get('/treeService/tree/getAllSystemTreeNode?sign='+sessionStorage.getItem("accessToken"))
        .then((res) => {
          this.firstData = res.data.data.allSubSystems
        })
    },
    getBvidMenu(item, callback) { //电压菜单
      if (!item.children) {//children存在，不再加载
        this.$http.get("/treeService/tree/getAllBaseVoltageTreeNodeBySystemId",{
          params:{
            sign:sessionStorage.getItem("accessToken"),
            systemId:item.id
          }
        })
          .then((res) => {
            if (res.data.data) { //返回为空不处理
              item.children = res.data.data.allSubStations;
              callback(item);
            }
          })
      }
    },
    getSubMenu(item, callback) { //厂站菜单
      if (!item.children) {
        this.$http.get("/treeService/tree/getAllSubStationTreeNodeBySystemIdAndBvId",{
          params:{
            sign:sessionStorage.getItem("accessToken"),
            systemId:item.parentId,
            bvId:item.id
          }
        })
          .then((res) => {
            if (res.data.data) { //返回为空不处理
              item.children = res.data.data.allSubStations;
              callback(item);
            }
          })
      }
    },
    getVlMenu(item, callback) { //母线菜单
      if (!item.children) {
        this.$http.get("/treeService/tree/getAllVoltagelevelTreeNodeBySystemIdAndBvId",{
          params:{
            sign:sessionStorage.getItem("accessToken"),
            systemId:item.parentId,
            sbtId:item.id
          }
        })
          .then((res) => {
            if (res.data.data) { //返回为空不处理
              item.children = res.data.data.allSubStations;
              callback(item);
            }
          })
      }
    },
  },
}
export default mixins;
