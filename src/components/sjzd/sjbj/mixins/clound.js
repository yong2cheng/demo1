var mixins = {
  mounted() {
    this.cloudFun()
  },
  methods: {
    cloudFun: function () {
      var dbpgqx_data = echarts.init(
        document.getElementById("cloudWrap"),
        "dark"
      );
      var option = {
        title: {
        //   text: '词云展示',
        //   x: 'left',
          textStyle: {
            fontSize: 23,
            color: 'rgba(255, 255, 255, 0.8)'
          }

        },
        backgroundColor: '',
        tooltip: {
          show: true
        },
        series: [{
          name: '错误类型',
          type: 'wordCloud',
          size: ['10%', '199%'],
          sizeRange: [14, 80],//最小文字——最大文字
          // textRotation: [0, 45, 90, -45],
          // rotationRange: [-45, 90],//旋转角度区间
          // rotationStep: 90,//旋转角度间隔
          width: '100%',
          height: '100%',
          shape: 'pentagon',
          // left:'0%',
          bottom:'5%',
          gridSize: 22,//字符间距
          textPadding: 120,
          drawOutOfBound:true,
          autoSize: {
            enable: true,
            minSize: 6
          },
          textStyle: {
            normal: {
              color: function () {
                return 'rgb(' + [
                  Math.round(Math.random() * 105) + 150,
                  Math.round(Math.random() * 105) + 150,
                  Math.round(Math.random() * 105) + 150
                ].join(',') + ')';
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: []
        }]
      };
      var JosnList = [{
        name: "蔡甸变",
        value: '666'
      }, {
        name: "绕阻",
        value: '520'
      }, {
        name: "武汉",
        value: "999"
      }, {
        name: "AC220kV",
        value: "888"
      }, {
        name: "220kv及以上母平",
        value: "777"
      }, {
        name: "换表事件",
        value: "688"
      }, {
        name: "换CT/PT事件",
        value: "588"
      }, {
        name: "倍率错误",
        value: "516"
      }, {
        name: "电量数据缺失",
        value: "515"
      }, {
        name: "电量数据缺失",
        value: "483"
      }, {
        name: "主电表接线错误",
        value: "462"
      }, {
        name: "底码",
        value: "449"
      }, {
        name: "数据异常",
        value: "429"
      },{
        name: "AC220kV",
        value: "888"
      }, {
        name: "220kv及以上母平",
        value: "777"
      }, {
        name: "换表事件",
        value: "688"
      }, {
        name: "换CT/PT事件",
        value: "588"
      }, {
        name: "倍率错误",
        value: "516"
      }, {
        name: "电量数据缺失",
        value: "515"
      },{
        name: "底码",
        value: "449"
      }, {
        name: "数据异常",
        value: "429"
      },{
        name: "AC220kV",
        value: "888"
      }, {
        name: "220kv及以上母平",
        value: "777"
      }, {
        name: "换表事件",
        value: "688"
      }, ];

      option.series[0].data = JosnList;

      dbpgqx_data.setOption(option);
      return dbpgqx_data;
    },
  }
}
export default mixins;
