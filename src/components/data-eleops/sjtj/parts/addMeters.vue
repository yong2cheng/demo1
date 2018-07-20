<template>
  <div class="main ">
    <span class="bread_nav">
       <router-link :to="{path:'/dlywkhd/sjtj',query:{sysId:$route.query.sysId,sonid:$route.query.sonid}}">事件提交</router-link>
      ></span>
    <span class="bread_nav" @click="goback(-1)">换表事件></span>
    <span class="bread_nav"> 表计更换事件</span>
    <div class="mxian_succ">
      <div class="event_table_main event_add_wrap">
          <p class="add_title">电表基本信息：</p>
          <table class="table origin_table">
            <tbody>
              <tr>
                <td width="15%">单位名称:</td>
                <td style="text-align: left">
                  <!-- <input type="text" class="txt" placeholder="厂站名称" v-model="dataList.sbtName" readonly> -->
                  {{dataList.sbtName}}
                </td>
                <td width="15%">电表名称:</td>
                <td  style="text-align: left" >
                  <!-- 搜索框 -->
                  <div class="search_input meter_search_input">
                    <input type="text" 
                      placeholder="输入电表或厂站"
                      class="txt" 
                      v-model="searchName"
                      @blur="isSearch=false">  
                      <button class=" primary" @click="search();">查询</button>
                      <div class="search_list  meter_search" v-show="isSearch">
                        <table class="table">
                          <thead>
                            <tr>
                              <td>序号</td>
                              <td>所属厂站</td>
                              <td>MRID</td>
                              <td>电表名称</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr  v-for="(item,index) in searchList"
                            :key="index" 
                            @click="getMeterBriefByName(item,item.localName);
                            isSearch=false;">
                              <td>{{index + 1}}</td>
                              <td>{{item.sbtName}}</td>
                              <td>{{item.mrid}}</td>
                              <td>{{item.localName}}</td>
                            </tr>
                            <tr  v-show="searchList.length>0">
                              <td colspan="4">
                                <el-pagination
                                   v-show="searchList.length>0"
                                   background
                                   @current-change='changePage'
                                   :current-page.sync="currentPage"
                                   layout="prev, next"
                                  :page-size="20"
                                  :total="totalCount">
                                </el-pagination>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                          <p style="line-height:30px;padding-left:10px;" v-show="searchList.length<=0">加载中...</p>
                      </div>     
                    </div>     
                </td>
              </tr>
              <tr>
                <td width="15%">电表精度:</td>
                <td  style="text-align: left">
                  <select v-model="dataPrecision">
                    <option value="0.01">0.2s</option>
                    <option value="0.001">0.3s</option>
                    <option value="0.0001">0.4s</option>
                    <option value="0.00001">0.5s</option>
                  </select>
                </td>
                <td width="15%"></td>
                <td></td>
              </tr>
              <tr>
                <td width="15%">表计生产厂家:</td>
                <td style="text-align: left">
                  <select  v-model="manufactureId">
                    <option value="1">MDMI</option>
                    <option value="2">MDMI2</option>                 
                  </select>
                </td>
                <td width="15%">表计型号:</td>
                <td style="text-align: left">
                  <select v-model="modelId">
                    <option value="1">MK5</option>
                    <option value="2">MK6</option>                 
                  </select>
                </td>
              </tr>
              <tr>
                <td width="15%">CT1/CT2:</td>
                <td>{{dataList.ct1}}/{{dataList.ct2}}</td>
                <td width="15%">PT1/PT2:</td>
                <td>{{dataList.pt1}}/{{dataList.pt2}}</td>
              </tr>
              <tr>
                <td width="15%">开始时间:</td>
                <td style="text-align: left">
                  <el-date-picker
                    v-model="startTime" 
                    type="datetime" 
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择时间">
                  </el-date-picker>
                </td>
                <td width="15%">结束时间:</td>
                <td style="text-align: left">
                  <el-date-picker
                    v-model="endTime" 
                    type="datetime" 
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择时间">
                  </el-date-picker>        
                </td>
              </tr>
            </tbody>
          </table>         
          <p class="add_title">原装主表: <label><input type="checkbox" v-model="orgin">显示费率</label></p>
          <table class="table">
             <thead>
               <tr>
                 <td>费率</td>
                 <td>正向有功</td>
                 <td>正向无功</td>
                 <td>反向有功</td>
                 <td>反向无功</td>
               </tr>
             </thead>
            <tbody>
              <tr>
                <td>正向有功总</td>
                <td>
                  <input type="text" class="txt" v-model="papObj.PAP1_VIEW_BEFORE" @blur="validate(papObj.PAP1_VIEW_BEFORE)">              
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.PRP1_VIEW_BEFORE" @blur="validate(papObj.PRP1_VIEW_BEFORE)">
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.RAP1_VIEW_BEFORE" @blur="validate(papObj.RAP1_VIEW_BEFORE)">
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.RRP1_VIEW_BEFORE" @blur="validate(papObj.RRP1_VIEW_BEFORE)">
                </td>
              </tr>
              <template v-if="orgin">
                <tr>
                  <td>正向有功峰</td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PAP2_VIEW_BEFORE">              
                  </td>
                  <td>
                     <input type="text" class="txt" v-model="papObj.PRP2_VIEW_BEFORE">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RAP2_VIEW_BEFORE">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RRP2_VIEW_BEFORE">
                  </td>
                </tr>
                <tr>
                  <td>正向有功平</td>
                  <td>
                   <input type="text" class="txt" v-model="papObj.PAP3_VIEW_BEFORE">              
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PRP3_VIEW_BEFORE">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RAP3_VIEW_BEFORE">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RRP3_VIEW_BEFORE">
                  </td>
                </tr>
                <tr>
                  <td>正向有功谷</td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PAP4_VIEW_BEFORE">              
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PRP4_VIEW_BEFORE">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RAP4_VIEW_BEFORE">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RRP4_VIEW_BEFORE">
                  </td>
                </tr>
                <tr>
                  <td>正向有功尖</td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PAP5_VIEW_BEFORE">              
                  </td>
                  <td>
                     <input type="text" class="txt" v-model="papObj.PRP5_VIEW_BEFORE">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RAP5_VIEW_BEFORE">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RRP5_VIEW_BEFORE">
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <p class="add_title">新装主表: <label><input type="checkbox" v-model="add">显示费率</label></p>
          <table class="table">
             <thead>
               <tr>
                 <td>费率</td>
                 <td>正向有功</td>
                 <td>正向无功</td>
                 <td>反向有功</td>
                 <td>反向无功</td>
               </tr>
             </thead>
            <tbody>
              <tr>
                <td>正向有功总</td>
                <td>
                  <input type="text" class="txt" v-model="papObj.PAP1_VIEW_AFTER" @blur="validate(papObj.PAP1_VIEW_AFTER)">              
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.PRP1_VIEW_AFTER" @blur="validate(papObj.PRP1_VIEW_AFTER)">
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.RAP1_VIEW_AFTER" @blur="validate(papObj.RAP1_VIEW_AFTER)">
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.RRP1_VIEW_AFTER" @blur="validate(papObj.RRP1_VIEW_AFTER)">
                </td>
              </tr>              
              <template v-if="add">
                <tr>
                <td>正向有功峰</td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PAP2_VIEW_AFTER">              
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PRP2_VIEW_AFTER">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RAP2_VIEW_AFTER">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RRP2_VIEW_AFTER">
                  </td>
                </tr>
                <tr>
                  <td>正向有功平</td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PAP3_VIEW_AFTER">              
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PRP3_VIEW_AFTER">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RAP3_VIEW_AFTER">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RRP3_VIEW_AFTER">
                  </td>
                </tr>
                <tr>
                  <td>正向有功谷</td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PAP4_VIEW_AFTER">              
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PRP4_VIEW_AFTER">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RAP4_VIEW_AFTER">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RRP4_VIEW_AFTER">
                  </td>
                </tr>
                <tr>
                  <td>正向有功尖</td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PAP5_VIEW_AFTER">              
                  </td>
                  <td>
                     <input type="text" class="txt" v-model="papObj.PRP5_VIEW_AFTER">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RAP5_VIEW_AFTER">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RRP5_VIEW_AFTER">
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <p class="add_title">补偿电量: <label><input type="checkbox" v-model="compensate">显示费率</label></p>
          <table class="table">
             <thead>
               <tr>
                 <td>费率</td>
                 <td>正向有功</td>
                 <td>正向无功</td>
                 <td>反向有功</td>
                 <td>反向无功</td>
               </tr>
             </thead>
            <tbody>
              <tr>
                <td>正向有功总</td>
                <td>
                  <input type="text" class="txt" v-model="papObj.PAP1_COMPENSATION" @blur="validate(papObj.PAP1_COMPENSATION)">              
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.PRP1_COMPENSATION" @blur="validate(papObj.PRP1_COMPENSATION)">
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.RAP1_COMPENSATION" @blur="validate(papObj.RAP1_COMPENSATION)">
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.RRP1_COMPENSATION" @blur="validate(papObj.RRP1_COMPENSATION)">
                </td>
              </tr>
              <template v-if="compensate">
                <tr>
                <td>正向有功峰</td>
                <td>
                  <input type="text" class="txt" v-model="papObj.PAP2_COMPENSATION">              
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.PRP2_COMPENSATION">
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.RAP2_COMPENSATION">
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.RRP2_COMPENSATION">
                </td>
              </tr>
                <tr>
                  <td>正向有功平</td>
                  <td>
                   <input type="text" class="txt" v-model="papObj.PAP3_COMPENSATION">              
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PRP3_COMPENSATION">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RAP3_COMPENSATION">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RRP3_COMPENSATION">
                  </td>
                </tr>
                <tr>
                  <td>正向有功谷</td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PAP4_COMPENSATION">              
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PRP4_COMPENSATION">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RAP4_COMPENSATION">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RRP4_COMPENSATION">
                  </td>
                </tr>
                <tr>
                  <td>正向有功尖</td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.PAP5_COMPENSATION">              
                  </td>
                  <td>
                     <input type="text" class="txt" v-model="papObj.PRP5_COMPENSATION">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RAP5_COMPENSATION">
                  </td>
                  <td>
                    <input type="text" class="txt" v-model="papObj.RRP5_COMPENSATION">
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
      </div>
      <div class="tool_bar metter_add_tool">         
        <button class=" status_btn" @click="saveAdd()">保存</button>
        <button class=" warning status_btn" @click="clear()">清空</button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      isSearch: false,
      searchName: "",
      searchList: [], //搜索列表
      dataList: {}, //搜索结果
      papObj: {},
      orgin: false, //显示费费率
      add: false,
      compensate: false,
      modelId: 1, //电表类型
      manufactureId: 1, //厂家
      dataPrecision: 0.01, //精度
      totalCount: null,
      currentPage: 1,
      flag: true
    };
  },
  methods: {
    search() {
      //搜索
      if (this.searchName) {
        this.isSearch = true;
        this.searchList = [];
        this.$http
          .get("/quotaService/quota/getMeter", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              name: this.trimFun(this.searchName),
              pageIndex: this.currentPage,
              pageSize: 20
            }
          })
          .then(res => {
            if (res.data.code === 1) {
              console.log(res);
              this.searchList = res.data.data.meters;
              this.totalCount = res.data.pojoTotalCount;
            }
          });
      }
    },
    changePage() {
      this.search();
    },
    getMeterBriefByName(item, name) {
      //选中搜索结果
      this.searchList = [];
      this.dataList = item;
      this.searchName = name;
      // this.$http
      //   .get("/quotaService/quota/getMeter", {
      //     params: {
      //       sign: sessionStorage.getItem("accessToken"),
      //       name: this.searchName,
      //       pageIndex: 1,
      //       pageSize: 20
      //     }
      //   })
      //   .then(res => {
      //     if (res.data.code === 1) {
      //       if (res.data.data.meters) {
      //         this.dataList = res.data.data.meters[0];
      //         this.dataPrecision =
      //           res.data.data.meters[0].dataPrecision || 0.01;
      //       } else {
      //         this.dataList = {};
      //       }
      //     } else {
      //       alert(res.data.msg);
      //     }
      //   });
    },
    saveAdd() {
      //保存
      if (!this.startTime || !this.endTime) {
        // alert("记得填写时间！^-^");
        this.$notify({
          title: "提示",
          message: "记得填写时间！^-^",
          duration: 1500,
          type: "warning"
        });
      } else {
        if (this.flag) {
          this.flag = false;
          this.$http
            .post(
              "/maintenanceService/eventChangedLogsService/postChangeMeterEvent?sign=" +
                sessionStorage.getItem("accessToken"),
              qs.stringify({
                mrid: this.dataList.mrid,
                startTime: this.startTime,
                endTime: this.endTime,
                userId: sessionStorage.getItem("userId"),
                dataPrecision: this.dataPrecision,
                manufactureId: this.manufactureId,
                modelId: this.modelId,
                tariffValue: JSON.stringify(this.papObj) || JSON.stringify({})
              })
            )
            .then(res => {
              if (res.data.code === 1) {
                this.flag = true;
                this.$notify({
                  title: "提示",
                  message: "新增成功",
                  duration: 1500,
                  type: "success"
                });
              } else {
                this.flag = true;
                this.$notify({
                  title: "提示",
                  message: "新增异常",
                  duration: 1500,
                  type: "error"
                });
              }
            });
        }
      }
    },
    validate(val) {
      //表单验证
      let reg = new RegExp("^[0-9]+.{0,1}[0-9]{0,5}$");
      if (val && !reg.test(val)) {
        // alert("请输入正确的类型！");
        this.$notify({
          title: "提示",
          message: "请输入正确的类型！",
          duration: 1500,
          type: "warning"
        });
      }
    },
    trimFun(x) {
      return x.replace(/^\s+|\s+$/gm, "");
    },
    clear() {
      //清除
      this.dataList = {};
      this.papObj = {};
      this.modelId = 1;
      this.manufactureId = 1;
      this.dataPrecision = 0.01;
      this.startTime = "";
      this.endTime = "";
      this.searchName = "";
    },
    goback(num) {
      this.$router.go(num);
    }
  },
  mounted() {
    this.$nextTick(() => {
      let search_list1 = new BScroll(".search_list", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
        preventDefault: false
      });
    });
  }
};
</script>

<style lang="css">
.metter_add_tool {
  box-sizing: border-box;
  padding: 0 3%;
  text-align: center;
  height: 60px !important;
  line-height: 60px;
  border-top: 1px dashed #0d7474;
}
.add_title {
  margin-top: 20px;
  margin-bottom: 15px;
}
.event_add_wrap {
  padding: 0 3%;
  margin-bottom: 16px;
  padding-bottom: 12px;
}
.meter_search_input {
  display: inline-block;
  height: 30px;
  position: relative;
}
.search_input input {
  width: 200px;
}
.search_list {
  position: absolute;
  top: 113%;
  left: 0;
  width: 200px;
  min-height: 50px;
  max-height: 260px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.1);
  background: #012323;
}
.search_list li {
  box-sizing: border-box;
  margin: 0 6px;
  line-height: 30px;
  border-bottom: 1px solid #0d7474;
  cursor: pointer;
  color: #84f1f1;
  font-size: 12px;
}
.search_list li:hover {
  color: #fff;
}
.meter_search {
  width: 600px;
  left: -55%;
  padding: 6px;
  overflow: hidden;
  z-index: 10000;
}
.meter_search {
  cursor: pointer;
}
.meter_search tr:hover {
  background: #3d3640 !important;
}
</style>
