<template lang="html">
    <div class="cjfgl_count count_common" style="width:45%">
        <h2 class="main_index_title">采集覆盖率
            <div class="main_index_title_right">
                <button v-bind:class="{checked:ispremouth,'btn-small':buttons}" @click="getData($event)" mouth="pre">上月</button>
                <button v-bind:class="{checked:isthismouth,'btn-small':buttons}" @click="getData($event)" mouth="this">本月</button>
                <router-link :to="{path:'/cjfgl?sysId=8000600001&sonid=8000600002'}">+详情</router-link>
            </div>
        </h2>
        <div class="main_index_count clearfix">
            <div class="main_index_count_left">
                <div class="main_index_count_lefts">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                        <thead>
                            <tr>
                                <td>地区</td>
                                <td>采集覆盖率(%)</td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="scroll" style="position:relative;height:350px;overflow:hidden;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                        <tbody>
                            <tr v-for="item in acquireCoverages">
                                <td>{{item.areaName}}</td>
                                <td class="clickable" @click="getTcDetails(item)">{{item.substationCoverage}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="main_index_count_right" id="cjfgl_pt"></div>
        </div>
        
        <!-- 点击数字弹框获取电表详情 -->
        <overlay :close.sync="isShow">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">地区采集成功率
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div>
                        <div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <thead>
                                    <tr>
                                        <td>地区</td>
                                        <td>厂站数</td>
                                        <td>采集点总数</td>
                                        <td>电表总数</td>
                                        <td>未采集电表数</td>
                                        <td>未采集率</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div style="min-height: 350px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <tbody>
                                    <tr>
                                        <td>{{coveragestable.areaName}}</td>
                                        <td>{{coveragestable.substationCount}}</td>
                                        <td >{{coveragestable.acquiredSubstationCount}}</td>
                                        <td>{{coveragestable.meterCount}}</td>
                                        <td>{{coveragestable.unAcquiredMeterCount}}</td>
                                        <td>{{coveragestable.substationCoverage}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </overlay>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import overlay from '@/components/common/overlay'
    export default {
        data: function() {
            return {
                    token:'',
                    month: 'this',
                    buttons:true,
                    ispremouth: false,
				    isthismouth: true,
                    isShow:false,
                    dayDate: '',
                    data_dydj: {"1":"1000kv","2":"800kv","4":"750kv","6":"500kv","8":"400kv","9":"330kv","10":"220kv","12":"110kv","13":"66kv","14":"35kv","15":"20kv","16":"15kv","17":"13kv","18":"10kv"},//电压等级映射
                    acquireCoverages:[],
                    coveragestable:{},
                }
        },
        components:{
            overlay,
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
            this.divisionCode = sessionStorage.getItem('userId');
            this.dayDate = this.$day().format('YYYY-MM');
            this.acquisitionCoverage();
        },
        mounted: function() {
            this.$nextTick(() => {
                let scroll = new BScroll('.scroll', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
            })
        },
        methods: {
            // 本月，上月时间切换重新获取数据
            getData: function(e) {
                this.month = e.currentTarget.getAttribute("mouth");
                if(this.month == "this") {
                    this.isthismouth = true;
                    this.ispremouth = false;
                    this.dayDate = this.$day().format('YYYY-MM');
                } else {
                    this.isthismouth = false;
                    this.ispremouth = true;
                    this.dayDate = this.$day().add(-1,"month").format('YYYY-MM');
                }
                this.acquisitionCoverage();
            },
                // 获取采集覆盖率数据
            acquisitionCoverage: function() {
                this.$http.get("/quotaService/quota/getAcquireCoverage",{
                    params:{
                        sign:this.token,
                        month:this.dayDate,
                    }
                })
                .then((res) => {
                if (res.status == 200) {
                    if(res.data.code == 1) {
                        this.acquireCoverages = this.dataProcessing(res.data.data.acquireCoverages);
                        // if(this.acquireCoverages&&this.acquireCoverages.length>0) {
                        this.acquisitionCoveragePie();
                        // }
                    }
                }
                }).catch(function(error) {
                console.log(error);
                });
            },
            
            // 采集覆盖率饼图
            acquisitionCoveragePie: function() {
                var data1 = [],data2 = [];
                for(var i =0;i<this.acquireCoverages.length;i++) {
                        var obj1 = {}, obj2 = {};
                        if(this.acquireCoverages[i].areaName != '国调' && this.acquireCoverages[i].areaName != '华中' && this.acquireCoverages[i].areaName != '湖北') {
                            obj1.name = this.acquireCoverages[i].areaName;
                            obj2.name = this.acquireCoverages[i].areaName;
                            obj1.value = this.acquireCoverages[i].unAcquiredSubstationCount;
                            data1.push(obj1);
                            data2.push(obj2);
                        }
                }
                var cjfgl_pt = echarts.init(document.getElementById('cjfgl_pt'),'dark');
                var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"// 百分比
                },
                title : {
                        text: '未覆盖厂站数',
                        top:10,
                        textStyle:{color:"#84f1f1",fontSize:"14"}
                    },
                legend: {
                    orient: 'horizontal',
                        left: '5',
                    top: '45',
                        data: data2
                },
                    // 数据信息
                series : [
                    {
                        name: '未覆盖厂站数',
                        type: 'pie',
                        radius : '55%',// 大小
                        center: ['50%', '60%'],// 显示位置
                        data:data1,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
                };
                
                cjfgl_pt.setOption(option);
            },
            // 截取小数
            dataProcessing: function(data) {
                if(typeof data == "object") {
                    var substationCoverage;
                    for(var i=0;i<data.length;i++) {
                        substationCoverage = data[i].substationCoverage;
                        if(substationCoverage != 0 && substationCoverage != 1) {
                            substationCoverage = substationCoverage.toString();
                            substationCoverage = substationCoverage==100?100:substationCoverage.substring(0,substationCoverage.indexOf(".") + 3);
                            substationCoverage = Number(substationCoverage);
                            data[i].substationCoverage = substationCoverage;
                        }
                    }
                    
                    return data;
                }
            },
            // 母线不平衡率数字弹窗
            getTcDetails: function(item) {
                this.isShow = true;
                this.coveragestable = item;
            }
        }
    }
</script>
    
<style lang="css">
    .overlay_tc {height:50%; width:1398px}
    @media (max-width:1399px){
    .overlay_tc{ width:1208px;}
    }
</style>
    