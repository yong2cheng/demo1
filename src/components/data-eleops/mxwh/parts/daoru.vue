<template>

    <div class=" main ">
    <span class="bread_nav">
      <router-link :to="{path:'/dlywkhd/mxwh',query:{sysId:$route.query.sysId,sonid:$route.query.sonid}}">模型维护></router-link>
    </span>
    <span class="bread_nav">表计导入</span>
        <div class="daoru files_load ems_wrap1">
				<div class="preview_wrap">
					<div class="table_wrap">
						<!--预览table-->
						<h3 class="table_title">电量信息表计量信息表</h3>
						<p class="sec_title">终端信息</p>
						<table border="" cellspacing="" cellpadding="" class="table" id="device_info">
							<tbody>
								<tr>
									<td width="10%" class="title">厂站名称</td>
									<td width="10%">{{datas?datas.localName:''}}</td>
									<td width="10%" class="title">电压等级</td>
									<td width="10%">{{datas?datas.bvId:''}}</td>
									<td width="10%" class="title">设备厂家</td>
									<td width="10%">{{datas?datas.manufactor:''}}</td>
									<td width="10%" class="title">设备型号</td>
									<td width="10%">{{datas?datas.models:''}}</td>
									<td width="10%" class="title">厂站类型</td>
									<td width="10%">{{datas?datas.substationType:''}}</td>
								</tr>
							</tbody>
						</table>
						<p class="sec_title">通讯信息</p>
						<table border="" cellspacing="" cellpadding="" class="table">
							<thead>
								<tr>
									<th>序号</th>
									<th>名称</th>
									<th>IP地址</th>
									<th>子网掩码</th>
									<th>默认网关</th>
									<th>通讯端口</th>
									<th>站地址</th>
									<th>通信规约</th>
								</tr>
							</thead>
						</table>
                        <div class="scroll1">
                            <table class="table">
                                <tbody>
									<tr :key="index" v-for="(item,index) in data1">
										<td>{{index + 1}}</td>
										<td><input type="text" class="search_text txt" v-model="item.name" /></td>
										<td><input type="text" class="search_text txt" v-model="item.ip" /></td>
										<td><input type="text" class="search_text txt" v-model="item.subnetMask" /></td>
										<td><input type="text" class="search_text txt" v-model="item.defaultGateway" /></td>
										<td><input type="text" class="search_text txt" v-model="item.communicationPort" /></td>
										<td><input type="text" class="search_text txt" v-model="item.stationAddress" /></td>
										<td><input type="text" class="search_text txt" v-model="item.communicationProtocol" /></td>
									</tr>
								</tbody>
                            </table>
                        </div>
						<p class="sec_title">电表信息</p>
						<table border="" cellspacing="" cellpadding="" class="table" id="db_info">
							<thead>
								<tr>
									<th>序号</th>
									<th>名称</th>
									<th>PT</th>
									<th>CT</th>
									<th>电表SN</th>
									<th>主副标识</th>
									<th>费率</th>
									<th>电表小数位</th>
									<th>规约</th>
									<th>通道号</th>
								</tr>
							</thead>
						</table>
                        <div class="scroll2">
                            <table class="table">
                                <tbody>
                                    <tr :key="index" v-for="(item,index) in data2">
                                        <td>{{index + 1}}</td>
                                        <td>
                                            <input type="text" class="search_text txt" v-model="item.name" @focus="show(item.nameException,item.id)" @blur="hide(item.nameException)" />
                                            <span class="erro_tips" v-show="showErro==item.nameException&&erroIndex==item.id">
                                                错误信息:{{item.name}}
                                            </span>
                                        </td>
                                        <td>
                                            <input :class="{cuowu:item.ptException!=null}" type="text" class="search_text txt" v-model="item.pt" @focus="show(item.pt,item.id)" @blur="hide(item.pt)" />
                                            <span class="erro_tips" v-show="item.ptException!=null&&item.pt&&erroIndex==item.id">
                                                错误信息{{item.ptException}}
                                            </span>
                                        </td>
                                        <td>
                                            <input :class="{cuowu:item.ctException!=null}" type="text" class="search_text txt" v-model="item.ct" @focus="show(item.ct,item.id)" @blur="hide(item.ct)" />
                                            <span class="erro_tips" v-show="item.ctException!=null&&showErro==item.ct&&erroIndex==item.id">
                                                错误信息{{item.ctException}}
                                            </span>
                                        </td>
                                        <td>
                                            <input :class="{cuowu:item.meterSNException!=null}" type="text" class="search_text txt" v-model="item.meterSN" @focus="show(item.meterSN,item.id)" @blur="hide(item.meterSN)" />
                                            <span class="erro_tips" v-show="item.meterSNException!=null&&showErro==item.meterSN&&erroIndex==item.id">
                                                错误信息:{{item.meterSNException}}
                                            </span>
                                        </td>
                                        <td>
                                            <input :class="{cuowu:item.meterSerialException!=null}" type="text" class="search_text txt" v-model="item.meterSerial" @focus="show(item.meterSerial,item.id)" @blur="hide(item.meterSerial)" />
                                            <span class="erro_tips" v-show="item.meterSerialException!=null&&showErro==item.meterSerial&&erroIndex==item.id">
                                                错误信息:{{item.meterSerialException}}
                                            </span>
                                        </td>
                                        <td>
                                            <input :class="{cuowu:item.ratenException!=null}" type="text" class="search_text txt" v-model="item.raten" @focus="show(item.raten,item.id)" @blur="hide(item.raten)" />
                                            <span class="erro_tips" v-show="item.ratenException!=null&&showErro==item.raten&&erroIndex==item.id">
                                                错误信息{{item.ratenException}}
                                            </span>
                                        </td>
                                        <td>
                                            <input :class="{cuowu:item.dataPrecisionException!=null}" type="text" class="search_text txt" v-model="item.dataPrecision" @focus="show(item.dataPrecision,item.id)" @blur="hide(item.dataPrecision)" />
                                            <span class="erro_tips" v-show="item.dataPrecisionException!=null&&showErro==item.dataPrecision&&erroIndex==item.id">
                                                错误信息{{item.dataPrecisionException}}
                                            </span>
                                        </td>
                                        <td>
                                            <input :class="{cuowu:item.protocolException!=null}" type="text" class="search_text txt" v-model="item.protocol" @focus="show(item.protocol,item.id)" @blur="hide(item.protocol)" />
                                            <span class="erro_tips" v-show="item.protocolException!=null&&showErro==item.protocol&&erroIndex==item.id">
                                                错误信息{{item.protocolException}}
                                            </span>
                                        </td>
                                        <!--<td>{{parseInt(item.channelNumber)}}</td>-->
                                        <td>
                                            <input :class="{cuowu:item.channelNumberException!=null}" type="text" v-model="item.channelNumber" class="search_text txt" @focus="show(item.channelNumber,item.id)" @blur="hide(item.channelNumber)" />
                                            <span class="erro_tips" v-show="item.channelNumberException!=null&&showErro==item.channelNumber&&erroIndex==item.id">
                                                错误信息{{item.channelNumberException}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
					</div>
				</div>
				<div class="file_wrap">
					<!--文件上传-->
					<label for="files" id="filesLoad">选择文件</label>
					<input type="file" name="file" id="files" @change="onChange" />
					<button id="confirm"  @click="onLoad()">上传</button>
					<div class="file_info" v-show="exc_file">
						<h3 style="text-align: left;padding-left: 20px;">文件基本信息：</h3>
						<p>文件名：{{exc_file.name}}</p>
						<p>修改日期：{{exc_file.lastModified?new Date(exc_file.lastModified).toLocaleString():''}}</p>
						<p>文件大小:{{exc_file.size?(exc_file.size/1024).toFixed(0)+'KB':''}}</p>
					</div>
					<div class="erro_info">

					</div>
				</div>
        </div>        
	</div>
</template>
<script>
import $areaId from "@/assets/config/areaMap";
import qs from "qs";
import BScroll from "better-scroll";
export default {
  data: function() {
    return {
      exc_file: "", //上传文件的基本信息
      datas: {
        //表一的对象结构
        localName: "",
        bvId: "",
        manufactor: "",
        models: "",
        substationType: ""
      },
      data1: [], //表二数据
      data2: [], //表三数据
      showErro: "null",
      erroIndex: null,
      token: sessionStorage.getItem("accessToken"),
      systemId: ""
    };
  },
  mounted: function() {
    if (
      sessionStorage.getItem("systemId") === null ||
      sessionStorage.getItem("systemId") == "undefined" ||
      sessionStorage.getItem("systemId") == 15
    ) {
      this.systemId = 15;
    } else {
      for (var a of $areaId) {
        if (a.areaId == sessionStorage.getItem("systemId")) {
          this.systemId = a.areaId;
        }
      }
    }
    this.$nextTick(() => {
      let scroll = new BScroll(".scroll1", {
        scrollbar: { fade: false, interactive: true },
        preventDefault: false,
        mouseWheel: true
      });
      let scroll2 = new BScroll(".scroll2", {
        scrollbar: { fade: false, interactive: true },
        mouseWheel: true,
        preventDefault: false
      });
    });
  },
  methods: {
    onChange(event) {
      //预览
      var that = this;
      this.exc_file = event.target.files[0];
      this.files_info = event.target.value;
      if (this.exc_file) {
        var fd = new FormData();
        fd.append("file", this.exc_file);
        fd.append("systemId", 2);
        this.$http
          .post(
            "/dataInteractiveService/subStationService/importSubstationFile?sign=" +
              this.token,
            fd
          )
          .then(res => {
            if (res.data.code == 0) {
              alert(res.data.msg);
            } else {
              that.datas = res.data.data.excelSubstationVO;
              //									console.log(that.datas);
              that.data1 = res.data.data.excelSubstationVO.excelNetworksVOList;
              that.data2 = res.data.data.excelSubstationVO.excelMeterVOList;
              //									console.log(that.data2);
            }
          });
        // $.ajax({
        //   url:
        //     "/dataInteractiveService/subStationService/importSubstationFile?sign="+this.token,
        //   type: "POST",
        //   processData: false,
        //   contentType: false,
        //   data: fd,
        //   success: function(d) {
        //     if (d.status == "FAILED") {
        //       alert("请选择正确的文件类型！");
        //     } else {
        //       console.log(d);
        //       that.datas = d.data.excelSubstationVO;
        //       //									console.log(that.datas);
        //       that.data1 = d.data.excelSubstationVO.excelNetworksVOList;
        //       that.data2 = d.data.excelSubstationVO.excelMeterVOList;
        //       //									console.log(that.data2);
        //     }
        //   }
        // });
      }
    },
    onLoad() {
      //上传
      var that = this;
      var arr = {
        excelNetworksVOList: that.data1,
        excelMeterVOList: that.data2,
        localName: that.datas.localName,
        bvId: that.datas.bvId,
        manufactor: that.datas.manufactor,
        models: that.datas.models,
        substationType: that.datas.substationType
      };
      this.$http
        .post(
          "/dataInteractiveService/subStationService/importSubstation?appkey=3917230828&sign=" +
            this.token +
            "&systemId=" +
            this.systemId,
          arr
        )
        .then(res => {
          alert(res.data.msg);
        });
      //   $.ajax({
      //     url:
      //       "/dataInteractiveService/subStationService/importSubstation?appkey=3917230828&sign=" +
      //       this.token +
      //       "&systemId="+this.systemId,
      //     type: "POST",
      //     contentType: "application/json;charset=UTF-8",
      //     dataType: "json",
      //     data: JSON.stringify({
      //       excelNetworksVOList: that.data1,
      //       excelMeterVOList: that.data2,
      //       localName: that.datas.localName,
      //       bvId: that.datas.bvId,
      //       manufactor: that.datas.manufactor,
      //       models: that.datas.models,
      //       substationType: that.datas.substationType
      //     }),
      //     success: function(res) {
      //       console.log(res);
      //     }
      //   });
    },
    show: function(erro, id) {
      //					console.log(erro)
      if (erro) {
        this.showErro = erro;
        this.erroIndex = id;
      }
    },
    hide: function(erro) {
      //					console.log(erro)
      if (erro) {
        this.showErro = "null";
      }
    }
  }
};
</script>
<style>
.daoru {
  border: 1px solid #0d7474;
  background: #043434;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  min-height: 450px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 18px;
  margin-top: 30px;
}
.daoru .middle {
  height: auto;
  min-height: calc(100% - 130px);
  margin-top: 30px;
  color: white;
  position: relative;
}
.daoru .footer {
  position: absolute;
  /*bottom: 20px;*/
  left: 0;
  width: 100%;
  text-align: center;
}
.daoru .preview_wrap {
  flex: 4;
  text-align: center;
}
.daoru .table_wrap {
  width: 98%;
  margin: 0 auto;
}
.daoru .file_wrap {
  flex: 1;
  min-height: 400px;
  /*text-align: center;*/
  padding: 0 10px;
  text-align: right;
}
.daoru .file_info {
  padding: 15px 10px;
}
.daoru .file_info p {
  margin-top: 13px;
  padding-left: 20px;
  text-align: left;
}
.daoru #files {
  display: none;
}
.daoru #filesLoad {
  display: inline-block;
  line-height: 38px;
  width: 45%;
  color: white;
  background: #0d7474;
  margin-top: 15px;
  text-align: center;
}
.daoru #filesLoad:hover {
  background: #0a9c9c;
  color: whitesmoke;
}
.daoru #confirm {
  border: none;
  outline: none;
  line-height: 38px;
  width: 30%;
  color: white;
  background: #0d7474;
  margin-top: 15px;
  text-align: center;
  cursor: pointer;
  vertical-align: top;
  margin-left: 20px;
}
.daoru .table_title {
  font-size: 18px;
}
.daoru .sec_title {
  text-align: left;
  padding: 20px 0;
}
.daoru .title {
  font-weight: 1000;
  color: #84f1f1;
}
.daoru .search_text {
  color: white;
  border: transparent;
  width: 70%;
}
.daoru .erro_border {
  border: 1px solid #f6726c;
}
.daoru table td {
  position: relative;
  font-size: 14px;
}
.daoru .erro_tips {
  position: absolute;
  left: 90%;
  top: 4px;
  min-width: 100px;
  min-height: 30px;
  z-index: 100;
  background: #fc8449;
  border-radius: 4px;
  padding: 4px;
}
.daoru .erro_tips:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-right: 10px solid #fc8449;
  left: -20px;
  top: calc(50% - 10px);
}
.daoru .scroll1,
.daoru .scroll2 {
  position: relative;
  overflow: hidden;
}
.daoru .scroll1 {
  max-height: 200px;
}
.daoru .scroll2 {
  height: 400px;
}
.daoru .cuowu {
  color: red;
}
</style>
