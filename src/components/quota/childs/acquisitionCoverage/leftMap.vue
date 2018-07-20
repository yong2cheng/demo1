<template lang="html">
    <div id="cjfgl_map" style="width:100%; height:240px;padding: 20px 0;">  </div>
</template>

<script>
    export default {
        data: function() {
            return {
                covtable:'',
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
                this.covtable = this.datas;
                var cjfgl_map = echarts.init(document.getElementById('cjfgl_map'), 'dark');
                var data =[];
                for(var i = 0; i < this.covtable.length; i++) {
                    if(this.covtable[i].areaName != '国调' && this.covtable[i].areaName != '华中' && this.covtable[i].areaName != '湖北') {
                        data.push({
                            name: this.covtable[i].areaName,
                            value: this.covtable[i].substationCoverage,
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
                        name: "采集覆盖率(%)",
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

                cjfgl_map.setOption(option);
            },
        }
    }
</script>
    
<style lang="css">
</style>
    
    