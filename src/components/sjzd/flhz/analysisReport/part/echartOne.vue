<template lang="html">
    <div class="fxsd_box" id="zbfldb">
          <!--指标分类对比雷达-->
          @appear-cancelled=""
    </div>
</template>
<script>
export default{
    data() {
    return {
    //   unusualData: [], //电量数据
    //   errCountData: [], //错误个数数据
    //   dataMX: [], //母平错误集合
    //   dataFX: [], //分线错误集合
    //   dataSJ: [], //分压错误集合
    }
  },
  mounted() {
    this.chart()
  },
  methods: {
    chart(res) { //异常分布图
      var zbfldb_data = echarts.init(document.getElementById('zbfldb'), 'dark');
     var zbfldb_option = {
            backgroundColor: 'rgba(3,82,82,.2)',
            title: {
            text: '指标分类对比',
            top: '5px',
            left: '3px'
            },
            tooltip: {},
            legend: {
            data: ['上月', '本月'],
            top: '5px'
            },
            radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
                }
            },
            indicator: [{
                name: '指标1',
                max: 30
                },
                {
                name: '指标2',
                max: 30
                },
                {
                name: '指标3',
                max: 30
                },
                {
                name: '指标4',
                max: 30
                },
                {
                name: '指标5',
                max: 30
                },
            ],
            center: ['49%', '60%'],
            //radius: 80,
            },
            series: [{
            name: '上月 vs 本月',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [{
                value: [28, 26, 28, 29, 26],
                name: '上月'
                },
                {
                value: [26, 29, 27, 29, 29],
                name: '本月'
                }
            ]
            }]
        };
      zbfldb_data.setOption(zbfldb_option);
    }
  }
    
}
</script>


