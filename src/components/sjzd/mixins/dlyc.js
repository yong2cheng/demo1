import geoCoordMap from '@/assets/config/coordinate.js'
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
  created() {},
  mounted: function () {
    this.httpGetData();
  },
  methods: {
    httpGetData() {
      this.$http.get(`/dataDiagnoseService/dataDiagnose/getElecDataExSta`, {
          params: {
            sign: sessionStorage.accessToken,
            date: this.monthDate,
            userId: sessionStorage.userId
          }
        })
        .then((res) => { //首次加载页面数据
          this.elecData = res.data.data.elecDataExStaVOS;
        }).then(() => {
          this.loadLeftMainMap(this.elecData);
          this.loadRightEchart(this.elecData);
        })
    },
    loadLeftMainMap(res) { //加载主页左侧地图数据
      if (res.length >= 0) {
        var data = [];
        var days = [];
        var hours = [];
        var hourser = [];
        var hourst = [];
        var hoursx = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var data4 = [];
        var data5 = [];
        var parentExs = [];
        var parentCount = [];
        var elecData = res;
        for (var i in elecData) {
          data.push({
            'name': elecData[i].systemName,
            'value': elecData[i].exCount
          });
          days.push(elecData[i].systemName);
          var parentEx = elecData[i].parentExs;
          for (var a of parentEx) {
            if (parentExs.indexOf(a.parentExName) == -1) {
              parentExs.push(a.parentExName);
            }
            var sonExes = a.sonExes;
            for (var n in sonExes) {
              if (hourst.indexOf(sonExes[n].exName) == -1) {
                hourst.push(sonExes[n].exName);
              }
            }
          }
        }
        hourser.length = parentExs.length;
        for (var i in parentExs) {
          hourser[i] = [];
        }
        for (var i in elecData) {
          var parentEx = elecData[i].parentExs;
          for (var a of parentEx) {
            var sonExes = a.sonExes;
            for (var n in sonExes) {
              if (sonExes[n].bvId == 6) {
                data1.push([parseInt(i), hourst.indexOf(sonExes[n].exName), sonExes[n].count]);
              }
              if (sonExes[n].bvId == 10) {
                data2.push([parseInt(i), hourst.indexOf(sonExes[n].exName), sonExes[n].count]);
              }
              if (sonExes[n].bvId == 12) {
                data3.push([parseInt(i), hourst.indexOf(sonExes[n].exName), sonExes[n].count]);
              }
              if (sonExes[n].bvId == 14) {
                data4.push([parseInt(i), hourst.indexOf(sonExes[n].exName), sonExes[n].count]);
              }
              if (sonExes[n].bvId == 18) {
                data5.push([parseInt(i), hourst.indexOf(sonExes[n].exName), sonExes[n].count]);
              }
              // console.log(sonExes[n].exName);
              if (hourser[parentExs.indexOf(a.parentExName)].indexOf(sonExes[n].exName) == -1) {
                hourser[parentExs.indexOf(a.parentExName)].push(sonExes[n].exName);
              }
            }
          }
        }
        for (var i in hourser) {
          parentCount.push(hourser[i].length);
          for (var a of hourser[i]) {
            hours.push(a);
          }
        }
        for (var i in hours) {
          hoursx[i] = [];
          for (var a of elecData) {
            var hasex = false,
              ccount = 0;
            for (var b of a.parentExs) {

              for (var c in b.sonExes) {
                if (b.sonExes[c].exName == hours[i]) {
                  ccount += b.sonExes[c].count;
                  hasex = true;
                }
              }
            }
            if (!hasex) {
              hoursx[i].push(0);
            } else {
              hoursx[i].push(ccount);
            }
          }
        }

        var sjzd_data = echarts.init(document.getElementById('dlxf_map'), 'dark');
        // var convertData = function (data) {
        //   var res = [];
        //   for (var i = 0; i < data.length; i++) {
        //     var geoCoord = geoCoordMap[data[i].name];
        //     if (geoCoord) {
        //       res.push({
        //         name: data[i].name,
        //         value: geoCoord.concat(data[i].value)
        //       });
        //     }
        //   }
        //   console.log(data)
        //   return res;
        // };
        // mock数据
        var geoCoordMap = {
            '武汉':[114.298572,30.584355],
            '黄石':[115.077048,30.000000],
            '十堰':[110.787916,32.646907],
            '宜昌':[111.290843,30.702636],
            '襄阳':[112.144146,32.042426],
            '鄂州': [114.890593,30.396536],
            '荆门': [112.604251,31.03542],
            '孝感': [113.726655,30.945423],
            '荆州': [112.23813,30.026857],
            '黄冈': [115.30011,30.590000],
            '咸宁': [114.128963,29.632798],
            '随州': [113.37377,31.717497],
            '恩施': [109.48699,30.283114],
            '潜江': [112.896866,30.421215],
            '神农架': [110.671525,31.744449],
            '天门': [113.165862,30.653061],
            '仙桃': [113.453974,30.364953]
        };
        
        var data = [
            {name: '武汉', value: 99},
            {name: '黄石', value: 89},
            {name: '十堰', value: 82},
            {name: '宜昌', value: 88},
            {name: '襄阳', value: 89},
            {name: '鄂州', value: 80},
            {name: '荆门', value: 96},
            {name: '孝感', value: 82},
            {name: '荆州', value: 90},
            {name: '黄冈', value: 93},
            {name: '咸宁', value: 89},
            {name: '随州', value: 96},
            {name: '恩施', value: 59},
            {name: '潜江', value: 87},
            {name: '神农架', value: 69},
            {name: '天门', value: 87},
            {name: '仙桃', value: 96},
         ];
         var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        var sjzd_option = {
          title: {
            text: '',
            subtext: '',
            sublink: '',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if (typeof (params.value)[2] == "undefined") {
                return params.name + ' : ' + params.value;
              } else {
                return params.name + ' : ' + params.value[2];
              }
            }
          },
          legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['错误'],
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
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#323c48',
                borderColor: '#111'
              },
              emphasis: {
                areaColor: '#2a333d'
              }
            }
          },
          series: [{
              name: '错误',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(data),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#ddb926'
                }
              }
            },
            {
              //name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
              }).slice(0, 6)),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#f4e925',
                  shadowBlur: 10,
                  shadowColor: '#333'
                }
              },
              zlevel: 1
            }
          ]
        };
        sjzd_data.setOption(sjzd_option);
      }
    },
    loadRightEchart(resData) { //加载右侧图表
      var data = [];
      var days = [];
      var hours = [];
      var hourser = [];
      var hourst = [];
      var hoursx = [];
      var data0 = [];
      var data1 = [];
      var data2 = [];
      var data3 = [];
      var data4 = [];
      var parentExs = [];
      var parentCount = [];
      var elecData = resData;
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      for (var i in elecData) {
        data.push({
          'name': elecData[i].systemName,
          'value': elecData[i].exCount
        });
        days.push(elecData[i].systemName);
        var parentEx = elecData[i].parentExs;
        for (var a of parentEx) {
          if (parentExs.indexOf(a.parentExName) == -1) {
            parentExs.push(a.parentExName);
          }
          var sonExes = a.sonExes;
          for (var n in sonExes) {
            if (hourst.indexOf(sonExes[n].exName) == -1) {
              hourst.push(sonExes[n].exName);
            }
          }
        }
      }

      hourser.length = parentExs.length;
      for (var i in parentExs) {
        hourser[i] = [];
      }
      for (var i in elecData) {
        var parentEx = elecData[i].parentExs;
        // console.log(sonExes[n].bvId)
        for (var a of parentEx) {
          var sonExes = a.sonExes;
          for (var n in sonExes) {
            if (sonExes[n].bvId == 4) {
              data0.push([parseInt(i), hourst.indexOf(sonExes[n].exName), sonExes[n].count]);
            }
            if (sonExes[n].bvId == 9) {
              data1.push([parseInt(i), hourst.indexOf(sonExes[n].exName), sonExes[n].count]);
            }
            if (sonExes[n].bvId == 12) {
              data2.push([parseInt(i), hourst.indexOf(sonExes[n].exName), sonExes[n].count]);
            }
            if (sonExes[n].bvId == 14) {
              data3.push([parseInt(i), hourst.indexOf(sonExes[n].exName), sonExes[n].count]);
            }
            if (sonExes[n].bvId == 18) {
              data4.push([parseInt(i), hourst.indexOf(sonExes[n].exName), sonExes[n].count]);
            }
            // console.log(sonExes[n].exName);
            if (hourser[parentExs.indexOf(a.parentExName)].indexOf(sonExes[n].exName) == -1) {
              hourser[parentExs.indexOf(a.parentExName)].push(sonExes[n].exName);
            }
          }
        }
      }
      data0 = data0.map(function (item) {
        return [item[1], item[0], item[2]];
      });
      data1 = data1.map(function (item) {
        return [item[1], item[0], item[2]];
      });
      data2 = data2.map(function (item) {
        return [item[1], item[0], item[2]];
      });
      data3 = data3.map(function (item) {
        return [item[1], item[0], item[2]];
      });
      data4 = data4.map(function (item) {
        return [item[1], item[0], item[2]];
      });
      this.dataArr = [];
      this.dataArr.push(data0)
      this.dataArr.push(data1)
      this.dataArr.push(data2)
      this.dataArr.push(data3)
      this.dataArr.push(data4)
      this.dataArr=[
        [
            [0,0,5],[0,1,3],[0,2,8],[0,3,5],[0,4,1],[0,5,10],[0,6,6],[0,7,8],[0,8,12],
            [1,0,5],[1,1,8],[1,2,2],[1,3,2],[1,4,9],[1,5,5],[1,6,4],[1,7,3],[1,8,6],
            [2,0,5],[2,1,3],[2,2,8],[2,3,5],[2,4,1],[2,5,10],[2,6,3],[2,7,1],[2,8,5],
            [3,0,5],[3,1,8],[3,2,2],[3,3,2],[3,4,9],[3,5,5],[3,6,8],[3,7,2],[3,8,2],
            [4,0,10],[4,1,4],[4,2,9],[4,3,2],[4,4,5],[4,5,8],[4,6,5],[4,7,2],[4,8,4],
            [5,0,3],[9,2,8],[15,5,9],[16,3,6],[8,4,5],[10,5,8],[11,6,5],[12,7,2],[7,8,4],
            ],
            [
                [0,0,2],[0,1,6],[0,2,5],[0,3,5],[0,4,1],[0,5,10],[0,6,6],[0,7,8],[0,8,12],
                [1,0,5],[1,1,2],[1,2,2],[1,3,5],[1,4,3],[1,5,5],[1,6,4],[1,7,3],[1,8,6],
                [2,0,5],[2,1,6],[2,2,2],[2,3,6],[2,4,4],[2,5,10],[2,6,3],[2,7,1],[2,8,5],
                [3,0,5],[3,1,3],[3,2,2],[3,3,2],[3,4,6],[3,5,5],[3,6,8],[3,7,2],[3,8,2],
                [4,0,4],[4,1,4],[4,2,9],[4,3,2],[4,4,5],[4,5,8],[4,6,5],[4,7,2],[4,8,4],
                [5,0,3],[10,2,8],[12,5,9],[11,3,6],[6,4,5],[7,5,8],[9,6,5],[13,7,2],[7,8,4],
                ],
                [
                    [0,0,2],[0,1,6],[0,2,5],[0,3,5],[0,4,1],[0,5,10],[0,6,6],[0,7,8],[0,8,5],
                    [1,0,5],[1,1,8],[1,2,2],[1,3,4],[1,4,4],[1,5,5],[1,6,4],[1,7,3],[1,8,6],
                    [2,0,5],[2,1,3],[2,2,4],[2,3,6],[2,4,2],[2,5,4],[2,6,3],[2,7,1],[2,8,5],
                    [3,0,5],[3,1,8],[3,2,2],[3,3,2],[3,4,4],[3,5,5],[3,6,8],[3,7,2],[3,8,2],
                    [4,0,4],[4,1,4],[4,2,9],[4,3,2],[4,4,5],[4,5,2],[4,6,5],[4,7,2],[4,8,4],
                    [5,0,3],[10,2,8],[12,5,9],[11,3,6],[6,4,5],[7,5,8],[9,6,5],[13,7,2],[7,8,4],
                    ],
      ]
      console.log(this.dataArr)
      for (var i in hourser) {
        parentCount.push(hourser[i].length);
        for (var a of hourser[i]) {
          hours.push(a);
        }
      }
      for (var i in hours) {
        hoursx[i] = [];
        for (var a of elecData) {
          var hasex = false,
            ccount = 0;
          for (var b of a.parentExs) {

            for (var c in b.sonExes) {
              if (b.sonExes[c].exName == hours[i]) {
                ccount += b.sonExes[c].count;
                hasex = true;
              }
            }
          }
          if (!hasex) {
            hoursx[i].push(0);
          } else {
            hoursx[i].push(ccount);
          }
        }
      }

      this.hourst = hourst;
      this.days = days;
      this.hours = hours;
      this.hourser = hourser;
      this.parentExs = parentExs;
      this.days = ['神农架','恩施','随州','十堰','咸宁','鄂州','黄冈','荆门','孝感','襄阳','宜昌','黄石','荆州', '武汉', '湖北', '华中', '国调'];//
      this.hourst = ['空值', '负值', '巨大数', '接线异常', '倍率异常', '点号异常', '缺表位', 'EMS匹配', '营销匹配' ];
      this.loadMapTabEchart(this.unKvTextArr[0], this.unKvTextArr[0], this.dataArr[0], this.hourst,  this.days);
    },
    loadMapTabEchart(legend_data, series_name, series_data, hourst, days) {
      var dlyc_option = {
        title: {
          text: '',
          link: '',
        },
        legend: {
          // data: ['750kV异常分布'],
          data: [legend_data],
          left: 'right',
        },
        tooltip: {
          position: 'top',
          formatter: function (params) {
            return days[params.value[1]] + '-' + hourst[params.value[0]] + '：' + params.value[2];
          }
        },
        grid: {
          top: 30,
          left: 10,
          bottom: 10,
          right: 30,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: hourst,
          boundaryGap: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#84f1f1',
              type: 'dashed',
            }

          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          boundaryGap: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#aaa',
              type: 'solid',
            },
            axisLine: {
              show: false,
              textBaseline: 'middle'
            }
          },
          inverse: true
        },

        series: [{
          // name: '750kV异常分布',
          name: series_name,
          type: 'scatter',
          symbolSize: function (val) {
            return val[2] * 3;
          },
          singleAxisIndex: 5,
          data: series_data, //要修改的变量数据
          // data: [[0,0,1]],   //要修改的变量数据
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                var colorList = [
                  '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                  '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                  '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
                  '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                  '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                  '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'

                ];
                return colorList[params.dataIndex]
              }
            }
          },
          animationDelay: function (idx) {
            return idx * 5;
          }
        }]
      };
      var dlyc_echart = echarts.init(document.getElementById('dlxf_right'), 'dark');
      dlyc_echart.setOption(dlyc_option);
    },
    pickTabRander(i) { //选择显示多少千伏的图表
      this.isCutkV = i;
      this.loadMapTabEchart(this.unKvTextArr[i], this.unKvTextArr[i], this.dataArr[i], this.hourst, this.days)
    }
  },
}
export default mixins;
