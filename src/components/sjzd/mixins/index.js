import geoCoordMap from '@/assets/config/coordinate.js'
// <!-- 我的代码 -->
var mixins = {
  data() {
    return {
      elecData: [], //电量数据
      dlyc_option: [],
      dataArr: [],
      dlyc_echart: null,
      hours: [],
      hourst: [],
      days: [],
      hourser: [],
      parentExs: [],
    }
  },
  created() {
    console.log(geoCoordMap)
  },
  mounted: function () {},
  methods: {
    mapRender() {
      this.loading = true;
      this.$http.get(`/dataDiagnoseService/dataDiagnose/getSubsystemException?appkey=3917230828&sign=${this.token}&date=${this.monthDate}`)
        .then((res) => { //数据处理
          if (res.data.code === 1) {
            this.loading = false;
            this.getSubSysData = res.data.data.subsysExcVOS;
            this.datas = this.getSubSysData;
            this.areaNameTab = res.data.data.subsysExcVOS;
            if (this.areaNameTab.length) {
              this.areaNameTab.forEach((v, i) => {
                if (v.exceptionCounts.length) {
                  v.exceptionCounts.forEach((vl, ix) => {
                    if (this.errExceName.indexOf(vl.exceName) == -1) {
                      this.errExceName.push(vl.exceName);
                    }
                  })
                }
              })
            }
            if (this.errExceName.length) {
              this.errExceName.forEach((v, i) => {
                this.errExceNameCountList[i] = [];
                this.errExceNameCountList[i][0] = [];
                this.errExceNameCountList[i][0].push(this.errExceName[i]);
                // this.errExceNameCountList[i][0][0] = (this.errExceName[i]);
                // this.errExceNameCountList[i][0][1]= '';
              })
            }
            if (this.areaNameTab.length) {
              this.areaNameTab.forEach((v, i) => {
                if (v.exceptionCounts.length) {
                  v.exceptionCounts.forEach((vl, ix) => {
                    if (this.errExceNameCountList.length) {
                      this.errExceNameCountList.forEach((vlu, idx) => {
                        if (vl.exceName == vlu[0]) {
                          vlu[i + 1] = [];
                          vlu[i + 1][0] = vl.exceCount;
                          vlu[i + 1][1] = v.areaName;
                        }
                      })
                    }
                  })
                }
              })
            }
            if (this.areaNameTab.length) {
              if (this.errExceNameCountList.length) {
                var len = this.errExceNameCountList.length;
                this.errExceNameCountList[len] = [];
              }
              this.areaNameTab.forEach((v, i) => {
                this.errExceNameCountList.forEach((vl, ix) => {
                  if (!vl[i + 1]) {
                    vl[i + 1] = '';
                  }
                })
                this.errExceNameCountList[len][0] = [];
                this.errExceNameCountList[len][0][0] = '异常发生率';
                this.errExceNameCountList[len][i + 1] = [];
                this.errExceNameCountList[len][i + 1][0] = v.exceRatio;
              })
            }
            this.loadMainMap(res);
          }else{
            this.loading=false;
            this.$notify({
                title: "提示",
                message: "发生未知错误！",
                duration: 1500,
                type: "error"
              });
          }
        })
    },
    convertData(getData) {
      var res = [];
      if (getData) {
        for (var i = 0; i < getData.length; i++) {
          var geoCoord = geoCoordMap[getData[i].name];
          if (geoCoord) {
            res.push({
              name: getData[i].name,
              value: geoCoord.concat(getData[i].value)
            });
          }
        }
      }
      return res;
    },
    loadMainMap(res) { //地图
      var datas = []
      let MainPageMapOption = { //主页地图option数据
        backgroundColor: '#323c48',
        title: {
          text: '异常汇总分布图',
          x: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (params.value[2]) {
              return params.name + ' : ' + params.value[2];
            }
          }
        },
        visualMap: {
          min: 0,
          // max: 2000,
          max: 300,
          //calculable: true,
          splitNumber: 5,
          inRange: {
            color: ['#FFEC8B', '#FF8C69', '#d94e5d']
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: '湖北',
          label: {
            emphasis: {
              show: false
            }
          },
          center: [112.604251, 31.03542],
          zoom: 1.0,
          itemStyle: {
            normal: {
              areaColor: 'silver',
              borderColor: '#000'
            },
            emphasis: {
              areaColor: '#B8B8B8'
            }
          }
        },
        series: [{
          name: 'erro',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          // data: this.convertData(datas),
          symbolSize: function (val) {
            return val[2] / 100;
          },
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          rippleEffect: {
            brushType: 'stroke',
            period: 3, //扩散圆速度
            scale: 2 //扩散圆大小
          },
          showEffectOn: 'render',
          itemStyle: {
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        }, {
          type: 'map',
          map: 'china',
          zlevel: -1,
          zoom: 8.3,
          center: [112.604251, 31.03542],
          itemStyle: { // 定义样式
            normal: { // 普通状态下的样式
              areaColor: '#323c48',
              borderColor: '#000'
            },
            emphasis: { // 高亮状态下的样式
              areaColor: '#323c48'
            }
          },
          data: [{
            name: '湖北',
            selected: true
          }]
        }]
      };
      let sjzd_data = echarts.init(document.getElementById('dbl_map'), 'dark');
      sjzd_data.setOption(MainPageMapOption);
      if (this.getSubSysData.length > 0) {
        let data = [];
        var maxDate = [100];
        var erroData = res.data.data.subsysExcVOS;
        var errLen = erroData.length;
        //数据处理
        for (var i = 0; i < errLen; i++) {
          var val = 0;
          for (var k = 0; k < erroData[i].exceptionCounts.length; k++) {
            val += erroData[i].exceptionCounts[k].exceCount;
          }
          maxDate.push(val);
          data.push({
            name: erroData[i].areaName,
            value: val
          })
          var maxs = Math.max.apply(null, maxDate) % 100 == 0 ? Math.max.apply(null, maxDate) % 100 : (100 - Math.max.apply(null, maxDate) % 100) + Math.max.apply(null, maxDate); //防止出现小数
        }
        sjzd_data.setOption({
          visualMap: {
            max: parseInt(maxs),
          },
          series: [{
            name: 'erro',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.convertData(data),
          }]
        })
      }
    },
    loadMainTab(data) { //加载主页弹框图表
      let html = "";
      let arrdiqu = [];
      let arrdiqucuowu = [];
      let arrcuowu = [];
      let series = [];
      let max = 0;
      let cwhtml = "";
      let sysid = "";
      let yichang = [];
      for (var vv of data) {
        for (var cuowu of vv.exceptionCounts) {
          if (arrcuowu.indexOf(cuowu.exceName) == -1) {
            arrcuowu.push(cuowu.exceName);
          }
        }
      }
      for (var hdiqu of data) {
        arrdiqu.push(hdiqu.areaName);
        yichang.push(hdiqu.exceRatio);
      }
      for (var i in arrcuowu) {
        arrdiqucuowu[i] = [];
        for (var j of data) {
          var ishas = false;
          for (var q of j.exceptionCounts) {
            if (q.exceName == arrcuowu[i]) {
              arrdiqucuowu[i].push([
                q.exceCount,
                q.exceCount,
                q.exceCount,
                q.exceCount
              ]);
              ishas = true;
              max = max < q.exceCount ? q.exceCount : max;
            }
          }
          if (!ishas) {
            arrdiqucuowu[i].push(["-", "-", "-", "-"]);
          }
        }
      }
      for (var yichangshuju of yichang) {
        var a = yichangshuju == undefined ? "-" : yichangshuju.toFixed(4);
      }
      for (var arrcont of arrdiqucuowu) {
        for (var i in arrcont) {
          arrcont[i].unshift(arrdiqu[i]);
        }
      }
      var color = [];

      function randcolor() {
        return (
          Math.ceil(Math.random() * 255 - 1) +
          "," +
          Math.ceil(Math.random() * 255 - 1) +
          "," +
          Math.ceil(Math.random() * 255 - 1)
        );
      }
      for (var a of arrcuowu) {
        color.push(`rgb(${randcolor()})`);
      }
      let MainBoxTabOption = { //主页分布图表option数据
        color: ["#dd4444", "#fec42c", "#80F1BE"],
        legend: {
          y: "top",
          data: arrcuowu,
          textStyle: {
            color: "#fff",
            fontSize: 16
          }
        },
        grid: {
          x: "10%",
          x2: 150,
          y: "18%",
          y2: "10%"
        },
        tooltip: {
          padding: 10,
          backgroundColor: "#222",
          borderColor: "#777",
          borderWidth: 1,
          formatter: function (obj) {
            var value = obj.value;
            return (
              '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
              "错误类型：" +
              obj.seriesName +
              "</div>" +
              "地区: " +
              value[0] +
              "<br>" +
              "数量" +
              value[1] +
              "<br>"
            );
          }
        },
        xAxis: {
          type: "category",
          name: "地区",
          boundaryGap: true,
          nameTextStyle: {
            color: "#fff",
            fontSize: 12
          },
          data: arrdiqu,
          splitLine: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#eee"
            }
          },
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          type: "value",
          name: "数量",
          nameLocation: "end",
          nameGap: 20,
          nameTextStyle: {
            color: "#fff",
            fontSize: 16
          },
          axisLine: {
            lineStyle: {
              color: "#eee"
            }
          },
          splitLine: {
            show: false
          }
        },
        visualMap: [{
          left: "right",
          top: "10%",
          dimension: 2,
          min: 0,
          max: max + 1,
          itemWidth: 30,
          itemHeight: 120,
          calculable: true,
          precision: 0.1,
          text: ["圆大小：数量"],
          textGap: 30,
          textStyle: {
            color: "#fff"
          },
          inRange: {
            symbolSize: [10, 70]
          },
          outOfRange: {
            symbolSize: [10, 70],
            color: ["rgba(255,255,255,.2)"]
          },
          controller: {
            inRange: {
              color: ["#c23531"]
            },
            outOfRange: {
              color: ["#444"]
            }
          }
        }],
        series: series
      };
      let myChart = echarts.init(document.getElementById("fbsd_data"));

      var itemStyle = {
        normal: {
          opacity: 0.8,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      };
      for (var i in arrdiqucuowu) {
        MainBoxTabOption.series.push({
          name: arrcuowu[i],
          type: "scatter",
          itemStyle: itemStyle,
          data: arrdiqucuowu[i],
          stillShowZeroSum: false
        });
      }
      // myChart.setOption(this.MainBoxTabOption);
      myChart.setOption(MainBoxTabOption);
    },
    pickTabRander(i) { //选择显示多少千伏的图表
      this.loadMapTabEchart(this.unKvTextArr[i], this.unKvTextArr[i], this.dataArr[i], this.hourst, this.days)
    }
  },

}
export default mixins;
