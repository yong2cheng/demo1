<template lang="html">
        <!--总体指标-->
    <div class="zbgz_page_home">
        <h2 class="zbgz_title clearfix"> 
            <strong>总体指标</strong>
            <div class="zbgz_tbswitch" @click="tubiaochange()">
                <p><span>图</span><span>表</span></p>
                <div :class="{switch_left:tubiao=='left',switch_right:tubiao=='right'}" class="zbgz_block"></div>
            </div>
            <div class="zbgz_time">
                <el-date-picker
                    style="width: 150px;"
                    v-model="dayDate"
                    type="month"
                    placeholder="选择日期"
                    value-format="yyyy-MM">
                </el-date-picker>
                <input type="button" class="timebutt" value="提交" @click="submit()">
            </div>
        </h2>
        <div class="ztzb_tubiao_box clearfix" v-show="tubiao=='left'">
            <div class="khzb_box">
                <h3 class="zbgz_count_title">考核指标</h3>
                <div class="clearfix">
                    <div class="yxzbt_zf">{{assessConutScore}}</div>
                    <div class="yxzb_collect scroll3"  style="position:relative;overflow:hidden;height: 240px;">
                        <ul class="khzb_list clearfix">
                            <li v-for=" (item,index) in assessmentQuota" v-if="index%3==0" class="blue"> 
                                <a href="javascript:;">{{item.name}}<span>{{item.score==0||item.score==100?item.score:item.score.toFixed(2)}}</span></a>
                            </li>
                            <li v-for=" (item,index) in assessmentQuota" v-if="index%3==1" class="red"> 
                                <a href="javascript:;">{{item.name}}<span>{{item.score==0||item.score==100?item.score:item.score.toFixed(2)}}</span></a>
                            </li>

                            <li v-for=" (item,index) in assessmentQuota" v-if="index%3==2" class="yellow"> 
                                <a href="javascript:;">{{item.name}}<span>{{item.score==0||item.score==100?item.score:item.score.toFixed(2)}}</span></a>
                            </li>
                            <li><span class="icon_zbgd"></span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="yxzb_box">
                <h3 class="zbgz_count_title">运行指标</h3>
                <div class="yxzb_collect scroll4"  style="position:relative;overflow:hidden;height: 240px;">
                    <ul class="yxzb_list clearfix">
                        <li v-for=" (item,index) in runQuota" v-if="index%3==0" class="blue"> 
                            <a href="javascript:;">{{item.name}}<span>{{item.score==0||item.score==100?item.score:item.score.toFixed(2)}}</span></a>
                        </li>
                        <li v-for=" (item,index) in runQuota" v-if="index%3==1" class="yellow"> 
                            <a href="javascript:;">{{item.name}}<span>{{item.score==0||item.score==100?item.score:item.score.toFixed(2)}}</span></a>
                        </li>
                        <li><span class="icon_zbgd"></span></li>
                    </ul>
                </div>
            </div>
            
            <!--指标分类对比-->
            <div class="zbfldb_box" id="zbfldb"><!--指标分类对比--> </div>
        </div>
            <div class="zbkh_biao_box clearfix" v-show="tubiao=='right'">
                <div class="zbfldb_box" id="zbgz"><!--指标跟踪--> </div>
                <div class="zbtable">
                    <table class="table">
                        <thead>
                            <tr>
                                <td>类型</td>
                                <td>指标名称</td>
                                <td>昨日累计</td>
                                <td>本月累计</td>
                                <td>上月累计</td>
                            </tr>
                        </thead>
                    </table>
                    <div class="scroll" style="position:relative;overflow:hidden;height: 240px;">
                        <table class="table">
                            <tbody v-for=" (item,index) in listData">
                                <tr v-for=" (items,indexs) in item.targetScores" v-if="indexs==0">
                                    <td :rowspan="lengthData[index]">{{item.indicatorName}}</td>
                                    <td>{{items.typeName}}</td>
                                    <td>{{items.yesterdayScore}}</td>
                                    <td>{{items.thisMonthScore}}</td>
                                    <td>{{items.lastMonthScore}}</td>
                                </tr>
                                <tr v-for=" (items,indexs) in item.targetScores" v-if="indexs != 0">
                                    <td>{{items.typeName}}</td>
                                    <td>{{items.yesterdayScore}}</td>
                                    <td>{{items.thisMonthScore}}</td>
                                    <td>{{items.lastMonthScore}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--总体指标end--> 
    </template>
            
    <script>
        import BScroll from 'better-scroll'
        import $areaId from "../../../../assets/config/areaMap"
        export default {
            data: function() {
                return {
                    token:'',
                    dayDate:'',
                    areaRankingData:'',
                    tubiao: "left",
                    scroll:'',
                    scroll3:'',
                    scroll4:'',
                    targetScores:'',
                    assessmentQuota:'',
                    runQuota:'',
                    listData:'',
                    lengthData:'',
                    lastMonthScore:'',
                    thisMonthScore:'',
                    yesterdayScore:'',
                    assessConutScore:'',
                    nameData:''
                }
            },
            components:{
                
            },
            // watch: {
            //     dayDate:{
            //         handler(news) {
                        
            //         },
            //         deep:true
            //     }
            // },
            created: function() {
                this.token = sessionStorage.getItem('accessToken');
                this.dayDate = this.$day().format('YYYY-MM');
                this.getAssessScore()
                this.getAssessScoreStatistics()
                this.getTotalPoints()
            },
            mounted: function() {
                this.$nextTick(() => {
                    this.scroll3 = new BScroll('.scroll3', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,disableMouse:true});
                    this.scroll4 = new BScroll('.scroll4', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,disableMouse:true});
                });
            },
            methods: {
                // 按日期查询
                submit() {
                    this.getAssessScore()
                    this.getAssessScoreStatistics()
                    this.getTotalPoints()
                },
                // 系统得分
                getTotalPoints() {
                    this.$http.get("/quotaService/quota/getTotalPoints",{
                        params:{
                            sign:this.token,
                            month:this.dayDate
                        }
                    }).then(res => {
                        if (res.data.code == 1) {
                            var assessConutScore = res.data.data.getTotalPoints.assessConutScore
                            this.assessConutScore = assessConutScore == 0 || assessConutScore == 100?assessConutScore:assessConutScore.toFixed(2)
                        } 
                    });
                },
                // 获取指标得分
                getAssessScore() {
                    this.$http.get("/quotaService/quota/getAssessScore",{
                        params:{
                            sign:this.token,
                            month:this.dayDate
                        }
                    }).then(res => {
                        if(res.data.code == 1) {
                            var assessmentQuota =[],runQuota=[]
                            this.targetScores = res.data.data.targetScoreVO.targetScores
                            if(this.targetScores&&this.targetScores.length>0) {
                                for(var i= 0;i<this.targetScores.length;i++) {
                                    if(this.targetScores[i].indicatorType == 0) {
                                        assessmentQuota.push({
                                            name:this.targetScores[i].typeName,
                                            score:this.targetScores[i].score
                                        })
                                    } else if(this.targetScores[i].indicatorType == 1) {
                                        runQuota.push({
                                            name:this.targetScores[i].typeName,
                                            score:this.targetScores[i].score
                                        })
                                    }
                                }
                            }
                            this.assessmentQuota = assessmentQuota
                            this.runQuota = runQuota
                        } 
                    });
                },
                //指标分类对比雷达
                quotaClassification() {
                    var zbfldb = echarts.init(document.getElementById('zbfldb'),'dark');
                    var zbgz = echarts.init(document.getElementById('zbgz'),'dark');
                    var option = {
                        title: {
                            text: '指标分类对比',
                            top:'5px',
                            left:'3px'
                        },
                        tooltip: {},
                        color:['#dd6b66','#24a5cd'],
                        legend: {
                            // data: ['上月', '本月'],
                            top:'5px',
                            right:'2px'
                        },
                        radar: {
                            name: {
                                textStyle: {
                                    color: '#fff',
                                    borderRadius: 3,
                                    padding: [3, 5]
                                }
                            },
                            indicator: this.nameData,
                            center: ['49%', '60%'],
                        },
                        series: [{
                            name: '上月 vs 本月',
                            type: 'radar',
                            data : [
                                {
                                    value : this.lastMonthScore,
                                    name : '上月得分'
                                },
                                {
                                    value : this.thisMonthScore,
                                    name : '本月得分'
                                },
                                {
                                    value : this.yesterdayScore,
                                    name : '昨日得分'
                                }
                            ]
                        }]
                    };
                    zbfldb.setOption(option);
                    zbgz.setOption(option);
                },
                // 指标跟踪图
                quotaTrack() {
                    var zbgz = echarts.init(document.getElementById('zbgz'),'dark');
                    var option = {
                        title: {
                            text: '指标跟踪图',
                            top:5,
                            //left: 'center'
                        },
                        tooltip: {},
                    
                        textStyle: {
                                    color: '#fff',
                                    
                                },
                        radar: {
                            // shape: 'circle',
                            indicator:this.nameData,
                            //center: ['49%', '56%'],
                            radius: 90,
                            
                        },
                        series: [{
                            name: '',
                            type: 'radar',
                        
                            data : [
                                {
                                    value : this.lastMonthScore,
                                    name : '上月得分'
                                },
                                {
                                    value : this.thisMonthScore,
                                    name : '本月得分'
                                },
                                {
                                    value : this.yesterdayScore,
                                    name : '昨日得分'
                                }
                            ]
                        }]
                    };
                    zbgz.setOption(option);
                },
                // 总体指标图表切换
                tubiaochange() {
                    if(this.scroll) {
                        this.scroll.destroy()
                    }
                    if(this.scroll3) {
                        this.scroll3.destroy()
                    }
                    if(this.scroll4) {
                        this.scroll4.destroy()
                    }
                    if (this.tubiao == "left") {
                        this.tubiao = "right";
                        this.$nextTick(() => {
                            this.scroll = new BScroll('.scroll', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                        });
                    } else {
                        this.tubiao = "left";
                        this.$nextTick(() => {
                            this.scroll3 = new BScroll('.scroll3', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                            this.scroll4 = new BScroll('.scroll4', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                        });
                    }
                },
                // 获取指标对照
                getAssessScoreStatistics() {
                    this.$http.get("/quotaService/quota/getAssessScoreStatistics",{
                        params:{
                            sign:this.token,
                            date:this.dayDate
                        }
                    }).then(res => {
                        if (res.data.code == 1) {
                            var data = [],data1 = [],data2 = [],data3 = [],nameData1 = []
                            this.listData = res.data.data.list
                            if(this.listData&&this.listData.length>0) {
                                for(var i=0;i<this.listData.length;i++) {
                                    if(this.listData[i].targetScores&&this.listData[i].targetScores.length>0) {
                                        data.push(this.listData[i].targetScores.length)
                                        for(var j=0;j<this.listData[i].targetScores.length;j++) {
                                            data1.push(this.listData[i].targetScores[j].lastMonthScore)
                                            data2.push(this.listData[i].targetScores[j].thisMonthScore)
                                            data3.push(this.listData[i].targetScores[j].yesterdayScore)
                                            nameData1.push({
                                                name:this.listData[i].targetScores[j].typeName,
                                                max: 30
                                            })
                                        }
                                    }
                                    
                                }
                            }
                            this.lengthData = data
                            this.lastMonthScore = data1
                            this.thisMonthScore = data2
                            this.yesterdayScore = data3
                            this.nameData = nameData1
                            this.quotaClassification();
                            this.quotaTrack()
                        } 
                    });
                },
            }
        }
    </script>
    
    <style lang="css">
        .khzb_box { float:left; width:475px; border:1px solid #0d7474; margin:10px;}
        .zbkh_tu_box,.zbkh_biao_box {width:100%; height:298px;}
        .khzb_list { width:360px;}
        .khzb_list li { float:left; width:100px; height:70px; margin:10px 0 5px 15px; padding-top:30px; background:#0d7474; text-align:center; font-size:15px;}
        .yxzbt_zf {float:left; width:100px;margin:15px 0 0 15px;background:#0d7474; text-align:center; font-size:30px; margin-top:65px; border-radius:50%; padding-top:0; line-height:100px; height:100px;}
        .yxzb_collect{float: left;}
        .khzb_list li span { display:block; font-size:22px; line-height:22px;}
        .khzb_list li span.icon_zbgd { margin:5px auto 0; width:32px; height:32px; background:url(../../../../assets/img/icon_jia.png) no-repeat 0 0;}
        .khzb_list li a { color:#fff;width:100px; height:70px; display:block;}
        .khzb_list li.green,.yxzb_list li.green {background: #63be54}
        .khzb_list li.blue,.yxzb_list li.blue {background: #24A5CD}
        .khzb_list li.yellow,.yxzb_list li.yellow {background: #E79B2F}
        .khzb_list li.red,.yxzb_list li.red {background: #E72F2F}
        .yxzb_box { float:left; width:245px;  border:1px solid #0d7474; margin:10px;}
        .yxzb_list {width:245px;}
        .yxzb_list li { float:left; width:100px; height:70px; margin:10px 0 5px 15px; padding-top:30px; background:#0d7474; text-align:center; font-size:15px;}
        .yxzb_list li span { display:block; font-size:22px; line-height:22px;}
        .yxzb_list li span.icon_zbgd { margin:5px auto 0; width:32px; height:32px; background:url(../../../../assets/img/icon_jia.png) no-repeat 0 0;}
        .zbfldb_box { float:left; width:610px; height:276px; margin:10px; border:1px solid #035252}
        @media (max-width:1399px){
            .zbfldb_box { width:420px;}
        }
        .zbtable { float:left; width:744px; height:276px;  margin:10px;}
    </style>