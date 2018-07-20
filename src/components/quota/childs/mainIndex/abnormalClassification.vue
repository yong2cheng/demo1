<template lang="html">
    <!--异常分类-->
    <div class="zbgz_page_home clearfix">
            <h2 class="zbgz_title"> 异常分类</h2>
            <div class="yc_tab_box">
                <table class="table">
                    <thead>
                        <tr>
                            <td rowspan="2">序号</td>
                            <td rowspan="2">指标</td>
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
                    <tbody>
                        <tr v-for=" (item,index) in exceptionQuotaVOS" v-if="exceptionQuotaVOS.length != index+1">
                            <td>{{index+1}}</td>
                            <td>{{item.quotaName}}</td>
                            <td class="checked_detail" @click="getDetail(item.quotaName,item.quotaId,4,'模型延伸',0)">{{item.modelExtensionExceptionCount}}</td>
                            <td class="checked_detail" @click="getDetail(item.quotaName,item.quotaId,5,'模型匹配',0)">{{item.matchingModelExceptionCount}}</td>
                            <td class="checked_detail" @click="getDetail(item.quotaName,item.quotaId,6,'模型校验',0)">{{item.modelVerificationExceptionCount}}</td>
                            <td class="checked_detail" @click="getDetail(item.quotaName,item.quotaId,7,'数据采集异常',0)">{{item.dataAcquisitionExceptionCount}}</td>
                            <td class="checked_detail" @click="getDetail(item.quotaName,item.quotaId,8,'计算电量错误',0)">{{item.calculationElectricityExceptionCount}}</td>
                            <td class="checked_detail" @click="getDetail(item.quotaName,item.quotaId,9,'母平类',0)">{{item.busBalanceExceptionCount}}</td>
                            <td class="checked_detail" @click="getDetail(item.quotaName,item.quotaId,10,'分线线损类',0)">{{item.lineLossExceptionCount}}</td>
                            <td class="checked_detail" @click="getDetail(item.quotaName,item.quotaId,11,'分区网损类',0)">{{item.subareaExceptionCount}}</td>
                            <td class="checked_detail" @click="getDetail(item.quotaName,item.quotaId,12,'分压网损类',0)">{{item.pressureLossExceptionCount}}</td>
                        </tr>
                        <tr v-for=" (item,index) in exceptionQuotaVOS" v-if="exceptionQuotaVOS.length == index+1">
                            <td>{{index+1}}</td>
                            <td>{{item.quotaName}}</td>
                            <td>{{item.modelExtensionExceptionCount}}</td>
                            <td>{{item.matchingModelExceptionCount}}</td>
                            <td>{{item.modelVerificationExceptionCount}}</td>
                            <td>{{item.dataAcquisitionExceptionCount}}</td>
                            <td>{{item.calculationElectricityExceptionCount}}</td>
                            <td>{{item.busBalanceExceptionCount}}</td>
                            <td>{{item.lineLossExceptionCount}}</td>
                            <td>{{item.subareaExceptionCount}}</td>
                            <td>{{item.pressureLossExceptionCount}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!--异常散点图-->
            <div class="ycsd_box" id="ycsd_data"><!--异常分类散点图--></div>
            <!-- 点击数字弹框获取电表详情 -->
            <overlay :close.sync="isShow">
                <div class="overlay_tc_zbgz"> 
                    <h2>{{quotaName}}-{{exceptionName}}</h2>
                    <div class="zbgz_yc_detail scroll5" style="position:relative;overflow:hidden;">
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
        <!--异常分类end-->  
    </template>
            
    <script>
        import overlay from '@/components/common/overlay'
        import BScroll from 'better-scroll'
        import $areaId from "../../../../assets/config/areaMap"
        export default {
            data: function() {
                return {
                    token:'',
                    dayDate:'',
                    exceptionQuotaVOS:'',
                    isShow:false,
                    pageSize:4,
                    pageIndex:0,
                    pojoTotalCount:null,
                    pageCount:null,
                    scroll5:'',
                    exceptionName:'',
                    quotaName:'',
                    quotaType:'',
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
                this.getQuotaByException()
            },
            mounted: function() {
            },
            methods: {
                // 异常分类数据获取
                getQuotaByException: function() {
                    this.dayDate = '2018-01'
                    this.$http.get("/quotaService/quota/getQuotaByException",{
                        params:{
                            sign:this.token,
                            month:this.dayDate
                        }
                    }).then((res) => {
                        if (res.status == 200) {
                            if(res.data.code == 1) {
                                this.exceptionQuotaVOS = res.data.data.exceptionQuotaVOS

                                if(this.exceptionQuotaVOS&&this.exceptionQuotaVOS.length>0) {
                                    this.getQuotaByExceptionCategory();
                                }
                            }
                        }
                    }).catch(function(error) {
                        console.log(error);
                    });
                },
                // 地区排名
                getQuotaByExceptionCategory() {
                    var data1 = [],data = []
                    var data2 = ['模型延伸', '模型匹配', '模型校验', '数据采集异常', '计算电量错误', '母平类', '分线线损类', '分区网损类', '分压网损类'];
                    console.log(data2.length)
                    for(var i=0;i<this.exceptionQuotaVOS.length-1;i++) {
                        data1.push(this.exceptionQuotaVOS[i].quotaName)
                        for(var j=0;j<data2.length;j++) {
                            var data3 = []
                            switch(j)
                            {
                                case 0:
                                    data3.push(j,i,this.exceptionQuotaVOS[i].modelExtensionExceptionCount)
                                    data.push(data3)
                                break;
                                case 1:
                                    data3.push(j,i,this.exceptionQuotaVOS[i].matchingModelExceptionCount)
                                    data.push(data3)
                                break;
                                case 2:
                                    data3.push(j,i,this.exceptionQuotaVOS[i].modelVerificationExceptionCount)
                                    data.push(data3)
                                break;
                                case 3:
                                    data3.push(j,i,this.exceptionQuotaVOS[i].dataAcquisitionExceptionCount)
                                    data.push(data3)
                                break;
                                case 4:
                                    data3.push(j,i,this.exceptionQuotaVOS[i].calculationElectricityExceptionCount)
                                    data.push(data3)
                                break;
                                case 5:
                                    data3.push(j,i,this.exceptionQuotaVOS[i].busBalanceExceptionCount)
                                    data.push(data3)
                                break;
                                case 6:
                                    data3.push(j,i,this.exceptionQuotaVOS[i].lineLossExceptionCount)
                                    data.push(data3)
                                break;
                                case 7:
                                    data3.push(j,i,this.exceptionQuotaVOS[i].subareaExceptionCount)
                                    data.push(data3)
                                break;
                                case 8:
                                    data3.push(j,i,this.exceptionQuotaVOS[i].pressureLossExceptionCount)
                                    data.push(data3)
                                break;
                                default:
                                break;
                            }
                        }
                    }

                    var ycsd_data = echarts.init(document.getElementById('ycsd_data'),'dark');

                     var option= {
                        legend: {
                            data: ['异常分类'],
                            left: 'right',
                            
                        },
                        tooltip: {
                            position: 'top',
                            formatter: function (params) {
                            return  data1[params.value[1]]+'-' +   data2[params.value[0]]+ '：'+params.value[2] ;
                            }
                        },
                        grid: {
                            top:30,
                            left: 10,
                            bottom: 10,
                            right: 30,
                            containLabel: true,
                            
                        },
                        xAxis: {
                            
                            type: 'category',
                            data: data2,
                            boundaryGap: true,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#84f1f1',
                                    type: 'dashed',
                                }
                                
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel:{
                                interval:0,//横轴信息全部显示
                                rotate:30,//30度角倾斜显示
                            }
                            
                        },
                        yAxis: {
                            type: 'category',
                            data: data1,
                            boundaryGap: true,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#aaa',
                                    type: 'solid',	
                                },
                                axisLine: {
                                    show: false,
                                    textBaseline: 'middle',
                                }
                            }
                        },
                        series: [{
                            name: '异常分类',
                            type: 'scatter',
                            symbolSize: function (val) {
                                if(val[2]>=0&&val[2]< 100) {
                                    return 10;
                                } else if(val[2]>=100&&val[2]< 500) {
                                    return 15;
                                } else if(val[2]>=500&&val[2]< 1000) {
                                    return 20;
                                } else if(val[2]> 1000){
                                    return 30;
                                }
                            },
                            singleAxisIndex: 5,
                        
                            data: data,
                            itemStyle: {
                                    normal: {
                                        color: function(params) {
                                            var colorList = [
                                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B','#D7504B','#9BCA63','#F3A43B','#26C0C0',
                                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B','#D7504B','#9BCA63','#F3A43B','#26C0C0',
                                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B','#D7504B','#9BCA63','#F3A43B','#26C0C0',
                                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B','#D7504B','#9BCA63','#F3A43B','#26C0C0',
                                            ];
                                            return colorList[params.dataIndex]
                                } 
                                    }
                                },
                            animationDelay: function (idx) {
                                return idx * 5;
                            }
                        }]
                    };

                    ycsd_data.setOption(option);
                },
                // 获取详情
                getDetail(quotaName,quotaType,exceptionClassifyId,exceptionName,flag) {
                    this.isShow = true
                    this.quotaName = quotaName
                    this.quotaType = quotaType
                    this.exceptionClassifyId = exceptionClassifyId
                    this.exceptionName = exceptionName
                    if(flag == 0) {
                        this.pageIndex = 0
                        this.pageSize = 4
                    }
                    if(this.scroll5) {
                        this.scroll5.destroy()
                    }
                    this.dayDate = '2018-01'
                    this.$http.get("/quotaService/quota/getExceptionDetailBySystemIdAndQuotaTypeAndExceptionId",{
                        params:{
                            sign:this.token,
                            month:this.dayDate,
                            quotaType:quotaType,
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
                        this.scroll5 = new BScroll('.scroll5', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                    });
                },
                // 改变当前页条数
                handleSizeChange(val) {
                    console.log(`每页 ${val} 条`);
                    this.pageSize = val;
                    this.getDetail(this.quotaName,this.quotaType,this.exceptionClassifyId,this.exceptionName,1);
                },
                // 改变页数
                handleCurrentChange(val) {
                    console.log(`当前页: ${val}`);
                    this.pageIndex = val-1;
                    this.getDetail(this.quotaName,this.quotaType,this.exceptionClassifyId,this.exceptionName,1);
                },
            }
        }
    </script>
    
    <style lang="css">
        .yc_tab_box {float: left;width: 705px;height: 280px;margin: 10px;}
        .ycsd_box {float: left;width: 649px;height: 280px;margin: 10px;border: 1px solid #035252;}
        .zbgz_yc_detail {height: 500px;margin: 20px 20px 0}
        .zbgz_yc_detail ul li {box-sizing: border-box;padding: 20px;display: flex;}
        .zbgz_yc_detail ul li .tubiaobox {width: 80px;height: 80px;background: #0d7474;}
        .zbgz_yc_detail ul li .r_qx_nr {flex: 1;margin-left: 28px;}
        .zbgz_yc_detail ul li .r_qx_nr h4 {float: left;width: 100%;height: 30px;line-height: 30px;color: #f6726c;font-size: 16px;font-weight: normal;}
        .zbgz_yc_detail ul li .r_qx_nr p {float: left;width: 78%;line-height: 22px;color: #23adad;}
        .zbgz_yc_detail ul li .r_qx_nr .juti_butt {float: right;width: 78px;height: 22px;line-height: 22px;border: 1px solid #23adad;border-radius: 12px;background: #043434;color: #23adad;font-size: 12px;text-align: center;cursor: pointer;}
        @media (max-width:1398px){
            .yc_tab_box { width:705px;}
            .ycsd_box { width:459px; }
        }
        @media (max-height:800px){
            .zbgz_yc_detail {height: 450px}
        }
    </style>