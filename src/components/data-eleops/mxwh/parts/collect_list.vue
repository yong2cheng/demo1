<template>
<div class="collect_list_wrap">
  <div class="search_zone">
    <button class="warning" @click="backCollect()">返回</button>
    <label for="mrid" style="margin-left:26px;">数据ID:</label>
    <input type="text" name="" id="mrid" class="txt" v-model="searchMrid">
    <label for="bvid" style="margin-left:26px;">电压等级:</label>
    <select v-model="searchBvid" id="bvid">
          <option :value="0">请选择</option>
          <option v-for="(item,index) in bvidArr" :value="item.bvId" :key="index">
            {{item.dydj}}kV
          </option>
    </select>
    <label style="margin-left:26px;">厂站:</label>
    <input type="text" class="txt searchSub" placeholder="输入厂站" v-model="searchSubs">
    <button class=" primary toright" @click="searchData()">查询</button>
    
  </div>
  <div class="table_wrap">
    <div class="cllocet_table_tool">
      <button class="primary toright" @click="refresh()">刷新</button>
      <button class="primary toright" @click="downFile()">导出</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <td width="5%">序号</td>
          <td style="position:relative;">电量数据平台名称
            <div class="common_sort">
                    <span class="positive_sequence" @click="setOrder('pathName',1)"></span>
                    <span class="reverse_order" @click="setOrder('pathName',0)"></span>
                  </div>
          </td>
          <td style="position:relative;">电压等级
            <div class="common_sort">
                    <span class="positive_sequence" @click="setOrder('bvName',1)"></span>
                    <span class="reverse_order" @click="setOrder('bvName',0)"></span>
                  </div>
          </td>
          <td style="position:relative;">主站设备名称
            <div class="common_sort">
                    <span class="positive_sequence" @click="setOrder('localName',1)"></span>
                    <span class="reverse_order" @click="setOrder('localName',0)"></span>
                  </div>
          </td>
          <td style="position:relative;">数据ID
            <div class="common_sort">
                    <span class="positive_sequence" @click="setOrder('mrid',1)"></span>
                    <span class="reverse_order" @click="setOrder('mrid',0)"></span>
                  </div>
          </td>
          <td style="position:relative;">电量主站设备ID
            <div class="common_sort">
               <span class="positive_sequence" @click="setOrder('localId',1)"></span>
              <span class="reverse_order" @click="setOrder('localId',0)"></span>
            </div>
          </td>
          <td>注册</td>
        </tr>
      </thead>
    </table>
    <div class="table_content table_content1">
      <table class="table">
        <tbody>
          <tr v-for="(item,index) in tableDate" :key="index">
            <td width="5%">{{index + 1}}</td>
            <td>
              <span v-if=item.mrId class="color_warning" @click="showDash(item)">{{item.pathName}}</span>
              <span v-else>{{item.pathName}}</span>
            </td>
            <td>{{mapBvId(item.bvId)}}</td>
            <td>{{item.localName}}</td>
            <td>{{item.mrId}}</td>
            <td>{{item.localId}}</td>
            <td>
              <span class="color_warning" @click="close='true';sendToFlow(item)">{{item.mrId?'已注册':'未注册'}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <overlay :close.sync="close">
    <flow  v-if="close" @closeFlow="closeFlow();" :areaId="subareaId" :flowData='flowData'/>
  </overlay>
</div>
</template>
<script>
import hub from "@/assets/eventBus";
import bvid from "@/assets/config/bvidMap";
import overlay from "@/components/common/overlay";
import flow from "./flow/flow";
import BScroll from "better-scroll";
import Bus from "@/assets/eventBus.js";
export default {
  name: "collectList",
  data() {
    return {
      bvidArr: bvid,
      close: false,
      searchMrid: "", //过滤条件
      searchBvid: 0,
      searchSubs: "",
      tableDate: [], //将值存起来
      listData: [],
      areaId: "",
      flowData: {}, //传值给注册流程
      table_content1: ""
    };
  },
  // props: ["listData", "areaId"],
  components: {
    overlay,
    flow
  },
  methods: {
    setOrder(orderColumn, direction) {
      Bus.$emit("orderColumn", [orderColumn, direction]);
    },
    //回到首页
    backCollect() {
      this.$emit("backCollect", false);
    },
    //显示操作台
    showDash(item) {
      this.$emit("showDash", [true, item]);
    },
    //关闭流程
    closeFlow(data) {
      this.close = data;
    },
    sendToFlow(item) {
      this.flowData = item;
    },
    searchData() {
      //多条件过滤
      var arr = [];
      if (this.searchMrid || this.searchBvid || this.searchSubs) {
        console.log("有条件");
        if (this.searchMrid) {
          arr = this.listData.filter(item => {
            return item.mrId.indexOf(this.searchMrid) != -1;
          });
        } else {
          arr = this.listData;
        }
        if (this.searchBvid) {
          if (arr.length > 0) {
            arr = arr.filter(item => {
              return item.bvId === this.searchBvid;
            });
          }
        }
        if (this.searchSubs) {
          if (arr.length > 0) {
            arr = arr.filter(item => {
              return item.localName
                ? item.localName.indexOf(this.searchSubs) != -1
                : item;
            });
          }
        }
        this.tableDate = arr;
        if (arr.length == 0) {
          this.tableDate = [];
        }
      } else {
        this.tableDate = this.listData;
      }
    },
    mapBvId(id) {
      var bv = "";
      bvid.forEach(element => {
        if (element.bvId == id) {
          bv = element.dydj + "kV";
        }
      });
      return bv;
    },
    //刷新
    refresh() {
      hub.$emit("refresh", "run");
    },
    downFile() {
      hub.$emit("downFile");
    }
  },
  mounted() {
    // this.tableDate = this.listData;
    hub.$on("showCollect", data => {
      console.log("order");
      this.listData = data[0];
      this.areaId = data[1];
    });
    this.$nextTick(() => {
      // let table_content1 = new BScroll(".table_content1", {
      //   scrollbar: {
      //     fade: false,
      //     interactive: true
      //   },
      //   mouseWheel: true,
      //   preventDefault: false
      // });
    });
  },
  beforeUpdate(){
    if (this.table_content1) {
      this.table_content1.destroy()
    }
     this.table_content1 = new BScroll(".table_content1", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
        preventDefault: false
      });
  },
  computed: {
    subareaId() {
      return this.areaId;
    }
  },
  watch: {
    listData: {
      handler: function(news) {
        this.tableDate = this.listData;
      },
      deep: true
    }
  }
};
</script>

