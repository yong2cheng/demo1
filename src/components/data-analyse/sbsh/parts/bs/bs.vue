<template>
    <div>
        <div style="margin-top:10px; margin-bottom:0"> 
            
            <!--日历控件-->
            <div style="text-align:right;">
                <button @click="timetype='ri'" :class="{btn_checked:timetype=='ri'}"> 日数据</button>
                    <button @click="timetype='yue'" :class="{btn_checked:timetype=='yue'}">月数据</button> 
                    <button @click="timetype='nian'" :class="{btn_checked:timetype=='nian'}">年数据</button>
                    <button @click="timetype='sd'" :class="{btn_checked:timetype=='sd'}">时段数据</button>
                <br>
                <ul style="display:block;margin-right:5px;margin-top:10px;">
                    <li v-if="timetype=='ri'">
                        <input class="txt" type="text" placeholder="YYYY-MM-DD"  readonly>
                        <input type="button" value="提交">
                    </li>
                    <li v-if="timetype=='yue'">
                        <input class="txt" placeholder="YYYY-MM"  readonly>
                        <input type="button" class="timebutt" value="提交">
                    </li>
                    <li v-if="timetype=='nian'">
                        <input class="txt" type="text" placeholder="YYYY"  readonly>
                        <input type="button" value="提交">
                    </li>
                    <li v-if="timetype=='sd'">
                        <input class="txt" type="text" placeholder="开始日期" value=""  readonly>
                        <input class="txt" type="text" placeholder="结束日期"   readonly>
                        <input type="button" value="提交">
                    </li>
                </ul>
            </div>
            <!--日历控件end--> 
            
        </div>
        <div style="padding:0 20px;" class="sjbk"> 
            <!--左边汇总-->
            <div style="min-height:614px;width:25%;float:left">
                <table class="table" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
                    <thead>
                        <tr>
                            <td colspan="4">汇总</td>
                        </tr>
                    </thead>
                    <tr>
                        <td align="center">母线</td>
                        <td align="center">总数</td>
                        <td align="center">本月新增</td>
                        <td align="center">退役</td>
                    </tr>
                    <tr>
                        <td>500kV</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>220kV</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>110kV</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>35kV</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <table class="table" width="100%" border="0" cellspacing="0" cellpadding="0" style=" margin-top:10px;">
                    <thead>
                        <tr>
                            <td colspan="2">事件汇总</td>
                        </tr>
                    </thead>
                    <tr>
                        <td width="50%">电表轮换</td>
                        <td>413</td>
                    </tr>
                    <tr>
                        <td>CT/PT轮换</td>
                        <td>212</td>
                    </tr>
                    <tr>
                        <td>旁路事件</td>
                        <td>23</td>
                    </tr>
                    <tr>
                        <td>数据变化</td>
                        <td>45</td>
                    </tr>
                </table>
                <table class="table" width="100%" border="0" cellspacing="0" cellpadding="0" style=" margin-top:10px;">
                    <thead>
                        <tr>
                            <td colspan="5">维护统计</td>
                        </tr>
                    </thead>
                    <tr>
                        <td></td>
                        <td align="center">总数</td>
                        <td align="center">待处理</td>
                        <td align="center">进行中</td>
                        <td align="center">已完成</td>
                    </tr>
                    <tr>
                        <td>线路问题</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>现场问题</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            
            <!--右边-->
            <div style="min-height:614px;width:70%;float:right;" class="mx_right mx_right_k">
                <div style="margin-top:10px;margin-bottom:20px;text-align:center;" class="buttbox">
                        <button style="margin-right:20px" class="btn_checked">500kV</button> 
                        <button style="margin-right:20px">220kV</button> 
                        <button style="margin-right:20px">110kV</button> 指标&ge;
                        <select name="" id="">
                            <option value="">----</option>
                            <option value="">10%</option>
                            <option value="">5%</option>
                            <option value="">2%</option>
                            <option value="">1%</option>
                        </select>
                </div>
                <div class="gdbgbox scrollbox" id="bsbox">
                    <table class="table" width="100%" border="0" cellspacing="0" cellpadding="0" id="bstab">
                        <thead>
                            <tr>
                                <td>厂站名称</td>
                                <td>主变</td>
                                <td>输入</td>
                                <td>输出</td>
                                <td>不平衡</td>
                                <td>不平衡率</td>
                            </tr>
                        </thead>
                    </table>
                    <div class="scroll9" style="position:relative;overflow:hidden;height:500px;">
                            <table class="table" width="100%" border="0" cellspacing="0" cellpadding="0" id="bstab">
                            
                            <tbody>
                                <tr>
                                    <td><a href="mxphl_cx_mxcx.html" target="_blank">马家庄变电站</a></td>
                                    <td><a href="mxphl_xq_add_mx.html" target="_blank">220kV</a></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><a href="mxphl_xq_add_mx.html" target="_blank">110kV</a></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><a href="mxphl_xq_add_mx.html" target="_blank">35kV</a></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td rowspan="3"><a href="mxphl_cx_mxcx.html" target="_blank">中南变电站</a></td>
                                    <td>220kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>110kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>35kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td rowspan="3"></td>
                                    <td>220kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>110kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>35kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td rowspan="3"></td>
                                    <td>220kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>110kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>35kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td rowspan="3"></td>
                                    <td>220kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>110kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>35kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td rowspan="3"></td>
                                    <td>220kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>110kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>35kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td rowspan="3"></td>
                                    <td>220kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>110kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>35kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td rowspan="3"></td>
                                    <td>220kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>110kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>35kV</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
        <div style="clear:both;"></div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    data:function(){
        return{
            timetype:'ri'
        }
    },
    mounted(){
         this.$nextTick(() => {
                        let scroll = new BScroll('.scroll9', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true});
                        
                        })
    }
}
</script>
<style>
</style>


