<template>
  <div class="main">
    <span class="bread_nav">
      <router-link :to="{path:'/dlywkhd/mxwh',query:{sysId:$route.query.sysId,sonid:$route.query.sonid}}">模型维护></router-link>
    </span>
    <span class="bread_nav">EMS关联</span>
    <div class="mxian_succ mxian_mxwh ems_main">
      <div class="ems_wrap">
        <div class="ems_left">
          <!-- {{$route.query.areaId}} -->
          <ul>
            <li class="ems_open">{{ModelRate.pathName}} 
              <span style="color:#fff">(已关联/TMR设备)</span>
            </li>
            <ul class="ems_file">
              <li @click="relationType='substation';getTEdata();typeName='厂站'">厂站({{ModelRate.sbRelationCount}}/{{ModelRate.sbAllCount}})</li>
              <li @click="relationType='voltagelevel';getTEdata();typeName='电压等级'">电压等级({{ModelRate.vlRelationCount}}/{{ModelRate.vlAllCount}})</li>
              <li @click="relationType='powertransformer';getTEdata();typeName='主变'">主变({{ModelRate.psRelationCount}}/{{ModelRate.psAllCount}})</li>
              <li @click="relationType='aclinesegment';getTEdata();typeName='线路'">线路({{ModelRate.asgRelationCount}}/{{ModelRate.asgAllCount}})</li>
              <li @click="relationType='breaker';getTEdata();typeName='开关'">开关({{ModelRate.brelationCount}}/{{ModelRate.ballCount}})</li>
              <li @click="relationType='aclineend';getTEdata();typeName='线端'">线端({{ModelRate.csRelationCount}}/{{ModelRate.csAllCount}})</li>
              <li @click="relationType='generatingUnit';getTEdata();typeName='机组'">机组({{ModelRate.guRelationCount}}/{{ModelRate.guAllCount}})</li>
              <li @click="relationType='energyconsumer';getTEdata();typeName='负荷'">负荷({{ModelRate.ecRelationCount}}/{{ModelRate.ecAllCount}})</li>
            </ul>
          </ul>
        </div>
        <div class="ems_right">
          <div class="tool_bar ems_tool_bar">
            <span class="btn esm_btn" :class="{esm_btn_active:!ready}" @click="ready=false;scrollBartmr()">未关联</span>
            <span class="btn esm_btn" :class="{esm_btn_active:ready}" @click="ready=true;scrollBar()">已关联</span>
            <span style="margin-left: 18px; color: rgb(147, 117, 5); font-size: 13px;">类型:<i>{{typeName}}</i></span>
          </div>
          <div class="ems_conect_wrap" v-show='ready'>
            <div class="tmr_ems_wrap">
              <div class="search_tool searchAll">
                  <input type="text" class="txt" placeholder="输入设备名称"  v-model="searchAll">
                  <button class="icon-search primary" @click="searchAllfun()">搜索</button>
              </div>
              <table class="table">
                 <thead>
                      <tr>
                        <td width="10%">序号</td>
                        <td>TMR</td>
                        <td>EMS</td>
                        <td>关联状态</td>
                      </tr>
                  </thead>
              </table>
              <div class="tmr_ems_table">
                  <table class="table">
                    <tbody>
                      <tr v-for="(item,index) in tmremsData" :key="index">
                        <td width="10%">{{index +1}}</td>
                        <td>{{item.pathName}}</td>
                        <td>{{item.name}}</td>
                        <td>
                          <span class="color_warning" @click="deletedRelation(item.mrid)">解除关联</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
          <div class="ems_conect_wrap" v-show='!ready'>
            <div class="ems_conect_left">
              <h4 class="ems_title">TMR名称</h4>
              <div class="search_tool">
                  <input type="text" class="txt" placeholder="输入设备名称"  v-model="searchTMR">
                  <button class="icon-search primary" @click="searchTMRfun()">搜索</button>
              </div>
              <div class="ems_table">
                <table class="table">
                    <thead>
                      <tr>
                        <td width="20%">序号</td>
                        <td>设备名称</td>
                      </tr>
                    </thead>
                </table>
                <div class=" ems_table1">
                  <table class='table'>                   
                    <tbody>
                      <tr v-for="(item,index) in tmrData" :key="index">
                        <td width="20%">
                          <input type="radio" name="tmr" :value="item.mrid" v-model="equipmentId">
                          {{index + 1}}
                        </td>
                        <td>
                          {{item.pathName}}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="ems_conect_middle">
                <button type="button" name="button" @click="associateRelation()">关联</button>
            </div>
            <div class="ems_conect_right">
                <h4 class="ems_title">EMS名称</h4>
              <div class="search_tool">
                  <input type="text" class="txt" placeholder="输入设备名称" v-model="searchEMS">
                  <button class="icon-search primary" @click="searchEMSfun()">搜索</button>
              </div>
              <div class="ems_table">
                <table class="table">
                  <thead>
                      <tr>
                        <td width="20%">序号</td>
                        <td>设备名称</td>
                      </tr>
                    </thead>
                </table>
                <div class=" ems_table2">
                  <table class='table'>
                    
                    <tbody>
                      <tr v-for="(item,index) in esmData" :key="index">
                        <td width="20%">
                          <input type="radio" name="ems" :value="item.mrid" v-model="emsEquipmentId">
                            {{index + 1}}
                        </td>
                        <td>
                          {{item.pathName}}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading :isLoading='loading'></loading>
  </div>
