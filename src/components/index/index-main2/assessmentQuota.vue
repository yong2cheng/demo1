<template lang="html">
    <div class="assessment_quota_box home_page_sbj">
        <h2 class="home_page_title">考核指标</h2>
        <div class="assessment_quota_count home_page_xbj" id="assessment_quota_count">
            
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
            //考核指标雷达
            initRadar() {
                var data1 = [],data2 = []
                for(var i=0;i<this.targetScores.length;i++) {
                    if(this.targetScores[i].indicatorType == 0) {
                        data1.push({
                            name: this.targetScores[i].typeName,
                        })
                        data2.push(this.targetScores[i].score)
                    }
                }
                var assessment_quota = echarts.init(document.getElementById('assessment_quota_count'),'dark');
                var option = {
                    tooltip: {},
                    textStyle: {
                        color: '#fff',
                    },
                    radar: {
                        indicator: data1,
                        center: ['49%', '52%'],
                        radius:60,
                        
                    },
                    series: [{
                        name: '得分',
                        type: 'radar',
                        data : [
                            {
                                value : data2,
                                name : '得分'
                            }
                        ]
                    }]
                };
                assessment_quota.setOption(option);
            }
        }
    }
</script>

<style lang="css">
    .assessment_quota_box {width:100%;position:relative;}
    .assessment_quota_box:before,.assessment_quota_box:after {clip:rect(0 20px 20px 0)}
    .assessment_quota_box:after { clip:rect(0 320px 20px 300px)}
    .assessment_quota_count {width:100%;height: 192px; background:rgba(0,120,120,.4);position: static !important;}
    .assessment_quota_count:before,.assessment_quota_count:after { clip:rect(222px 20px 242px 0)}
    .assessment_quota_count:after { clip:rect(222px 320px 242px 300px)}
    </style>