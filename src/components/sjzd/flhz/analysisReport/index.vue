<template lang="html">
    

      <div class="all_width">
        <p class="fxshuom">
          截至到2017年11月10日xxx地区本月累计异常问题<span>218</span>个，其中模型类问题<span>34</span>个、 数据类问题
          <span>82</span>个、分析类问题<span>67</span>个。与上月同比上升<span>3%</span>，其中主要问题情况见下表。 全系统缺失计量点
          <span>650</span>个，其中已虚拟<span>343</span>个；采集数据错误导致人为修复累计发生<span>485</span>次
        </p>
        <cftOne></cftOne>
        <p class="fxshuom" style="border-top:1px solid #0d7474">
          受模型异常问题影响母平指标下降<span>3%</span>、分线线损指标下降<span>2%</span>、分压线损指标下降<span>5%</span>、 分区线损指标下降
          <span>9%</span>。<br> 受数据异常问题影响母平指标下降

          <span>5%</span>、分线线损指标下降<span>1%</span>、分压线损指标下降<span>10%</span>、 分区线损指标下降
          <span>6%</span>。<br> 受分析异常问题影响母平指标下降

          <span>0%</span>、分线线损指标下降<span>1%</span>、分压线损指标下降<span>2%</span>、 分区线损指标下降
          <span>1%</span>。
        </p>

        <cftTwo></cftTwo>

        <!--指标分类对比雷达-->
        <cfeOne></cfeOne>

        <p class="fxshuom" style="border-top:1px solid #0d7474; margin-top:10px;">
          <span>xxx</span>地区主要问题集中在数据一致性问题上。建议检查EMS与TMR模型<span>匹配度</span>、 用电大用户关口与TMR
          <span>模型关联</span>、10kV线路的<span>分线配置</span>。
        </p>
        <!--异常散点图-->
        <cfeTwo></cfeTwo>
        
        
      </div>
</template>

<script>
import cftOne from'./part/tableOne';
import cftTwo from'./part/tableTwo';
import cfeOne from'./part/echartOne';
import cfeTwo from'./part/echartTwo';
import BScroll from "better-scroll";
export default {
  name: "flhz",
  data() {
    return {
    
    };
  },
  created() {
    this.getData();
  },
   mounted: function() {
        this.$nextTick(() => {
            let scroll2 = new BScroll('.scroll2', {scrollbar:{fade: true,interactive: true} ,mouseWheel: true});
        });
    },
  methods: {
    getData() {}
  },
  components:{
      cftOne,
      cftTwo,
      cfeOne,
      cfeTwo
  }
};
</script>

<style>
.all_width { width:98%; font-size:13px; text-shadow:0 1px 1px rgba(0,0,0,.8); padding:4px 1%;}

.all_width table tr td { ont-size:13px; }
.fxshuom { float:left; width:100%; font-size:14px; line-height:2em; padding:10px 0; color:#84f1f1; text-indent:2em;}
.fxshuom span { color:#dd6b66; padding:0 5px; border-bottom:1px solid #dd6b66;}
.cxgdbox { float:left; width:100%; height:570px;}


.fxtb_box { float:left; width:500px; height:246px;}
.fxtb_box table { margin-bottom:0}
.fxsd_box {float:right; width:858px; height:244px; border:1px solid #0d7474}
@media (max-width:1399px){
	.fxsd_box { width:658px;}
}

.fxbg_sd { float:left;  width:1368px; height:281px;  border:1px solid #035252 }
@media (max-width:1399px){
	.fxbg_sd { width:1170px;}
}




</style>
