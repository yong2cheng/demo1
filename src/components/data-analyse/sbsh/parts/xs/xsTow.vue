<template>
    <div class="two_main">
        <table class="table">
            <thead>
                <tr>
                    <td rowspan="2">线路名</td>
                    <td rowspan="2">电压等级</td>
                    <td colspan="4">关口侧</td>
                    <td rowspan="2">线损</td>
                    <td colspan="4">平衡侧</td>
                    <td rowspan="2">线损率</td>
                </tr>
                <tr>
                   <td>正向有功</td> 
                   <td>反向有功</td>
                   <td>线损	</td>
                   <td>线损率%</td>
                   <td>正向有功</td> 
                   <td>反向有功</td>
                   <td>线损	</td>
                   <td>d线损率%</td>
                </tr>
            </thead>
        </table>
        <div class="xsTwoScroll">
            <table class="table">
                <tbody>
                    <tr>
                        <td colspan="8">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
    data:function(){
        return{
            scroll:''
        }
    },
  mounted() {
      if(this.scroll){
          this.scroll.destroy();
      }
    this.$nextTick(() => {
      this.scroll = new BScroll(".xsTwoScroll", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        preventDefault:false,
        mouseWheel: true
      });
    });
  }
};
</script>
<style>
.two_main .xsTwoScroll {
  height: 520px;
  overflow: hidden;
  position: relative;
}
</style>


