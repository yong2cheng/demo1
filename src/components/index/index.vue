<template lang="html">
<div class="wrap">
	<!-- <htop></htop> -->
	<navs></navs>
	<main>
	<!--中间版块-->
		<div class="main_index">
			<busBalance/>
			<div class="main_index_bottom clearfix">
				<acquisitionCoverage/>
				<acquisitionSuccess/>
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
	</main>
	<foot/>
</div>
</template>

<script>
import htop from '@/components/common/htop'
import navs from '@/components/common/nav'
import busBalance from './index-main/busBalance'
import acquisitionCoverage from './index-main/acquisitionCoverage'
import acquisitionSuccess from './index-main/acquisitionSuccess'
import foot from '@/components/common/foot'
import overlay from '@/components/common/overlay'
import bvidArrs from "@/components/mixins/bvIds";
export default {
	data: function() {
		return {
			isLoading: true
		}
	},
	mixins: [bvidArrs],
	components:{
		navs,
		htop,
		busBalance,
		acquisitionCoverage,
		acquisitionSuccess,
		foot,
		overlay,
	},
	created: function() {
		this.clearLoading()
		console.log(this.bvidArr)
	},
	mounted: function() {
	},
	methods: {
		// 去掉加载框
		clearLoading() {
			setInterval(() => { this.isLoading = false; }, 1000)
		}
	}
}
</script>

<style lang="css">
	.clearfix:after {content:"";height:0;line-height: 0;display: block;visibility: hidden;clear: both;}
	.main_index_top {width:1398px;margin:30px auto 0; border:1px solid #0d7474; background:#043434; box-shadow:0 1px 2px rgba(0,0,0,.8);}
	.main_index_title {height: 34px;background: #024243;padding: 0 10px;border-bottom: 1px solid #035e5f;color: #84f1f1;font-size: 16px;line-height: 32px;text-shadow: 0 1px 1px rgba(0,0,0,.8);}
	.main_index_title_right {float: right;margin:1px 5px;}
	.main_index_title_right .checked{background: #f6726c;cursor: default;}
	.main_index_title_right a {color: #2dafaf;}
	.main_index_count {width:100%;}
	.main_index_count_left {float:left;width: 20%;height:420px; padding:5px 5px;border-right:1px solid #0d7474; box-sizing:border-box;font-size:13px; color:#fff; text-shadow:0 1px 1px rgba(0,0,0,.8);}
	.mxbphl_count_left_bg {width: 100%;height: 48%;}
	.mxbphl_count_left_pt {width: 100%;height: 50%;margin: 2% 0;}
	.main_index_count_right {float:left;width: 80%;height: 420px;}
	.mxbphl_count_right_switch {width: 370px;margin: 20px auto;}
	.mxbphl_count_right_switch li { float:left; width:80px; height:20px; line-height:20px; text-align:center; border:1px solid #075d5d; margin:0 5px; color:#84f1f1; font-size:13px; cursor:pointer; transition:all 500ms;}
	.mxbphl_count_right_switch li:hover { border-color:#dd6b66; color:#dd6b66 }
	.mxbphl_count_right_switch li.switch { border-color:#dd6b66; background:#dd6b66; color:#fff;}
	.mxbphl_count_right_tb {width: 90%;margin: 0 5%;height: 388px;}
	.main_index_bottom {width:1398px;margin:30px auto 0;}
	.count_common{float: left;width: 49%;border: 1px solid #0d7474;box-sizing:border-box;background: #043434;box-shadow: 0 1px 2px rgba(0,0,0,.8);}
	.cjcgl_count {margin-left:2%;}
	.clickable {color:#f6726c !important;cursor: pointer}
	.count_top_tc {height: 500px;width:96%;margin: 20px auto;padding:10px 0;box-sizing: border-box}
	.count_top_tc .btness {float: right;margin-top: 2px} 
	.pagings {width: 94%;margin: 15px 3%;text-align: right}
	@media (max-width:1399px){
		.main_index_top ,.main_index_bottom{ width:1208px;}
	}
</style>
	  