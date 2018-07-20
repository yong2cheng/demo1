
<template>
  <div>
    <!-- 我的代码 -->
      <div class="wrap">
        <router-view/>
        <div class="mxian_succ">
            <!-- 顶部标题栏 -->
            <div class="topBar">
                <h2 class="topTil">平衡异常汇总</h2>
                <div class="inbl">
                  <el-date-picker v-model="monthDate" type="month" placeholder="选择月" value-format="yyyy-MM" />
                </div>
                <div class="inbl">
                  <div class="inbl btn" @click="getBlanceStas();getBlanceStaFre();" >查询</div>
                </div>
            </div>

            <div class="show_box">
                <!-- 表格数据展示 -->
                <div class="tabDataShow">
                    <div class="tab_show">
                        <table class="table tabNoPadding">
                            <thead>
                                <tr>
                                    <td rowspan="2" width="5%">地区</td>
                                    <td colspan="3" width="15%">1000kV</td>
                                    <td colspan="3" width="15%">500kV</td>
                                    <td colspan="3" width="15%">220kV</td>
                                    <td colspan="3" width="15%">110kV</td>
                                    <td colspan="3" width="15%">35kV</td>
                                    <td colspan="3" width="15%">10kV</td>
                                    <td rowspan="2" width="5%">合计</td>
                                </tr>
                                <tr>
                                    <td width="5%">母平</td>
                                    <td width="5%">分线</td>
                                    <td width="5%">分压</td>
                                    <td width="5%">母平</td>
                                    <td width="5%">分线</td>
                                    <td width="5%">分压</td>
                                    <td width="5%">母平</td>
                                    <td width="5%">分线</td>
                                    <td width="5%">分压</td>
                                    <td width="5%">母平</td>
                                    <td width="5%">分线</td>
                                    <td width="5%">分压</td>
                                    <td width="5%">母平</td>
                                    <td width="5%">分线</td>
                                    <td width="5%">分压</td>
                                    <td width="5%">母平</td>
                                    <td width="5%">分线</td>
                                    <td width="5%">分压</td>
                                </tr>
                            </thead>                         
                        </table>
                        <div class="BalanceExSta">
                          <table class="table">
                             <tbody>
                                <tr v-for="(item,inx) of BlanceStaArr" :key="inx">
                                    <td>{{item.systemName}}</td>
                                    <template v-for="(iss,index) of bvArr">
                                        <td :key="index">
                                            <template v-for="(itms,i) of item.bvIndexInfos">
                                                <span class="mpbutt" :key='i'
                                                v-if="itms.bvName==bvArr[index].bvName&&itms.type==bvArr[index].type"
                                                @click="getSubList(itms.type,item.systemId,itms.bvId,item.systemName,itms.bvName,item.systemId)">
                                                    {{itms.unFixedExNum}}/{{itms.exCount}}
                                                </span>
                                            </template>
                                            <span class="ww" :key="'a'+index+inx">0/0</span>
                                        </td>
                                    </template>
                                    <td>{{item.unFixedExSum}}/{{item.exCountSum}}</td>
                                </tr>
                            </tbody>
                          </table>
                        </div>
                    </div>
                    <div class="err_img_tab" id="day_error"></div>
                </div>
                <!--母平弹框-->
                <overlay :close.sync="close"  class="tk_box" >
                    <div class="mpxq_gd"  v-if="type==1&&close">
                        <div class="head_bar">
                        <h3 class="mpxf_title" style="text-align:left; text-indent:10px; width:100%; margin:20px 0;">
                            {{systemName}}&gt;&gt;{{bvName}}母平异常</h3>
                        </div>
                        <div class="xxlb" style="height:calc(100% - 80px)">
                            <table class="table">
                                <tr
                                v-for="(item,index) of balanceExStaByAreaVOS" :key="index">
                                <template v-if="item.length==5">
                                    <td colspan="2" v-for="(itms,i) of item" :key="i" width="20%">
                                        <template v-if="itms.exCount">
                                            <router-link :to="{path: '/mpxf', query:{sysId:$route.query.sysId,vlId:itms.mrid,devName:itms.name,time:monthDate,sonid:$route.query.sonid}}" target="_blank" class="mpbutt" >
                                              {{itms.name}}({{itms.exCount}})
                                            </router-link>
                                        </template>
                                        <template v-else>
                                            {{itms.name}}({{itms.exCount}})
                                        </template>
                                    </td>
                                </template>
                                <template v-else>
                                    <td colspan="2" v-for="(itms,indx) of item" :key="indx" width="20%">
                                        <template v-if="itms.exCount">
                                        <router-link :to="{path: '/mpxf', query:{sysId:$route.query.sysId,sonid:$route.query.sonid}}" target="_blank" >
                                            {{itms.name}}({{itms.exCount}})
                                        </router-link>
                                        </template>
                                        <template v-else>
                                            {{itms.name}}({{itms.exCount}})
                                        </template>
                                    </td>
                                    <td colspan="2"  v-for="(i,indexs) of 5 - item.length" width="20%" :key="indexs"></td>
                                </template>
                                </tr>
                            </table>
                        </div>
                    </div>
                </overlay>
                <!--母平弹框end-->
                <!--分线弹框-->
                <overlay :close.sync="close1"  class="tk_box" >
                    <div class="mpxq_gd"  v-if="type==2&&close1">
                        <div class="head_bar">
                        <h3 class="mpxf_title" style="text-align:left; text-indent:10px; width:100%; margin:20px 0;">
                            {{systemName}}&gt;&gt;{{bvName}}分线异常</h3>
                        </div>
                        <div class="xxlb scrollbox" style="height:calc(100% - 80px)">
                            <table class="table table_tk" cellspacing="0" cellpadding="0">
                                <tr
                                v-for="(item,i) of balanceExStaByAreaVOS" :key="i">
                                <template v-if="item.length==5">
                                    <td colspan="2" v-for="(itms,its) of item" :key="its">
                                        <template v-if="itms.exCount">
                                            <a href="./mpxf_mp.html" target="_blank">
                                            {{itms.name}}({{itms.exCount}})
                                            </a>
                                        </template>
                                        <template v-else>
                                            {{itms.name}}({{itms.exCount}})
                                        </template>
                                    </td>
                                </template>
                                <template v-else>
                                    <td colspan="2" v-for="(itms,index) of item" :key="index">
                                        <template v-if="itms.exCount">
                                        <a href="./mpxf_mp.html" target="_blank">
                                            {{itms.name}}({{itms.exCount}})
                                        </a>
                                        </template>
                                        <template v-else>
                                            {{itms.name}}({{itms.exCount}})
                                        </template>
                                    </td>
                                    <td colspan="2"  v-for="(i,index) of 5 - item.length" :key="index"></td>
                                </template>
                                </tr>
                            </table>
                        </div>
                    </div>
                </overlay>                
                <!--分线弹框end-->
                <!--分压弹框-->
                <overlay :close.sync="close2"   class="tk_box" >
                    <div class="mpxq_gd" v-if="type==3&&close2">
                        <div class="head_bar">
                            <h3 class="mpxf_title" style="text-align:left; text-indent:10px; width:100%; margin:20px 0;">
                                {{systemName}}&gt;&gt;{{bvName}}分压异常</h3>
                        </div>
                        <div class="xxlb scrollbox" style="height:calc(100% - 80px)">
                            <table class="table table_tk" cellspacing="0" cellpadding="0">
                                <tr
                                v-for="(item,i) of balanceExStaByAreaVOS" :key="i"> 
                                <template v-if="item.length==5">
                                    <td colspan="2" v-for="(itms,indent) of item" :key="indent">
                                        <template v-if="itms.exCount">
                                            <a href="./mpxf.html" target="_blank">
                                            {{itms.name}}({{itms.exCount}})
                                            </a>
                                        </template>
                                        <template v-else>
                                            {{itms.name}}({{itms.exCount}})
                                        </template>
                                    </td>
                                </template>
                                <template v-else>
                                    <td colspan="2" v-for="(itms,ins) of item" :key="ins">
                                        <template v-if="itms.exCount">
                                        <a href="./mpxf.html" target="_blank">
                                            {{itms.name}}({{itms.exCount}})
                                        </a>
                                        </template>
                                        <template v-else>
                                            {{itms.name}}({{itms.exCount}})
                                        </template>
                                    </td>
                                    <td colspan="2"  v-for="(i,index) of 5 - item.length" :key="index"></td>
                                </template>
                                </tr>
                            </table>
                        </div>
                    </div>
                </overlay>
            </div>
        </div>
    </div>
     <loading :isLoading='loading'></loading>
  </div>