</template>
<script>
import areaMap from "@/assets/config/areaMap";
import BScroll from "better-scroll";
import loading from "@/components/common/loading";
import qs from "qs";
export default {
  data() {
    return {
      ready: false,
      ModelRate: {},
      relationType: "substation",
      emsSystemId: "", //ems查询的id
      esmData: [],
      tmrData: [],
      esmDataBack: [],
      tmrDataBack: [],
      tmremsData: [],
      tmremsDataBack: [],
      equipmentId: "", //tmr的id
      emsEquipmentId: "",
      searchTMR: "",
      searchEMS: "",
      searchAll: "",
      loading: false,
      typeName: "",
      tmrems: "",
      tmr: "",
      ems: ""
    };
  },
  created() {
    this.getEMSModel();
    areaMap.forEach(item => {
      if (item.areaId == this.$route.query.areaId) {
        this.emsSystemId = item.areaName;
      }
    });
  },
  methods: {
    getEMSModel() {
      //左侧菜单
      this.$http
        .get("quotaService/quota/getEMSModelRelation", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            systemId: this.$route.query.areaId,
            month: this.$day().format("YYYY-MM")
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            console.log(res);
            res.data.data.eMSModelRelationVO.forEach(item => {
              if (item.systemId == this.$route.query.areaId) {
                this.ModelRate = item;
              }
            });
          }
        });
    },
    getRelationModel() {
      //getTMR数据
      this.loading = true;
      this.$http
        .get("analysisService/analy/getRelationModel", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            systemId: this.$route.query.areaId,
            relationType: this.relationType
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.tmrData = res.data.data.relationVO;
            this.tmrDataBack = res.data.data.relationVO;
            this.getEMSRelationModel();
            // console.log(this.tmrData);
          }
        });
    },
    getEMSRelationModel() {
      //getEMS数据
      this.$http
        .get("analysisService/analy/getEMSRelationModel", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            systemId: this.emsSystemId,
            relationType: this.relationType
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.loading = false;
            this.esmData = res.data.data.relationVO;
            this.esmDataBack = res.data.data.relationVO;
            this.getTMRandEMS();
          }
        });
    },
    getTEdata() {
      this.getRelationModel();
    },
    associateRelation() {
      //关联
      if (!this.equipmentId || !this.emsEquipmentId) {
        // alert("请选择tmr和ems设备");
        this.$notify({
          title: "提示",
          message: "请选择tmr和ems设备",
          duration: 1500,
          type: "warning"
        });
      } else {
        this.$http
          .post(
            "/analysisService/analy/associateEquipment?sign=" +
              sessionStorage.getItem("accessToken"),
            qs.stringify({
              equipmentType: this.relationType,
              equipmentId: this.equipmentId,
              emsEquipmentId: this.emsEquipmentId,
              systemId: this.$route.query.areaId,
              emsSystemId: this.emsSystemId
            })
          )
          .then(res => {
            this.equipmentId = "";
            this.emsEquipmentId = "";
            this.getTEdata();
            this.$notify({
              title: "提示",
              message: "设备关联成功！",
              duration: 1500,
              type: "success"
            });
          });
      }
    },
    //搜索TMR设备
    searchTMRfun() {
      if (this.searchTMR) {
        this.tmrData = [];
        this.tmrDataBack.forEach(item => {
          if (item.pathName.indexOf(this.searchTMR) > -1) {
            this.tmrData.push(item);
          }
        });
      } else {
        this.tmrData = this.tmrDataBack;
      }
    },
    searchEMSfun() {
      //搜索EMS设备
      if (this.searchEMS) {
        this.esmData = [];
        this.esmDataBack.forEach(item => {
          if (item.pathName.indexOf(this.searchEMS) > -1) {
            this.esmData.push(item);
          }
        });
      } else {
        this.esmData = this.esmDataBack;
      }
    },
    //寻早关联
    getTMRandEMS() {
      this.tmremsData = [];
      this.tmremsDataBack = [];
      this.tmrDataBack.forEach((item, index) => {
        var obj = {};
        this.esmDataBack.forEach((attr, indx) => {
          if (item.otherKey3 == attr.mrid && item.otherKey4 == attr.systemId) {
            obj.pathName = item.pathName;
            obj.name = attr.pathName;
            obj.mrid = item.mrid;
            this.tmremsData.push(obj);
            this.tmremsDataBack.push(obj);
          }
        });
      });
    },
    scroll() {
      if (this.tmr) {
        this.tmr.destroy();
      }
      if (this.ems) {
        this.ems.destroy();
      }
      this.$nextTick(() => {
        this.tmr = new BScroll(".ems_table1", {
          scrollbar: {
            fade: false,
            interactive: true
          },
          mouseWheel: true,
          preventDefault: false
        });
        this.ems = new BScroll(".ems_table2", {
          scrollbar: {
            fade: false,
            interactive: true
          },
          mouseWheel: true,
          preventDefault: false
        });
      });
    },
    scrollBar() {
      if (this.tmrems) {
        this.tmrems.destroy();
      }
      this.$nextTick(() => {
        this.tmrems = new BScroll(".tmr_ems_table", {
          scrollbar: {
            fade: false,
            interactive: true
          },
          mouseWheel: true
        });
      });
    },
    scrollBartmr() {
      this.scroll();
    },
    //解除关联
    deletedRelation(id) {
      this.$http
        .post(
          "/analysisService/analy/associateEquipment?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            equipmentType: this.relationType,
            equipmentId: id
          })
        )
        .then(res => {
          console.log(res);
          this.$notify({
            title: "提示",
            message: "关系解除成功！",
            duration: 1500,
            type: "success"
          });
        });
    },
    //搜索tmr和ems
    searchAllfun() {
      if (this.searchAll) {
        this.tmremsData = [];
        this.tmremsDataBack.forEach(item => {
          if (
            item.pathName.indexOf(this.searchAll) > -1 ||
            item.name.indexOf(this.searchAll) > -1
          ) {
            this.tmremsData.push(item);
          }
        });
      } else {
        this.tmremsData = this.tmremsDataBack;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll();
    });
  },
  components: {
    loading
  }
};
</script>

