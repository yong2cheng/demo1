
<template>
  <div @click="isFocus=false;">
      <div> 
          <div class="tc_count_body" style="border: 0">
              <div class="tc_count_tool clearfix">
                <ul class="clearfix">
                    <li>
                        <label>所属地区:</label>
                        <select v-model="systemId">
                            <option value="">所有地区</option>
                            <option v-for="(item,index) in areaArr" :value="item.areaId" :key="index">
                                {{item.areaName}}
                            </option>
                        </select>
                    </li>
                    <li style="display: inline-block;position: relative;margin-right: 15px;">
                        <label>厂站名称:</label>
                        <input v-model="substationName" @click.stop="clickInput()" placeholder="厂站定位" type="text" class="txt">
                        <div v-show="isFocus" style="position:absolute;background:#012323;height:200px;width:172px;border-radius:5px;overflow:hidden;z-index:100;left: 66px;" class="subStationScroll">
                            <ul>
                                <li @click.stop="isFocus=false;substationStId=item.mrid;substationName=item.pathName;" 
                                :key="index" 
                                v-for="(item,index) in substations"
                                :title="item.pathName">
                                    {{item.pathName}}
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <label>设备类型:</label>
                        <select v-model="sblxs">
                            <option value="">选择设备类型</option>
                            <option value="机组(风、火电)">机组(风、火电)</option>
                            <option value="机组(风、蓄能)">机组(风、蓄能)</option>
                            <option value="机组(主变)">机组(主变)</option>
                            <option value="母线">母线</option>
                            <option value="开关">开关</option>
                            <option value="刀闸">刀闸</option>
                            <option value="电容器">电容器</option>
                            <option value="电抗器">电抗器</option>
                            <option value="电流互感器">电流互感器</option>
                            <option value="电压互感器">电压互感器</option>
                            <option value="调相机">调相机</option>
                            <option value="避雷针">避雷针</option>
                            <option value="阻波器">阻波器</option>
                            <option value="考核母线">考核母线</option>
                            <option value="真流设备">真流设备</option>
                            <option value="线路">线路</option>
                            <option value="换流变">换流变</option>
                            <option value="真流接地级">真流接地级</option>
                            <option value="交流滤波器">交流滤波器</option>
                            <option value="真流滤波器">真流滤波器</option>
                        </select>
                    </li>
                    <li>
                        <label>设备状态:</label>
                        <select v-model="sbzts">
                            <option value="">选择设备状态</option>
                            <option value="转检修">转检修</option>
                            <option value="转冷备用">转冷备用</option>
                            <option value="停用">停用</option>
                            <option value="退出">退出</option>
                            <option value="加用">加用</option>
                            <option value="转运行">转运行</option>
                            <option value="拉开">拉开</option>
                            <option value="合上">合上</option>
                            <option value="转极隔离">转极隔离</option>
                        </select>
                    </li>
                    <li>
                        <label>检修票状态:</label>
                        <select v-model="jxzts">
                            <option value="">选择检修票状态</option>
                            <option value="2">已开工</option>
                            <option value="3">已完工</option>
                        </select>
                    </li>
                    <li>
                        <label>关联状态:</label>
                        <select v-model="glzts">
                            <option value="">选择关联状态</option>
                            <option value="0">未关联</option>
                            <option value="1">已关联</option>
                        </select>
                    </li>
                    <li>
                        <label>日期:</label>
                        <el-date-picker
                            class="modified_ate"
                            v-model="times"
                            type="month"
                            value-format="yyyy-MM"
                            placeholder="选择日期">
                        </el-date-picker>
                    </li>
                </ul>
                <button @click="deliveryDetail()">传送</button>
                <button @click="search()">查询</button>
              </div>
              <div class="tc_count_table">
                <div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                        <thead>
                            <tr>
                                <td width="5%">
                                  <input type="checkbox"  v-model='hasCheckAll' @change="checkAll()">
                                    全选
                                </td>
                                <td width="4%">序号</td>
                                <td style="position: relative;">设备名称
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='sbmc';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='sbmc';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                                <td style="position: relative;">计量点名称
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='meterName';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='meterName';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                                <td style="position: relative;">单位名称
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='dwmc';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='dwmc';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                                <td style="position: relative;">所属厂站
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='czmc';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='czmc';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                                <td width="7%" style="position: relative;">电压等级
                                    <div class="common_sort">
                                        <span class="positive_sequence" @click="orderColumn='sbdydj';direction=1;getJxpg()"></span>
                                        <span class="reverse_order" @click="orderColumn='sbdydj';direction=0;getJxpg()"></span>
                                    </div>
                                </td>
                                <td width="7%" style="position: relative;">实际停电操作开始时间
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='sjtdczkssj';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='sjtdczkssj';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                                <td width="7%" style="position: relative;">实际停电操作结束时间
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='sjtdczjssj';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='sjtdczjssj';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                                <td width="7%" style="position: relative;">停电天数
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='tdts';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='tdts';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                                <td width="7%" style="position: relative;">设备类型
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='sblx';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='sblx';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                                <td width="7%" style="position: relative;">设备状态
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='sbzt';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='sbzt';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                                <td width="8%" style="position: relative;">检修票状态
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='jxztName';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='jxztName';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                                <td width="7%" style="position: relative;">关联状态
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='glztName';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='glztName';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                                <td width="7%" style="position: relative;">是否传送
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='sgztName';direction=1;getJxpg()"></span>
                                    <span class="reverse_order" @click="orderColumn='sgztName';direction=0;getJxpg()"></span>
                                  </div>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="status_scroll2">
                    <table class="table">
                      <tbody>
                          <tr v-for="(item,index) in callbackdata" :key="index">
                              <td width="5%">
                                <input type="checkbox" :value="{id:item.id,glzt:item.glzt}" v-model="touyunArr">
                              </td>
                              <td width="4%">{{(pageIndex-1)*pageSize+(index+1)}}</td>
                              <td @click="sbDetail=item;clickDetail()"><span class="color_warning">{{item.sbmc}}</span></td>
                              <td>{{item.meterName}}</td>
                              <td>{{item.dwmc}}</td>
                              <td>{{item.czmc}}</td>
                              <td width="7%">{{item.sbdydj}}</td>
                              <td width="7%">{{item.sjtdczkssj}}
                              <td width="7%">{{item.sjtdczjssj}}</td>
                              <td width="7%">{{item.tdts}}</td>
                              <td width="7%">{{item.sblx}}</td>
                              <td width="7%">{{item.sbzt}}</td>
                              <td width="8%">{{item.jxztName}}</td>
                              <td width="7%" @click="close=true;sbDetail=item;"><span class="color_warning">{{item.glztName}}</span></td>
                              <td width="7%">{{item.sgztName}}</td>
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
          <overlay :close.sync="close">
              <gz :areaArr='areaArr' :bvidArr='bvidArr' :sbDetail='sbDetail' @changeSat="getChild" v-if="close"></gz>
          </overlay>
          <overlay :close.sync="showDetail">
               <div style="width: 700px;height: 520px;margin: 0 10px">
                  <div class="tc_count_title">
                      <h2 class="clearfix">{{this.sbDetail.sbmc}}详情</h2>
                  </div>
                  <div class="tc_count_body">
                      <div class="getdetail_scroll" style="position: relative;height: 400px;overflow: hidden;">
                          <table class="table">
                            <tbody>
                                <tr><td width="25%">计量点名称</td><td>{{sbDetail.meterName}}</td></tr>
                                <tr><td width="25%">计量点ID</td><td>{{sbDetail.meterId}}</td></tr>
                                <tr><td width="25%">设备名称</td><td>{{sbDetail.sbmc}}</td></tr>
                                <tr><td width="25%">设备ID</td><td>{{sbDetail.sbid}}</td></tr>
                                <tr><td width="25%">单位名称</td><td>{{sbDetail.dwmc}}</td></tr>
                                <tr><td width="25%">所属厂站</td><td>{{sbDetail.czmc}}</td></tr>
                                <tr><td width="25%">厂站ID</td><td>{{sbDetail.czid}}</td></tr>
                                <tr><td width="25%">电压等级</td><td>{{sbDetail.sbdydj}}</td></tr>
                                <tr><td width="25%">设备类型</td><td>{{sbDetail.sblx}}</td></tr>
                                <tr><td width="25%">设备状态</td><td>{{sbDetail.sbzt}}</td></tr>
                                <tr><td width="25%">实际停电操作开始时间</td><td>{{sbDetail.sjtdczkssj}}</td></tr>
                                <tr><td width="25%">实际停电操作结束时间</td><td>{{sbDetail.sjtdczjssj}}</td></tr>
                                <tr><td width="25%">停电天数</td><td></td></tr>
                                <tr><td width="25%">检修票状态</td><td>{{sbDetail.jxztName}}</td></tr>
                                <tr><td width="25%">关联状态</td><td>{{sbDetail.glztName}}</td></tr>
                            </tbody>
                          </table>
                        </div>
                  </div>
                  <div style="text-align: center;margin: 10px 0;">
                    <button type="button" class="warning" @click="deliveryDetail(2,sbDetail)" v-if="sbDetail.shzt != 1">是否传送</button>
                </div>
               </div>
          </overlay>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>是否传送这条记录到同期线损</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="conform(1)">传送</el-button>
              <el-button type="primary" @click="conform(2)">不传送</el-button>
            </span>
          </el-dialog>
          <!-- <loading :isLoading='loading'></loading> -->
      </div>
  </div>
