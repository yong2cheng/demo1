<template lang="html">
	<div class="mainbox_cover">
		<h2 class="cover_title">采集覆盖率(%)
			<div class="month_bnt">
					<button v-bind:class="{checked: ispremouth,'btn-small':buttons}" @click="getData($event)" mouth="pre">上月</button>
					<button v-bind:class="{checked: isthismouth,'btn-small':buttons}" @click="getData($event)" mouth="this">本月</button>
			</div>
		</h2>
		<div class="cover_count clearfix">
			<div class="cover_count_left">
				<leftMap :datas="covtable"/>
				<powerInformation :datas="dayDate" :changIndex="changIndex" @status="load"/>
			</div>
			<div class="cover_count_right"><!--采集覆盖率详情右边-->
				<div class="shujutable">
					<acquisitionCoverageTable :datas="{covtable:covtable,month:dayDate}"/>
					<coverageRanking :datas="covtable"/>
				</div>
			</div>
		</div>
		<loading :isLoading='loading'></loading>
	</div>
</template>

<script>
import leftMap from './acquisitionCoverage/leftMap'
import powerInformation from './acquisitionCoverage/powerInformation'
import acquisitionCoverageTable from './acquisitionCoverage/acquisitionCoverageTable'
import coverageRanking from './acquisitionCoverage/coverageRanking'
import loading from "@/components/common/loading"	
export default {
	data: function() {
		return {
			token:'',
			covtable: '',
			buttons:true,
			month: 'this',
			dayDate: '',
			ispremouth: false,
			isthismouth: true,
			loading:true,
			status:0,
			changIndex:'0'
		}
	},
	components:{
		leftMap,
		powerInformation,
		acquisitionCoverageTable,
		coverageRanking,
		loading
	},
	methods: {
		// 切换日期重新加载数据
		getData: function(e) {
			this.changIndex++
			this.loading =true
			this.status = 0
			this.month = e.currentTarget.getAttribute("mouth");
			if(this.month == "this") {
				this.isthismouth = true;
				this.ispremouth = false;
				this.dayDate = this.$day().format('YYYY-MM');
			} else {
				this.isthismouth = false;
				this.ispremouth = true;
				this.dayDate = this.$day().add(-1,"month").format('YYYY-MM');
			}
			this.acquisitionCoverage();
		},
		
		// 采集覆盖率table详细
		acquisitionCoverage: function() {
			this.$http.get("/quotaService/quota/getAcquireCoverage",{
				params:{
					sign:this.token,
					month:this.dayDate
				}
			}).then((res) => {
				if (res.status == 200) {
					if(res.data.code == 1) {
						this.covtable = this.dataProcessing(res.data.data.acquireCoverages);
						this.status++;
						if (this.status>=2) {//关闭加载框
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
				var substationCoverage;
				for(var i=0;i<data.length;i++) {
					substationCoverage = data[i].substationCoverage;
					if(substationCoverage != 0 && substationCoverage != 1) {
						substationCoverage = substationCoverage.toString();
						substationCoverage = substationCoverage==100?100:substationCoverage.substring(0,substationCoverage.indexOf(".") + 3);
						substationCoverage = Number(substationCoverage);
						data[i].substationCoverage = substationCoverage;
					}
				}
				return data;
			}
		},
		load(res){
			if (res) {
				this.status++;
				if (this.status>=2) {//关闭加载框
					this.loading =false
				}
			}
		},
	},
	created: function() {
		this.token = sessionStorage.getItem("accessToken");
		this.dayDate = this.$day().format('YYYY-MM');
		this.acquisitionCoverage();
	},
	mounted: function() {
	}
}
</script>

<style>
	.mainbox_cover {width:1398px;  height:100%;margin:30px auto 0; border:1px solid #0d7474; background:#043434; box-shadow:0 1px 2px rgba(0,0,0,.8);}
	.cover_title { height:34px; background:#024243; padding:0 10px; border-bottom:1px solid #035e5f; color:#84f1f1;  font-size:16px; line-height:32px; text-shadow:0 1px 1px rgba(0,0,0,.8);}
	.cover_title .month_bnt {float: right;}
	.cover_count {width: 100%;}
	.cover_count_left { float:left; width:380px; min-height:670px; border-right:1px solid #0d7474; font-size:13px; color:#fff; text-shadow:0 1px 1px rgba(0,0,0,.8);}
	.cover_count_right{ float:left; width:1000px;padding-top:20px; position:relative; margin:0 5px;}
	.shujutable {width:96%; margin:0 2%;  }
	.shujutable table { width: 100%; border-collapse: collapse; font-size: 13px;}
	.cover_datas {width:98%;margin-left:1%;overflow: auto;}
	.cover_data {width:98%; height:176px; margin-left:1%;overflow: auto; }
	.cover_box {width:100%; border:1px solid #0d7474 ; padding-bottom:5px;}
	.cover_detail { float:left; width:100%; height:30px; line-height:30px; background:#035252 ; font-size:16px; color:#84f1f1; text-indent:10px; text-shadow:0 1px 1px rgba(0,0,0,.8);  font-weight:normal; margin-bottom:5px; }
	.cover_pm {width:100%; height:360px; margin-top:30px; position:relative; border:1px solid #0d7474 ; }
	.clickable {color:#f6726c !important;cursor: pointer}
	.clearfix:after {content:"";height:0;line-height: 0;display: block;visibility: hidden;clear: both;}
	@media (max-width:1399px){
		.mainbox_cover{ width:1208px;}
		.cover_count_right{ width:807px;}
		.cover_pm {width: 776px}
	}
</style>
	