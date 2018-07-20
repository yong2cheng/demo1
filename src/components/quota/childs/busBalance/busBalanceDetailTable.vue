<template lang="html">
    <div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
            <thead>
                <tr>
                    <td colspan="16" class="count_bottom_title clearfix">各地区{{this.datas.month}}平衡明细表
                        <button class="btnes" @click="getDownload()">下载</button>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">单位</td>
                    <td colspan="3">500kV</td>
                    <td colspan="3">220kV</td>
                    <td colspan="3">110kV</td>
                    <td colspan="3">35kV</td>
                    <td colspan="3">10kV</td>
                </tr>
                <tr>
                    <th>总条数</th>
                    <th>不平衡条数</th>
                    <th>占比(%)</th>
                    <th>总条数</th>
                    <th>不平衡条数</th>
                    <th>占比(%)</th>
                    <th>总条数</th>
                    <th>不平衡条数</th>
                    <th>占比(%)</th>
                    <th>总条数</th>
                    <th>不平衡条数</th>
                    <th>占比(%)</th>
                    <th>总条数</th>
                    <th>不平衡条数</th>
                    <th>占比(%)</th>
                </tr>
                <tr>
                    <td>合计</td>
                    <td>{{datas.eachdyTotal["500kV"].count}}</td>
                    <td>{{datas.eachdyTotal["500kV"].unBalCount}}</td>
                    <td>{{datas.eachdyTotal["500kV"].unBalRate}}</td>
                    <td>{{datas.eachdyTotal["220kV"].count}}</td>
                    <td>{{datas.eachdyTotal["220kV"].unBalCount}}</td>
                    <td>{{datas.eachdyTotal["220kV"].unBalRate}}</td>
                    <td>{{datas.eachdyTotal["110kV"].count}}</td>
                    <td>{{datas.eachdyTotal["110kV"].unBalCount}}</td>
                    <td>{{datas.eachdyTotal["110kV"].unBalRate}}</td>
                    <td>{{datas.eachdyTotal["35kV"].count}}</td>
                    <td>{{datas.eachdyTotal["35kV"].unBalCount}}</td>
                    <td>{{datas.eachdyTotal["35kV"].unBalRate}}</td>
                    <td>{{datas.eachdyTotal["10kV"].count}}</td>
                    <td>{{datas.eachdyTotal["500kV"].unBalCount}}</td>
                    <td>{{datas.eachdyTotal["500kV"].unBalRate}}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in datas.areaName_phmx">
                    <td class="clickable" @click="getMpzbDetails(item)">{{item.areaName}}</td>
                    <td class="clickable" @click="getTcDetails(item,1,'6',0)">{{item.zts500}}</td>
                    <td class="clickable" @click="getTcDetails(item,3,'6',0)">{{item.bph500}}</td>
                    <td>{{item.zb500}}</td>
                    <td class="clickable" @click="getTcDetails(item,1,'10',0)">{{item.zts220}}</td>
                    <td class="clickable" @click="getTcDetails(item,3,'10',0)">{{item.bph220}}</td>
                    <td>{{item.zb220}}</td>
                    <td class="clickable" @click="getTcDetails(item,1,'12',0)">{{item.zts110}}</td>
                    <td class="clickable" @click="getTcDetails(item,3,'12',0)">{{item.bph110}}</td>
                    <td>{{item.zb110}}</td>
                    <td class="clickable" @click="getTcDetails(item,1,'14',0)">{{item.zts35}}</td>
                    <td class="clickable" @click="getTcDetails(item,3,'14',0)">{{item.bph35}}</td>
                    <td>{{item.zb35}}</td>
                    <td class="clickable" @click="getTcDetails(item,1,'18',0)">{{item.zts10}}</td>
                    <td class="clickable" @click="getTcDetails(item,3,'18',0)">{{item.bph10}}</td>
                    <td>{{item.zb10}}</td>
                </tr>
            </tbody>
        </table>

        <!-- 点击数字弹框 -->
        <overlay :close.sync="isShowt">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">{{objData.areaName}}母线平衡明细
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
                                            <span class="positive_sequence" @click="orderColumn='substationName';direction=1;getTcDetails(objData,types,bvIdTc,1)"></span>
                                            <span class="reverse_order" @click="orderColumn='substationName';direction=0;getTcDetails(objData,types,bvIdTc,1)"></span>
                                        </div>
                                    </th>
                                    <th style="position: relative;">电压等级
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='bvName';direction=1;getTcDetails(objData,types,bvIdTc,1)"></span>
                                            <span class="reverse_order" @click="orderColumn='bvName';direction=0;getTcDetails(objData,types,bvIdTc,1)"></span>
                                        </div>
                                    </th>
                                    <th style="position: relative;">输入
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='inputValue';direction=1;getTcDetails(objData,types,bvIdTc,1)"></span>
                                            <span class="reverse_order" @click="orderColumn='inputValue';direction=0;getTcDetails(objData,types,bvIdTc,1)"></span>
                                        </div>
                                    </th>
                                    <th style="position: relative;">输出
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='outputValue';direction=1;getTcDetails(objData,types,bvIdTc,1)"></span>
                                            <span class="reverse_order" @click="orderColumn='outputValue';direction=0;getTcDetails(objData,types,bvIdTc,1)"></span>
                                        </div>
                                    </th>
                                    <th style="position: relative;">是否平衡
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='balanceConvert';direction=1;getTcDetails(objData,types,bvIdTc,1)"></span>
                                            <span class="reverse_order" @click="orderColumn='balanceConvert';direction=0;getTcDetails(objData,types,bvIdTc,1)"></span>
                                        </div>
                                    </th>
                                    <th style="position: relative;">不平衡率
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='rate';direction=1;getTcDetails(objData,types,bvIdTc,1)"></span>
                                            <span class="reverse_order" @click="orderColumn='rate';direction=0;getTcDetails(objData,types,bvIdTc,1)"></span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="scroll5" style="position:relative;height:351px;overflow:hidden;">
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
    import loading from "@/components/common/loading"
    export default {
            data: function() {
                return {
                    token:'',
                    successtable:'',
                    areaNameTc:'',
                    bvIdTc:'',
                    month:'',
                    dayDate: '',
                    eachdyTotal: {},
                    dymxAry: [],
                    dymxObj: {},
                    dataObj : {},
                    objData:{},
                    checkBvid:0,
                    data_dydj: {"1":"1000kV","2":"800kV","4":"750kV","6":"500kV","8":"400kV","9":"330kV","10":"220kV","12":"110kV","13":"66kV","14":"35kV","15":"20kV","16":"15kV","17":"13kV","18":"10kV"},//电压等级映射
                    isShowt:false, //控制点击数字弹框
                    types:'',
                    pageSize:10,
                    pageIndex:1,
                    pojoTotalCount:null,
                    pageCount:null,
                    loading:true,
                    orderColumn:'',
                    direction:0
                }
            },
            props:['datas'],
            watch: {
                datas:{
                        handler(news) {
                            this.successtable= this.datas;
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
            },
            methods: {
                //点击地区跳转页面
                getMpzbDetails(data) {
                    var { href } = this.$router.resolve({
                        name: "/mpzb/mpzbDetail",
                        path: "/mpzb/mpzbDetail",
                        query: {
                            sysId: this.$route.query.sysId,
                            sonid: this.$route.query.sonid,
                            systemId:data.areaId,
                            month:this.datas.month,
                            areaName:data.areaName
                        }
                    });
                     window.open(href, "_blank");
                },
                // 弹框获取数据
                getTcDetails: function(data,type,bvIdTc,flag) {
                    this.loading =true
                    if(flag == 0) {
                        this.dymxAry = []
                        this.pageSize=10;
                        this.pageIndex=1;
                        this.orderColumn=""
                        this.direction=0
                    } 
                    this.checkBvid =0;
                    this.areaNameTc = data.areaName;
                    this.objData = data;
                    this.types =type;
                    this.isShowt=true;
                    this.bvIdTc = bvIdTc;
                    this.$http.get("/quotaService/quota/getBusbarDetailPage",{
                        params:{
                            sign:this.token,
                            month:this.datas.month,
                            systemId:this.objData.areaId,
                            bvId:this.bvIdTc,
                            type:this.types,
                            pageSize:this.pageSize,
                            pageIndex:this.pageIndex,
                            orderColumn :this.orderColumn,
                            direction :this.direction
                        }
                    })
                    .then((res) => {
                    if (res.status == 200) {
                        var busbarDetailVO = res.data.data.busbarDetailVO;
                        this.pojoTotalCount = res.data.pojoTotalCount;
                        this.pageCount = res.data.pojoTotalCount;
                        this.dymxAry = busbarDetailVO;
                        this.loading =false
                    }
                    }).catch(function(error) {
                        console.log(error);
                    });
                },
                // 改变当前页条数
                handleSizeChange(val) {
                    console.log(`每页 ${val} 条`);
                    this.pageSize = val;
                    this.getTcDetails(this.objData ,this.types,this.bvIdTc,1);
                },
                // 改变页数
                handleCurrentChange(val) {
                    console.log(`当前页: ${val}`);
                    this.pageIndex = val;
                    this.getTcDetails(this.objData ,this.types,this.bvIdTc,1);
                },
                // 下载表格
                getDownload: function() {
                    this.$http.get("/quotaService/quota/outBusbarSummary",{
                        params:{
                            sign:this.token,
                            month:this.datas.month,
                        }
                    }).then((res) => {
                        window.location =res.request.responseURL;
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
            }
        }
</script>
        
<style lang="css">
    .btnes{float: right;margin-top: 10px;}
</style>
    