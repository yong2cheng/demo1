<template>
  <div style="padding:20px 10px 0 10px;" class="box4 gather_cover">
            <table class="table">
                <thead>
                    <tr>
                        <td colspan="21">
                            <span style="font-size:16px;">各地区母线平衡明细</span>
                            <button style="float:right;" @click="downloadBS()" class="btn">下载</button>
                        </td>
                    </tr>
                    <tr>
                        <td rowspan="2">单位</td>
                        <td colspan="4">500kV</td>
                        <td colspan="4">220kV</td>
                        <td colspan="4">110kV</td>
                        <td colspan="4">35kV</td>
                        <td colspan="4">10kV</td>
                    </tr>
                    <tr>
                        <td>总条数</td>
                        <td>已配置</td>
                        <td>需报备</td>
                        <td>配置率(%)</td>
                        <td>总条数</td>
                        <td>已配置</td>
                        <td>需报备</td>
                        <td>配置率(%)</td>
                        <td>总条数</td>
                        <td>已配置</td>
                        <td>需报备</td>
                        <td>配置率(%)</td>
                        <td>总条数</td>
                        <td>已配置</td>
                        <td>需报备</td>
                        <td>配置率(%)</td>
                        <td>总条数</td>
                        <td>已配置</td>
                        <td>需报备</td>
                        <td>配置率(%)</td>
                    </tr>
                    <tr>
                        <td :key="index" v-for="(item,index) in theads3">{{item}}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="indexd" v-for="(item,indexd) in tbodys3">
                            <td @click="toone(child.clickable,child.areaId,child.bvId)" :class="{clickable:child.clickable}" :key="indexm" v-for="(child,indexm) in item">{{child.name}}</td>
                        </tr>
                </tbody>
            </table>
            <div class="m_icons">
              <ul>
                <li>
                  <span class="icon-mxdz" @click="tomxdz()"></span> 
                  <p>模型对照</p>
                </li>
                <li>
                  <span class="icon-mppz"></span> 
                  <p>母平配置</p>
                </li>
                <li>
                  <span class="icon-dlcx"></span> 
                  <p>电量查询</p>
                </li>
                <li>
                  <span class="icon-txgj"></span> 
                  <p>图形工具</p>
                </li>
                <li>
                  <span class="icon-baobiao"></span> 
                  <p>报表</p>
                </li>
                <li>
                  <span class="icon-jia"></span> 
                  <p>添加功能</p>
                </li>
              </ul>
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
import $areaId from "../../../assets/config/areaMap";
export default {
  data: function() {
    return {
      theads3: [],
      tbodys3: [],
      dayDate: this.$day().format("YYYY-MM"),
      isLoading: true
    };
  },
  mounted() {
    this.isLoading = true;
    //   加载平衡条数/总数和加载母线平衡率详细
    this.$http
      .get(
        "/quotaService/quota/getBusbarSummary?appkey=3917230828&sign=" +
          sessionStorage.getItem("accessToken") +
          "&month=" +
          this.dayDate
      )
      .then(res => {
        if (res.data.code == 0) {
          this.isLoading = false;
        //   this.$notify.error({
        //   title: '错误',
        //   message: "系统错误（code==0）"
        // });
          return;
        }
        this.isLoading = false;
        console.log(res);
        var data = res.data.data.voltageBusbarSummaries;
        var data2 = res.data.data.busbarSummaries;
        this.theads3 = ["合计"];

        var diyaarr = [6, 10, 12, 14, 18];
        for (var b of diyaarr) {
          var has = false;
          for (var i = 0; i < data.length; i++) {
            var a = data[i];
            if (a.bvId == b) {
              has = true;
              this.theads3.push(a.count);
              this.theads3.push(a.configCount);
              this.theads3.push("");
              if(a.count==0||a.count==null){
                var bgb=0;
              }else{
                var bfb = parseFloat((a.configCount / a.count * 100).toFixed(2));
              }
              this.theads3.push(bfb);
            }
          }
          if (i == data.length && has == false) {
            this.theads3.push("-");
            this.theads3.push("-");
            this.theads3.push("-");
            this.theads3.push("-");
          }
        }
        if (sessionStorage.getItem("systemId") != undefined) {
          for (var a of $areaId) {
            if (sessionStorage.getItem("systemId") == a.areaId) {
              var areaIdarr = [a];
            }
          }
        } else {
          var areaIdarr = $areaId;
        }
        for (var a of areaIdarr) {
          this.tbodys3.push([
            {
              name: a.areaName,
              clickable: true,
              areaId: a.areaId
            }
          ]);
          var arr = [[], [], [], [], []];
          for (var b of data2) {
            if (a.areaId == b.areaId) {
              //500kV
                arr[0].push({
                  name: b.total500,
                  clickable: true&&b.total500!=0,
                  diya: "500kV",
                  newCount: b.newCount500,
                  retireCount: b.retireCount500,
                  areaId: a.areaId,
                  type: 1,
                  areaName: a.areaName,
                  bvId: 6
                });
                arr[0].push({
                  name: b.configCount500,
                  bvId: 6,
                  type: 3,
                  areaId: a.areaId,
                  areaName: a.areaName
                });
                arr[0].push({ name: "" });
                if(b.total500==0||b.total500==null){
                  var bfb=0;
                }else{
                  var bfb = parseFloat((b.configCount500 / b.total500 * 100).toFixed(2));
                }
                arr[0].push({ name: bfb, clickable: false });
              
              //220kV
                arr[1].push({
                  name: b.total220,
                  clickable: true&&b.total220!=0,
                  diya: "220kV",
                  newCount: b.newCount220,
                  retireCount: b.retireCount220,
                  areaId: a.areaId,
                  type: 1,
                  areaName: a.areaName,
                  bvId: 10
                });
                arr[1].push({
                  name: b.configCount220,
                  bvId: 10,
                  type: 3,
                  areaId: a.areaId,
                  areaName: a.areaName
                });
                arr[1].push({ name:"" });
                if(b.total220==0||b.total220==null){
                  var bfb=0;
                }else{
                  var bfb = parseFloat((b.configCount220 / b.total220 * 100).toFixed(2));
                }
                arr[1].push({ name: bfb, clickable: false });
              //110kV
              
                arr[2].push({
                  name: b.total110,
                  clickable: true&&b.total110!=0,
                  diya: "110kV",
                  newCount: b.newCount110,
                  retireCount: b.retireCount110,
                  areaId: a.areaId,
                  type: 1,
                  areaName: a.areaName,
                  bvId: 12
                });
                arr[2].push({
                  name: b.configCount110,
                  bvId: 12,
                  type: 3,
                  areaId: a.areaId,
                  areaName: a.areaName
                });
                arr[2].push({ name: "" });
                if(b.total110==0||b.total110==null){
                  var bfb=0;
                }else{
                  var bfb = parseFloat((b.configCount110 / b.total110 * 100).toFixed(2));
                }
                arr[2].push({ name: bfb, clickable: false });
              //35kV
              
                arr[3].push({
                  name: b.total35,
                  clickable: true&&b.total35!=0,
                  diya: "35kV",
                  newCount: b.newCount35,
                  retireCount: b.retireCount35,
                  areaId: a.areaId,
                  type: 1,
                  areaName: a.areaName,
                  bvId: 14
                });
                arr[3].push({
                  name: b.configCount35,
                  bvId: 14,
                  type: 3,
                  areaId: a.areaId,
                  areaName: a.areaName
                });
                arr[3].push({ name: "" });
                if(b.total35==0||b.total35==null){
                  var bfb=0;
                }else{
                  var bfb = parseFloat((b.configCount35 / b.total35 * 100).toFixed(2));
                }
                arr[3].push({ name: bfb, clickable: false });
              //10kV
              
                arr[4].push({
                  name: b.total10,
                  clickable: true&&b.total10!=0,
                  diya: "10kV",
                  newCount: b.newCount10,
                  retireCount: b.retireCount10,
                  areaId: a.areaId,
                  type: 1,
                  areaName: a.areaName,
                  bvId: 18
                });
                arr[4].push({
                  name: b.configCount10,
                  bvId: 18,
                  type: 3,
                  areaId: a.areaId,
                  areaName: a.areaName
                });
                arr[4].push({ name: "" });
                if(b.total10==0||b.total10==null){
                  var bfb=0;
                }else{
                  var bfb = parseFloat((b.configCount10 / b.total10 * 100).toFixed(2));
                }
                arr[4].push({ name: bfb, clickable: false });
              
            }
          }
          for (var c in arr) {
            if (arr[c].length > 0) {
              for (var d of arr[c]) {
                this.tbodys3[this.tbodys3.length - 1].push(d);
              }
            } else {
              if (c == 0) {
                var diya = "500kV";
              }
              if (c == 1) {
                var diya = "220kV";
              }
              if (c == 2) {
                var diya = "110kV";
              }
              if (c == 3) {
                var diya = "35kV";
              }
              if (c == 4) {
                var diya = "10kV";
              }
              this.tbodys3[this.tbodys3.length - 1].push({
                name: "",
                diya: diya,
                newCount: "",
                retireCount: ""
              });
              this.tbodys3[this.tbodys3.length - 1].push({ name: "" });
              this.tbodys3[this.tbodys3.length - 1].push({ name: "" });
              this.tbodys3[this.tbodys3.length - 1].push({ name: "" });
            }
          }
        }

        console.log(this.tbodys3);
      })
      .catch(error => {
        this.isLoading = false;
        // this.$notify.error({
        //   title: '错误',
        //   message:"系统错误（error）"
        // });
      });
  },
  methods: {
    toone(clickable, areaId, bvId) {
      if (clickable) {
        var { href } = this.$router.resolve({
          name: "/mxphpzl/one",
          path: "/mxphpzl/one",
          query: {
            sysId: this.$route.query.sysId,
            sonid: this.$route.query.sonid,
            areaId: areaId,
            bvId: bvId
          }
        });
        window.open(href, "_blank");
      }
    },
    tomxdz() {
      var { href } = this.$router.resolve({
        name: "/mxphpzl/mxdz",
        path: "/mxphpzl/mxdz",
        query: {
          sysId: this.$route.query.sysId,
          sonid: this.$route.query.sonid
        }
      });
      window.open(href, "_blank");
    },
    downloadBS(){
      this.$http
        .get(
          "/quotaService/quota/outBusbarSummary?appkey=3917230828&sign=" +
            sessionStorage.getItem("accessToken") +
            "&type=2&month=" +
            this.dayDate
        )
        .then(res=>{
          window.location =res.request.responseURL;
        })
    }
  }
};
</script>
<style>
.clickable {
  color: #f6726c !important;
  cursor: pointer !important;
}
.m_icons li span{
  font-size:30px;
  float: left;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align:center;
}
.m_icons li p{
  font-size:14px;
}
.m_icons li{
  width:80px;
  height:66px;
  text-align:center;
  color:#84f1f1;
  float:left;
  cursor:pointer;
  margin:20px 10px 0 10px;
}
.m_icons li:hover{
  background: #14514E;
}

</style>
