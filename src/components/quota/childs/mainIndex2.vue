<template lang="html">
		<!--中间版块-->
			<div class="main_index">
				<overallIndicators/>
				<abnormalClassification/>
				<areaClassification/>
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
	</div>
	</template>
	
	<script>
	import overallIndicators from './mainIndex/overallIndicators'
	import abnormalClassification from './mainIndex/abnormalClassification'
	import areaClassification from './mainIndex/areaClassification'
	import overlay from '@/components/common/overlay'
	export default {
		data: function() {
			return {
				isLoading: true
			}
		},
		components:{
			overallIndicators,
			abnormalClassification,
			areaClassification,
			overlay,
		},
		created: function() {
			this.clearLoading()
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
		.zbgz_page_home {width:1398px;  margin:30px auto 0; border:1px solid #0d7474; background:#043434; box-shadow:0 1px 2px rgba(0,0,0,.8);box-sizing: border-box;}
		.zbgz_title {height: 36px; background: #024243; padding: 0 10px; border-bottom: 1px solid #035e5f; color: #84f1f1; font-size: 16px; line-height: 36px; text-shadow: 0 1px 1px rgba(0,0,0,.8);}
		.zbgz_title strong { float:left;}
		.zbgz_tbswitch {float:left;margin-top:2px; margin-left:50px; color:#fff; font-size:13px; color:#fff; font-weight:normal;position:relative; width:80px; padding:0 3px; text-align:center; border-radius:40px; background:#012323; box-shadow:inset 0 2px 5px 1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.2);height:32px;line-height:32px;cursor:pointer;}
		.zbgz_tbswitch p ,.zbgz_tbswitch p {width:80px;  position:absolute; z-index:2; }
		.zbgz_tbswitch p span,.zbgz_tbswitch p span {display: inline-block;width:40px; height:32px;}
		.zbgz_block{width:40px;height:26px;background:#dd6b66;border-radius:13px;margin-left:0;margin-top:3px;}
		.zbgz_time {float: right;}
		.ztzb_tubiao_box {width: 100%;height: 298px;}
		.zbgz_count_title {width:100%; height:30px; line-height:30px; text-align:center; font-weight:normal; background:#035252;  border-bottom:1px solid #0d7474}
		.zbgz_count_title .checked {background: #f6726c;cursor: default;}
		.zbgz_count_but {float: right;margin-right: 10px;color: #84f1f1;}
		.zbgz_tbswitch .switch_left {margin-left: 0;}
		.zbgz_tbswitch .switch_right {margin-left: 40px;}
		.pagings {width: 94%;margin: 15px 3%;text-align: right}
		.checked_detail {color: #f6726c !important;cursor: pointer;}
		.overlay_tc_zbgz {height:90%; width:800px}
		.overlay_tc_zbgz h2 {text-align: center;margin-top: 10px;font-size: 20px}
		@media (max-width:1399px){
			.zbgz_page_home{ width:1208px;}
			/* .overlay_tc{ width:1208px;} */

		}
	</style>
		  