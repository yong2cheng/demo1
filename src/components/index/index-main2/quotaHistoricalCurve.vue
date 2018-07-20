<template lang="html">
    <div class="quota_historicalCurve_box">
        <h2 class="home_page_title">指标历史曲线</h2>
        <div class="quota_historicalCurve_count" id="quota_historicalCurve">
            
        </div>
    </div>
</template>
        
<script>
    export default {
        data: function() {
            return {
                token:'',
                dayDate:'',
                listTargetScoreVO:''
            }
        },
        components:{
            
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
            this.dayDate = this.$day().format('YYYY-MM');
            this.getAssessScoreYear()
        },
        mounted: function() {
        },
        methods: {
            // 获取该年的指标得分
            getAssessScoreYear() {
                this.$http.get("/quotaService/quota/getAssessScoreYear",{
                    params:{
                        sign:this.token,
					    month:this.dayDate
                    }
                }).then(res => {
                    if (res.data.code == 1) {
                        this.listTargetScoreVO = res.data.data.listTargetScoreVO
                        if(this.listTargetScoreVO&&this.listTargetScoreVO.length>0) {
                            this.historicalCurve()
                        }
                    } 
                });
            },
            historicalCurve() {
                var date = [],collectData = [],nameData = [],data = []
                for(var i=0;i<this.listTargetScoreVO.length;i++) {
                    if(this.listTargetScoreVO[i].date.substr(5,1) == 0) {
                        date.push(this.listTargetScoreVO[i].date.substr(6,1)+'月')
                    } else {
                        date.push(this.listTargetScoreVO[i].date.substr(5,2)+'月')
                    }
                    for(var j=0;j<this.listTargetScoreVO[i].targetScores.length;j++) {
                        if(this.listTargetScoreVO[i].targetScores[j].indicatorType == 0) {
                            nameData.push(this.listTargetScoreVO[i].targetScores[j].typeName)
                            collectData.push({
                                name:this.listTargetScoreVO[i].targetScores[j].typeName,
                                value:this.listTargetScoreVO[i].targetScores[j].score == 0?0:this.listTargetScoreVO[i].targetScores[j].score.toFixed(2)
                            })
                        }
                    }
                }
                nameData =  [...new Set(nameData)];

                for(var n=0;n<nameData.length;n++) {
                    var data1 = []
                    for(var m=0;m<collectData.length;m++) {
                        if(collectData[m].name == nameData[n]) {
                            data1.push(collectData[m].value)
                        }
                    }
                    data.push({
                        name:nameData[n],
                        type:'line',
                        data:data1
                    })
                }
                // 指标历史曲线
                var quota_historicalCurve = echarts.init(document.getElementById('quota_historicalCurve'),'dark');
                var option = {
                    color: ['#ffd285', '#ff733f', '#ec4863'],
                    tooltip: {
                        trigger: "axis",//item
                        // formatter: "{a} <br/>{b}月 : {c}"
                    },
                    legend: {
                        top: '2%',
                        textStyle: {
                            color: '#ffd285',
                        },
                    },
                    grid: {
                            top:'16%',
                            left: '3%',
                            right: '8%',
                            bottom: '5%',
                            containLabel: true
                        },
                    xAxis: [
                        {
                            type: "category",
                            // name: "月",
                            splitLine: {show: true},//false
                            data: date
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            name: "值"
                        }
                    ],
                        toolbox: {
                        show: true,
                        y:'4',
                        feature: {
                            mark: {
                                show: true
                            },
                            dataView: {
                                show: true,
                                readOnly: true
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    calculable: true,
                    series: data
                 };
                quota_historicalCurve.setOption(option);
            }
        }
    }
</script>

<style lang="css">
    .quota_historicalCurve_box {float: left;width: calc(100% - 800px);box-sizing: border-box;padding: 0 30px;position: relative;}
    .quota_historicalCurve_count {width:100%;height: 250px; background:rgba(0,120,120,.4);}
    @media (max-width:1399px){
        .quota_historicalCurve_box { width:calc(100% - 700px);;}
    }
</style>