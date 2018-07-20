<template lang="html">
    <div class="score_box home_page_sbj">
        <div class="score_box_count home_page_xbj">
            <h2 class="score_box_count_title">系统得分<strong>{{conutScore}}</strong></h2>
            <div class="score_box_count_star"><span :style="{width: percentDate}"></span></div>
            <div class="score_box_quota score_box_count_syzb clearfix" @click="quotaDetail(0)"><span>考核指标</span><strong>{{assessConutScore}}</strong></div>
            <div class="score_box_quota score_box_count_yxzb clearfix" @click="quotaDetail(1)"><span>运行指标</span><strong>{{operationConutScore}}</strong></div>
        </div>
        <!-- 点击数字弹框获取电表详情 -->
        <overlay :close.sync="isShow">
            <div class="overlay_tc_sy clearfix"> 
                <div class="score_tc_left" id="score_tc_left">

                </div>
                <div class="score_tc_right">
                    <div style="margin-bottom: 20px">
                        <h2 class="home_page_title" style="text-align: left;padding-left: 5px;box-sizing: border-box">考核指标</h2>
                        <div>
                            <div style="position:relative;overflow:hidden;height: 195px;">
                                <table class="table">
                                    <tbody>
                                        <tr v-for="(item,indexd) in assessmentRate">
                                            <td>{{item.name}}</td>
                                            <td>{{item.value}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 class="home_page_title" style="text-align: left;padding-left: 5px;box-sizing: border-box">运行指标</h2>
                        <div>
                            <div style="position:relative;overflow:hidden;height: 195px;">
                                <table class="table">
                                    <tbody>
                                        <tr v-for="(item,indexd) in runRate">
                                            <td>{{item.name}}</td>
                                            <td>{{item.value}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </overlay>
    </div>
</template>
        
<script>
    import overlay from '@/components/common/overlay'
    export default {
        data: function() {
            return {
                isShow:false,
                token:'',
                dayDate:'',
                assessConutScore:'',
                operationConutScore:'',
                conutScore:'',
                percentDate:'',
                rateAll:{},
                assessmentRate:[],
                runRate:[]
            }
        },
        components:{
            overlay
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
            this.dayDate = this.$day().format('YYYY-MM');
            this.getTotalPoints()
            this.getIndexProportion()
        },
        mounted: function() {
        },
        methods: {
            // 系统得分
            getTotalPoints() {
                this.$http.get("/quotaService/quota/getTotalPoints",{
                    params:{
                        sign:this.token,
					    month:this.dayDate
                    }
                }).then(res => {
                    if (res.data.code == 1) {
                        var conutScore = res.data.data.getTotalPoints.conutScore
                        var assessConutScore = res.data.data.getTotalPoints.assessConutScore
                        var operationConutScore = res.data.data.getTotalPoints.operationConutScore
                        this.conutScore = conutScore == 0 || conutScore == 100?conutScore:conutScore.toFixed(2)
                        this.assessConutScore = assessConutScore == 0 || assessConutScore == 100?assessConutScore:assessConutScore.toFixed(2)
                        this.operationConutScore = operationConutScore == 0 || operationConutScore == 100?operationConutScore:operationConutScore.toFixed(2)
                        this.percentDate = (this.conutScore/5*100)+'%'
                    } 
                });
            },
            // 指标占比
            getIndexProportion() {
                this.$http.get("/quotaService/quota/getIndexProportion",{
                    params:{
                        sign:this.token,
					    // month:this.dayDate
                    }
                }).then(res => {
                    if (res.data.code == 1) {
                        var getIndexProportion = res.data.data.getIndexProportion
                        var data1 = [],data2 = []
                        if(getIndexProportion&&getIndexProportion.length>0) {
                            for(var i=0;i<getIndexProportion.length;i++) {
                                data1.push({name:getIndexProportion[i].typeName})
                                data2.push(getIndexProportion[i].rate)
                                this.rateAll.data1 = data1
                                this.rateAll.data2 = data2 
                                if(getIndexProportion[i].indicatorType == 0) {
                                    this.assessmentRate.push({
                                        name:getIndexProportion[i].typeName,
                                        value:getIndexProportion[i].rate+"%",
                                    })
                                } else if(getIndexProportion[i].indicatorType == 1) {
                                    this.runRate.push({
                                        name:getIndexProportion[i].typeName,
                                        value:getIndexProportion[i].rate+"%",
                                    })
                                }
                            }
                        }
                        console.log(this.rateAll)
                        console.log(this.assessmentRate)
                        console.log(this.runRate)
                    } 
                });
            },
            quotaDetail(type) {
                this.isShow=true
                this.initRadar()
            },
            // 
            initRadar() {
                var score_tc_left = echarts.init(document.getElementById('score_tc_left'),'dark');
                var option = {
                    background:"rgba(0,120,120,.4)",
                    tooltip: {},
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
                    title: {
                        show : false,
                        text: '运行指标雷达'
                    },
    
                    textStyle: {
                        color: '#fff',
                    },
                    radar: {
                        // shape: 'circle',
                        indicator: this.rateAll.data1,
                        // center: ['49%', '54%'],
                        radius:150,
                        
                    },
                    series: [{
                        name: '',
                        type: 'radar',
                    
                        data : [
                            {
                                value : this.rateAll.data2,
                                name : '占比(%)'
                            }
                        ]
                    }]
                }
                score_tc_left.setOption(option);
            }
        }
    }
</script>

<style lang="css">
    .score_box {width:300px; height:180px;background:rgba(0,120,120,.4); position:relative;z-index: 500;}
    .score_box:before{clip:rect(0 20px 20px 0)}
    .score_box:after {clip:rect(0 320px 20px 300px)}
    .score_box_count {width:300px; height:180px;  }
    .score_box_count:before{clip:rect(180px 20px 200px 0)}
    .score_box_count:after {clip:rect(180px 320px 200px 300px)}
    .score_box_count_title {width:100%; height:30px; padding-top:10px; font-size:20px; color:#fff; text-align:center;}
    .score_box_count_title strong { padding:0 5px; color: #FFC023; font-size:24px; font-weight:normal; font-family:Helvetica, Arial, sans-serif;}
    .score_box_count_star {width:150px; height:30px; margin-left:75px; margin-bottom:5px; background:url(../../../assets/img/icons-checkmark.png) repeat-x 0 0;} 
    .score_box_count_star span {display: block;height:30px; background:url(../../../assets/img/icons-checkmark.png) repeat-x 0 -30px;}
    .score_box_quota {width:200px; height:36px; padding:0 10px; margin:10px 0 0 40px; font:16px/36px "微软雅黑"; color:#333;  }
    .score_box_quota span {float: left;width:90px;}
    .score_box_quota strong {float: left;font-size:22px; padding:0 5px; color:#fff; font-weight:normal; }
    .score_box_count_syzb { background:#05C3F9}
    .score_box_count_yxzb { background: #FFC828}
    .score_tc_left {float: left;margin-right: 10px;width: 480px;height: 480px;}
    .score_tc_right {float: left;width: 450px;}
</style>
              