<style lang="css">
.collect_list_wrap {
  box-sizing: border-box;
  margin: 15px;
  padding: 0 10px;
  border: 1px solid #0d7474;
}
.search_zone {
  overflow: hidden;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #0d7474;
}
.cllocet_table_tool {
  overflow: hidden;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px dashed #0d7474;
}
.searchSub {
  width: 90px;
}
.toright {
  margin-left: 10px;
  float: right;
}
.dash_top_btn {
  text-align: right;
  margin-bottom: 10px;
}
.dash_top_btn button {
  margin-right: 10px;
}
.dash_sub1_table {
  max-height: 300px;
}
.table_wrap {
  padding: 10px;
  border: 1px solid #0d7474;
  margin-bottom: 12px;
}
.sub_wrap {
  width: 60vw;
  min-width: 998px;
  padding: 10px;
  padding-bottom: 20px;
}
.sub2_input {
  margin: 12px;
  border: 1px solid #0d7474;
  padding: 12px;
}
.sub_wrap_sec_title {
  border-bottom: 1px dashed #51a5a5;
}
.sub2_input li {
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 28px;
  justify-content: space-around;
}
.sub2_input li label {
  display: block;
  width: 50%;
  font-size: 13px;
}
.sub2_input li label span {
  text-align: right;
  display: inline-block;
  width: 150px;
  color: #fff;
}
</style>
