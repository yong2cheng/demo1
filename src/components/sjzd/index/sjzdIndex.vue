<template>
    <div class="wrap">
      <!-- 我的代码 -->
        <router-view/>
        <div class="mxian_succ">
            <div class="topBar">
                <div class="tools_xl sjzd_left">
                    <iconBtn v-bind:icon="iconBtnList" />
                </div>
                <div class="tools_xl"></div>
                <div class="tools_xl sjzd_right">
                    <el-date-picker v-model="monthDate" type="month" placeholder="选择月份" value-format="yyyy-MM" />
                </div>
                <div class="inbl">
                    <div class="btn" @click="getDate" >查询</div>
                </div>
            </div>
            <div class="all_width">
                <div id="dbl_map" style="width:99%; margin-right:.5%; height:594px">
                    <!-- 主页的地图 -->
                </div>
            </div>
        </div>
        <!--分布图-->
        <overlay :close.sync="isScattergram" class="tk_box" >
            <div class="nrhezi" >
                <div style="height:100%;overflow:hidden;">
                    <div id="fbsd_data">
                    </div>
                    <div id="fbt">
                        <div class="scroll_area">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <td>地区</td>
                                        <td v-for="(areaName,index) of areaNameTab" :key="index">{{areaName.areaName}}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(trArr,index1) of errExceNameCountList" :key="index1">
                                        <td>{{trArr[0][0]}}</td>
                                        <td v-for="(tdArr,indexs) of trArr" :key="indexs" v-if="indexs>0" :errname="trArr[0]" :areaname="tdArr[1]" :class="tdArr[1]? 'errCol' : ''" @click="tdArr[0] && tdArr[1]?errTabList(trArr[0],tdArr[1]) : ''" >
                                            {{tdArr[0]}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </overlay>
		    <!--分布图end-->
        <!-- 错误集合弹框 -->
        <overlay :close.sync="isErrArrTkBox"  class="tk_box" @changeSatus="clearErrorData()">
            <div class="nrhezi" v-if="isErrArrTkBox">
                <div>
                    <div class="tkbar" style="margin-bottom:5px;"> {{tabAreaName}} -> {{errName[0]}} </div>
                    <ul class="errRanderBox" >
                        <li v-for="(li,index) of newErrBoxDataArr" class="errRanderLi" :key="index">
                            <h3 class="slideTil" @click="loadTabScroll(index)" >{{errBoxkvArr[index]}}</h3>
                            <div class="errDataTableBox" :class="'tableScroll'+index" v-show="isShowTab == index" >
                                <table class="table">
                                    <tbody>
                                        <tr v-for="(tr,index1) of li"  :key="index1">
                                            <td v-for="(tds,is) of tr" :key="is">
                                                <router-link :to="{path: '/znyp', query:{sysId:$route.query.sysId,sonid:'8000600051',stbId:tds.sbtId,date:monthDate,sbtName:tds.sbtName,areaName:tabAreaName}}" target="_blank" 
                                                :class="{'color_warning':tds.exceptCount}">
                                                    {{tds?tds.sbtName:''}}
                                                    <template v-if="tds.exceptCount>0">-{{tds.exceptCount}}</template>
                                                </router-link>
                                            </td>
                                            <template v-if="tr.length%5!=0" >
                                                <td v-for="(t,n) of (5-tr.length%5)" :key="n"></td>
                                            </template>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </overlay>
        <!-- 错误集合弹框 end -->
        <loading :isLoading='loading'></loading>
    </div>
</template>
<script>
import areaMap from "@/assets/config/areaMap.js";
import iconBtn from "../common/IconBtn";
import dateCtrl from "../common/dateCtrl";
import index from "../mixins/index";
import overlay from "@/components/common/overlay";
import BScroll from "better-scroll";
import geoCoordMap from "@/assets/config/coordinate.js";
import loading from "@/components/common/loading";
export default {
  mixins: [index],
  data: function() {
    return {
      iconBtnList: [
        {
          iconName: "分布图",
          iconFont: "icon-fenbu"
        },
        {
          iconName: "评估报告",
          iconFont: "icon-pinggubaogao"
        }
      ],
      loading:true,
      token: "",
      getSubSysData: null,
      arrcuowu: [],
      arrdiqu: [],
      datas: null,
      series: [],
      max: 0,
      close: false,
      isScattergram: false,
      isErrArrTkBox: false,
      areaName: null,
      areaNameTab: [], //获得地区名称集合
      errExceName: [], //错误表格名称
      errBoxList: [], //错误弹框数据集合
      errBoxkvArr: [],
      errBoxDataArr: [],
      newErrBoxDataArr: [],
      errExceNameCountList: [], //错误表格名称&数量集合
      // monthDate: this.$day().format("YYYY-MM"),
      monthDate: "2018-06",
      isShowTab: 0,
      scrollFlag: [],
      errName: "",
      tabAreaName: ""
    };
  },
  components: {
    iconBtn,
    dateCtrl,
    overlay,
    loading
  },
  methods: {
    getDate: function() {
      this.mapRender();
    },
    errTabList(errName, areaName) {//厂站错误列表
      this.isErrArrTkBox = true;
      console.log("errName : " + errName, "areaName : " + areaName);
      this.errName = errName;
      this.tabAreaName = areaName;
      let systemId = null;
      this.areaName = areaName;
      areaMap.forEach((v, i) => {
        if (v.areaName == areaName) {
          systemId = v.areaId;
        }
      });
      console.log(systemId);
      if (systemId != null) {
        this.loading = true;
        this.$http
          .get(
            `/dataDiagnoseService/dataDiagnose/getExceptionSubstation?appkey=3917230828&sign=${
              this.token
            }&exceptionName=${errName}&systemId=${systemId}&date=${
              this.monthDate
            }`
          )
          .then(res => {
             this.loading = false;
            this.errBoxList = res;
            this.loadErrTabBox(this.errBoxList);
          })
          .then(() => {
            //默认第一个有滚动条
            this.loadTabScroll(0);
          });
      }
    },
    loadTabScroll(idx) {//加载不同的表格的滚动条
      this.isShowTab = idx;
      this.scrollFlag=[];
      if (this.scrollFlag.indexOf(idx) == -1) {//防止多次加载滚动条
        this.scrollFlag.push(idx);
        var scrollTab = new BScroll(".tableScroll" + idx, {
          scrollbar: { fade: false, interactive: true },
          mouseWheel: true
        });
      }
    },
    loadErrTabBox(getData) {
      let dataArr = null;
      if (getData.data.code) {
        dataArr = getData.data.data.exceptionSubstationVOS;
        if (dataArr) {
          dataArr.forEach((v, i) => {
            if (this.errBoxkvArr.indexOf(v.bvName) == -1) {
              this.errBoxkvArr.push(v.bvName);
            }
          });
          console.log(this.errBoxkvArr);
          this.errBoxkvArr.forEach((v, i) => {
            //['100kv','500kv','220kv','110kv']
            this.errBoxDataArr[i] = [];
            dataArr.forEach((vl, ix) => {
              if (v == vl.bvName) {
                this.errBoxDataArr[i].push(vl);
              }
            });
          });
        }
      }
      let temArr = [];
      this.errBoxDataArr.forEach((val, idx) => {
        temArr[idx] = val;
      });
      let items = [];
      this.errBoxDataArr.forEach((val, idx) => {
        console.log(temArr[idx]);
        var arrNum = Math.ceil(temArr[idx].length / 5); //这组kv数据 最多可以分几行
        var arr = []; //收集 该组kv数据 的每一行
        for (let i = 0; i < arrNum; i++) {
          arr.push(temArr[idx].slice(5 * i, 5 * (i + 1)));
        }
        items.push(arr);
      });
      this.newErrBoxDataArr = items;
    },
    convertData(getData) {
      var res = [];
      if (getData) {
        for (var i = 0; i < getData.length; i++) {
          var geoCoord = geoCoordMap[getData[i].name];
          if (geoCoord) {
            res.push({
              name: getData[i].name,
              value: geoCoord.concat(getData[i].value)
            });
          }
        }
      }
      return res;
    },
    clearErrorData(){
      this.newErrBoxDataArr=[];
    }
  },
  created() {
    this.token = sessionStorage.getItem("accessToken");
    this.mapRender();
  },
  mounted() {
    document.querySelector(".icon-fenbu").addEventListener("click", () => {
      this.isScattergram = true;
      this.loadMainTab(this.getSubSysData);
      let tbodyScroll = new BScroll(".scroll_area", {
        scrollbar: { fade: false, interactive: true },
        mouseWheel: true,
        bounce: {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
      });
    });
  }
};
</script>
<style>
.all_width {
  width: 99%;
  font-size: 13px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  padding: 4px 1%;
}
#dbl_map {
  border: 1px solid #075d5d;
  overflow: hidden;
}
.scroll_area {
  height: 260px;
  overflow: hidden;
  position: relative;
}
#fbtlbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 850;
  transition: all 500ms;
}
#fbsd_data {
  width: 100%;
  width: 1200px;
  margin:  0 auto;
  height: 240px;
}
.nrhezi {
  width: 1398px;
  min-height: 450px;
  padding: 20px 20px;
  /* left: 15%;
  top: 10%; */
  background: #043434;
  box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.1);
  color: #84f1f1;
  z-index: 11;
}
@media (max-width: 1399px) {
  .nrhezi {
    width: 1208px;
  }
}
.errCol {
  color: #f6726c !important;
  cursor: pointer;
}
.slideTil {
  cursor: pointer;
  width: 100%;
  height: 34px;
  line-height: 34px;
  margin-top: 5px;
  margin-bottom: 5px;
  background: #0d7474;
  font-size: 16px;
  color: #84f1f1;
  text-indent: 10px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  font-weight: normal;
}
.errRanderBox {
  margin-top: 20px;
}
.errDataTableBox {
  height: 210px;
  position: relative;
  max-height: 300px;
  overflow: hidden;
}
.errRanderLi {
  position: relative;
}
#fbt{
  margin-top: 12px;
}
</style>
