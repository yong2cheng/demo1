<template>
    <div class="logsWraps">
      <!-- 我的代码 -->
        <h4 class="logsTitles">修改记录列表</h4>
        <table class="table">
          <thead>
				    <tr>        
					    <td width="10%">序列</td>
					    <td width="17%">原始底码p+</td>
					    <td width="17%">修改后底码p+</td>
					    <td width="17%">原始底码p-</td>
					    <td width="17%">修改后底码p-</td>
				  	  <td >修改时间</td>
			  	  </tr>
		    	</thead>
        </table>
        <div class="logTable">
            <table class="table">
                <tbody>
                  <tr v-for="(item,index) in hisLogs" :key="index">
					          <td width="10%">
                     <input type="radio" id="one" :value="item" v-model="picked">
                      {{index + 1}}
                    </td>
					          <td width="17%">{{item.originPap}}</td>
					          <td width="17%">{{item.newPap}}</td>
					          <td width="17%">{{item.originRap}}</td>
					          <td width="17%">{{item.newRap}}</td>
					          <td>{{item.occurTimeStr}} </td>
                  </tr>
                </tbody>
            </table>
        </div>
        <div class="logBtn">
          <button @click="goBackLogs()">确定</button>
          <button class="warning" @click="clearPicked()">取消</button>
        </div>
    </div>
</template>
<script>
import hub from "@/assets/eventBus.js";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      hisLogs: [],
      devId: this.$route.query.devId,
      picked: {}
    };
  },
  created() {
    this.restoreDate();
  },
  mounted() {
    hub.$on("sendDevId", res => {
      this.devId = res;
    });
    this.$nextTick(() => {
      let logTable = new BScroll(".logTable", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        preventDefault: false,
        mouseWheel: true
      });
    });
  },
  methods: {
     //获取修改记录
    restoreDate() {
      this.$http
        .get(
          "/dataDiagnoseService/dataDiagnose/getDataChangedLogs?sign=" +
            sessionStorage.getItem("accessToken") +
            "&devId=" +
            this.devId +
            "&userId=" +
            sessionStorage.getItem("userId")
        )
        .then(res => {
          if (res.data.code === 1) {
            this.hisLogs = res.data.data.dataChangeLogsVOS;
          }
        });
    },
     //清空选择项
    clearPicked() {
      this.picked = {};
    },
    //还原
    goBackLogs() {  
      if (JSON.stringify(this.picked != "{}")) {
        //是否选中或者为空
        console.log(this.picked);
        hub.$emit("restore", this.picked);
        // this.filter_pap(that);
        // this.reupdateStatus();
      }
    }
  }
};
</script>
    
<style>
/* .logsWrap {
  width: 90vw;
  max-width: 1380px;
  min-height: 50vh;
  max-height: 76vh;
  padding: 10px 16px;
  position: relative;
} */
/* .logsTitle {
  margin: 18px 0;
  padding-bottom: 10px;
  border-bottom: 1px dashed #51a5a5;
} */
.logsTitles{
  padding: 16px;
  margin-bottom: 12px;
  border-bottom: 1px dashed #0d7474;
}
.logsWraps {
  width: 70vw;
  min-width: 960px;
  max-width: 1380px;
  min-height: 35vh;
  max-height: 76vh;
  padding: 10px 16px;
  position: relative;
}
.logTable {
  max-height: 50vh;
  overflow: hidden;
  position: relative;
}
.logBtn {
  text-align: center;
  width: 100%;
  margin-top: 18px;
  bottom: 20px;
}
</style>