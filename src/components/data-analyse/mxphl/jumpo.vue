<template>
  <div style="width:100%;padding:10px;" class="jumpo gather_cover">
      <div style="width:58%;margin:0;" class="gather_cover">
        <div class="bkbt">
          <ul>
            <li>{{substation}}SVG</li>
            <li><input type="radio" checked="true" name="lz" @click="typeIndex=0"/>主表电量</li>
            <li><input type="radio" name="lz" @click="typeIndex=1"/>副表电量</li>
            <li><input type="radio" name="lz" @click="typeIndex=2"/>零点冻结</li>
            <li><input type="radio" name="lz" @click="typeIndex=3"/>积分电量</li>
            <li><input type="radio" name="lz" @click="typeIndex=4"/>对端电量</li>
          </ul>
        </div>
        <div v-html="svgHtml"></div>
      </div>
      <div style="width:40%;float:right;margin:0;border:0;" class="gather_cover">
        <div class="bkbt">
              <el-date-picker
                type="date"
                v-model="dayDate"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期">
                </el-date-picker>
              <button @click="getAll()">查询</button>
            <button>报表</button>
            <button @click="downloadSE()">导出</button>
        </div>
        <div style="height:555px;">
          <div>
              <div :key="index" v-for="(item,index) in dydjarr" style="margin:0;width:100%;" class="gather_cover">
                <div @click="nowindex==index?nowindex=-1:nowindex=index;newScroll('scroll'+index)" style="cursor:pointer;background:#0d7474;margin-bottom:5px;" class="bkbt">{{item}}kV母线</div>
                <div :class="{hzero:index!=nowindex}" class="yc">
                    <table class="table">
                    <thead>
                      <tr>
                        <td rowspan="2">设备</td>
                        <td colspan="2">TMR</td>
                        <td colspan="2">EMS</td>
                      </tr>
                      <tr>
                        <td>输入</td>
                        <td>输出</td>
                        <td>输入</td>
                        <td>输出</td>
                      </tr>
                    </thead>
                    </table>
                    <div style="position:relative;overflow:hidden;height:311px;" :class="'scroll'+index">
                       <table class="table">
                          <tbody>
                          <tr :key="indexm" v-for="(itemm,indexm) in rightarr[index]">
                            <td :key="indexd" v-for="(itemd,indexd) in itemm" :colspan="itemd.numone">{{itemd.name}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
          </div>
          
        </div>
      </div>
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
import $bvId from "../../../assets/config/bvidMap";
import BScroll from "better-scroll";
export default {
  data: function() {
    return {
      dayDate: this.$day().format("YYYY-MM-DD"),
      substation: "电站",
      stId: 1030000160601031841,
      svgHtml: "",
      substationEnergys: "",
      dydjarr: [],
      rightarr: [],
      nowindex: 0,
      scrolls: ["scroll0"],
      scrollsT: "",
      isLoading: true,
      equipmentarr: [],
      typeIndex: 0
    };
  },
  mounted: function() {
    this.dayDate = this.$route.query.date + "-01";
    this.getAll();
  },
  methods: {
    getAll() {
      this.isLoading = true;
      this.rightarr = [];
      this.dydjarr = [];
      this.svgHtml = ""; //svg
      this.$http
        .get(
          "/analysisService/analy/getSubstationSVG?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&stId=" +
            this.$route.query.stId
        )
        .then(res => {
          if (res.data.code == 0) {
            //     this.$notify.error({
            //   title: '错误',
            //   message: "系统错误（code==0）"
            // });

            return;
          }
          var data = res.data;
          this.svgHtml = data;
          this.$http
            .get(
              "/dataInteractiveService/interaction/getSubstationEnergy?appkey=3917230828&sign=" +
                sessionStorage.getItem("accessToken") +
                "&day=" +
                this.dayDate +
                "&timeUnit=DAY&stId=" +
                this.$route.query.stId
            )
            .then(res => {
              if (res.data.code == 0) {
                //     this.$notify.error({
                //   title: '错误',
                //   message: "系统错误（code==0）"
                // });
                this.isLoading = false;
                return;
              }
              var data = res.data.data.substationEnergys;
              this.substationEnergys = data;
              if (data.length > 0) {
                //处理电压等级
                for (var a of data) {
                  for (var b of $bvId) {
                    if (a[0].bvId == b.bvId) {
                      this.dydjarr.push(b.dydj);
                      this.rightarr[this.rightarr.length] = [];
                      var in1 = 0;
                      var in2 = 0;
                      var out1 = 0;
                      var out2 = 0;
                      for (var i = 0; i < a.length - 1; i++) {
                        this.equipmentarr.push(a[i].equipmentId);
                        if (a[i].inboundData1 != null) {
                          in1 += a[i].inboundData1;
                        }
                        if (a[i].inboundData1 != null) {
                          in2 += a[i].inboundData2;
                        }
                        if (a[i].inboundData1 != null) {
                          out1 += a[i].outboundData1;
                        }
                        if (a[i].inboundData1 != null) {
                          out2 += a[i].outboundData2;
                        }
                        this.rightarr[this.rightarr.length - 1].push([
                          {
                            name: a[i].equipmentName,
                            numone: 1
                          },
                          {
                            name: a[i].inboundData1,
                            numone: 1
                          },
                          {
                            name: a[i].outboundData1,
                            numone: 1
                          },
                          {
                            name: a[i].inboundData2,
                            numone: 1
                          },
                          {
                            name: a[i].outboundData2,
                            numone: 1
                          }
                        ]);
                      }
                      this.rightarr[this.rightarr.length - 1].push([
                        {
                          name: "合计",
                          numone: 1
                        },
                        {
                          name: in1 - out1,
                          numone: 2
                        },
                        {
                          name: in2 - out2,
                          numone: 2
                        }
                      ]);
                    }
                  }
                }
                // if (this.dydjarr.length > 0) {
                //   this.$nextTick(() => {
                //     let scroll0 = new BScroll(".scroll0", {
                //       scrollbar: { fade: false, interactive: true },
                //       preventDefault:false,
                //       mouseWheel: true
                //     });
                //   });
                // }
                // for(var i=0;i<this.dydjarr.length;i++){
                //   this.$nextTick(() => {
                //     let scroll = new BScroll('.scroll', {scrollbar:true ,mouseWheel: true});
                //   })
                // }
              }
              //console.log(this.equipmentarr);
              this.changeSvg();
              this.isLoading = false;
              this.nowindex = 0;
              this.newScroll("scroll0");
            });
        });
    },
    changeSvg() {
      let mE = [
          ["主表P+:0", "主表P-:0","",""],
          ["副表P+:0", "副表P-:0","",""],
          ["副表P+:0", "副表P-:0", "底末P+:0", "底末P-:0"],
          ["积分P+:0", "积分P-:0","",""],
          ["对端P+:0", "对端P-:0","",""]
        ];
      for (var a of this.equipmentarr) {
        var b = a.toString();
        if (document.getElementById(b)) {
          if (document.getElementById(b).innerHTML) {
             for (var j = 0; j < mE[this.typeIndex].length; j++) {
               var cc=j.toString();

              document.getElementById(b + "-"+ cc).innerHTML = mE[this.typeIndex][j];
            }
          }
        }
      }
    },
    newScroll(cl) {
      if (this.scrollsT) {
        this.scrollsT.destroy();
      }
      this.$nextTick(() => {
        this.scrollsT = new BScroll("." + cl, {
          scrollbar: { fade: false, interactive: true },
          preventDefault: false,
          mouseWheel: true
        });
      });
    },
    downloadSE() {
      this.$http
        .get(
          "/dataInteractiveService/interaction/outSubstationEnergy?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&day=" +
            this.dayDate +
            "&timeUnit=DAY&stId=" +
            this.$route.query.stId
        )
        .then(res => {
          window.location = res.request.responseURL;
        });
    }
  },
  watch:{
    typeIndex:function(){
      this.changeSvg();
    }
  }
};
</script>
<style>
.jumpo .bkbt ul li {
  float: left;
}
.jumpo .yc {
  /* transition: height 0.5s; */
  height: 400px;
}
.jumpo .hzero {
  /* display:none !important; */
  height: 0;
  overflow: hidden !important;
}
</style>
