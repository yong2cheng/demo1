<template lang="html">
	<div class="mainbox_cover">
		<h2 class="cover_title">采集成功率(%)
				<div class="month_bnt">
					<button v-bind:class="{checked: ispredate,'btn-small':buttons}" @click="getData($event)" date="pre">昨日</button>
						<button v-bind:class="{checked: isthisdate,'btn-small':buttons}" @click="getData($event)" date="this">今日</button>
				</div>
		</h2>
		<div class="cover_count clearfix">
			<div class="cover_count_left">
				<leftMap :datas="successtable"/>
				<collectformation :successtables='successtable' :dayDate='dayDate' :month='month' :changIndex="changIndex" @status="load"/>
			</div>
			<div class="cover_count_right">
				<div class="shujutable">
					<acquisitionSuccessTable :datas="{successtable:successtable,day:dayDate}"/>
					<acquisitionSuccessRanking :datas="successtable"/>
				</div>
			</div>
		</div>
		<loading :isLoading='loading'></loading>
	</div>
</template>

<script>
import leftMap from './acquisitionSuccess/leftMap'
import collectformation from './acquisitionSuccess/collectformation'
import acquisitionSuccessTable from './acquisitionSuccess/acquisitionSuccessTable'
import acquisitionSuccessRanking from './acquisitionSuccess/acquisitionSuccessRanking'
import BScroll from 'better-scroll'
import loading from "@/components/common/loading"
export default {
	data: function() {
		return {
			token:'',
			successtable: [],
			buttons:true,
			dayDate: '',
			month:'',
			dates: 'this',
			ispredate: false,
			isthisdate: true,
			loading:true,
			status:0,
			changIndex:'0'
		}
	},
	components:{
		leftMap,
		collectformation,
		acquisitionSuccessTable,
		acquisitionSuccessRanking,
		loading
	},
	methods: {
		// 切换月份重新加载数据
		getData: function(e) {
			this.changIndex++
			this.loading =true
			this.status = 0
			this.dates = e.currentTarget.getAttribute("date");
			if(this.dates == "this") {
				this.isthisdate = true;
				this.ispredate = false;
				this.dayDate = this.$day().format('YYYY-MM-DD');
				this.month = this.$day().format('YYYY-MM');
			} else {
				this.isthisdate = false;
				this.ispredate = true;
				this.dayDate = this.$day().add(-1,"day").format('YYYY-MM-DD');
				this.month = this.$day().add(-1,"month").format('YYYY-MM');
				
			}
			this.acquisitionCoverage();
		},

		// 采集成功率table详细
		acquisitionCoverage: function() {
			this.$http.get("/quotaService/quota/getAcquireSuccessRateDay",{
				params:{
					sign:this.token,
					date:this.dayDate
				}
			}).then((res) => {
				if (res.status == 200) {
					if(res.data.code == 1) {
						this.successtable = this.dataProcessing(res.data.data.acquireSuccessRates);
						this.status++;
						if (this.status>=3) {//关闭加载框
							this.loading =false
						}
					}
				}
			}).catch(function(error) {
				console.log(error);
			});
		},

		// 数据处理
		dataProcessing: function(data) {
			if(typeof data == "object") {
				var meterSuccessRate;
				for(var i=0;i<data.length;i++) {
					meterSuccessRate = data[i].meterSuccessRate;
					if(meterSuccessRate != 0 && meterSuccessRate != 1) {
						meterSuccessRate = meterSuccessRate.toString();
						meterSuccessRate = meterSuccessRate==100?100:meterSuccessRate.substring(0,meterSuccessRate.indexOf(".") + 3);
						meterSuccessRate = Number(meterSuccessRate);
						data[i].meterSuccessRate = meterSuccessRate;
					}
				}
				return data;
			}
		},
		load(res){
			if (res) {
				this.status++;
				if (this.status>=3) {//关闭加载框
					this.loading =false
				}
			}
		},
	},
	created: function() {
		this.token = sessionStorage.getItem("accessToken");
		this.dayDate=this.$day().format('YYYY-MM-DD');
		this.month=this.$day().format('YYYY-MM');
		this.acquisitionCoverage();
	},
	mounted: function() {
		this.$nextTick(() => {
			let scroll = new BScroll('.scroll', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
			let scroll3 = new BScroll('.scroll3', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
			let scroll4 = new BScroll('.scroll4', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
			let scroll5 = new BScroll('.scroll5', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
			let scroll6 = new BScroll('.scroll6', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
			let scroll7 = new BScroll('.scroll7', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
			let scroll8 = new BScroll('.scroll8', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
		})
	}
}
</script>

<style>
	.mainbox_cover {width:1398px;  height:100%;margin:30px auto 0; border:1px solid #0d7474; background:#043434; box-shadow:0 1px 2px rgba(0,0,0,.8);}
	.cover_title { height:34px; background:#024243; padding:0 10px; border-bottom:1px solid #035e5f; color:#84f1f1;  font-size:16px; line-height:32px; text-shadow:0 1px 1px rgba(0,0,0,.8);}
	.cover_title .month_bnt {float: right;}
	.cover_count {width: 100%;}
	.cover_count_left { float:left; width:380px; min-height:670px; border-right:1px solid #0d7474; font-size:13px; color:#fff; text-shadow:0 1px 1px rgba(0,0,0,.8);}
	.cover_count_right{ float:left; width:1000px;padding-top:20px; margin:0 5px;}
	.shujutable {width:96%; margin:0 2%;  }
	.shujutable table { width: 100%; border-collapse: collapse; font-size: 13px;}
	.cover_datas {width:98%;margin-left:1%;overflow: auto;}
	.cover_data {width:98%; height:176px; margin-left:1%;overflow: auto; }
	.cover_box {width:100%; border:1px solid #0d7474 ; padding-bottom:5px;}
	.cover_detail { float:left; width:100%; height:30px; line-height:30px; background:#035252 ; font-size:16px; color:#84f1f1; text-indent:10px; text-shadow:0 1px 1px rgba(0,0,0,.8);  font-weight:normal; margin-bottom:5px; }
	.cover_pm {width:100%; height:360px; margin-top:30px;  border:1px solid #0d7474 ; }
	.coverpm:before{ content:""; position:absolute; top:0; left:0; right:0; height:30px; background:#035252;}
	.clearfix:after {content:"";height:0;line-height: 0;display: block;visibility: hidden;clear: both;}
	.count_bottom {width: 1378px;margin: 20px auto;}
	.clickable {color:#f6726c !important;cursor: pointer}
	@media (max-width:1399px){
		.mainbox_cover { width:1208px;}
		.cover_count_right{ width:807px;}
		.cover_pm {width: 776px}
		.count_bottom {width:1198px;}
	}
</style>
	