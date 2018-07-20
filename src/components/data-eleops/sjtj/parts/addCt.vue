<template>
  <div class="main">
    <span class="bread_nav" >
      <router-link :to="{path:'/dlywkhd/sjtj',query:{sysId:$route.query.sysId,sonid:$route.query.sonid}}">事件提交</router-link>
      ></span>
    <span class="bread_nav" @click="goback(-1)">表计倍率更换事件></span>
    <span class="bread_nav"> 新增表计倍率更新事件</span>
    <div class="mxian_succ">
      <div class="event_table_main event_add_wrap">
          <p class="add_title">原电表信息：</p>
          <table class="table">
            <tbody>
              <tr>
                <td width="15%">数据平台ID:</td>
                <td>{{dataList.mrid}}</td>
                <td width="15%">电表名称:</td>
                <!-- <td>{{dataList.localName}}</td> -->
                <td>
                  <div class="search_input ct_search_input">
                    <input type="text" 
                      placeholder="请输入电表名称搜索"
                      class="txt" 
                      v-model="searchName"
                      @blur="isSearch=false">  
                    <button class="primary" @click="search();">搜索</button>
                    <div  class="search_list" v-show="isSearch">
                      <ul>
                        <li v-for="(item,index) in searchList" 
                          :key="index"
                           @click="getMeterBriefByName(item);isSearch=false;">
                          {{index + 1}}.{{item.localName}}
                        </li>
                        <el-pagination
                          v-show="searchList.length>0"
                          background
                          @current-change='changePage'
                          :current-page.sync="currentPage"
                          layout="prev, next"
                          :page-size="20"
                          :total="totalCount">
                        </el-pagination>
                      </ul>
                      <p style="line-height:30px;padding-left:10px;" v-show="searchList.length<=0">{{searchTips}}</p>
                    </div>          
                  </div>     
                </td>
              </tr>
              <tr>
                <td width="15%">电表精度:</td>
                <td>{{dataList.dataPrecision}}</td>
                <td width="15%">生效时间:</td>
                <td></td>
              </tr>
              <tr>
                <td width="15%">CT1/CT2:</td>
                <td>{{dataList.ct1}}/{{dataList.ct2}}</td>
                <td width="15%">PT1/PT2:</td>
                <td>{{dataList.pt1}}/{{dataList.pt2}}</td>
              </tr>
            </tbody>
          </table>
          <p class="add_title">更新信息：</p>
          <table class="table">
            <tbody>
              <tr>
                <td width="15%">数据平台ID:</td>
                <td>{{dataList.mrid}}</td>
                <td width="15%">电表名称:</td>
                <td>{{dataList.localName}}</td>
              </tr>
              <tr>
                <td width="15%">电表精度:</td>
                <td>{{dataList.dataPrecision}}</td>
                <td width="15%">生效时间:</td>
                <td>
                  <el-date-picker
                  v-model="upDateList.startTime" 
                  type="datetime" 
                   value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择时间">
                  </el-date-picker>
                </td>
              </tr>
              <tr>
                <td width="15%">CT1/CT2:</td>
                <td>
                  <input type="text" class="txt" v-model="upDateList.ct1"
                    @blur="validate(upDateList.ct1)">
                  /<input type="text" class="txt" v-model="upDateList.ct2" 
                    @blur="validate(upDateList.ct2)">
                </td>
                <td width="15%">PT1/PT2:</td>
                <td>
                  <input type="text" class="txt" v-model="upDateList.pt1"
                  @blur="validate(upDateList.pt1)">
                 /<input type="text" class="txt" v-model="upDateList.pt2"
                 @blur="validate(upDateList.pt2)">
                </td>
              </tr>
            </tbody>
          </table>
          <p class="add_title">更换前底码:</p>
           <table class="table">
             <thead>
               <tr>
                 <td>正向有功</td>
                 <td>正向无功</td>
                 <td>反向有功</td>
                 <td>反向无功</td>
               </tr>
             </thead>
            <tbody>
              <tr>
               <td>
                  <input type="text" class="txt" v-model="papObj.PAP_VIEW_BEFORE">              
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.PRP_VIEW_BEFORE">
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.RAP_VIEW_BEFORE">
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.RRP_VIEW_BEFORE">
                </td>
              </tr>
            </tbody>
          </table>
           <p class="add_title">更换后底码:</p>
           <table class="table">
             <thead>
               <tr>
                 <td>正向有功</td>
                 <td>正向无功</td>
                 <td>反向有功</td>
                 <td>反向无功</td>
               </tr>
             </thead>
            <tbody>
              <tr>
               <td>
                  <input type="text" class="txt" v-model="papObj.PAP_VIEW_AFTER">              
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.PRP_VIEW_AFTER">
                </td>
                <td>
                  <input type="text" class="txt"  v-model="papObj.RAP_VIEW_AFTER">
                </td>
                <td>
                  <input type="text" class="txt" v-model="papObj.RRP_VIEW_AFTER">
                </td>
              </tr>
            </tbody>
          </table>
      </div>
      <div class="tool_bar event_add_tool">
        <button class=" status_btn" @click="saveAdd()">保存</button>
        <button class=" warning status_btn" @click="clear()">清空</button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      isSearch: false,
      searchName: "",
      searchList: [], //搜索列表
      searchTips: "加载中...",
      dataList: {},
      upDateList: {},
      papObj: {},
      totalCount: null,
      currentPage: 1,
      flag: true
    };
  },
  methods: {
    search() {
      //搜索
      if (this.searchName) {
        this.isSearch = true;
        this.searchList = [];
        this.$http
          .get("/quotaService/quota/getMeter", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              name: this.trimFun(this.searchName),
              pageIndex: this.currentPage,
              pageSize: 20
            }
          })
          .then(res => {
            if (res.data.code === 1) {
              console.log(res);
              this.searchList = res.data.data.meters;
              this.totalCount = res.data.pojoTotalCount;
            } else {
              alert(res.data.msg);
            }
          });
      }
    },
    changePage() {
      this.search();
    },
    getMeterBriefByName(item) {
      //选中搜索结果
      this.dataList = item;
      this.searchName = item.localName;
    },
    saveAdd() {
      if (
        !this.upDateList.ct1 ||
        !this.upDateList.ct2 ||
        !this.upDateList.pt1 ||
        !this.upDateList.pt2
      ) {
        // alert("新增信息不完整！");
        this.$notify({
          title: "提示",
          message: "信息填写不完整",
          duration: 1500,
          type: "warning"
        });
      } else {
        if (this.flag) {
          this.flag = false;
          this.$http
            .post(
              "maintenanceService/eventChangedLogsService/postCtptChangeEvent?sign=" +
                sessionStorage.getItem("accessToken"),
              qs.stringify({
                mrid: this.dataList.mrid,
                occurTime: this.upDateList.startTime
                  ? this.upDateList.startTime
                  : this.$day().format("YYYY-MM-DD HH:mm:ss"),
                userId: sessionStorage.getItem("userId"),
                oldCt1: this.dataList.ct1,
                oldCt2: this.dataList.ct2,
                oldPt1: this.dataList.pt1,
                oldPt2: this.dataList.pt2,
                newCt1: this.upDateList.ct1,
                newCt2: this.upDateList.ct2,
                newPt1: this.upDateList.pt1,
                newPt2: this.upDateList.pt2,
                tariffValue: JSON.stringify(this.papObj) || JSON.stringify({})
              })
            )
            .then(res => {
              if (res.data.code === 1) {
                this.flag = true;
                this.$notify({
                  title: "提示",
                  message: "新增成功",
                  duration: 1500,
                  type: "success"
                });
              } else {
                this.flag = true;
                this.$notify({
                  title: "提示",
                  message: "新增异常",
                  duration: 1500,
                  type: "error"
                });
              }
            });
        }
      }
    },
    validate(val) {
      //表单验证
      let reg = new RegExp("^[0-9]+.{0,1}[0-9]{0,5}$");
      if (val && !reg.test(val)) {
        // alert("请输入正确的类型！");
        this.$notify({
          title: "提示",
          message: "请输入正确的类型！",
          duration: 1500,
          type: "warning"
        });
      }
    },
    clear() {
      //清除
      this.upDateList = {};
      this.dataList = {};
      this.papObj = {};
      this.searchName = "";
    },
    goback(num) {
      this.$router.go(num);
    },
    trimFun(x) {
      return x.replace(/^\s+|\s+$/gm, "");
    }
  },
  mounted() {
    this.$nextTick(() => {
      let search_list = new BScroll(".search_list", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
        preventDefault: false
      });
    });
  }
};
</script>

