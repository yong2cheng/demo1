<template lang="html">
  <div class="mxwh_left left2">
    <div class="title_bar">
      <h4>
        考核排名
        <span class='devStatus'>(开发中...)</span>
      </h4>
      <a href="#" target="_blank">+详情</a>
    </div>
    <div id="ranks">

    </div>
  </div>
</template>

<script>
import area from "@/assets/config/areaMap";
export default {
  name: "rank",
  data() {
    return {
      rankData:this.datas,
      areaMap: [],
      scroeArr: []
    };
  },
  props: ["datas"],
  methods: {
    getRankData() {
      this.scroeArr = [];
      this.areaMap = [];
      this.rankData.forEach(item => {
        this.scroeArr.push(item.score);
        area.forEach(it => {
          if (item.systemId == it.areaId) {
            this.areaMap.push(it.areaName);
          }
        });
      });
      // console.log(this.scroeArr);
      // console.log(this.areaMap);
      this.chart();
    },
    chart() {
      var ranks = echarts.init(document.getElementById("ranks"), "dark");
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["分值", "达标"],
          top: "10"
        },
        toolbox: {
          show: true,
          orient: "vertical",
          right: "15",
          y: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: [/*'line', 'bar' */ "stack", "tiled"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          top: "50",
          left: "5%",
          right: "10%",
          bottom: "2%",
          containLabel: true
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            // data: ["武汉", "荆州", "襄阳", "宜昌", "孝感", "荆门", "黄冈"]
            data: this.areaMap
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "分值",
            type: "bar",
            data: this.scroeArr
          },
          // {
          //   name: "达标",
          //   type: "bar",
          //   data: this.scroeArr
          // }
        ]
      };
      ranks.setOption(option);
    }
  },
 watch:{
   rankData: {
      handler: function (val, oldVal) { 
         this.getRankData();
       },
      deep: true
    },
 },
};
</script>

<style lang="css">
.left2 {
  margin-top: 20px;
}
#ranks {
  height: 254px;
}
.devStatus{
  font-size: 12px;
  font-weight: 100;
}
</style>