</template>

<script>
import dateCtrl from "../common/dateCtrl";
import phycMix from "../mixins/phyc";
import overlay from "@/components/common/overlay";
import BScroll from "better-scroll";
import loading from "@/components/common/loading";
export default {
  data: function() {
    return {
      // monthDate: this.$day().format("YYYY-MM"),
      monthDate: "2018-06",
      bvArr: [
        {
          bvName: "AC1000kV",
          type: 1
        },
        {
          bvName: "AC1000kV",
          type: 2
        },
        {
          bvName: "AC1000kV",
          type: 3
        },
        {
          bvName: "AC500kV",
          type: 1
        },
        {
          bvName: "AC500kV",
          type: 2
        },
        {
          bvName: "AC500kV",
          type: 3
        },
        {
          bvName: "AC220kV",
          type: 1
        },
        {
          bvName: "AC220kV",
          type: 2
        },
        {
          bvName: "AC220kV",
          type: 3
        },
        {
          bvName: "AC110kV",
          type: 1
        },
        {
          bvName: "AC110kV",
          type: 2
        },
        {
          bvName: "AC110kV",
          type: 3
        },
        {
          bvName: "AC35kV",
          type: 1
        },
        {
          bvName: "AC35kV",
          type: 2
        },
        {
          bvName: "AC35kV",
          type: 3
        },
        {
          bvName: "AC10kV",
          type: 1
        },
        {
          bvName: "AC10kV",
          type: 2
        },
        {
          bvName: "AC10kV",
          type: 3
        }
      ],
      BlanceStaArr: [], //数据格式（interface），v-for ref才坑
      collRow: [],
      loading: true,
      type: 0, //母平，分线，分压弹框flag
      balanceExStaByAreaVOS: [], //弹框数据
      areaName: "", //地区名字
      bvName: "", //电压name
      systemId: "", //地区id
      close: false,
      close1: false,
      close2: false
    };
  },
  mixins: [phycMix],
  components: {
    dateCtrl,
    overlay,
    loading
  },
  methods: {
    //统计平衡异常
    getBlanceStas: function() {
      var that = this;
      this.$http
        .get(
          `/dataDiagnoseService/dataDiagnose/getBalanceExSta?sign=${
            sessionStorage.accessToken
          }&date=${this.monthDate}&userId=${sessionStorage.userId}`
        )
        .then(res => {
          res.data.data.balanceExStaVOS.forEach(function(item) {
            let unFixedExSum = 0;
            let exCountSum = 0;
            item.bvIndexInfos.forEach(function(item2) {
              unFixedExSum = unFixedExSum + item2.unFixedExNum;
              exCountSum = exCountSum + item2.exCount;
            });
            item.unFixedExSum = unFixedExSum;
            item.exCountSum = exCountSum;
          });
          that.BlanceStaArr = res.data.data.balanceExStaVOS;
          console.log(that.BlanceStaArr);
        });
    },
    //统计平衡异常发生频度
    getBlanceStaFre(res) {
      this.loading = true;
      var that = this;
      this.$http
        .get(
          `/dataDiagnoseService/dataDiagnose/getBalanceExStaFre?sign=${
            sessionStorage.accessToken
          }&date=${this.monthDate}&userId=${sessionStorage.userId}`
        )
        .then(res => {
          this.loading = false;
          var mpArr = [];
          var fxArr = [];
          var fyArr = [];
          res.data.data.balanceExStaFreVOS.forEach(function(item) {
            if (item.type == 1) {
              //母平
              mpArr.push([that.getLastItem(item.date, "-"), item.exCount]);
            } else if (item.type == 2) {
              fxArr.push([that.getLastItem(item.date, "-"), item.exCount]);
            } else if (item.type == 3) {
              fyArr.push([that.getLastItem(item.date, "-"), item.exCount]);
            }
          });
          that.dataMX = mpArr;
          that.dataFX = fxArr;
          that.dataSJ = fyArr;
          that.chart();
        });
    },
    //弹框数据接口请求
    getSubList: function(type, systemId, bvId, systemName, bvName) {
      var that = this;
      that.systemName = systemName;
      that.bvName = bvName;
      that.systemId = systemId;
      that.type = type;
      that.close = true;
      this.loading = true;
      this.$http
        .get(
          `/dataDiagnoseService/dataDiagnose/getAreaBalanceExSta?sign=${
            sessionStorage.accessToken
          }&date=${this.monthDate}&systemId=${systemId}&bvId=${bvId}`
        )
        .then(res => {
          if (res.data.code === 1) {
            this.loading = false;
            var result = [];
            for (
              var i = 0, len = res.data.data.balanceExStaByAreaVOS.length;
              i < len;
              i += 5
            ) {
              result.push(res.data.data.balanceExStaByAreaVOS.slice(i, i + 5));
            }
            that.balanceExStaByAreaVOS = result;
          }
        });
    },
    //字符串转数组，返回最后一项
    getLastItem(items, fmt) {
      return items.split(fmt).pop();
    }
  },
  created: function() {
    this.getBlanceStas();
    this.getBlanceStaFre();
  },
  mounted() {
    this.$nextTick(() => {
      let BalanceExSta = new BScroll(".BalanceExSta", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        preventDefault: false,
        mouseWheel: true
      });
      // let xxlb = new BScroll(".xxlb", {
      //   scrollbar: {
      //     fade: false,
      //     interactive: true
      //   },
      //   preventDefault: false,
      //   mouseWheel: true
      // });
    });
  }
};
</script>