<style lang="css">
.event_add_tool {
  margin: 0 18px;
  box-sizing: border-box;
  padding: 0 3%;
  line-height: 60px;
  border-top: 1px dashed #0d7474;
  text-align: center;
  margin-bottom: 18px;
  border-bottom: 1px solid #0d7474;
}
.ct_search_input {
  display: inline-block;
  height: 30px;
  position: relative;
  /* margin-top: 20px; */
}
.search_input input {
  width: 200px;
}
.search_list {
  position: absolute;
  top: 111%;
  left: 0;
  width: 200px;
  min-height: 50px;
  max-height: 260px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.1);
  background: #012323;
  z-index: 1000;
}
.search_list li {
  box-sizing: border-box;
  margin: 0 6px;
  line-height: 30px;
  border-bottom: 1px solid #0d7474;
  cursor: pointer;
  color: #84f1f1;
  font-size: 12px;
}
.search_list li:hover {
  color: #fff;
}
.event_add_wrap {
  padding: 0 3%;
  margin-bottom: 16px;
  padding-bottom: 12px;
}
.add_title {
  margin-top: 20px;
  margin-bottom: 15px;
}
.bread_nav {
  font-size: 14px;
  cursor: pointer;
  color: #84f1f1;
}
.bread_nav a {
  color: #84f1f1;
}
</style>
