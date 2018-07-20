
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
                        <div v-show="isFocus" style="position:absolute;background:#012323;height:200px;width:172px;border-radius:5px;overflow:hidden;z-index:100;left: 66px;" class="subStationScroll2">
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
                <button @click="search()">查询</button>
              </div>
              <div class="tc_count_table">
                <div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                        <thead>
                            <tr>
                                <td width="6%">序号</td>
                                <td width="20%" style="position: relative;">计量点名称
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='pathName';direction=1;getIsInUseEvent()"></span>
                                    <span class="reverse_order" @click="orderColumn='pathName';direction=0;getIsInUseEvent()"></span>
                                  </div>
                                </td>
                                <td width="8%" style="position: relative;">电压等级
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='bvName';direction=0;getIsInUseEvent()"></span>
                                    <span class="reverse_order" @click="orderColumn='bvName';direction=1;getIsInUseEvent()"></span>
                                  </div>
                                </td>
                                <td width="10%" style="position: relative;">所属厂站
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='stName';direction=1;getIsInUseEvent()"></span>
                                    <span class="reverse_order" @click="orderColumn='stName';direction=0;getIsInUseEvent()"></span>
                                  </div>
                                </td>
                                <td width="9%" style="position: relative;">记录创建人
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='creatUser';direction=1;getIsInUseEvent()"></span>
                                    <span class="reverse_order" @click="orderColumn='creatUser';direction=0;getIsInUseEvent()"></span>
                                  </div>
                                </td>
                                <td>原因</td>
                                <td width="7%" style="position: relative;">传送状态
                                  <div class="common_sort">
                                    <span class="positive_sequence" @click="orderColumn='sgztName';direction=1;getIsInUseEvent()"></span>
                                    <span class="reverse_order" @click="orderColumn='sgztName';direction=0;getIsInUseEvent()"></span>
                                  </div>
                                </td>
                                <td width="8%">是否传送
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="status_scroll">
                    <table class="table">
                        <tbody>
                            <tr v-for="(item,index) in callbackdata" :key="index">
                            <td width="6%">{{(pageIndex-1)*pageSize+(index+1)}}</td>
                            <td width="20%" @click="showDetail=true;sbDetail=item;clickDetail()"><span class="color_warning">{{item.pathName}}</span></td>
                            <td width="8%">{{item.bvName}}</td>
                            <td width="10%">{{item.stName}}</td>
                            <td width="9%">{{item.creatUser}}</td>
                            <td>
                              <span class="reasonWhy" :title="item.remark">{{item.remark}}</span>
                            </td>
                            <td width="7%">{{item.sgztName}}</td>
                            <td v-if="item.shzt == 1" width="8%"><el-button type="text" @click="deliveryDetail(1)">是</el-button></td>
                            <td v-if="item.shzt != 1" width="8%"><el-button type="text" @click="deliveryDetail(2,item.id)">否</el-button></td>                  
                            </tr>
                        </tbody>
                    </table>
                </div>
              </div>
              <el-pagination
                class="pagings"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[10,20,100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pojoTotalCount">
              </el-pagination>
          </div>
          <overlay :close.sync="showDetail">
              <div style="width: 700px;height: 520px;margin: 0 10px">
                <div class="tc_count_title">
                    <h2 class="clearfix">投运计量点详情</h2>
                </div>
                <div class="tc_count_body">
                    <div class="getdetail_scroll1" style="position: relative;height: 400px;overflow: hidden;">
                        <table class="table">
                          <tbody>
                            <tr><td width="25%">计量点名称</td><td>{{sbDetail.pathName}}</td></tr>
                            <tr><td width="25%">计量点ID</td><td>{{sbDetail.meterId}}</td></tr>
                            <tr><td width="25%">电压等级</td><td>{{sbDetail.bvName}}</td></tr>
                            <tr><td width="25%">所属厂站</td><td>{{sbDetail.stName}}</td></tr>
                            <tr><td width="25%">记录创建时间</td><td>{{sbDetail.creatTime}}</td></tr>
                            <tr><td width="25%">记录创建人</td><td>{{sbDetail.creatUser}}</td></tr>
                            <tr><td width="25%">投运时间</td><td>{{sbDetail.transportationTime}}</td></tr>
                            <tr><td width="25%">传送时间</td><td>{{sbDetail.cssj}}</td></tr>
                            <tr><td width="25%">设备名称</td><td>{{sbDetail.devPathName}}</td></tr>
                            <tr><td width="25%">设备id</td><td>{{sbDetail.devId}}</td></tr>
                            <tr><td width="25%">原因</td><td>{{sbDetail.remark}}</td></tr>
                            <tr><td width="25%">传送状态</td><td>{{sbDetail.sgztName}}</td></tr>
                          </tbody>
                        </table>
                     </div>
                </div>
                <div style="text-align: center;margin: 10px 0;">
                 <!-- <button type="button" @click="saveMeter()">确定</button> -->
                 <button type="button" class="warning" @click="deliveryDetail(2,sbDetail.id)" v-if="sbDetail.shzt != 1">是否传送</button>
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
          <loading :isLoading='loading'></loading>
      </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import qs from "qs";
import area from "@/assets/config/areaMap";
import bvid from "@/assets/config/bvidMap";
import overlay from '@/components/common/overlay'
import loading from "@/components/common/loading"
export default {
  data() {
    return {
      showDetail:false,
      isFocus: false,
      dialogVisible: false,
      pageSize:10,
      pageIndex:1,
      pojoTotalCount:null,
      pageCount:null,
      callbackdata:'',
      ids:'',
      areaArr:'',
      times:this.$day().format("YYYY-MM"),
      timess:this.$day().format("YYYY-MM"),
      meterId:'',
      meterName:'',
      bvidArr:bvid,
      systemId: "",
      systemIds:'',
      bvId:'',
      substations: [],
      substationStId: "",
      substationStIds:'',
      substationName: "",
      substationNames:'',
      substationsAll: [],
      subStationScroll2:'',
      getdetail_scroll1:'',
      status_scroll1:'',
      sbDetail:'',
      loading:true,
      orderColumn:'bvName',
      direction:1
    };
  },
  components:{
      overlay,
      loading
  },
  watch: {
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
    if (sessionStorage.getItem("systemId") &&!isNaN(sessionStorage.getItem("systemId"))) {
      area.forEach(item => {
        if (item.areaId == sessionStorage.getItem("systemId")) {
          this.areaArr = [item];
          this.systemId = item.areaId;
        }
      });
    } else {
      this.areaArr = area;
    }
    this.getIsInUseEvent()
    this.getSubstation()
  },
  mounted() {
  },
  methods: {
    // 获取厂站数据
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
    // 得到投运数据
    getIsInUseEvent() {
      this.loading =true
      var obj = {
        sign: sessionStorage.getItem("accessToken"),
        type: 1,
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
      if(this.timess) {
        obj.searchDate = this.timess
      }
      this.$http
        .get("/maintenanceService/isInUseEventService/getIsInUseEvent", {
          params: obj
        })
        .then(res => {
          if (res.data.code === 1) {
            this.callbackdata = res.data.data.isInUseEvenets;
            this.pojoTotalCount = res.data.pojoTotalCount;
            if(this.status_scroll1) {
                this.status_scroll1.destroy()
            }
            this.$nextTick(() => {
                this.status_scroll1 = new BScroll('.status_scroll', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
            })
            this.loading =false
          }
        });
    },
    // 改变当前页条数
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getIsInUseEvent();
    },
    // 改变页数
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageIndex = val;
        this.getIsInUseEvent();
    },
    // 根据条件筛选得到投运数据
    search() {
      this.pageIndex = 1
      this.systemIds = this.systemId
      this.substationNames = this.substationName
      this.substationStIds = this.substationStId
      this.timess = this.times
      this.getIsInUseEvent();
    },
    // 点击是否传送按钮
    deliveryDetail(type,ids) {
      if(type == 1) {
        this.$notify({
          title: '提示',
          message: '该条记录已被传送过',
          duration: 1000,
          type:'warning'
        });
      } else {
        this.dialogVisible = true
        this.ids = ids
      }
    },
    // 关闭弹窗提示
    handleClose(done) {
      this.dialogVisible = false
    },
    // 点击弹窗里传送或不传送按钮
    conform(shzt) {
      this.$http
      .post("/maintenanceService/isInUseEventService/updateIsInUseEvent?sign="+sessionStorage.getItem('accessToken'),
      qs.stringify({
        shzt: shzt,
        id: this.ids,
        }))
      .then(res => {
        if (res.data.code === 1) {
          this.dialogVisible = false
          this.showDetail = false
          this.getIsInUseEvent()
        }
      });
    },
    clickInput() {
      this.isFocus = true;
      if(this.subStationScroll2) {
        this.subStationScroll2.destroy()
      }
      this.$nextTick(() => {
        this.subStationScroll2 = new BScroll(".subStationScroll2", {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
      });
    },
    clickDetail() {
      if(this.getdetail_scroll1) {
        this.getdetail_scroll1.destroy()
      }
      this.$nextTick(() => {
        this.getdetail_scroll1 = new BScroll(".getdetail_scroll1", {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
      });
    }
  },
};
</script>

<style>
.reasonWhy {
  display: inline-block;
  width: 100%;
  max-width: 275px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.status_scroll{
    position: relative;
    max-height: 380px;
    overflow: hidden;
}
.subStationScroll2 ul li {
  cursor: pointer;
  height: 30px;
  padding-left: 5px;
  color: #49f5f5;
  float: none !important;
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.subStationScroll2 ul li:hover {color: #fff}
</style>
