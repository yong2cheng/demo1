<template lang="html">
    <div id="home_page_map" style="width: 100%;height: 100%;"></div>
</template>

<script>
    export default {
        data: function() {
            return {
                areaRankingData:''
            }
        },
        props:['data'],
        watch: {
            data:{
                handler(news) {
                    this.areaRankingData = news
                    this.initMap();
                },
                deep:true
                }
        },
        components:{
        },
        created: function() {
        },
        mounted: function() {
            this.initMap();
        },
        methods: {
            //首页地图方法加载
            initMap: function() {
                var data = []
                for(var item of this.areaRankingData) {
                     data.push({
                         name:item.name,
                         value:item.score
                     })
                }
                var home_page_map = echarts.init(document.getElementById('home_page_map'), 'dark');
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
                    '仙桃': [113.453974,30.364953],
                }
                var max = 100, min = 1; // todo 
                var maxSize4Pin = 100, minSize4Pin = 20;
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

                var option = {
                    backgroundColor:"",
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                        if(typeof(params.value)[2] == "undefined"){
                            return params.name + ' : ' + params.value;
                        }else{
                            return params.name + ' : ' + params.value[2];
                        }
                        }
                    },
                    visualMap: {
                        show: false,
                        min: 1,
                        max: 100,
                        left: 'right',
                        top: 'top',
                        text: ['高', '低'], // 文本，默认为数值文本
                        calculable: true,
                        seriesIndex: [1],
                        inRange: {
                            color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                        }
                    },
                    geo: {
                        show: true,
                        map: '湖北',
                        zoom: 0.9,
                        // x:'450',
                        y:'30',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#3B5077',
                            },
                            emphasis: {
                                areaColor: '#2B91B7',
                            }
                        }
                    },
                    series : [
                        {
                            name: '',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: convertData(data),
                            symbolSize: function (val) {
                                return val[2] / 5;
                            },
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#05C3F9'
                                }
                            }
                        },
                        {
                            type: 'map',
                            map: '湖北',
                            geoIndex: 0,
                            aspectScale: 0.5, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: '#031525',
                                    borderColor: '#3B5077',
                                },
                                emphasis: {
                                    areaColor: '#2B91B7'
                                }
                            },
                            animation: false,
                            data: data
                        },
                        {
                            name: '点',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            symbol: 'pin',
                            symbolSize: function (val) {
                                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                                var b = minSize4Pin - a*min;
                                b = maxSize4Pin - a*max;
                                return a*val[2]+b;
                            },
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 15,
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#F62157', //标志颜色
                                }
                            },
                            zlevel: 8,
                            // data: convertData(data),
                        },
                        {
                            name: 'Top 5',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(data.sort(function (a, b) {
                                return b.value - a.value;
                            }).slice(0, 5)),
                            symbolSize: function (val) {
                                return val[2] / 5;
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
                                    color: '#05C3F9',
                                    shadowBlur: 10,
                                    shadowColor: '#05C3F9'
                                }
                            },
                            zlevel: 1
                        },
                    ]
                };
                home_page_map.setOption(option);

            },
        }
    }
</script>
    
<style lang="css">
</style>
        
        