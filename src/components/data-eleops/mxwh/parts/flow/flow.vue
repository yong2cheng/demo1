<template lang="html">
  <div class="flow_wrap">
    <div class="sgin_sub_wrap">
      <!-- 确认框 -->
        <div class="centent_box" v-if ="step=='step1'">
            <h4>注册厂站</h4>
            <!-- {{flowData}} -->
            <h3 class="zcTil">是否重新注册厂站({{flowData.localName}})?</h3>
            <button @click="step='step2';getDynamicIp()">确认</button>
            <button class="warning" style="margin-left:15px;" @click="closeFlow();">取消</button>
        </div>
        <!--  流程框-->
        <div class="flow_centent_box" v-if ="step=='step2'">
          <div class="msg_content">
            <p>步骤2</p>
            <p v-for='item in msgArr'>{{item}}</p>
          </div>
        </div>
        <!--  步骤框-->
        <div class="flow_centent_box" v-if ="step=='step3'">
            步骤3
          <ul class="steplist">
            <li class="xzstep">1.唯一性</li>
            <li>2.命名规范</li>
            <li>3.关联关系</li>
            <li>4.自动关联</li>
          </ul>
        </div>
        <!--  svg-->
        <div class="overlay_wrap svg_wrap1" v-if ="step=='step4'">
          <div class="svg_wrap" ref='svg'>

          </div>
        </div>
    </div>
  </div>
</template>
<script>
let timer = ""; //定时器
let timer1 = ""; //定时器
import qs from "qs";
import areaMap from "@/assets/config/areaMap";
export default {
  data() {
    return {
      areaIds: this.areaId,
      step: "step1",
      url: "", //动态ip
      msgArr: [],
      clearTimer: ""
    };
  },
  props: ["flowData", "areaId"],
  methods: {
    closeFlow() {
      //点击取消关闭Flow
      this.$emit("closeFlow", false);
    },
    getDynamicIp() {
      //获取动态ip，并跑第一步
      this.$http
        .get(
          "prefectureLevelCityService/prefectureLevelCityApi/getSubsystemList",
          {
            params: {
              sign: sessionStorage.getItem("accessToken")
            }
          }
        )
        .then(res => {
          if (res.data.code === 1) {
            let systemId = this.mapArea();
            res.data.data.allSubSystems.forEach(item => {
              if (item.systemId == systemId) {
                this.url = item.fetchUrl;
                this.flowOne(systemId); //跑第一步
                this.flowTow(); //跑第二步
                this.clearTow();
              }
            });
          }
        });
    }, //获取动态ip
    mapArea() {
      //通过长的地区id匹配短的id
      let id = "";
      areaMap.forEach(item => {
        if (item.mrId == this.areaId) {
          return (id = item.areaId);
        }
      });
      return id;
    },
    flowOne(systemId) {
      var that = this;
      this.$http
        .post(
          this.url +
            "/modelRegister?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            localId: this.flowData.localId,
            // stName: this.flowData.localName,
            systemId: systemId,
            subareaId: this.areaIds
          })
        )
        .then(res => {
          //返回stId,最后一步需要
          console.log(res);
        })
        .catch(function(error) {
          // that.flowTow(); //跑第二步
          this.$notify({
            title: "提示",
            message: "注册流程发生异常",
            duration: 1500,
            type: "error"
          });
        });
    },
    flowTow() {
      //第二步
      timer = setInterval(() => {
        this.$http
          .get(this.url + "/modelRegisterInfo", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              // stName: this.flowData.localName
              localId: this.flowData.localId
            }
          })
          .then(res => {
            this.msgArr = res.data.modelRegisterInfo;
            if (
              res.data.modelRegisterInfo.indexOf("本次注册流程结束......") >
                -1 &&
              res.data.modelRegisterInfo.indexOf("失败......") < 0
            ) {
              clearInterval(timer); //循环完成,准备跑第三步
              this.flowThree();
              setTimeout(() => {
                this.step = "step3";
              }, 1000);
            } else {
              clearInterval(timer); //循环完成,准备跑第三步
            }
          });
      }, 1000);
    },
    flowThree() {
      //流程三
      timer1 = setInterval(() => {
        this.$http
          .get(this.url + "/modelCheckInfo", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              stId: this.flowData.mrId
            }
          })
          .then(res => {
            if (res.data.modelCheckVO.step4) {
              window.clearInterval(timer1);
              this.initSubs();
            }
          });
      }, 1000);
    },
    initSubs() {
      this.$http("/systemService/systemInit/initModelBySubstation", {
        params: {
          stId: this.flowData.mrId
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.step = "step4";
          this.flowFour();
        } else {
          alert("缓存异常！");
        }
      });
    },
    flowFour() {
      //获取svg
      this.$http
        .get("/analysisService/analy/getSubstationSVG", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            stId: this.flowData.mrId,
            flag: "f"
          }
        })
        .then(res => {
          this.$refs.svg.innerHTML = res.data;
        })
        .catch(erro => {
          alert("获取SVG图失败！");
        });
    },
    clearTow() {
      setTimeout(() => {
        this.$confirm("注册时间过长, 是否继续?", "提示", {
          confirmButtonText: "继续",
          cancelButtonText: "退出",
          type: "warning"
        })
        .then(() => {})
        .catch(() => {
           clearInterval(timer);
          this.$notify({
            title: "提示",
            message: "注册流程已取消！",
            duration: 1500,
            type: "warning"
          });
        });
      }, 20000);
    }
  }
};
</script>
<style lang="css">
.sgin_sub_wrap {
  padding: 10px;
  background: #043434;
}
.centent_box {
  width: 420px;
  height: 270px;
  text-align: center;
}
/* .flow_centent_box {
  width: 500px;
  height: 366px;
} */
.centent_box h4 {
  margin-top: 10px;
}
.centent_box h3 {
  margin-top: 60px;
  margin-bottom: 20px;
}
.steplist li.xzstep {
  background: #043434;
  color: #fff;
}
.msg_content {
  width: 420px;
  height: 270px;
  /* box-sizing: border-box; */
  padding: 10px;
  overflow: auto;
}
.msg_content p {
  margin-bottom: 14px;
}
.steplist li {
  float: left;
  width: 85px;
  height: 34px;
  padding: 0 5px 0 30px;
  background: #043434;
  position: relative;
  line-height: 34px;
  font-size: 16px;
  color: #84f1f1;
}
.steplist li:before,
.steplist li:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 17px;
  border-color: transparent transparent transparent #035252;
  position: absolute;
  top: 0;
  right: -34px;
  z-index: 2;
}
.steplist li.xzstep:before {
  border-color: transparent transparent transparent #0a9c9c;
}
.steplist li:after {
  border-color: transparent transparent transparent #0b6666;
  z-index: 1;
}
.svg_wrap1 {
  background-color: #043434;
  box-shadow: none;
  height: 80vh !important;
}
.svg_wrap,
.svg_wrap svg {
  width: 100%;
  height: 100%;
}
.zcTil {
  margin-bottom: 80px !important;
}
</style>
