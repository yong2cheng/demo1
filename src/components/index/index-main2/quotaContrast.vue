<template lang="html">
    <div class="quota_contrast_box home_page_sbj">
        <h2 class="home_page_title">指标对照</h2>
        <div class="quota_contrast_count home_page_xbj">
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
            <div class="scroll" style="position:relative;overflow:hidden;height: 204px;">
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
</template>
        
<script>
    // import BScroll from 'better-scroll'
    export default {
        data: function() {
            return {
                token:'',
                dayDate:'',
                lengthData:'',
                listData:''
            }
        },
        components:{
            
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
            this.dayDate = this.$day().format('YYYY-MM');
            this.getAssessScoreStatistics()
        },
        mounted: function() {
            // this.$nextTick(() => {
			//     let scroll = new BScroll('.scroll', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,disableMouse:true});
		    // });
        },
        methods: {
            // 获取指标对照
            getAssessScoreStatistics() {
                this.$http.get("/quotaService/quota/getAssessScoreStatistics",{
                    params:{
                        sign:this.token,
					    date:this.dayDate
                    }
                }).then(res => {
                    if (res.data.code == 1) {
                        var data = []
                        this.listData = res.data.data.list
                        if(this.listData&&this.listData.length>0) {
                            for(var i=0;i<this.listData.length;i++) {
                                data.push(this.listData[i].targetScores.length)
                            }
                        }
                        this.lengthData = data
                    } 
                });
            },
        }
    }
</script>

<style lang="css">
    .quota_contrast_box {float: left;width:400px;position:relative;}
    .quota_contrast_box:before{clip:rect(0 20px 20px 0)}
    .quota_contrast_box:after { clip:rect(0 420px 20px 400px)}
    .quota_contrast_count {width:100%;height: 240px; background:rgba(0,120,120,.4);}
    .quota_contrast_count:before{ clip:rect(270px 20px 290px 0)}
    .quota_contrast_count:after { clip:rect(270px 420px 290px 400px)}
    @media (max-width:1399px){
        /* .quota_contrast_box { width:400px;} */
        /* .quota_contrast_box:after { clip:rect(0 320px 20px 300px)}
        .quota_contrast_count:after { clip:rect(270px 320px 290px 300px)} */
    }
</style>