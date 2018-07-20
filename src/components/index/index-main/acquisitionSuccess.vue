<template lang="html">
    <div class="cjcgl_count count_common" style="width:53%">
        <h2 class="main_index_title">采集成功率
                <div class="main_index_title_right">
                    <button v-bind:class="{checked:month=='pre','btn-small':buttons}" @click="getData($event)" mouth="pre">昨日</button>
                    <button v-bind:class="{checked:month=='this','btn-small':buttons}" @click="getData($event)" mouth="this">今日</button>
                    <router-link :to="{path:'/cjcgl?sysId=8000600001&sonid=8000600003'}">+详情</router-link>
                </div>
        </h2>
        <div class="main_index_count clearfix">
            <div class="main_index_count_left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                    <tr>
                        <td>采集点/成功采集点</td>
                    </tr>
                    <tr>
                        <td class="clickable" @click="getTcDetails()">{{totlaAcquiredMeterCount}}/{{totlaAcquiredSubstationCount}}</td>
                    </tr>
                    <tr>
                        <td>电表/已采电表</td>
                    </tr>
                    <tr>
                        <td class="clickable" @click="getTcDetails()">{{totlaMeterCount}}/{{totlaSubstationCount}}</td>
                    </tr>
                </table>
            </div>
            <div class="main_index_count_right" id="cjcgl_tb"></div>
        </div>

        <!-- 点击数字弹框获取电表详情 -->
        <overlay :close.sync="isShow">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">地区采集成功率
                        <button @click="getDownload()" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div>
                        <div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
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
                        <div class="scroll2" style="position:relative;height:351px;overflow:hidden;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <tbody>
                                    <tr v-for="(item,index) in successtable">
                                        <td>{{index+1}}</td>
                                        <td>{{item.areaName}}</td>
                                        <td>{{item.acquiredSubstationCount}}</td>
                                        <td >{{item.unSuccessSubstationCount}}</td>
                                        <td>{{item.acquiredMeterCount}}</td>
                                        <td>{{item.unSuccessMeterCount}}</td>
                                        <td>{{item.meterSuccessRate}}</td>
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
                dayDate:'',
                isShow:false,
                data_dydj: {"1":"1000kv","2":"800kv","4":"750kv","6":"500kv","8":"400kv","9":"330kv","10":"220kv","12":"110kv","13":"66kv","14":"35kv","15":"20kv","16":"15kv","17":"13kv","18":"10kv"},//电压等级映射
                successtable:[],
                totlaMeterCount:'',
                totlaSubstationCount:'',
                totlaAcquiredMeterCount:'',
                totlaAcquiredSubstationCount:'',
                scroll2:'',
                loading:true,
            }
        },
        components:{
            overlay,
        },
        watch: {
            isShow:{
                handler(news) {
                    if(this.scroll2) {
                        this.scroll2.destroy()
                    }
                    this.$nextTick(() => {
                        this.scroll2 = new BScroll('.scroll2', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                    })
                },
                deep:true
            }
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
            this.dayDate = this.$day().format('YYYY-MM-DD');
            this.acquisitionSuccess();
        },
        mounted: function() {
        },
        methods: {
            // 昨日，今日时间切换重新获取数据
            getData: function(e) {
                this.month = e.currentTarget.getAttribute("mouth");
                if(this.month == "this") {
                    this.dayDate = this.$day().format('YYYY-MM-DD');
                } else {
                    this.dayDate = this.$day().add(-1,"day").format('YYYY-MM-DD');
                }
                this.acquisitionSuccess();
            },

                // 采集成功率table详细
            acquisitionSuccess: function() {
                this.$http.get("/quotaService/quota/getAcquireSuccessRateDay",{
                    params:{
                        sign:this.token,
                        date:this.dayDate,
                    }
                })
                .then((res) => {
                if (res.status == 200) {
                    if(res.data.code == 1) {
                        this.successtable = res.data.data.acquireSuccessRates;
                        this.successRanking();
                    }
                }
                }).catch(function(error) {
                console.log(error);
                });
            },

            // 采集成功率排名
            successRanking: function() {
                var cjcgl_tb = echarts.init(document.getElementById('cjcgl_tb'),'dark');
                var data1 =[],data2 = [],data3 = [],acquiredMeterCount = 0,successMeterCount = 0,acquiredSubstationCount = 0,successSubstationCount = 0;
                for(var i = 0; i < this.successtable.length; i++) {
                    // if(this.successtable[i].areaName != '国调' && this.successtable[i].areaName != '华中' && this.successtable[i].areaName != '湖北') {
                        acquiredMeterCount += this.successtable[i].acquiredMeterCount;
                        successMeterCount += this.successtable[i].successMeterCount;
                        acquiredSubstationCount += this.successtable[i].acquiredSubstationCount;
                        successSubstationCount += this.successtable[i].successSubstationCount;
                        data1.push(this.successtable[i].areaName);
                        data2.push(this.successtable[i].acquiredMeterCount);
                        data3.push(this.successtable[i].successMeterCount);
                    // }
                }
                this.totlaMeterCount = acquiredMeterCount;
                this.totlaSubstationCount = successMeterCount;
                this.totlaAcquiredMeterCount = acquiredSubstationCount;
                this.totlaAcquiredSubstationCount = successSubstationCount;
                var option = {
                    backgroundColor: '#043434',
                    title : {
                        text: '采集成功率排名',
                        textStyle:{color:"#84f1f1",fontSize:"16"},
                        x:"5",
                        y:'8'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    toolbox: {
                            right: '5%',
                            top:'1%',
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    grid: {
                        top:'12%',
                        left: '2%',
                        right: '5%',
                        bottom: '2%',
                        containLabel: true
                    },
                    calculable : true,
                    yAxis : [
                        {
                            type : 'value',
                            boundaryGap : [0, 0.01]
                        }
                    ],
                    xAxis : [
                        {
                            type : 'category',
                            data : data1,
                            axisLabel:{
                            interval:0,//横轴信息全部显示
                            rotate:30,//30度角倾斜显示
                            }
                        }
                    ],
                    series : [
                        {
                            name:'电表总数',
                            type:'bar',
                            data:data2
                        },
                        {
                            name:'已采电表数',
                            type:'bar',
                            data:data3
                        }
                    ]
                };

                // 指定的配置项和数据显示图表。
                cjcgl_tb.setOption(option);

                this.iscoverpm = true;
            },
            // 采集成功率弹窗显示
            getTcDetails: function() {
                this.isShow = true;
            },
            // 下载表单
            getDownload: function() {
                this.$http.get("/quotaService/quota/outAcquireSuccessRateDay",{
                    params:{
                        sign:this.token,
                        date:this.dayDate,
                    }
                })
                .then((res) => {
                    window.location =res.request.responseURL;
                }).catch(function(error) {
                console.log(error);
                });
            }
        }  
    }
</script>
    
<style lang="css">
</style>
    
    