<template lang="html">
    <div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table" style="table-layout: auto">
            <thead>
                <tr>
                    <td colspan="6">采集汇总</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>厂站总数:</td>
                <td class="clickable" @click="getDetails(1,1,0)">{{acquiredSubstationCount}}</td>
                <td>采集成功:</td>
                <td class="clickable" @click="getDetails(1,2,0)">{{successSubstationCount}}</td>
                <td>采集异常:</td>
                <td class="clickable" @click="getDetails(1,3,0)">{{unSuccessSubstationCount}}</td>
            </tr>
            <tr>
                <td>电表总数:</td>
                <td class="clickable" @click="getDetails(2,1,0)">{{acquiredMeterCount}}</td>
                <td>采集总数:</td>
                <td class="clickable" @click="getDetails(2,2,0)">{{successMeterCount}}</td>
                <td>采集失败:</td>
                <td class="clickable" @click="getDetails(2,3,0)">{{unSuccessMeterCount}}</td>
            </tr>
            </tbody>
        </table>
        <!---->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
            <thead>
                <tr>
                    <td colspan="6">事件汇总</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>电表轮换:</td>
                    <td class="clickable" @click="getDetails(3,1,0)">{{meterChangedLogsVOLength}}</td>
                    <td>更换 CT/PT:</td>
                    <td class="clickable" @click="getDetails(4,1,0)">{{ctPtChangedLogsLength}}</td>
                    <td>旁路事件:</td>
                    <td>0</td>
                    </tr>
            </tbody>
        </table>
        <!-- 点击数字弹框获取厂站详情 -->
        <overlay :close.sync="isShowt1">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                  <h2 class="clearfix">厂站详情
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
                              <option :value="item.bvId" :key="index" v-for="(item,index) in bvIdAll">{{item.dydj}}kV</option>
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
                                    <th>序号</th>
                                    <th style="position: relative;">所属地区
                                      <div class="common_sort">
                                          <span class="positive_sequence" @click="orderColumn='systemName';direction=1;getDetails(bvIdTc,types,1,0)"></span>
                                          <span class="reverse_order" @click="orderColumn='systemName';direction=0;getDetails(bvIdTc,types,1,0)"></span>
                                      </div>
                                    </th>
                                    <th style="position: relative;">厂站名称
                                      <div class="common_sort">
                                        <span class="positive_sequence" @click="orderColumn='name';direction=1;getDetails(bvIdTc,types,1,0)"></span>
                                        <span class="reverse_order" @click="orderColumn='name';direction=0;getDetails(bvIdTc,types,1,0)"></span>
                                      </div>
                                    </th>
                                    <th style="position: relative;">电压等级
                                      <div class="common_sort">
                                        <span class="positive_sequence" @click="orderColumn='bvName';direction=1;getDetails(bvIdTc,types,1,0)"></span>
                                        <span class="reverse_order" @click="orderColumn='bvName';direction=0;getDetails(bvIdTc,types,1,0)"></span>
                                      </div>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="scroll5" style="position:relative;height:351px;overflow:hidden;">
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
                  <h2 class="clearfix">电表详情
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
                                  <option :value="item.bvId" :key="index" v-for="(item,index) in bvIdAll">{{item.dydj}}kV</option>
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
                                    <th>序号</th>
                                    <th style="position: relative;">所属地区
                                      <div class="common_sort">
                                        <span class="positive_sequence" @click="orderColumn='systemName';direction=1;getDetails(bvIdTc,types,1,0)"></span>
                                        <span class="reverse_order" @click="orderColumn='systemName';direction=0;getDetails(bvIdTc,types,1,0)"></span>
                                      </div>
                                    </th>
                                    <th style="position: relative;">所属厂站
                                      <div class="common_sort">
                                        <span class="positive_sequence" @click="orderColumn='stName';direction=1;getDetails(bvIdTc,types,1,0)"></span>
                                        <span class="reverse_order" @click="orderColumn='stName';direction=0;getDetails(bvIdTc,types,1,0)"></span>
                                      </div>
                                    </th>
                                    <th style="position: relative;">电压等级
                                      <div class="common_sort">
                                        <span class="positive_sequence" @click="orderColumn='bvName';direction=1;getDetails(bvIdTc,types,1,0)"></span>
                                        <span class="reverse_order" @click="orderColumn='bvName';direction=0;getDetails(bvIdTc,types,1,0)"></span>
                                      </div>
                                    </th>
                                    <th style="position: relative;">电表名称
                                      <div class="common_sort">
                                        <span class="positive_sequence" @click="orderColumn='name';direction=1;getDetails(bvIdTc,types,1,0)"></span>
                                        <span class="reverse_order" @click="orderColumn='name';direction=0;getDetails(bvIdTc,types,1,0)"></span>
                                      </div>
                                    </th>
                                    <th style="position: relative;">最后采集时间
                                      <div class="common_sort">
                                        <span class="positive_sequence" @click="orderColumn='lastAcquiredTime';direction=1;getDetails(bvIdTc,types,1,0)"></span>
                                        <span class="reverse_order" @click="orderColumn='lastAcquiredTime';direction=0;getDetails(bvIdTc,types,1,0)"></span>
                                      </div>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                      </div>
                      <div class="scroll6" style="position:relative;height:360px;overflow:hidden;">
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
        <!-- 点击数字弹框获取电表轮换详情 -->
        <overlay :close.sync="isShowt3">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">电表轮换详情
                        <button @click="getDownload(3)" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div class="tc_count_tool clearfix">
                        <ul class="clearfix">
                            <li>
                                <label>电表名称:</label>
                                <input v-model="keyword" type="text" placeholder="请输入电表名称" class="txt">
                            </li>
                        </ul>
                        <button @click="searcharDetails()">查询</button>
                    </div>
                    <div>
                      <div>
                          <table class="table" style="table-layout: auto;">
                              <thead>
                                  <tr>
                                      <td width="4%" rowspan="2">序号</td>
                                      <td rowspan="2" width="21%">电表</td>
                                      <td rowspan="2" width="12%">更换时间</td>
                                      <td rowspan="2" width="7%">倍率</td>
                                      <td colspan="4" width="28%">更换前</td>
                                      <td colspan="4" width="28%">更换后</td>
                                  </tr>
                                  <tr>
                                      <td width="7%">正向有功</td>
                                      <td width="7%">反向有功</td>
                                      <td width="7%">正向无功</td>
                                      <td width="7%">反向无功</td>
                                      <td width="7%">正向有功</td>
                                      <td width="7%">反向有功</td>
                                      <td width="7%">正向无功</td>
                                      <td width="7%">反向无功</td>
                                  </tr>
                              </thead>
                          </table>
                      </div>
                      <div class="scroll7" style="position:relative;height:351px;overflow:hidden;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                              <tbody>
                                  <tr v-for="(item,index) in wcjmxAry">
                                      <td width="4%">{{index+1}}</td>
                                      <td width="21%">{{item.meter}}</td>
                                      <td width="12%">{{item.lastrefreshtime}}</td>
                                      <td width="7%">{{item.rate}}</td>
                                      <td width="7%">{{item.pap1viewbefore}}</td>
                                      <td width="7%">{{item.rap1viewbefore}}</td>
                                      <td width="7%">{{item.prp1viewbefore}}</td>
                                      <td width="7%">{{item.rrp1viewbefore}}</td>
                                      <td width="7%">{{item.pap1viewafter}}</td>
                                      <td width="7%">{{item.rap1viewafter}}</td>
                                      <td width="7%">{{item.prp1viewafter}}</td>
                                      <td width="7%">{{item.rrp1viewafter}}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                </div>
                <loading :isLoading='loading'></loading>
            </div>
        </overlay>
        <!-- 点击数字弹框获取ct/pt详情 -->
        <overlay :close.sync="isShowt4">
            <div class="overlay_tc_count"> 
                <div class="tc_count_title">
                    <h2 class="clearfix">更换CT/PT详情
                        <button @click="getDownload(4)" class="warning">下载</button>
                    </h2>
                </div>
                <div class="tc_count_body">
                    <div class="tc_count_tool clearfix">
                        <ul class="clearfix">
                            <li>
                                <label>电表名称:</label>
                                <input v-model="keyword" type="text" placeholder="请输入电表名称" class="txt">
                            </li>
                        </ul>
                        <button @click="searcharDetails()">查询</button>
                    </div>
                    <div>
                      <div>
                          <table class="table" style="table-layout: auto;">
                              <thead>
                                  <tr>
                                      <td width="4%" rowspan="2">序号</td>
                                      <td rowspan="2" width="20%">电表</td>
                                      <td rowspan="2" width="12%">更换时间</td>
                                      <td colspan="4" width="32%">更换前</td>
                                      <td colspan="4" width="32%">更换后</td>
                                  </tr>
                                  <tr>
                                      <td width="8%">CT1</td>
                                      <td width="8%">PT1</td>
                                      <td width="8%">CT2</td>
                                      <td width="8%">PT2</td>
                                      <td width="8%">CT1</td>
                                      <td width="8%">PT1</td>
                                      <td width="8%">CT2</td>
                                      <td width="8%">PT2</td>
                                  </tr>
                              </thead>
                          </table>
                      </div>
                      <div class="scroll8" style="position:relative;height:351px;overflow:hidden;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                              <tbody>
                                  <tr v-for="(item,index) in wcjmxAry">
                                      <td width="4%">{{index+1}}</td>
                                      <td  width="20%">{{item.meter}}</td>
                                      <td width="12%">{{item.occurTime}}</td>
                                      <td width="8%">{{item.oldCt1}}</td>
                                      <td width="8%">{{item.oldPt1}}</td>
                                      <td width="8%">{{item.oldCt2}}</td>
                                      <td width="8%">{{item.oldPt2}}</td>
                                      <td width="8%">{{item.newCt1}}</td>
                                      <td width="8%">{{item.newPt1}}</td>
                                      <td width="8%">{{item.newCt2}}</td>
                                      <td width="8%">{{item.newPt2}}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                </div>
                <loading :isLoading='loading'></loading>
            </div>
        </overlay>
    </div>
