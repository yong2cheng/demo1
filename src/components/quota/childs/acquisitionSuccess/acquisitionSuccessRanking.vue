<template lang="html">
    <div id="cjfgpm" class="cover_pm"></div>
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
                    this.successRanking();
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
            // 采集成功率排名
            successRanking: function() {
                this.successtable= this.datas;
                var cjfg_pm = echarts.init(document.getElementById('cjfgpm'),'dark');
                var data1 =[],data2=[],data3=[];
                for(var i = 0; i < this.successtable.length; i++) {
                    // if(this.successtable[i].areaName != '国调' && this.successtable[i].areaName != '华中' && this.successtable[i].areaName != '湖北') {
                        data1.push(this.successtable[i].areaName);
                        data2.push(this.successtable[i].substationSuccessRate);
                        data3.push(this.successtable[i].meterSuccessRate);
                    // }
                }
                data2 = this.dataProcessing(data2)
                data3 = this.dataProcessing(data3)
                
                var option = {
                    backgroundColor: '#043434',
                    title : {
                        text: '采集成功率排名',
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
                            name:'厂站采集成功率',
                            type:'bar',
                            data:data2
                        },
                        {
                            name:'电表采集成功率',
                            type:'bar',
                            data:data3
                        }
                    ]
                };

                // 指定的配置项和数据显示图表。
                cjfg_pm.setOption(option);
            },

            // 截取小数
            dataProcessing: function(data) {
                var datas = [];
                if(typeof data == "object") {
                    for(var i=0;i<data.length;i++) {
                        var substationCoverage = data[i];
                        substationCoverage = substationCoverage.toString();
                        substationCoverage = substationCoverage==100?100:substationCoverage.substring(0,substationCoverage.indexOf(".") + 3);
                        substationCoverage = Number(substationCoverage);
                        datas.push(substationCoverage)
                    }
                    return datas;
                }
            }
        }
    }
</script>
        
<style lang="css">
</style>
    