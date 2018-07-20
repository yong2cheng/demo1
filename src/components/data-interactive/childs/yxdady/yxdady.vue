<template>
  <div class="main main_se yxdady">
      <div style="margin-bottom:20px;border:1px solid #0d7474;padding:20px;" class="t_sousuo">
          
          <span>地区：</span>
            <select v-model="areaId" name="" id="">
                <option :key="index" v-for="(item,index) in diquNames" :value="item.mrId">{{item.areaName}}</option>
            </select>
            <span>电压等级：</span>
            <select v-model="bvId" name="" id="">
                <option value="">所有电压等级</option>
                <option :value="item.bvId" :key="index" v-for="(item,index) in ybvId">{{item.dydj}}kV</option>
            </select>
            <span>配置：</span>
            <select v-model="isComplete" name="" id="">
                <option value="-1">所有配置</option>
                <option value="0">未配置</option>
                <option value="1">已配置</option>
            </select>
            <input v-model="consKey" type="text" placeholder="输入营销用户编号或名称" class="txt" style="width:200px">
            <button style="margin-top:5px;" class="right" @click="add()">新增</button>
             <button style="margin-top:5px;" class="right" @click="pageIndex =1;getCons();">查询</button>
    </div>
    <table class="table">
      <thead>
          <tr>
              <td>序号</td>
              <td style="position: relative;">营销用户编号
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='consNo';direction=1;getCons()"></span>
                    <span class="reverse_order" @click="orderColumn='consNo';direction=0;getCons()"></span>
                  </div>
              </td>
              <td style="position: relative;">营销用户名称
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='consName';direction=1;getCons()"></span>
                    <span class="reverse_order" @click="orderColumn='consName';direction=0;getCons()"></span>
                  </div>
              </td>
              <td style="position: relative;">所属地区
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='areaId';direction=1;getCons()"></span>
                    <span class="reverse_order" @click="orderColumn='areaId';direction=0;getCons()"></span>
                  </div>
              </td>
              <td style="position: relative;">电压等级
                  <div class="common_sort">
                    <span class="positive_sequence" @click="orderColumn='bvId';direction=1;getCons()"></span>
                    <span class="reverse_order" @click="orderColumn='bvId';direction=0;getCons()"></span>
                  </div>
              </td>
              <td>操作</td>
          </tr>
      </thead>
    </table>
    <div class="scroll3" style="position:relative;overflow:hidden;height:491px;">
        <table class="table">
      <tbody>
          <tr v-if="isNone">
              <td colspan="6">暂无相关数据</td>
          </tr>
          <tr :key="indexd" v-for="(item,indexd) in tbodys">
              <td @click="getMeter(child.isClick,child.id,child.name)" :class="{isClick:child.isClick,isRed:child.isRed}" :key="indexm" v-for="(child,indexm) in item" :colspan="child.numone" :rowspan="child.numtwo">{{child.name}}</td>
              <td>
                  <button class="btn-small" @click="edit(indexd)">编辑</button>
                  <button class="warning btn-small" @click="delet(item[1].isRed,item[0].id,item[0].name)">删除</button>
              </td>
          </tr>
      </tbody>
  </table>
  <!-- <ul class="yx_ul">
      <li style="width:100px;background:none;"><input style="width:30px;" type="txt"><button>跳转</button></li>
      <li :class="{checked:pageIndex==0}" @click="getCons(0)" style="width:50px;">首页</li>
     <li style="width:100px;background:0;"><button @click="getCons(pageIndex-1)" :class="{disBtn:pageIndex==0}">上一页</button> </li>
     <li v-if="index<pageIndex+3&&index>pageIndex-3" :key="index" v-for="(item,index) in pageCount" @click="getCons(index)" :class="{checked:pageIndex==index}">{{index+1}}</li>
     <li style="width:100px;background:0;"><button @click="getCons(pageIndex+1)" :class="{disBtn:pageIndex==pageCount.length-1}">下一页</button></li>
     <li :class="{checked:pageIndex==pageCount.length-1}" @click="getCons(pageCount.length-1)" style="width:50px;">末页</li>
  </ul> -->
    </div>
    <el-pagination
                        background
                        class="paging"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[10,20,100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pojoTotalCount">
                    </el-pagination>
    <!-- 点击营销用户编号弹框 -->
    <overlay oheight="60%" :close.sync="isShowt">
        <div class="yiji_t">
          <div class="t_title"><span>营销用户编号:{{meterName}}</span></div>
          <overlay oheight="60%" owidth="50%"  :close.sync="isShowtm">
              <div class="stationBox">
                <h3 class="t_title">厂站搜索结果</h3>
                <ul>
                    <li style="font-size:14px;" @click="getMeters(item.mrid)" :key="index" v-for="(item,index) in factoryStationNames">{{item.localName}}</li>
                </ul>
            </div>  
          </overlay>
          
          <div style="height:calc(100% - 36px);">
              <div :class="{colse:isColse}" style="float:left;height:calc(100% - 10px);overflow:hidden;width:20%;">
                <input v-model="factoryStationName" style="width:150px;" placeholder="输入厂站" type="text" class="txt"/>
                <button @click="getAllSubstation()">搜索</button>
                  <div id="treeDatas1" style="overflow:hidden;position:relative;height:100%;margin-top:10px;" class="treeDatas1">
              
                      <tree-folder-contentst :children="children"></tree-folder-contentst>
                  </div>
              </div>
            
            <!-- 折叠按钮 -->
            <div @click="foldButton()" class="fold_button" style="left:-5px;" :class="{fold_right:isColse}"></div>
            <div :style="{width:widthd}" style="height:calc(100% - 10px);position:relative;float:right;border:1px solid #0d7474;box-sizing:border-box;padding:20px;">
              
                  <div style="position:relative;width:40%;float:left;height:100%;border:1px solid #0d7474;box-sizing:border-box;padding:20px;">
                    <div class="yw_left_tool_bar">
                      
                      <input type="text" v-model="meterDataName" placeholder="输入标记设备名称" class="txt"/><button @click="ssMeter()">搜索</button>
                    </div>
                      <table class="table">
                          <thead>
                              <tr>
                                  <td colspan="1">序号</td>
                                  <td colspan="2">MRID</td>
                                  <td colspan="2">表计设备名称</td>
                              </tr>
                          </thead>
                      </table>
                      <div class="scroll" style="position:relative;height:calc(100% - 78px);overflow:hidden">
                          <table class="table">
                              <tbody>
                                  <tr style="cursor:pointer;" @click="readyIndex=index" :class="{readyBg:readyIndex==index}" :key="index" v-for="(item,index) in meterData">
                                      <td colspan="1">{{item[0]}}</td>
                                      <td colspan="2">{{item[1]}}</td>
                                      <td colspan="2">{{item[2]}}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  
                  <div style="width:48px;height:70px;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto auto;">
                      <button @click="addToRight()" class="btn-small" style="margin-bottom:10px;white-space: nowrap;">添加</button>
                      <button @click="delToRight()" class="warning btn-small" style="white-space: nowrap;">删除</button>
                  </div>
                  <div style="width:40%;height:100%;float:right;border:1px solid #0d7474;box-sizing:border-box;padding:20px;">
                    <button @click="updateCons()" style="float:right;margin-bottom:12px;">保存对应模型</button>
                      <table class="table">
                          <thead>
                              <tr>
                                  <td colspan="1">序号</td>
                                  <td colspan="2">TMRID</td>
                                  <td colspan="2">表设备名称</td>
                                  <td colspan="2">营销电表ID</td>
                              </tr>
                          </thead>
                      </table>
                      <div class="scroll2" style="position:relative;height:calc(100% - 78px);overflow:hidden">
                        <table class="table">
                              <tbody>
                                  <tr style="cursor:pointer;" :class="{readyBg:delIndex==index}" @click="delIndex=index" :key="index" v-for="(item,index) in meters">
                                      <td colspan="1">{{index-(-1)}}</td>
                                      <td colspan="2" :key="indexm" v-for="(child,indexm) in item">
                                          <input style="width:100%;" v-if="child.hasInput" v-model="meters[index][2].name" type="number" class="txt" />
                                          <span v-if="!child.hasInput">{{child.name}}</span>
                                      </td>
                                  </tr>
                              </tbody>
                          </table> 
                      </div>
                  </div>
              </div>
                
            </div>
        </div>
    </overlay>
    <!-- 编辑弹框 -->
    <overlay oheight="260px" owidth="410px"  :close.sync="isShowb">
        <div class="edit" style="height:100%;position:relative;padding:10px;">
          <div class="t_title">编辑</div>
            <div><span class="span">营销用户编号 </span><input type="number" v-model="editNum" class="txt" /></div>
            <div><span class="span">营销用户名称 </span><input type="text" v-model="editName" class="txt" /></div>
            <div><span class="span">所属地区</span>
                <select v-model="editDiquName" name="" id="">
                    <option :key="index" v-for="(item,index) in diquNames" :value="index">{{item.areaName}}</option>
                </select>
            </div>
            <div><span class="span">电压等级</span>
                <select v-model="editBvId" name="" id="">
                <option value="">请选择电压等级</option>
                <option :value="item.bvId" :key="index" v-for="(item,index) in ybvId">{{item.dydj}}kV</option>
            </select>
            </div>
            <div style="text-align:center;">
                <button @click="confirm()">修改</button>
            </div>
        </div>
    </overlay>
    <!-- 新增弹框 -->
    <overlay oheight="260px" owidth="410px"  :close.sync="isShown">
        <div class="edit" style="height:100%;position:relative;padding:10px;">
          <div class="t_title">新增</div>
            <div><span class="span">营销用户编号： </span><input type="number" v-model="newEditNum" class="txt" /></div>
            <div><span class="span">营销用户名称： </span><input type="text" v-model="newEditName" class="txt" /></div>
            <div><span class="span">所属地区</span>
                <select v-model="newEditDiquName" name="" id="">
                    <option :key="index" v-for="(item,index) in diquNames" :value="index">{{item.areaName}}</option>
                </select>
            </div>
            <div><span class="span">电压等级</span>
                <select v-model="newEditBvId" name="" id="">
                <option value="">请选择电压等级</option>
                <option :value="item.bvId" :key="index" v-for="(item,index) in ybvId">{{item.dydj}}kV</option>
            </select>
            </div>
            <div style="text-align:center;">
                <button @click="confirmAdd()">添加</button>
            </div>
        </div>
    </overlay>
    <!-- loading框 -->
            <div v-if="isLoading" class="loadbox">
                <div class="tkzz"></div>
                <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                </div>
            </div>
  </div>
</template>
<script>
import createTable from "@/components/data-interactive/createTable";
import $areaId from "../../../../assets/config/areaMap";
import Bus from "../../../../assets/eventBus.js";
import overlay from "@/components/common/overlay";
import $bvId from "../../../../assets/config/bvidMap";
import qs from "qs";
import BScroll from "better-scroll";
export default {
  data: function() {
    return {
      diquNames: [{ areaName: "选择地区", mrId: "" }],
      diyas: [{ name: "请选择电压等级", value: "" }],
      theads: [
        [
          {
            name: "序号",
            numone: 1,
            numtwo: 1,
            paixu: false
          },
          {
            name: "营销用户编号",
            numone: 1,
            numtwo: 1,
            paixu: true
          },
          {
            name: "营销客户名称",
            numone: 1,
            numtwo: 1,
            paixu: false
          },
          {
            name: "所属地区",
            numone: 1,
            numtwo: 1,
            paixu: true
          },
          {
            name: "电压等级",
            numone: 1,
            numtwo: 1,
            paixu: true
          },
          {
            name: "操作",
            numone: 1,
            numtwo: 1,
            paixu: false
          }
        ]
      ],
      tbodys: [],
      pageSize: 20,
      pageIndex: 1,
      pageCount: [],
      areaId: "",
      consKey: "",
      bvId: "",
      consKey: "",
      isNone: false, //有无数据返回
      isShowt: false, //点击营销用户编号弹框
      isShowtt: false, //判断是否已经加载过营销用户编号弹框
      meterName: "", //点击的营销用户编号
      readyIndex: -1,
      delIndex: -1,
      consId: "",
      meterData: [],
      children: [],
      meters: [],
      pojoTotalCount: 0,
      isColse: true, //营销用户编号弹框左边树状图收展
      widthd: "98%",
      isShowb: false, //编辑弹框
      editDiquName: 0,
      editBvId: "",
      editIndex: 0,
      editNum: "",
      editName: "",
      ybvId: "",
      isShown: false, //点击新增弹框
      newEditDiquName: 0,
      newEditBvId: "",
      newEditNum: "",
      newEditName: "",
      jiazaicon: true,
      isLoading: true,
      orderColumn: "",
      direction: 0,
      factoryStationName: "",
      factoryStationNames: [],
      isShowtm: false,
      isComplete: -1,
      meterDataName: "",
      meterDataAll: []
    };
  },
  components: {
    createTable,
    overlay
  },
  mounted: function() {
    this.isLoading = true;
    this.$nextTick(() => {
      let scroll3 = new BScroll(".scroll3", {
        scrollbar: { fade: false, interactive: true },
        preventDefault: false,
        mouseWheel: true
      });
    });
    this.ybvId = $bvId;
    if (
      sessionStorage.getItem("systemId") === null ||
      sessionStorage.getItem("systemId") == "undefined"
    ) {
      this.diquNames = this.diquNames.concat($areaId);
    } else {
      for (var a of $areaId) {
        if (a.areaId == sessionStorage.getItem("systemId")) {
          this.diquNames = [a];
          this.areaId = a.mrId;
        }
      }
    }
    Bus.$on("TmeterData", target => {
      this.meterData = target;
      this.meterDataAll = this.meterData;
    });
    Bus.$on("isLoading", target => {
      this.isLoading = target;
    });
    console.log(this.diquNames);
    this.getCons();
  },
  methods: {
    foldButton() {
      this.isColse = !this.isColse;
      if (this.isColse) {
        this.widthd = "98%";
      } else {
        this.widthd = "79%";
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(this.pageSize);
      this.getCons();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getCons();
    },
    getCons() {
      this.isLoading = true;
      console.log(this.pageIndex);
      this.jiazaicon = true;
      this.tbodys = [];
      // this.pageIndex = pageIndex;
      //   if(this.pageIndex<1){
      //       this.pageIndex=1;
      //       return;
      //   }
      //   if(this.pageIndex>=this.pageCount.length&&this.pageCount.length>0){
      //       this.pageIndex=this.pageCount.length-1;
      //       return;
      //   }
      if (this.areaId == "") {
        if (this.diquNames.length == 2) {
          var areaId = "&areaId=" + this.diquNames[1].mrId;
        } else {
          var areaId = "";
        }
      } else {
        var areaId = "&areaId=" + this.areaId;
      }
      if (this.consKey == "") {
        var consKey = "";
      } else {
        var consKey = "&consKey=" + this.consKey;
      }
      if (this.bvId == "") {
        var bvId = "";
      } else {
        var bvId = "&bvId=" + this.bvId;
      }
      this.$http
        .get(
          "/dataInteractiveService/interaction/getCons?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&pageIndex=" +
            this.pageIndex +
            "&pageSize=" +
            this.pageSize +
            areaId +
            consKey +
            bvId +
            "&orderColumn=" +
            this.orderColumn +
            "&isComplete=" +
            this.isComplete +
            "&direction=" +
            this.direction
        )
        .then(res => {
          if (res.data.code == 0) {
            this.isLoading = false;
            //     this.$notify.error({
            //   title: '错误',
            //   message: "系统错误（code==0）"
            // });
            return;
          }
          this.isLoading = false;
          // if (orderType == 0) {
          //   this.orderType = 1;
          // } else {
          //   this.orderType = 0;
          // }
          console.log(res);
          this.jiazaicon = false;
          var data = res.data.data.consVOS;
          this.tbodys = [];
          this.pojoTotalCount = res.data.pojoTotalCount;
          this.pageCount = [];
          for (var i in data) {
            var areaName = "";
            var dydj = "";
            for (var a of $areaId) {
              if (data[i].areaId == a.mrId) {
                areaName = a.areaName;
              }
            }
            for (var a of $bvId) {
              if (data[i].bvId == a.bvId) {
                dydj = a.dydj + "kV";
              }
            }
            this.tbodys.push([
              {
                name: i - -1 + this.pageSize * (this.pageIndex-1),
                Instructions: "bianhao",
                id: data[i].id,
                numone: 1,
                numtwo: 1
              },
              {
                name: data[i].consNo,
                Instructions: "userbianhao",
                isClick: true,
                isRed: data[i].meterCount == 0,
                id: data[i].id,
                numone: 1,
                numtwo: 1
              },
              {
                name: data[i].consName,
                Instructions: "username",
                numone: 1,
                numtwo: 1
              },
              {
                name: areaName,
                Instructions: "areaName",
                numone: 1,
                numtwo: 1
              },
              {
                name: dydj,
                Instructions: "bvId",
                numone: 1,
                numtwo: 1
              }
            ]);
          }
          var count = Math.ceil(res.data.pojoTotalCount / 20);
          for (var i = 0; i < count; i++) {
            this.pageCount.push("-");
          }
          if (this.tbodys.length == 0) {
            this.isNone = true;
          } else {
            this.isNone = false;
          }
          // this.pageIndex = res.data.pageIndex - -1;
          console.log(this.tbodys);
        })
        .catch(error => {
          this.isLoading = false;
          //   this.$notify.error({
          //   title: '错误',
          //   message:"系统错误（error）"
          // });
        });
    },
    handleLoad(num, count) {
      if (num == count) {
        this.isLoading = false;
      }
    },
    getMeter(isClick, id, meterName) {
      if (isClick) {
        this.isLoading = true;
        var count = 0;
        this.isShowt = true;
        this.consId = id;
        if (this.isShowtt == false) {
          this.$nextTick(() => {
            let scroll = new BScroll("#treeDatas1", {
              scrollbar: { fade: false, interactive: true },
              preventDefault: false,
              mouseWheel: true
            });
            let scroll1 = new BScroll(".scroll", {
              scrollbar: { fade: false, interactive: true },
              preventDefault: false,
              mouseWheel: true
            });
            let scroll2 = new BScroll(".scroll2", {
              scrollbar: { fade: false, interactive: true },
              preventDefault: false,
              mouseWheel: true
            });
          });
        }
        this.isShowtt = true;
        this.meterName = meterName;
        this.$http
          .get(
            "/treeService/tree/getAllSystemTreeNode?&sign=" +
              sessionStorage.getItem("accessToken")
          )
          .then(res => {
            if (res.data.code == 0) {
              count++;
              this.handleLoad(2, count);
              //       this.$notify.error({
              //   title: '错误',
              //   message: "系统错误（code==0）"
              // });
              return;
            }
            count++;
            this.handleLoad(2, count);
            console.log(res);
            this.children = res.data.data.allSubSystems;
            console.log(this.children);
          })
          .catch(error => {
            count++;
            this.handleLoad(2, count);
            //     this.$notify.error({
            //   title: '错误',
            //   message:"系统错误（error）"
            // });
          });
        this.$http
          .get(
            "/maintenanceService/maintenance/getMeter?appkey=3917230828&sign=" +
              sessionStorage.getItem("accessToken") +
              "&consId=" +
              id
          )
          .then(res => {
            if (res.data.code == 0) {
              count++;
              this.handleLoad(2, count);
              //       this.$notify.error({
              //   title: '错误',
              //   message: "系统错误（code==0）"
              // });
              return;
            }
            console.log(res);
            count++;
            this.handleLoad(2, count);
            var data = res.data.data.meters;
            this.meters = [];
            var i = 1;
            for (var a of data) {
              this.meters.push([
                {
                  name: a.mrid,
                  hasInput: false
                },
                {
                  name: a.pathName,
                  hasInput: false
                },
                {
                  name: a.consMeterNo,
                  hasInput: true
                }
              ]);
              i++;
            }
          })
          .catch(error => {
            count++;
            this.handleLoad(2, count);
            //       this.$notify.error({
            //   title: '错误',
            //   message:"系统错误（error）"
            // });
          });
      }
    },
    getMeters(mrid) {
      this.$http
        .get(
          "/quotaService/quota/getMeter?sign=" +
            sessionStorage.getItem("accessToken") +
            "&stId=" +
            mrid
        )
        .then(res => {
          if (res.data.code == 0) {
            //     this.$notify.error({
            //   title: '错误',
            //   message: "系统错误（code==0）"
            // });
            return;
          }
          this.isShowtm = false;
          var data = res.data.data.meters;
          if (data.length > 0) {
            this.meterData = [];
            for (var i in data) {
              this.meterData.push([i - -1, data[i].mrid, data[i].pathName]);
            }
            this.meterDataAll = this.meterData;
          }
        });
    },
    ssMeter() {
      this.meterData = [];
      for (var a of this.meterDataAll) {
        if (a[2].indexOf(this.meterDataName) != -1) {
          this.meterData.push(a);
        }
      }
    },
    updateCons() {
      var arr = [];
      console.log(this.meters);
      if (this.meters.length > 0) {
        for (var a of this.meters) {
          if (a[2].name == "" || a[2].name == null) {
            this.$notify.info({
              title: "消息",
              message: "请输入营销电表ID"
            });
            return;
          }
          arr.push({
            mrid: a[0].name,
            consMeterNo: a[2].name,
            consId: this.consId
          });
        }
      }
      console.log(arr);
      this.$http
        .post(
          "/dataInteractiveService/interaction/updateConsNoBat?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&consId=" +
            this.consId,
          arr
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success"
            });
            this.getCons();
          } else {
            //     this.$notify.error({
            //   title: '错误',
            //   message: "系统错误（code==0）"
            // });
          }
        });
      // .catch(error => {
      //   this.$notify.error({
      //   title: '错误',
      //   message:"系统错误（error）"
      // });
      // });
    },
    addToRight() {
      if (this.readyIndex == -1) {
        this.$notify.info({
          title: "消息",
          message: "请先选中左侧要添加的设备!"
        });
        return;
      }
      var a = this.meterData[this.readyIndex];
      var hasMrid = false;
      for (var b of this.meters) {
        if (a[1] == b[0].name) {
          hasMrid = true;
          break;
        }
      }
      if (!hasMrid) {
        this.meters.push([
          {
            name: a[1],
            hasInput: false
          },
          {
            name: a[2],
            hasInput: false
          },
          {
            name: "",
            hasInput: true
          }
        ]);
      } else {
        this.$notify.info({
          title: "消息",
          message: "已存在该设备！"
        });
      }
    },
    delToRight() {
      if (this.delIndex == -1) {
        this.$notify.info({
          title: "消息",
          message: "请先选中右侧要删除的设备!"
        });
        return;
      }
      this.meters.splice(this.delIndex, 1);
    },
    edit(index) {
      this.editIndex = index;
      this.isShowb = true;
      this.editNum = this.tbodys[index][1].name;
      this.editName = this.tbodys[index][2].name;
      if (this.tbodys[index][3].name != "") {
        for (var i in this.diquNames) {
          var a = this.diquNames[i];
          if (this.tbodys[index][3].name == a.areaName) {
            this.editDiquName = i;
          }
        }
      } else {
        this.editDiquName = 0;
      }
      if (this.tbodys[index][4].name != "") {
        for (var a of $bvId) {
          if (this.tbodys[index][4].name == a.dydj + "kV") {
            this.editBvId = a.bvId;
          }
        }
      } else {
        this.editBvId = "";
      }
      console.log(this.editDiquName);
    },
    confirm() {
      if (
        sessionStorage.getItem("systemId") == undefined ||
        sessionStorage.getItem("systemId") == null ||
        sessionStorage.getItem("systemId") == ""
      ) {
        if (this.editDiquName == 0) {
          this.$notify.info({
            title: "消息",
            message: "请填写完整后在点击修改!"
          });
          return;
        }
      }
      if (this.editNum == "" || this.editBvId == "" || this.editName == "") {
        this.$notify.info({
          title: "消息",
          message: "请填写完整后在点击修改!"
        });
      } else {
        this.isShowb = false;
        console.log(this.editIndex, this.editName);
        var index = this.editIndex;
        this.tbodys[index][1].name = this.editNum;
        this.tbodys[index][2].name = this.editName;
        this.tbodys[index][3].name = this.diquNames[this.editDiquName].areaName;
        var dydj = "";
        for (var a of $bvId) {
          if (this.editBvId == a.bvId) {
            dydj = a.dydj + "kV";
          }
        }
        this.tbodys[index][4].name = dydj;
        // if(this.editName==""||this.editNum==""){
        //   this.$notify.info({
        //     title: '消息',
        //     message: '请填写完整数据!!!'
        //   });
        // }
        this.$http
          .post(
            "/dataInteractiveService/interaction/saveCons?appkey=3917230828&sign=" +
              sessionStorage.getItem("accessToken"),
            qs.stringify({
              consName: this.editName,
              consNo: this.editNum,
              areaId: this.diquNames[this.editDiquName].mrId,
              bvId: this.editBvId,
              id: this.tbodys[this.editIndex][0].id
            })
          )
          .then(res => {
            if (res.data.code == 1) {
              this.getCons();
              this.$notify({
                title: "成功",
                message: "编辑成功",
                type: "success"
              });
            }
          });
      }
    },
    add() {
      this.isShown = true;
    },
    confirmAdd() {
      this.isShown = false;
      for (var a of $areaId) {
        if (a.areaName == this.diquNames[this.newEditDiquName].areaName) {
          var areaId = a.mrId;
        }
      }
      if (areaId && this.newEditBvId && this.newEditNum && this.newEditName) {
        this.$http
          .post(
            "/dataInteractiveService/interaction/saveCons?appkey=3917230828&sign=" +
              sessionStorage.getItem("accessToken"),
            qs.stringify({
              consName: this.newEditName,
              consNo: this.newEditNum,
              areaId: areaId,
              bvId: this.newEditBvId
            })
          )
          .then(res => {
            if (res.data.status == "SUCCEED") {
              this.getCons();
              this.$notify({
                title: "成功",
                message: "新增成功",
                type: "success"
              });
            }
          });
      } else {
        this.$notify.info({
          title: "消息",
          message: "请填写完整再添加!"
        });
      }
    },
    deletqd(id) {
      this.$http
        .post(
          "/dataInteractiveService/interaction/delCons?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            id: id
          })
        )
        .then(res => {
          if (res.data.code == 1) {
            this.getCons();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success"
            });
          }
        });
    },
    delet(isRed, id, name) {
      if (isRed) {
        this.$confirm("确认删除序号：" + name, "确定删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.deletqd(id);
          })
          .catch(() => {
            this.$notify.info({
              title: "消息",
              message: "已取消删除"
            });
          });
      } else {
        this.$notify.info({
          title: "消息",
          message: "请先删除营销用户关联的电表"
        });
      }
    },
    //按厂站名称搜索厂站
    getAllSubstation() {
      if (this.factoryStationName == "") {
        this.$notify.info({
          title: "消息",
          message: "请输入搜索关键字"
        });
        returnl;
      }
      this.isShowtm = true;
      this.$http
        .get(
          "/treeService/tree/getAllSubStationBySystemIdAndStationName?sign=" +
            sessionStorage.getItem("accessToken") +
            "&stationName=" +
            this.factoryStationName
        )
        .then(res => {
          if (res.data.code == 0) {
            //     this.$notify.error({
            //   title: '错误',
            //   message: "系统错误（code==0）"
            // });
            return;
          }
          var data = res.data.data.allSubStations;
          this.factoryStationNames = data;
        });
      // .catch(error => {
      //   this.$notify.error({
      //   title: '错误',
      //   message:"系统错误（error）"
      // });
      // });
    }
  },
  watch: {
    // pageIndex: function() {
    //   this.getCons(this.pageIndex, 0);
    // }
  }
};
</script>
<style>
.shang {
  border: 4px solid transparent;
  border-bottom: 4px solid #6bc30d;
}
.xia {
  border: 4px solid transparent;
  border-top: 4px solid #6bc30d;
}
table tr td {
  text-align: center;
}
.yx_ul li {
  float: left;
  margin-left: 5px;
  background: #045b5b;
  color: #ccc;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.yx_ul {
  height: 30px;
  float: right;
}
.yx_ul:after {
  content: "";
  display: block;
  clear: both;
}
.yx_ul li.checked {
  background: #0eb6b6;
  color: #fff;
}
.yxdady {
  padding: 20px 10px;
}
.yxdady .disBtn {
  background: #225e70;
  cursor: default;
}
.yxdady .isClick {
  cursor: pointer;
  color: #00ee00;
}
.yxdady .isRed {
  color: #f6726c !important;
}
.yxdady .span {
  color: #fff;
  font-size: 14px;
  display: inline-block;
  width: 100px;
  text-align: center;
}
.yxdady .edit > div {
  margin-bottom: 10px;
}
.yxdady .paging {
  border-top: 1px solid #0d7474;
  padding-top: 15px;
}
/* 树 */
.yxdady .treeDatas1 {
  /* width: 20%; */
  height: 515px;
  background: #012828 /*#011B1B*/;
  margin: 0 1% 0 0;
  position: relative;
  /* display: inline-block; */
  box-sizing: border-box;
  padding-left: 20px;
}
.yxdady .readyBg {
  background: #3d3640 !important;
}
/* 折叠按钮 */
.yxdady .fold_button {
  position: absolute;
  top: 50%;
  right: -21px;
  width: 20px;
  height: 20px;
  background: url("../../../../assets/img/icons.png") no-repeat -59px -224px;
  cursor: pointer;
}
.yxdady .fold_right {
  background: url("../../../../assets/img/icons.png") no-repeat -82px -255px;
}
.yxdady .fold_button:hover {
  background-color: #0a2d2d;
}
.yxdady .colse {
  width: 0 !important;
  padding: 0 !important;
}
.yxdady .colse > ul {
  display: none;
}
.yxdady .stationBox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
  text-align: center;
}
.yxdady .stationBox ul li {
  width: 20%;
  float: left;
  margin-left: 3%;
  text-align: center;
  cursor: pointer;
  color: #84f1f1;
  border-bottom: 1px solid#84f1f1;
}
.yxdady .stationBox ul li:hover {
  color: #fff;
  background-color: #1e90ff;
}
.yxdady .x_tittle {
  text-align: center;
}
.yw_left_tool_bar {
  margin-bottom: 12px;
}
</style>
