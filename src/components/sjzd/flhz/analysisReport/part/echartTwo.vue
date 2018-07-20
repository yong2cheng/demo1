<template lang="html">
    <div class="fxbg_sd" id="ycsd_data" style="display:block">
          <!--异常分类散点图-->b
    </div>
    
</template>
<script>
export default{
    data() {
    return {
      unusualData: [], //电量数据
      errCountData: [], //错误个数数据
      days : ['母平指标', '分线指标', '分压指标', '分区指标', '台区指标'],
      hours : ['模型缺失', '模型一致性', '数据缺失', '数据异常', '配置错误', '不平衡', ],
      ecdata : [
          [0, 0, 5],
    [0, 1, 3],
    [0, 2, 8],
    [0, 3, 5],
    [0, 4, 1],
    [0, 5, 10],
    [1, 0, 5],
    [1, 1, 8],
    [1, 2, 2],
    [1, 3, 2],
    [1, 4, 9],
    [1, 5, 5],
    [2, 0, 5],
    [2, 1, 3],
    [2, 2, 8],
    [2, 3, 5],
    [2, 4, 1],
    [2, 5, 10],
    [3, 0, 5],
    [3, 1, 8],
    [3, 2, 2],
    [3, 3, 2],
    [3, 4, 9],
    [3, 5, 5],
    [4, 0, 10],
    [4, 1, 4],
    [4, 2, 9],
    [4, 3, 2],
    [4, 4, 5],
    [4, 5, 8],
      ]
    }
  },
  mounted() {
    this.chart()
  },
  methods: {
    chart(res) { //异常分布图
      var ycsd_data_data = echarts.init(document.getElementById('ycsd_data'), 'dark');
        this.ecdata = this.ecdata.map(function(item) {
            return [item[1], item[0], item[2]];
        });
        var ycsd_data_option = {
            title: {
                text: '',
                link: '',

                },
                legend: {
                data: ['异常分类'],
                left: 'right',

                },
                tooltip: {
                position: 'top',
                formatter: function(params) {
                    return this.days[params.value[1]] + '-' + this.hours[params.value[0]] + '：' + params.value[2];
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
                data: this.hours,
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
                data: this.days,
                boundaryGap: true,
                splitLine: {
                    show: true,
                    lineStyle: {
                    color: '#aaa',
                    type: 'solid',
                    },
                    axisLine: {
                    show: false,
                    textBaseline: 'middle',
                    }
                }

                },


                series: [{
                name: '异常分类',
                type: 'scatter',
                symbolSize: function(val) {
                    return val[2] * 3;
                },
                singleAxisIndex: 5,

                data: this.ecdata,
                itemStyle: {
                    normal: {
                    color: function(params) {
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
                animationDelay: function(idx) {
                    return idx * 5;
                }
                }]
      };
      ycsd_data_data.setOption(ycsd_data_option);
    }
  }
    
}
</script>

