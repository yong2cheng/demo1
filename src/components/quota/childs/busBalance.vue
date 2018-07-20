<template lang="html">
	<div class="main_mpzb">
			<h2 class="cover_title">母平指标详情
				<div class="month_bnt">
					<button v-bind:class="{checked:month=='pre','btn-small':buttons}" @click="getData($event)" mouth="pre">上月</button>
				<button v-bind:class="{checked:month=='this','btn-small':buttons}" @click="getData($event)" mouth="this">本月</button>
			</div>
		</h2>
		<div class="cover_count">
				<div class="count_top clearfix">
				<dataCollection :datas="data_collection"/>
				<mpbdbPie :datas="mxbdb_data"/>
				<busBalanceRanking :datas="mxbdb_data"/>
			</div>
			<!---各地区等级电量平衡明细表-->
			<div class="count_bottom">
				<busBalanceDetailTable :datas="{areaName_phmx:areaName_phmx,eachdyTotal:eachdyTotal,month:dayDate,busbarSummaries:busbarSummaries}"/>
			</div>
		</div>
		<loading :isLoading='loading'></loading>
	</div>
</template>

<script>
import dataCollection from './busBalance/dataCollection'
import mpbdbPie from './busBalance/mpbdbPie'
import busBalanceRanking from './busBalance/busBalanceRanking'
import busBalanceDetailTable from './busBalance/busBalanceDetailTable'
import BScroll from 'better-scroll'
import loading from "@/components/common/loading"
export default {
	data: function() {
		return {
				token:'',
				month: 'this',
				buttons:true,
				dayDate: '',
				busbarSummaries:[],
				busbarSummaryAreaVOList: [],
				voltageBusbarSummaries: [],
				data_collection: [],
				areaName: [],
				areaName_phmx: [],
				mxbdb_data:{},
				eachdyTotal: {},
				isLoading: true,
				data_dydj: {"1":"1000kv","2":"800kv","4":"750kv","6":"500kv","8":"400kv","9":"330kv","10":"220kv","12":"110kv","13":"66kv","14":"35kv","15":"20kv","16":"15kv","17":"13kv","18":"10kv"},//电压等级映射
				loading:true,
				status:0,
			}
	},
	components:{
		dataCollection,
		mpbdbPie,
		busBalanceRanking,
		busBalanceDetailTable,
		loading
	},
	methods: {
		// 昨日，今日时间切换重新获取数据
		getData: function(e) {
			this.loading =true
			this.status = 0
			this.month = e.currentTarget.getAttribute("mouth");
			this.show =1;
			if(this.month == "this") {
					this.dayDate = this.$day().format('YYYY-MM');
			} else {
				this.dayDate = this.$day().add(-1,"month").format('YYYY-MM');
			}
			this.getBusBalance();
		},

		// 母平指标详情数据获取
		getBusBalance: function() {
			this.$http.get("/quotaService/quota/getBusbarSummary",{
				params:{
					sign:this.token,
					month:this.dayDate
				}
			}).then((res) => {
				if (res.status == 200) {
					if(res.data.code == 1) {
						this.busbarSummaries = res.data.data.busbarSummaries;
						this.busbarSummaryAreaVOList = res.data.data.busbarSummaryAreaVOList;
						this.voltageBusbarSummaries = res.data.data.voltageBusbarSummaries;
						if(this.busbarSummaries.length>0) {
							this.dataCollection();
						}
						if(this.busbarSummaryAreaVOList.length>0) {
							// this.dataCollection();
							this.handleUnBalance();
						}
						if(this.voltageBusbarSummaries.length>0) {
							this.busBalanceDetail();
						}
						this.status++;
						if (this.status>=1) {//关闭加载框
							this.loading =false
						}
					}
				}
			}).catch(function(error) {
				console.log(error);
			});
		},

		// 分类汇总数据
		dataCollection: function() {
			var objData = [];
			for(var j=0;j<this.busbarSummaries.length;j++) {
				var obj = {};
				obj.month = this.dayDate;
				obj.areaName = this.busbarSummaries[j].areaName;
				obj.areaId = this.busbarSummaries[j].areaId;
				obj.mxbphzs = this.busbarSummaries[j].unbalanceCount;
				obj.mxzs = this.busbarSummaries[j].totalCount;
				obj.configCount=this.busbarSummaries[j].configCount;
				objData .push(obj);
			}
			this.data_collection = objData;
		},

		// 处理母平指标详情数据
		handleUnBalance: function() {
			var dataObj = {};

			for(var i=0;i<this.busbarSummaryAreaVOList.length;i++)  {
				var busbarSummaryVOList = this.busbarSummaryAreaVOList[i].busbarSummaryVOList,data=[];;
				if(busbarSummaryVOList) {
					for(var key in busbarSummaryVOList) {
						var obj = {};
						obj.areaName = busbarSummaryVOList[key].areaName;
						obj.balanceCount = (busbarSummaryVOList[key].totalCount-busbarSummaryVOList[key].unbalanceCount);
						obj.unbalanceCount = busbarSummaryVOList[key].unbalanceCount;
						obj.totalCount = busbarSummaryVOList[key].totalCount;
						data.push(obj)
					}
				}
				dataObj[this.data_dydj[this.busbarSummaryAreaVOList[i].bvId]] = data;
			}

			if(dataObj['500kv'] == undefined) {
				dataObj['500kv'] = [];
			}

			if(dataObj['220kv'] == undefined) {
				dataObj['220kv'] = [];
			}

			if(dataObj['110kv'] == undefined) {
				dataObj['110kv'] = [];
			}

			if(dataObj['35kv'] == undefined) {
				dataObj['35kv'] = [];
			}
			this.mxbdb_data = dataObj;
		},

		// 母线平衡明细
		busBalanceDetail: function() {
			for(var i=0;i<this.voltageBusbarSummaries.length;i++) {
				var obj ={};
				obj.count = this.voltageBusbarSummaries[i].configCount;
				obj.unBalCount = this.voltageBusbarSummaries[i].unBalCount;
				obj.unBalRate = this.dataProcessing(this.voltageBusbarSummaries[i].unBalRate);
				this.eachdyTotal[this.voltageBusbarSummaries[i].baseVoltage] =obj;
			}

			var dydj_obj = [];
			for(var n=0;n<this.busbarSummaries.length;n++) {
				var obj = {}
				obj.areaName = this.busbarSummaries[n].areaName;
				obj.areaId = this.busbarSummaries[n].areaId;
				obj.zts500=this.busbarSummaries[n].configCount500;
				obj.bph500=this.busbarSummaries[n].unbalance500;
				obj.zb500=(this.busbarSummaries[n].rate500 == 0)?0:this.dataProcessing(this.busbarSummaries[n].rate500);	
				obj.zts220=this.busbarSummaries[n].configCount220;
				obj.bph220=this.busbarSummaries[n].unbalance220;
				obj.zb220=(this.busbarSummaries[n].rate220 == 0)?0:this.dataProcessing(this.busbarSummaries[n].rate220);
				obj.zts110=this.busbarSummaries[n].configCount110;
				obj.bph110=this.busbarSummaries[n].unbalance110;
				obj.zb110=(this.busbarSummaries[n].rate110 == 0)?0:this.dataProcessing(this.busbarSummaries[n].rate110);
				obj.zts35=this.busbarSummaries[n].configCount35;
				obj.bph35=this.busbarSummaries[n].unbalance35;
				obj.zb35=(this.busbarSummaries[n].rate35 == 0)?0:this.dataProcessing(this.busbarSummaries[n].rate35);
				obj.zts10=this.busbarSummaries[n].configCount10;
				obj.bph10=this.busbarSummaries[n].unbalance10;
				obj.zb10=(this.busbarSummaries[n].rate10 == 0)?0:this.dataProcessing(this.busbarSummaries[n].rate10);
				dydj_obj.push(obj)
			}
			this.areaName_phmx = dydj_obj;
		},

		// 数据处理
		dataProcessing: function(data) {
			if(data) {
				data = data.toString();
				data = data==100?100:data.substring(0,data.indexOf(".") + 3);
				data = Number(data);
				return data;
			}
		}
	},
	created: function() {
		this.token = sessionStorage.getItem('accessToken');
		this.dayDate = this.$day().format('YYYY-MM');
		this.eachdyTotal = {
			'500kV':{'count':'','unBalCount':'','unBalRate':''},
			'330kV':{'count':'','unBalCount':'','unBalRate':''},
			'220kV':{'count':'','unBalCount':'','unBalRate':''},
			'110kV':{'count':'','unBalCount':'','unBalRate':''},
			'66kV':{'count':'','unBalCount':'','unBalRate':''},
			'35kV':{'count':'','unBalCount':'','unBalRate':''},
			'15kV':{'count':'','unBalCount':'','unBalRate':''},
			'10kV':{'count':'','unBalCount':'','unBalRate':''}
		};
		this.getBusBalance();
	},
	mounted: function() {
		this.$nextTick(() => {
			let scroll = new BScroll('.scroll', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
			//let scroll1 = new BScroll('.scroll1', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,disableMouse:true});
			//let scroll2 = new BScroll('.scroll2', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,disableMouse:true});
			//let scroll3 = new BScroll('.scroll3', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,disableMouse:true});
			let scroll4 = new BScroll('.scroll4', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
			let scroll5 = new BScroll('.scroll5', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
		});
	}
}
</script>

<style>
	.main_mpzb {width:1398px;  height:100%;margin:30px auto 0; border:1px solid #0d7474; background:#043434; box-shadow:0 1px 2px rgba(0,0,0,.8);}
	.cover_title { height:34px; background:#035252; padding:0 10px; border-bottom:1px solid #035e5f; color:#84f1f1;  font-size:16px; line-height:34px; text-shadow:0 1px 1px rgba(0,0,0,.8);}
	.cover_title span { float:right; font-size:14px; margin-top:2px; font-weight:normal; }
	.cover_title span a {height:30px;width: 40px;text-align: center;}
	.cover_title .month_bnt {float: right;}
	.cover_count {width: 100%;}
	.count_top{width: 100%;height: 610px;border-bottom: 1px solid #0d7474;}
	.count_top_left { float:left; width:190px; height:100%;}
	.count_top_left .flhzs {width: 94%;margin:3% 3% 0;color:#eee;overflow: auto;}
	.count_top_left .flhz {width: 94%;height:90%; margin:0 3% 3%;color:#eee;overflow: auto;}
	.count_top_middle { float: left; width:550px; height:100%; border:1px solid #0d7474; border-top:none;border-bottom:none; }
	.mpbdb {float:left; width:258px; height:288px; margin:10px 0 10px 10px; position:relative; border:1px solid #0d7474;}
	.mpbdb_title {width:100%;height: 30px;line-height:30px;background: #035252;text-align: center;font-size: 16px;color: #84f1f1;font-weight: normal;text-shadow: 0 1px 1px rgba(0,0,0,.8)}
	.mpbdb_count {width: 258px;height: 258px;}
	.count_top_right { float:left; width:625px;height:96%;margin:10px 0 0 10px;}
	.count_top_right .mxdbpm_title{  height:30px; line-height:30px;background:#035252;}
	.count_top_right .mxdbpm_title strong { float:left; font-size:16px; color:#84f1f1; font-weight:normal; margin-left:5px;  text-shadow:0 1px 1px rgba(0,0,0,.8);}
	.mxdbpm_tab { width:100%; height:80%;}
	.tab_but {width: 370px;margin: 20px auto;}
	.tab_but li { float:left; width:80px; height:20px; line-height:20px; text-align:center; border:1px solid #075d5d; margin:0 5px; color:#84f1f1; font-size:13px; cursor:pointer; transition:all 500ms;}
	.tab_but li:hover { border-color:#dd6b66; color:#dd6b66 }
	.tab_but li.switch { border-color:#dd6b66; background:#dd6b66; color:#fff;}
	.count_bottom {width: 1378px;margin: 20px auto;}
	.clickable {color:#f6726c !important;cursor: pointer} 
	.btnes {float: right;margin-top: 2px;}
	.clearfix:after {content:"";height:0;line-height: 0;display: block;visibility: hidden;clear: both;}
	.count_top_right_tc ul li {width:40px;}
	.tc_title {margin:0 10px 20px;}
	@media (max-width:1399px){
		.main_mpzb { width:1208px;}
		.count_top_right {width:455px;}
		.count_bottom {width:1198px;}
		.mpbdb_tc {width:228px;height: 258px}
		.mpbdb_count_tc {width:228px;height: 228px}
		.count_top_right_tc {width:425px;}
	}
</style>
	