<template>
<div>
    <ul class="xx_but">
                    <li :class="{nowlis:bvId==6}" @click="bvId=6">500kV</li>
                    <li :class="{nowlis:bvId==10}" @click="bvId=10">220kV</li>
                    <li :class="{nowlis:bvId==12}" @click="bvId=12">110kV</li>
                    <li :class="{nowlis:bvId==14}" @click="bvId=14">35kV</li>
                </ul>
    <div class="hsdtbox" id="hsmap"><!--耗损地图--></div>
     <!-- loading框 --> 
     <div v-if="isLoading" class="loadbox">
                <div class="tkzz"></div>
                <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                </div>
            </div>
            <overlay owidth="300px" oheight="300px" :close.sync="close">
                <div>
                    <div class="t_title">详情</div>
                    <table class="table">
                        <tr>
                            <td>线端名称</td>
                            <td>所属线段</td>
                            <td>EMS对应设备</td>
                        </tr>
                    </table>
                    <div class="scroll">
                        <table class="table">
                            <tr>

                            </tr>
                        </table>
                    </div>
                </div>
            </overlay>
</div>
    
</template>
<script>
import overlay from "@/components/common/overlay";
import Bus from "@/assets/eventBus.js";
export default {
  data: function() {
    return {
      token: sessionStorage.getItem("accessToken"),
      userId: sessionStorage.getItem("userId"),
      bvId: 6,
      isLoading: false,
      linksData: [],
      close:false
    };
  },
  components:{
      overlay
  },
  methods: {
    getSubstationOverview() {
      this.isLoading = true;
      this.$http
        .get(
          "/analysisService/analy/getSubstationOverview?sign=" +
            this.token +
            "&userId=" +
            this.userId +
            "&bvId=" +
            this.bvId
        )
        .then(res => {
          if (res.data.code == 1) {
            this.hzMap(this.bvId, res.data.data);
            this.isLoading = false;
          }
        });
    },
    hzMap(bvId, data_mapsj) {
      var linksData;
      var dotData;
      var bvIdd;
      bvIdd = bvId;
      dotData = [];
      var userId = sessionStorage.getItem("userId");
      //console.log(data_mapsj);
      if (data_mapsj) {
        for (var dd of data_mapsj.substationOverviewVOS) {
          if (
            !(
              dd.sbtLongitude == undefined ||
              dd.sbtLatitude == undefined ||
              dd.sbtName == undefined ||
              dd.sbtId == undefined
            )
          ) {
            dotData.push({
              name: dd.sbtName,
              value: [dd.sbtLongitude, dd.sbtLatitude],
              mrid: dd.sbtId
            });
          }
        }

        linksData = [];
        for (var pp of data_mapsj.acLineSegmentVOS) {
          for (var dot of dotData) {
            if (dot.mrid == pp.startSubstationId) {
              var name1 = dot.name;
              var geo1 = dot.value;
            }
            if (dot.mrid == pp.endSubstationId) {
              var name2 = dot.name;
              var geo2 = dot.value;
            }
          }
          if (
            !(
              name1 == undefined ||
              name2 == undefined ||
              geo1 == undefined ||
              geo2 == undefined ||
              pp.pathName==undefined||
              pp.aclineId == undefined ||
              pp.mrid == undefined
            )
          ) {
            linksData.push([
              {
                name: pp.pathName,
                aclineId: pp.aclineId,
                mrid: pp.mrid,
                name1: name1,
                geo1: geo1,
                name2: name2,
                geo2: geo2,
                startSubstationId: pp.startSubstationId,
                endSubstationId: pp.endSubstationId,
                color: "#58B3CC"
              }
            ]);
          }
        }
        this.linksData = linksData;
      }else{
          linksData=this.linksData;
      }

      // linksData=[[{'name':'江编','name1':'江夏变电站','geo1':[114.15914,30.345314],'name2':'编钟变电站','geo2':[113.29025,31.787601],'color':'#58B3CC'}],
      //     [{'name':'江凤','name1':'江夏变电站','geo1':[114.15914,30.345314],'name2':'凤凰山变电站','geo2':[114.45945,30.395544],'color':'#58B3CC'}],
      //     [{'name':'江钢','name1':'江夏变电站','geo1':[114.15914,30.345314],'name2':'钢都变电站','geo2':[114.438835,30.579884],'color':'#58B3CC'}]];
      //console.log('map');
      // echarts.registerMap('hubei', hubeiJson);//hubeiJson名称取自hubei.js里的var  hubeiJson变量名

      var chart = echarts.init(document.getElementById("hsmap"), "dark");
      chart.clear();

      var allData = {
        citys: [
          {
            name: "武汉",
            value: [114.298572, 30.584355]
          },
          {
            name: "黄石",
            value: [115.077048, 30.0]
          },
          {
            name: "十堰",
            value: [110.787916, 32.646907]
          },
          {
            name: "宜昌",
            value: [111.290843, 30.702636]
          },
          {
            name: "襄阳",
            value: [112.144146, 32.042426]
          },
          {
            name: "鄂州",
            value: [114.890593, 30.396536]
          },
          {
            name: "荆门",
            value: [112.604251, 31.03542]
          },
          {
            name: "孝感",
            value: [113.726655, 30.945423]
          },
          {
            name: "荆州",
            value: [112.23813, 30.026857]
          },
          {
            name: "黄冈",
            value: [115.30011, 30.59]
          },
          {
            name: "咸宁",
            value: [114.128963, 29.632798]
          },
          {
            name: "随州",
            value: [113.37377, 31.717497]
          },
          {
            name: "恩施",
            value: [109.48699, 30.283114]
          },
          {
            name: "潜江",
            value: [112.896866, 30.421215]
          },
          {
            name: "神农架",
            value: [110.671525, 31.744449]
          },
          {
            name: "天门",
            value: [113.165862, 30.653061]
          },
          {
            name: "仙桃",
            value: [113.453974, 30.364953]
          }
        ],

        moveLines: [
          {
            fromName: "武汉",
            toName: "黄石",
            coords: [[114.298572, 30.584355], [115.077048, 30.0]]
          },
          {
            fromName: "襄阳",
            toName: "十堰",
            coords: [[112.144146, 32.042426], [110.787916, 32.646907]]
          },
          {
            fromName: "宜昌",
            toName: "荆州",
            coords: [[111.290843, 30.702636], [112.23813, 30.026857]]
          },
          {
            fromName: "荆州",
            toName: "荆门",
            coords: [[112.23813, 30.026857], [112.604251, 31.03542]]
          }
        ]
      };
      var option = {
        //backgroundColor: '#404a59',
        /* title: {
                     text: '设备线损',
                     left: 'center',
                     textStyle: {
                         color: '#fff'
                     }
                 },
                 */
        /*legend: {
                    show: false,
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'right',
                    data: ['地点', '线路'],
                    textStyle: {
                        color: '#fff'
                    }
                },*/
        tooltip: {
          trigger: "item"
        },
        // toolbox: {
        //     show: true,
        //     feature: {
        //         magicType: {show: true, type: ['stack', 'tiled']},
        //         saveAsImage: {show: true}
        //     }
        // },
        geo: {
          map: "湖北",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#ee917f",
              borderColor: "#fff"
            },
            emphasis: {
              areaColor: "rgba(0,0,0,0)" // #2a333d
            }
          }
        },

        series: [
          {
            name: "地点",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 0,
            rippleEffect: {
              brushType: "stroke",
              period: 7, //扩散圆速度
              scale: 0 //扩散圆大小
            },
            label: {
              normal: {
                //坐标地文字显示
                show: true,
                textStyle: { color: "#000" }, //标签字体颜色
                position: "right",
                formatter: "{b}"
              }
              /* emphasis: {
                                 show: true,
                                 position: 'right',
                                 formatter: '{b}'
                             }*/
            },
            symbolSize: 1, //坐标位置点大小

            showEffectOn: "render",
            itemStyle: {
              //坐标位置颜色
              normal: {
                color: "#fff"
              }
            },
            data: allData.citys
          },
          {
            name: "站点",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 1,
            symbol: "image://../images/factory/Fac2_Vol5.gif",
            /*rippleEffect: {
                            brushType: 'stroke',
                            period:7,//扩散圆速度
                            scale:4//扩散圆大小
                        },*/
            label: {
              normal: {
                //坐标地文字显示
                show: false,
                textStyle: { color: "#000" }, //标签字体颜色
                position: "right",
                formatter: "{b}"
              }
              /* emphasis: {
                                 show: true,
                                 position: 'right',
                                 formatter: '{b}'
                             }*/
            },
            symbolSize: 10, //坐标位置点大小

            showEffectOn: "render",
            itemStyle: {
              //坐标位置颜色
              normal: {
                color: "#fff"
              }
            },
            data: dotData
          }
        ]
      };
      if (bvId == 6) {
        option.geo.itemStyle.emphasis.areaColor = "#ee917f";
      }
      //console.log('linksData', linksData);
      if (linksData.length > 0) {
        linksData.forEach(function(item, i) {
          option.series.push({
            name: item[0].name,
            type: "lines",
            zlevel: 2,
            polarIndex: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: "#fff",
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                color: item[0].color,
                width: 0.5,
                curveness: 0.2
              }
            },
            data: item.map(function(item) {
              return {
                fromName: item.name1,
                toName: item.name2,
                coords: [item.geo1, item.geo2]
              };
            })
          });
        });
      } else {
        chart.clear();
      }

      //console.log('option', option);
      chart.setOption(option);

      // chart.on('click', function (params) {
      //     //console.log(params);
      //     if (params.componentSubType == "lines") {
      //         $('.xldatabox tbody tr:first-child td:first-child').html(params.seriesName);
      //         // $('.xldatabox tbody').html(`
      //         //     <tr>
      //         //         <td>${params.seriesName}</td>
      //         //
      //         //     </tr>
      //         // `);
      //         $(".xldatabox").css({ "display": "block" })
      //     }

      // });
      // $('.hidexldatabox').on('click', function () {
      //     $(".xldatabox").css({ "display": "none" })
      // });
    },
    // getAclineLossList(){
    //     this.$http.get("analysisService/analy/getAclineLossList?sign="+this.token)
    // }
  },
  mounted() {
    this.getSubstationOverview();
    Bus.$on("TstartSbsName", target => {
      for (var a of this.linksData) {
        if (
          a[0].name1.indexOf(target)!=-1 ||
          a[0].name2.indexOf(target)!=-1
        ) {
          a[0].color = "red";
        }else{
            a[0].color="#58B3CC";
        }
      }
      this.hzMap(this.bvId);
    });
    Bus.$on("TaclineName", target => {
      for (var a of this.linksData) {
        if (
          a[0].name.indexOf(target)!=-1 
        ) {
          a[0].color = "red";
        }else{
            a[0].color="#58B3CC";
        }
      }
      this.hzMap(this.bvId);
    });
  },
  watch:{
    bvId:function(){
      this.getSubstationOverview();
    }
  }
};
</script>
<style>
#hsmap {
  height: 590px;
  width: 100%;
}
</style>
