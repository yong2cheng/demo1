<template >
  <div class="middle">
    <div class="title_bar">
      <h4>
        业务信息
        <span class='devStatus'>(开发中...)</span>
      </h4>
    </div>
    <div class="work_wrap">
      <div class="table_info">
        <div class="sec_title_bar">
          <h5>指标跟踪</h5>
        </div>
        <table class="table">
          <thead>
            <tr>
              <td rowspan="2" width="20%">指标</td>
              <td colspan="2">750kV</td>
              <td colspan="2">330kV</td>
              <td colspan="2">110kV</td>
              <td colspan="2">35kV</td>
            </tr>
            <tr>
             <template v-for="n in 4" >
               <td>达标</td>
               <td>不达标</td>
            </template>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>母平</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>采集成功率</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>采集覆盖率</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table_info">
        <div class="sec_title_bar">
          <h5>设备列表</h5>
        </div>
        <table class="table">
          <tbody>
            <tr>
              <td>厂站</td>
              <td>{{substationSummary.totalCount}}</td>
              <td>本月新增</td>
              <td>{{substationSummary.newCount}}</td>
              <td>本月退役</td>
              <td>{{substationSummary.retireCount}}</td>
            </tr>
            <tr>
              <td>母线</td>
              <td>{{busbarSummary.totalCount}}</td>
              <td>本月新增</td>
              <td>{{busbarSummary.newCount}}</td>
              <td>本月退役</td>
              <td>{{busbarSummary.retireCount}}</td>
            </tr>
             <tr>
              <td>线路</td>
              <td>{{aclineSummary.totalCount}}</td>
              <td>本月新增</td>
              <td>{{aclineSummary.newCount}}</td>
              <td>本月退役</td>
              <td>{{aclineSummary.retireCount}}</td>
            </tr>
              <tr>
              <td>主变</td>
              <td>{{transformerSummary.totalCount}}</td>
              <td>本月新增</td>
              <td>{{transformerSummary.newCount}}</td>
              <td>本月退役</td>
              <td>{{transformerSummary.retireCount}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table_info">
        <div class="sec_title_bar">
          <h5>事件列表</h5>
        </div>
          <table class="table">
            <tbody>
              <tr >
                <td>电表轮换:</td>
                <td>{{tab3_length}}</td>
                <td>更换 CT/PT:</td>
                <td>{{tab3_length1}}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
               <tr >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "work",
  data() {
    return {
      tab1: [],
      tab2: [],
      tab3_length: "",
      tab3_length1: "",
      aclineSummary: "",
      busbarSummary: "",
      meterSummary: "",
      substationSummary: "",
      transformerSummary: ""
    };
  },
  methods: {
    getTab1() {},
    getTab2() {
      this.$http
        .get("/quotaService/quota/getInUseAndRetireList", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            month: this.$day().format("YYYY-MM")
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.$emit("status",true)
            this.aclineSummary = res.data.data.aclineSummary;
            this.busbarSummary = res.data.data.busbarSummary;
            this.meterSummary = res.data.data.meterSummary;
            this.substationSummary = res.data.data.substationSummary;
            this.transformerSummary = res.data.data.transformerSummary;
          }
        });
    },
    getTab3() {
      this.$http
        .get("/quotaService/quota/getMeterChangedLog", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            month: this.$day().format("YYYY-MM")
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.$emit("status",true)
            this.tab3_length = res.data.data.meterChangedLogsVO.length;
          }
        });
      this.$http
        .get("/quotaService/quota/getCtptChangedLog", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            month: this.$day().format("YYYY-MM")
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.$emit("status",true)
            this.tab3_length1 = res.data.data.ctPtChangedLogs.length;
          }
        });
    }
  },
  created() {
    this.getTab3();
    this.getTab2();
    this.tab2 = [
      {
        type: "厂站",
        increased: "2880",
        new: "22",
        retire: "34"
      },
      {
        type: "线路",
        increased: "2880",
        new: "22",
        retire: "34"
      },
      {
        type: "主变",
        increased: "2880",
        new: "22",
        retire: "34"
      },
      {
        type: "计量点",
        increased: "2880",
        new: "22",
        retire: "34"
      }
    ];
  }
};
</script>

<style lang="css">
.middle {
  border: 1px solid #0d7474;
  background: #043434;
}
.work_wrap {
  padding: 0 2%;
  padding-bottom: 10px;
}
.sec_title_bar {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: #035252;
  font-size: 16px;
  color: #84f1f1;
  text-indent: 10px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  font-weight: normal;
  box-sizing: border-box;
  border: 1px solid #0d7474;
  border-bottom: none;
}
.table_info {
  margin-top: 26px;
}
.table_info table td {
  font-size: 12px;
  padding: 0;
  text-align: center;
}
</style>
