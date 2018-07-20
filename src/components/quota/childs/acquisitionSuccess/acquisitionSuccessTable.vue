<template lang="html">
    <div class="cover_box">
        <h3 class="cover_detail"> 成功率详细 </h3>
        <div class="cover_datas">
            <table class="table">
                <thead>
                        <tr>
                        <td>地区</td>
                        <td>采集点数</td>
                        <td>未采集数</td>
                        <td>电表总数</td>
                        <td>未采集数</td>
                        <td>采集成功率(%)</td>
                    </tr>
                </thead>
                </table>
            </div>
            <div class="cover_data scroll" style="position:relative;overflow:hidden;">
            <table class="table">
                <tbody>
                        <tr v-for="item in successtable">
                            <td>{{item.areaName}}</td>
                            <td>{{item.acquiredSubstationCount}}</td>
                            <td class="clickable" @click="getDetails(item,1,0)">{{item.unSuccessSubstationCount}}</td>
                            <td>{{item.acquiredMeterCount}}</td>
                            <td class="clickable" @click="getDetails(item,2,0)">{{item.unSuccessMeterCount}}</td>
                            <td>{{item.meterSuccessRate}}</td>
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
                    <div class="tc_count_table">
                        <div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th style="position: relative;">所属地区
                                            <!-- <div style="display:inline-block;position:relative;">
                                                <span class="positive_sequence" @click="orderColumn='systemName';direction=1;getDetails(successtableData,bvIdTc,1)"></span>
                                                <span class="reverse_order" @click="orderColumn='systemName';direction=0;getDetails(successtableData,bvIdTc,1)"></span>
                                            </div> -->
                                        </th>
                                        <th style="position: relative;">厂站名称
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='name';direction=1;getDetails(successtableData,bvIdTc,1)"></span>
                                                <span class="reverse_order" @click="orderColumn='name';direction=0;getDetails(successtableData,bvIdTc,1)"></span>
                                            </div>
                                        </th>
                                        <th style="position: relative;">电压等级
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='bvName';direction=1;getDetails(successtableData,bvIdTc,1)"></span>
                                                <span class="reverse_order" @click="orderColumn='bvName';direction=0;getDetails(successtableData,bvIdTc,1)"></span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="scroll3" style="position:relative;height:351px;overflow:hidden;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <tbody>
                                    <tr v-for="(item,index) in wcjmxAry">
                                        <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                        <td>{{item.systemName}}</td>
                                        <td>{{item.name}}</td>
                                        <td>{{item.bvName}}</td>
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
        <!-- 点击数字弹框获取电表详情 -->
        <overlay :close.sync="isShowt2">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">{{areaNameTc}}未采集电表详情
                        <button @click="getDownload(2)" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div class="tc_count_table">
                    <div>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>所属地区
                                        <!-- <div style="display:inline-block;position:relative;">
                                            <span class="positive_sequence" @click="orderColumn='systemName';direction=1;getDetails(successtableData,bvIdTc,1)"></span>
                                            <span class="reverse_order" @click="orderColumn='systemName';direction=0;getDetails(successtableData,bvIdTc,1)"></span>
                                        </div> -->
                                    </th>
                                    <th style="position: relative;">所属厂站
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='stName';direction=1;getDetails(successtableData,bvIdTc,1)"></span>
                                            <span class="reverse_order" @click="orderColumn='stName';direction=0;getDetails(successtableData,bvIdTc,1)"></span>
                                        </div>
                                    </th>
                                    <th style="position: relative;">电压等级
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='bvName';direction=1;getDetails(successtableData,bvIdTc,1)"></span>
                                            <span class="reverse_order" @click="orderColumn='bvName';direction=0;getDetails(successtableData,bvIdTc,1)"></span>
                                        </div>
                                    </th>
                                    <th style="position: relative;">电表名称
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='name';direction=1;getDetails(successtableData,bvIdTc,1)"></span>
                                            <span class="reverse_order" @click="orderColumn='name';direction=0;getDetails(successtableData,bvIdTc,1)"></span>
                                        </div>
                                    </th>
                                    <th style="position: relative;">最后采集时间
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='lastAcquiredTime';direction=1;getDetails(successtableData,bvIdTc,1)"></span>
                                            <span class="reverse_order" @click="orderColumn='lastAcquiredTime';direction=0;getDetails(successtableData,bvIdTc,1)"></span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="scroll4" style="position:relative;height:360px;overflow:hidden;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                            <tbody>
                                <tr v-for="(item,index) in wcjmxAry">
                                    <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                    <td>{{item.systemName}}</td>
                                    <td>{{item.stName}}</td>
                                    <td>{{item.bvName}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.lastAcquiredTime}}</td>
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
    import loading from "@/components/common/loading"
    export default {
        data: function() {
            return {
                token:'',
                successtable:'',
                successtableData:{},
                areaNameTc:'',
                areaId:'',
                bvIdTc:'',
                isShowt1:false, //控制点击数字弹框
                isShowt2:false,//
                wcjmxAry: [],
                pageSize:10,
                pageIndex:1,
                pojoTotalCount:null,
                pageCount:null,
                loading:true,
                orderColumn:'systemName',
                direction:0
            }
        },
        props:['datas'],
        watch: {
            datas:{
                    handler(news) {
                        this.successtable= this.datas.successtable;
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
                // 覆盖率详细点击数字弹窗
            getDetails: function(data,bvIdTc,flag) {
                this.loading =true
                if(flag == 0) {
                    this.pojoTotalCount = null;
                    this.pageCount = null;
                    this.wcjmxAry = [];
                    this.pageSize=10;
                    this.pageIndex=1;
                    this.orderColumn="systemName"
                    this.direction=0
                } 
                this.successtableData = data;
                this.bvIdTc = bvIdTc;
                this.areaNameTc = data.areaName;
                if(bvIdTc == 1) {
                    this.isShowt1=true;
                    this.$http.get("/quotaService/quota/getSubstationBriefDay",{
                        params:{
                            sign:this.token,
                            day:this.datas.day,
                            systemId:data.areaId,
                            type:3,
                            pageSize:this.pageSize,
                            pageIndex:this.pageIndex,
                            orderColumn :this.orderColumn,
                            direction :this.direction
                        }
                    }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            var briefs = res.data.data.substationBriefs;
                            this.pojoTotalCount = res.data.pojoTotalCount;
                            this.pageCount = res.data.pojoTotalCount;
                            this.wcjmxAry = briefs;
                            if(briefs.length>0) {
                                this.wcjmxAry = briefs
                            }
                            this.loading =false
                        }
                    }
                    }).catch(function(error) {
                    console.log(error);
                    });
                } else if(bvIdTc == 2) {
                    this.isShowt2=true;
                    this.$http.get("/quotaService/quota/getMeterBriefDay",{
                        params:{
                            sign:this.token,
                            day:this.datas.day,
                            systemId:data.areaId,
                            type:3,
                            pageSize:this.pageSize,
                            pageIndex:this.pageIndex,
                            orderColumn :this.orderColumn,
                            direction :this.direction
                        }
                    }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            var briefs = res.data.data.briefs;
                            this.pojoTotalCount = res.data.pojoTotalCount;
                            this.pageCount = res.data.pojoTotalCount;
                            this.wcjmxAry = briefs;
                            this.loading =false
                        }
                    }
                    }).catch(function(error) {
                    console.log(error);
                    });
                }
            },
            // 改变当前页条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getDetails(this.successtableData ,this.bvIdTc,1);
            },
            // 改变页数
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val;
                this.getDetails(this.successtableData ,this.bvIdTc,1);
            },
                // 下载弹窗表格
            getDownload: function(type) {
                if(type == 1) {
                    this.$http.get("/quotaService/quota/outSubstationBriefDay",{
                        params:{
                            sign:this.token,
                            day:this.datas.day,
                            systemId:this.successtableData.areaId,
                            type:3
                        }
                    }).then((res) => {
                        window.location =res.request.responseURL;
                    }).catch(function(error) {
                    console.log(error);
                    });
                } else if(type == 2) {
                    this.$http.get("/quotaService/quota/outMeterBriefDay",{
                        params:{
                            sign:this.token,
                            day:this.datas.day,
                            systemId:this.successtableData.areaId,
                            type:3
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
    