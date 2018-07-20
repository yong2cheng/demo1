<template lang="html">
    <!--地区分类-->
    <div class="zbgz_page_home clearfix">
            <h2 class="zbgz_title clearfix"> 
                <strong>地区分类</strong>
                <div class="zbgz_tbswitch"  @click="tubiaochange()">
                    <p><span>图</span><span>表</span></p>
                    <div :class="{switch_left:tubiao=='left',switch_right:tubiao=='right'}" class="zbgz_block"></div>
                </div>
            </h2>
            <div class="zdgz_dq_tu clearfix" v-show="tubiao=='left'"> 
                <!--地区达标情况-->
                <div class="dqdbmap">
                    <div class="zbgz_count_title"> 
                        <strong>地区达标情况</strong>
                    </div>
                    <div class="dqdb_map" id="dqdb_map"></div>
                </div>
                <!--母线平衡达标率-->
                <div class="mxphdbl"> 
                    <!--排名TAB-->
                    <div class="mx_right pmsj">
                        <div class="zbgz_count_title">
                            <strong>母线平衡达标排名</strong>
                            <div class="zbgz_count_but">
                                <button :class="{checked:month=='pre'}" class="btn-small" mouth="pre" @click="getData($event)">上月</button>
                                <button :class="{checked:month=='this'}" class="btn-small" mouth="this" @click="getData($event)">本月</button> 
                                <a href="javascript:;" @click="refresh()">刷新</a>
                            </div>
                        </div>
                        <div class="tab_buts">
                                <ul class="clearfix">
                                <li :class="{switch:show==1}" @mouseenter="switchDy($event)" dy="500">500kV</li>
                                <li :class="{switch:show==2}" @mouseenter="switchDy($event)" dy="220">220kV</li>
                                <li :class="{switch:show==3}" @mouseenter="switchDy($event)" dy="110">110kV</li>
                                <li :class="{switch:show==4}" @mouseenter="switchDy($event)" dy="35">35kV</li>
                            </ul>
                        </div>
                        <div class="mxdbpm_tabs" id="mpbdb_pm"></div>
                    </div>
                </div>
            </div>
            <div class="zdgz_dq_biao" v-show="tubiao=='right'">
                <div class="mxphdbl">
                    <table class="table">
                        <thead>
                            <tr>
                                <td>序号</td>
                                <td>地区</td>
                                <td>母平指标</td>
                                <td>分线指标</td>
                                <td>分压指标</td>
                                <td>分区指标</td>
                                <td>合计</td>
                            </tr>
                        </thead>
                    </table>
                    <div class="scroll1" style="position:relative;overflow:hidden;height: 294px;">
                        <table class="table">
                            <tbody>
                                <tr v-for=" (item,index) in targetScoreSystemList">
                                    <td>{{index+1}}</td>
                                    <td>{{item.systemName}}</td>
                                    <td>{{item.busbarBalanceQuotaScore}}</td>
                                    <td>{{item.electricWoreQuotaScore}}</td>
                                    <td>{{item.voltageQuotaScore}}</td>
                                    <td>{{item.partitionQuotaScore}}</td>
                                    <td>{{item.sumQuotaScore}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="dqdbmap">
                    <table class="table">
                        <thead>
                            <tr>
                                <td rowspan="2">序号</td>
                                <td rowspan="2">地区</td>
                                <td colspan="3">模型类</td>
                                <td colspan="2">数据类</td>
                                <td colspan="4">分析类</td>
                            </tr>
                            <tr>
                                <td>模型延伸</td>
                                <td>模型匹配</td>
                                <td>模型校验</td>
                                <td>数据采集异常</td>
                                <td>计算电量错误</td>
                                <td>母平类</td>
                                <td>分线线损类</td>
                                <td>分区网损类</td>
                                <td>分压网损类</td>
                            </tr>
                        </thead>
                    </table>
                    <div class="scroll2" style="position:relative;overflow:hidden;height: 260px;">
                        <table class="table">
                            <tbody>
                                <tr v-for=" (item,index) in exceptionQuotaVOList">
                                    <td>{{index+1}}</td>
                                    <td>{{item.systemName}}</td>
                                    <td class="checked_detail" @click="getDetail(item.systemName,item.systemId,4,'模型延伸',0)">{{item.modelExtensionExceptionCount}}</td>
                                    <td class="checked_detail" @click="getDetail(item.systemName,item.systemId,5,'模型匹配',0)">{{item.matchingModelExceptionCount}}</td>
                                    <td class="checked_detail" @click="getDetail(item.systemName,item.systemId,6,'模型校验',0)">{{item.modelVerificationExceptionCount}}</td>
                                    <td class="checked_detail" @click="getDetail(item.systemName,item.systemId,7,'数据采集异常',0)">{{item.dataAcquisitionExceptionCount}}</td>
                                    <td class="checked_detail" @click="getDetail(item.systemName,item.systemId,8,'计算电量错误',0)">{{item.calculationElectricityExceptionCount}}</td>
                                    <td class="checked_detail" @click="getDetail(item.systemName,item.systemId,9,'母平类',0)">{{item.busBalanceExceptionCount}}</td>
                                    <td class="checked_detail" @click="getDetail(item.systemName,item.systemId,10,'分线线损类',0)">{{item.lineLossExceptionCount}}</td>
                                    <td class="checked_detail" @click="getDetail(item.systemName,item.systemId,11,'分区网损类',0)">{{item.subareaExceptionCount}}</td>
                                    <td class="checked_detail" @click="getDetail(item.systemName,item.systemId,12,'分压网损类',0)">{{item.pressureLossExceptionCount}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- 点击数字弹框获取电表详情 -->
            <overlay :close.sync="isShow">
                <div class="overlay_tc_zbgz"> 
                    <h2>{{systemName}}-{{exceptionName}}</h2>
                    <div class="zbgz_yc_detail scroll6" style="position:relative;overflow:hidden;">
                        <ul class="clearfix"> 
                            <li v-for=" (item,index) in exceptionLogs" :key="index">
                                <div class="tubiaobox"></div>
                                <div class="r_qx_nr">
                                    <h4>{{item.level2Name}}</h4>
                                    <p>{{item.level3Name}}</p>
                                    <div class="juti_butt"><a>了解详情</a></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <el-pagination
                        background
                        class="pagings"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex+1"
                        :page-sizes="[4,10,20,100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pojoTotalCount">
                    </el-pagination>
                </div>
            </overlay>
        </div>
        <!--地区分类end--> 
    </template>
            
    <script>
        import overlay from '@/components/common/overlay'
        import BScroll from 'better-scroll'
        import $areaId from "../../../../assets/config/areaMap"
        export default {
            data: function() {
                return {
                    data_dydj: {"1":"1000kv","2":"800kv","4":"750kv","6":"500kv","8":"400kv","9":"330kv","10":"220kv","12":"110kv","13":"66kv","14":"35kv","15":"20kv","16":"15kv","17":"13kv","18":"10kv"},//电压等级映射
                    token:'',
                    month: 'this',
                    dayDate:'',
                    areaRankingData:'',
                    tubiao: "left",
                    scroll1:'',
                    scroll2:'',
                    scroll6:'',
                    busbarSummaries:[],
                    busbarSummaryAreaVOList: [],
                    voltageBusbarSummaries: [],
                    mxbdb_data:{},
                    data_collection:'',
                    show:1,
                    exceptionQuotaVOList:[],
                    targetScoreSystemList:'',
                    isShow:false,
                    pageSize:4,
                    pageIndex:0,
                    pojoTotalCount:null,
                    pageCount:null,
                    exceptionName:'',
                    systemName:'',
                    systemIds:'',
                    exceptionClassifyId:'',
                    exceptionLogs:'',
                }
            },
            components:{
                overlay,  
            },
            created: function() {
                this.token = sessionStorage.getItem('accessToken');
                this.dayDate = this.$day().format('YYYY-MM');
                this.dayDate = '2018-01'
                this.getBusBalance();
                this.getAssessScoreBySystem();
                this.getExceptionBySystem();
            },
            mounted: function() {
            },
            methods: {
                // 昨日，今日时间切换重新获取数据
                getData: function(e) {
                    this.show =1
                    this.month = e.currentTarget.getAttribute("mouth");
                    if(this.month == "this") {
                            this.dayDate = this.$day().format('YYYY-MM');
                    } else {
                        this.dayDate = this.$day().add(-1,"month").format('YYYY-MM');
                    }
                    this.getBusBalance();
                },
                // 刷新排名
                refresh() {
                    this.getBusBalance();
                },
                // 母平指标详情数据获取
                getBusBalance: function() {
                    this.$http.get("/quotaService/quota/getBusbarSummary",{
                        params:{
                            sign:this.token,
                            month:this.dayDate
                        }
                    }).then((res) => {
                        if (res.status == 200) {
                            if(res.data.code == 1) {
                                this.busbarSummaries = res.data.data.busbarSummaries;
                                this.busbarSummaryAreaVOList = res.data.data.busbarSummaryAreaVOList;
                                this.voltageBusbarSummaries = res.data.data.voltageBusbarSummaries;
                                if(this.busbarSummaries.length>0) {
                                    this.dataCollection();
                                }
                                if(this.busbarSummaryAreaVOList.length>0) {
                                    this.handleUnBalance();
                                }
                                // if(this.voltageBusbarSummaries.length>0) {
                                //     this.busBalanceDetail();
                                // }
                            }
                        }
                    }).catch(function(error) {
                        console.log(error);
                    });
                },
                // 地区达标数据
                dataCollection: function() {
                    var objData = [];
                    for(var i=0;i<this.busbarSummaries.length;i++) {
                        if(this.busbarSummaries[i].areaName != '国调' && this.busbarSummaries[i].areaName != '华中' && this.busbarSummaries[i].areaName != '湖北') {
                            objData.push({
                                name: this.busbarSummaries[i].areaName,
                                value: this.busbarSummaries[i].unbalanceRate,
                            });
                        }
                    }
                    this.data_collection = objData;
                    this.initLeftMap()
                },
                //地图加载
                initLeftMap: function() {
                    var dqdb_map = echarts.init(document.getElementById('dqdb_map'), 'dark');
                    var option = {
                        tooltip: {
                        trigger: 'item',
                        },
                        dataRange: {
                            x: 'left',
                            y: 'top',
                            textStyle: {color:"#fff"},
                            splitList: [
                                {start: 80, end: 100,color: '#2ff1b9'},
                                {start: 60, end: 80,color: '#33abd3'},
                                {start: 40, end: 60,color: '#efe52e'},
                                {start: 20, end: 40,color: '#d96304'},
                                {end: 20,color: '#d9042b'}
                            ],
                            color: ['#E0022B', '#E09107', '#A3E00B']
                        },
                        series: [{
                            name: "地区达标率(%)",
                            type: 'map',
                            map: '湖北',
                            // x:'85',
                            center:["50%","50%"],
                            label: {
                                normal: {
                                    show: true,//显示省份标签
                                    textStyle:{color:"#000"}//省份标签字体颜色
                                }, 
                                emphasis: {//对应的鼠标悬浮效果
                                    show: true,
                                    textStyle:{color:"#fff"}
                                } 
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 1,//区域边框宽度
                                    borderColor: '#009fe8',//区域边框颜色
                                    areaColor:"#ffdead",//区域颜色
                                    },
                                emphasis: {
                                    borderWidth: 1,
                                    borderColor: '#4b0082',//边框颜色
                                    // areaColor:"#E0022B",
                                }
                            },
                            data:this.data_collection
                        }]
                    }

                    dqdb_map.setOption(option);
                },
                // 处理母平指标详情数据
                handleUnBalance: function() {
                    var dataObj = {};

                    for(var i=0;i<this.busbarSummaryAreaVOList.length;i++)  {
                        var busbarSummaryVOList = this.busbarSummaryAreaVOList[i].busbarSummaryVOList,data=[];;
                        if(busbarSummaryVOList) {
                            for(var key in busbarSummaryVOList) {
                                var obj = {};
                                obj.areaName = busbarSummaryVOList[key].areaName;
                                obj.balanceCount = (busbarSummaryVOList[key].totalCount-busbarSummaryVOList[key].unbalanceCount);
                                obj.unbalanceCount = busbarSummaryVOList[key].unbalanceCount;
                                obj.totalCount = busbarSummaryVOList[key].totalCount;
                                data.push(obj)
                            }
                        }
                        dataObj[this.data_dydj[this.busbarSummaryAreaVOList[i].bvId]] = data;
                    }

                    if(dataObj['500kv'] == undefined) {
                        dataObj['500kv'] = [];
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

                    if(this.show == 1) {
                        this.busBalanceRanking(this.mxbdb_data['500kv']);
                    } else if(this.show == 2) {
                        this.busBalanceRanking(this.mxbdb_data['220kv']);
                    } else if(this.show == 3) {
                        this.busBalanceRanking(this.mxbdb_data['110kv']);
                    } else if(this.show == 4) {
                        this.busBalanceRanking(this.mxbdb_data['35kv']);
                    }
                },
                // 母线平衡排名
                busBalanceRanking: function(data) {
                    var data1 = [],data2 = [],data3 = [];
                    for(var i=0;i<data.length;i++) {
                            data1.push(data[i].areaName);
                            data2.push(data[i].unbalanceCount);
                            data3.push(data[i].totalCount);
                    }
                    var mxbdb_pm = echarts.init(document.getElementById('mpbdb_pm'), 'dark');
                    var option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        color:['#dd6b66','#24a5cd'],
                        toolbox: {
                            right: '2%',
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
                            top:'15%',
                            left: '1%',
                            right: '1%',
                            bottom: '0',
                            containLabel: true
                        },
                        calculable : true,
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
                        yAxis : [
                            {
                                type : 'value',
                                boundaryGap : [0, 0.01]
                            }
                        ],
                        series : [
                            {
                                name:'不平衡条数',
                                type:'bar',
                                data:data2
                            },
                            {
                                name:'总条数',
                                type:'bar',
                                data:data3
                            }
                        ]
                    };
                    // 指定的配置项和数据显示图表。
                    mxbdb_pm.setOption(option);
                },
                // 切换不同电压得到展现不同的母线平衡排名
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
                // 地区分类图标切换
                tubiaochange() {
                    this.show =1;
                    this.busBalanceRanking(this.mxbdb_data['500kv']);
                    if(this.scroll1) {
                        this.scroll1.destroy()
                    }
                    if(this.scroll2) {
                        this.scroll2.destroy()
                    }
                    if (this.tubiao == "left") {
                        this.tubiao = "right";
                        this.$nextTick(() => {
                            this.scroll1 = new BScroll('.scroll1', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                            this.scroll2 = new BScroll('.scroll2', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                        });
                    } else {
                        this.tubiao = "left";
                    }
                },
                // 根据地区获取指标
                getAssessScoreBySystem: function() {
                    this.$http.get("/quotaService/quota/getAssessScoreBySystem",{
                        params:{
                            sign:this.token,
                            month:this.dayDate
                        }
                    }).then((res) => {
                        if (res.status == 200) {
                            if(res.data.code == 1) {
                                this.targetScoreSystemList = res.data.data.targetScoreSystemList
                            }
                        }
                    }).catch(function(error) {
                        console.log(error);
                    });
                },
                // 根据地区获取异常
                getExceptionBySystem: function() {
                    this.$http.get("/quotaService/quota/getExceptionBySystem",{
                        params:{
                            sign:this.token,
                            month:this.dayDate
                        }
                    }).then((res) => {
                        if (res.status == 200) {
                            if(res.data.code == 1) {
                                this.exceptionQuotaVOList = res.data.data.exceptionQuotaVOList
                            }
                        }
                    }).catch(function(error) {
                        console.log(error);
                    });
                },
                // 获取详情
                getDetail(systemName,systemId,exceptionClassifyId,exceptionName,flag) {
                    this.isShow = true
                    this.systemName = systemName
                    this.systemIds = systemId
                    this.exceptionClassifyId = exceptionClassifyId
                    this.exceptionName = exceptionName
                    if(flag == 0) {
                        this.pageIndex = 0
                        this.pageSize = 4
                    }
                    if(this.scroll6) {
                        this.scroll6.destroy()
                    }
                    this.$http.get("/quotaService/quota/getExceptionDetailBySystemIdAndQuotaTypeAndExceptionId",{
                        params:{
                            sign:this.token,
                            month:this.dayDate,
                            systemId:systemId,
                            exceptionClassifyId:exceptionClassifyId,
                            pageIndex:this.pageIndex,
                            pageSize:this.pageSize
                        }
                    }).then((res) => {
                        if (res.status == 200) {
                            if(res.data.code == 1) {
                                this.exceptionLogs = res.data.data.exceptionLogs
                                this.pojoTotalCount = res.data.pojoTotalCount;
                            }
                        }
                    }).catch(function(error) {
                        console.log(error);
                    });
                    this.$nextTick(() => {
                        this.scroll6 = new BScroll('.scroll6', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                    });
                },
                // 改变当前页条数
                handleSizeChange(val) {
                    console.log(`每页 ${val} 条`);
                    this.pageSize = val;
                    this.getDetail(this.systemName,this.systemIds,this.exceptionClassifyId,this.exceptionName,1);
                },
                // 改变页数
                handleCurrentChange(val) {
                    console.log(`当前页: ${val}`);
                    this.pageIndex = val-1;
                    this.getDetail(this.systemName,this.systemIds,this.exceptionClassifyId,this.exceptionName,1);
                },
            }
        }
    </script>
    
    <style lang="css">
        .zdgz_dq_biao,.zdgz_dq_tu { float:left; width:100%; height:352px;}
        .dqdbmap {float: left;width:740px; height: 330px; position: relative; border: 1px solid #075d5d; margin:10px;}
        .dqdb_map {width: 100%;height: 298px;}
        .zbgz_count_title strong { float:left; font-size:16px; color:#84f1f1; font-weight:normal; margin-left:5px;  text-shadow:0 1px 1px rgba(0,0,0,.8);}
        .zbgz_count_title a {color:#fff; text-decoration:none; background:#035252;height: 20px;line-height: 20px;padding: 2px 5px;}
        .zbgz_count_title a:hover { background:#11aeae}
        .mxphdbl,.mxphdbl .mx_right,.mxphdbl .bdl_tab,.mxphdbl .bdl_tab li{width:610px;}
        .mxphdbl { float:left; height: 330px;  border:1px solid #075d5d; margin:10px;}
        .mxphdbl .mx_right {  float:left; padding:0; margin-right:0}
        .mxphdbl .mx_right .tab_buts { margin: 10px 0}
        .mxphdbl .bdl_tab li {  height:250px;}
        .mxdbpm_tabs {width: 100%;height: 250px;}
        .mxphdbl .mx_right .tab_buts {width: 370px;margin: 10px auto;}
        .mxphdbl .mx_right .tab_buts li { float:left; width:80px; height:20px; line-height:20px; text-align:center; border:1px solid #075d5d; margin:0 5px; color:#84f1f1; font-size:13px; cursor:pointer; transition:all 500ms;}
        .mxphdbl .mx_right .tab_buts li:hover { border-color:#dd6b66; color:#dd6b66 }
        .mxphdbl .mx_right .tab_buts li.switch { border-color:#dd6b66; background:#dd6b66; color:#fff;}
        @media (max-width:1399px){
            .mxphdbl,.mxphdbl .mx_right,.mxphdbl .bdl_tab,.mxphdbl .bdl_tab li{width:550px; }
            .dqdbmap { width:612px;}
            .dqdbmap .scroll2 {height: 253px !important;}
        }
    </style>