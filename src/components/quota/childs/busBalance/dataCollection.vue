<template lang="html">
    <div class="count_top_left">
            <div class="flhzs">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                    <thead>
                        <tr>
                            <td >分类汇总</td><td>不达标</td><td>总数</td>
                        </tr>
                    </thead>
                    </table>
            </div>
                <div class="flhz scroll" style="position:relative;overflow:hidden;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">            
                    <tbody>
                        <tr v-for="item in datas">
                                <td>{{item.areaName}}</td>
                            <td class="clickable"  @click="getTcDetails(item,3,0)">{{item.mxbphzs}}</td>
                            <td class="clickable"  @click="getTcDetails(item,1,0)">{{item.configCount}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 点击数字弹框 -->
            <overlay :close.sync="isShow">
                <div class="overlay_tc_count"> 
                    <div class="tc_count_title">
                        <h2 class="clearfix">{{dataObj.areaName}}母线平衡明细
                            <button @click="getDownload()" class="warning">下载</button>
                        </h2>
                    </div>
                    <div class="tc_count_body">
                        <div class="tc_count_tool clearfix">
                            <ul class="clearfix">
                                <li>
                                    <label>电压等级:</label>
                                    <select v-model="bvId" name="" id="">
                                        <option value="">请选择电压等级</option>
                                        <option :value="item.bvId" :key="index" v-for="(item,index) in bvIdAll">{{item.dydj}}kV</option>
                                    </select>
                                </li>
                            </ul>
                            <button @click="searcharDetails()">查询</button>
                        </div>
                        <div class="tc_count_table">
                        <div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th style="position: relative;">厂站名称
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='substationName';direction=1;getTcDetails(dataObj,types,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='substationName';direction=0;getTcDetails(dataObj,types,1,0)"></span>
                                            </div>
                                        </th>
                                        <th style="position: relative;">电压等级
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='bvName';direction=1;getTcDetails(dataObj,types,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='bvName';direction=0;getTcDetails(dataObj,types,1,0)"></span>
                                            </div>
                                        </th>
                                        <th style="position: relative;">输入
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='inputValue';direction=1;getTcDetails(dataObj,types,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='inputValue';direction=0;getTcDetails(dataObj,types,1,0)"></span>
                                            </div>
                                        </th>
                                        <th style="position: relative;">输出
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='outputValue';direction=1;getTcDetails(dataObj,types,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='outputValue';direction=0;getTcDetails(dataObj,types,1,0)"></span>
                                            </div>
                                        </th>
                                        <th style="position: relative;">是否平衡
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='balanceConvert';direction=1;getTcDetails(dataObj,types,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='balanceConvert';direction=0;getTcDetails(dataObj,types,1,0)"></span>
                                            </div>
                                        </th>
                                        <th style="position: relative;">不平衡率
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='rate';direction=1;getTcDetails(dataObj,types,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='rate';direction=0;getTcDetails(dataObj,types,1,0)"></span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="scroll4" style="position:relative;height:351px;overflow:hidden;">
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
import $bvId from "../../../../assets/config/bvidMap"
import loading from "@/components/common/loading"
export default {
    data: function() {
        return {
            token:'',
            isShow:false,
            data_dydj: {"1":"1000kv","2":"800kv","4":"750kv","6":"500kv","8":"400kv","9":"330kv","10":"220kv","12":"110kv","13":"66kv","14":"35kv","15":"20kv","16":"15kv","17":"13kv","18":"10kv"},//电压等级映射
            dymxAry:[],
            dataObj:'',
            types:'',
            pageSize:10,
            pageIndex:1,
            pojoTotalCount:null,
            pageCount:null,
            bvIdAll:'',
            bvId:'',
            keyword:'',
            cloneBvId:'',
            cloneKeyword:'',
            loading:true,
            orderColumn:'',
            direction:0
        }
    },
    props:['datas'],
    components:{
        overlay,
        loading
    },
    created: function() {
        this.token = sessionStorage.getItem('accessToken');
        this.bvIdAll = $bvId
    },
    mounted: function() {
    },
    methods: {
        // 弹框获取数据
        getTcDetails: function(data,type,flag,flags) {
            this.loading =true
            if(flag == 0) {
                this.dymxAry = []
                this.pageSize=10;
                this.pageIndex=1;
                this.orderColumn=""
                this.direction=0
            } 
            if(flags == undefined) {
                this.bvId = ""
                // this.keyword = ""
                this.cloneBvId = ""
                // this.cloneKeyword = ""
            }
            this.isShow=true;
            this.dataObj = data;
            this.types = type;

            var obj = {
                sign:this.token,
                month:data.month,
                systemId:data.areaId,
                type:type,
                pageSize:this.pageSize,
                pageIndex:this.pageIndex,
                orderColumn :this.orderColumn,
                direction :this.direction
            }
            
            if(this.cloneBvId!=='') {
                obj.bvId = this.cloneBvId
            }
            // if(this.cloneKeyword!=='') {
            //     obj.keyword = this.cloneKeyword.trim()
            // }
            this.$http.get("/quotaService/quota/getBusbarDetailPage",{
                params:obj
            }).then((res) => {
                if (res.status == 200) {
                    if(res.data.code == 1) {
                        var arr = [];
                        var busbarDetailVO = res.data.data.busbarDetailVO;
                        this.pojoTotalCount = res.data.pojoTotalCount;
                        this.pageCount = res.data.pojoTotalCount;
                        if(busbarDetailVO&&busbarDetailVO.length>0) {
                            for(var i=0;i<busbarDetailVO.length;i++) {
                                arr.push(busbarDetailVO[i])
                            }
                        }
                        this.dymxAry = arr;
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
            this.getTcDetails(this.dataObj ,this.types,1,0);
        },
        // 改变页数
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageIndex = val;
            this.getTcDetails(this.dataObj ,this.types,1,0);
        },
        // 下载表格
        getDownload: function() {
            var obj = {
                sign:this.token,
                month:this.dataObj.month,
                systemId:this.dataObj.areaId,
                type:this.types
            }

            if(this.cloneBvId!=='') {
                obj.bvId = this.cloneBvId
            }
            // if(this.cloneKeyword!=='') {
            //     obj.keyword = this.cloneKeyword.trim()
            // }
            this.$http.get("/quotaService/quota/outBusbarDetail",{
                params:obj
            }).then((res) => {
                window.location =res.request.responseURL;
            }).catch(function(error) {
                console.log(error);
            });
        },
        searcharDetails(type) {
            this.cloneBvId = this.bvId
            // this.cloneKeyword = this.keyword
            this.getTcDetails(this.dataObj ,this.types,0,0);
            console.log(this.bvId)
            // console.log(this.bvId)
        }
    }
}
</script>

<style lang="css">
</style>
    