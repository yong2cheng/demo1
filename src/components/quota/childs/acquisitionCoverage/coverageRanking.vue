<template lang="html">
        <div id="cjfgpm" class="cover_pm"></div>
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
                    this.coverageRanking();
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
            // 采集覆盖率排名
            coverageRanking: function() {
                this.covtable= this.datas;
                var cjfg_pm = echarts.init(document.getElementById('cjfgpm'),'dark');
                var data1 =[],data2=[],data3=[];
                for(var i = 0; i < this.covtable.length; i++) {
                    // if(this.covtable[i].areaName != '国调' && this.covtable[i].areaName != '华中' && this.covtable[i].areaName != '湖北') {
                        data1.push(this.covtable[i].areaName);
                        data2.push(this.covtable[i].emsSubstationCount);
                        data3.push(this.covtable[i].acquiredSubstationCount);
                    // }
                }
            
                var option = {
                    backgroundColor: '#043434',
                    title : {
                        text: '采集覆盖率排名',
                        textStyle:{color:"#84f1f1",fontSize:"16"},
                        x:"5",
                        y:'3'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    toolbox: {
                            right: '5%',
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    yAxis : [
                        {
                            type : 'value',
                            boundaryGap : [0, 0.01]
                        }
                    ],
                    xAxis : [
                        {
                            type : 'category',
                            data : data1,
                            axisLabel:{
                                interval:0,//横轴信息全部显示
                                // rotate:30,//30度角倾斜显示
                            }
                        }
                    ],
                    series : [
                        {
                            name:'厂站数',
                            type:'bar',
                            data:data2
                        },
                        {
                            name:'已覆盖数',
                            type:'bar',
                            data:data3
                        }
                    ]
                };
                
                // 指定的配置项和数据显示图表。
                cjfg_pm.setOption(option);
            },
        }
    }
</script>
        
<style lang="css">
</style>

        