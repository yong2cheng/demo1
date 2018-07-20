<template>
    <div @click="isFocus=false">
        <div class="overlay_tc_count"> 
            <div class="tc_count_body" style="border: 0">
                <div class="tc_count_tool clearfix">
                  <ul class="clearfix">
                      <li>
                          <label>所属地区:</label>
                          <select v-model="systemId">
                              <option value="">选择地区</option>
                              <option v-for="(item,index) in areaArr" :value="item.areaId" :key="index">
                                  {{item.areaName}}
                              </option>
                          </select>
                      </li>
                      <li style="display: inline-block;position: relative;margin-right: 15px;">
                          <label>厂站名称:</label>
                          <input v-model="substationName" @click.stop="clickInput()" placeholder="厂站定位" type="text" class="txt">
                          <div v-show="isFocus" class="subStationScrolls">
                              <ul>
                                  <li @click.stop="isFocus=false;substationName=item.pathName;clickGetMeter(item.mrid)" :key="index" v-for="(item,index) in substations" :title="item.pathName">
                                      {{item.pathName}}
                                  </li>
                              </ul>
                          </div>
                      </li>
                      <li>待关联设备名称：{{sbDetail.sbmc}}</li>
                  </ul>
                </div>
                <div class="tc_count_table">
                  <div>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                          <thead>
                              <tr>
                                  <td width="5%">序号</td>
                                  <td>MRID</td>
                                  <td>电表全路径名称</td>
                                  <td width="7%">倍率</td>
                                  <td width="6%">精度</td>
                                  <td width="7%">是否投运</td>
                                  <td>日冻结底码采集时标</td>
                              </tr>
                          </thead>
                      </table>
                  </div>
                  <div class="getMeter_scroll" style="position: relative;height: 351px;overflow: hidden;">
                      <table class="table">
                        <tbody>
                          <tr v-for="(item,index) in meters" style="cursor: pointer;" @click="updateJxpg(item)" :key="index">
                            <td  width="5%">{{(pageIndex-1)*pageSize+(index+1)}}</td>
                            <td >{{item.mrid}}</td>
                            <td> {{item.pathName}} </td>
                            <td  width="7%">{{item.ratio}}</td>
                            <td  width="6%">{{item.dataPrecision}}</td>
                            <td width="7%">{{item.isInUse==1?'是':'否'}}</td>
                            <td>{{item.class2TimeTag}}</td>
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
            <!-- <loading :isLoading='loading'></loading> -->
        </div>
    </div>
</template>
<script>
import qs from "qs";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      isFocus: false,
      systemId: "",
      callbackdata:'',
      times:this.$day().format("YYYY-MM"),
      bvId:'',
      systemId:'',
      substations: [],
      substationStId: "",
      substationName: "",
      substationsAll: [],
      subStationScrolls:'',
      meters:'',
      pageSize:10,
      pageIndex:1,
      pojoTotalCount:null,
      pageCount:null,
      getMeter_scroll:''
    };
  },
  props: ['areaArr','bvidArr','sbDetail'], //投运设备的类型
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
      
    },
  },
  created() {
    console.log(this.sbDetail)
    this.getSubstation()
  },
  mounted() {
  },
  methods: {
    clickGetMeter(mrid) {
      this.stId = mrid
      this.getMeter();
    },
    // 获取电表数据
    getMeter() {
      var obj = {
        sign: sessionStorage.getItem("accessToken"),
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      if(this.stId) {
        obj.stId = this.stId
      }
      this.$http
        .get("/quotaService/quota/getMeter", {
          params: obj
        })
        .then(res => {
          if (res.data.code === 1) {
            var data = res.data.data.substations;
            this.meters = res.data.data.meters
            this.pojoTotalCount = res.data.pojoTotalCount;
            if(this.getMeter_scroll) {
                this.getMeter_scroll.destroy()
            }
            this.$nextTick(() => {
              this.getMeter_scroll = new BScroll(".getMeter_scroll", {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
            });
          }
        });
    },
    // 改变当前页条数
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getMeter();
    },
    // 改变页数
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageIndex = val;
        this.getMeter();
    },
    // 获取厂站数据
    getSubstation() {
      this.$http
        .get("/quotaService/quota/getSubstation", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            systemId:this.systemId,
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
    // 点击厂站定位input框
    clickInput() {
      this.isFocus = true;
      if (this.subStationScrolls) {
        this.subStationScrolls.destroy()
      }
      this.$nextTick(() => {
        this.subStationScrolls = new BScroll(".subStationScrolls", {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
      });
    },
    // 点击弹窗里传送或不传送按钮
    updateJxpg(data) {
      console.log(this.sbDetail)
      this.$http
      .post("/maintenanceService/isInUseEventService/updateJxpg?sign="+sessionStorage.getItem('accessToken'),
      qs.stringify({
        ids: this.sbDetail.id,
        meterId:data.mrid,
        meterName:encodeURI(data.pathName)
        }))
      .then(res => {
        if (res.data.code === 1) {
          this.changeSatus()
        }
      });
    },
    // 保存成功后自定义函数
    changeSatus() {
        this.$emit('changeSat', false)//触发自定义事件
    },
  }
};
</script>
<style>
.retire_wrapss {
  width: 1200px;
  height: 520px;
  padding: 22px;
  /* text-align: center; */
  position: relative;
  background: #043434;
}
.subStationScrolls {
  position:absolute;background:#012323;height:200px;width:172px;border-radius:5px;overflow:hidden;z-index:100;left: 66px;
}
.subStationScrolls ul li{
  cursor: pointer;
  height: 30px;
  padding-left: 5px;
  color: #49f5f5;
  font-size: 15px;
  float: none !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.subStationScrolls ul li:hover {
  color: #fff
}
</style>
