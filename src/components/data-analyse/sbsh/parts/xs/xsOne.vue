<template>
    <div class="one_main xsOne">
      <chart-cl class="xs_charts"><!--潮流图 --></chart-cl>
        <div class="xs_tool">
            <ul class="tool_sh">
                <li @click="toPeizhi()">
                    <span>
                        <i class="icon-peizhi"></i>
                        配置
                    </span>
                </li>
                <li>
                    <span>
                        <i class="icon-qingdan"></i>
                        清单
                    </span>
                </li>
                <li>
                    <span>
                        <i class="icon-biaoge"></i>
                        表格
                    </span>
                </li>
                <li>
                    <span>
                        <i class="icon-pokou"></i>
                        破口
                    </span>
                </li>
                <li>
                    <span>
                        <i class="icon-duiying"></i>
                        对应
                    </span>
                </li>
            </ul>
        </div>
        <div class="xs_table">
            <table class="table">
                <thead>
                    <tr>
                        <td colspan="4">总汇</td>
                    </tr>
                    <tr>
                        <td>母线</td>
                        <td>总数</td>
                        <td>本月新增</td>
                        <td>退役</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in datalist" :key="index">
                        <td>{{item}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
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
import chartCl from './chartCl.vue'
import Bus from "@/assets/eventBus.js";
export default {
    data:function(){
        return{
            isLoading:false,
      token: sessionStorage.getItem("accessToken"),
      datalist: ["550kV", "220kV", "110kV", "35kV"],
        }
    },
    components:{
        chartCl
    },
    methods:{
        toPeizhi(){
            Bus.$emit("toPeizhi",true);
        }
    }
}
</script>
<style>
.one_main{
    position:relative;
}
.one_main .xs_charts {
  height: 616px;
  width: 100%;
  margin:0 auto;
}
.one_main .xs_tool {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 60px;
  background: #0b6d6d;
  padding: 0;
}
.one_main .xs_tool li {
  padding-bottom: 5px;
}
.one_main .xs_tool li:hover {
  background: #009f95;
  cursor: pointer;
}
.one_main .tool_sh li {
  margin-top: 10px;
}
.one_main .tool_sh li span {
  display: block;
  height: 50px;
  padding-top: 8px;
  color: #84f1f1;
  font-size: 14px;
  transition: all 500ms;
  text-align: center;
}
.one_main .tool_sh li span i {
  display: block;
  line-height: 30px;
  font-size: 28px;
  overflow: hidden;
}
.one_main .xs_table {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
