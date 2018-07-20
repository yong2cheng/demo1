<template>
  <ul>
  <li :key="index" v-for="(child,index) in children">
    <tree-folder v-if="child.attribute!='sbtId'" :timeUnit="timeUnit" :date="date" :folder="child"/>
    <span class="treeStation" @click="getSubstationEnergy(child.id,child.grandpa,child.name,child.bvId)" :class="{checked:id==child.id,
    tree_c9:child.parentId==1,
    tree_c8:child.parentId==4,
    tree_c7:child.parentId==6,
    tree_c6:child.parentId==9,
    tree_c5:child.parentId==10,
    tree_c4:child.parentId==12,
    tree_c3:child.parentId==14,
    tree_c2:child.parentId==18}" v-else>{{ child.name }}</span>
  </li>
</ul>
</template>
<script>
import treeFolder from "@/components/tree/treeFolder";
import treeLoad from "@/components/tree/treeLoad";
import Bus from "../../assets/eventBus.js";
import $areaId from "../../assets/config/areaMap";
import $bvId from "../../assets/config/bvidMap";
export default {
  props: ["children", "date", "timeUnit"],
  data: function() {
    return {
      id: "",
      mrid: ""
    };
  },
  mounted: function() {
    // if(child.attribute=='sbtId'){
    //   console.log(this.children);
    // this.mrid=this.children[0].id;
    // }
    Bus.$on("TstId", target => {
      this.id = target;
    });
  },
  components: {
    treeFolder
  },
  methods: {
    getFixed(num, dian) {
      if (dian == null || dian == undefined || dian === "") {
        return "";
      } else {
        return dian.toFixed(num);
      }
    },
    getSubstationEnergy(id, parentId, name, bvId) {
      if (this.date) {
        console.log(this.getFixed(2, 0));
        Bus.$emit("isLoading", true);
        Bus.$emit("TstId", id);
        var smonth = new Date(this.dayDate).getMonth() + 1;
        var syear = new Date(this.dayDate).getFullYear();
        var nmonth = new Date().getMonth() + 1;
        var nyear = new Date().getFullYear();
        // var query;
        // if (nmonth >= 10) {
        //   if (smonth < 10) {
        //     query = "getSubstationEnergyHistory";
        //   } else {
        //     query = "getSubstationEnergy";
        //   }
        // } else if (nmonth >= 7) {
        //   if (smonth < 7) {
        //     query = "getSubstationEnergyHistory";
        //   } else {
        //     query = "getSubstationEnergy";
        //   }
        // } else if (nmonth >= 4) {
        //   if (smonth < 4) {
        //     query = "getSubstationEnergyHistory";
        //   } else {
        //     query = "getSubstationEnergy";
        //   }
        // } else {
        //   query = "getSubstationEnergy";
        // }
        // if (syear < nyear) {
        //   query = "getSubstationEnergyHistory";
        // }
        this.$http
          .get(
            "/dataInteractiveService/interaction/getSubstationEnergy?appkey=3917230828&sign=" +
              sessionStorage.getItem("accessToken") +
              "&day=" +
              this.date +
              "&stId=" +
              id +
              "&timeUnit=" +
              this.timeUnit
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              Bus.$emit("isLoading", false);
              // this.$notify.error({
              //   title: "错误",
              //   message: "系统错误（code==0）"
              // });
              return;
            }
            Bus.$emit("isLoading", false);
            var data = res.data.data.substationEnergys;
            var arr = [];
            if (data.length) {
              for (var b of data) {
                for (var i in b) {
                  var a = b[i];
                  if (i == b.length - 1) {
                    var balance = this.getFixed(4, a.balance);
                    var balanceRatio = this.getFixed(4, a.balanceRatio);

                    var startTariffInputValue = this.getFixed(
                      4,
                      a.startTariffInputValue
                    );
                    var startTariffOutputValue = this.getFixed(
                      4,
                      a.startTariffOutputValue
                    );
                    var endTariffInputValue = this.getFixed(
                      4,
                      a.endTariffInputValue
                    );
                    var endTariffOutputValue = this.getFixed(
                      4,
                      a.endTariffOutputValue
                    );

                    var inboundData1 = this.getFixed(2, a.inboundData1);
                    var inboundData2 = this.getFixed(2, a.inboundData2);
                    var inboundData3 = this.getFixed(2, a.inboundData3);
                    var inboundData4 = this.getFixed(2, a.inboundData4);
                    var outboundData1 = this.getFixed(2, a.outboundData1);
                    var outboundData2 = this.getFixed(2, a.outboundData2);
                    var outboundData3 = this.getFixed(2, a.outboundData3);
                    var outboundData4 = this.getFixed(2, a.outboundData4);
                    if (a.day == null || a.day == "") {
                      if (a.isBalance) {
                        arr.push([
                          {
                            name: a.equipmentName,
                            equipmentId: a.equipmentId,
                            vlId: a.vlId,
                            isBalance: a.isBalance==0,
                            numone: 1,
                            numtwo: 1,
                            heji: i == b.length - 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "不平衡",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: balance,
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "不平衡率(%)",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: balanceRatio,
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: outboundData1,
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: inboundData1,
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          },
                          {
                            name: "",
                            numone: 1,
                            numtwo: 1
                          }
                        ]);
                      }else{
                         arr.push([
                          {
                            name: a.equipmentName,
                            equipmentId: a.equipmentId,
                            vlId: a.vlId,
                            bvId:a.bvId,
                            isBalance: a.isBalance==0,
                            numone: 15,
                            numtwo: 1,
                            heji: i == b.length - 1
                          }
                         ])
                      }
                    } else {
                      arr.push([
                        {
                          name: a.equipmentName,
                          equipmentId: a.equipmentId,
                          numone: 1,
                          numtwo: 1,
                          isBalance: a.isBalance == 0
                        },
                        {
                          name: a.meterMrid,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: a.ratio,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: startTariffInputValue,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: startTariffOutputValue,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: endTariffInputValue,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: endTariffOutputValue,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: inboundData1,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: outboundData1,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: inboundData2,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: outboundData2,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: inboundData3,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: outboundData3,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: inboundData4,
                          numone: 1,
                          numtwo: 1
                        },
                        {
                          name: outboundData4,
                          numone: 1,
                          numtwo: 1
                        }
                      ]);
                    }
                  } else {
                    var startTariffInputValue = this.getFixed(
                      4,
                      a.startTariffInputValue
                    );
                    var startTariffOutputValue = this.getFixed(
                      4,
                      a.startTariffOutputValue
                    );
                    var endTariffInputValue = this.getFixed(
                      4,
                      a.endTariffInputValue
                    );
                    var endTariffOutputValue = this.getFixed(
                      4,
                      a.endTariffOutputValue
                    );

                    var inboundData1 = this.getFixed(2, a.inboundData1);
                    var inboundData2 = this.getFixed(2, a.inboundData2);
                    var inboundData3 = this.getFixed(2, a.inboundData3);
                    var inboundData4 = this.getFixed(2, a.inboundData4);
                    var outboundData1 = this.getFixed(2, a.outboundData1);
                    var outboundData2 = this.getFixed(2, a.outboundData2);
                    var outboundData3 = this.getFixed(2, a.outboundData3);
                    var outboundData4 = this.getFixed(2, a.outboundData4);
                    arr.push([
                      {
                        name: a.equipmentName,
                        equipmentId: a.equipmentId,
                        numone: 1,
                        numtwo: 1,
                        heji: i == b.length - 1,
                        isBalance: a.isBalance == 0
                      },
                      {
                        name: a.meterMrid,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: a.ratio,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: startTariffInputValue,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: startTariffOutputValue,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: endTariffInputValue,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: endTariffOutputValue,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: inboundData1,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: outboundData1,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: inboundData2,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: outboundData2,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: inboundData3,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: outboundData3,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: inboundData4,
                        numone: 1,
                        numtwo: 1
                      },
                      {
                        name: outboundData4,
                        numone: 1,
                        numtwo: 1
                      }
                    ]);
                  }
                }
              }
            } else {
              arr = [
                [
                  {
                    name: "暂无数据",
                    numone: 14
                  }
                ]
              ];
            }
            Bus.$emit("Ttbodys", arr);
            Bus.$emit("TfactoryStation", name);
            for (var a of $areaId) {
              if (a.areaId == parentId) {
                Bus.$emit("Tarea", a.areaName);
              }
            }
            for (var a of $bvId) {
              if (a.bvId == bvId) {
                Bus.$emit("Tacname", a.dydj);
              }
            }
          })
          .catch(error => {
            Bus.$emit("isLoading", false);
            // this.$notify.error({
            //   title: "错误",
            //   message: "系统错误（error）"
            // });
          });
        this.$http
          .get(
            "/analysisService/analy/getSubstationSVG?appkey=3917230828&sign=" +
              sessionStorage.getItem("accessToken") +
              "&stId=" +
              id
          )
          .then(res => {
            Bus.$emit("TsvgHtml", res.data);
          })
          // .catch(function(error) {
          //   this.$notify.error({
          //     title: "错误",
          //     message: "系统错误（error）"
          //   });
          // });
      } else {
        Bus.$emit("TstId", id);
        Bus.$emit("tName", name);
      }
    }
  }
};
</script>
<style>
#treeDatas span {
  cursor: pointer;
  color: #84f1f1;
  display: inline-block;
  font-size: 13px;
  padding: 5px;
}
#treeDatas span:hover {
  color: #fff;
  background-color: #044747;
}
#treeDatas > ul ul {
  margin-left: 10px;
}
#treeDatas > ul ul ul {
  margin-left: 23px;
}
.checked {
  color: #fff;
  background-color: #044747;
}
.treeStation:before {
  content: "";
  display: inline-block;
  width: 18px;
  height: 16px;
  vertical-align: bottom;
  background: url("../../assets/img/factory/Fac2_Vol1.gif") no-repeat;
}
.tree_c9:before {
  background: url("../../assets/img/factory/Fac3_Vol9.gif") no-repeat !important;
}
.tree_c8:before {
  background: url("../../assets/img/factory/Fac3_Vol8.gif") no-repeat !important;
}
.tree_c7:before {
  background: url("../../assets/img/factory/Fac3_Vol7.gif") no-repeat !important;
}
.tree_c6:before {
  background: url("../../assets/img/factory/Fac3_Vol6.gif") no-repeat !important;
}
.tree_c5:before {
  background: url("../../assets/img/factory/Fac3_Vol5.gif") no-repeat !important;
}
.tree_c4:before {
  background: url("../../assets/img/factory/Fac3_Vol4.gif") no-repeat !important;
}
.tree_c3:before {
  background: url("../../assets/img/factory/Fac3_Vol3.gif") no-repeat !important;
}
.tree_c2:before {
  background: url("../../assets/img/factory/Fac3_Vol2.gif") no-repeat !important;
}
</style>
