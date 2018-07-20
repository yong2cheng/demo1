<template>
  <div style="padding:20px 10px;" class="mxdz gather_cover">
      <table class="table">
          <thead>
            <tr>
              <td class="t_Bullet" colspan="9">
                <h2 style="float:none;display:inline-block;font-size:16px;">EMS模型关联</h2>  <button class="t_right" @click="downloadEMS()">下载</button>
              </td>
            </tr>
              <tr>
                  <td>地区</td>
                  <td>厂站</td>
                  <td>电压等级</td>
                  <td>主变</td>
                  <td>线路</td>
                  <td>开关</td>
                  <td>电量</td>
                  <td>机组</td>
                  <td>负荷</td>
              </tr>
          </thead>
      </table>
      <div>
          <table class="table">
              <tbody>
                  <tr :key="index" v-for="(item,index) in tbodys">
                      <td @click="getgl(itemd,indexd)" :class="{isRed:itemd.isClick}" :key="indexd" v-for="(itemd,indexd) in item">{{itemd.name}}</td>
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
import $areaId from "@/assets/config/areaMap";
import BScroll from "better-scroll";
import qs from "qs";
export default {
  data: function() {
    return {
      tbodys: [],
      tbody: [
        { name: "", systemId: "" },
        { name: "" },
        { name: "" },
        { name: "" },
        { name: "" },
        { name: "" },
        { name: "" },
        { name: "" },
        { name: "" }
      ],
      systemId: "",
      name: "",
      tmrname: "",
      emsname: "",
      yglname: "",
      isLoading: true,
      cindex: 0
    };
  },

  mounted: function() {
    this.isLoading = true;
    if (
      sessionStorage.getItem("systemId") === null ||
      sessionStorage.getItem("systemId") == "undefined" ||
      sessionStorage.getItem("systemId") == 15
    ) {
      var query = "&month=" + this.$day().format("YYYY-MM");
    } else {
      var query =
        "&month=" +
        this.$day().format("YYYY-MM") +
        "&systemId=" +
        sessionStorage.getItem("systemId");
    }
    this.$http
      .get(
        "/quotaService/quota/getEMSModelRelation?sign=" +
          sessionStorage.getItem("accessToken") +
          query
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
        var data = res.data.data.eMSModelRelationVO;
        for (var a of data) {
          this.tbodys.push([
            {
              name: a.pathName,
              systemId: a.systemId,
              isClick: true
            },
            {
              name: a.sbRelationCount + "/" + a.sbAllCount
            },
            {
              name: a.vlRelationCount + "/" + a.vlAllCount
            },
            {
              name: a.psRelationCount + "/" + a.psAllCount
            },
            {
              name: a.asgRelationCount + "/" + a.asgAllCount
            },
            {
              name: a.brelationCount + "/" + a.ballCount
            },
            {
              name: a.csRelationCount + "/" + a.csAllCount
            },
            {
              name: a.guRelationCount + "/" + a.guAllCount
            },
            {
              name: a.ecRelationCount + "/" + a.ecAllCount
            }
          ]);
        }
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
    downloadEMS() {
      if (
        sessionStorage.getItem("systemId") === null ||
        sessionStorage.getItem("systemId") == "undefined" ||
        sessionStorage.getItem("systemId") == 15
      ) {
        var query = "&month=" + this.$day().format("YYYY-MM");
      } else {
        var query =
          "&month=" +
          this.$day().format("YYYY-MM") +
          "&systemId=" +
          sessionStorage.getItem("systemId");
      }
      this.$http
        .get(
          "/quotaService/quota/outEMSModelRelation?sign=" +
            sessionStorage.getItem("accessToken") +
            query
        )
        .then(res => {
          window.location = res.request.responseURL;
        });
    },
    handleLoad(num, count) {
      if (num == count) {
        this.isLoading = false;
      }
    },
    getgl(item, index) {
      if (item.isClick) {
         console.log(item)
         this.$router.push({ path: '/mxphpzl/emsrelation', query: { areaId: item.systemId,sysId:this.$route.query.sysId,sonid:this.$route.query.sonid}})
        }
        this.tbody = this.tbodys[index];
      }
    },
};
</script>
<style>
.mxdz .isRed {
  color: #f6726c !important;
  cursor: pointer;
}
.mxdz .yel > li {
  padding-left: 20px;
  margin-bottom: 10px;
}
.mxdz .yel > li::before {
  content: "";
  width: 16px;
  height: 16px;
  display: inline-block;
  background: url("../../../assets/img/st_folder_open.gif") no-repeat;
}
.mxdz .yel ul li {
  font-size: 13px;
  padding-left: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  color: #84f1f1;
}
.mxdz .yel ul li:hover {
  color: #fff;
}
.mxdz .yel ul li::before {
  content: "";
  width: 16px;
  height: 16px;
  vertical-align: top;
  display: inline-block;
  background: url("../../../assets/img/st_node.gif") no-repeat;
}
.mxdz .li_checked {
  background: #315763;
  color: #fff;
}
</style>
