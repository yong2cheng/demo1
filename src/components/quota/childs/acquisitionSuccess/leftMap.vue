<template lang="html">
    <div id="cjcgl_map" style="width:100%; height:240px;padding: 20px 0;"> </div>
</template>

<script>
    export default {
        data: function() {
            return {
                successtable:'',
                }
        },
        props:['datas'],
        watch: {
            datas:{
                    handler(news) {
                    this.initLeftMap();
                    },
                    deep:true
                }
        },
        components:{
        },
        created: function() {
        },
        mounted: function() {
        },
        methods: {
            //首页地图方法加载
            initLeftMap: function() {
                this.successtable = this.datas;
                var cjcgl_map = echarts.init(document.getElementById('cjcgl_map'), 'dark');
                var data =[];
                for(var i = 0; i < this.successtable.length; i++) {
                    if(this.successtable[i].areaName != '国调' && this.successtable[i].areaName != '华中' && this.successtable[i].areaName != '湖北') {

                        data.push({
                            name: this.successtable[i].areaName,
                            value: this.successtable[i].meterSuccessRate,
                        })
                    }
                }

                var option = {
                    backgroundColor: '#043434',
                    tooltip: {
                    trigger: 'item',
                    },
                    dataRange: {
                            x: 'left',
                            y: 'top',
                            textStyle: {color:"#fff"},
                            splitList: [
                                {start: 80, end: 100,color: '#2ff1b9'},
                                {start: 60, end: 80,color: '#33abd3'},
                                {start: 40, end: 60,color: '#efe52e'},
                                {start: 20, end: 40,color: '#d96304'},
                                {end: 20,color: '#d9042b'}
                            ],
                            color: ['#E0022B', '#E09107', '#A3E00B']
                    },
                    series: [{
                        name: "采集成功率(%)",
                        type: 'map',
                        map: '湖北',
                        x:'85',
                        zoom: 1.1,
                        label: {
                            normal: {
                                show: true,//显示省份标签
                                textStyle:{color:"#000"}//省份标签字体颜色
                            },
                            emphasis: {//对应的鼠标悬浮效果
                                show: true,
                                textStyle:{color:"#fff"}
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 1,//区域边框宽度
                                borderColor: '#009fe8',//区域边框颜色
                                areaColor:"#ffdead",//区域颜色
                                },
                            emphasis: {
                                borderWidth: 1,
                                borderColor: '#4b0082',//边框颜色
                                areaColor:"#E0022B",
                            }
                        },
                        data:data
                    }]
                }
                cjcgl_map.setOption(option);
            }
        }
    }
</script>
    
<style lang="css">
</style>
    