</template>

<script>
import qs from "qs";
import BScroll from "better-scroll";
import gz from "../float/gaizao"
import overlay from '@/components/common/overlay'
import area from "@/assets/config/areaMap";
import bvid from "@/assets/config/bvidMap";
import loading from "@/components/common/loading"
export default {
  data() {
    return {
      dialogVisible: false,
      isFocus: false,
      close:false,
      showDetail:false,
      pageSize:10,
      pageIndex:1,
      pojoTotalCount:null,
      pageCount:null,
      ids:[],
      meterId:'',
      meterName:'',
      areaArr: [],
      bvidArr:bvid,
      systemId: "",
      systemIds:'',
      callbackdata:'',
      totalCount:'',
      times:this.$day().format("YYYY-MM"),
      timess:this.$day().format("YYYY-MM"),
      bvId:'',
      substations: [],
      substationStId: "",
      substationStIds: "",
      substationName: "",
      substationNames: "",
      substationsAll: [],
      subStationScroll:'',
      sbDetail:'',
      getdetail_scroll:'',
      status_scroll2:'',
      sblxs:'',
      sbzts:'',
      jxzts:'',
      glzts:'',
      sblxes:'',
      sbztes:'',
      jxztes:'',
      glztes:'',
      loading:true,
      touyunArr:[],
      hasCheckAll: false,
      orderColumn:'sbdydj',
      direction:0
    };
  },
  components:{
      overlay,
      gz,
      loading
  },
  watch: {
    touyunArr: function(news) {
      if (this.touyunArr.length == this.callbackdata.length) {
        this.hasCheckAll = true;
      } else {
        this.hasCheckAll = false;
      }
    },
    // 监听地区变化
    systemId: function() {
      this.substationName = ''
      this.getSubstation();
    },
    // bvId() {
    //   this.getSubstation();
    // },
    // 监听输入厂站名变化
    substationName: function() {
        this.substations = [];
        for (var a of this.substationsAll) {
          if (a.pathName.indexOf(this.substationName) != -1) {
            this.substations.push(a);
          }
        }
      
    }
  },
  created() {
    if (
      sessionStorage.getItem("systemId") &&
      !isNaN(sessionStorage.getItem("systemId"))
    ) {
      area.forEach(item => {
        if (item.areaId == sessionStorage.getItem("systemId")) {
          this.areaArr = [item];
          this.systemId = item.areaId;
        }
      });
    } else {
      this.areaArr = area;
    }
    this.getJxpg();
    this.getSubstation()
  },
  mounted() {
    this.$nextTick(() => {});
   
  },
  methods: {// 获取厂站数据
    getSubstation() {
      this.$http
        .get("/quotaService/quota/getSubstation", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            systemId:this.systemId,
            bvid:this.bvId,
            keyword:this.substationName
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            var data = res.data.data.substations;
            this.substations = data;
            this.substationsAll = data;
          }
        });
    },
    // 获取转检修数据
    getJxpg() {
      this.loading =true
      var obj = {
        sign: sessionStorage.getItem("accessToken"),
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        orderColumn :this.orderColumn,
        direction :this.direction
      }
      if(this.systemIds||this.systemIds === 0) {
        obj.systemId = this.systemIds
      }
      if(this.substationNames == '') {
        this.substationStIds=''
      }
      if(this.substationStIds) {
        obj.stId = this.substationStIds
      }
      if(this.sblxes) {
        obj.sblx = this.sblxes
      }
      if(this.sbztes) {
        obj.sbzt = this.sbztes
      }
      if(this.jxztes) {
        obj.jxzt = this.jxztes
      }
      if(this.glztes) {
        obj.glzt = this.glztes
      }
      if(this.timess) {
        obj.searchDate = this.timess
      }
      this.$http
        .get("/maintenanceService/isInUseEventService/getJxpg", {
          params:obj
        })
        .then(res => {
          if (res.data.code === 1) {
            this.callbackdata = res.data.data.list;
            this.pojoTotalCount = res.data.pojoTotalCount;
            if(this.status_scroll2) {
                this.status_scroll2.destroy()
            }
            this.$nextTick(() => {
                this.status_scroll2 = new BScroll('.status_scroll2', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
            })
            this.loading =false
          }
        });
    },
    // 改变当前页条数
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getJxpg();
    },
    // 改变页数
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageIndex = val;
        this.getJxpg();
    },
    // 点击厂站定位input框
    clickInput() {
      this.isFocus = true;
      if (this.subStationScroll) {
        this.subStationScroll.destroy()
      }
      this.$nextTick(() => {
        this.subStationScroll = new BScroll(".subStationScroll", {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
      });
    },
    // 根据条件筛选得到投运数据
    search() {
      this.pageIndex = 1
      this.systemIds = this.systemId
      this.substationNames = this.substationName
      this.substationStIds = this.substationStId
      this.timess = this.times
      this.sblxes = this.sblxs
      this.sbztes = this.sbzts
      this.jxztes = this.jxzts
      this.glztes = this.glzts
      this.getJxpg();
    },
    // 点击是否传送按钮
    deliveryDetail() {
      if(this.touyunArr == "") {
        this.$notify({
          title: '提示',
          message: '请先勾选要传送的设备',
          duration: 2000,
          type:'warning'
        });
      } else {
        var flag = true
        console.log(this.touyunArr)
        for(var i=0;i<this.touyunArr.length;i++) {
          if(this.touyunArr[i].glzt == 0) {
            this.$notify({
              title: '提示',
              message: '所勾选设备有未关联计量点，请先关联再传送',
              duration: 2000,
              type:'warning'
            });
            flag = false
            break
          } 
        }
        if(flag) {
          var data = []
          for(var i=0;i<this.touyunArr.length;i++) {
            data.push(this.touyunArr[i].id)
          }
          this.ids = data.join()
          // this.ids = data

          this.dialogVisible = true
        }
      }
    },
     // 关闭弹窗提示
     handleClose(done) {
      this.dialogVisible = false
    },
    // 点击弹窗里传送或不传送按钮
    conform(shzt) {
      this.$http
      .post("/maintenanceService/isInUseEventService/updateJxpg?sign="+sessionStorage.getItem('accessToken'),
      qs.stringify({
        shzt: shzt,
        ids: this.ids,
        }))
      .then(res => {
        if (res.data.code === 1) {
          this.dialogVisible = false
          this.showDetail = false
          this.getJxpg()
          this.touyunArr = []
        }
      });
    },
    clickDetail() {
      this.showDetail = true;
      if(this.getdetail_scroll) {
        this.getdetail_scroll.destroy()
      }
      this.$nextTick(() => {
        this.getdetail_scroll = new BScroll(".getdetail_scroll", {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
      });
    },
    // 得到子组件回调事件
    getChild(data) {
        this.close = false
        this.touyunArr = []
        this.getJxpg();
    },
    checkAll() {
      if (this.hasCheckAll) {
        this.touyunArr = [];
        this.callbackdata.forEach(item => {
          this.touyunArr.push({
            id:item.id,
            glzt:item.glzt
          });
        });
        console.log(this. touyunArr)
      } else {
        this.touyunArr = [];
      }
    },
  },
};
</script>

<style>
  .clearfix:after {content:"";height:0;line-height: 0;display: block;visibility: hidden;clear: both;}
.reasonWhy {
  display: inline-block;
  width: 100%;
  max-width: 275px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.status_scroll2{
    position: relative;
    max-height: 380px;
    overflow: hidden;
}
.detail_table {
    min-width: 1340px;
    width: auto;
}
.detail_table th,.detail_table td {white-space: nowrap}
.subStationScroll ul li {
  cursor: pointer;
  height: 30px;
  padding-left: 5px;
  color: #49f5f5;
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  float: none !important;
}
.subStationScroll ul li:hover {color: #fff}
@media (max-width: 1399px) {
  .detail_table {
    min-width: 1155px;
  }
}
</style>
