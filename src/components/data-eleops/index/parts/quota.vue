<template>
  <div class="mxwh_left left1">
    <div class="title_bar">
      <h4>考核指标
        <span class='devStatus'>(开发中...)</span>
      </h4>
      <a href="#" target="_blank">+详情</a>
    </div>
    <div class="rank_wrap">
      <div class="area_total">
        <p>{{areaName}}地区综合评分</p>
        <strong>{{scores}}</strong>
        <p class="area_total_p">当前排名</p>
        <span>{{ranks}}</span>
      </div>
      <div class="quota_box_wrap">
        <ul class="quota_box">
        <li v-for="(item,index) in rankArrs" :key="index">
          <div class="khblock green">
            <i class="tzjl">{{item.voltageLevelStandardTotal}}</i>
            <i>不达标率{{item.voltageLevelStandard}}项</i>
          </div>
          <h3>{{mapBvid(item.bvId)}}母平</h3>
        </li>     
        </ul>
      </div>   
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import bvids from "@/assets/config/bvidMap";
import $areaId from "@/assets/config/areaMap";
export default {
  name: "quota",
  data() {
    return {
      areaName: "",   
    };
  },
  props:['rankArrs','ranks','scores'],
  created() {
    // this.getRankData();
    var id = sessionStorage.getItem("systemId")
      ? sessionStorage.getItem("systemId")
      : "0";
    $areaId.forEach(item => {
      if (item.areaId == id) {
        this.areaName = item.areaName;
      }
    });
  },
  methods: {
    mapBvid(id) {
      //匹配电压等级
      var vol = "";
      bvids.forEach(item => {
        if (item.bvId == id) {
          vol = item.dydj + "kV";
        }
      });
      return vol;
    }
  },
  mounted() {
    this.$nextTick(() => {
      let quota_box_wrap = new BScroll(".quota_box_wrap", {
       scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
        preventDefault:false
      });
    });
  },
};
</script>

<style lang="css">
.mxwh_left {
  border: 1px solid #0d7474;
  background: #043434;
}
.title_bar {
  display: flex;
  background: #024243;
  padding: 0 10px;
  height: 34px;
  border-bottom: 1px solid #035e5f;
  color: #84f1f1;
  font-size: 16px;
  line-height: 32px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  justify-content: space-between;
}
.title_bar a {
  font-size: 14px;
  color: #2dafaf;
}
.rank_wrap {
  padding: 15px;
  text-align: center;
  overflow: hidden;
}
.area_total {
  float: left;
  width: 100px;
  height: 225px;
  background: #24a5cd;
  border-radius: 5px;
}
.quota_box_wrap{
   height: 225px;
   overflow: hidden;
   position: relative;
}
.quota_box {
  padding-left: 10px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  align-items: stretch;
 
}
.quota_box li {
  width: 100px;
  height: 110px;
  /* background: #63be54; */
  border-radius: 5px;
  margin-left: 20px;
}
.quota_box li .green {
  background: #63be54;
}
.quota_box li .khblock {
  height: 80px;
  border-radius: 5px;
  font-size: 15px;
  border: 1px solid transparent;
}
.quota_box li .khblock i {
  font-style: normal;
  display: block;
  text-align: center;
}
.quota_box li .khblock i.tzjl {
  margin-top: 15px;
}
.quota_box li h3 {
  width: 100%;
  height: 30px;
  line-height: 28px;
  font-size: 14px;
  text-align: center;
  font-weight: normal;
  color: #84f1f1;
  position: relative;
  top: 3px;
}
.area_total p {
  margin: 0 auto;
  text-align: center;
  width: 72px;
  line-height: 24px;
  padding-top: 15px;
}
.area_total .area_total_p {
  padding-top: 40px;
}
.area_total strong {
  font-size: 26px;
  height: 30px;
  line-height: 30px;
  font-weight: normal;
  text-align: center;
  display: block;
  font-family: Georgia;
}
.area_total strong:after {
  content: "分";
  font-size: 16px;
  font-family: "微软雅黑";
  position: relative;
  left: 2px;
  top: -2px;
}
.area_total span {
  font-size: 26px;
  height: 30px;
  line-height: 30px;
  font-weight: normal;
  text-align: center;
  display: block;
  font-family: Georgia;
}
.area_total span:before {
  content: "第";
  font-size: 16px;
  font-family: "微软雅黑";
  position: relative;
  left: -2px;
  top: -2px;
}
.area_total span:after {
  content: "名";
  font-size: 16px;
  font-family: "微软雅黑";
  position: relative;
  left: 2px;
  top: -2px;
}

@media (max-width: 1399px) {
  .quota_box li {
    width: 92px;
    margin-left: 10px;
  }
  .area_total {
    width: 92px !important;
  }
}
</style>
