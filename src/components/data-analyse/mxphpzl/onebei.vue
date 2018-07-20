<template>
  <div style="width:100%;padding:10px;height:848px;" class="one gather_cover">
        <div style="width:49%;border:0;height:838px" class="gather_cover">
            <div class="bkbt">
                工具栏
                <ul>
                    <li><input type="text" class="txt" v-model="sousuo" placeholder="输入检索关键词"/></li>
                    <li><button @click="filter()">搜索</button></li>
                    <li><button @click="easyConfig()">一键导入</button></li>
                    <li><button @click="RenewConfig()">重新计算</button></li>
                    <li><button @click="downloadVCBC()">下载</button></li>
                </ul>  
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <td colspan="3">厂站名称</td> 
                        <td colspan="1">序号</td>
                        <td style="text-align:left;" colspan="2"><input :checked="quanxuan" @click="xquanxuan()" type="checkbox"/>母线名称</td>
                        <td colspan="2">配置情况</td>
                    </tr>

                </thead>
            </table>
            <div class="scroll" style="position:relative;overflow:hidden;height:748px;">
                
                <table class="table">
                    <tbody>
                        <tr :key="indexd" v-for="(item,indexd) in tbodys">
                            <td :class="{clickable:child.isClick,isRight:child.hasinput}" :colspan="child.numone" :rowspan="child.numtwo" :key="indexm" v-for="(child,indexm) in item">
                                <input class="diya" :checked="quanxuan||(child.config=='未配置'&&quxiao)" :value="child.num" type="checkbox" v-if="child.hasinput"/>
                                <span @click="child.hasinput==true?getright(child.isClick,child.hasinput,child.mrid,child.stId,child.bvId,child.stationName+'-'+child.name):toTwo(child.isClick,child.stId,child.mrid,child.name)">{{child.name}}</span>
                             </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
       <div style="width:49%;float:right;border:0;height:838px" class="gather_cover">
            <div style="width:100%;height:493px;border:0;" class="gather_cover">
                <div class="bkbt">
                    <ul>
                        <li>
                            <el-date-picker
                            type="date"
                            v-model="dayDate"
                            value-format="yyyy-MM-dd"
                            placeholder="yyyy-MM-dd">
                            </el-date-picker>
                        </li>
                        <li><button @click="yulan()">预览</button></li>
                    </ul>
                </div>
                <div v-html="svgHtml"></div>
            </div>
            <div style="width:100%;height:336px;margin-top:4px;border:0;" class="gather_cover">
                <div style="height:33px;" class="bkbt">
                    <span style="float:none;width:30%;">{{stName}}</span>
                    <ul class="drx" style="width:70%;">
                        <li style="position:relative;">
                          <ul v-if="isShaixuan" style="position:absolute;top:-40px;background:#0d7474;width:236px;border-radius:5px;">
                            <li style="width:60px;float:left;">
                              <input :checked="dianrong" @click="dianrong=!dianrong" type="checkbox"/>电容器
                            </li>
                            <li style="width:77px;float:left;">
                              <input :checked="beiyong" @click="beiyong=!beiyong" type="checkbox"/>备用设备
                            </li>
                            <li style="width:63px;float:left;">
                              <input :checked="zydian" @click="zydian=!zydian" type="checkbox"/>站用电
                            </li>
                            <li style="width:0px;border: 10px solid transparent;border-top: 10px solid #0d7474;position:absolute;top:31px;left:14px;"></li>
                          </ul>
                          <button @click="isShaixuan=!isShaixuan" class="lbtn">筛选</button></li>
                        <li><button @click="isShowtsave=true;" class="lbtn">保存</button></li>
                        <li><button @click="jisuan=[];jisuanline=[];jisuantrans=[];" class="lbtn">清空</button></li>
                        <li><button @click="huanyuan()" class="lbtn">还原</button></li>
                        <li><button @click="shanchu()" class="lbtn">删除</button></li>
                        <li><button @click="xiufu()" class="lbtn">修复</button></li>
                        <li><button @click="lishi()" class="lbtn">历史</button></li>
                        <li><button @click="toTwo(true,isStid,isMrid,stName)" class="lbtn">比对</button></li>
                    </ul>
                </div>
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
                <!-- <div style="text-align:center;" v-if="youxia">
                    <img src="../../../assets/img/loading.gif" alt="加载中...">
                </div> -->
                <div style="height:244px;overflow:hidden;position:relative;" class="scroll3">
                    
                    <table class="table">
                        <tr v-if="(item[1].name!='电容器'&&item[1].name!='站用电'&&item[1].name!='备用')||((item[1].name=='电容器')&&dianrong)||((item[1].name=='站用变')&&zydian)||((item[1].name=='备用')&&beiyong)" :key="index" v-for="(item,index) in tmrEms">
                            <td @click="clickGuanlian(itemd.hasClick,itemd.c)" :class="{bgc:itemd.bgc,c:itemd.c}" :key="indexd" v-for="(itemd,indexd) in item" :colspan="itemd.numone">{{itemd.name}}
                                <span v-if="itemd.hasInput" @click="checekjisuan(itemd.mrid,item[1].name)" :class="{bgc:jisuan.indexOf(itemd.mrid)!=-1}" style="width:10px;height:10px;display:inline-block;background:#ddd;">
                                  <input v-if="itemd.hasInput" :checked="jisuan.indexOf(itemd.mrid)!=-1" type="checkbox">
                                </span>
                                
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
       </div>
       <overlay style="min-height:500px;" oheight="80%" owidth="80%"  :close.sync="isShowt">
           <div style="text-align:center;height:100%;padding:20px;">
               <div class="center_f">
                   <h2>母平配置一键导入</h2>
               </div>
                <table class="table">
                    <thead>
                        <tr>
                            <td colspan="1">序号</td>
                            <td colspan="3">
                                <input :checked="ischekedAll" v-model="ischekedAll" type="checkbox">
                                母线名称
                            </td>
                            <td colspan="3">处理类型</td>
                        </tr>
                    </thead>
                </table>
                <div class="scroll1" style="position:relative;overflow:hidden;height:70%;margin-bottom:10px;">
                    <table class="table">
                        <tbody>
                            <tr :key="index" v-for="(item,index) in doruArr">
                                <td colspan="1">{{index+1}}</td>
                                <td colspan="3" style="text-align:left;"><input class="peizhi" :value="index" :checked="ischekedAll" type="checkbox">{{item.pathName}}</td>
                                <td colspan="3">自动配置</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button @click="chuli()">开始处理</button>
           </div>
            
       </overlay>
       <!-- 重新计算 -->
       <overlay style="min-height:500px;" oheight="80%" owidth="80%"  :close.sync="isShowtc">
           <!-- <overlay oheight="50%" owidth="250px"  :close.sync="isShowtcc">
               <div style="height:10px;"></div>
               <el-date-picker
                type="date"
                v-model="startTimec"
                value-format="yyyy-MM-dd"
                placeholder="开始时间">
                </el-date-picker>
                <div style="height:10px;"></div>
                <el-date-picker
                type="date"
                v-model="endTimec"
                value-format="yyyy-MM-dd"
                placeholder="结束时间">
                </el-date-picker>
                <div style="height:10px;"></div>
                <button style="width:220px;text-align:center;" @click="chuli2()">确定</button>
            </overlay> -->
           <div style="text-align:center;height:100%;padding:20px;">
               <div class="center_f">
                   <h2>母线平衡率重计算</h2>
               </div>
                
                <button style="float:right;" @click="RenewConfig()">刷新</button>
                <table class="table">
                    <thead>
                        <tr>
                            <td colspan="1">序号</td>
                            <td colspan="3">
                                <input :checked="ischekedAllc" v-model="ischekedAllc" type="checkbox">
                                母线名称
                            </td>
                            <td colspan="2">处理类型</td>
                            <td colspan="3">任务开始时间</td>
                            <td colspan="3">任务结束时间</td>
                            <td colspan="3">处理结果</td>
                        </tr>
                    </thead>
                </table>
                <div class="scroll2" style="position:relative;overflow:hidden;height:62%;margin-bottom:10px;">
                    <table class="table">
                        <tbody>
                            <tr :key="index" v-for="(item,index) in voltageLevelPageTipVOList">
                                <td colspan="1">{{index+1}}</td>
                                <td colspan="3" style="text-align:left;"><input class="peizhi2" :value="index" v-model="dddd" type="checkbox">{{item[0]}}</td>
                                <td colspan="2">母线</td>
                                <td colspan="3">{{item[2]}}</td>
                                <td colspan="3">{{item[3]}}</td>
                                <td colspan="3">{{item[4]}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <el-date-picker
                type="date"
                v-model="startTimec"
                value-format="yyyy-MM-dd"
                placeholder="开始时间">
                </el-date-picker>
                <el-date-picker
                type="date"
                v-model="endTimec"
                value-format="yyyy-MM-dd"
                placeholder="结束时间">
                </el-date-picker>
                <button @click="chuli2()">开始处理</button>
           </div>
            
       </overlay>
       <!-- 模型关联 -->
       <overlay style="min-height:500px;" oheight="80%" owidth="80%"  :close.sync="isShowtm">
           <div style="height:100%;padding:20px;">
               <div class="center_f">
                   <h2>模型关联</h2>
               </div>
               
               <p style="margin-bottom:10px;"><button @click="guanlian=false" :class="{bgc:!guanlian}">未关联</button><button @click="guanlian=true;scroll();" :class="{bgc:guanlian}">已关联</button></p>
               <div style="height:100%;" v-show="!guanlian">
                   <div class="" style="width:40%;height:80%;float:left;">
                       <h4>TMR</h4>
                       <input v-model="tmrName" type="text" placeholder="请输入设备名称" class="txt"/>
                       <button @click="soutmr()" class="sousuo">搜索</button>
                       <table class="table">
                           <thead>
                                <tr>
                                    <td>选择</td>
                                    <td>设备名称</td>
                                </tr>
                           </thead>
                       </table>
                       <div class="scroll8" style="height:65%;position:relative;overflow:hidden;">
                           <table class="table">
                               <tr :key="index" v-for="(item,index) in wtmrAll">
                                   <td><input @click="tmrmrid=item.mrid;tmrtype=item.type" type="radio" :checked="tmrmrid==item.mrid" /></td>
                                   <td>{{item.name}}</td>
                               </tr>
                           </table>
                       </div>
                   </div>
                   <button @click="newguanlian()" style="position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;margin-left:50%;height:30px;">关联</button>
                   <div style="width:40%;height:80%;float:right;">
                       <h4>EMS</h4>
                       <input v-model="emsName" type="text" placeholder="请输入设备名称" class="txt"/>
                       <button @click="souems()" class="sousuo">搜索</button>
                       <table class="table">
                           <thead>
                                <tr>
                                    <td>选择</td>
                                    <td>设备名称</td>
                                </tr>
                           </thead>
                       </table>
                       <div class="scroll9" style="height:65%;position:relative;overflow:hidden;">
                           <table class="table">
                               <tr :key="index" v-for="(item,index) in wemsAll">
                                   <td><input @click="emsmrid=item.mrid" type="radio" :checked="emsmrid==item.mrid" /></td>
                                   <td>{{item.name}}</td>
                               </tr>
                           </table>
                       </div>
                   </div>
               </div>
               <div style="height:100%;" v-show="guanlian">
                   <table class="table">
                       <thead>
                           <tr>
                                <td>TMR</td>
                                <td>EMS</td>
                                <td>操作</td>
                            </tr>
                       </thead>
                       
                   </table>
                   <div style="height:65%;position:relative;overflow:hidden;" class="scroll4">
                       <table class="table">
                           <tbody>
                               <tr :key="index" v-for="(item,index) in ytmrAll">
                                   <td @click="jiechugl(itemd.hasClick,itemd.mrid,itemd.type)" :class="{c:itemd.hasClick}" :key="indexd" v-for="(itemd,indexd) in item">{{itemd.name}}</td>
                               </tr>
                           </tbody>
                       </table>
                   </div>
               </div>
           </div>
               
           
       </overlay>
       <!-- 保存选择时间 -->
       <overlay oheight="200px" owidth="250px"  :close.sync="isShowtsave">
           <div style="text-align:center;">
               选择时间：
           <el-date-picker
                style="margin:10px;"
            type="datetime"
            v-model="configTime"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="yyyy-MM-dd hh:mm:ss">
            </el-date-picker>
            <div><button @click="saves()">确定保存</button></div>
           </div>
           
       </overlay>
       <!-- 还原 -->
       <overlay style="min-height:500px;" oheight="80%" owidth="80%"  :close.sync="isShowth">
           <div style="padding:20px;height:100%;">
               <p>母线配置还原  <span>{{stName}}</span></p>
               <button>对比分析</button><button @click="isShowthh=true">还原配置</button>
               <overlay oheight="30%" owidth="20%"  :close.sync="isShowthh">
                   <div style="padding:10px;text-align:center;">
                        <span style="margin:10px;">配置重计算生效时间</span>
                    <el-date-picker
                     style="margin:10px;"
                                type="date"
                                v-model="dayDate"
                                value-format="yyyy-MM-dd hh:mm:ss"
                                placeholder="yyyy-MM-DD HH:mm:ss">
                                </el-date-picker>
                        <p><button @click="huanyuanpeizhi()">保存提交</button></p>
                   </div>
                   
               </overlay>
                <table class="table">
                    <thead>
                        <tr>
                            <td></td>
                            <td>序号</td>
                            <td colspan="2">配置生效时间</td>
                            <td colspan="2">最后更新时间</td>
                            <td colspan="4">母平计算公式</td>
                            <td>状态</td>
                        </tr>
                    </thead>
                </table>
                <div style="height:72%;position:relative;overflow:hidden" class="scroll5">
                    <table class="table">
                        <tbody>
                            <tr :key="index" v-for="(item,index) in huanyuanAll">
                                <td :colspan="itemd.numone" :key="indexd" v-for="(itemd,indexd) in item">
                                    {{itemd.name}}
                                    <input class="huanyuanid" :value="itemd.id"  type="radio" name="huanyuan" v-if="itemd.hasInput" :disabled="itemd.status=='使用中'" />
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
           </div>
       </overlay>
       <!-- 删除 -->
       <overlay style="min-height:500px;" oheight="80%" owidth="80%"  :close.sync="isShowts">
           <div style="padding:20px;height:100%;">
               <p>母线配置删除  <span>{{stName}}</span></p>
               <button @click="shanchupeizhi()">删除</button>
                <table class="table">
                    <thead>
                        <tr>
                            <td></td>
                            <td>序号</td>
                            <td colspan="2">配置生效时间</td>
                            <td colspan="2">最后更新时间</td>
                            <td colspan="4">母平计算公式</td>
                            <td>状态</td>
                        </tr>
                    </thead>
                </table>
                <div style="height:80%;position:relative;overflow:hidden" class="scroll6">
                    <table class="table">
                        <tbody>
                            <tr :key="index" v-for="(item,index) in shanchuAll">
                                <td :colspan="itemd.numone" :key="indexd" v-for="(itemd,indexd) in item">
                                    {{itemd.name}}
                                    <input class="shanchuid" :value="itemd.id"  type="radio" name="shanchu" v-if="itemd.hasInput" />
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
           </div>
       </overlay>
       <!-- 修复 -->
       <overlay style="min-height:500px;" oheight="80%" owidth="80%"  :close.sync="isShowtxiufu">
               <div style="margin:20px;">
                   <span>母线配置修复</span>
                    <span>{{stName}}</span>
               </div>
               <div class="xiufu xiufu1" style="display:inline-block;width:38%;height:80%;background:#012323;position:relative;overflow:hidden;">
                   <ul>
                       <li @click="xiufuleftzs(index)" :class="{checked:xiufuleftindexs.indexOf(index)!=-1}" :key="index" v-for="(item,index) in xiufuleft">{{item.name}}</li>
                   </ul>
               </div>
               <div style="display:inline-block;width:20%;vertical-align:top;height:80%;text-align:center;">
                   <button @click="addtoright()" style="margin-bottom:20px;">添加&gt;</button><br>
                   <button @click="deltoleft()" style="margin-bottom:20px;">&lt;移除</button><br>
                   <button @click="xiufusave()">保存 </button>
               </div>
               <div class="xiufu xiufu2" style="display:inline-block;width:38%;height:80%;background:#012323;vertical-align:top;padding:10px;position:relative;overflow:hidden;">
                   <ul>
                       <li @click="xiufurightzs(index)" :class="{checked:xiufurightindexs.indexOf(index)!=-1}" :key="index" v-for="(item,index) in xiufuright">{{item.name}}</li>
                   </ul>
               </div>
       </overlay>
       <!-- 历史 -->
       <overlay style="min-height:500px;" oheight="80%" owidth="80%"  :close.sync="isShowtl">
           <div style="padding:20px;height:100%;">
               <p>母线配置历史 <span>{{stName}}</span></p>
                <table class="table">
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td colspan="2">配置生效时间</td>
                            <td colspan="2">最后更新时间</td>
                            <td colspan="4">母平计算公式</td>
                            <td>状态</td>
                        </tr>
                    </thead>
                </table>
                <div style="height:80%;position:relative;overflow:hidden" class="scroll7">
                    <table class="table">
                        <tbody>
                            <tr :key="index" v-for="(item,index) in lishiAll">
                                <td :colspan="itemd.numone" :key="indexd" v-for="(itemd,indexd) in item">
                                    {{itemd.name}}
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
           </div>
       </overlay>
       <!-- 预览 -->
       <overlay style="min-height:500px;" oheight="80%" owidth="80%" :close.sync="isShowYL">
         <div style="width:100%;height:80%;padding:10px;box-sizing:border-box;">
            <table class="table">
              <thead>
                <tr>
                  <td colspan="3" rowspan="2">设备</td>
                  <td rowspan="2">倍率</td>
                  <td colspan="2">初冻结</td>
                  <td colspan="2">末冻结</td>
                  <td colspan="2">采集电量</td>
                </tr>
                <tr>
                  <td>正向有功</td>
                  <td>反向有功</td>
                  <td>正向有功</td>
                  <td>反向有功</td>
                  <td>正向有功</td>
                  <td>反向有功</td>
                </tr>
              </thead>
            </table>
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
import BScroll from "better-scroll";
import overlay from "@/components/common/overlay";
import qs from "qs";
export default {
  data: function() {
    return {
      dddd: [],
      tbodys: [],
      tbodysAll: [],
      dayDate: this.$day().format("YYYY-MM-DD HH:mm:ss"),
      name: "",
      sousuo: "",
      quanxuan: false,
      svgHtml: "",
      isShowt: false,
      ischekedAll: false,
      isShowtc: false,
      ischekedAllc: false,
      voltageLevelPageTipVOList: [],
      voltageLevelPageTipVOListAll: [],
      chuliArr: [],
      quxiao: true,
      doruArrAll: [],
      doruArr: [],
      hasScroll: false,
      hasScroll2: false,
      isShowtcc: false,
      startTimec: "",
      endTimec: "",
      tmrEms: [],
      guanlian: false,
      isShowtm: false,
      hasScroll89: false,
      hasScroll4: false,
      emsSystemId: "",
      wtmrAll: [], //未关联的TMR展示
      wtmrAlls: [],
      tmrName: "",
      tmrmrid: "",
      tmrtype: "",
      wemsAll: [], //未关联的EMS展示
      wemsAlls: [],
      emsName: "",
      emsmrid: "",
      isMrid: "",
      isBvid: "",
      isStid: "",
      jisuan: [],
      jisuanline: [],
      jisuantrans: [],
      jisuanbre: [],
      jisuancom: [],
      jisuanene: [],
      jisuangen: [],
      jisuanvir: [],
      saveStartTime: this.$day().format("YYYY-MM-DD HH:mm:ss"),
      configTime: "",
      isShowtsave: false,
      ytmrAll: [],
      stName: "", //右下角方块名
      youxia: true,
      huanyuanAll: [],
      isShowth: false,
      isShowthh: false,
      hasScroll5: false,
      shanchuAll: [],
      isShowts: false,
      hasScroll6: false,
      lishiAll: [],
      isShowtl: false,
      hasScroll7: false,
      substationId: "",
      vlId: "",
      xiufuleft: [],
      xiufuleftindexs: [],
      xiufuright: [],
      xiufurightindexs: [],
      isShowtxiufu: false,
      isLoading: true,
      isShaixuan: false,
      isShowYL: false,
      dianrong: false,
      zydian: false,
      beiyong: false
    };
  },
  components: {
    overlay
  },
  mounted() {
    this.isLoading = true;
    this.$nextTick(() => {
      let scroll = new BScroll(".scroll", {
        scrollbar: { fade: false, interactive: true },
        mouseWheel: true
      });
      let scroll3 = new BScroll(".scroll3", {
        scrollbar: { fade: false, interactive: true },
        mouseWheel: true
      });
      let xiufu1 = new BScroll(".xiufu1", {
        scrollbar: { fade: false, interactive: true },
        mouseWheel: true
      });
      let xiufu2 = new BScroll(".xiufu2", {
        scrollbar: { fade: false, interactive: true },
        mouseWheel: true
      });
    });
    if (this.$route.query.substationId == undefined) {
      if (this.$route.query.bvId) {
        var query =
          "&systemId=" +
          this.$route.query.areaId +
          "&bvId=" +
          this.$route.query.bvId;
      } else {
        var query = "&systemId=" + this.$route.query.areaId;
      }
      this.$http
        .get(
          "/analysisService/analy/getVoltagelevelCludeBalanceConfig?sign=" +
            sessionStorage.getItem("accessToken") +
            query
        )
        .then(res => {
          if (res.data.code == 0) {
            this.isLoading = false;
            alert(res.data.msg);
            return;
          }
          this.isLoading = false;
          console.log(res);
          var data = res.data.data.voltageLevelList;
          var arr = [];
          var arr2 = [];
          var i;
          var index;
          var isConfig;
          this.doruArr = data;
          this.doruArrAll = data;
          if (data.length > 0) {
            for (var j in data) {
              var a = data[j];
              if (a.isConfig == 0) {
                isConfig = "未配置";
              } else {
                isConfig = "已配置";
              }
              if (arr2.indexOf(a.stId) == -1) {
                arr2.push(a.stId);
                if (arr.length > 0) {
                  arr[index][0].numtwo = i;
                }
                i = 1;
                index = arr.length;
                arr.push([
                  {
                    name: a.stName,
                    numtwo: 1,
                    numone: 3,
                    stId: a.stId,
                    mrid: a.mrid,
                    isClick: true,
                    hasinput: false
                  },
                  {
                    name: j - -1,
                    numtwo: 1,
                    numone: 1
                  },
                  {
                    name: a.localName,
                    numtwo: 1,
                    isClick: true,
                    numone: 2,
                    hasinput: true,
                    mrid: a.mrid,
                    stId: a.stId,
                    bvId: a.bvId,
                    config: isConfig,
                    num: j,
                    stationName: a.stName
                  },
                  {
                    name: isConfig,
                    numtwo: 1,
                    isClick: false,
                    numone: 2
                  }
                ]);
              } else {
                i++;
                arr.push([
                  {
                    name: j - -1,
                    numtwo: 1,
                    numone: 1
                  },
                  {
                    name: a.localName,
                    numtwo: 1,
                    isClick: true,
                    numone: 2,
                    hasinput: true,
                    mrid: a.mrid,
                    stId: a.stId,
                    bvId: a.bvId,
                    config: isConfig,
                    num: j,
                    stationName: a.stName
                  },
                  {
                    name: isConfig,
                    numtwo: 1,
                    isClick: false,
                    numone: 2
                  }
                ]);
              }
            }
            arr[index][0].numtwo = i;
            this.tbodys = arr;
            this.tbodysAll = arr;
            console.log(this.tbodys);
          }
        })
        .catch(error => {
          this.isLoading = false;
          alert("请联系系统管理员");
        });
    } else {
      this.substationId = this.$route.query.substationId;
      this.vlId = this.$route.query.vlId;
      var arrAll = [
        {
          mrid: this.vlId,
          pathName: this.$route.query.name + "/" + this.$route.query.dy,
          stId: this.substationId
        }
      ];
      this.doruArrAll = arrAll;
      this.doruArr = arrAll;
      var arr = [
        [
          {
            name: this.$route.query.name,
            numtwo: 1,
            numone: 3,
            stId: this.substationId,
            mrid: this.vlId,
            isClick: false,
            hasinput: false
          },
          {
            name: 1,
            numtwo: 1,
            numone: 1
          },
          {
            name: this.$route.query.dy,
            numtwo: 1,
            isClick: false,
            numone: 2,
            hasinput: true,
            stId: this.substationId,
            mrid: this.vlId,
            num: 0,
            stationName: this.$route.query.name
          },
          {
            name: "已配置",
            numtwo: 1,
            isClick: false,
            numone: 2
          }
        ]
      ];
      this.tbodys = arr;
      this.tbodysAll = arr;
      this.getright(
        true,
        true,
        this.vlId,
        this.substationId,
        this.$route.query.bvId,
        this.$route.query.name + "/" + this.$route.query.dy
      );
    }
  },
  methods: {
    downloadVCBC() {
      if (this.$route.query.bvId) {
        var query =
          "&systemId=" +
          this.$route.query.areaId +
          "&bvId=" +
          this.$route.query.bvId;
      } else {
        var query = "&systemId=" + this.$route.query.areaId;
      }
      this.$http
        .get(
          "/analysisService/analy/outVoltagelevelCludeBalanceConfig?sign=" +
            sessionStorage.getItem("accessToken") +
            query
        )
        .then(res => {
          window.location = res.request.responseURL;
        });
    },
    handleLoad(num, count) {
      if (num == count) {
        this.isLoading = false;
      }
    },
    getright(isClick, hasinput, mrid, stId, bvId, name) {
      if (isClick && hasinput) {
        this.isMrid = mrid;
        this.isStid = stId;
        this.isBvid = bvId;
        this.stName = name;
        //获取svg图
        this.$http
          .get(
            "/analysisService/analy/getBalanceConfigSVG?appkey=3917230828&sign=" +
              sessionStorage.getItem("accessToken") +
              "&vlId=" +
              mrid
          )
          .then(res => {
            if (res.data.code == 0) {
              count++;
              this.handleLoad(3, count);
              alert(res.data.msg);
              return;
            }
            count++;
            this.handleLoad(3, count);
            var data = res.data;
            this.svgHtml = "";
            if (data == "") {
              this.svgHtml = `<div>无数据</div>`;
            } else {
              this.svgHtml = data;
            }
          })
          .catch(error => {
            count++;
            this.handleLoad(3, count);
            alert("请联系系统管理员");
          });
        this.$http
          .get(
            "/analysisService/analy/getBalanceConfigModel?appkey=3917230828&sign=" +
              sessionStorage.getItem("accessToken") +
              "&vlId=" +
              mrid
          )
          .then(res => {
            if (res.data.code == 0) {
              count++;
              this.handleLoad(3, count);
              alert(res.data.msg);
              return;
            }
            count++;
            this.handleLoad(3, count);
            console.log(res);
            this.jisuan = [];
            this.jisuanline = [];
            var data = res.data.data.model;
            this.xiufuright = [];
            if (data.length > 0) {
              var b = data[data.length - 1];
              for (var a of b.lineEndModels) {
                if (this.jisuan.indexOf(a.mrid) == -1) {
                  this.jisuan.push(a.mrid);
                  this.jisuanline.push({ mrid: a.mrid });
                  this.xiufuright.push({
                    mrid: a.mrid,
                    name: a.pathName,
                    bvId: a.bvId,
                    type: "线端"
                  });
                }
              }
              for (var a of b.transformerWindingModels) {
                if (this.jisuan.indexOf(a.mrid) == -1) {
                  this.jisuan.push(a.mrid);
                  this.jisuantrans.push({ mrid: a.mrid });
                  this.xiufuright.push({
                    mrid: a.mrid,
                    name: a.pathName,
                    bvId: a.bvId,
                    type: "绕组"
                  });
                }
              }
            }

            console.log(this.jisuan);
          })
          .catch(error => {
            count++;
            this.handleLoad(3, count);
            alert("请联系系统管理员");
          });
        this.$http
          .get(
            "/analysisService/analy/getSubstationModel?inUse=1&sign=" +
              sessionStorage.getItem("accessToken") +
              "&stId=" +
              stId
          )
          .then(res => {
            if (res.data.code == 0) {
              count++;
              this.handleLoad(3, count);
              alert(res.data.msg);
              return;
            }

            var data = res.data.data.substationModel;
            var tmrAll = [];
            var ytmr = []; //已关联tmr
            var yemsline = []; //已关联的ems线端
            var wtmrline = []; //未关联的tmr线端
            var yemstransf = []; //已关联的ems绕组
            var wtmrtransf = []; //未未关联的ems绕组
            var xiufuleft = []; //修复弹框左边的数据
            var xiufuright = []; //修复弹框右边的数据
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
                if (res2.data.code == 0) {
                  count++;
                  this.handleLoad(3, count);
                  alert(res2.data.msg);
                  var data2 = { voltageLevelModels: [] };
                } else {
                  count++;
                  this.handleLoad(3, count);
                  var data2 = res2.data.data.substationModel;
                }
              })
              .catch(error => {
                count++;
                this.handleLoad(3, count);
                alert("请联系系统管理员");
              });
          })
          .catch(error => {
            count++;
            this.handleLoad(3, count);
            alert("请联系系统管理员");
          });
      }
    },
    clickGuanlian(hasClick, c) {
      if (hasClick) {
        if (c) {
          this.isShowtm = true;
          if (!this.hasScroll89) {
            this.$nextTick(() => {
              // let scroll4 = new BScroll('.scroll4', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true});
              let scroll8 = new BScroll(".scroll8", {
                scrollbar: { fade: false, interactive: true },
                mouseWheel: true
              });
              let scroll9 = new BScroll(".scroll9", {
                scrollbar: { fade: false, interactive: true },
                mouseWheel: true
              });
            });
            this.hasScroll89 = true;
          }
        }
      }
    },
    scroll() {
      if (!this.hasScroll4) {
        this.$nextTick(() => {
          let scroll4 = new BScroll(".scroll4", {
            scrollbar: { fade: false, interactive: true },
            mouseWheel: true
          });
        });
        this.hasScroll4 = true;
      }
    },
    checekjisuan(mrid, name) {
      if (this.jisuan.indexOf(mrid) == -1) {
        if (name == "线端") {
          this.jisuanline.push({ mrid: mrid });
        } else if (name == "绕组") {
          this.jisuantrans.push({ mrid: mrid });
        } else if (name == "开关") {
          this.jisuanbre.push({ mrid: mrid });
        } else if (name == "电容器") {
          this.jisuancom.push({ mrid: mrid });
        } else if (
          name == "站用电" ||
          a.type == "站用变" ||
          a.type == "备用" ||
          a.type == "消弧线圈" ||
          a.type == "电表" ||
          a.type == "其他"
        ) {
          this.jisuanene.push({ mrid: mrid });
        } else if (name == "机组") {
          this.jisuangen.push({ mrid: mrid });
        } else if (name == "虚拟设备") {
          this.jisuanvir.push({ mrid: mrid });
        }
        this.jisuan.push(mrid);
      } else {
        if (name == "线端") {
          for (var i in this.jisuanline) {
            if (this.jisuanline[i].mrid == mrid) {
              this.jisuanline.splice(i, 1);
            }
          }
        } else if (name == "绕组") {
          for (var i in this.jisuantrans) {
            if (this.jisuantrans[i].mrid == mrid) {
              this.jisuantrans.splice(i, 1);
            }
          }
        } else if (name == "开关") {
          for (var i in this.jisuanbre) {
            if (this.jisuanbre[i].mrid == mrid) {
              this.jisuanbre.splice(i, 1);
            }
          }
        } else if (name == "电容器") {
          for (var i in this.jisuancom) {
            if (this.jisuancom[i].mrid == mrid) {
              this.jisuancom.splice(i, 1);
            }
          }
        } else if (
          name == "站用电" ||
          a.type == "站用变" ||
          a.type == "备用" ||
          a.type == "消弧线圈" ||
          a.type == "电表" ||
          a.type == "其他"
        ) {
          for (var i in this.jisuanene) {
            if (this.jisuanene[i].mrid == mrid) {
              this.jisuanene.splice(i, 1);
            }
          }
        } else if (name == "机组") {
          for (var i in this.jisuangen) {
            if (this.jisuangen[i].mrid == mrid) {
              this.jisuangen.splice(i, 1);
            }
          }
        } else if (name == "虚拟设备") {
          for (var i in this.jisuanvir) {
            if (this.jisuanvir[i].mrid == mrid) {
              this.jisuanvir.splice(i, 1);
            }
          }
        }
        this.jisuan.splice(this.jisuan.indexOf(mrid), 1);
      }
      console.log(this.jisuan);
    },
    soutmr() {
      this.wtmrAll = [];
      for (var a of this.wtmrAlls) {
        if (a.name.indexOf(this.tmrName) != -1) {
          this.wtmrAll.push(a);
        }
      }
    },
    souems() {
      this.wemsAll = [];
      for (var a of this.wemsAlls) {
        if (a.name.indexOf(this.emsName) != -1) {
          this.wemsAll.push(a);
        }
      }
    },
    saves() {
      if (this.configTime == "") {
        alert("请选择时间");
        return;
      }
      var arr = {
        lineEndModels: this.jisuanline,
        transformerWindingModels: this.jisuantrans,
        startTime: this.saveStartTime,
        endTime: this.$day().format("YYYY-MM-DD HH:mm:ss"),
        configTime: this.configTime,
        voltageLevelModel: { mrid: this.isMrid }
      };
      this.$http
        .post(
          "/analysisService/analy/saveBalanceConfig?sign=" +
            sessionStorage.getItem("accessToken"),
          arr
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            alert("保存成功");
            this.isShowtsave = false;
          } else {
            alert(res.data.msg);
          }
        });
    },
    huanyuan() {
      this.isShowth = true;
      if (!this.hasScroll5) {
        this.$nextTick(() => {
          let scroll5 = new BScroll(".scroll5", {
            scrollbar: { fade: false, interactive: true },
            mouseWheel: true
          });
        });
        this.hasScroll5 = true;
      }
      this.huanyuanAll = [];
      this.$http
        .get(
          "/analysisService/analy/getBalanceConfig?sign=" +
            sessionStorage.getItem("accessToken") +
            "&vlId=" +
            this.isMrid
        )
        .then(res => {
          if (res.data.code == 0) {
            alert(res.data.msg);
            return;
          }
          var data = res.data.data.list;
          if (data.length > 0) {
            var newTime = data[0].validTime;
            var newIndex = 0;
            for (var i in data) {
              var a = data[i];
              if (new Date(a.validTime) > new Date(newTime)) {
                newTime = a.validTime;
                newIndex = i;
              }

              this.huanyuanAll.push([
                {
                  name: "",
                  hasInput: true,
                  status: "未使用",
                  numone: 1,
                  id: a.id
                },
                {
                  name: this.huanyuanAll.length - -1,
                  numone: 1
                },
                {
                  name: a.validTime,
                  numone: 2
                },
                {
                  name: a.lastRefreshTime,
                  numone: 2
                },
                {
                  name: a.expression,
                  numone: 4
                },
                {
                  name: "未使用",
                  numone: 1
                }
              ]);
            }
            this.huanyuanAll[newIndex][0].status = "使用中";
            this.huanyuanAll[newIndex][5].name = "使用中";
          }
        });
    },
    shanchu() {
      this.isShowts = true;
      if (!this.hasScroll6) {
        this.$nextTick(() => {
          let scroll6 = new BScroll(".scroll6", {
            scrollbar: { fade: false, interactive: true },
            mouseWheel: true
          });
        });
        this.hasScroll6 = true;
      }
      this.shanchuAll = [];
      this.$http
        .get(
          "/analysisService/analy/getBalanceConfig?sign=" +
            sessionStorage.getItem("accessToken") +
            "&vlId=" +
            this.isMrid
        )
        .then(res => {
          if (res.data.code == 0) {
            alert(res.data.msg);
            return;
          }
          var data = res.data.data.list;
          if (data.length > 0) {
            var newTime = data[0].validTime;
            var newIndex = 0;
            for (var i in data) {
              var a = data[i];
              if (new Date(a.validTime) > new Date(newTime)) {
                newTime = a.validTime;
                newIndex = i;
              }
              this.shanchuAll.push([
                {
                  name: "",
                  hasInput: true,
                  status: "未使用",
                  numone: 1,
                  id: a.id
                },
                {
                  name: this.shanchuAll.length - -1,
                  numone: 1
                },
                {
                  name: a.validTime,
                  numone: 2
                },
                {
                  name: a.lastRefreshTime,
                  numone: 2
                },
                {
                  name: a.expression,
                  numone: 4
                },
                {
                  name: "未使用",
                  numone: 1
                }
              ]);
            }
            this.shanchuAll[newIndex][0].status = "使用中";
            this.shanchuAll[newIndex][5].name = "使用中";
          }
        });
    },
    lishi() {
      this.isShowtl = true;
      if (!this.hasScroll7) {
        this.$nextTick(() => {
          let scroll7 = new BScroll(".scroll7", {
            scrollbar: { fade: false, interactive: true },
            mouseWheel: true
          });
        });
        this.hasScroll7 = true;
      }
      this.lishiAll = [];
      this.$http
        .get(
          "/analysisService/analy/getBalanceConfig?sign=" +
            sessionStorage.getItem("accessToken") +
            "&vlId=" +
            this.isMrid
        )
        .then(res => {
          if (res.data.code == 0) {
            alert(res.data.msg);
            return;
          }
          var data = res.data.data.list;
          if (data.length > 0) {
            var newTime = data[0].validTime;
            var newIndex = 0;
            for (var i in data) {
              var a = data[i];
              if (new Date(a.validTime) > new Date(newTime)) {
                newTime = a.validTime;
                newIndex = i;
              }

              this.lishiAll.push([
                {
                  name: this.lishiAll.length - -1,
                  numone: 1
                },
                {
                  name: a.validTime,
                  numone: 2
                },
                {
                  name: a.lastRefreshTime,
                  numone: 2
                },
                {
                  name: a.expression,
                  numone: 4
                },
                {
                  name: "未使用",
                  numone: 1
                }
              ]);
            }
            this.lishiAll[newIndex][0].status = "使用中";
            this.lishiAll[newIndex][4].name = "使用中";
          }
        });
    },
    xiufu() {
      console.log(this.xiufuleft);
      console.log(this.xiufuright);
      for (var a of this.xiufuright) {
        for (var i in this.xiufuleft) {
          if (a.mrid == this.xiufuleft[i].mrid) {
            console.log(1);
            this.xiufuleft.splice(i, 1);
          }
        }
      }
      this.isShowtxiufu = true;
    },
    //   修复弹框左边数据选中
    xiufuleftzs(index) {
      if (this.xiufuleftindexs.indexOf(index) == -1) {
        this.xiufuleftindexs.push(index);
      } else {
        this.xiufuleftindexs.splice(this.xiufuleftindexs.indexOf(index), 1);
      }
    },
    //   将修复弹框左边数据选中部分添加到右边
    addtoright() {
      var arr = [];
      for (var a of this.xiufuleftindexs) {
        this.xiufuright.push(this.xiufuleft[a]);
        arr.push(this.xiufuleft[a]);
      }
      for (var i in this.xiufuleft) {
        if (arr.indexOf(this.xiufuleft[i]) != -1) {
          this.xiufuleft.splice(i, 1);
        }
      }
      this.xiufuleftindexs = [];
    },
    xiufurightzs(index) {
      if (this.xiufurightindexs.indexOf(index) == -1) {
        this.xiufurightindexs.push(index);
      } else {
        this.xiufurightindexs.splice(this.xiufurightindexs.indexOf(index), 1);
      }
    },
    deltoleft() {
      var arr = [];
      for (var a of this.xiufurightindexs) {
        this.xiufuleft.push(this.xiufuright[a]);
        arr.push(this.xiufuright[a]);
      }
      for (var i in this.xiufuright) {
        if (arr.indexOf(this.xiufuright[i]) != -1) {
          this.xiufuright.splice(i, 1);
        }
      }
      this.xiufurightindexs = [];
    },
    // 修复弹框保存
    xiufusave() {
      var lineEndModels = [];
      var transformerWindingModels = [];
      var breakerModels = [];
      var compensatorModels = [];
      var energyconsumerModels = [];
      var generatingUnitModels = [];
      var virtureEquipmentModels = [];
      for (var a of this.xiufuright) {
        if (a.type == "线端") {
          lineEndModels.push({ mrid: a.mrid });
        }
        if (a.type == "绕组") {
          transformerWindingModels.push({ mrid: a.mrid });
        }
        if (a.type == "开关") {
          breakerModels.push({ mrid: a.mrid });
        }
        if (a.type == "电容器") {
          compensatorModels.push({ mrid: a.mrid });
        }
        if (
          a.type == "站用电" ||
          a.type == "站用变" ||
          a.type == "备用" ||
          a.type == "消弧线圈" ||
          a.type == "电表" ||
          a.type == "其他"
        ) {
          energyconsumerModels.push({ mrid: a.mrid });
        }
        if (a.type == "机组") {
          generatingUnitModels.push({ mrid: a.mrid });
        }
        if (a.type == "虚拟设备") {
          virtureEquipmentModels.push({ mrid: a.mrid });
        }
      }
      var arr = {
        lineEndModels: lineEndModels,
        transformerWindingModels: transformerWindingModels,
        breakerModels: breakerModels,
        compensatorModels: compensatorModels,
        energyconsumerModels: energyconsumerModels,
        generatingUnitModels: generatingUnitModels,
        virtureEquipmentModels: virtureEquipmentModels,
        startTime: this.saveStartTime,
        endTime: this.$day().format("YYYY-MM-DD HH:mm:ss"),
        configTime: this.$day().format("YYYY-MM-DD HH:mm:ss"),
        voltageLevelModel: { mrid: this.isMrid }
      };
      this.$http
        .post(
          "/analysisService/analy/saveBalanceConfig?sign=" +
            sessionStorage.getItem("accessToken"),
          arr
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            alert("保存成功");
            this.getright(
              true,
              true,
              this.isMrid,
              this.isStid,
              this.isBvid,
              this.stName
            );
            this.isShowtxiufu = false;
          } else {
            alert(res.data.msg);
          }
        });
    },
    shanchupeizhi() {
      var shanchuid = document.getElementsByClassName("shanchuid");
      var value;
      for (var i = 0; i < shanchuid.length; i++) {
        if (shanchuid[i].checked == true) {
          value = shanchuid[i].value;
        }
      }
      if (value == undefined) {
        alert("请先选择要删除的配置");
      } else {
        confirm("母线id:" + value + ",配置id:" + this.isMrid);
        this.$http
          .post(
            "/analysisService/analy/deleteBalanceConfig?sign=" +
              sessionStorage.getItem("accessToken"),
            qs.stringify({
              mrIds: value,
              vlId: this.isMrid
            })
          )
          .then(res => {
            if (res.data.code == 0) {
              alert(res.data.msg);
              return;
            }
            console.log(res);
            if (res.data.code == 1) {
              alert("删除成功");
              this.shanchu();
            }
          });
      }
    },
    huanyuanpeizhi() {
      var huanyuanid = document.getElementsByClassName("huanyuanid");
      var value;
      for (var i = 0; i < huanyuanid.length; i++) {
        if (huanyuanid[i].checked == true) {
          value = huanyuanid[i].value;
        }
      }
      if (value == undefined) {
        alert("请先选择要还原的配置");
      } else {
        confirm("配置id:" + value + ",配置时间：" + this.dayDate);
        this.$http
          .post(
            "/analysisService/analy/reBalanceConfig?sign=" +
              sessionStorage.getItem("accessToken") +
              "&mrId=" +
              value +
              "&validTime=" +
              this.dayDate
          )
          .then(res => {
            if (res.data.code == 0) {
              alert(res.data.msg);
              return;
            }
            console.log(res);
          });
      }
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
            alert("关联成功");
            this.getright(
              true,
              true,
              this.isMrid,
              this.isStid,
              this.isBvid,
              this.stName
            );
          }
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
              alert("解除成功");
              this.getright(
                true,
                true,
                this.isMrid,
                this.isStid,
                this.isBvid,
                this.stName
              );
            }
          });
      }
    },
    filter() {
      if (this.sousuo != "") {
        var arr = [];
        var re = new RegExp(this.sousuo);
        for (var i in this.tbodysAll) {
          var data = this.tbodysAll[i];
          if (data.length == 4) {
            if (re.test(data[0].name)) {
              for (var j = 0; j < data[0].numtwo; j++) {
                arr.push(this.tbodysAll[i - -j]);
              }
            }
          }
        }
        console.log(arr);
        this.tbodys = arr;
      } else {
        this.tbodys = this.tbodysAll;
      }
    },
    xquanxuan() {
      this.quanxuan = !this.quanxuan;
      this.quxiao = false;
      console.log(this.quanxuan);
    },
    easyConfig() {
      this.isShowt = true;
      var diya = document.getElementsByClassName("diya");
      var arr = [];
      for (var i = 0; i < diya.length; i++) {
        if (diya[i].checked == true) {
          var num = parseInt(diya[i].value);
          arr.push(this.doruArrAll[num]);
        }
      }
      this.doruArr = arr;
      if (!this.hasScroll) {
        this.$nextTick(() => {
          let scroll1 = new BScroll(".scroll1", {
            scrollbar: { fade: false, interactive: true },
            mouseWheel: true
          });
        });
        this.hasScroll = true;
      }
    },
    chuli() {
      var peizhi = document.getElementsByClassName("peizhi");
      console.log(peizhi);
      var arr = [];
      for (var i = 0; i < peizhi.length; i++) {
        if (peizhi[i].checked == true) {
          var num = parseInt(peizhi[i].value);
          console.log(this.doruArr);
          var mrid = this.doruArr[num].mrid;
          this.$http
            .post(
              "http://10.172.246.61:25880/analysisService/analy/initBalanceConfig?appkey=3917230828&sign=" +
                sessionStorage.getItem("accessToken"),
              qs.stringify({
                vlId: mrid
              })
            )
            .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                alert("操作成功");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    },
    RenewConfig() {
      this.isShowtc = true;
      if (!this.hasScroll2) {
        this.$nextTick(() => {
          let scroll2 = new BScroll(".scroll2", {
            scrollbar: { fade: false, interactive: true },
            mouseWheel: true
          });
        });
        this.hasScroll2 = true;
      }
      //待修改
      var diya = document.getElementsByClassName("diya");
      var arr = [];
      for (var i = 0; i < diya.length; i++) {
        if (diya[i].checked == true) {
          var num = parseInt(diya[i].value);
          arr.push(this.doruArrAll[num]);
        }
      }
      console.log(arr);
      //this.voltageLevelPageTipVOList.
      this.$http
        .get(
          "/analysisService/analy/reCalculationList?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken")
        )
        .then(res => {
          console.log(res);
          var data = res.data.data.reTaskList;
          this.voltageLevelPageTipVOListAll = data.slice();
          this.voltageLevelPageTipVOList = [];
          for (var a of arr) {
            this.voltageLevelPageTipVOListAll.unshift({
              modelIds: a.mrid,
              taskDetail: a.pathName
            });
            this.voltageLevelPageTipVOList.push([a.pathName, "", "", "", ""]);
          }
          console.log(data);
          if (data.length > 0) {
            for (var a of data) {
              var taskType =
                a.taskType == 1 ? "母线" : a.taskType == 2 ? "电量" : "";
              var status =
                a.status == 1
                  ? "启动"
                  : a.status == 2
                    ? "执行中"
                    : a.status == 3 ? "成功" : a.status == 4 ? "失败" : "";
              this.voltageLevelPageTipVOList.push([
                a.taskDetail,
                taskType,
                a.startTime,
                a.endTime,
                status
              ]);
            }
          }
          console.log(this.voltageLevelPageTipVOList);
        });
    },
    chuli2() {
      var peizhi = document.getElementsByClassName("peizhi2");
      var arr = [];
      if (this.startTimec == "" || this.endTimec == "") {
        alert("请选择时间");
        return;
      }
      console.log(peizhi);
      for (var a of this.dddd) {
        var num = parseInt(a);
        arr.push({
          endTime: this.endTimec,
          id: this.voltageLevelPageTipVOListAll[num].modelIds,
          pathName: encodeURI(
            this.voltageLevelPageTipVOListAll[num].taskDetail
          ),
          startTime: this.startTimec
        });
      }
      console.log(arr);
      this.$http
        .post(
          "/analysisService/analy/reCalculation?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken"),
          arr
        )
        .then(res => {
          console.log(res);
        });
    },
    toTwo(isClick, stId, mrid, stName) {
      if (isClick) {
        var name = stName.split("-")[0];
        var { href } = this.$router.resolve({
          name: "/mxphpzl/two",
          path: "/mxphpzl/two",
          query: {
            sysId: this.$route.query.sysId,
            sonid: this.$route.query.sonid,
            stId: stId,
            mrId: mrid,
            name: name
          }
        });
        window.open(href, "_blank");
      }
    },
    yulan() {
      this.isShowYL = true;
      var arr = {
        lineEndModels: this.jisuanline,
        transformerWindingModels: this.jisuantrans,
        endTime: this.$day().format("YYYY-MM-DD HH:mm:ss"),
        configTime: this.dayDate,
        validTime: this.dayDate,
        voltageLevelModel: { mrid: this.isMrid }
      };
      this.$http
        .post(
          "/analysisService/analy/previewBalanceConfig?sign=" +
            sessionStorage.getItem("accessToken"),
          arr
        )
        .then(res => {});
    }
  },
  watch: {
    ischekedAllc: function() {
      if (this.ischekedAllc == true) {
        this.dddd = [];
        for (var i = 0; i < this.voltageLevelPageTipVOListAll.length; i++) {
          this.dddd.push(i);
        }
      } else {
        this.dddd = [];
      }
    }
  }
};
</script>
<style>
.one .bkbt {
  background-color: #0d7474;
  margin-top: 5px;
}
.one .bkbt button {
  background: #043434;
  border-radius: 5px;
}
.one .lbtn {
  font-size: 13px;
}
.one .drx li {
  width: 10%;
  margin-right: 2%;
  white-space: nowrap;
}
.one .gather_cover {
  margin: 0;
}
.one > .gather_cover {
  padding: 5px;
}
.bkbt ul {
  float: right;
}
.bkbt ul li {
  margin-left: 1px;
  float: left;
}
.one .bgc {
  background: #da5a5a !important;
  color: #fff;
  cursor: default;
}
.one .c {
  color: #f6726c;
  cursor: pointer;
}
.one .isRight {
  text-align: left;
}
.one .center_f {
  text-align: center;
}
.one .center_f h2 {
  font-size: 16px;
}
.one .xiufu ul li {
  color: #84f1f1;
  font-size: 13px;
  margin-bottom: 10px;
  cursor: pointer;
}
.one .xiufu ul li:hover {
  background: #2f2d2d;
}
.one .xiufu .checked {
  background: gray;
}
</style>
