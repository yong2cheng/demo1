<template lang="html">
    <div class="area_ranking_box home_page_sbj">
        <h2 class="home_page_title">地区排名</h2>
        <div class="area_ranking_count home_page_xbj">
            <table>
                <thead>
                    <tr class="table_head">
                        <td width="30%">排名</td>
                        <td width="35%">城市</td>
                        <td width="35%">KPI</td>
                    </tr>
                </thead>
            </table>
            <div class="scroll1" style="position:relative;overflow:hidden;height: 175px;">
                <table >
                    <tbody>
                        <tr v-for="(item,indexd) in areaRankingData">
                            <td width="30%"><div class="table_rank_num">{{item.rank}}</div></td>
                            <td width="35%">{{item.name}}</td>
                            <td width="35%">{{item.score}}</td>
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
                areaRankingData:''
            }
        },
        components:{
            
        },
        props:['data'],
        watch: {
            data:{
                handler(news) {
                    this.areaRankingData = news
                },
                deep:true
                }
        },
        created: function() {
        },
        mounted: function() {
            // this.$nextTick(() => {
			//     let scroll1 = new BScroll('.scroll1', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,disableMouse:true});
		    // });
        },
        methods: {
        }
    }
</script>

<style lang="css">
    .area_ranking_box {float:right;width:400px;position:relative;}
    .area_ranking_box:before{clip:rect(0 20px 20px 0)}
    .area_ranking_box:after { clip:rect(0 420px 20px 400px)}
    .area_ranking_count {width:100%;height: 240px; background:rgba(0,120,120,.4); padding: 15px 5px 5px;box-sizing: border-box }
    .area_ranking_count:before{ clip:rect(270px 20px 290px 0)}
    .area_ranking_count:after { clip:rect(270px 420px 290px 400px)}
    .area_ranking_count table {width: 100%;border-collapse: collapse;}
    .area_ranking_count table tr td {height: 34px; padding: 0 5px;border:none; background:none; border-bottom: 1px dashed #eee; font-size:14px; text-align:center; color:#fff;}
    .table_rank_num {background: #E79B2F; width: 23px; height: 20px; text-align: center;  margin: 0 auto}
    @media (max-width:1399px){
        .area_ranking_box { width:300px;}
        .area_ranking_box:after { clip:rect(0 320px 20px 300px)}
        .area_ranking_count:after { clip:rect(270px 320px 290px 300px)}
    }
</style>