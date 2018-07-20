<template>
    <div class="logsWrap">
        <h4 class="logsTitle">设备名称</h4>
        <div class="meterWraps">
         <div class="elewraps">
          <div class="svgWrap">
        <div class="svg1">
            <!-- <svg id="svgd1" width="700" height="250">
                <ellipse class="s-mp" cx="100" cy="120" ry="70" rx="80" fill="#D08C4D"></ellipse>
                <text class="aa s-mp" font-size="14" x="70" y="170">
                    <tspan font-size="16">参与母平计算</tspan>
                    <tspan x="70" y="190">所属母线：</tspan><tspan>{{dataSvg.vlPathName}}</tspan>
                    <tspan x="70" y="210">替代信息：</tspan><tspan>{{dataSvg.replaceInfo}}</tspan>
                    <tspan x="70" y="230">最后参与计算时间：</tspan><tspan>{{dataSvg.vlLastCalculationTime}}</tspan>
                </text>
                <line class="s-mp" x1="350" y1="400" x2="120" y2="200"  stroke="red" stroke-width="2"  />
                <ellipse class="s-fxxs" cx="280" cy="90" ry="70" rx="80" fill="#B2C6E1"></ellipse>
                <text class="aa s-fxxs" font-size="14" x="370" y="130">
                    <tspan font-size="16">参与分线线损计算</tspan>
                    <tspan x="370" y="150">所属线路：</tspan><tspan>{{dataSvg.aclinePathName}}</tspan>
                    <tspan x="370" y="170">替代信息：</tspan><tspan>{{dataSvg.replaceInfo}}</tspan>
                    <tspan x="370" y="190">最后参与计算时间：</tspan><tspan>{{dataSvg.aclineLastCalculationTime}}</tspan>
                </text>
                <line class="s-fxxs" x1="350" y1="400" x2="285" y2="175"  stroke="red" stroke-width="2"  />
                <ellipse class="s-fyxs" cx="450" cy="90" ry="70" rx="80" fill="#F1D9D7"></ellipse>
                <text class="aa s-fqxs" font-size="14" x="660" y="110">
                    <tspan font-size="16">参与分压线损计算</tspan>
                    <tspan x="660" y="130">所属地区：</tspan><tspan>{{dataSvg.gridRegion}}</tspan>
                    <tspan x="660" y="150">所属电压等级:</tspan><tspan>{{dataSvg.gridBasevoltage}}</tspan>
                    <tspan x="660" y="170">关口类型:</tspan><tspan>{{dataSvg.gridGateName}}</tspan>
                    <tspan x="660" y="190">替代信息：</tspan><tspan>{{dataSvg.replaceInfo}}</tspan>
                    <tspan x="660" y="210">最后参与计算时间：</tspan><tspan>{{dataSvg.gridLastCalculationTime}}</tspan>
                </text>
                <line class="s-fyxs" x1="350" y1="400" x2="430" y2="175"  stroke="red" stroke-width="2" />
                <ellipse class="s-fqxs" cx="620" cy="120" ry="70" rx="80" fill="#C3C3C3"></ellipse>
                <text class="aa s-fqxs" font-size="14" x="940" y="150">
                    <tspan font-size="16">参与分区线损计算</tspan>
                    <tspan x="940" y="170">所属地区：</tspan><tspan>{{dataSvg.areaRegion}}</tspan>
                    <tspan x="940" y="190">所属电压等级：</tspan><tspan>{{dataSvg.areaBasevoltage}}</tspan>
                    <tspan x="940" y="210">关口类型:</tspan><tspan>{{dataSvg.areaGateName}}</tspan>
                    <tspan x="940" y="230">替代信息：</tspan><tspan>{{dataSvg.replaceInfo}}</tspan>
                    <tspan x="940" y="250">最后参与计算时间：</tspan><tspan>{{dataSvg.areaLastCalculationTime}}</tspan>
                </text>
                <line class="s-fqxs" x1="350" y1="400" x2="600" y2="200"  stroke="red" stroke-width="2"  />
                <defs>
                    <marker id="markerArrow" markerWidth="13" markerHeight="13" refx="0" refy="3" orient="auto">
                        <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000000;" />
                    </marker>
                </defs>
            </svg> -->
            <svg id="svgd2" width="400" height="400">
                <text class="s-diqu" font-size="16" x="100" y="60">湖北</text>
                <text font-size="16" x="100" y="85">
                    <tspan class="s-time"></tspan>
                    <tspan>单位：kWh</tspan>
                </text>

                <rect width="250" height="100" x="75" y="100" fill="white" stroke="black">
                </rect>>
                <text font-size="16" x="100" y="130">
                    <tspan>正向有功：</tspan>
                    <tspan class="s-zhen"></tspan>
                </text>
                <text font-size="16" x="100" y="170">
                    <tspan>反向有功：</tspan>
                    <tspan class="s-fan"></tspan>
                </text>
                <circle s-i="0" class="s-shuju s-shuju1" cx="100" cy="230" r="10" fill="red" stroke="black"></circle>
                <circle s-i="1" class="s-shuju s-shuju2" cx="150" cy="230" r="10" fill="white" stroke="black"></circle>
                <circle s-i="2" class="s-shuju s-shuju3" cx="200" cy="230" r="10" fill="white" stroke="black"></circle>
                <circle s-i="3" class="s-shuju s-shuju4" cx="250" cy="230" r="10" fill="white" stroke="black"></circle>
                <circle s-i="4" class="s-shuju s-shuju5" cx="300" cy="230" r="10" fill="white" stroke="black"></circle>
                <text font-size="16" x="85" y="260">
                    <tspan x="85">零点</tspan>
                    <tspan x="85" y="280">冻结</tspan>
                </text>
                <text font-size="16" x="135" y="260">
                    <tspan x="135">电量</tspan>
                    <tspan x="135" y="280">数据</tspan>
                </text>
                <text font-size="16" x="185" y="260">
                    <tspan x="185">积分</tspan>
                    <tspan x="185" y="280">电量</tspan>
                </text>
                <text font-size="16" x="235" y="260">
                    <tspan x="235">副表</tspan>
                    <tspan x="235" y="280">电量</tspan>
                </text>
                <text x="285" y="260">
                    <tspan x="285">对端</tspan>
                    <tspan x="285" y="280">电量</tspan>
                </text>
                <text font-size="14" x="100" y="310">
                    <tspan>电表序号：</tspan>
                    <tspan>${mrids}</tspan>
                </text>
                <text font-size="14" x="100" y="330">
                        <tspan>电表类型：</tspan>
                        <tspan>321654</tspan>
                </text>
                <text font-size="14" x="100" y="350">
                        <tspan>TV：</tspan>
                        <tspan>${(data.tv1)/(data.tv2)}</tspan>
                </text>
                <text font-size="14" x="100" y="370">
                    <tspan>TA：</tspan>
                    <tspan>${(data.ta1)/(data.ta2)}</tspan>
                </text>
            </svg>
        </div>    
          </div>
        <div class="cloudWraps">
          <div id="cloudWrap"></div>
        </div>  
        </div>
            <div class="ele-table">
                <table class="table">
                    <thead>
                        <tr>
                            <td width="40%">属性名称</td>
                            <td width="60%">属性值</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>计量点ID</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>计量点名称</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>所属厂站</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>电压等级</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>设备类型</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>倍率</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>对端设备</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>副表</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>最后采集时间</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>历史换表记录</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>历史倍率更换记录</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>数据异常次数</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>数据修复准确率</td>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>      
    </div>
