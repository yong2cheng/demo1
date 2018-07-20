var mixins = {
    methods:{
        chart() {
            var chart = echarts.init(document.getElementById('xs_chart'), 'dark');

            var allData = {
                "citys": [{
                    "name": "武汉",
                    "value": [114.298572, 30.584355]
                }, {
                    "name": "黄石",
                    "value": [115.077048, 30.000000]
                }, {
                    "name": "十堰",
                    "value": [110.787916, 32.646907]
                }, {
                    "name": "宜昌",
                    "value": [111.290843, 30.702636]
                }, {
                    "name": "襄阳",
                    "value": [112.144146, 32.042426]
                }, {
                    "name": "鄂州",
                    "value": [114.890593, 30.396536]
                }, {
                    "name": "荆门",
                    "value": [112.604251, 31.03542]
                }, {
                    "name": "孝感",
                    "value": [113.726655, 30.945423]
                }, {
                    "name": "荆州",
                    "value": [112.23813, 30.026857]
                }, {
                    "name": "黄冈",
                    "value": [115.30011, 30.590000]
                }, {
                    "name": "咸宁",
                    "value": [114.128963, 29.632798]
                }, {
                    "name": "随州",
                    "value": [113.37377, 31.717497]
                }, {
                    "name": "恩施",
                    "value": [109.48699, 30.283114]
                }, {
                    "name": "潜江",
                    "value": [112.896866, 30.421215]
                }, {
                    "name": "神农架",
                    "value": [110.671525, 31.744449]
                }, {
                    "name": "天门",
                    "value": [113.165862, 30.653061]
                }, {
                    "name": "仙桃",
                    "value": [113.453974, 30.364953]
                }],

                "moveLines": [{
                    "fromName": "武汉",
                    "toName": "黄石",
                    "coords": [
                        [114.298572, 30.584355],
                        [115.077048, 30.000000]
                    ]
                }, {
                    "fromName": "襄阳",
                    "toName": "十堰",
                    "coords": [
                        [112.144146, 32.042426],
                        [110.787916, 32.646907]
                    ]
                }, {
                    "fromName": "宜昌",
                    "toName": "荆州",
                    "coords": [
                        [111.290843, 30.702636],
                        [112.23813, 30.026857]
                    ]
                }, {
                    "fromName": "荆州",
                    "toName": "荆门",
                    "coords": [
                        [112.23813, 30.026857],
                        [112.604251, 31.03542]
                    ]
                }

                ]
            };

           var option = {
                legend: {
                    show: false,
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'right',
                    data: ['地点', '线路'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                geo: {
                    map: '湖北',
                    label: {
                        emphasis: {
                            show: false,//
                            position: 'right'
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {//地图颜色
                            areaColor: '#ee917f',//区域颜色
                            borderColor: '#fff'//边框颜色
                        },
                        emphasis: {
                            areaColor: '#f39886'//悬停颜色
                        }
                    }
                },
                series: [{
                    name: '地点',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke',
                        period: 7,//扩散圆速度
                        scale: 4//扩散圆大小
                    },
                    label: {
                        normal: {//坐标地文字显示
                            show: true,
                            textStyle: { color: "#000" },//标签字体颜色
                            position: 'right',
                            formatter: '{b}'
                        },
                    },
                    symbolSize: 10,//坐标位置点大小

                    showEffectOn: 'render',
                    itemStyle: {//坐标位置颜色
                        normal: {
                            color: '#fff'
                        }
                    },
                    data: allData.citys
                }, {
                    name: '线路',
                    type: 'lines',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    large: true,
                    effect: {
                        show: true,
                        constantSpeed: 20,//速度
                        symbol: 'arrow',//pin线路指向的点类型
                        symbolSize: 10,//流动点的大小
                        trailLength: 0,
                    },
                    lineStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#58B3CC'
                            }, {
                                offset: 1,
                                color: '#fff'
                            }], false),
                            width: 1.5,
                            opacity: 0.8,//线路透明度
                            curveness: 0.1//线条弧度
                        }
                    },
                    data: allData.moveLines
                }]
            };
            chart.setOption(option);
        }
    },
    mounted() {
        this.chart();
    }
}
export default mixins;