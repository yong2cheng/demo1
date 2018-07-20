<template lang="html">
    <div class="cover_box">
        <h3 class="cover_detail"> 覆盖率详细 </h3>
        <div class="cover_datas">
            <table class="table">
                <thead>
                    <tr>
                        <td>地区</td>
                        <td>厂站数</td>
                        <td>未覆盖数</td>
                        <td>电表总数</td>
                        <td>未采集数</td>
                        <td>采集覆盖率(%)</td>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="cover_data scroll6" style="position:relative;overflow:hidden;">
            <table class="table">
                <tbody>
                    <tr v-for="item in covtable">
                        <td>{{item.areaName}}</td>
                        <td>{{item.emsSubstationCount== null?0:item.emsSubstationCount}}</td>
                        <td class="clickable" @click="getDetails(item,1,0)">{{item.unAcquiredSubstationCount== null?0:item.unAcquiredSubstationCount}}</td>
                        <td>{{item.emsMeterCount== null?0:item.emsMeterCount}}</td>
                        <td class="clickable" @click="getDetails(item,2,0)">{{item.unAcquiredMeterCount== null?0:item.unAcquiredMeterCount}}</td>
                        <td>{{item.substationCoverage}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 点击数字弹框获取厂站详情 -->
        <overlay :close.sync="isShowt1">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">{{areaNameTc}}未采集厂站详情
                        <button @click="getDownload(1)" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div>
                        <div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>所属地区</th>
                                        <th>所属厂站</th>
                                        <th>电压等级</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="scroll7" style="position:relative;height:351px;overflow:hidden;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">                       
                                <tbody>
                                    <tr v-for="(item,index) in wcjmxAry">
                                        <td>{{index+1}}</td>
                                        <td>{{item.systemName}}</td>
                                        <td>{{item.name}}</td>
                                        <td>{{item.bvName}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <loading :isLoading='loading'></loading>
            </div>
        </overlay>
        <!-- 点击数字弹框获取电表详情 -->
        <overlay :close.sync="isShowt2">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">{{areaNameTc}}未采集电表详情
                        <button @click="getDownload(2)" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div>
                        <div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>所属厂站</th>
                                        <th>电压等级</th>
                                        <th>电表名称</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="scroll8" style="position:relative;height:360px;overflow:hidden;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <tbody>
                                    <tr v-for="(item,index) in wcjmxAry">
                                        <td>{{index+1}}</td>
                                        <td>{{item.stName}}</td>
                                        <td>{{item.bvName}}</td>
                                        <td>{{item.name}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <loading :isLoading='loading'></loading>
            </div>
        </overlay>
    </div>
</template>
    
<script>
    import overlay from '@/components/common/overlay'
    import BScroll from 'better-scroll'
    import loading from "@/components/common/loading"
    export default {
        data: function() {
            return {
                token:'',
                covtable:'',
                areaNameTc:'',
                data_dydj: {"1":"1000kV","2":"800kV","4":"750kV","6":"500kV","8":"400kV","9":"330kV","10":"220kV","12":"110kV","13":"66kV","14":"35kV","15":"20kV","16":"15kV","17":"13kV","18":"10kV"},//电压等级映射
                isShowt1:false, //控制点击数字弹框
                isShowt2:false,//
                wcjmxAry: [],
                dataObj:{},
                loading:true,
            }
        },
        props:['datas'],
        watch: {
            datas:{
                handler(news) {
                    this.covtable= this.datas.covtable;
                },
                deep:true
            }
        },
        components:{
            overlay,
            loading
        },
        created: function() {
            this.token = sessionStorage.getItem("accessToken");
        },
        mounted: function() {
            this.$nextTick(() => {
                let scroll6 = new BScroll('.scroll6', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                let scroll7 = new BScroll('.scroll7', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                let scroll8 = new BScroll('.scroll8', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
            })
        },
        methods: {
            // 成功率详细点击数字弹窗
            getDetails: function(data,bvIdTc) {
                this.loading =true
                this.wcjmxAry = []
                this.dataObj = data;
                this.areaNameTc = data.areaName;
                if(bvIdTc == 1) {
                    this.isShowt1=true;
                    this.$http.get("/quotaService/quota/getSubstationBrief",{
                        params:{
                            sign:this.token,
                            month:this.datas.month,
                            systemId:data.areaId,
                            type:2
                        }
                    }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            var substationBriefs = res.data.data.briefs;
                            this.wcjmxAry = substationBriefs
                            this.loading =false
                        }
                    }
                    }).catch(function(error) {
                    console.log(error);
                    });
                } else if(bvIdTc == 2) {
                    this.isShowt2=true;
                    this.$http.get("/quotaService/quota/getMeterBrief",{
                        params:{
                            sign:this.token,
                            month:this.datas.month,
                            systemId:data.areaId,
                            type:2
                        }
                    }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            var meterBriefs = res.data.data.briefs;
                            this.wcjmxAry = meterBriefs;
                            this.loading =false
                        }
                    }
                    }).catch(function(error) {
                    console.log(error);
                    });
                } 
            },
            // 下载弹窗表格
            getDownload: function(type) {
                if(type == 1) {
                    this.$http.get("/quotaService/quota/outSubstationBrief",{
                        params:{
                            sign:this.token,
                            month:this.datas.month,
                            systemId:this.dataObj.areaId,
                            type:2
                        }
                    }).then((res) => {
                        window.location =res.request.responseURL;
                    }).catch(function(error) {
                    console.log(error);
                    });
                } else if(type == 2) {
                    this.$http.get("/quotaService/quota/outMeterBrief",{
                        params:{
                            sign:this.token,
                            month:this.datas.month,
                            systemId:this.dataObj.areaId,
                            type:2
                        }
                    }).then((res) => {
                        window.location =res.request.responseURL;
                    }).catch(function(error) {
                    console.log(error);
                    });
                } 
            }
        }
    }
</script>
        
<style lang="css">
</style>
    