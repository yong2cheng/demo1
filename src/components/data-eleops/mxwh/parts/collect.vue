<template lang="html">
  <div class="collect_wrap">
    <div class="tree_wrap">
      <div class="treeZone">
        <div class="zone" v-show='showTree'>
            <tree :data='firstData' @sendTreeInfo="getMenu" lastAttr="systemId"></tree>
        </div>
      </div>
        <div class="tree_tollgo" @click="showTree=!showTree"></div>
    </div>
    <div class="table_wrap flex_table">
      <table class="table">
        <thead>
          <tr>
            <th>名称</th>
            <th>已注册</th>
            <th>电量主站</th>
            <th>匹配度(%)</th>
            <th>EMS</th>
            <th>匹配度(%)</th>
          </tr>
        </thead>
      </table>
      <div class="table_content">
        <table class="table">
          <tbody>
            <tr v-for="item in dataObj">
              <td>
               {{item.name}}
              </td>
              <td>
               <span class="color_warning" @click="type=1;showDetail(item.modelMaintenanceChild);showDetailBlo()"> {{item.registered}}</span>
              </td>
              <td>
                <span class="color_warning" @click="type=3;showDetail(item.modelMaintenanceChild);showDetailBlo()">{{item.electricity?item.electricity:''}}</span>
              </td>
              <td>{{item.elecRate}}</td>
              <td>
                <span class="color_warning" @click="type=2;showDetail(item.modelMaintenanceChild);showDetailBlo()"> {{item.ems?item.ems:''}}</span>
               </td>
              <td>{{item.emsRate}}</td>              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
     <loading :isLoading='loading'></loading>
  </div>
</template>
<script>
import hub from "@/assets/eventBus";
import tree from "@/components/common/tree.vue";
import treeMinx from "@/components/mixins/tree.js";
import areaMap from "@/assets/config/areaMap";
import BScroll from "better-scroll";
import loading from "@/components/common/loading"
export default {
  data() {
    return {
      showTree: true,
      zIndex: 1,
      subareaId: null,
      dataObj: [],
      areaObj: {},
      autoIp: "", //动态ip
      loading:false,
      type:1,
      orderColumn:"pathName",
      direction:0
    };
  },
  props: ["dataType"],
  components: {
    tree,loading
  },
  mixins: [treeMinx],
  methods: {
    getMenu(item, callback) {
      //覆盖tree.JS的方法，只取一层
      if (item.attribute == "systemId") {
        this.areaObj = item; //areaObj再tree中已定义好，也可以再当前组件自定义
        areaMap.forEach((ite, index) => {
          if (this.areaObj.id == ite.areaId) {
            this.subareaId = ite.mrId;
          }
        });
        this.getData();
      }
    },
    showDetail(arr) {//点击的类型
      let dataArr=[];
      if (this.type===1) {
        arr.forEach((item,index)=>{
          if (item.mrId) {
            dataArr.push(item)
          }
        })
      }else if(this.type ===2){
         arr.forEach((item,index)=>{
          if (item.otherKey3) {
            dataArr.push(item)
          }
        })
      }else{
        dataArr = arr;
      }
      hub.$emit("showCollect", [dataArr, this.subareaId]);
    },
    showDetailBlo(){
       this.$emit("showCollectLIst", true);
    },
    getData() {
      //获取地市或系统数据后，过滤
      if (this.dataType) {
        //系统数据
        this.getSysData();
      } else {
        // this.getEmsData();
        this.dynamicIp();
      }
      this.$emit("getAreaId", this.areaObj);
    },
    getSysData() { //获取系统数据
      if (this.subareaId) {
        this.loading = true;
        this.$http
          .get("/maintenanceService/maintenance/getAXEModels", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              areaId: this.subareaId,
              modelType: 2,
              orderColumn:this.orderColumn,
              direction:this.direction
            }
          })
          .then(res => {
            if (res.data.code === 1) {
              this.loading = false;
              this.dataObj = res.data.data.modelsData;
              this.showDetail(res.data.data.modelsData[0].modelMaintenanceChild)
            }
          })
          .catch(erro => {
            this.loading = false;
            alert(erro);
          });
      }
    },
    async getEmsData() {//获取地市数据
      if (this.subareaId) {
        this.loading = true;
        console.log("切换为地市数据");
        this.$http
          .get(this.autoIp + "/getModelMaintenance", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              subareaId: this.subareaId,
              modelType: 2
            }
          })
          .then(res => {
            // console.log(res);
             this.loading = false;
            this.dataObj = res.data.modelMaintenanceVOList;
            // console.log(this.dataObj);
          });
      }
    },
    dynamicIp() { //获取动态ip
      this.$http
        .get(
          "prefectureLevelCityService/prefectureLevelCityApi/getSubsystemList",
          {
            params: {
              sign: sessionStorage.getItem("accessToken")
            }
          }
        )
        .then(res => {
          if (res.data.code === 1) {
            res.data.data.allSubSystems.forEach((item, index) => {
              if (item.systemId == this.areaObj.id) {
                this.autoIp = item.fetchUrl;
                console.log(this.autoIp);
                this.getEmsData();
              }
            });
          }
        });
    }
  },
  mounted() {
    hub.$on("orderColumn",e=>{
      this.orderColumn=e[0];
      this.direction=e[1];
      this.getData()
    });
    this.$nextTick(() => {
      let scroll1 = new BScroll(".table_content", {
        scrollbar: true,
        mouseWheel: true
      });
    });
    hub.$on("refresh", e => {
      this.getData();
    });
    hub.$on("downFile", e => {
      //获取地市或系统数据后，过滤
      if (this.dataType) {
        this.$http
          .get("/maintenanceService/maintenance/outAXEModels", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              areaId: this.subareaId,
              modelType: 2
            }
          })
          .then(res => {
            window.location = res.request.responseURL;
          });
      } else {
        this.$http
          .get(this.autoIp + "/outModelMaintenance", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              subareaId: this.subareaId,
              modelType: 2
            }
          })
          .then(res => {
            window.location = res.request.responseURL;
          });
      }
    });
  }
};
</script>
<style lang="css">
.collect_wrap {
  display: flex;
  flex-wrap: nowrap;
}
.flex_table {
  flex: 1;
  margin: 0 30px;
}
.table_content {
  position: relative;
  max-height: 480px;
  overflow: hidden;
  margin-bottom: 10px;
}
.tree_wrap {
  position: relative;
  height: 580px;
}
.treeZone {
  height: 100%;
  background: #012828;
  overflow: hidden;
}
.zone {
  box-sizing: border-box;
  width: 260px;
  box-sizing: border-box;
  padding-left: 20px;
}
</style>
