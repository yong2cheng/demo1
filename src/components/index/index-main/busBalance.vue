<template lang="html">
    <div class="main_index_top">
        <h2 class="main_index_title">母线不平衡率
            <div class="main_index_title_right">
                <button v-bind:class="{checked:month=='pre','btn-small':buttons}" @click="getData($event)" mouth="pre">上月</button>
                <button v-bind:class="{checked:month=='this','btn-small':buttons}" @click="getData($event)" mouth="this">本月</button>
                <router-link :to="{path:'/mpzb?sysId=8000600001&sonid=8000600004'}">+详情</router-link>
            </div>
        </h2>
        <div class="main_index_count clearfix">
                <div class="main_index_count_left mxbphl">
                    <div class="mxbphl_count_left_bg">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <thead>
                                <tr>
                                    <td>电压</td><td>不达标</td><td>合计</td><td><span>白名单</span></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in voltageBusbarTable">
                                    <td>{{item.baseVoltage}}</td>
                                    <td class="clickable" @click="getTcDetails(item,3,0)">{{item.unBalCount}}</td>
                                    <td class="clickable" @click="getTcDetails(item,1,0)">{{item.count}}</td>
                                    <td class="clickable" @click="getTcDetails(item,6,0)">{{item.whiteCount}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mxbphl_count_left_pt" id="mxbphl_pt"></div>
                </div>
                <div class="main_index_count_right mxbphl">
                <div class="mxbphl_count_right_switch">
                    <ul class="clearfix">
                        <li :class="{switch:show==1}" @mouseenter="switchDy($event)" dy="500" v-if="systemType==1">500kV</li>
                        <li :class="{switch:show==2}" @mouseenter="switchDy($event)" dy="220">220kV</li>
                        <li :class="{switch:show==3}" @mouseenter="switchDy($event)" dy="110">110kV</li>
                        <li :class="{switch:show==4}" @mouseenter="switchDy($event)" dy="35">35kV</li>
                    </ul>
                </div>
                <div class="mxbphl_count_right_tb" id="mpbph_tb"></div>
                </div>
        </div>
        <!-- 点击数字弹框 -->
        <overlay :close.sync="isShow">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">{{bvIdTc}}母线不平衡详情
                        <button @click="getDownload()" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div class="tc_count_table">
                        <div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th style="position: relative;">厂站名称
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='substationName';direction=1;getTcDetails(dataObj,types,1)"></span>
                                                <span class="reverse_order" @click="orderColumn='substationName';direction=0;getTcDetails(dataObj,types,1)"></span>
                                            </div>
                                        </th>
                                        <th style="position: relative;">电压等级
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='bvName';direction=1;getTcDetails(dataObj,types,1)"></span>
                                                <span class="reverse_order" @click="orderColumn='bvName';direction=0;getTcDetails(dataObj,types,1)"></span>
                                            </div>
                                        </th>
                                        <th style="position: relative;">输入
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='inputValue';direction=1;getTcDetails(dataObj,types,1)"></span>
                                                <span class="reverse_order" @click="orderColumn='inputValue';direction=0;getTcDetails(dataObj,types,1)"></span>
                                            </div>
                                        </th>
                                        <th style="position: relative;">输出
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='outputValue';direction=1;getTcDetails(dataObj,types,1)"></span>
                                                <span class="reverse_order" @click="orderColumn='outputValue';direction=0;getTcDetails(dataObj,types,1)"></span>
                                            </div>
                                        </th>
                                        <th style="position: relative;">是否平衡
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='balanceConvert';direction=1;getTcDetails(dataObj,types,1)"></span>
                                                <span class="reverse_order" @click="orderColumn='balanceConvert';direction=0;getTcDetails(dataObj,types,1)"></span>
                                            </div>
                                        </th>
                                        <th style="position: relative;">不平衡率
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='rate';direction=1;getTcDetails(dataObj,types,1)"></span>
                                                <span class="reverse_order" @click="orderColumn='rate';direction=0;getTcDetails(dataObj,types,1)"></span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="scroll1" style="position:relative;height:351px;overflow:hidden;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <tbody>
                                    <tr v-for="(item,index) in dymxAry">
                                        <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                        <td>{{item.substationName}}</td>
                                        <td>{{item.bvName}}</td>
                                        <td>{{item.inputValue}}</td>
                                        <td>{{item.outputValue}}</td>
                                        <td>{{item.balanceConvert}}</td>
                                        <td>{{item.rate}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                        background
                        class="pagings"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[10,20,100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pojoTotalCount">
                    </el-pagination>
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
                    month: 'this',
                    buttons:true,
                    dayDate:'',
                    data_dydj: {"1":"1000kv","2":"800kv","4":"750kv","6":"500kv","8":"400kv","9":"330kv","10":"220kv","12":"110kv","13":"66kv","14":"35kv","15":"20kv","16":"15kv","17":"13kv","18":"10kv"},//电压等级映射
                    isShow:false,//控制点击分类汇总数字弹框
                    bvIdTc:'',
                    show:1,
                    pageSize:10,
                    pageIndex:1,
                    pojoTotalCount:null,
                    pageCount:null,
                    busbarSummaries:[],
                    voltageBusbarSummaries: [],
                    voltageBusbarTable: [],
                    voltageBusbarPie: [],
                    baseVoltage: [],
                    baseVoltageObj: {},
                    areaName: [],
                    mxbdb_data:{},
                    dymxAry: [],
                    dataObj:{},
                    types:'',
                    loading:true,
                    systemType:'',
                    orderColumn:'',
                    direction:0
                }
        },
        components:{
            overlay,
            loading
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
            this.systemType = sessionStorage.getItem("systemType");
            this.dayDate = this.$day().format('YYYY-MM');
            this.getBusBalance();
        },
        mounted: function() {
            this.$nextTick(() => {
                let scroll1 = new BScroll('.scroll1', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
            })
        },
        methods: {
            // 本月，上月时间切换重新获取数据
            getData: function(e) {
                this.show =1;
                this.month = e.currentTarget.getAttribute("mouth");
                if(this.month == "this") {
                    this.dayDate = this.$day().format('YYYY-MM');
                } else {
                    this.dayDate = this.$day().add(-1,"month").format('YYYY-MM');
                }
                this.getBusBalance();
            },
            // 母平指标详情数据获取
            getBusBalance: function() {
                this.$http.get("/quotaService/quota/getBusbarSummary",{
                    params:{
                        sign:this.token,
                        month:this.dayDate,
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        this.busbarSummaryAreaVOList = res.data.data.busbarSummaryAreaVOList;
                        this.voltageBusbarSummaries = res.data.data.voltageBusbarSummaries;
                        if(this.busbarSummaryAreaVOList.length>0) {
                            this.handleUnBalance();
                        }
                        if(this.voltageBusbarSummaries.length>0) {
                            this.busBalanceData();
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            }, 
            
            // 母线不平衡柱状以及饼图数据处理
            busBalanceData: function() {
                var arr1 = [],arr2 = [];
                for(var i=0;i<this.voltageBusbarSummaries.length;i++) {
                    var obj = {};
                    if(this.systemType == 1) {
                        if(this.voltageBusbarSummaries[i].baseVoltage == '500kV') {
                            obj.name = this.voltageBusbarSummaries[i].baseVoltage;
                            obj.value = this.voltageBusbarSummaries[i].unBalCount;
                            arr1.push(this.voltageBusbarSummaries[i]);
                            arr2.push(obj);
                        } else if(this.voltageBusbarSummaries[i].baseVoltage == '220kV') {
                            obj.name = this.voltageBusbarSummaries[i].baseVoltage;
                            obj.value = this.voltageBusbarSummaries[i].unBalCount;
                            arr1.push(this.voltageBusbarSummaries[i]);
                            arr2.push(obj);
                        } else if(this.voltageBusbarSummaries[i].baseVoltage == '110kV') {
                            obj.name = this.voltageBusbarSummaries[i].baseVoltage;
                            obj.value = this.voltageBusbarSummaries[i].unBalCount;
                            arr1.push(this.voltageBusbarSummaries[i]);
                            arr2.push(obj);
                        } else if(this.voltageBusbarSummaries[i].baseVoltage == '35kV') {
                            obj.name = this.voltageBusbarSummaries[i].baseVoltage;
                            obj.value = this.voltageBusbarSummaries[i].unBalCount;
                            arr1.push(this.voltageBusbarSummaries[i]);
                            arr2.push(obj);
                        }
                    } else {
                        if(this.voltageBusbarSummaries[i].baseVoltage == '220kV') {
                            obj.name = this.voltageBusbarSummaries[i].baseVoltage;
                            obj.value = this.voltageBusbarSummaries[i].unBalCount;
                            arr1.push(this.voltageBusbarSummaries[i]);
                            arr2.push(obj);
                        } else if(this.voltageBusbarSummaries[i].baseVoltage == '110kV') {
                            obj.name = this.voltageBusbarSummaries[i].baseVoltage;
                            obj.value = this.voltageBusbarSummaries[i].unBalCount;
                            arr1.push(this.voltageBusbarSummaries[i]);
                            arr2.push(obj);
                        } else if(this.voltageBusbarSummaries[i].baseVoltage == '35kV') {
                            obj.name = this.voltageBusbarSummaries[i].baseVoltage;
                            obj.value = this.voltageBusbarSummaries[i].unBalCount;
                            arr1.push(this.voltageBusbarSummaries[i]);
                            arr2.push(obj);
                        }
                    }
                }
                this.voltageBusbarTable = arr1;
                this.voltageBusbarPie = arr2;
                this.busBalancePie();
            },
            
            // 母线不平衡饼图
            busBalancePie: function() {
                var mxbphl_pt = echarts.init(document.getElementById('mxbphl_pt'),'dark');
                var option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"// 百分比
                    },
                    title : {
                        text: '不平衡母线百分比',
                        textStyle:{color:"#84f1f1",fontSize:"14"}
                    },
                    // 数据信息
                    series : [
                        {
                            name: '母线不平衡率',
                            type: 'pie',
                            radius : '50%',// 大小
                            center: ['50%', '50%'],// 显示位置
                            data:this.voltageBusbarPie,
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
                mxbphl_pt.setOption(option);
            },
            
            // 母线不平衡柱状图数据处理
            handleUnBalance: function() {
                var dataObj = {};
                if(this.busbarSummaryAreaVOList.length>0) {
                    for(var i=0;i<this.busbarSummaryAreaVOList.length;i++) {
                        if(this.busbarSummaryAreaVOList[i].busbarSummaryVOList) {
                            var busbarSummaryVOList = {},data = [];
                            busbarSummaryVOList = this.busbarSummaryAreaVOList[i].busbarSummaryVOList;
                            
                            for(var key in busbarSummaryVOList) {
                                var obj = {};
                                obj.areaName = busbarSummaryVOList[key].areaName;
                                obj.balanceCount = (busbarSummaryVOList[key].totalCount-busbarSummaryVOList[key].unbalanceCount);
                                obj.unbalanceCount = busbarSummaryVOList[key].unbalanceCount;
                                obj.totalCount = busbarSummaryVOList[key].totalCount;
                                data.push(obj);
                            }
                            dataObj[this.data_dydj[this.busbarSummaryAreaVOList[i].bvId]] = data;
                        }
                    }
                    if(this.systemType == 1) {
                        if(dataObj['500kv'] == undefined) {
                            dataObj['500kv'] = [];
                        }
                    }
                    
                    if(dataObj['220kv'] == undefined) {
                        dataObj['220kv'] = [];
                    }

                    if(dataObj['110kv'] == undefined) {
                        dataObj['110kv'] = [];
                    }

                    if(dataObj['35kv'] == undefined) {
                        dataObj['35kv'] = [];
                    }

                    this.mxbdb_data = dataObj;

                    if(this.systemType == 1) {
                        this.busBalanceRanking(this.mxbdb_data['500kv']);
                    } else {
                        this.show =2
                        this.busBalanceRanking(this.mxbdb_data['220kv']);
                    }
                }
            },
            
            // 母线不平衡柱状图
            busBalanceRanking: function(data) {
                var data1 = [],data2 = [],data3 = [];
                if(data.length>0) {
                    for(var i=0;i<data.length;i++) {
                        data1.push(data[i].areaName);
                        data2.push(data[i].unbalanceCount);
                        data3.push(data[i].totalCount);
                    }
                }
                var mxbdb_pm = echarts.init(document.getElementById('mpbph_tb'), 'dark');
                var option = {
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                            data:['母线不平衡条数','母线总条数']
                        },
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
                    grid: {
                        top:'12%',
                        left: '1%',
                        right: '1%',
                        bottom: '2%',
                        containLabel: true
                    },
                    calculable : true,
                    xAxis : [
                        {
                                type : 'category',
                            data : data1,
                            axisLabel:{  
                                interval:0,//横轴信息全部显示  
                        //   rotate:-30,//-30度角倾斜显示  
                        }  
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            boundaryGap : [0, 0.01]
                        }
                    ],
                    series : [
                        {
                            name:'母线不平衡条数',
                            type:'bar',
                            data:data2
                        },
                        {
                            name:'母线总条数',
                            type:'bar',
                            data:data3
                        }
                    ]
                };
                // 指定的配置项和数据显示图表。
                mxbdb_pm.setOption(option);
            },
            
            // 切换不同电压得到展现不同的母线不平衡排名
            switchDy: function(e) {
                var dy = e.currentTarget.getAttribute("dy");
                if(dy == 500) {
                        this.show =1;
                        this.busBalanceRanking(this.mxbdb_data['500kv']);
                } else if(dy == 220) {
                        this.show =2;
                        this.busBalanceRanking(this.mxbdb_data['220kv']);
                } else if(dy == 110) {
                        this.show =3;
                        this.busBalanceRanking(this.mxbdb_data['110kv']);
                } else if(dy == 35) {
                        this.show =4;
                        this.busBalanceRanking(this.mxbdb_data['35kv']);
                }
            },

            // 弹框显示并获取数据
            getTcDetails: function(data,type,flag) {
                this.loading =true
                if(flag == 0) {
                    this.pojoTotalCount = null;
                    this.pageCount = null;
                    this.dymxAry = [];
                    this.pageSize=10;
                    this.pageIndex=1;
                    this.orderColumn=""
                    this.direction=0
                }
                this.types = type;
                this.isShow = true;
                this.dataObj =data;
                this.bvIdTc = data.baseVoltage;
                this.$http.get("/quotaService/quota/getBusbarDetailPage",{
                    params:{
                        sign:this.token,
                        month:this.dayDate,
                        bvId:data.bvId,
                        type:type,
                        pageSize:this.pageSize,
                        pageIndex:this.pageIndex,
                        orderColumn :this.orderColumn,
                        direction :this.direction
                    }
                })
                .then((res) => {
                if (res.status == 200) {
                    if(res.data.code == 1) {
                        var busbarDetails = res.data.data.busbarDetailVO;
                        this.pojoTotalCount = res.data.pojoTotalCount;
                        this.pageCount = res.data.pojoTotalCount;
                        if(busbarDetails&&busbarDetails.length>0) {
                            var arr = [];
                            for(var i=0;i<busbarDetails.length;i++) {
                                arr.push(busbarDetails[i])
                            }
                            this.dymxAry = arr;
                        } else {
                            this.dymxAry = [];
                        }
                        this.loading =false
                    }
                }
                }).catch(function(error) {
                console.log(error);
                });
            },
            // 改变当前页条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getTcDetails(this.dataObj,this.types,1);
            },
            // 改变页数
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val;
                this.getTcDetails(this.dataObj,this.types,1);
            },
            // 表格下载
            getDownload: function() {
                this.$http.get("/quotaService/quota/outBusbarDetail",{
                    params:{
                        sign:this.token,
                        month:this.dayDate,
                        bvId:this.dataObj.bvId,
                        type:3,
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
    .mxbphl {height: 450px;}
    .overlay_tc {height:90%; width:1398px}
    @media (max-width:1399px){
        .overlay_tc{ width:1208px;}
    }
</style>
    
    