</template>

<script>
import clound from "../mixins/clound";
import BScroll from "better-scroll";
import mixins from "../mixins/chart";
export default {
  data() {
    return {
      dataSvg: {},
      JosnList: []
    };
  },
  created() {
    this.getMeterArchivesData();
    this.getAllInvolveIndex();
    this.WordCloundFun();
  },
  props: ["querys"],
  mixins: [clound],
  methods: {
    //错误表格
    getMeterArchivesData() {
      this.$http
        .get("/dataDiagnoseService/dataDiagnose/getMeterArchivesData", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            devId: this.querys
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            console.log(res);
          }
        });
    },
    //电表
    getAllInvolveIndex() {
      this.$http
        .get("/dataDiagnoseService/dataDiagnose/getAllInvolveIndex", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            devId: this.querys
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            console.log(res);
          }
        });
    },
    //词云
    WordCloundFun() {
      this.$http
        .get("/dataDiagnoseService/dataDiagnose/getEquipemntAttribute", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            devId: this.querys
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            console.log(res);
            this.JosnList = res.data.data.getEquipemntAttribute;
          }
        });
    }
  },
  mounted() {
    this.$nextTick(() => {
      let elewraps = new BScroll(".elewraps", {
        scrollbar: true,
        mouseWheel: true,
        preventDefault: false
      });
      let eletable = new BScroll(".ele-table", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        preventDefault: false,
        mouseWheel: true
      });
    });
  }
};
</script>

<style>
.logsWrap {
  width: 80vw;
  max-width: 1380px;
  height: 76vh;
  padding: 10px 16px;
  position: relative;
}
.logsTitle {
  height: 8vh;
  box-sizing: border-box;
  margin-bottom: 2vh;
  line-height: 8vh;
  border-bottom: 1px dashed #51a5a5;
}
.meterWraps {
  height: 66vh;
  overflow: hidden;
  position: relative;
}
.elewraps {
  position: absolute;
  width: 75%;
  height: 100%;
  left: 0;
  /* max-height: 74vh; */
  overflow: hidden;
  /* position: relative; */
  z-index: 1;
}
.svgWrap{
    height: 100%;
}
.ele-table {
  width: 25%;
  position: absolute;
  right: 0;
  height: 100%;
  box-sizing: border-box;
  padding-left: 14px;
}
.svg1 {
  height: 100%;
  position: relative;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
}
.cloudWraps {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
#cloudWrap {
  height: 100%;
  width: 100%;
}
#svgd2 {
  border-radius: 50%;
  border: 1px solid #0d7474;
  background: linear-gradient(#035252, #2a6e6e);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
/* #svgd1 {
  overflow: visible;
  margin-left: 50px;
} */
.aa {
  transform: scale(0.6, 0.6);
}
</style>
