<template lang="html">
    <div class="run_quota_box home_page_sbj">
        <h2 class="home_page_title">运行指标</h2>
        <div class="run_quota_count home_page_xbj" id="run_quota">
            
        </div>
    </div>
</template>
        
<script>
    export default {
        data: function() {
            return {
                targetScores:'',
            }
        },
        components:{
            
        },
        props:['data'],
        watch: {
            data:{
                handler(news) {
                    this.targetScores = news
                    this.initRadar()
                },
                deep:true
                }
        },
        created: function() {
        },
        mounted: function() {
        },
        methods: {
            //运行指标雷达
            initRadar() {
                var data1 = [],data2 = []
                for(var i=0;i<this.targetScores.length;i++) {
                    if(this.targetScores[i].indicatorType == 1) {
                        data1.push({
                            name: this.targetScores[i].typeName,
                        })
                        data2.push(this.targetScores[i].score)
                    }
                }
                var run_quota = echarts.init(document.getElementById('run_quota'),'dark');
                var option = {
                    background:"rgba(0,120,120,.4)",
                    tooltip: {},
                    title: {
                        show : false,
                        text: '运行指标雷达'
                    },
    
                    textStyle: {
                        color: '#fff',
                    },
                    radar: {
                        // shape: 'circle',
                        indicator: data1,
                        // center: ['49%', '54%'],
                        radius:50,
                        
                    },
                    series: [{
                        name: '',
                        type: 'radar',
                    
                        data : [
                            {
                                value : data2,
                                name : '得分'
                            }
                        ]
                    }]
                }
                run_quota.setOption(option);
            }
        }
    }
</script>

<style lang="css">
    .run_quota_box {width:100%;  margin:35px 0 0 0;position:relative;}
    .run_quota_box:before,.run_quota_box:after {clip:rect(0 20px 20px 0)}
    .run_quota_box:after { clip:rect(0 320px 20px 300px)}
    .run_quota_count {width:100%;height: 192px; background:rgba(0,120,120,.4);position: static !important;}
    .run_quota_count:before,.run_quota_count:after { clip:rect(222px 20px 242px 0)}
    .run_quota_count:after { clip:rect(222px 320px 242px 300px)}
</style>