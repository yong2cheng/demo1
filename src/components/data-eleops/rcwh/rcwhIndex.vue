<template>
  <div class="main">
    <div class="rcwh_main">
      <div class="rcwh_left">
        <div class="grid_left">
          <h3 class="rcwh_title">湖北地区</h3>
          <div id="chart_main"></div>
          <div class="task_main">
            <ul class="fljc_box">
              <li>
                <h3 class="fl_xx_title">数据采集</h3>
                <span v-for ="(i,index) in 21" :key="index" :class="{on:i<5}"></span>
              </li>
              <li>
                <h3 class="fl_xx_title">未确认配置</h3>
                <span v-for ="(i,index) in 31" :key="index" :class="{on:i<2}"></span>
              </li>
              <li>
                <h3 class="fl_xx_title">计算失败</h3>
                <span v-for ="(i,index) in 11" :key="index" :class="{on:i<7}"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="grid_right">
          <h3 class="fl_xx_title">未确认配置</h3>
          <div class="uncomfirmed">
            <ul class="juti_peizhi"> 
              <li v-for="(i,index) in 10" :key="index">
                <div class="tubiaobox"></div>
                <div class="r_qx_nr">
                  <h4>配置事项标题{{i}}</h4>
                  <p>配置事项内容说明文字{{i}}</p>
                  <div class="juti_butt"><a class="fancybox fancybox.iframe">了解详情</a></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="rcwh_right">
        <tool/>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import overlay from "@/components/common/overlay";
import tool from './parts/tool'
export default {
  data() {
    return {};
  },
  components: {
    tool
  },
  methods: {
    chart() {
      var chart = echarts.init(document.getElementById("chart_main"), "dark");
      var options = {
        title: {
          text: 0.91 * 100 + "%",
          subtext: "完整率",
          x: "center",
          y: "32%",
          textStyle: {
            color: "#84f1f1",
            fontSize: 48,
            fontFamily: "Georgia"
          },
          subtextStyle: {
            color: "#f6726c",
            fontSize: 29
          }
        },
        animation: false,
        series: [
          {
            name: "完整率",
            type: "pie",
            radius: ["70%", "90%"],
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 0.91,
                itemStyle: {
                  normal: {
                    color: "#84f1f1",
                    shadowBlur: 10,
                    shadowColor: "#000"
                  }
                }
              },
              {
                value: 1 - 0.91,
                itemStyle: {
                  normal: {
                    color: "#666"
                  }
                }
              }
            ]
          }
        ]
      };
      chart.setOption(options);
    }
  },
  mounted() {
    this.chart();
    this.$nextTick(() => {
      let uncomfirmed = new BScroll('.uncomfirmed', {
      scrollbar:{
        fade:false,
      },
        mouseWheel: true
      })
    })
  },
};
</script>

<style lang="css">
.rcwh_main {
  width: 100%;
  display: flex;
  min-height: 540px;
}
.rcwh_left {
  flex: 1;
  background: #043434;
  border: 1px solid #0d7474;
  margin-right: 18px;
  display: flex;
  /* box-sizing: border-box; */
  padding: 12px;
}
.rcwh_right {
  width: 100px;
  background: #043434;
  border: 1px solid #0d7474;
}
.grid_left,
.grid_right {
  position: relative;
  flex: 1;
}
#chart_main {
  height: 280px;
  width: 100%;
}
.rcwh_title {
  text-align: center;
  line-height: 30px;
  font-weight: 400;
}
.task_main {
  padding: 4px 16px;
}
.fl_xx_title {
  width: 100%;
  height: 32px;
  line-height: 32px;
  font-size: 18px;
  font-weight: normal;
  color: #84f1f1;
  position: relative;
  letter-spacing: 2px;
  border-bottom: 1px solid #0d7474;
  margin-bottom: 5px;
}
.fljc_box li {
  margin-bottom: 12px;
}
.fljc_box li .fl_xx_title:before {
  width: 8px;
  height: 8px;
  content: "";
  position: absolute;
  left: -15px;
  top: 12px;
  background: #84f1f1;
  border-radius: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.8);
}
.fljc_box li span {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #666;
  margin-right: 5px;
  margin-top: 5px;
  cursor: pointer;
}
.fljc_box li span.on {
  background: #84f1f1;
}
.uncomfirmed {
  max-height: 620px;
  overflow: hidden;
}
.juti_peizhi li {
  box-sizing: border-box;
  padding: 20px;
  display: flex;
}
.juti_peizhi li .tubiaobox {
  width: 80px;
  height: 80px;
  background: #0d7474;
}
.juti_peizhi li .r_qx_nr {
  flex: 1;
  margin-left: 28px;
}
.juti_peizhi li .r_qx_nr h4 {
  float: left;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #f6726c;
  font-size: 16px;
  font-weight: normal;
}
.juti_peizhi li .r_qx_nr p {
  float: left;
  width: 78%;
  line-height: 22px;
  color: #23adad;
}
.juti_peizhi li .r_qx_nr .juti_butt {
  float: right;
  width: 78px;
  height: 22px;
  line-height: 22px;
  border: 1px solid #23adad;
  border-radius: 12px;
  background: #043434;
  color: #23adad;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
}
</style>
