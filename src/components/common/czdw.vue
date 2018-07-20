<template>
    <div class="czdw" @click="isFocus=false;">
        <span>单位 : </span>
                <select v-model="tareaId" name="" id="">
                    <option :key="index" v-for="(item,index) in diquNames" :value="item.areaId">{{item.areaName}}</option>
                </select>
                <span>电压等级 : </span>
                <select v-model="tbvid" class="bvidList" >
                    <option value="-1">请选择</option>
                    <option class="txt" :key="index" v-for="(bv,index) in bvIdArr" :value="bv.bvId" >{{bv.dydj}}kV</option>
                </select>
                <span> 厂站名称：</span>
                <div style="position:relative;display:inline-block;">
                <input v-model="substationName" @click.stop="scroll()" placeholder="厂站定位" type="text" class="txt">
                
                  <div v-show="isFocus" style="position:absolute;background:#012323;height:200px;width:172px;border-radius:5px;overflow:hidden;z-index:100;" class="subStationScroll">
                      <ul>
                          <li :title="item.pathName" style="white-space:nowrap;" @click="isFocus=false;substationStId=item.mrid;substationName=item.pathName;searchData(true)" :key="index" v-for="(item,index) in substations">
                              {{item.pathName}}
                          </li>
                      </ul>
                  </div>
                </div>
    </div>
</template>
<script>
import $areaId from "@/assets/config/areaMap";
import $bvid from "@/assets/config/bvidMap";
import BScroll from "better-scroll";
import Bus from "@/assets/eventBus.js";
export default {
  data: function() {
    return {
      token:sessionStorage.getItem("accessToken"),
      tareaId: "",
      diquNames: [],
      tbvid: -1,
      bvIdArr: [],
      substationName: "",
      isFocus: false,
      substations: [],
    };
  },
  mounted() {
    if (
      sessionStorage.getItem("systemId") === null ||
      sessionStorage.getItem("systemId") == "undefined"
    ) {
      this.diquNames.push({ areaId: "", areaName: "请选择", mrId: "" });
      this.diquNames = this.diquNames.concat($areaId);
      this.tareaId = "";
    } else {
      for (var a of $areaId) {
        if (a.areaId == sessionStorage.getItem("systemId")) {
          this.diquNames = [a];
          this.tareaId = a.areaId;
        }
      }
    }
  },
  methods: {
      scroll() {
      this.isFocus = true;
      if (!this.hasScroll) {
        this.$nextTick(() => {
          let scroll3 = new BScroll(".subStationScroll", {
            scrollbar: { fade: false, interactive: true },
            preventDefault:false,
            mouseWheel: true
          });
        });

        this.hasScroll = true;
      }
    },
    getBvId(systemId) {
      if (systemId === "") {
        return;
      }
      this.$http
        .get(
          "/treeService/tree/getAllBaseVoltageTreeNodeBySystemId?sign=" +
            this.token +
            "&systemId=" +
            systemId
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$notify.error({
              title: "错误",
              message: "系统错误（code==0）"
            });
            return;
          }
          var data = res.data.data.allSubStations;
          this.bvIdArr = [];
          for (var a of data) {
            for (var b of $bvid) {
              if (a.id == b.bvId) {
                this.bvIdArr.push(b);
              }
            }
          }
        });
    },
    getSubstation(areaId) {
      console.log(areaId);
      var systemId;
      if (areaId === "") {
        systemId = "";
      } else {
        for (var a of $areaId) {
          if (areaId == a.areaId) {
            systemId = "&controlId=" + a.mrId;
          }
        }
      }
      if (this.tbvid == -1) {
        var tbvid = "";
      } else {
        var tbvid = "&bvId=" + this.tbvid;
      }
      console.log(systemId);
      this.$http
        .get(
          "/quotaService/quota/getSubstation?appkey=3917230828&sign=" +
            this.token +
            systemId +
            tbvid +
            "&keyword=" +
            this.substationName
        )
        .then(res => {
          console.log(res);
          var data = res.data.data.substations;
          this.substations = data;
          this.substationsAll = data;
        });
    }
  },
  watch: {
    tareaId: function() {
      this.getBvId(this.tareaId);
      this.getSubstation(this.tareaId);
    },
    tbvid:function(){
        this.getSubstation(this.tareaId);
    },
    substationName: function() {
        this.getSubstation(this.tareaId);
        this.substations = [];
        for (var a of this.substationsAll) {
          if (a.pathName.indexOf(this.substationName) != -1) {
            this.substations.push(a);
          }
        }
    }
  }
};
</script>
<style>
.czdw{
    color:#84f1f1;
    font-size:14px;
}
.czdw .areaList,
.czdw .bvidList {
  background-color: #012323;
  color: inherit;
  width: auto;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #0d7474;
  color: #84f1f1;
  margin-right: 20px;
  padding-right: 20px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: #022626 url(../../assets/img/icon_select.gif) no-repeat
    right center;
}
.czdw .subStationScroll li {
  cursor: pointer;
  height: 30px;
  padding-left: 5px;
}
.czdw .subStationScroll li:hover {
  color: white;
}
</style>
