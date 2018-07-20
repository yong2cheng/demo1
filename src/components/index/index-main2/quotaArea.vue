<template lang="html">
    <div class="quota_area_box home_page_sbj">
        <div class="quota_area_box_count">
            <h2 class="home_page_title">指标区域</h2>
            <div class="quota_area_count home_page_xbj" >
                <div class="scroll2" style="display: block;position:relative;overflow:hidden;height: 225px;">
                <ul class="clearfix">
                    <li v-for=" (item,index) in targetScores"> 
                        <div class="khblock green" v-if="index%4==0"> <i class="tzjl">{{item.score==0||item.score==100?item.score:item.score.toFixed(2)}}</i> <i>{{item.typeName}}</i> </div>
                        <div class="khblock blue" v-if="index%4==1"> <i class="tzjl">{{item.score==0||item.score==100?item.score:item.score.toFixed(2)}}</i> <i>{{item.typeName}}</i> </div>
                        <div class="khblock yellow" v-if="index%4==2"> <i class="tzjl">{{item.score==0||item.score==100?item.score:item.score.toFixed(2)}}</i> <i>{{item.typeName}}</i> </div>
                        <div class="khblock red" v-if="index%4==3"> <i class="tzjl">{{item.score==0||item.score==100?item.score:item.score.toFixed(2)}}</i> <i>{{item.typeName}}</i> </div>
                    </li>
                    <li>
                        <div class="khblock"><span class="sy_tj_icon"></span></div>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </div>
</template>
        
<script>
    // import BScroll from 'better-scroll'
    export default {
        data: function() {
            return {
                targetScores:''
            }
        },
        components:{
            
        },
        props:['data'],
        watch: {
            data:{
                handler(news) {
                    this.targetScores = news
                },
                deep:true
                }
        },
        created: function() {
        },
        mounted: function() {
            // this.$nextTick(() => {
			//     let scroll2 = new BScroll('.scroll2', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,disableMouse:true});
		    // });
        },
        methods: {
            
        }
    }
</script>

<style lang="css">
    .quota_area_box {width:300px;  margin:35px 0 0 0;position:relative;}
    .quota_area_box:before{clip:rect(0 20px 20px 0)}
    .quota_area_box:after { clip:rect(0 320px 20px 300px)}
    .quota_area_count {width:100%; background:rgba(0,120,120,.4); padding-bottom:10px }
    .quota_area_count:before{ clip:rect(265px 20px 285px 0)}
    .quota_area_count:after { clip:rect(265px 320px 285px 300px)}
    .quota_area_count ul li{ float: left;width:69px; margin:5px 0 0 5px}	
    .quota_area_count ul li .khblock { width:61px; height:60px; padding:5px 4px; font-size:12px; text-align:center;border-radius: 5px;background: #0d7474;color: #fff}
    .quota_area_count ul li .khblock i{font-style: normal;display: block;text-align: center;}
    .quota_area_count ul li .khblock i.tzjl{margin-top: 15px}
    .quota_area_count ul li .khblock .sy_tj_icon { display:block; width:32px; height:32px; background:url(../../../assets/img/icon_jia.png) no-repeat 0 0; margin:13px auto; cursor:pointer;}
    .quota_area_count ul li .green {background: #63be54;}
    .quota_area_count ul li .blue {background: #24A5CD;}
    .quota_area_count ul li .yellow {background: #E79B2F;}
    .quota_area_count ul li .red {background: #E72F2F;}
</style>