<template>
<div class="main">
  <div class="mxian_succ">
    <div class="zbdl_tool_bar">
      <div class="select_wrap">
        <div style="margin-left: 10px;">
          <label>
          <span>管理单位：</span>
          <select v-model="systemId">
            <option value="" v-if="!systemId">所有地区</option>
            <option v-for="(item,index) in areaArr" :value="item.areaId" :key="index">
              {{item.areaName}}
            </option>
          </select>
          </label>
        </div>
        <label>
          <span>计量点名称：</span>
          <input v-model="meterName" type="text" class="txt"></label>
        <label>
           <span>变电站名称：</span>
           <input v-model="stName" type="text" class="txt">
         </label>
        <label>
           <span>计量点ID：</span>
           <input v-model="meterId" type="text" class="txt">
         </label>
      </div>
      <div class="time_zone">
        <div class="time_wrap">
          <label>时间:</label>
          <el-date-picker class="modified_ate" v-model="time" type="month" value-format="yyyy-MM" placeholder="选择日期">
          </el-date-picker>
          <input type="button" value="查询" style="margin:0;margin-left:10px;" @click="getData()">
        </div>
      </div>
      
    </div>
    <div class="zbdl_main">
      <div class="btn_zone">
        <button type="button" @click="close1=true">新增</button>
        <button type="button" name="button"  @click="close=true;">导入</button>
        <button type="button" name="button" @click="getDownload()">下载</button>
        <button type="button" class="warning"  @click="deleteEle">删除</button>
      </div>
      <div class="zbdl_table_main">
        <table class="table">
          <thead>
            <tr>
              <td width="8%">
                <input type="checkbox" v-model="isCheck" @change="checkAll()"> 序号
              </td>
              <td width="16%" style="position: relative;">单位名称
                <div class="common_sort">
                  <span class="positive_sequence" @click="orderColumn='companyName';direction=1;getData()"></span>
                  <span class="reverse_order" @click="orderColumn='companyName';direction=0;getData()"></span>
                </div>
              </td>
              <td width="14.5%" style="position: relative;">变电站名称
                <div class="common_sort">
                  <span class="positive_sequence" @click="orderColumn='stName';direction=1;getData()"></span>
                  <span class="reverse_order" @click="orderColumn='stName';direction=0;getData()"></span>
                </div>
              </td>
              <td width="13.5%" style="position: relative;">计量点ID
                <div class="common_sort">
                  <span class="positive_sequence" @click="orderColumn='meterMrid';direction=1;getData()"></span>
                  <span class="reverse_order" @click="orderColumn='meterMrid';direction=0;getData()"></span>
                </div>
              </td>
              <td width="18%" style="position: relative;">计量点名称
                <div class="common_sort">
                  <span class="positive_sequence" @click="orderColumn='meterName';direction=1;getData()"></span>
                  <span class="reverse_order" @click="orderColumn='meterName';direction=0;getData()"></span>
                </div>
              </td>
              <td width="7%" style="position: relative;">正向增补电量
                <div class="common_sort">
                  <span class="positive_sequence" @click="orderColumn='supplementPap';direction=1;getData()"></span>
                  <span class="reverse_order" @click="orderColumn='supplementPap';direction=0;getData()"></span>
                </div>
              </td>
              <td width="7%" style="position: relative;">反向增补电量
                <div class="common_sort">
                  <span class="positive_sequence" @click="orderColumn='supplementRap';direction=1;getData()"></span>
                  <span class="reverse_order" @click="orderColumn='supplementRap';direction=0;getData()"></span>
                </div>
              </td>
              <td width="9%" style="position: relative;">月份
                <div class="common_sort">
                  <span class="positive_sequence" @click="orderColumn='month';direction=1;getData()"></span>
                  <span class="reverse_order" @click="orderColumn='month';direction=0;getData()"></span>
                </div>
              </td>
              <td width="16%">增补电量原因</td>
            </tr>
          </thead>
        </table>
        <div class="zbdl_table_wrap">
          <table class="table">
            <tbody>
              <tr v-for="(item,index) in datalist" :key="index">
                <td width="8%">
                  <input type="checkbox" :value="item.id" v-model="checkdArr">
                  {{(index+1)}}
                </td>
                <td width="16%">{{item.companyName}}</td>
                <td width="14.5%">{{item.stName}}</td>
                <td width="13.5%">{{item.meterMrid}}</td>
                <td width="18%">
                  <span class="color_warning" 
                  @click="close1=true;
                  editObj = item">
                    {{item.meterName}}
                  </span>
                 </td>
                <td width="7%">{{item.supplementPap}}</td>
                <td width="7%">{{item.supplementRap}}</td>
                <td width="9%">{{item.month.slice(0,7)}}</td>
                <td :title="item.supplementReason" width="16%">
                  <span class="reasonWhy">{{item.supplementReason}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- 文件上传 -->
  <overlay :close.sync="close">
      <div class="file_wrap"> 
        <input type="text" class="txt" v-model="exc_file.name">
        <input type="file" name="" id="files" style="display:none" @change="onChange($event)">
        <label for="files" class="btn">浏览</label>
        <div class="btn_main" style="margin-top:24px;">
          <button @click="upLoad()">导入</button>
          <button class="warning"  @click="close=false;exc_file={};">取消</button>
        </div>
      </div>
    </overlay>
  <!-- 修改 -->
  <overlay :close.sync="close1" @changeSatus="cancelEdit">
      <div class="alert_zbdl_wrap"> 
        <div class="edit_tool">
            <div class="select_option">
              <span>单位管理:</span>
							<select style="margin-left:16px;" v-model="systemId">
								<option value="" v-if="!systemId">请选择</option>
								<option v-for="(option,index) in areaArr" :value="option.areaId" :key="index">
	     						{{option.areaName }}
	   						</option>
	            </select>
              <label><span>计量点名称：</span><input type="text" class="txt" @input="edit_meterId=''" v-model="edit_meterName"></label>
              <label><span>计量点ID：</span><input type="text" class="txt" @input="edit_meterName=''" v-model="edit_meterId"></label>
						 	<button type="button" name="button" @click="editSearch()">查询</button>
            </div>
          </div>
          <div class="zbdl_edit_mains">
            <div class="edit_left ">
              <label><span class="span">计量点ID：</span><input type="text" class="txt" v-model="editObj.meterMrid" readonly></label>
              <label><span class="span">计量点名称：</span><input type="text" class="txt" v-model="editObj.meterName" readonly></label>
              <label><span class="span">变电站名称：</span><input type="text" class="txt" v-model="editObj.stName" readonly></label>
            </div>
            <div class="edit_right">
              <label><span class="span">正向有功电量：</span><input type="text"  class="txt"  v-model="editObj.supplementPap"></label>
              <label><span class="span">反向有功电量：</span><input type="text"  class="txt" v-model="editObj.supplementRap"></label>
              <label><span class="span">正向无功电量：</span><input type="text"  class="txt"  disabled></label>
              <label><span class="span">反向无功电量：</span><input type="text"  class="txt"  disabled></label>
							<label for="times"><span class="span">修改时间:</span>
                <el-date-picker class="modified_ate" v-model="time1" type="month" value-format="yyyy-MM" placeholder="选择日期">
                </el-date-picker>
              </label>
            </div>
          </div>
          <div class="edit_reason">
							<label for="editArea">修改原因:<i style="color:red">*</i>
							</label>
							<textarea name="name" rows="5" cols="80" id="editArea" v-model="editObj.supplementReason"></textarea>
					</div>
          <div class="edit_btn">
            <button type="button" name="button"  id="addUserBtn" @click="saveModfity();">保存</button>
            <button type="button" name="button" class="warning"  @click="editSwitch=false;cancelEdit();">取消</button>
					<!-- {{editObj}} -->
        </div>
      </div>
  </overlay>
  <overlay :close.sync="close2">
    <div class="result_wrap">
      <p class="searchItem"
      v-for="(item,index) in searchArr" 
      :key="index"
      @click="cureDate(item);close2=false;">
        {{index+1}}.{{item.pathName}}
      </p>
    </div>
  </overlay>
  <loading :isLoading='loading'></loading>
</div>
</template>
<script>
import overlay from "@/components/common/overlay";
import area from "@/assets/config/areaMap";
import BScroll from "better-scroll";
import loading from "@/components/common/loading";
import qs from "qs";
export default {
  name: "sjss",
  data() {
    return {
      areaArr: [],
      systemId: "",
      time: this.$day().format("YYYY-MM"),
      time1: this.$day().format("YYYY-MM"),
      stName: "",
      meterName: "",
      meterId: "",
      datalist: [],
      checkdArr: [],
      isCheck: false,
      close: false,
      close1: false,
      close2: false,
      exc_file: {}, //文件信息
      editObj: {}, //编辑的数据集合
      edit_meterId: "",
      edit_meterName: "",
      searchArr: [],
      loading: false,
      orderColumn: "bvName",
      direction: 1,
      flag: true
    };
  },
  created() {
    if (
      sessionStorage.getItem("systemId") &&
      !isNaN(sessionStorage.getItem("systemId"))
    ) {
      this.systemId =  sessionStorage.getItem("systemId");
      area.forEach(item => {
        if (item.areaId == sessionStorage.getItem("systemId")) {
          this.areaArr = [item];
        }
      });
    } else {
      this.areaArr = area;
    }
  },
  methods: {
    getData() {
      var obj = {}; //获取列表
      this.loading = true;
      this.$http
        .get("/maintenanceService/supplementEnergy/getSupplementEnergy", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            systemId: this.systemId,
            stName: this.stName,
            meterName: this.meterName,
            meterId: this.meterId,
            searchDate: this.time + "-01",
            orderColumn: this.orderColumn,
            direction: this.direction
          }
        })
        .then(res => {
          this.loading = false;
          this.datalist = res.data.data.supplementEnergyList;
          console.log(this.datalist);
        });
    },
    onChange(event) {
      //上传预览
      var that = this;
      this.exc_file = event.target.files[0];
      console.log(this.exc_file);
    },
    upLoad() {
      //文件上传
      var that = this;
      if (that.exc_file.name) {
        var fd = new FormData();
        fd.append("file", that.exc_file);
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        }; //添加请求头
        this.$http
          .post(
            "/maintenanceService/supplementEnergy/importEnergyFile?sign=" +
              sessionStorage.getItem("accessToken"),
            fd,
            config
          )
          .then(d => {
            if (d.data.data == 1) {
              that.exc_file = {};
            } else {
              alert(d.data.msg);
              // that.rawHtml = '<span style="color:#f6726c">未知错误！</span>';
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    deleteEle() {
      var that = this;
      this.$http
        .post(
          "/maintenanceService/supplementEnergy/deleteSupplementEnergy?sign=" +
            sessionStorage.getItem("accessToken"),
          qs.stringify({
            ids: that.checkdArr.join(",")
          })
        )
        .then(res => {
          if (res.data.code === 1) {
            this.getData();
          } else {
            alert("删除失败！");
          }
        });
    },
    cancelEdit() {
      //清空编辑数据
      this.editObj = {};
      this.edit_meterName = "";
      this.edit_meterId = "";
    },
     //编辑查询
    editSearch() {    
      var that = this;
      if (that.systemId >= 0) {
        this.isLoading = true;
        this.$http
          .get("/quotaService/quota/getMeter", {
            params: {
              sign: sessionStorage.getItem("accessToken"),
              systemId: that.systemId,
              name: that.edit_meterName,
              mrid: that.edit_meterId
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.data.meters.length > 0) {
              that.searchArr = res.data.data.meters;
              this.isLoading = false;
              that.close2 = true;
            } else {
              this.$notify({
                title: "提示",
                message: "没有此条记录，请核对信息!",
                duration: 1500,
                type: "warning"
              });
            }
          });
      } else {
        alert("选择地区！");
      }
    },
    //保存修改
    saveModfity() {
      var that = this;
      console.log(isNaN(that.editObj.supplementPap));
      if (
        that.editObj &&
        that.editObj.supplementReason &&
        !isNaN(that.editObj.supplementPap) &&
        !isNaN(that.editObj.supplementRap)
      ) {
        if (this.flag) {
          that.editObj.month = that.time1;
          this.flag = false;
          this.$http
            .post(
              "/maintenanceService/supplementEnergy/saveSupplementEnergy?sign=" +
                sessionStorage.getItem("accessToken") +
                "&systemId=" +
                that.systemId,
              that.editObj
            )
            .then(res => {
              if (res.data.code === 1) {
                console.log(this.flag);
                this.flag = true;
                this.$notify({
                  title: "提示",
                  message: "新增成功",
                  duration: 1500,
                  type: "success"
                });
              } else {
                console.log(this.flag);
                this.flag = true;
                this.$notify({
                  title: "提示",
                  message: "修改异常",
                  duration: 1500,
                  type: "error"
                });
              }
            });
        }
      } else {
        this.$notify({
          title: "提示",
          message: "修改信息填写不全！",
          duration: 1500,
          type: "warning"
        });
      }
    },
    cureDate(obj) {
      this.editObj = {};
      this.editObj.stName = obj.stName;
      this.editObj.meterMrid = obj.mrid;
      this.editObj.meterName = obj.pathName;
    },
    checkAll() {
      //表格全选
      if (this.isCheck) {
        this.checkdArr = [];
        this.datalist.forEach(item => {
          this.checkdArr.push(item.id);
        });
      } else {
        this.checkdArr = [];
      }
    },
    // 下载表格
    getDownload() {
      this.$http
        .get("/maintenanceService/supplementEnergy/outEnergyFile", {
          params: {
            sign: sessionStorage.getItem("accessToken"),
            systemId: this.systemId,
            stName: this.stName,
            meterName: this.meterName,
            meterId: this.meterId,
            searchDate: this.time + "-01"
          }
        })
        .then(res => {
          if (res.status == 200) {
            window.location = res.request.responseURL;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.$nextTick(() => {
      let zbdl_table_wrap = new BScroll(".zbdl_table_wrap", {
        scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
        preventDefault: false
      });
    });
  },
  watch: {
    checkdArr: {
      handler(news) {
        if (this.checkdArr.length < this.datalist.length) {
          this.isCheck = false;
        } else {
          this.isCheck = true;
        }
      },
      deep: true
    }
  },
  components: {
    overlay,
    loading
  }
};
</script>
<style lang="css">
.zbdl_tool_bar {
  display: flex;
  flex-wrap: wrap;
  width: 99%;
  margin: 5px 0.5%;
  padding: 6px 0;
  border-bottom: 1px solid #0d7474;
  height: 70px;
}
.select_wrap {
  flex: 2;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 20px;
}
.select_wrap span {
  display: inline-block;
  width: 80px;
  text-align: right;
  font-size: 13px;
}
.select_wrap label {
  margin-left: 10px;
}
.time_zone {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* margin-right: 10px; */
  flex: 1;
}
.btn_zone {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 1px dashed #0d7474;
}
.zbdl_main {
  margin: 16px;
  padding: 16px;
  border: 1px solid #0d7474;
}
.reasonWhy {
  display: inline-block;
  width: 100%;
  max-width: 275px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.zbdl_table_wrap {
  position: relative;
  overflow: hidden;
  max-height: 400px;
}
.file_wrap {
  width: 500px;
  height: 200px;
  background: #043434;
  text-align: center;
  padding: 12px;
  box-sizing: border-box;
  padding-top: 60px;
}
.alert_wrap {
  width: 50vw;
  height: 60vh;
  background: #043434;
  border: 1px solid #0d7474;
  padding: 8px;
}
.alert_zbdl_wrap {
  width: 850px;
  height: 500px;
  padding: 12px;
}
.select_option span {
  font-size: 13px;
}
.zbdl_edit_mains {
  display: flex;
  padding: 20px;
  justify-content: center;
}
.edit_left,
.edit_right {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  text-align: center;
  padding: 20px;
  border: 1px solid #0d7474;
  min-height: 230px;
}
.edit_left {
  border-right: none;
}
.zbdl_edit_mains span {
  font-size: 13px;
}
.edit_left .span,
.edit_right .span {
  display: inline-block;
  text-align: center;
  width: 100px;
}
.edit_reason textarea {
  border: none;
  padding: 10px;
  color: #fff;
  background: #012323;
  border-radius: 4px;
  text-align: left;
  font-size: 14px;
  box-shadow: inset 0 2px 5px 1px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.2);
  outline: none;
  resize: none;
  vertical-align: top;
}
.edit_btn {
  text-align: center;
  margin-top: 26px;
}
.result_wrap {
  position: relative;
  background: #043434;
  margin: 12px;
  width: 550px;
  height: 300px;
  overflow: auto;
}
.searchItem {
  font-size: 13px;
  line-height: 30px;
  margin: 0 20px;
  border-bottom: 1px solid #0d7474;
  cursor: pointer;
}
.searchItem:hover {
  color: #0ed640;
}
</style>