</template>

<script>
import overlay from "@/components/common/overlay";
import $bvId from "../../../../assets/config/bvidMap";
import $areaId from "../../../../assets/config/areaMap";
import loading from "@/components/common/loading"
import BScroll from 'better-scroll'
export default {
  data: function() {
    return {
      token: "",
      covtable: "",
      successtable:'',
      aclineSummary: "",
      busbarSummary: "",
      meterSummary: "",
      substationSummary: "",
      transformerSummary: "",
      acquiredSubstationCount: "",
      successMeterCount: "",
      successSubstationCount: "",
      acquiredMeterCount: "",
      unSuccessSubstationCount: "",
      unSuccessMeterCount: "",
      meterChangedLogsVO: "",
      ctPtChangedLogs: "",
      meterChangedLogsVOLength: "",
      ctPtChangedLogsLength: "",
      isShowt1: false, //控制点击数字弹框
      isShowt2: false, //
      isShowt3: false, //
      isShowt4: false, //
      wcjmxAry: [],
      pageSize: 10,
      pageIndex: 1,
      types: "",
      pojoTotalCount: null,
      pageCount: null,
      bvIdAll: "",
      bvId: "",
      areaIdAll: "",
      areaId: "",
      keyword: "",
      cloneBvId: "",
      cloneAreaId: "",
      cloneKeyword: "",
      loading:true,
      orderColumn:'systemName',
      direction:0
    };
  },
  props: ['successtables','dayDate','month','changIndex'],
  watch: {
    successtables: {
      handler(news) {
        this.successtable = this.successtables
        this.powerInformation();
      }
    },
    changIndex: {
      handler(news) {
        this.getEventSummary();
      }
    }
  },
  components: {
    overlay,
    loading
  },
  created: function() {
    this.token = sessionStorage.getItem("accessToken");
    if (
      sessionStorage.getItem("systemId") &&
      !isNaN(sessionStorage.getItem("systemId"))
    ) {
      $areaId.forEach(item => {
        if (item.areaId == sessionStorage.getItem("systemId")) {
          this.areaIdAll = [item];
        }
      });
    } else {
      this.areaIdAll = $areaId;
    }
    this.getEventSummary();
  },
  mounted: function() {
    this.bvIdAll = $bvId;
    // this.$nextTick(() => {
		// 	let scroll5 = new BScroll('.scroll5', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
		// 	let scroll6 = new BScroll('.scroll6', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
		// 	let scroll7 = new BScroll('.scroll7', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
		// 	let scroll8 = new BScroll('.scroll8', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
		// })
  },
  methods: {
    // 采集覆盖率电网信息
    powerInformation: function() {
      var acquiredSubstationCount = 0,
        successMeterCount = 0,
        acquiredMeterCount = 0,
        successSubstationCount = 0,
        unSuccessSubstationCount = 0,
        unSuccessMeterCount = 0;

      if (
        sessionStorage.getItem("systemId") &&
        !isNaN(sessionStorage.getItem("systemId"))
      ) {
        if (this.successtable&&this.successtable.length > 0) {
          for (var i = 0; i < this.successtable.length; i++) {
            if (
              this.successtable[i].areaId == sessionStorage.getItem("systemId")
            ) {
              acquiredSubstationCount = this.successtable[i]
                .acquiredSubstationCount;
              successMeterCount = this.successtable[i].successMeterCount;
              acquiredMeterCount = this.successtable[i].acquiredMeterCount;
              successSubstationCount = this.successtable[i]
                .successSubstationCount;
              unSuccessSubstationCount = this.successtable[i]
                .unSuccessSubstationCount;
              unSuccessMeterCount = this.successtable[i].unSuccessMeterCount;
            }
          }
        }
      } else {
        if (this.successtable&&this.successtable.length > 0) {
          for (var i = 0; i < this.successtable.length; i++) {
            acquiredSubstationCount += this.successtable[i]
              .acquiredSubstationCount;
            successMeterCount += this.successtable[i].successMeterCount;
            acquiredMeterCount += this.successtable[i].acquiredMeterCount;
            successSubstationCount += this.successtable[i]
              .successSubstationCount;
            unSuccessSubstationCount += this.successtable[i]
              .unSuccessSubstationCount;
            unSuccessMeterCount += this.successtable[i].unSuccessMeterCount;
          }
        }
      }
      this.acquiredSubstationCount = acquiredSubstationCount;
      this.acquiredMeterCount = acquiredMeterCount;
      this.successSubstationCount = successSubstationCount;
      this.successMeterCount = successMeterCount;
      this.unSuccessSubstationCount = unSuccessSubstationCount;
      this.unSuccessMeterCount = unSuccessMeterCount;
    },
    getDetails: function(bvIdTc, type, flag, flags) {
      this.loading =true
      if (flag == 0) {
        this.pojoTotalCount = null;
        this.pageCount = null;
        this.wcjmxAry = [];
        this.pageSize = 10;
        this.pageIndex = 1;
        this.orderColumn="systemName"
        this.direction=0
      }
      if (flags == undefined) {
        this.areaId = "";
        this.bvId = "";
        this.keyword = "";
        this.cloneAreaId = "";
        this.cloneBvId = "";
        this.cloneKeyword = "";
      }
      this.bvIdTc = bvIdTc;
      this.types = type;
      var obj = {
        sign: this.token,
        day: this.dayDate,
        type: type,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        orderColumn :this.orderColumn,
        direction :this.direction
      };

      if (this.cloneAreaId !== "") {
        obj.systemId = this.cloneAreaId;
      }
      if (this.cloneBvId !== "") {
        obj.bvId = this.cloneBvId;
      }
      if (this.cloneKeyword !== "") {
        obj.keyword = this.cloneKeyword.trim();
      }

      if (bvIdTc == 1) {
        this.isShowt1 = true;
        this.$http
          .get("/quotaService/quota/getSubstationBriefDay", {
            params: obj
          })
          .then(res => {
            if (res.status == 200) {
              if(res.data.code == 1) {
                var briefs = res.data.data.substationBriefs;
                this.pojoTotalCount = res.data.pojoTotalCount;
                this.pageCount = res.data.pojoTotalCount;
                this.wcjmxAry = briefs;
                if (briefs.length > 0) {
                  this.wcjmxAry = briefs;
                }
                this.loading =false
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (bvIdTc == 2) {
        this.isShowt2 = true;
        this.$http
          .get("/quotaService/quota/getMeterBriefDay", {
            params: obj
          })
          .then(res => {
            if (res.status == 200) {
              if(res.data.code == 1) {
                var briefs = res.data.data.briefs;
                this.pojoTotalCount = res.data.pojoTotalCount;
                this.pageCount = res.data.pojoTotalCount;
                this.wcjmxAry = briefs;
                this.loading =false
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (bvIdTc == 3) {
        this.isShowt3 = true;
        var obj = {
          sign: this.token,
          // month: this.month,
          month: this.$day().format('YYYY-MM')
        };
        if (this.cloneKeyword !== "") {
          obj.keyword = this.cloneKeyword.trim();
        }
        this.$http
          .get("/quotaService/quota/getMeterChangedLog", {
            params: obj
          })
          .then(res => {
            if (res.status == 200) {
              if(res.data.code == 1) {
                this.meterChangedLogsVO = res.data.data.meterChangedLogsVO;
                this.wcjmxAry = this.meterChangedLogsVO;
                this.loading =false
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        console.log(this.wcjmxAry);
      } else if (bvIdTc == 4) {
        this.isShowt3 = false;
        this.isShowt4 = true;
        var obj = {
          sign: this.token,
          // month: this.month,
          month: this.$day().format('YYYY-MM')
        };
        if (this.cloneKeyword !== "") {
          obj.keyword = this.cloneKeyword.trim();
        }
        this.$http
          .get("/quotaService/quota/getCtptChangedLog", {
            params: obj
          })
          .then(res => {
            if (res.status == 200) {
              if(res.data.code == 1) {
                this.ctPtChangedLogs = res.data.data.ctPtChangedLogs;
                this.wcjmxAry = this.ctPtChangedLogs;
                this.loading =false
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // 改变当前页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getDetails(this.bvIdTc, this.types, 1, 0);
    },
    // 改变页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getDetails(this.bvIdTc, this.types, 1, 0);
    },
    // 事件汇总
    getEventSummary: function(type) {
      var obj = {
        sign: this.token,
        // month: this.month,
        month: this.$day().format('YYYY-MM')
      };
      this.$http
        .get("/quotaService/quota/getMeterChangedLog", {
          params: obj
        })
        .then(res => {
          if (res.status == 200) {
            if(res.data.code == 1) {
              this.meterChangedLogsVOLength = res.data.data.meterChangedLogsVO.length;
              this.$emit("status",true)
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      this.$http
        .get("/quotaService/quota/getCtptChangedLog", {
          params: obj
        })
        .then(res => {
          if (res.status == 200) {
            if(res.data.code == 1){
              this.ctPtChangedLogsLength = res.data.data.ctPtChangedLogs.length;
              this.$emit("status",true)
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 下载弹窗表格
    getDownload: function(type) {
      var obj = {
        sign: this.token,
        day: this.dayDate,
        type: this.types
      };

      if (this.cloneAreaId !== "") {
        obj.systemId = this.cloneAreaId;
      }
      if (this.cloneBvId !== "") {
        obj.bvId = this.cloneBvId;
      }
      if (this.cloneKeyword !== "") {
        obj.keyword = this.cloneKeyword.trim();
      }

      if (type == 1) {
        this.$http
          .get("/quotaService/quota/outSubstationBriefDay", {
            params: obj
          })
          .then(res => {
            window.location = res.request.responseURL;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (type == 2) {
        this.$http
          .get("/quotaService/quota/outMeterBriefDay", {
            params: obj
          })
          .then(res => {
            window.location = res.request.responseURL;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (type == 3) {
        var obj = {
          sign: this.token,
          month: this.month
        };
        if (this.cloneKeyword !== "") {
          obj.keyword = this.cloneKeyword.trim();
        }
        this.$http
          .get("/quotaService/quota/outMeterChangedLog", {
            params: obj
          })
          .then(res => {
            if (res.status == 200) {
              window.location = res.request.responseURL;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (type == 4) {
        var obj = {
          sign: this.token,
          month: this.month
        };
        if (this.cloneKeyword !== "") {
          obj.keyword = this.cloneKeyword.trim();
        }
        this.$http
          .get("/quotaService/quota/outCtptChangedLog", {
            params: obj
          })
          .then(res => {
            if (res.status == 200) {
              window.location = res.request.responseURL;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    searcharDetails() {
      this.cloneAreaId = this.areaId;
      this.cloneBvId = this.bvId;
      this.cloneKeyword = this.keyword;
      this.getDetails(this.bvIdTc, this.types, 0, 0);
    }
  }
};
</script>

<style lang="css">
</style>
