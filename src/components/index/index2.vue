<template lang="html">
    <div class="wrap">
        <!-- <htop></htop> -->
        <navs></navs>
        <main>
        <!--中间版块-->
            <div class="home_page">
                <div class="home_page_top clearfix">
                    <div class="home_page_top_left">
                        <systemScore :data="targetScores"/>
                        <quotaArea :data="targetScores"/>
                    </div>
                    <div class="home_page_top_middle">
                        <provinceMap :data="areaRankingData"/>
                    </div>
                    <div class="home_page_top_right">
                        <assessmentQuota :data="targetScores"/>
                        <runQuota :data="targetScores"/>
                    </div>
                </div>
                <div class="home_page_bottom clearfix">
                    <quotaContrast/>
                    <quotaHistoricalCurve/>
                    <areaRanking :data="areaRankingData"/>
                </div>
            </div>
        </main>
        <foot/>
    </div>
    </template>
    
    <script>
    import htop from '@/components/common/htop'
    import navs from '@/components/common/nav'
    import systemScore from './index-main/systemScore'
    import quotaArea from './index-main/quotaArea'
    import provinceMap from './index-main/provinceMap'
    import assessmentQuota from './index-main/assessmentQuota'
    import runQuota from './index-main/runQuota'
    import quotaContrast from './index-main/quotaContrast'
    import quotaHistoricalCurve from './index-main/quotaHistoricalCurve'
    import areaRanking from './index-main/areaRanking'
    import foot from '@/components/common/foot'
    import overlay from '@/components/common/overlay'
    import $areaId from "../../assets/config/areaMap"
    import BScroll from 'better-scroll'
    export default {
        data: function() {
            return {
                token:'',
                dayDate:'',
                isLoading: true,
                areaRankingData:'',
                targetScores:'',
            }
        },
        components:{
            navs,
            htop,
            systemScore,
            quotaArea,
            provinceMap,
            assessmentQuota,
            runQuota,
            quotaContrast,
            quotaHistoricalCurve,
            areaRanking,
            foot,
            overlay,
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
            this.dayDate = this.$day().format('YYYY-MM');
            this.getAssessScore()
            this.areaRanking()
        },
        mounted: function() {
            this.$nextTick(() => {
                let scroll = new BScroll('.scroll', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,disableMouse:true});
                let scroll1 = new BScroll('.scroll1', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,disableMouse:true});
			    let scroll2 = new BScroll('.scroll2', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,disableMouse:true});
		    });
        },
        methods: {
            // 去掉加载框
            clearLoading() {
                setInterval(() => { 
                    this.isLoading = false; 
                }, 1000)
            },
            // 获取指标得分
            getAssessScore() {
                this.$http.get("/quotaService/quota/getAssessScore",{
                    params:{
                        sign:this.token,
					    month:this.dayDate
                    }
                }).then(res => {
                    if (res.data.code == 1) {
                        this.targetScores = res.data.data.targetScoreVO.targetScores
                    } 
                });
            },
            // 地区排名
            areaRanking() {
                // 加载地区排名
                this.$http.get("/maintenanceService/areaRankServiceApi/getAreaRankToday",{
                    params:{
                        sign:this.token,
					    date:this.dayDate
                    }
                }).then(res => {
                    if (res.data.code == 1) {
                        var arr = [],arr2 = [];
                        var allScoringSystems = res.data.data.allScoringSystems;
                        for (var item of allScoringSystems) {
                            if (arr.indexOf(item.systemId) == -1) {
                                var obj = {}
                                arr.push(item.systemId) 
                                obj.systemId = item.systemId
                                obj.rank = item.rank
                                obj.score = item.score.toFixed(2)
                                arr2.push(obj);
                            }
                        }
                        for (var item of arr2) {
                            for (var items of $areaId) {
                                if(item.systemId == items.areaId) {
                                    item.name = items.areaName
                                }
                            }
                        }
                        var compare = function (obj1, obj2) {
                            var val1 = obj1.rank;
                            var val2 = obj2.rank;
                            if (val1 < val2) {
                                return -1;
                            } else if (val1 > val2) {
                                return 1;
                            } else {
                                return 0;
                            }            
                        } 
                        arr2.sort(compare)
                        this.areaRankingData = arr2
                    } 
                });
            },
        }
    }
    </script>
    
    <style lang="css">
        .clearfix:after {content:"";height:0;line-height: 0;display: block;visibility: hidden;clear: both;}
        .home_page {width:100%;height:100%;padding: 20px 30px 0;box-sizing: border-box;position: relative;}
        .home_page_sbj:before,.home_page_sbj:after { content:""; border:2px solid #027676; position:absolute; left:0; top:0; right:0; bottom:0; margin:-10px;}
        .home_page_xbj:before,.home_page_xbj:after { content:""; border:2px solid #027676; position:absolute; left:0; top:0; right:0; bottom:0; margin:-10px;}
        .home_page_title {width:100%; height:30px; font-size:20px; color:#fff; text-align:center; background:#027676;/*058687*/ opacity:.9;  }
        .home_page_top {margin-bottom: 35px;}
        .home_page_top_left {float: left;width: 300px;}
        .home_page_top_middle {float: left;width:100%;height:90vh;position: absolute;left: 0;top:0;}
        .home_page_top_right {float: right;width: 300px;}
        .home_page_bottom {width:100%;}
        .overlay_tc_sy {width:1000px;height: 520px;padding: 20px;box-sizing: border-box}
    </style>
          