<style lang="css">
.ems_main {
  margin-top: 30px;
}
.ems_tool_bar {
  height: 62px !important;
  line-height: 62px !important;
  border-bottom: 1px solid #0d7474;
  margin-bottom: 15px;
}
.ems_wrap {
  display: flex;
  height: 590px;
}
.ems_left {
  width: 20%;
  height: 100%;
  background: #012828;
  box-sizing: border-box;
  padding: 10px;
  border-right: 1px solid #0d7474;
}
.ems_left ul {
  padding-left: 20px;
}
.ems_left ul li {
  margin-bottom: 6px;
  padding-left: 20px;
  color: #84f1f1;
  font-size: 13px;
  cursor: pointer;
}
.ems_left ul li:hover {
  color: #fff;
}
.ems_open {
  background: url(../../../../assets/img/st_folder_open.gif) 0 center;
  background-repeat: no-repeat;
}
.ems_file li {
  background: url(../../../../assets/img/st_node.gif) 0 center;
  background-repeat: no-repeat;
}
.ems_right {
  width: 75%;
  padding: 20px;
  padding-top: 10px;
}
.esm_btn {
  margin-left: 18px;
}
.esm_btn:hover {
  background-color: #f6726c;
}
.esm_btn_active {
  border-color: #dd6b66;
  background: #dd6b66;
  color: #fff;
}
.ems_conect_wrap {
  display: flex;
  min-height: 450px;
  padding: 12px 0;
  margin-top: 10px;
  border: 1px solid #0d7474;
}
.ems_conect_left,
.ems_conect_right {
  flex: 1;
  box-sizing: border-box;
  margin: 0 12px;
  padding-bottom: 10px;
  border: 1px solid #0d7474;
}
.ems_conect_middle {
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.search_tool {
  /* text-align: center; */
  text-indent: 10px;
  margin-bottom: 15px;
}
.ems_table {
  box-sizing: border-box;
  padding: 0 10px;
  overflow: hidden;
}
.ems_title {
  text-indent: 10px;
  margin: 10px 0;
  color: #dd6b66;
}
.ems_table1,
.ems_table2 {
  max-height: 330px;
  position: relative;
  overflow: hidden;
}
.tmr_ems_wrap {
  width: 75%;
  margin: 0 auto;
}
.tmr_ems_wrap {
  box-sizing: border-box;
  padding: 20px;
}
.searchAll {
  display: flex;
}
.searchAll .txt {
  flex: 1;
  margin-right: 10px;
}
.tmr_ems_table {
  max-height: 330px;
  position: relative;
  overflow: hidden;
}
</style>
