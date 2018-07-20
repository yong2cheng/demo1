<template>
  <div style="width:100%;" class="two gather_cover">
        <div style="width:64%;margin:0;" class="gather_cover">
            <div class="bkbt">
                {{name}}
                <button class="right" @click="downloadSS()">下载</button>
            </div>
            <div v-html="svgHtml"></div>
        </div>
        <div style="width:35%;0;margin:0;position:relative;overflow:hidden;height:652px;" class="scroll5 gather_cover">
            <div>
              <div v-if="dydjArr.length<=0">暂无数据</div>
                    <div :key="index" v-for="(item,index) in dydjArr">
                    <div @click="nowindex==index?nowindex=-1:nowindex=index;" style="cursor:pointer;background:#0d7474;margin-bottom:5px;" class="bkbt">
                        {{item}}kV母线
                    </div>
                    <div :class="{hzero:index!=nowindex}">
                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <td>参入计算</td>
                                                    <td>设备类型</td>
                                                    <td colspan="3">TMR系统</td>
                                                    <td colspan="3">EMS系统</td>
                                                    <td>关联</td>
                                                </tr>
                                            </thead>
                                            
                                        </table>
                                        <div>
                                            <table class="table">
                                                <tr :key="indexm" v-for="(itemm,indexm) in tmrEmsAll[index]">
                                                  <td>
                                                    <span style="width:10px;height:10px;display:inline-block;">
                                                          <input disabled  :checked="jisuan.indexOf(itemm[0].mrid)!=-1" type="checkbox">
                                                        </span>
                                                  </td>
                                                    <td @click="clickGuanlian(itemd.hasClick,itemd.c,index)" :key="indexd" v-for="(itemd,indexd) in itemm" :colspan="itemd.numone">
                                                      <span style="position:relative;">
                                                      <span :class="{bgc:itemd.bgc,c:itemd.c}">{{itemd.name}}</span> 
                                            
                                                      </span>
                                                        
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                    </div>
                    
                </div>
            </div>
            
            
        </div>
        <!-- 模型关联 -->
       <overlay oheight="60%"  :close.sync="isShowtm">
           <div class="yiji_t">
             <div class="t_title">
               <span>模型关联</span>
             </div>
               <p style="margin-bottom:5px;"><button @click="guanlian=false" :class="{warning:!guanlian}">未关联</button><button @click="guanlian=true" :class="{warning:guanlian}">已关联</button></p>
               <div style="height:calc(100% - 81px);border:1px solid #0d7474;box-sizing:border-box;padding:20px;" v-if="!guanlian">
                   <div style="width:40%;height:100%;float:left;border:1px solid #0d7474;box-sizing:border-box;padding:20px;">
                       <h4>TMR</h4>
                       <table class="table">
                           <thead>
                                <tr>
                                    <td>选择</td>
                                    <td colspan="3">设备名称</td>
                                </tr>
                           </thead>
                       </table>
                       <div class="scroll1" style="height:calc(100% - 54px);position:relative;overflow:hidden;">
                           <table class="table">
                               <tr :key="index" v-for="(item,index) in wtmr">
                                   <td><input @click="tmrmrid=item.mrid;tmrtype=item.type" type="radio" :checked="tmrmrid==item.mrid" /></td>
                                   <td colspan="3">{{item.name}}</td>
                               </tr>
                           </table>
                       </div>
                   </div>
                   <button @click="newguanlian()" style="position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;height:30px;width:70px">关联</button>
                   <div style="width:40%;height:100%;float:right;border:1px solid #0d7474;box-sizing:border-box;padding:20px;">
                       <h4>EMS</h4>
                       <table class="table">
                           <thead>
                                <tr>
                                    <td>选择</td>
                                    <td colspan="3">设备名称</td>
                                </tr>
                           </thead>
                       </table>
                       <div class="scroll2" style="height:calc(100% - 54px);position:relative;overflow:hidden;">
                           <table class="table">
                               <tr :key="index" v-for="(item,index) in wems">
                                   <td><input @click="emsmrid=item.mrid" type="radio" :checked="emsmrid==item.mrid" /></td>
                                   <td colspan="3">{{item.name}}</td>
                               </tr>
                           </table>
                       </div>
                   </div>
               </div>
               <div style="height:calc(100% - 89px);border-bottom:1px solid #0d7474;" v-if="guanlian">
                   <table class="table">
                       <thead>
                           <tr>
                                <td>TMR</td>
                                <td>EMS</td>
                                <td>操作</td>
                            </tr>
                       </thead>
                       
                   </table>
                   <div style="height:calc(100% - 36px);position:relative;overflow:hidden;" class="scroll4">
                       <table class="table">
                           <tbody>
                               <tr :key="index" v-for="(item,index) in ytmr">
                                   <td @click="jiechugl(itemd.hasClick,itemd.mrid,itemd.type)" :class="{c:itemd.hasClick}" :key="indexd" v-for="(itemd,indexd) in item">{{itemd.name}}</td>
                               </tr>
                           </tbody>
                       </table>
                   </div>
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
import $bvId from "../../../assets/config/bvidMap";
import BScroll from "better-scroll";
import overlay from "@/components/common/overlay";
import qs from "qs";
export default {
  data: function() {
    return {
      stId: this.$route.query.stId,
      mrId: this.$route.query.mrId,
      name: this.$route.query.name,
      svgHtml: "",
      bvIdArr: [],
      dydjArr: [],
      ytmrAll: [],
      ytmr: [],
      tmrEmsAll: [],
      tmrEms: [],
      wtmr: [],
      wtmrAll: [],
      wemsAll: [],
      wems: [],
      jisuan: [],
      guanlian: true,
      isShowtm: false,
      emsmrid: "",
      tmrtype: "",
      tmrmrid: "",
      emsSystemId: "",
      nowindex: -1,
      indexgl: 0,
      isLoading: true,
      scroll1:"",
      scroll2:"",
      scroll4:""
    };
  },
  components: {
    overlay
  },
  mounted() {
    this.isLoading = true;
    this.$nextTick(() => {
      let scroll5 = new BScroll(".scroll5", {
        scrollbar: { fade: false, interactive: true },
        preventDefault:false,
        mouseWheel: true
      });
    });
    this.$http
      .get(
        "/analysisService/analy/getSubstationSVG?appkey=3917230828&sign=" +
          sessionStorage.getItem("accessToken") +
          "&stId=" +
          this.stId
      )
      .then(res => {
        this.svgHtml = res.data;
      });
    this.getright();
  },
  methods: {
    downloadSS(){
      window.open(this.$http.defaults.baseURL+"/analysisService/analy/getSubstationSVG?appkey=3917230828&sign=" +
          sessionStorage.getItem("accessToken") +
          "&stId=" +
          this.stId);
    },
    handleType(genre, a2, data2, yemsline, ytmr, tmrAll, wtmrline) {
      var genreType;
      var genreModels;
      if (genre === "线端") {
        genreType = "aclineend";
        genreModels = "lineEndModels";
      } else if (genre === "绕组") {
        genreType = "transformerwinding";
        genreModels = "transformerWindingModels";
      } else if (genre === "电容器") {
        genreType = "compensator";
        genreModels = "compensatorModels";
      } else if (genre === "机组") {
        genreType = "generatingUnit";
        genreModels = "generatingUnitModels";
      } else if (genre === "站用电") {
        genreType = "energyconsumer";
        genreModels = "energyconsumerModels";
      } else if (genre === "虚拟设备") {
        genreType = "virtureEquipment";
        genreModels = "virtureEquipmentModels";
      } else if (genre === "开关") {
        genreType = "breaker";
        genreModels = "unAttachedBreakers";
      }
      //console.log(a2[genreModels]);
      if (
        a2[genreModels] === undefined ||
        a2[genreModels] === "" ||
        a2[genreModels] === null
      ) {
        return;
      }
      if (a2[genreModels].length > 0) {
        for (var b of a2[genreModels]) {
          if (
            b.otherKey3 !== "" &&
            b.otherKey3 !== null &&
            b.otherKey3 !== undefined
          ) {
            var cy = false;
            for (var d of data2.voltageLevelModels) {
              if (genre === "虚拟设备") {
                for (var typed of this.modelsType) {
                  if (
                    d[typed] === undefined ||
                    d[typed] === "" ||
                    d[typed] === null
                  ) {
                    break;
                  }
                  for (var c of d[typed]) {
                    console.log(b.otherKey3 === c.mrid);
                    if (b.otherKey3 === c.mrid) {
                      cy = true;
                      if(yemsline.indexOf(c.mrid)===-1){
                        yemsline.push(c.mrid);
                      }
                      ytmr.push([
                        {
                          name: b.localName,
                          numone: 3
                        },
                        {
                          name: c.name,
                          numone: 3
                        },
                        {
                          name: "解除",
                          hasClick: true,
                          mrid: b.mrid,
                          type: genreType
                        }
                      ]);
                      tmrAll.push([
                        {
                          name:
                            genre === "站用电"
                              ? b.energyconsumerType === 1
                                ? "站用变"
                                : b.energyconsumerType === 2
                                  ? "备用"
                                  : b.energyconsumerType === 3
                                    ? "消弧线圈"
                                    : b.energyconsumerType === 4
                                      ? "电表"
                                      : "其他"
                              : genre,
                          mrid: b.mrid,
                          typeName: genre,
                          bvId: a2.bvId,
                          numone: 1
                        },
                        {
                          name: b.localName,
                          numone: 3
                        },
                        {
                          name: c.name,
                          numone: 3
                        },
                        {
                          name: "关联",
                          numone: 1,
                          c: true,
                          hasClick: true
                        }
                      ]);
                    }
                  }
                }
              } else {
                if (
                  d[genreModels] === undefined ||
                  d[genreModels] === "" ||
                  d[genreModels] === null
                ) {
                  break;
                }
                for (var c of d[genreModels]) {
                  //console.log(b.otherKey3 === c.mrid);
                  if (b.otherKey3 === c.mrid) {
                    cy = true;
                    if(yemsline.indexOf(c.mrid)===-1){
                        yemsline.push(c.mrid);
                      }
                    ytmr.push([
                      {
                        name: b.localName,
                        numone: 3
                      },
                      {
                        name: c.name,
                        numone: 3
                      },
                      {
                        name: "解除",
                        hasClick: true,
                        mrid: b.mrid,
                        type: genreType
                      }
                    ]);
                    tmrAll.push([
                      {
                        name:
                          genre === "站用电"
                            ? b.energyconsumerType === 1
                              ? "站用变"
                              : b.energyconsumerType === 2
                                ? "备用"
                                : b.energyconsumerType === 3
                                  ? "消弧线圈"
                                  : b.energyconsumerType === 4 ? "电表" : "其他"
                            : genre,
                        typeName: genre,
                        mrid: b.mrid,
                        bvId: a2.bvId,
                        numone: 1
                      },
                      {
                        name: b.localName,
                        numone: 3
                      },
                      {
                        name: c.name,
                        numone: 3
                      },
                      {
                        name: "关联",
                        numone: 1,
                        c: true,
                        hasClick: true
                      }
                    ]);
                  }
                }
              }
            }
            //.log('cy',cy);
            if (!cy) {
              wtmrline.push({
                name: b.localName,
                mrid: b.mrid,
                type: genreType
              });
            }
          } else {
            wtmrline.push({
              name: b.localName,
              mrid: b.mrid,
              type: genreType
            });
          }
        }
      }
    },
    getqueshi(bvId, data2, yemsline, genre, tmrAll, linequeshi, wtmrline,yemsvir) {
      var genreModels;
      if (genre === "线端") {
        genreModels = "lineEndModels";
      } else if (genre === "绕组") {
        genreModels = "transformerWindingModels";
      } else if (genre === "电容器") {
        genreModels = "compensatorModels";
      } else if (genre === "机组") {
        genreModels = "generatingUnitModels";
      } else if (genre === "站用电") {
        genreModels = "energyconsumerModels";
      } else if (genre === "虚拟设备") {
        genreModels = "virtureEquipmentModels";
      } else if (genre === "开关") {
        genreModels = "unAttachedBreakers";
      }
      for (var a of wtmrline) {
        tmrAll.push([
          {
            name: genre,
            mrid: a.mrid,
            typeName: genre,
            localName: a.name,
            numone: 1
          },
          {
            name: a.name,
            hasClick: true,
            numone: 3
          },
          {
            name: "",
            numone: 3
          },
          {
            name: "未关联",
            numone: 1,
            hasClick: true,
            c: true
          }
        ]);
      }
      //console.log(data2.voltageLevelModels);
      for (var a of data2.voltageLevelModels) {
        
          if (
            a[genreModels] === "" ||
            a[genreModels] === undefined ||
            a[genreModels] === null
          ) {
            return;
          }
          for (var b of a[genreModels]) {
            console.log(b.mrid,yemsline);
            if (yemsline.indexOf(b.mrid) === -1&&yemsvir.indexOf(b.mrid)===-1) {
              linequeshi.push({
                name: b.name,
                mrid: b.mrid
              });
            }
          }
        
      }
      for (var i = 0; i < linequeshi.length; i++) {
        tmrAll.push([
          {
            name: genre,
            typeName: genre,
            mrid: linequeshi[i].mrid,
            localName: linequeshi[i].name,

            numone: 1
          },
          {
            name: "缺失",
            queshi: true,
            hasClick: true,
            bgc: true,
            numone: 3
          },
          {
            name: linequeshi[i].name,
            numone: 3
          },
          {
            name: "未关联",
            numone: 1,
            hasClick: true,
            c: true
          }
        ]);
      }
    },
    getright() {
      this.isLoading = true;
      this.ytmrAll = [];
      this.tmrEmsAll = [];
      this.wtmrAll = [];
      this.wemsAll = [];
      this.bvIdArr = [];
      this.dydjArr = [];
      this.$http
        .get(
          "/analysisService/analy/getSubstationModel?inUse=1&sign=" +
            sessionStorage.getItem("accessToken") +
            "&stId=" +
            this.stId
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
          var data = res.data.data.substationModel;
          var tmrAll = [];
          var ytmr = []; //已关联tmr
          var yemsline = []; //已关联的ems线端

          var yemstransf = []; //已关联的ems绕组
          var wtmrline = []; //未关联的tmr线端
          var wtmrtransf = []; //未未关联的ems绕组
          var yemscom = [];
          var wtmrcom = [];
          var yemsgen = [];
          var wtmrgen = [];
          var yemsbre = [];
          var wtmrbre = [];
          var yemsene = [];
          var wtmrene = [];
          var yemsvir = [];
          var wtmrvir = [];
          this.emsSystemId = data.otherKey4;
          var bvId;
          this.$http
            .get(
              "/analysisService/analy/getEMSSubstationModel?sign=" +
                sessionStorage.getItem("accessToken") +
                "&systemId=" +
                data.otherKey4 +
                "&stId=" +
                data.otherKey3
            )
            .then(res2 => {
              if (res2.data.code === 0) {
                  // this.$notify.error({
                  //   title: "错误",
                  //   message: "未知错误===0）"
                  // });
                  var data2 = { voltageLevelModels: [] };
                } else {
                  var data2 = res2.data.data.substationModel;
                }
              console.log(data);
              console.log(data2);
              for (var a of data.voltageLevelModels) {
                this.$http
                  .get(
                    "/analysisService/analy/getBalanceConfigModel?appkey=3917230828&sign=" +
                      sessionStorage.getItem("accessToken") +
                      "&vlId=" +
                      a.mrid
                  )
                  .then(res => {
                    console.log(res);
                    var data3 = res.data.data.model;
                    for (var b of data3) {
                      for (var a of b.lineEndModels) {
                        if (this.jisuan.indexOf(a.mrid) == -1) {
                          this.jisuan.push(a.mrid);
                        }
                      }
                      for (var a of b.transformerWindingModels) {
                        if (this.jisuan.indexOf(a.mrid) == -1) {
                          this.jisuan.push(a.mrid);
                        }
                      }
                    }
                    console.log(this.jisuan);
                  });
                if (this.bvIdArr.indexOf(a.bvId) == -1) {
                  for (var b of $bvId) {
                    if (b.bvId == a.bvId) {
                      this.bvIdArr.push(a.bvId);
                      this.dydjArr.push(b.dydj);
                    }
                  }
                }
              }
              console.log(this.bvIdArr);
              for (var sca of this.bvIdArr) {
                bvId = sca;
                tmrAll = [];
                ytmr = []; //已关联tmr
                yemsline = []; //已关联的ems线端
                wtmrline = []; //未关联的tmr线端
                yemstransf = []; //已关联的ems绕组
                wtmrtransf = []; //未未关联的ems绕组
                yemscom = []; //已关联的ems电容
                yemsgen = []; //已关联的ems机组
                yemsbre = [];
                wtmrcom = []; //未关联的tmr电容
                wtmrgen = []; //未关联的tmr机组
                yemsbre = [];
                wtmrbre = [];
                yemsene = [];
                wtmrene = [];
                yemsvir = [];
                wtmrvir = [];
                // 线端
                for (var a2 of data.voltageLevelModels) {
                  if (bvId == a2.bvId) {
                    //线端
                    this.handleType(
                      "线端",
                      a2,
                      data2,
                      yemsline,
                      ytmr,
                      tmrAll,
                      wtmrline
                    );
                    //绕组
                    this.handleType(
                      "绕组",
                      a2,
                      data2,
                      yemstransf,
                      ytmr,
                      tmrAll,
                      wtmrtransf
                    );
                    //电容器
                    this.handleType(
                      "电容器",
                      a2,
                      data2,
                      yemscom,
                      ytmr,
                      tmrAll,
                      wtmrcom
                    );
                    //机组
                    this.handleType(
                      "机组",
                      a2,
                      data2,
                      yemsgen,
                      ytmr,
                      tmrAll,
                      wtmrgen
                    );
                    // this.handleType(
                    //   "开关",
                    //   a2,
                    //   data2,
                    //   yemsbre,
                    //   ytmr,
                    //   tmrAll,
                    //    wtmrbre
                    // );
                    //站用电
                    this.handleType(
                      "站用电",
                      a2,
                      data2,
                      yemsene,
                      ytmr,
                      tmrAll,
                      wtmrene
                    );
                    //虚拟设备
                    this.handleType(
                      "虚拟设备",
                      a2,
                      data2,
                      yemsvir,
                      ytmr,
                      tmrAll,
                      wtmrvir
                    );
                  }
                }
                //线端缺失
                var linequeshi = [];
                this.getqueshi(
                  bvId,
                  data2,
                  yemsline,
                  "线端",
                  tmrAll,
                  linequeshi,
                  wtmrline,
                  yemsvir
                );
                //绕组缺失
                var transfqueshi = [];
                this.getqueshi(
                  bvId,
                  data2,
                  yemstransf,
                  "绕组",
                  tmrAll,
                  transfqueshi,
                  wtmrtransf,
                  yemsvir
                );
                //电容器缺失
                var comqueshi = [];
                this.getqueshi(
                  bvId,
                  data2,
                  yemscom,
                  "电容器",
                  tmrAll,
                  comqueshi,
                  wtmrcom,
                  yemsvir
                );
                //机组缺失
                var genqueshi = [];
                this.getqueshi(
                  bvId,
                  data2,
                  yemsgen,
                  "机组",
                  tmrAll,
                  genqueshi,
                  wtmrgen,
                  yemsvir
                );
                //开关缺失
                // var brequeshi=[];
                // this.getqueshi(bvId,data2,yemsbre,"开关",tmrAll,brequeshi,
                //wtmrbre);
                //站用电缺失
                var enequeshi = [];
                this.getqueshi(
                  bvId,
                  data2,
                  yemsene,
                  "站用电",
                  tmrAll,
                  enequeshi,
                  wtmrene,
                  yemsvir
                );
                //虚拟设备缺失
                var virqueshi = [];
                this.getqueshi(
                  bvId,
                  data2,
                  yemsvir,
                  "虚拟设备",
                  tmrAll,
                  virqueshi,
                  wtmrvir,
                  yemsvir
                );

                this.ytmrAll[this.ytmrAll.length] = ytmr;
                this.tmrEmsAll[this.tmrEmsAll.length] = tmrAll;
                this.wtmrAll[this.wtmrAll.length] = wtmrline
                  .concat(wtmrtransf)
                  .concat(wtmrcom)
                  .concat(wtmrgen)
                  // .concat(wtmrbre)
                  .concat(wtmrene)
                  .concat(wtmrvir);
                this.wemsAll[this.wemsAll.length] = linequeshi
                  .concat(transfqueshi)
                  .concat(comqueshi)
                  .concat(genqueshi)
                  // .concat(brequeshi)
                  .concat(enequeshi)
                  .concat(virqueshi);
              }
              console.log(this.tmrEmsAll);
              this.ytmr = this.ytmrAll[this.indexgl];
              this.wtmr = this.wtmrAll[this.indexgl];
              this.wems = this.wemsAll[this.indexgl];
            });
        });
    },
    clickGuanlian(hasClick, c, index) {
      if (hasClick) {
        if (c) {
          this.indexgl = index;
          this.isShowtm = true;
          this.ytmr = this.ytmrAll[index];
          this.wtmr = this.wtmrAll[index];
          this.wems = this.wemsAll[index];
          this.$nextTick(() => {
              this.scroll4 = new BScroll(".scroll4", {
                scrollbar: { fade: false, interactive: true },
                preventDefault:false,
                mouseWheel: true
              });
            });
        }
      }
    },
    checekjisuan(mrid) {
      if (this.jisuan.indexOf(mrid) == -1) {
        this.jisuan.push(mrid);
      } else {
        this.jisuan.splice(this.jisuan.indexOf(mrid), 1);
      }
      console.log(this.jisuan);
    },
    newguanlian() {
      this.$http
        .post(
          "/analysisService/analy/associateEquipment?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            equipmentType: this.tmrtype,
            equipmentId: this.tmrmrid,
            emsEquipmentId: this.emsmrid,
            emsSystemId: this.emsSystemId
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$notify({
          title: '成功',
          message: '关联成功',
          type: 'success'
        });
            this.getright(
              true,
              true,
              this.isMrid,
              this.isStid,
              this.isBvid,
              this.stName
            );
          }
        })
        .catch(error => {
        //   this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
        });
    },
    jiechugl(hasClick, mrid, type) {
      if (hasClick) {
        this.$http
          .post(
            "/analysisService/analy/associateEquipment?appkey=3917230828&sign=" +
              sessionStorage.getItem("accessToken"),
            qs.stringify({
              equipmentType: type,
              equipmentId: mrid
            })
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.$notify({
          title: '成功',
          message: '解除成功!',
          type: 'success'
        });
              this.getright();
            }
          })
      }
    }
  },
  watch:{
    guanlian:function(){
      console.log(this.guanlian);
      if(this.guanlian){
        if(this.scroll4){
          this.scroll4.destroy();
        }
        this.$nextTick(() => {
              this.scroll4 = new BScroll(".scroll4", {
                scrollbar: { fade: false, interactive: true },
                preventDefault:false,
                mouseWheel: true
              });
            });
      }else{
        if(this.scroll1){
          this.scroll1.destroy();
          this.scroll2.destroy();
        }
        this.$nextTick(() => {
              this.scroll1 = new BScroll(".scroll1", {
                scrollbar: { fade: false, interactive: true },
                preventDefault:false,
                mouseWheel: true
              });
              this.scroll2 = new BScroll(".scroll2", {
                scrollbar: { fade: false, interactive: true },
                preventDefault:false,
                mouseWheel: true
              });
            });
      }
    }
  }
};
</script>
<style>
.two .bgc {
  background: #da5a5a !important;
  color: #fff;
  cursor: pointer;
}
.two .c {
  color: #f6726c;
  cursor: pointer;
}
.two .hzero {
  /* display:none !important; */
  height: 0;
  overflow: hidden !important;
}
.two .bgc {
    background: #FF4144 !important;
    color: #fff;
    cursor: default;
    font-size: 14px;
    padding: 0 5px;
    border-radius: 5px;
    position: relative;
}
</style>
