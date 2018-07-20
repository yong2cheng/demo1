var mixins = {
  //<!-- 我的代码 -->
  data() {
    return {
      unusualData: [], //电量数据
      errCountData: [], //错误个数数据
      dataMX: [], //母平错误集合
      dataFX: [], //分线错误集合
      dataSJ: [], //分压错误集合
    }
  },
  mounted() {
    console.log(this.unusualData)
    this.chart()
  },
  methods: {
    chart(res) { //异常分布图
      var day_error_data = echarts.init(document.getElementById('day_error'), 'dark');
      var schema = [{
          name: 'date',
          index: 0,
          text: '日'
        },
        {
          name: 'AQIindex',
          index: 1,
          text: '异常发生频度'
        }
      ];
      var itemStyle = {
        normal: {
          opacity: 0.8,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      };
      var day_error_option = {
        backgroundColor: 'rgb(5, 59, 59)',
        color: [
          '#dd4444', '#fec42c', '#80F1BE'
        ],
        legend: {
          y: 'top',
          data: ['母平', '分线', '分压'],
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        grid: {
          x: '5%',
          x2: 150,
          y: '18%',
          y2: '10%'
        },
        tooltip: {
          padding: 10,
          backgroundColor: '#222',
          borderColor: '#777',
          borderWidth: 1,
          formatter: function (obj) {
            var value = obj.value;
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
              value[0] + '日：' + obj.seriesName + ' ' +
              '</div>' +
              schema[1].text + '：' + value[1] + '<br>'

          }
        },
        xAxis: {
          type: 'value',
          name: '日期',
          nameGap: 16,
          nameTextStyle: {
            color: '#fff',
            fontSize: 14
          },
          max: 31,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '异常发生频度',
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            color: '#fff',
            fontSize: 16
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          splitLine: {
            show: false
          }
        },
        visualMap: [{
            left: 'right',
            top: '3%',
            dimension: 1,
            min: 0,
            max: 300,
            itemWidth: 30,
            itemHeight: 80,
            calculable: true,
            precision: 0.1,
            text: ['圆形大小：二级'],
            textGap: 20,
            textStyle: {
              color: '#fff'
            },
            inRange: {
              symbolSize: [10, 70]
            },
            outOfRange: {
              symbolSize: [10, 70],
              color: ['rgba(255,255,255,.2)']
            },
            controller: {
              inRange: {
                color: ['#c23531']
              },
              outOfRange: {
                color: ['#444']
              }
            }
          },
          {
            left: 'right',
            top: '51%',
            dimension: 1,
            min: 0,
            max: 200,
            itemHeight: 80,
            calculable: true,
            precision: 0.1,
            text: ['颜色明暗：三级'],
            textGap: 20,
            textStyle: {
              color: '#fff'
            },
            inRange: {
              colorLightness: [1, 0.5]
            },
            outOfRange: {
              color: ['rgba(255,255,255,.2)']
            },
            controller: {
              inRange: {
                color: ['#c23531']
              },
              outOfRange: {
                color: ['#444']
              }
            }
          }

        ],
        series: [{
            name: '母平',
            type: 'scatter',
            itemStyle: itemStyle,
            data: this.dataMX
          },
          {
            name: '分线',
            type: 'scatter',
            itemStyle: itemStyle,
            data: this.dataSJ
          },
          {
            name: '分压',
            type: 'scatter',
            itemStyle: itemStyle,
            data: this.dataFX
          }
        ]
      };
      day_error_data.setOption(day_error_option);
    },
  }
}
export default mixins;
