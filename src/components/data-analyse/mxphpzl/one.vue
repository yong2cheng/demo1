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
                                <input class="diya" :checked="quanxuan||(child.config==='未配置'&&quxiao)" :value="child.num" type="checkbox" v-if="child.hasinput"/>
                                <span @click="child.hasinput===true?getright(child.isClick,child.hasinput,child.mrid,child.stId,child.bvId,child.stationName+'-'+child.name):toTwo(child.isClick,child.stId,child.mrid,child.name)">{{child.name}}</span>
                             </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
       <div style="width:49%;float:right;border:0;height:838px" class="gather_cover">
            <div style="width:100%;height:493px;border:0;" class="gather_cover">
                <div class="bkbt">
                    <ul style="float:left">
                        <li><button @click="refreshSvg()">一键刷新SVG图</button></li>
                    </ul>
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
                    <span style="float:none;display: inline-block;width: 37%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" :title="stName">{{stName}}</span>
                    <ul class="drx" style="width:63%;">
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
                        <li><button @click="huanyuan()" class="lbtn">还原</button></li>
                        <li><button @click="shanchu();shanchuDs=true;" class="lbtn">删除</button></li>
                        <li><button @click="xiufu()" class="lbtn">修复</button></li>
                        <li><button @click="lishi()" class="lbtn">历史</button></li>
                        <li><button @click="toTwo(true,isStid,isMrid,stName)" class="lbtn">比对</button></li>
                    </ul>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <td><input :checked="isCYQX" @click="isCYQX=!isCYQX" type="checkbox"> 参与计算</td>
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
                        <tr :key="index" v-for="(item,index) in tmrEms">
                          <td>
                            <span  style="width:10px;height:10px;display:inline-block;background:#ddd;">
                                  <input :disabled="item[1].name==='缺失'" v-model="saveIndex" :value="item[0].mrid" type="checkbox">
                                </span>
                          </td>
                            <td @click="clickGuanlian(itemd.hasClick,itemd.c);queshixz(itemd.hasClick,itemd.bgc)" :key="indexd" v-for="(itemd,indexd) in item" :colspan="itemd.numone">
                              <span style="position:relative;">
                                <span v-if="!itemd.queshi" :class="{c:itemd.c}">{{itemd.name}}</span>
                               <span @click="xsindex===index?xsindex=-1:xsindex=index" v-if="itemd.queshi" :class="{bgc:itemd.bgc,c:itemd.c}"><span>{{itemd.name}}</span></span> 
                                <p :class="{xianshi:index===xsindex}" class="jsthbox" v-if="itemd.queshi">
                                  <label>
                                    <input @click="itemd.name='对端替代';" :name="index" type="radio">
                                    <span>对端替代</span>
                                  </label>
                                  <label for="">
                                    <input @click="itemd.name='功率积分替代'" :name="index" type="radio">
                                    <span>功率积分替代</span>
                                  </label>
                                  <label for="">
                                    <input @click="itemd.name='报备 (不替代)'" :name="index" type="radio">
                                    <span>报备 (不替代)</span>
                                  </label>
                                </p>
                              </span>
                              
                                <!-- <span v-if="itemd.hasInput" @click="checekjisuan($event,itemd.mrid,item[1].name,itemd.queshi,itemd.localName)" style="width:10px;height:10px;display:inline-block;background:#ddd;">
                                  <input :disabled="item[2].name==='缺失'" v-if="itemd.hasInput" :checked="jisuan.indexOf(itemd.mrid)!==-1" type="checkbox">
                                </span> -->
                                
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
       </div>
       <overlay style="min-height:500px;" oheight="60%"  :close.sync="isShowt">
           <div class="yiji_t">
               <div class="t_title">
                   <span>母平配置一键导入</span>
               </div>
                <table class="table">
                    <thead>
                        <tr>
                            <td colspan="1">序号</td>
                            <td style="text-align:left;" colspan="3">
                                <input :checked="ischekedAll" v-model="ischekedAll" type="checkbox">
                                母线名称
                            </td>
                            <td colspan="3">处理类型</td>
                        </tr>
                    </thead>
                </table>
                <div class="scroll1" style="position:relative;overflow:hidden;height:calc(100% - 128px);margin-bottom:10px;">
                    <table class="table">
                        <tbody>
                            <tr :key="index" v-for="(item,index) in doruArr">
                                <td colspan="1">{{index-(-1)}}</td>
                                <td colspan="3" style="text-align:left;"><input class="peizhi" :value="index" :checked="ischekedAll" type="checkbox">{{item.pathName}}</td>
                                <td colspan="3">自动配置</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="t_foot">
                  <button @click="chuli()">开始处理</button>
                </div>
                
           </div>
            
       </overlay>
       <!-- 重新计算 -->
       <overlay style="min-height:500px;" oheight="60%"  :close.sync="isShowtc">
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
           <div class="yiji_t">
               <div class="t_title">
                   <span>母线平衡率重计算</span>
                   <button style="float:right;margin-top:3px;" @click="RenewConfig()">刷新</button>
               </div>
                
                
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
                <div class="scroll2" style="position:relative;overflow:hidden;height:calc(100% - 128px);margin-bottom:10px;">
                    <table class="table">
                        <tbody>
                            <tr :key="index" v-for="(item,index) in voltageLevelPageTipVOList">
                                <td colspan="1">{{index-(-1)}}</td>
                                <td colspan="3" style="text-align:left;"><input class="peizhi2" :value="index" v-model="dddd" type="checkbox">{{item[0]}}</td>
                                <td colspan="2">重计算</td>
                                <td colspan="3">{{item[2]}}</td>
                                <td colspan="3">{{item[3]}}</td>
                                <td colspan="3">{{item[4]}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="t_foot">
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
                
           </div>
            
       </overlay>
       <!-- 模型关联 -->
       <overlay style="min-height:500px;" oheight="60%"  :close.sync="isShowtm">
           <div class="yiji_t">
               <div class="t_title">
                   <span>模型关联</span>
               </div>
               
               <p style="margin-bottom:10px;"><button @click="guanlian=false" :class="{btn_checked:!guanlian}">未关联</button><button @click="guanlian=true;scroll();" :class="{btn_checked:guanlian}">已关联</button></p>
               <div style="height:calc(100% - 88px);border: 1px solid #0d7474;box-sizing:border-box;padding:20px;" v-show="!guanlian">
                   <div class="" style="width:40%;height:100%;float:left;border: 1px solid #0d7474;box-sizing:border-box;padding:20px;">
                       <h4 class="left" style="line-height:36px;">TMR</h4>
                       <div class="right" style="line-height:36px;">
                         <input v-model="tmrName" type="text" placeholder="请输入设备名称" class="txt"/>
                       <button @click="soutmr()" class="sousuo">搜索</button>
                       </div>
                       
                       <table style="margin-top:5px;" class="table">
                           <thead>
                                <tr>
                                    <td>选择</td>
                                    <td>设备名称</td>
                                </tr>
                           </thead>
                       </table>
                       <div class="scroll8" style="height:calc(100% - 88px);position:relative;overflow:hidden;">
                           <table class="table">
                               <tr :key="index" v-for="(item,index) in wtmrAll">
                                   <td><input @click="tmrmrid=item.mrid;tmrtype=item.type" type="radio" :checked="tmrmrid===item.mrid" /></td>
                                   <td>{{item.name}}</td>
                               </tr>
                           </table>
                       </div>
                   </div>
                   <button @click="newguanlian()" style="position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;margin-left:50%;height:30px;">关联</button>
                   <div style="width:40%;height:100%;float:right;border: 1px solid #0d7474;box-sizing:border-box;padding:20px;">
                       <h4 class="left" style="line-height:36px;">EMS</h4>
                       <div class="right" style="line-height:36px;">
                         <input v-model="emsName" type="text" placeholder="请输入设备名称" class="txt"/>
                       <button @click="souems()" class="sousuo">搜索</button>
                       </div>
                       
                       <table style="margin-top:5px;" class="table">
                           <thead>
                                <tr>
                                    <td>选择</td>
                                    <td>设备名称</td>
                                </tr>
                           </thead>
                       </table>
                       <div class="scroll9" style="height:calc(100% - 88px);position:relative;overflow:hidden;">
                           <table class="table">
                               <tr :key="index" v-for="(item,index) in wemsAll">
                                   <td><input @click="emsmrid=item.mrid" type="radio" :checked="emsmrid===item.mrid" /></td>
                                   <td>{{item.name}}</td>
                               </tr>
                           </table>
                       </div>
                   </div>
               </div>
               <div style="height:calc(100% - 77px);" v-show="guanlian">
                   <table class="table">
                       <thead>
                           <tr>
                                <td>TMR</td>
                                <td>EMS</td>
                                <td>操作</td>
                            </tr>
                       </thead>
                       
                   </table>
                   <div style="height:calc(100% - 46px);position:relative;overflow:hidden;" class="scroll4">
                       <table class="table">
                           <tbody>
                               <tr :key="index" v-for="(item,index) in ytmrAll">
                                   <td @click="jiechugl(itemd.hasClick,itemd.mrid,itemd.type)" :class="{c:itemd.hasClick}" :key="indexd" v-for="(itemd,indexd) in item">
                                    <span>{{itemd.name}}</span> </td>
                               </tr>
                           </tbody>
                       </table>
                   </div>
               </div>
           </div>
               
           
       </overlay>
       <!-- 保存选择时间 -->
       <!-- <el-dialog
        title="选择保存时间"
        :visible.sync="isShowtsave"
        width="30%"
        center
        class="t_bgc">
        <el-row :gutter="20">
          <el-col :span="12" :offset="6"><div class="grid-content bg-purple">
            <el-date-picker
                style="margin:0 auto;"
            type="datetime"
            v-model="configTime"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="yyyy-MM-dd hh:mm:ss"
            width="30%"
            center>
            </el-date-picker>
            </div></el-col>
        </el-row>
        
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowtsave = false">取 消</el-button>
          <el-button type="primary" @click="isShowtsave = false;saves()">确 定 保 存</el-button>
        </span>
      </el-dialog> -->
       <overlay oheight="200px" owidth="350px"  :close.sync="isShowtsave">
           <div style="text-align:center;">
              <p class="t_title">选择时间：</p> 
           <el-date-picker
                style="margin:10px;"
            type="datetime"
            v-model="configTime"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="yyyy-MM-dd hh:mm:ss">
            </el-date-picker>
            <div style="margin-top:20px;"><button @click="saves()">确定保存</button></div>
           </div>
           
       </overlay>
       <!-- 还原 -->
       <overlay style="min-height:500px;" oheight="60%"  :close.sync="isShowth">
           <div class="yiji_t">
               <div class="t_title">母线配置还原  <span>{{stName}}</span></div>
               <!-- <button>对比分析</button> -->
               <overlay oheight="30%" owidth="20%"  :close.sync="isShowthh">
                   <div style="padding:10px;text-align:center;">
                        <span class="t_title">配置重计算生效时间</span>
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
                <div style="height:calc(100% - 118px);position:relative;overflow:hidden" class="scroll5">
                    <table class="table">
                        <tbody>
                            <tr :key="index" v-for="(item,index) in huanyuanAll">
                                <td :colspan="itemd.numone" :key="indexd" v-for="(itemd,indexd) in item">
                                    <span>{{itemd.name}}</span>
                                    <input @click="huanyuanDs=false" class="huanyuanid" :value="itemd.id"  type="radio" name="huanyuan" v-if="itemd.hasInput" :disabled="itemd.status==='使用中'" />
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="t_foot">
                 <el-button type="text" :disabled="huanyuanDs" @click="isShowthh=true">还原配置</el-button>
               </div>
           </div>
       </overlay>
       <!-- 删除 -->
       <overlay style="min-height:500px;" oheight="60%"  :close.sync="isShowts">
           <div class="yiji_t">
               <div class="t_title">母线配置删除  <span>{{stName}}</span></div>
               
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
                <div style="height:calc(100% - 118px);position:relative;overflow:hidden" class="scroll6">
                    <table class="table">
                        <tbody>
                            <tr :key="index" v-for="(item,index) in shanchuAll">
                                <td :colspan="itemd.numone" :key="indexd" v-for="(itemd,indexd) in item">
                                    <span>{{itemd.name}}</span>
                                    <input @click="shanchuDs=false" class="shanchuid" :value="itemd.id"  type="radio" name="shanchu" v-if="itemd.hasInput" />
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="t_foot">
                 <el-button type="text" :disabled="shanchuDs" @click="open">删 除</el-button>
               </div>
           </div>
       </overlay>
       <!-- 修复 -->
       <overlay style="min-height:500px;" oheight="60%"  :close.sync="isShowtxiufu">
               <div class="yiji_t">
                   <div class="t_title">母线配置修复<span>{{stName}}</span></div>
                    <div class="xiufu xiufu1" style="display:inline-block;width:38%;height:calc(100% - 46px);background:#012323;position:relative;overflow:hidden;padding-left:10px;">
                   <ul>
                       <li @click="xiufuleftzs(index)" :class="{checked:xiufuleftindexs.indexOf(index)!==-1}" :key="index" v-for="(item,index) in xiufuleft">{{item.name}}</li>
                   </ul>
                  </div>
                  <div style="display:inline-block;width:20%;vertical-align:top;height:calc(100% - 47px);text-align:center;">
                    <div style="height:156px;margin-top:calc(50% - 78px)">
                        <button @click="addtoright()" style="margin-bottom:20px;">添加&gt;</button><br>
                        <button @click="deltoleft()" style="margin-bottom:20px;">&lt;移除</button><br>
                        <button style="width:57px;" @click="xiufusave()">保存 </button>
                    </div>
                  </div>
                  <div class="xiufu xiufu2" style="display:inline-block;width:38%;height:calc(100% - 66px);background:#012323;vertical-align:top;padding:10px;position:relative;overflow:hidden;">
                      <ul>
                          <li @click="xiufurightzs(index)" :class="{checked:xiufurightindexs.indexOf(index)!==-1}" :key="index" v-for="(item,index) in xiufuright">{{item.name}}</li>
                      </ul>
                  </div>
               </div>
               
       </overlay>
       <!-- 历史 -->
       <overlay style="min-height:500px;" oheight="60%"  :close.sync="isShowtl">
           <div class="yiji_t">
               <div class="t_title">母线配置历史 <span>{{stName}}</span></div>
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
                <div style="height:calc(100% - 82px);position:relative;overflow:hidden" class="scroll7">
                    <table class="table">
                        <tbody>
                            <tr :key="index" v-for="(item,index) in lishiAll">
                                <td :colspan="itemd.numone" :key="indexd" v-for="(itemd,indexd) in item">
                                    <span>{{itemd.name}}</span>
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
           </div>
       </overlay>
       <!-- 预览 -->
       <overlay style="min-height:500px;" oheight="80%" :close.sync="isShowYL">
         <div class="yiji_t" style="height:80%;padding:10px;box-sizing:border-box;">
           <div class="t_title">预览</div>
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
            <div class="yulanScroll">
              <table class="table">
                <tr v-if="equipmentEnergyData.length<=0">
                  <td colspan="10">暂无数据</td>
                </tr>
                <tr :key="index" v-for="(item,index) in equipmentEnergyData">
                  <td colspan="3">{{item.equipmentName}}</td>
                  <td>{{item.rate}}</td>
                  <td>{{item.startTariffInputValue}}</td>
                  <td>{{item.startTariffOutputValue}}</td>
                  <td>{{item.endTariffInputValue}}</td>
                  <td>{{item.endTariffOutputValue}}</td>
                  <td>{{item.inputValue}}</td>
                  <td>{{item.outputValue}}</td>
                </tr>
                <tr style="color:#84f1f1;" v-if="equipmentEnergyData.length>0">
                  <td colspan="4">合计</td>
                  <td colspan="4">平衡率：{{busBarLossVOS.rate}}</td>
                  
                  <td>{{busBarLossVOS.outputValue}}</td>
                  <td>{{busBarLossVOS.inputValue}}</td>
                </tr>
              </table>
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
import BScroll from "better-scroll";
import overlay from "@/components/common/overlay";
import $areaId from "../../../assets/config/areaMap";
import qs from "qs";
export default {
  data: function() {
    return {
      dddd: [],
      tbodys: [],
      tbodysAll: [],
      dayDate: this.$day().format("YYYY-MM-DD"),
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
      tmrEmsAll: [],
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
      beiyong: false,
      xsindex: -1, //控制缺失弹框
      diquName: "",
      isCYQX: false,
      shanchuDs: true,
      MXid: "",
      visible2: false,
      huanyuanDs: true,
      busBarLossVOS: {
        name: "合计"
      },
      equipmentEnergyData: [],
      hasYulanScroll: false,
      modelsType: [
        "lineEndModels",
        "transformerWindingModels",
        "compensatorModels",
        "generatingUnitModels",
        "energyconsumerModels",
        "virtureEquipmentModels",
        "unAttachedBreakers"
      ],
      saveIndex: []
    };
  },
  components: {
    overlay
  },
  computed: {
    tmrEms: function() {
      var arr = [];
      for (var a of this.tmrEmsAll) {
        if (
          (a[0].typeName !== "电容器" &&
            a[0].typeName !== "站用电" &&
            a[0].typeName !== "备用") ||
          (a[0].typeName === "电容器" && this.dianrong) ||
          (a[0].typeName === "站用电" && this.zydian) ||
          (a[0].typeName === "备用" && this.beiyong)
        ) {
          arr.push(a);
        }
      }
      return arr;
    }
  },
  mounted() {
    this.isLoading = true;
    this.$nextTick(() => {
      let scroll = new BScroll(".scroll", {
        scrollbar: { fade: false, interactive: true },
        preventDefault: false,
        mouseWheel: true
      });
      let scroll3 = new BScroll(".scroll3", {
        scrollbar: { fade: false, interactive: true },
        preventDefault: false,
        mouseWheel: true
      });
      let xiufu1 = new BScroll(".xiufu1", {
        scrollbar: { fade: false, interactive: true },
        preventDefault: false,
        mouseWheel: true
      });
      let xiufu2 = new BScroll(".xiufu2", {
        scrollbar: { fade: false, interactive: true },
        preventDefault: false,
        mouseWheel: true
      });
    });
    var areaId = this.$route.query.areaId;
    for (var a of $areaId) {
      if (areaId == a.areaId) {
        this.diquName = a.areaName;
      }
    }
    console.log(this.$route.query.substationId);
    if (this.$route.query.substationId === undefined) {
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
          if (res.data.code === 0) {
            this.isLoading = false;
            // this.$notify.error({
            //   title: "错误",
            //   message: "未知错误！"
            // });
            return;
          }
          this.isLoading = false;
          //console.log(res);
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
              if (a.configId === null) {
                isConfig = "未配置";
              } else {
                isConfig = "已配置";
              }
              if (arr2.indexOf(a.stId) === -1) {
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
            //console.log(this.tbodys);
          }
        })
        .catch(error => {
          this.isLoading = false;
          // this.$notify.error({
          //   title: "错误",
          //   message: "未知错误！"
          // });
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
      console.log(this.$route.query.bvId);
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
      if (num === count) {
        this.isLoading = false;
      }
    },
    handleType(genre, a2, data2, yemsline, ytmr, tmrAll, xiufuleft, wtmrline) {
      var genreType;
      var genreModels;
      console.log(tmrAll);
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
          xiufuleft.push({
            mrid: b.mrid,
            name: b.pathName,
            bvId: b.bvId,
            type:
              genre === "站用电"
                ? genre
                : b.energyconsumerType === 1
                  ? "站用变"
                  : b.energyconsumerType === 2
                    ? "备用"
                    : b.energyconsumerType === 3
                      ? "消弧线圈"
                      : b.energyconsumerType === 4 ? "电表" : "其他"
          });
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
    getJisuan(models, jisuanline, name) {
      if (models === undefined || models === "" || models === null) {
        return;
      }
      for (var a of models) {
        if (this.jisuan.indexOf(a.mrid) === -1) {
          this.jisuan.push(a.mrid);
          jisuanline.push({ mrid: a.mrid });
          this.xiufuright.push({
            mrid: a.mrid,
            name: a.pathName,
            bvId: a.bvId,
            type: name
          });
        }
      }
    },
    getTypeLeft(models, name, xiufuleft) {
      if (models === undefined || models === "" || models === null) {
        return;
      }
      if (models.length > 0) {
        for (var b of models) {
          xiufuleft.push({
            mrid: b.mrid,
            name: b.pathName,
            bvId: b.bvId,
            type: name
          });
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
            bgc: true,
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
    scJisuan(a2, jisuanline, genre) {
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
      for (var i in jisuanline) {
        var js = jisuanline[i];
        var mrid;
        if (js.emsMrId) {
          mrid = js.emsMrId;
        } else {
          mrid = js.mrid;
        }
        var has = false;
        for (var b of a2[genreModels]) {
          if (b.mrid === mrid) {
            has = true;
          }
        }
        if (!has) {
          jisuanline.splice(i, 1);
          this.jisuan.splice(this.jisuan.indexOf(js.mrid), 1);
        }
      }
    },
    getright(isClick, hasinput, mrid, stId, bvId, name) { //显示svg
      if (isClick && hasinput) {
        var count = 0;
        this.isLoading = true;
        this.isMrid = mrid;
        this.isStid = stId;
        this.isBvid = bvId;
        this.stName = name;
        this.ytmrAll = [];
        this.wtmrAll = [];
        this.wtmrAlls = [];
        this.wemsAll = [];
        this.wemsAlls = [];
        //for(var ){}
        this.xiufuleft = [];
        this.$http
          .get(
            "/analysisService/analy/getBalanceConfigSVG?appkey=3917230828&sign=" +
              sessionStorage.getItem("accessToken") +
              "&vlId=" +
              mrid
          )
          .then(res => {
            if (res.data.code === 0) {
              count++;
              this.handleLoad(3, count);
              // this.$notify.error({
              //   title: "错误",
              //   message: "未知错误"
              // });
              return;
            }
            count++;
            this.handleLoad(3, count);
            var data = res.data;
            this.svgHtml = "";
            if (data === "") {
              this.svgHtml = `<div>无数据</div>`;
            } else {
              this.svgHtml = data;
            }
          })
          .catch(error => {
            count++;
            this.handleLoad(3, count);
            // this.$notify.error({
            //   title: "错误",
            //   message: "未知错误"
            // });
          });
        this.$http
          .get(
            "/analysisService/analy/getBalanceConfigModel?appkey=3917230828&sign=" +
              sessionStorage.getItem("accessToken") +
              "&vlId=" +
              mrid
          )
          .then(res => {
            if (res.data.code === 0) {
              count++;
              this.handleLoad(3, count);
              this.$notify.error({
                title: "错误",
                message: "未知错误"
              });
              return;
            }
            count++;
            this.handleLoad(3, count);
            //console.log(res);
            this.jisuan = [];
            this.jisuanline = [];
            this.jisuantrans = [];
            this.jisuanbre = [];
            this.jisuancom = [];
            this.jisuanene = [];
            this.jisuangen = [];
            this.jisuanvir = [];
            var data = res.data.data.model;
            this.xiufuright = [];
            if (data.length > 0) {
              var b = data[0];
              this.getJisuan(b.lineEndModels, this.jisuanline, "线端");
              this.getJisuan(
                b.transformerWindingModels,
                this.jisuantrans,
                "绕组"
              );
              this.getJisuan(b.breakerModels, this.jisuanbre, "开关");
              this.getJisuan(b.compensatorModels, this.jisuancom, "电容器");
              this.getJisuan(b.energyconsumerModels, this.jisuanene, "站用电");
              this.getJisuan(b.generatingUnitModels, this.jisuangen, "机组");
              this.getJisuan(
                b.virtureEquipmentModels,
                this.jisuanvir,
                "虚拟设备"
              );
            }
          })
          .catch(error => {
            count++;
            this.handleLoad(3, count);
            // this.$notify.error({
            //   title: "错误",
            //   message: "未知错误"
            // });
          });
        this.$http
          .get(
            "/analysisService/analy/getSubstationModel?inUse=1&sign=" +
              sessionStorage.getItem("accessToken") +
              "&stId=" +
              stId
          )
          .then(res => {
            if (res.data.code === 0) {
              count++;
              this.handleLoad(3, count);
              // this.$notify.error({
              //   title: "错误",
              //   message: "未知错误===0）"
              // });
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
                if (res2.data.code === 0) {
                  count++;
                  this.handleLoad(3, count);
                  // this.$notify.error({
                  //   title: "错误",
                  //   message: "未知错误===0）"
                  // });
                  var data2 = { voltageLevelModels: [] };
                } else {
                  count++;
                  this.handleLoad(3, count);
                  var data2 = res2.data.data.substationModel;
                }

                //console.log(data);
                //console.log(data2);
                // 线端
                for (var a2 of data.voltageLevelModels) {
                  if (a2.bvId == bvId) {
                    //console.log("comline0");
                    //线端
                    this.scJisuan(a2, this.jisuanline, "线端");
                    this.handleType(
                      "线端",
                      a2,
                      data2,
                      yemsline,
                      ytmr,
                      tmrAll,
                      xiufuleft,
                      wtmrline
                    );
                    //绕组
                    this.scJisuan(a2, this.jisuantrans, "绕组");
                    this.handleType(
                      "绕组",
                      a2,
                      data2,
                      yemstransf,
                      ytmr,
                      tmrAll,
                      xiufuleft,
                      wtmrtransf
                    );
                    //电容器
                    this.scJisuan(a2, this.jisuancom, "电容器");
                    this.handleType(
                      "电容器",
                      a2,
                      data2,
                      yemscom,
                      ytmr,
                      tmrAll,
                      xiufuleft,
                      wtmrcom
                    );
                    //机组
                    this.scJisuan(a2, this.jisuangen, "机组");
                    this.handleType(
                      "机组",
                      a2,
                      data2,
                      yemsgen,
                      ytmr,
                      tmrAll,
                      xiufuleft,
                      wtmrgen
                    );
                    //this.scJisuan(a2,this.jisuanbre,"开关");
                    // this.handleType(
                    //   "开关",
                    //   a2,
                    //   data2,
                    //   yemsbre,
                    //   ytmr,
                    //   tmrAll,
                    //   xiufuleft,
                    //    wtmrbre
                    // );
                    //站用电
                    this.scJisuan(a2, this.jisuanene, "站用电");
                    this.handleType(
                      "站用电",
                      a2,
                      data2,
                      yemsene,
                      ytmr,
                      tmrAll,
                      xiufuleft,
                      wtmrene
                    );
                    //虚拟设备
                    this.scJisuan(a2, this.jisuanvir, "虚拟设备");
                    this.handleType(
                      "虚拟设备",
                      a2,
                      data2,
                      yemsvir,
                      ytmr,
                      tmrAll,
                      xiufuleft,
                      wtmrvir
                    );
                  } else {
                    this.getTypeLeft(a2.lineEndModels, "线端", xiufuleft);
                    //this.getTypeLeft(a2.unAttachedBreakers,"开关",xiufuleft);
                    this.getTypeLeft(a2.compensatorModels, "电容器", xiufuleft);
                    if (a2.energyconsumerModels.length > 0) {
                      for (var b of a2.energyconsumerModels) {
                        xiufuleft.push({
                          mrid: b.mrid,
                          name: b.pathName,
                          bvId: b.bvId,
                          type:
                            b.energyconsumerType === 1
                              ? "站用变"
                              : b.energyconsumerType === 2
                                ? "备用"
                                : b.energyconsumerType === 3
                                  ? "消弧线圈"
                                  : b.energyconsumerType === 4 ? "电表" : "其他"
                        });
                      }
                    }
                    this.getTypeLeft(
                      a2.generatingUnitModels,
                      "机组",
                      xiufuleft
                    );
                    this.getTypeLeft(
                      a2.transformerWindingModels,
                      "绕组",
                      xiufuleft
                    );
                    this.getTypeLeft(
                      a2.virtureEquipmentModels,
                      "虚拟设备",
                      xiufuleft
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
                this.ytmrAll = ytmr;
                this.tmrEmsAll = tmrAll;
                console.log(tmrAll);
                this.saveIndex = [];
                for (var a of this.jisuan) {
                  for (var b of this.tmrEms) {
                    if (a == b[0].mrid) {
                      this.saveIndex.push(a);
                    }
                  }
                }
                this.wtmrAll = wtmrline
                  .concat(wtmrtransf)
                  .concat(wtmrcom)
                  .concat(wtmrgen)
                  // .concat(wtmrbre)
                  .concat(wtmrene)
                  .concat(wtmrvir);
                //console.log(this.wtmrAll);
                this.wtmrAlls = this.wtmrAll;
                this.wemsAll = linequeshi
                  .concat(transfqueshi)
                  .concat(comqueshi)
                  .concat(genqueshi)
                  // .concat(brequeshi)
                  .concat(enequeshi)
                  .concat(virqueshi);
                this.wemsAlls = this.wemsAll;
                //for(var ){}
                this.xiufuleft = xiufuleft;
                //console.log(this.tmrEms);
              });
            //       .catch(error => {
            //         count++;
            //         this.handleLoad(3, count);
            //         this.$notify.error({
            //   title: '错误',
            //   message:"系统错误（error）"
            // });
            //       });
          })
          .catch(error => {
            count++;
            this.handleLoad(3, count);
            // this.$notify.error({
            //   title: "错误",
            //   message: error
            // });
          });
      }
    },
    cyquanxuan() {
      this.jisuan = [];
      this.jisuanline = [];
      this.jisuantrans = [];
      this.jisuanbre = [];
      this.jisuancom = [];
      this.jisuanene = [];
      this.jisuangen = [];
      this.jisuanvir = [];
      this.isCYQX = !this.isCYQX;
      if (this.isCYQX) {
        //console.log(1);
        for (var a of this.tmrEms) {
          if (a[2].name !== "缺失") {
            this.jisuan.push(a[0].mrid);
            if (a[1].name === "线端") {
              this.jisuanline.push({ mrid: a[0].mrid });
            } else if (a[1].name === "绕组") {
              this.jisuantrans.push({ mrid: a[0].mrid });
            } else if (a[1].name === "开关") {
              this.jisuanbre.push({ mrid: a[0].mrid });
            } else if (a[1].name === "电容") {
              this.jisuancom.push({ mrid: a[0].mrid });
            } else if (
              a[1].name === "站用电" ||
              a[1].name === "站用变" ||
              a[1].name === "备用" ||
              a[1].name === "消弧线圈" ||
              a[1].name === "电表" ||
              a[1].name === "其他"
            ) {
              this.jisuanene.push({ mrid: a[0].mrid });
            } else if (a[1].name === "机组") {
              this.jisuangen.push({ mrid: a[0].mrid });
            } else if (a[1].name === "虚拟设备") {
              this.jisuanvir.push({ mrid: a[0].mrid });
            }
          }
        }
      }
      //console.log(this.jisuan);
    },
    queshixz(isClick, bgc) {
      if (isClick && bgc) {
        //console.log("bgc");
      }
    },
    daiti($event, msg) {
      //console.log($event);
      $event.target.parentElement.parentElement.previousElementSibling.innerHTML = msg;
      $event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.disabled = false;
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
                preventDefault: false,
                mouseWheel: true
              });
              let scroll9 = new BScroll(".scroll9", {
                scrollbar: { fade: false, interactive: true },
                preventDefault: false,
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
            preventDefault: false,
            mouseWheel: true
          });
        });
        this.hasScroll4 = true;
      }
    },
    checekjisuan($event, mrid, name, queshi, localName1) {
      // var TMRName=$event.target.parentElement.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild;
      // //console.log(TMRName);
      //console.log(queshi);
      if (queshi) {
        var queshiName =
          $event.target.parentNode.parentElement.nextElementSibling
            .nextElementSibling.firstElementChild.firstElementChild.innerHTML;
        if (queshiName === "缺失") {
          return;
        }
        //console.log(queshiName);
        var diquName = encodeURI(encodeURI(this.diquName));
        var localName = encodeURI(encodeURI(localName1));
        //console.log(diquName);
        var dataReplacePolicy;
        if (queshiName === "对端替代") {
          dataReplacePolicy = "1";
        }
        if (queshiName === "功率积分替代") {
          dataReplacePolicy = "2";
        }
        if (queshiName === "报备 (不替代)") {
          dataReplacePolicy = "3";
        }
        if (this.jisuan.indexOf(mrid) === -1) {
          this.jisuanvir.push({
            dataReplacePolicy: dataReplacePolicy,
            emsMrId: mrid,
            localName: localName,
            pathName: localName,
            equipmentType: "virtureEquipment",
            emsSystemId: diquName
          });
          this.jisuan.push(mrid);
        } else {
          for (var i in this.jisuanvir) {
            if (this.jisuanvir[i].emsMrId === mrid) {
              this.jisuanvir.splice(i, 1);
            }
          }
          this.jisuan.splice(this.jisuan.indexOf(mrid), 1);
        }
      } else {
        if (this.jisuan.indexOf(mrid) === -1) {
          if (name === "线端") {
            this.jisuanline.push({ mrid: mrid });
          } else if (name === "绕组") {
            this.jisuantrans.push({ mrid: mrid });
          } else if (name === "开关") {
            this.jisuanbre.push({ mrid: mrid });
          } else if (name === "电容器") {
            this.jisuancom.push({ mrid: mrid });
          } else if (
            name === "站用电" ||
            name === "站用变" ||
            name === "备用" ||
            name === "消弧线圈" ||
            name === "电表" ||
            name === "其他"
          ) {
            this.jisuanene.push({ mrid: mrid });
          } else if (name === "机组") {
            this.jisuangen.push({ mrid: mrid });
          } else if (name === "虚拟设备") {
            this.jisuanvir.push({ mrid: mrid });
          }
          this.jisuan.push(mrid);
        } else {
          if (name === "线端") {
            for (var i in this.jisuanline) {
              if (this.jisuanline[i].mrid === mrid) {
                this.jisuanline.splice(i, 1);
              }
            }
          } else if (name === "绕组") {
            for (var i in this.jisuantrans) {
              if (this.jisuantrans[i].mrid === mrid) {
                this.jisuantrans.splice(i, 1);
              }
            }
          } else if (name === "开关") {
            for (var i in this.jisuanbre) {
              if (this.jisuanbre[i].mrid === mrid) {
                this.jisuanbre.splice(i, 1);
              }
            }
          } else if (name === "电容器") {
            for (var i in this.jisuancom) {
              if (this.jisuancom[i].mrid === mrid) {
                this.jisuancom.splice(i, 1);
              }
            }
          } else if (
            name === "站用电" ||
            name === "站用变" ||
            name === "备用" ||
            name === "消弧线圈" ||
            name === "电表" ||
            name === "其他"
          ) {
            for (var i in this.jisuanene) {
              if (this.jisuanene[i].mrid === mrid) {
                this.jisuanene.splice(i, 1);
              }
            }
          } else if (name === "机组") {
            for (var i in this.jisuangen) {
              if (this.jisuangen[i].mrid === mrid) {
                this.jisuangen.splice(i, 1);
              }
            }
          } else if (name === "虚拟设备") {
            for (var i in this.jisuanvir) {
              if (this.jisuanvir[i].mrid === mrid) {
                this.jisuanvir.splice(i, 1);
              }
            }
          }
          this.jisuan.splice(this.jisuan.indexOf(mrid), 1);
        }
      }
    },
    soutmr() {
      if(this.tmrName==""){
        this.wtmrAll=this.wtmrAlls;
      }else{
        this.wtmrAll = [];
        for (var a of this.wtmrAlls) {
          if (a.name.indexOf(this.tmrName) !== -1) {
            this.wtmrAll.push(a);
          }
        }
      }
      
    },
    souems() {
      if(this.emsName==""){
        this.wemsAll=this.wemsAlls;
      }else{
        this.wemsAll = [];
        for (var a of this.wemsAlls) {
          if (a.name.indexOf(this.emsName) !== -1) {
            this.wemsAll.push(a);
          }
        }
      }
      
    },
    shanchuarr(arr, a) {
      for (var i in arr) {
        var b = arr[i];
        if (b.mrid === a) {
          arr.splice(i, 1);
        }
      }
      return arr;
    },
    saves() {//保存刷新svg
      if (this.configTime === "" || this.configTime === null) {
        this.$notify({
          title: "消息",
          message: "请选择时间!"
        });
        return;
      }
      console.log(this.tmrEms, this.saveIndex);
      this.jisuanline = [];
      this.jisuantrans = [];
      this.jisuanbre = [];
      this.jisuancom = [];
      this.jisuanene = [];
      this.jisuangen = [];
      this.jisuanvir = [];

      for (var a of this.saveIndex) {
        for (var b of this.tmrEmsAll) {
          if (a === b[0].mrid) {
            if (b[1].queshi) {
              console.log("queshi");
              var dataReplacePolicy =
                b[1].name === "对端替代"
                  ? 1
                  : b[1].name === "功率积分替代" ? 2 : 3;
              var diquName = encodeURI(encodeURI(this.diquName));
              console.log(this.diquName);
              var localName = encodeURI(encodeURI(b[2].name));
              this.jisuanvir.push({
                dataReplacePolicy: dataReplacePolicy,
                emsMrId: a,
                localName: localName,
                pathName: localName,
                equipmentType: "virtureEquipment",
                emsSystemId: diquName
              });
            } else {
              if (b[0].typeName === "线端") {
                this.jisuanline.push({ mrid: a });
              } else if (b[0].typeName === "绕组") {
                this.jisuantrans.push({ mrid: a });
              } else if (b[0].typeName === "电容器") {
                this.jisuancom.push({ mrid: a });
              } else if (b[0].typeName === "机组") {
                this.jisuanene.push({ mrid: a });
              } else if (b[0].typeName === "站用电") {
                this.jisuangen.push({ mrid: a });
              } else if (b[0].typeName === "虚拟设备") {
                this.jisuanvir.push({ mrid: a });
              } else if (b[0].typeName === "开关") {
                this.jisuanbre.push({ mrid: a });
              }
            }
          }
        }
      }
      console.log(this.jisuanvir);
      var arr = {
        lineEndModels: this.jisuanline,
        transformerWindingModels: this.jisuantrans,
        breakerModels: this.jisuanbre,
        compensatorModels: this.jisuancom,
        energyconsumerModels: this.jisuanene,
        generatingUnitModels: this.jisuangen,
        virtureEquipmentModels: this.jisuanvir,
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
          //console.log(res);
          if (res.data.code === 1) {
            this.getright(
              true,
              true,
              this.isMrid,
              this.isStid,
              this.isBvid,
              this.stName
            );
            this.$notify({
              title: "成功",
              message: "保存成功!",
              type: "success"
            });
            this.isShowtsave = false;
          } else {
            // this.$notify.error({
            //   title: "错误",
            //   message: "未知错误===0）"
            // });
          }
        });
    },
    huanyuan() {//svg配置
      this.isShowth = true;
      if (!this.hasScroll5) {
        this.$nextTick(() => {
          let scroll5 = new BScroll(".scroll5", {
            scrollbar: { fade: false, interactive: true },
            preventDefault: false,
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
          if (res.data.code === 0) {
            // this.$notify.error({
            //   title: "错误",
            //   message: "未知错误===0）"
            // });
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
            preventDefault: false,
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
          if (res.data.code === 0) {
            // this.$notify.error({
            //   title: "错误",
            //   message: "未知错误===0）"
            // });
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
            preventDefault: false,
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
          if (res.data.code === 0) {
            // this.$notify.error({
            //   title: "错误",
            //   message: "未知错误===0）"
            // });
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
      //console.log(this.xiufuleft);
      //console.log(this.xiufuright);
      for (var a of this.xiufuright) {
        for (var i in this.xiufuleft) {
          if (a.mrid === this.xiufuleft[i].mrid) {
            //console.log(1);
            this.xiufuleft.splice(i, 1);
          }
        }
      }
      this.isShowtxiufu = true;
    },
    //   修复弹框左边数据选中
    xiufuleftzs(index) {
      if (this.xiufuleftindexs.indexOf(index) === -1) {
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
        if (arr.indexOf(this.xiufuleft[i]) !== -1) {
          this.xiufuleft.splice(i, 1);
        }
      }
      this.xiufuleftindexs = [];
    },
    xiufurightzs(index) {
      if (this.xiufurightindexs.indexOf(index) === -1) {
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
        if (arr.indexOf(this.xiufuright[i]) !== -1) {
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
        if (a.type === "线端") {
          lineEndModels.push({ mrid: a.mrid });
        }
        if (a.type === "绕组") {
          transformerWindingModels.push({ mrid: a.mrid });
        }
        if (a.type === "开关") {
          breakerModels.push({ mrid: a.mrid });
        }
        if (a.type === "电容器") {
          compensatorModels.push({ mrid: a.mrid });
        }
        if (
          a.type === "站用电" ||
          a.type === "站用变" ||
          a.type === "备用" ||
          a.type === "消弧线圈" ||
          a.type === "电表" ||
          a.type === "其他"
        ) {
          energyconsumerModels.push({ mrid: a.mrid });
        }
        if (a.type === "机组") {
          generatingUnitModels.push({ mrid: a.mrid });
        }
        if (a.type === "虚拟设备") {
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
          //console.log(res);
          if (res.data.code === 1) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success"
            });
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
            // this.$notify.error({
            //   title: "错误",
            //   message: "未知错误===0）"
            // });
          }
        });
    },
    shanchupeizhi() {
      var shanchuid = document.getElementsByClassName("shanchuid");
      var value;
      for (var i = 0; i < shanchuid.length; i++) {
        if (shanchuid[i].checked === true) {
          value = shanchuid[i].value;
        }
      }
      this.MXid = value;
    },
    qdshanchupeizhi() {
      this.$http
        .post(
          "/analysisService/analy/deleteBalanceConfig?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            mrIds: this.MXid,
            vlId: this.isMrid
          })
        )
        .then(res => {
          if (res.data.code === 0) {
            // this.$notify.error({
            //   title: "错误",
            //   message: "未知错误===0）"
            // });
            return;
          }
          //console.log(res);
          if (res.data.code === 1) {
            this.$notify({
              title: "成功",
              message: "删除成功!",
              type: "success"
            });
            this.shanchuDs = true;
            this.shanchu();
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
    huanyuanpeizhi() {
      var huanyuanid = document.getElementsByClassName("huanyuanid");
      var value;
      for (var i = 0; i < huanyuanid.length; i++) {
        if (huanyuanid[i].checked === true) {
          value = huanyuanid[i].value;
        }
      }
      if (value === undefined) {
        this.$notify.info({
          title: "消息",
          message: "请先选择要还原的配置"
        });
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
            if (res.data.code === 0) {
              // this.$notify.error({
              //   title: "错误",
              //   message: "未知错误===0）"
              // });
            } else {
              this.$notify({
                title: "成功",
                message: "还原成功",
                type: "success"
              });
            }
          });
      }
    },
    newguanlian() {
      if (
        this.tmrtype == "" ||
        this.tmrmrid == "" ||
        this.emsmrid == "" ||
        this.emsSystemId == ""
      ) {
        this.$notify.info({
          title: "消息",
          message: "请先选择要关联的配置"
        });
        return;
      }
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
          //console.log(res);
          if (res.data.code === 1) {
            this.tmrtype ="";
            this.tmrmrid ="";
            this.emsmrid ="";
            this.$notify({
              title: "成功",
              message: "关联成功",
              type: "success"
            });
            this.getright(
              true,
              true,
              this.isMrid,
              this.isStid,
              this.isBvid,
              this.stName
            );
          } else {
            this.tmrtype ="";
            this.tmrmrid ="";
            this.emsmrid ="";
            // this.$notify.error({
            //   title: "错误",
            //   message: "未知错误===0）"
            // });
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
            //console.log(res);
            if (res.data.code === 1) {
              this.$notify({
                title: "成功",
                message: "解除关联成功",
                type: "success"
              });
              this.getright(
                true,
                true,
                this.isMrid,
                this.isStid,
                this.isBvid,
                this.stName
              );
            } else {
              // this.$notify.error({
              //   title: "错误",
              //   message: "未知错误===0）"
              // });
            }
          });
      }
    },
    filter() {
      if (this.sousuo !== "") {
        var arr = [];
        var re = new RegExp(this.sousuo);
        for (var i in this.tbodysAll) {
          var data = this.tbodysAll[i];
          if (data.length === 4) {
            if (re.test(data[0].name)) {
              for (var j = 0; j < data[0].numtwo; j++) {
                arr.push(this.tbodysAll[i - -j]);
              }
            }
          }
        }
        //console.log(arr);
        this.tbodys = arr;
      } else {
        this.tbodys = this.tbodysAll;
      }
    },
    xquanxuan() {
      this.quanxuan = !this.quanxuan;
      this.quxiao = false;
      //console.log(this.quanxuan);
    },
    easyConfig() {
      this.isShowt = true;
      var diya = document.getElementsByClassName("diya");
      var arr = [];
      for (var i = 0; i < diya.length; i++) {
        if (diya[i].checked === true) {
          var num = parseInt(diya[i].value);
          arr.push(this.doruArrAll[num]);
        }
      }
      this.doruArr = arr;
      if (!this.hasScroll) {
        this.$nextTick(() => {
          let scroll1 = new BScroll(".scroll1", {
            scrollbar: { fade: false, interactive: true },
            preventDefault: false,
            mouseWheel: true
          });
        });
        this.hasScroll = true;
      }
    },
    refreshSvg () {
      var diya = document.getElementsByClassName("diya");
      console.log(0);
      var vlIds = [];
      console.log(vlIds);
      for (var i = 0; i < diya.length; i++) {
        if (diya[i].checked === true) {
          var num = parseInt(diya[i].value);
          vlIds.push(this.doruArrAll[num].mrid);
        }
      }
      console.log(1);  
      console.log(vlIds);
      this.isLoading=true;
      this.$http
            .get(
              "/analysisService/analy/refreshSVG?appkey=3917230828&sign=" +
                sessionStorage.getItem("accessToken"),{
                params:{
                vlIds:vlIds
                }
                }
            )
            .then(res => {
              //console.log(respons.list);
              if (res.data.code == 1) {
                if (this.isMrid) {
                  console.log(3);  
                  console.log(this.isMrid);
                  this.$http
                    .get(
                      "/analysisService/analy/getBalanceConfigSVG?appkey=3917230828&sign=" +
                        sessionStorage.getItem("accessToken") +
                        "&vlId=" +
                        this.isMrid
                    )
                    .then(res => {
                      if (res.data.code === 0) {
                        this.isLoading=false;
                        // count++;
                        // this.handleLoad(3, count);
                        // this.$notify.error({
                        //   title: "错误",
                        //   message: "未知错误"
                        // });
                        return;
                      }
                      this.isLoading=false;
                      // count++;
                      // this.handleLoad(3, count);
                      var data = res.data;
                      this.svgHtml = "";
                      if (data === "") {
                        this.svgHtml = `<div>无数据</div>`;
                      } else {
                        this.svgHtml = data;
                      }
                    })
                    .catch(error => {
                      this.isLoading=false;
                      // count++;
                      // this.handleLoad(3, count);
                      // this.$notify.error({
                      //   title: "错误",
                      //   message: "未知错误"
                      // });
                    });

                  
                } else {
                  this.isLoading=false;
                  // this.$notify.error({
                  //         title: "提示",
                  //         message: "当前未选中要展示的svg"
                  //       });
                  
                }

                this.$notify({
                  title: "刷新成功",
                  message: "操作成功",
                  type: "success"
                });
              }else{
                this.isLoading=false;
                this.$notify({
                  title: "刷新失败",
                  message: "请选择左侧需要刷新的站点后重试",
                  type: ""
                });
                
              }
            })
            .catch(error => {
              this.isLoading=false;
              //console.log(error);
            });

    },
    chuli() {
      var peizhi = document.getElementsByClassName("peizhi");
      //console.log(peizhi);
      var arr = [];
      for (var i = 0; i < peizhi.length; i++) {
        if (peizhi[i].checked === true) {
          var num = parseInt(peizhi[i].value);
          //console.log(this.doruArr);
          var mrid = this.doruArr[num].mrid;
          this.$http
            .post(
              "/analysisService/analy/initBalanceConfig?appkey=3917230828&sign=" +
                sessionStorage.getItem("accessToken"),
              qs.stringify({
                vlId: mrid
              })
            )
            .then(res => {
              //console.log(res);
              if (res.data.code === 1) {
                this.$notify({
                  title: "成功",
                  message: "操作成功",
                  type: "success"
                });
              }
            })
            .catch(error => {
              //console.log(error);
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
            preventDefault: false,
            mouseWheel: true
          });
        });
        this.hasScroll2 = true;
      }
      //待修改
      var diya = document.getElementsByClassName("diya");
      var arr = [];
      for (var i = 0; i < diya.length; i++) {
        if (diya[i].checked === true) {
          var num = parseInt(diya[i].value);
          arr.push(this.doruArrAll[num]);
        }
      }
      //console.log(arr);
      //this.voltageLevelPageTipVOList.
      this.$http
        .get(
          "/analysisService/analy/reCalculationList?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken")
        )
        .then(res => {
          //console.log(res);
          var data = res.data.data.reTaskList;
          this.voltageLevelPageTipVOListAll = data.slice();
          this.voltageLevelPageTipVOList = [];
          for (var a of arr) {
            this.voltageLevelPageTipVOListAll.unshift({
              modelIds: a.mrid,
              taskDetail: a.pathName
            });
            this.voltageLevelPageTipVOList.unshift([a.pathName, "", "", "", ""]);
          }
          //console.log(data);
          if (data.length > 0) {
            for (var a of data) {
              var taskType =
                a.taskType === 1 ? "母线" : a.taskType === 2 ? "电量" : "";
              var status =
                a.status === 1
                  ? "启动"
                  : a.status === 2
                    ? "执行中"
                    : a.status === 3 ? "成功" : a.status === 4 ? "失败" : "";
              this.voltageLevelPageTipVOList.push([
                a.taskDetail,
                taskType,
                a.startTime,
                a.endTime,
                status
              ]);
            }
          }
          //console.log(this.voltageLevelPageTipVOList);
        });
    },
    chuli2() {
      var peizhi = document.getElementsByClassName("peizhi2");
      var arr = [];
      if (this.startTimec === "" || this.endTimec === "") {
        this.$notify.info({
          title: "消息",
          message: "请选择时间"
        });
        return;
      }
      //console.log(peizhi);
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
      //console.log(arr);
      this.$http
        .post(
          "/analysisService/analy/reCalculation?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken"),
          arr
        )
        .then(res => {
          //console.log(res);
          if(res.data.code==1){
            this.$notify({
                  title: "成功",
                  message: "处理成功",
                  type: "success"
                });
            this.RenewConfig();
          }
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
      if (this.isMrid === "") {
        this.$notify.info({
          title: "消息",
          message: "请选选择设备"
        });
        return;
      }
      this.isShowYL = true;
      this.isLoading = true;
      if (!this.hasYulanScroll) {
        this.$nextTick(() => {
          let scroll = new BScroll(".yulanScroll", {
            scrollbar: { fade: false, interactive: true },
            preventDefault: false,
            mouseWheel: true
          });
        });
        this.hasYulanScroll = true;
      }
      var arr = {
        lineEndModels: this.jisuanline,
        transformerWindingModels: this.jisuantrans,
        breakerModels: this.jisuanbre,
        compensatorModels: this.jisuancom,
        energyconsumerModels: this.jisuanene,
        generatingUnitModels: this.jisuangen,
        virtureEquipmentModels: this.jisuanvir,
        // endTime: this.$day().format("YYYY-MM-DD HH:mm:ss"),
        endTime: this.dayDate + " 00:00:00",
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
        .then(res => {
          if (res.data.code === 1) {
            this.isLoading = false;
            var data = res.data.data.busBarLossVOS;
            this.busBarLossVOS = data;
            this.equipmentEnergyData = res.data.data.equipmentEnergyData;
          } else {
            this.isLoading = false;
          }
        });
    },
    open() {
      this.shanchupeizhi();
      this.$confirm(
        "母线id:" + this.MXid + ",配置id:" + this.isMrid,
        "确定删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.qdshanchupeizhi();
        })
        .catch(() => {
          this.$notify.info({
            title: "消息",
            message: "已取消删除"
          });
        });
    }
  },
  watch: {
    ischekedAllc: function() {
      if (this.ischekedAllc === true) {
        this.dddd = [];
        for (var i = 0; i < this.voltageLevelPageTipVOListAll.length; i++) {
          this.dddd.push(i);
        }
      } else {
        this.dddd = [];
      }
    },
    isCYQX: function() {
      if (this.isCYQX) {
        // this.saveIndex = Array.from({ length: this.tmrEms.length }, (v, k) => k);
        for (var a of this.tmrEms) {
          if (a[1].name !== "缺失") {
            this.saveIndex.push(a[0].mrid);
          }
        }
      } else {
        this.saveIndex = [];
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
  /* width: 10%;
  margin-right: 2%; */
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
  background: #ff4144 !important;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
  font-size: 14px;
  position: relative;
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
.one .jsthbox {
  width: 266px;
  padding: 5px 10px;
  position: absolute;
  left: 100%;
  top: -9px;
  margin-left: 10px;
  background: #035252;
  z-index: 7;
  box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.3);
  line-height: 24px;
  color: #84f1f1;
  display: none;
  text-align: left;
  transition: all 500ms;
  border-radius: 5px;
}
.one .xianshi {
  display: block !important;
}
.one .jsthbox:before {
  content: "";
  width: 0;
  height: 0;
  border-width: 8px 12px;
  border-style: solid;
  border-color: transparent #035252 transparent transparent;
  position: absolute;
  left: -24px;
  top: 9px;
}
.one .yulanScroll {
  height: calc(100% - 30px);
  position: relative;
  overflow: hidden;
}
</style>
