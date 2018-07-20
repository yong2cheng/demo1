<template>
  <div class="wrap">
    <!-- <htop/> -->
    <sec-nav/>
    <main>
        <router-view/>
    </main>
    <foot/>
  </div>
</template>
<script>
import htop from '@/components/common/htop';
import secNav from '@/components/common/sec-nav';
import foot from '@/components/common/foot';
export default {
    data:function(){
        return{
            ish:false
        }
    },
    components:{
        secNav,
        htop,
        foot
    },
    methods:{
        handle(){
            this.ish=true;
        },
        dataName(){
            let name = {
                mainTariffPap : '主表数据（零点冻结值） 上底码 P+',
                mainTariffRap : '主表数据（零点冻结值） 上底码 P-',
                endMainTariffPap : '下底码 P+',
                endMainTariffRap : '下底码 P-',
                mainElecPap : '主表数据（电量） P+',
                mainElecRap : '主表数据（电量） P-',
                estimateTariffPap : '预估结果（零点冻结值） P+',
                estimateTariffRap : '预估结果（零点冻结值） P-',
                estimateElecPap : '预估结果（电量） P+',
                estimateElecRap : '预估结果（电量） P-',
                secondElecPap : '副表数据（电量） P+',
                secondElecRap : '副表数据（电量） P-',
                deviationRatePap : '偏差系数 P+',
                deviationRateRap : '偏差系数 P-',
                powerIntegrationPap : '功率积分 P+',
                powerIntegrationRap : '功率积分 P-',
                endtoEndDataPap : '对端数据 P+',
                endtoEndDataRap : '对端数据 P-',
                meanDataPap : '均值 P+',
                meanDataRap : '均值 P-',
                ratio : '倍率',
                lastRefreshTime : '最后处理时间',

            }
        }
    }
}
</script>
<style>
    @import '../../assets/style/iconfont.css';
    .main_suc{
        width: 1398px;
        margin-top: 30px;
        border: 1px solid #0d7474;
        background: #043434;
        box-shadow: 0 1px 2px rgba(0,0,0,.8);
        position: relative;
    }
    .after:after{
        content:'';
        display: block;
        clear: both;
    }
    .inbl{display: inline-block}
    .topBar{
        width: 99%;
        margin: 5px .5%;
        position: relative;
        padding-bottom: 20px;
        padding-top: 20px;
        border-bottom: 1px solid #0d7474;
    }
    .show_box{
        margin:8px 13px 13px 10px;
        padding: 0;
    }
    .tkzz {
        /* float: left; */
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        position: absolute;
        z-index: 10;
    }
    .tools_s{
        display: inline-block;
        width: 15%;
    }
    .tools_m{
        display: inline-block;
        width: 20%;
    }
    .tools_l{
        display: inline-block;
        width: 30%;
    }
    .tools_xl{
        display: inline-block;
        width: 30%;
    }
    .sjzd_left{
        text-align: left;
        padding-left: 10px;
    }
    .sjzd_right{
        text-align: right;
    }
    .ulCls{
        /* display: inline-block; */
        position: relative;
    }
    .ulCls>li{
        display: inline-block;
        list-style-type: none;
        float: left;
        text-align: center;
    }
</style>