<style>
.topTil {
  width: 70%;
  text-align: center;
  padding-left: 5px;
  height: 50px;
  color: #84f1f1;
  line-height: 50px;
  display: inline-block;
  font-size: 16px;
  font-weight: normal;
}
.table a.mpbutt {
  color: #f6726c;
  text-decoration: none;
}
.mpxf_title {
  width: 30%;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  text-align: center;
  font-weight: normal;
  margin-top: 20px;
  color: #51a5a5;
}
.xxlb {
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 0 18px;
  min-height: 270px;
  max-height: 350px;
}
.tab_show {
  width: 100%;
  margin: 0 auto;
  min-height: 300px;
}
.mpbutt + .ww {
  display: none;
}
.bdb_zs,
.databutt,
.czbutt,
.fgl_butt,
.cgl_butt,
span[class$="butt"] {
  cursor: pointer;
  color: #f6726c;
  font-size: 12px;
}
.err_img_tab {
  width: 100%;
  margin: 0 auto;
  min-height: 300px;
}
.tabNoPadding tr td {
  padding: 0px;
}
.mpxq_gd {
  width: 1398px;
}
@media only screen and (max-width: 1399px) {
  .mpxq_gd {
    width: 1208px !important;
  }
}
.table_tk {
  width: 1000px;
  margin-left: 20px;
}
.BalanceExSta {
  max-height: 280px;
  overflow: hidden;
  position: relative;
  margin-bottom: 28px;
}
</style>

