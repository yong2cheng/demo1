<template>
  <div class="wrap">
        <router-view/>
        <div class="mxian_succ">
            <div class="timeWrap">
                <ul>
                    <li class="tabChose">
                        <span id="toMon" class="activeColor">月数据</span>
                        <span id="toDay">日数据</span>
                    </li>
                </ul>
                <ul class="timeSwitch">
                    <li>
                        <input class="datainp wicon" id="month" type="text" placeholder="选择月日期" style="height:33px;margin-top:0px"></li>
                    <li style="display:none">
                        <input class="workinput wicon" id="ymd02" type="text" placeholder="选择天日期" style="height:33px;margin-top:0px"></li>
                    <li>
                        <button type="button" name="button" class="icon-search search_butt" style="width:33px;" id="timeBtn"></button>
                    </li>
                </ul>
            </div>
            <div class="cjxq_bar" id="app1" style="margin-top:5px; height:auto">
                <!-- 还原列表弹框 -->
                <div class="restore" v-if="showHis">
                    <div class="tkzz"></div>
                    <div class="nrhezi">
                        <div class="close" title="关闭" @click="showHis=false"></div>
                        <div class="logWrap">
                            <div class="hisTable">
                                <table class="historyLogs">
                                    <thead>
                                        <tr>
                                            <td width="10%">勾选</td>
                                            <td width="5%">序列</td>
                                            <td width="17%">原始底码p+</td>
                                            <td width="17%">原始底码p-</td>
                                            <td width="17%">修改后底码p+</td>
                                            <td width="17%">修改后底码p-</td>
                                            <td width="17%">修改时间</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in hisLogs" :key="index">
                                            <td>
                                                <input type="radio" id="one" :value="item" v-model="picked"></td>
                                            <td>{{index + 1}}</td>
                                            <td>{{item.originPap}}</td>
                                            <td>{{item.originRap}}</td>
                                            <td>{{item.newPap}}</td>
                                            <td>{{item.newRap}}</td>
                                            <td>{{item.occurTimeStr}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="btnWrap">
                            <button type="button" class="anniu_bl" @click="clearPicked();">取消</button>
                            <button type="button" class="anniu_bl" @click="goBackLogs();">还原</button>
                        </div>
                    </div>
                </div>
                <!-- 还原列表弹框END-->
                <div class="dbqx_title">
                    <span class="dbqx_time">{{day}}</span>
                    <span class="jld_butt devName" :title="exceptData.pathName">{{exceptData.pathName}}</span>
                </div>
                <div class="znyp_dbqx_data">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td>待消缺:</td>
                                <td>
                                    <span class="erro_color">{{exceptData.untreatedExceptRate?exceptData.untreatedExceptRate:0}}</span>
                                </td>
                                <td>母平：</td>
                                <td>
                                    <span>{{(exceptData.busbarLossRate*100?exceptData.busbarLossRate*100:0).toFixed(2)}}%</span>
                                </td>
                                <td>分线：</td>
                                <td>
                                    <span>{{(exceptData.aclineLossRate*100?exceptData.aclineLossRate*100:0).toFixed(2)}}%</span>
                                </td>
                                <td>分压</td>
                                <td>
                                    <span class="erro_color">{{exceptData.transformerLossRate*100?exceptData.transformerLossRate*100:0}}%</span>
                                </td>
                                <td>本月异常发生:</td>
                                <td>
                                    <span>{{exceptData.exceptCount?exceptData.exceptCount:0}}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>已消缺：</td>
                                <td>
                                    <span>{{exceptData.treatedExceptRate?exceptData.treatedExceptRate:0}}                                  
                                </td>
                                <template v-if="erroTypeSzie<6">
                                    <td v-for="(item,index) in exceptData.exceptionDeals" :key="index">
                                        {{item.exceptName}}：<span>{{item.treatedExceptCount}}/{{item.untreatedExceptCount}}</span>
                                    </td>
                                    <td v-for="(n,i) in (6 - erroTypeSzie)" :key="i"></td>
                                </template>
                                <template v-else>
                                    <td v-for="(item,index) in exceptData.exceptionDeals" :key="index">
                                        {{item.exceptName}}：<span>{{item.treatedExceptCount}}/{{item.untreatedExceptCount}}</span>
                                    </td>
                                </template>
                                <td>本月异常处理：</td>
                                <td>
                                    <span>{{exceptData.exceptHandledCount?exceptData.exceptHandledCount:0}}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="f_r" style="margin-top: 15px;;">
                    <li class="frbutt" @click="saveData();updateStatus()">
                        <i class="icon-baocun an_icon"></i>保存</li>
                    <li class="frbutt" @click="restoreDate();showHis =true;">
                        <i class="icon-huanyuan an_icon"></i>还原</li>
                </ul>
            </div>
            <!--左边-->
            <div class="shudata" style=" width:0; height: 500px !important; min-height: auto;">
                <!--折叠按钮-->
                <div class="l_r_butt" style="background-position: -82px -255px;"></div>
                <div class="st_tree scrollbox" style="height:485px; overflow: hidden;">
                    <div id="tq_treesDatas"></div>
                </div>
            </div>
            <!--左边END-->
            <!--右边-->
            <div class="sjtjbox" style="width:97%">
                <div class="sjli sjlinow" id="app2">
                    <!--数据评估曲线-->
                    <div class="tjsj_l f_l scrollbox" style="width:78%;  height:550px;">
                        <div class="sjbg " style=" width:100%;float: none !important; height: 550px;" id="dbpgqx_data">
                            <div id="pap_chart"></div>
                            <div id="area_one"></div>
                            <div id="rap_chart"></div>
                            <div id="area_tow"></div>
                        </div>
                    </div>
                    <!--数据评估曲线end-->
                    <div class="tjsj_l f_r" style="width:20%;">
                        <div class="sjbg" style="height:500px; margin-top:5px;text-align:center;position:relative;">
                            <div class="bubbly" v-if="bubbly"><span>数据已重置</span></div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:0" class="rightTable">
                                <thead>
                                    <tr>
                                        <td @click="switchTariff=true;switchTariffs();" :class="switchTariff ? 'switch':''">
                                            <label><input type="radio" checked name="switch"> 上表码</label>
                                        </td>
                                        <td @click="switchTariff=false;switchTariffs();" :class="!switchTariff ? 'switch':''">
                                            <label><input type="radio" name="switch"> 下表码</label>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="50%">P+</td>
                                        <td width="50%">P-</td>
                                    </tr>
                                </thead>
                                <template v-if="switchTariff">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>{{fmtNum(mainUperTariffPaps)}}</span>
                                            </td>
                                            <td>
                                                <span>{{fmtNum(mainUperTariffRaps)}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                                <template v-else>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>{{fmtNum(mainLowerTariffPaps)}}</span>
                                            </td>
                                            <td>
                                                <span>{{fmtNum(mainLowerTariffRaps)}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                                <thead>
                                    <tr>
                                        <td colspan="2">主表数据（电量）</td>
                                    </tr>
                                    <tr>
                                        <td width="50%">P+</td>
                                        <td width="50%">P-</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th style="border-bottom:none" class="zb_pz">
                                            <!--<span>135.324</span>-->
                                            <input type="text" v-model="zerop" @focus="fous=false;bubly=1" @blur="fous=true;bubly=3" @change="pPlus()" />
                                            <div class="xzts" v-show='!fous && bubly==1'>
                                                <ul>
                                                    <li><span :title="lossRateBus*100+'%'">母平：{{(lossRateBus*100).toFixed(2)}}%</span><i :class="(lossRateBus-RateBus) < 0?'icon-down':'icon-up red'"></i><span :title="differBu()*100+'%'">{{differBu()*100}}%</span></li>
                                                    <li>线损：{{lossRateAc*100}}%<i :class="(lossRateAc-RateAc)<0?'icon-down':'icon-up red'"></i>{{differAc*100}}%</li>
                                                </ul>
                                            </div>
                                        </th>
                                        <th style="border-bottom:none" class="zb_pf">
                                            <!--<span>24.3</span>-->
                                            <input type="text" v-model="zeroj" @focus="fous=false;bubly=2" @blur="fous=true;bubly=3" @change="pPrev()" />
                                            <div class="xzts" v-show='!fous && bubly==2'>
                                                <ul>
                                                    <li><span :title="lossRateBus*100+'%'">母平：{{(lossRateBus*100).toFixed(2)}}%</span><i :class="(lossRateBus-RateBus) < 0?'icon-down':'icon-up red'"></i><span :title="differBu()*100+'%'">{{differBu()*100}}%</span></li>
                                                    <li>线损：{{lossRateAc*100}}%<i :class="(lossRateAc-RateAc)<0?'icon-down':'icon-up red'"></i>{{differAc*100}}%</li>
                                                </ul>
                                            </div>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="float:left; width:100%; height:316px" class="scrollbox">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="rightTable">
                                    <thead>
                                        <tr>
                                            <td colspan="2">预估结果（零点冻结值）</td>
                                        </tr>
                                        <tr>
                                            <td width="50%">P+</td>
                                            <td width="50%">P-</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>{{fmtNum(rightTable.estimateTariffPap)}}</span>
                                                <i class="icon-up th_an_z" title="替代主数据" @click="clickPapPlus(rightTable.estimateTariffPap,3);"></i>
                                            </td>
                                            <td>
                                                <span>{{fmtNum(rightTable.estimateTariffRap)}}</span>
                                                <i class="icon-up th_an_f" title="替代主数据" @click="clickRapPrev(rightTable.estimateTariffRap,3);"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <td colspan="2">预估结果（电量）</td>
                                        </tr>
                                        <tr>
                                            <td width="50%">P+</td>
                                            <td width="50%">P-</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>{{fmtNum(rightTable.estimateElecPap)}}</span>
                                                <i class="icon-up th_an_z" title="替代主数据" @click="clickPlus(rightTable.estimateElecPap,1);"></i>
                                            </td>
                                            <td>
                                                <span>{{fmtNum(rightTable.estimateElecRap)}}</span>
                                                <i class="icon-up th_an_f" title="替代主数据" @click="clickPrev(rightTable.estimateElecRap,1);"></i>
                                            </td>

                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <td colspan="2">副表数据（电量）</td>
                                        </tr>
                                        <tr>
                                            <td width="50%">P+</td>
                                            <td width="50%">P-</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>{{fmtNum(rightTable.secondElecPap)}}</span>
                                                <i class="icon-up th_an_z" title="替代主数据" @click="clickPlus(rightTable.secondElecPap,4);;"></i>
                                            </td>
                                            <td>
                                                <span>{{fmtNum(rightTable.secondElecRap)}}</span>
                                                <i class="icon-up th_an_f" title="替代主数据" @click="clickPrev(rightTable.secondElecRap,4);"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <td colspan="2">功率积分电量</td>
                                        </tr>
                                        <tr>
                                            <td width="50%">P+</td>
                                            <td width="50%">P-</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>{{fmtNum(rightTable.powerIntegrationPap)}}</span>
                                                <i class="icon-up th_an_z" title="替代主数据" @click="clickPlus(rightTable.powerIntegrationPap,2);"></i>
                                            </td>
                                            <td>
                                                <span>{{fmtNum(rightTable.powerIntegrationRap)}}</span>
                                                <i class="icon-up th_an_f" title="替代主数据" @click="clickPrev(rightTable.powerIntegrationRap,2);"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <td colspan="2">对端数据</td>
                                        </tr>
                                        <tr>
                                            <td width="50%">P+</td>
                                            <td width="50%">P-</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>{{fmtNum(rightTable.endtoEndDataPap)}}</span>
                                                <i class="icon-up th_an_z" title="替代主数据" @click="clickPlus(rightTable.endtoEndDataPap,3);"></i>
                                            </td>
                                            <td>
                                                <span>{{fmtNum(rightTable.endtoEndDataRap)}}</span>
                                                <i class="icon-up th_an_f" title="替代主数据" @click="clickPrev(rightTable.endtoEndDataRap,3);"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!--END-->
            </div>
            <!--右边END-->
        </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
