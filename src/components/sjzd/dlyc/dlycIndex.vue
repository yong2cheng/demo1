<template>
  <div>
      <div class="wrap">
        <router-view/>
        <div class="mxian_succ after">
            <div class="topBar">
                <h2 class="topTil">异常分布</h2>
                <div class="inbl">
                    <el-date-picker v-model="monthDate" type="month" placeholder="选择月" value-format="yyyy-MM" />
                </div>
                <div class="inbl">
                    <div class="inbl btn" @click="searData">查询</div>
                </div>
            </div>

            <!-- 左侧地图 -->
            <div class="dlxf_map main_box" id="dlxf_map"></div>
            <!-- 右侧图表 -->
            <div class="dlxf_tab main_box" id="dlxf_tab">
                <div class="cutkv">
                    <span class="inbl cutBtn" v-for="(kv,i) of unKvArr" :key="i" :class="(isCutkV==i)?'currKv':''" @mouseenter="pickTabEnter" @mouseleave="pickTabLeave" @click="pickTabRander(i)" >{{kv}}</span>
                </div>
                <div class="cutTabBox"  @mouseenter="pickTabEnter" @mouseleave="pickTabLeave" >
                    <!-- <div v-for="(tab,i) of unKvTextArr" :id="'dlxf_right'+i" class="inbl cutTab" ></div> -->
                    <div id="dlxf_right" class="inbl cutTab" ></div>
                </div>
            </div>

            <div class="tabDataShow dlycTable">
                <!-- <table class="table">
                    <thead>
                        <tr>
                            <td colspan="2">地区</td>
                            <td rowspan="2" width="" @click="errorTabRender('湖北','异常')" >
                                <a class="mpbutt color_warning" style="cursor:pointer;">湖北</a>
                            </td>
                            <td rowspan="2" width="">合计</td>
                        </tr>
                        <tr>
                            <td colspan="2" align="center">类型</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(td,i) of hours" :key="i">
                            <td align="center" :rowspan="hours.lenght">{{parentExs[0]}}</td>
                            <td align="center">{{td}}</td>
                            <td align="center">1</td>
                            <td align="center">1</td>
                        </tr>
                        <tr>
                            <td colspan="2" align="center">合计</td>
                            <td align="center">1</td>
                            <td align="center">1</td>
                        </tr>
                    </tbody>
                </table> -->
                 <table class="table">
                <thead>
                    <tr>
                        <td colspan="2">地区</td>
                        <td rowspan="2" width="">国调</td>
                        <td rowspan="2" width="">华中</td>
                        <td rowspan="2" width=""  >
                          <span class="">湖北</span>
                        </td>
                        <td rowspan="2" width="" @click="errorTabRender('武汉','异常')">
                          <span class="color_warning">武汉</span>
                        </td>
                        <td rowspan="2" width="">荆州</td>
                        <td rowspan="2" width="">黄石</td>
                        <td rowspan="2" width="">宜昌</td>
                        <td rowspan="2" width="">襄阳</td>
                        <td rowspan="2" width="">孝感</td>
                        <td rowspan="2" width="">荆门</td>
                        <td rowspan="2" width="">黄冈</td>
                        <td rowspan="2" width="">鄂州</td>
                        <td rowspan="2" width="">咸宁</td>
                        <td rowspan="2" width="">十堰</td>
                        <td rowspan="2" width="">随州</td>
                        <td rowspan="2" width="">恩施</td>
                        <td rowspan="2" width="">神农架</td>
                        <td rowspan="2" width="">合计</td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center">类型</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowspan="3" align="center">数<br>
                            据<br>
                            异<br>
                            常</td>
                        <td>空值</td>
                        <td><u>　</u></td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                    </tr>
                    <tr>
                        <td>负值</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                    </tr>
                    <tr>
                        <td>巨大数</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                    </tr>
                    <tr>
                        <td rowspan="3"  align="center">档<br>
                            案<br>
                            异<br>
                            常 </td>
                        <td>接线异常</td>
                        <td><u>　</u></td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                    </tr>
                    <tr>
                        <td>倍率异常</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                    </tr>
                    <tr>
                        <td>点号异常</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                    </tr>
                    <tr>
                        <td rowspan="3"  align="center">
                            关<br>
                            联<br>
                            异<br>
                            常</td>
                        <td>缺表位</td>
                        <td><u>　</u></td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                    </tr>
                    <tr>
                        <td>EMS匹配</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                    </tr>
                    <tr>
                        <td>营销匹配</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                    </tr>
                    <tr>
                        <td colspan="2">合计</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                        <td>　</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
        <!-- 异常数据表格展示 -->
        <overlay :close.sync="isErrArrTkBox"  class="tk_box" >
            <div class="nrhezi" >
                <div class="tkbar" style="margin-bottom:5px;"> {{areaName}} -> {{areaErrName}} </div>
                <div class="mpxq_gd" style="height: 500px;overflow: hidden;position:relative;">
                    <!-- <table class="table">
                        <tbody>
                            <template v-for="(kv,idx) of kvArr" >
                                <tr v-for="(arr,i) of kv"  :key="i">
                                    <td :rowspan="kvArr[idx].length" v-show="i==0" >{{kvName[idx]}}</td>
                                    <td v-for="(td,index) of arr" :key="index" :class="td.exCount>0?'error_color' : ''" @click="td.exCount>0?goToPage():''" >{{td.sbtName}}({{td.exCount}})</td>
                                    <template v-if="arr.length%5!=0" >
                                        <td v-for="(t,ins) of (5-arr.length%5)" :key="ins"></td>
                                    </template>
                                </tr>
                            </template>
                      </tbody>
                    </table> -->
          <table class="table">
            <tbody>
                <tr>
                    <td width="10%">1000kV</td>
                    <td width="18%"> <router-link :to="{path: '/dlxf', query:{sysId:$route.query.sysId,sonid:'8000600096',stbId:'4201000011201032171',date:monthDate,sbtName:'武汉.油岗',areaName:'武汉'}}" target="_blank" 
                          class="color_warning">
                         武汉.油岗
                      </router-link>
                     
                    </td>
                    <td width="18%">xxx厂站（1）</td>
                    <td width="18%">xxx厂站（2）</td>
                    <td width="18%">xxx厂站（1）</td>
                    <td width="18%">xxx厂站（1）</td>
                </tr>
                <tr>
                    <td rowspan="2">500kV</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td rowspan="6">220kV</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td rowspan="12">110kV</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td rowspan="6">35kV</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
                <tr>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（2）</td>
                    <td>xxx厂站（1）</td>
                    <td>xxx厂站（1）</td>
                </tr>
            </tbody>
          </table>
                </div>
            </div>
        </overlay>
        
    </div>
  </div>
