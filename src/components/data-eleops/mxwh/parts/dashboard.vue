<template lang="html">
  <div class="dash_wrap">
    <h4 style="line-height:40px;" >厂站信息:{{query.localName}}</h4>
    <ul class="czxqqhbox" style="margin-top:5px;">
      <li :class="{dqxz:currentView=='sub1'}" @click="currentView='sub1'">详细信息</li>
      <li :class="{dqxz:currentView=='sub2'}" @click="currentView='sub2'">电表</li>
      <li :class="{dqxz:currentView=='sub3'}" @click="currentView='sub3'">变压器</li>
      <li :class="{dqxz:currentView=='sub4'}" @click="currentView='sub4'">线端</li>
      <li :class="{dqxz:currentView=='sub5'}" @click="currentView='sub5'">开关</li>
      <li :class="{dqxz:currentView=='sub6'}" @click="currentView='sub6'">机组</li>
    </ul>
    <div class="dash_content">
      <transition name="component-fade" mode="out-in">
        <keep-alive>    
          <component :is="currentView" :callbackdata="callbackdata" :querys='query' @refreshData="refreshModify()"></component>
        </keep-alive>    
      </transition>
    </div>
  </div>
</template>

<script>
import sub1 from "./sub/sub1";
import sub2 from "./sub/sub2";
import sub3 from "./sub/sub3";
import sub4 from "./sub/sub4";
import sub5 from "./sub/sub5";
import sub6 from "./sub/sub6";
export default {
  name: "dashBoard",
  data() {
    return {
      currentView: "sub1",
      sbuData1: {},
      sbuData2: [],
      sbuData3: [],
      sbuData4: {},
      sbuData5: [],
      sbuData6: [],
      callbackdata: "" //传递给动态组件的数据
    };
  },
  props: ["query"], //接受的参数
  components: {
    sub1,
    sub2,
    sub3,
    sub4,
    sub5,
    sub6
  },
  created() {
    this.getSubData();
  },
  methods: {
     //其他信息
    async getSubData() {
      this.$http
        .get("analysisService/analy/getSubstationModel", {
          params: {
            appkey: "3917230828",
            sign: sessionStorage.getItem("accessToken"),
            stId: this.query.mrId,
            // inUse: 1
          }
        })
        .then(res => {
          if (res.data.code === 1) {
             console.log('done');
            this.sbuData1.pathName = res.data.data.substationModel.pathName;
            this.sbuData1.localName = res.data.data.substationModel.localName;
            this.sbuData1.mrid = res.data.data.substationModel.mrid;
            this.sbuData1.localId = res.data.data.substationModel.localId;
            this.sbuData1.bvId = res.data.data.substationModel.bvId;
            this.sbuData1.stType = res.data.data.substationModel.stType;
            this.sbuData1.isInUse = res.data.data.substationModel.isInUse;
            this.callbackdata = this.sbuData1;
            this.sbuData3.list =
              res.data.data.substationModel.powerTransformerModels;
            this.sbuData3.mrid = res.data.data.substationModel.mrid;
            this.sbuData4.list =
              res.data.data.substationModel.lineSegmentModels;
            this.sbuData4.mrid = res.data.data.substationModel.mrid;
            this.sbuData5.list = [];
            this.sbuData5.mrid = res.data.data.substationModel.mrid;
            res.data.data.substationModel.voltageLevelModels.forEach(item => {
              if (item.generatingUnitModels.length > 0) {
                item.generatingUnitModels.forEach(its => {
                  if (its.breakerModel) {
                    this.sbuData5.list.push(its.breakerModel);
                  }
                });
              }
            });
            this.sbuData6.list = [];
            this.sbuData6.mrid = res.data.data.substationModel.mrid;
            res.data.data.substationModel.voltageLevelModels.forEach(item => {
              if (item.generatingUnitModels.length > 0) {
                this.sbuData6.list = this.sbuData6.list.concat(
                  item.generatingUnitModels
                );
              }
            });
            // console.log(this.sbuData4);
          }
        });
    },
    //修改刷新
     refreshModify(){
       this.getSubData().then(res=>{
         console.log('111')
       })
    }
  },
  watch: {
    currentView(newV) {
      switch (newV) {
        case "sub1":
          this.callbackdata = this.sbuData1;
          break;
        case "sub2":
          this.callbackdata = this.sbuData2;
          break;
        case "sub3":
          this.callbackdata = this.sbuData3;
          break;
        case "sub4":
          this.callbackdata = this.sbuData4;
          break;
        case "sub5":
          this.callbackdata = this.sbuData5;
          break;
        case "sub6":
          this.callbackdata = this.sbuData6;
          break;
        default:
      }
    }
  }
};
</script>

<style lang="css">
.czxqqhbox {
  overflow: hidden;
}
.czxqqhbox li {
  float: left;
  position: relative;
  padding: 0.3em 1em;
  line-height: 24px;
  cursor: pointer;
  margin-right: 5px;
  background: #043434;
  border: 1px solid #0d7474;
  border-bottom: none;
  border-radius: 0.5em 0.5em 0 0;
  color: #84f1f1;
  font-size: 13px;
}
.dash_content {
  min-height: 480px;
  overflow: hidden;
  border: 1px solid #0d7474;
  box-sizing: border-box;
  padding: 12px 18px;
}
.czxqqhbox li.dqxz {
  background: #035252;
  color: #fff;
}
.dqxz:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px;
  border-color: transparent transparent #009f95;
  position: absolute;
  top: 18px;
  left: 50%;
  margin-left: -7px;
}
.sub3_wrap {
  width: 35vw;
  padding: 10px;
  padding-bottom: 20px;
}
.sub3_input li {
  justify-content: center;
}
.sub3_input li label {
  width: 100%;
}
</style>
