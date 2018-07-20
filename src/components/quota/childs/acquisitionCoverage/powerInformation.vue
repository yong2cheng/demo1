<template lang="html">
    <div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table" style="table-layout: auto">
            <thead>
                <tr>
                    <td colspan="6">{{dayDate}}/电网信息</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>厂站:</td>
                    <td class="clickable" @click="getDetails(1,0,0)"><span class="dw_czbutt">{{substationSummary == null?0:substationSummary.totalCount}}</span></td>
                    <td>本月新增:</td>
                    <td class="clickable" @click="getDetails(1,1,0)"><span class="dw_czbutt">{{substationSummary == null?0:substationSummary.newCount}}</span></td>
                    <td>本月退役:</td>
                    <td class="clickable" @click="getDetails(1,2,0)"><span class="dw_czbutt">{{substationSummary == null?0:substationSummary.retireCount}}</span></td>
                </tr>
                <tr>
                    <td>母线:</td>
                    <td class="clickable" @click="getDetails(2,0,0)"><span class="dw_mxbutt">{{busbarSummary == null?0:busbarSummary.totalCount}}</span></td>
                    <td>本月新增:</td>
                    <td class="clickable" @click="getDetails(2,1,0)"><span class="dw_mxbutt">{{busbarSummary == null?0:busbarSummary.newCount}}</span></td>
                    <td>本月退役:</td>
                    <td class="clickable" @click="getDetails(2,2,0)"><span class="dw_mxbutt">{{busbarSummary == null?0:busbarSummary.retireCount}}</span></td>
                </tr>
                <tr>
                    <td>线路:</td>
                    <td class="clickable" @click="getDetails(3,0,0)"><span class="dw_xlbutt">{{aclineSummary == null?0:aclineSummary.totalCount}}</span></td>
                    <td>本月新增:</td>
                    <td class="clickable" @click="getDetails(3,1,0)"><span class="dw_xlbutt">{{aclineSummary == null?0:aclineSummary.newCount}}</span></td>
                    <td>本月退役:</td>
                    <td class="clickable" @click="getDetails(3,2,0)"><span class="dw_xlbutt">{{aclineSummary == null?0:aclineSummary.retireCount}}</span></td>
                </tr>
                <tr>
                    <td>主变:</td>
                    <td class="clickable" @click="getDetails(4,0,0)"><span class="dw_zbbutt">{{transformerSummary == null?0:transformerSummary.totalCount}}</span></td>
                    <td>本月新增:</td>
                    <td class="clickable" @click="getDetails(4,1,0)"><span class="dw_zbbutt">{{transformerSummary == null?0:transformerSummary.newCount}}</span></td>
                    <td>本月退役:</td>
                    <td class="clickable" @click="getDetails(4,2,0)"><span class="dw_zbbutt">{{transformerSummary == null?0:transformerSummary.retireCount}}</span></td>
                </tr>
            </tbody>
        </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table" style="table-layout: auto">
            <thead>
                <tr>
                    <td colspan="6">{{dayDate}}/采集信息</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>电表:</td>
                    <td class="clickable" @click="getDetails(5,0,0)"><span class="cj_dbbutt">{{meterSummary == null?0:meterSummary.totalCount}}</span></td>
                    <td>本月新增:</td>
                    <td class="clickable" @click="getDetails(5,1,0)"><span class="cj_dbbutt">{{meterSummary == null?0:meterSummary.newCount}}</span></td>
                    <td>本月退役:</td>
                    <td class="clickable" @click="getDetails(5,2,0)"><span class="cj_dbbutt">{{meterSummary == null?0:meterSummary.retireCount}}</span></td>
                </tr>
            </tbody>
        </table>

        <!-- 点击数字弹框获取电表详情 -->
        <overlay :close.sync="isShow1">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">厂站明细
                        <button @click="getDownload(1)" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div class="tc_count_tool clearfix">
                    <ul class="clearfix">
                        <li>
                            <label>所属地区:</label>
                            <select v-model="areaId" name="" id="">
                            <option value="">请选择所属地区</option>
                            <option :key="index" v-for="(item,index) in areaIdAll" :value="item.areaId">{{item.areaName}}</option>
                            </select>
                        </li>
                        <li>
                            <label>电压等级:</label>
                            <select v-model="bvId" name="" id="">
                            <option value="">请选择电压等级</option>
                            <option :value="item.bvId" :key="index" v-for="(item,index) in bvIdAll">{{item.dydj}}</option>
                            </select>
                        </li>
                        <li>
                            <label>厂站名称:</label>
                            <input v-model="keyword" type="text" placeholder="请输入厂站名称" class="txt">
                        </li>
                    </ul>
                    <button @click="searcharDetails()">查询</button>
                    </div>
                    <div class="tc_count_table">
                    <div>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                            <thead>
                                <tr>
                                    <td>序号</td>
                                    <td style="position: relative;">所属地区
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='systemName';direction=1;getDetails(types,staType,1,0)"></span>
                                            <span class="reverse_order" @click="orderColumn='systemName';direction=0;getDetails(types,staType,1,0)"></span>
                                        </div>
                                    </td>
                                    <td style="position: relative;">厂站名称
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='localName';direction=1;getDetails(types,staType,1,0)"></span>
                                            <span class="reverse_order" @click="orderColumn='localName';direction=0;getDetails(types,staType,1,0)"></span>
                                        </div>
                                    </td>
                                    <td style="position: relative;">电压等级
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='bvName';direction=1;getDetails(types,staType,1,0)"></span>
                                            <span class="reverse_order" @click="orderColumn='bvName';direction=0;getDetails(types,staType,1,0)"></span>
                                        </div>
                                    </td>
                                    <td style="position: relative;">是否投运
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='isInUseConvert';direction=1;getDetails(types,staType,1,0)"></span>
                                            <span class="reverse_order" @click="orderColumn='isInUseConvert';direction=0;getDetails(types,staType,1,0)"></span>
                                        </div>
                                    </td>
                                    <td style="position: relative;">是否与EMS关联
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='isEmsConvert';direction=1;getDetails(types,staType,1,0)"></span>
                                            <span class="reverse_order" @click="orderColumn='isEmsConvert';direction=0;getDetails(types,staType,1,0)"></span>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="scroll1" style="position:relative;height:351px;overflow:hidden;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                            <tbody>
                                <tr v-for="(item,index) in substations">
                                    <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                    <td>{{item.systemName}}</td>
                                    <td>{{item.localName}}</td>
                                    <td>{{item.bvName}}</td>
                                    <td>{{item.isInUseConvert}}</td>
                                    <td>{{item.isEmsConvert}}</td>
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

        <overlay :close.sync="isShow2">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">母线明细
                        <button @click="getDownload(2)" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div class="tc_count_tool clearfix">
                        <ul class="clearfix">
                            <li>
                                <label>所属地区:</label>
                                <select v-model="areaId" name="" id="">
                                    <option value="">请选择所属地区</option>
                                    <option :key="index" v-for="(item,index) in areaIdAll" :value="item.areaId">{{item.areaName}}</option>
                                </select>
                            </li>
                            <li>
                                <label>电压等级:</label>
                                <select v-model="bvId" name="" id="">
                                    <option value="">请选择电压等级</option>
                                    <option :value="item.bvId" :key="index" v-for="(item,index) in bvIdAll">{{item.dydj}}</option>
                                </select>
                            </li>
                            <li>
                                <label>母线名称:</label>
                                <input v-model="keyword" type="text" placeholder="请输入母线名称" class="txt">
                            </li>
                        </ul>
                        <button @click="searcharDetails()">查询</button>
                    </div>
                    <div class="tc_count_table">
                    <div>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                            <thead>
                                <tr>
                                    <td>序号</td>
                                    <td style="position: relative;">所属地区
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='systemName';direction=1;getDetails(types,staType,1,0)"></span>
                                            <span class="reverse_order" @click="orderColumn='systemName';direction=0;getDetails(types,staType,1,0)"></span>
                                        </div>
                                    </td>
                                    <td style="position: relative;">母线名称
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='pathName';direction=1;getDetails(types,staType,1,0)"></span>
                                            <span class="reverse_order" @click="orderColumn='pathName';direction=0;getDetails(types,staType,1,0)"></span>
                                        </div>
                                    </td>
                                    <td style="position: relative;">电压等级
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='bvName';direction=1;getDetails(types,staType,1,0)"></span>
                                            <span class="reverse_order" @click="orderColumn='bvName';direction=0;getDetails(types,staType,1,0)"></span>
                                        </div>
                                    </td>
                                    <td style="position: relative;">是否投运
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='isInUseConvert';direction=1;getDetails(types,staType,1,0)"></span>
                                            <span class="reverse_order" @click="orderColumn='isInUseConvert';direction=0;getDetails(types,staType,1,0)"></span>
                                        </div>
                                    </td>
                                    <td style="position: relative;">是否与EMS关联
                                        <div class="common_sort">
                                            <span class="positive_sequence" @click="orderColumn='isEmsConvert';direction=1;getDetails(types,staType,1,0)"></span>
                                            <span class="reverse_order" @click="orderColumn='isEmsConvert';direction=0;getDetails(types,staType,1,0)"></span>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="scroll2" style="position:relative;height:351px;overflow:hidden;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                            <tbody>
                                <tr v-for="(item,index) in substations">
                                    <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                    <td>{{item.systemName}}</td>
                                    <td>{{item.pathName}}</td>
                                    <td>{{item.bvName}}</td>
                                    <td>{{item.isInUseConvert}}</td>
                                    <td>{{item.isEmsConvert}}</td>
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

        <overlay :close.sync="isShow3">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">线路明细
                        <button @click="getDownload(3)" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div class="tc_count_tool clearfix">
                        <ul class="clearfix">
                            <li>
                                <label>所属地区:</label>
                                <select v-model="areaId" name="" id="">
                                    <option value="">请选择所属地区</option>
                                    <option :key="index" v-for="(item,index) in areaIdAll" :value="item.areaId">{{item.areaName}}</option>
                                </select>
                            </li>
                            <li>
                                <label>电压等级:</label>
                                <select v-model="bvId" name="" id="">
                                    <option value="">请选择电压等级</option>
                                    <option :value="item.bvId" :key="index" v-for="(item,index) in bvIdAll">{{item.dydj}}</option>
                                </select>
                            </li>
                            <li>
                                <label>线路名称:</label>
                                <input v-model="keyword" type="text" placeholder="请输入线路名称" class="txt">
                            </li>
                        </ul>
                        <button @click="searcharDetails()">查询</button>
                    </div>
                    <div class="tc_count_table">
                        <div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td style="position: relative;">所属地区
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='systemName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='systemName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">首端厂站
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='startStationName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='startStationName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">末端厂站
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='endStationName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='endStationName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">线路名称
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='localName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='localName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">电压等级
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='bvName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='bvName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">是否投运
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='isInUse';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='isInUse';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">是否与EMS关联
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='isEmsConvert';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='isEmsConvert';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="scroll3" style="position:relative;height:351px;overflow:hidden;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <tbody>
                                    <tr v-for="(item,index) in substations">
                                        <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                        <td>{{item.systemName}}</td>
                                        <td>{{item.startStationName}}</td>
                                        <td>{{item.endStationName}}</td>
                                        <td>{{item.localName}}</td>
                                        <td>{{item.bvName}}</td>
                                        <td>{{item.isInUseConvert}}</td>
                                        <td>{{item.isEmsConvert}}</td>
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

        <overlay :close.sync="isShow4">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">主变明细
                        <button @click="getDownload(4)" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div class="tc_count_tool clearfix">
                        <ul class="clearfix">
                            <li>
                                <label>所属地区:</label>
                                <select v-model="areaId" name="" id="">
                                    <option value="">请选择所属地区</option>
                                    <option :key="index" v-for="(item,index) in areaIdAll" :value="item.areaId">{{item.areaName}}</option>
                                </select>
                            </li>
                            <li>
                                <label>主变名称:</label>
                                <input v-model="keyword" type="text" placeholder="请输入主变名称" class="txt">
                            </li>
                        </ul>
                        <button @click="searcharDetails()">查询</button>
                    </div>
                    <div class="tc_count_table">
                        <div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td style="position: relative;">所属地区
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='systemName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='systemName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">所属厂站
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='stName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='stName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">主变名称
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='localName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='localName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <!-- <td>最高电压等级</td> -->
                                        <td style="position: relative;">绕组个数
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='windingNum';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='windingNum';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">是否投运
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='isInUseConvert';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='isInUseConvert';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">是否与EMS关联
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='isEmsConvert';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='isEmsConvert';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="scroll4" style="position:relative;height:351px;overflow:hidden;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <tbody>
                                    <tr v-for="(item,index) in substations">
                                        <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                        <td>{{item.systemName}}</td>
                                        <td>{{item.stName}}</td>
                                        <td>{{item.localName}}</td>
                                        <!-- <td>{{item.bvName}}</td> -->
                                        <td>{{item.windingNum}}</td>
                                        <td>{{item.isInUseConvert}}</td>
                                        <td>{{item.isEmsConvert}}</td>
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

        <overlay :close.sync="isShow5">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">采集电表详情
                        <button @click="getDownload(5)" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div class="tc_count_tool clearfix">
                        <ul class="clearfix">
                            <li>
                                <label>所属地区:</label>
                                <select v-model="areaId" name="" id="">
                                    <option value="">请选择所属地区</option>
                                    <option :key="index" v-for="(item,index) in areaIdAll" :value="item.areaId">{{item.areaName}}</option>
                                </select>
                            </li>
                            <li>
                                <label>电压等级:</label>
                                <select v-model="bvId" name="" id="">
                                    <option value="">请选择电压等级</option>
                                    <option :value="item.bvId" :key="index" v-for="(item,index) in bvIdAll">{{item.dydj}}</option>
                                </select>
                            </li>
                            <li>
                                <label>电表名称:</label>
                                <input v-model="keyword" type="text" placeholder="请输入电表名称" class="txt">
                            </li>
                        </ul>
                        <button @click="searcharDetails()">查询</button>
                    </div>
                    <div class="tc_count_table">
                        <div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td style="position: relative;">所属地区
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='systemName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='systemName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">所属厂站
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='sbtName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='sbtName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">电表名称
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='localName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='localName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">电压等级
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='bvName';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='bvName';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">倍率
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='ratio';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='ratio';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                        <td style="position: relative;">最后采集时间
                                            <div class="common_sort">
                                                <span class="positive_sequence" @click="orderColumn='class2TimeTag';direction=1;getDetails(types,staType,1,0)"></span>
                                                <span class="reverse_order" @click="orderColumn='class2TimeTag';direction=0;getDetails(types,staType,1,0)"></span>
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="scroll5" style="position:relative;height:351px;overflow:hidden;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                <tbody>
                                    <tr v-for="(item,index) in substations">
                                        <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                        <td>{{item.systemName}}</td>
                                        <td>{{item.sbtName}}</td>
                                        <td>{{item.localName}}</td>
                                        <td>{{item.bvName}}</td>
                                        <td>{{item.ratio}}</td>
                                        <td>{{item.class2TimeTag}}</td>
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
import BScroll from 'better-scroll'
import bvidArrs from "@/components/mixins/bvIds";
import $areaId from "../../../../assets/config/areaMap"
import loading from "@/components/common/loading"
export default {
    data: function() {
        return {
                token:'',
                isShow1:false,
                isShow2:false,
                isShow3:false,
                isShow4:false,
                isShow5:false,
                covtable:'',
                aclineSummary:'',
                busbarSummary:'',
                meterSummary:'',
                substationSummary:'',
                transformerSummary:'',
                substations:[],
                dayDate:this.datas,
                pageSize:10,
                pageIndex:1,
                pojoTotalCount:null,
                pageCount:null,
                types:'',
                staType:'',
                bvIdAll:'',
                bvId:'',
                areaIdAll:'',
                areaId:'',
                keyword:'',
                cloneBvId:'',
                cloneAreaId:'',
                cloneKeyword:'',
                loading:true,
                orderColumn:'systemName',
                direction:0
            }
    },
    props:['datas','changIndex'],
    mixins: [bvidArrs],
    watch: {
        changIndex:{
            handler(news) {
            this.dayDate = this.datas; 
            this.powerInformation();
            },
        }
    },
    components:{
        overlay,
        loading
    },
    created: function() {
        this.token = sessionStorage.getItem("accessToken");
        if (sessionStorage.getItem("systemId")&&!isNaN(sessionStorage.getItem("systemId"))) {
            $areaId.forEach(item => {
                if (item.areaId == sessionStorage.getItem("systemId")) {
                    this.areaIdAll = [item];
                }
            });
        } else {
            this.areaIdAll = $areaId;
        }
        this.bvIdAll = this.bvidArr
        this.powerInformation();
    },
    mounted: function() {
        this.$nextTick(() => {
                let scroll1 = new BScroll('.scroll1', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                let scroll2 = new BScroll('.scroll2', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                let scroll3 = new BScroll('.scroll3', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                let scroll4 = new BScroll('.scroll4', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                let scroll5 = new BScroll('.scroll5', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
        })
    },
    methods: {
        // 采集覆盖率电网信息
        powerInformation: function() {
            this.$http.get("/quotaService/quota/getInUseAndRetireList",{
                params:{
                    sign:this.token,
                    month:this.dayDate,
                }
            }).then((res) => {
                if (res.status == 200) {
                    if(res.data.code == 1) {
                        this.$emit("status",true)
                        this.aclineSummary = res.data.data.aclineSummary;
                        this.busbarSummary = res.data.data.busbarSummary;
                        this.meterSummary = res.data.data.meterSummary;
                        this.substationSummary = res.data.data.substationSummary;
                        this.transformerSummary = res.data.data.transformerSummary ;
                    }
                }
                }).catch(function(error) {
                console.log(error);
            });
        },

        getDetails:function(type,staType,flag,flags) {
            this.loading =true
            if(flag == 0) {
                this.pojoTotalCount = null;
                this.pageCount = null;
                this.substations = []
                this.pageSize=10;
                this.pageIndex=1;
                this.orderColumn="systemName"
                this.direction=0
            } 
            
            if(flags == undefined) {
                this.areaId = ""
                this.bvId = ""
                this.keyword = ""
                this.cloneAreaId = ""
                this.cloneBvId = ""
                this.cloneKeyword = ""
            }
            this.types = type;
            this.staType = staType;
            var obj = {
                sign:this.token,
                month:this.dayDate,
                staType:staType,
                pageSize:this.pageSize,
                pageIndex:this.pageIndex,
                orderColumn :this.orderColumn,
                direction :this.direction
            }
            
            if(this.cloneAreaId!=='') {
                obj.systemId = this.cloneAreaId
            }
            if(this.cloneBvId!=='') {
                obj.bvId = this.cloneBvId
            }
            if(this.cloneKeyword!=='') {
                obj.keyword = this.cloneKeyword.trim()
            }

            if(type == 1) {
                this.isShow1 = true;
                this.$http.get("/quotaService/quota/getSubstation",{
                    params:obj
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.substations = res.data.data.substations;
                            this.pojoTotalCount = res.data.pojoTotalCount;
                            this.pageCount = res.data.pojoTotalCount;
                            this.loading =false
                        }
                    }
                    }).catch(function(error) {
                    console.log(error);
                });
            } else if(type == 2) {
                this.isShow2 = true;
                this.$http.get("/quotaService/quota/getBusbarsection",{
                    params:obj
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.substations = res.data.data.voltagelevels;
                            this.pojoTotalCount = res.data.pojoTotalCount;
                            this.pageCount = res.data.pojoTotalCount;
                            this.loading =false
                        }
                    }
                    }).catch(function(error) {
                    console.log(error);
                });
            } else if(type == 3) {
                this.isShow3 = true;
                this.$http.get("/quotaService/quota/getAclinesegment",{
                    params:obj
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.substations = res.data.data.acLineSegments;
                            this.pojoTotalCount = res.data.pojoTotalCount;
                            this.pageCount = res.data.pojoTotalCount;
                            this.loading =false
                        }
                    }
                    }).catch(function(error) {
                    console.log(error);
                });
            } else if(type == 4) {
                this.isShow4 = true;
                this.$http.get("/quotaService/quota/getPowerTransformer",{
                    params:obj
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.substations = res.data.data.powertransformers;
                            this.pojoTotalCount = res.data.pojoTotalCount;
                            this.pageCount = res.data.pojoTotalCount;
                            this.loading =false
                        }
                    }
                    }).catch(function(error) {
                    console.log(error);
                });
            } else if(type == 5) {
                this.isShow5 = true;
                this.$http.get("/quotaService/quota/getMeter",{
                    params:obj
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.substations = res.data.data.meters;
                            this.pojoTotalCount = res.data.pojoTotalCount;
                            this.pageCount = res.data.pojoTotalCount;
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
            this.getDetails(this.types ,this.staType,1,0);
        },
        // 改变页数
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageIndex = val;
            this.getDetails(this.types ,this.staType,1,0);
        },
        // 下载表格
        getDownload:function(type) {
            var obj = {
                sign:this.token,
                month:this.dayDate,
                staType:this.staType,
                orderColumn :this.orderColumn,
                direction :this.direction
            }
            
            if(this.cloneAreaId!=='') {
                obj.systemId = this.cloneAreaId
            }
            if(this.cloneBvId!=='') {
                obj.bvId = this.cloneBvId
            }
            if(this.cloneKeyword!=='') {
                obj.keyword = this.cloneKeyword.trim()
            }

            if(type == 1) {
                this.isShow1 = true;
                this.$http.get("/quotaService/quota/outSubstation",{
                    params:obj
                }).then((res) => {
                    if (res.status == 200) {
                        window.location =res.request.responseURL;
                    }
                    }).catch(function(error) {
                    console.log(error);
                });
            } else if(type == 2) {
                this.isShow2 = true;
                this.$http.get("/quotaService/quota/outBusbarsection",{
                    params:obj
                }).then((res) => {
                    if (res.status == 200) {
                        window.location =res.request.responseURL;
                    }
                    }).catch(function(error) {
                    console.log(error);
                });
            } else if(type == 3) {
                this.isShow3 = true;
                this.$http.get("/quotaService/quota/outAclinesegment",{
                    params:obj
                }).then((res) => {
                    if (res.status == 200) {
                        window.location =res.request.responseURL;
                    }
                    }).catch(function(error) {
                    console.log(error);
                });
            } else if(type == 4) {
                this.isShow4 = true;
                this.$http.get("/quotaService/quota/outPowerTransformer",{
                    params:obj
                }).then((res) => {
                    if (res.status == 200) {
                        window.location =res.request.responseURL;
                    }
                    }).catch(function(error) {
                    console.log(error);
                });
            } else if(type == 5) {
                this.isShow5 = true;
                this.$http.get("/quotaService/quota/outMeter",{
                    params:obj
                }).then((res) => {
                    if (res.status == 200) {
                        window.location =res.request.responseURL;
                    }
                    }).catch(function(error) {
                    console.log(error);
                });
            } 
        },
        searcharDetails() {
            this.cloneAreaId = this.areaId
            this.cloneBvId = this.bvId
            this.cloneKeyword = this.keyword
            this.getDetails(this.types ,this.staType,0,0);
        }
    }
}
</script>

<style lang="css">
</style>
    