</template>

<script>
import geoCoordMap from "@/assets/config/coordinate.js";
import dateCtrl from "../common/dateCtrl";
import dlycMix from "../mixins/dlyc";
import overlay from "@/components/common/overlay";
import BScroll from "better-scroll";
export default {
  data: function() {
    return {
      monthDate: this.$day().format("YYYY-MM"),
      isCutkV: 0, //当前切换kv的按钮高亮显示
      isErrArrTkBox: false,
      unKvArr: ["750kV", "330kV", "110kV", "35kV", "10kV"],
      unKvTextArr: [
        "750kV异常分布",
        "330kV异常分布",
        "110kV异常分布",
        "35kV异常分布",
        "10kV异常分布"
      ],
      unTabRender: [], //渲染地区异常情况的表格
      kvName: [], //错误集合的kv名字
      kvArr: [], //错误集合kv分类数组
      areaName: "", //查看的地区名称
      areaErrName: "", //查看的地区错误名
      interval: ""
    };
  },
  mixins: [dlycMix],
  components: {
    dateCtrl,
    overlay
  },
  methods: {
    errorTabRender(area, name) {
      var mpxq_gd = new BScroll(`.mpxq_gd`, {
        scrollbar: { fade: false, interactive: true },
        mouseWheel: true,
        scrollX: true,
        scrollY: true,
        bounce: {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
      });
      this.areaName = area;
      this.areaErrName = name;
      this.isErrArrTkBox = true;
      this.$http
        .get(`/dataDiagnoseService/dataDiagnose/getAreaElecDataSta`, {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            date: this.monthDate,
            systemId: sessionStorage.getItem("systemId")
              ? sessionStorage.getItem("systemId")
              : ""
          }
        })
        .then(res => {
          this.errorDataDispose(res.data.data.elecDataStaByAreaVOList);
        });
    },
    //处理弹框数据
    errorDataDispose(data) {
      if (data) {
        this.unTabRender = data;
        data.forEach((v, i) => {
          if (this.kvName.indexOf(v.bvName) == -1) {
            this.kvName.push(v.bvName);
          }
        });
        this.kvName.forEach((vl, ix) => {
          this.kvArr[ix] = [];
          data.forEach((v, i) => {
            if (vl == v.bvName) {
              this.kvArr[ix].push(v);
            }
          });
        });

        let temArr = [];
        this.kvArr.forEach((val, idx) => {
          temArr[idx] = val;
        });
        let items = [];
        this.kvName.forEach((val, idx) => {
          var arrNum = Math.ceil(temArr[idx].length / 5); //这组kv数据 最多可以分几行
          var arr = []; //收集 该组kv数据 的每一行
          for (let i = 0; i < arrNum; i++) {
            arr.push(temArr[idx].slice(5 * i, 5 * (i + 1)));
          }
          items.push(arr);
        });
        this.kvArr = items;
      }
    },
    goToPage() {
      this.$router.push("/dlxf?sysId=5&sonid=65");
    },
    pickTabEnter() {
      clearInterval(this.interval);
    },
    pickTabLeave() {
      this.interval = setInterval(() => {
        this.isCutkV++;
        if (this.isCutkV >= 5) {
          this.isCutkV = 0;
        }
        this.pickTabRander(this.isCutkV);
      }, 3000);
    },
    searData() {
      //重新请求数据页面
      this.httpGetData();
    }
  },
  mounted: function() {
    this.interval = setInterval(() => {
      this.isCutkV++;
      if (this.isCutkV >= 5) {
        this.isCutkV = 0;
      }
      this.pickTabRander(this.isCutkV);
    }, 3000);
    this.$nextTick(() => {
      let dlycTable = new BScroll(".dlycTable", {
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
.wrap {
  position: relative;
}
.topTil {
  width: 70%;
  text-align: left;
  padding-left: 5px;
  height: 50px;
  color: #84f1f1;
  line-height: 50px;
  display: inline-block;
  font-size: 16px;
  font-weight: normal;
}
.dlxf_map {
  width: 45%;
  float: left;
  margin-left: 5px;
}
.dlycTable {
  max-height: 270px;
  overflow: hidden;
  position: relative;
}
.dlxf_tab {
  width: 53%;
  float: right;
  margin-right: 5px;
}
.main_box {
  height: 450px;
  display: inline-block;
  margin-bottom: 10px;
  border: 1px solid #0d7474;
  background: #043434;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}
.currKv {
  border-color: #dd6b66;
  background: #dd6b66;
  color: #fff;
}
.cutkv {
  width: 700px;
  margin: 0 auto;
  text-align: center;
  margin-top: 10px;
}
.cutBtn {
  width: 80px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border: 1px solid #075d5d;
  margin: 0 5px;
  color: #84f1f1;
  font-size: 13px;
  cursor: pointer;
  transition: all 500ms;
}
.cutBtn_active {
  border-color: #dd6b66;
  background: #dd6b66;
  color: #fff;
}
#dlxf_right {
  height: 400px;
  width: 100%;
  max-height: 400px;
}
.cutTabBox {
  /* width: auto; */
  position: relative;
}
.cutTab {
  width: 700px;
  height: 450px;
  float: left;
  position: absolute !important;
  top: 0;
  left: 0;
}
.error_color {
  color: #f94534 !important;
  cursor: pointer;
}
.tabDataShow {
  width: 99%;
  margin: 0 auto;
  margin-bottom: 18px;
}
</style>
