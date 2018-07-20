<template lang="html">
	<div class="count_top_right">
		<div class="mxdbpm_title"><strong>母线平衡达标排名</strong></div>
		<div class="tab_but">
				<ul class="clearfix">
				<li :class="{switch:show==1}" @mouseenter="switchDy($event)" dy="500" v-if="systemType ==1">500kV</li>
				<li :class="{switch:show==2}" @mouseenter="switchDy($event)" dy="220">220kV</li>
				<li :class="{switch:show==3}" @mouseenter="switchDy($event)" dy="110">110kV</li>
				<li :class="{switch:show==4}" @mouseenter="switchDy($event)" dy="35">35kV</li>
			</ul>
		</div>
		<div class="mxdbpm_tab" id="mpbdb_pm">
		</div>
	</div>
</template>
	
<script>
export default {
	data: function() {
		return {
			mxbdb_data:'',
			show:1,
			systemType:''
			}
	},
	props:['datas'],
	watch: {
		datas:{
			handler(news) {
				this.mxbdb_data = this.datas;
				this.show =1;
				if(this.systemType == 1) {
					this.busBalanceRanking(this.mxbdb_data['500kv']);
				} else {
					this.show =2
					this.busBalanceRanking(this.mxbdb_data['220kv']);
				}
			},
			deep:true
		}
	},
	components:{
	},
	created: function() {
		this.systemType = sessionStorage.getItem("systemType");
	},
	mounted: function() {
	},
	methods: {
		// 母线平衡排名
		busBalanceRanking: function(data) {
			var data1 = [],data2 = [],data3 = [];
			for(var i=0;i<data.length;i++) {
					data1.push(data[i].areaName);
					data2.push(data[i].unbalanceCount);
					data3.push(data[i].totalCount);
			}
			var mxbdb_pm = echarts.init(document.getElementById('mpbdb_pm'), 'dark');
			var option = {

				tooltip : {
					trigger: 'axis'
				},
				toolbox: {
						right: '5%',
					show : true,
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false},
						magicType: {show: true, type: ['line', 'bar']},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				grid: {
					top:'10%',
					left: '1%',
					right: '1%',
					bottom: '2%',
					containLabel: true
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						data : data1,
						axisLabel:{
							interval:0,//横轴信息全部显示
							rotate:30,//30度角倾斜显示
						}
					}
				],
				yAxis : [
					{
						type : 'value',
						boundaryGap : [0, 0.01]
					}
				],
				series : [
					{
						name:'不平衡条数',
						type:'bar',
						data:data2
					},
					{
						name:'总条数',
						type:'bar',
						data:data3
					}
				]
			};

			// 指定的配置项和数据显示图表。
				mxbdb_pm.setOption(option);
		},

		// 切换不同电压得到展现不同的母线不平衡排名
		switchDy: function(e) {
				var dy = e.currentTarget.getAttribute("dy");
				if(dy == 500) {
						this.show =1;
						this.busBalanceRanking(this.mxbdb_data['500kv']);
				} else if(dy == 220) {
						this.show =2;
						this.busBalanceRanking(this.mxbdb_data['220kv']);
				} else if(dy == 110) {
						this.show =3;
						this.busBalanceRanking(this.mxbdb_data['110kv']);
				} else if(dy == 35) {
						this.show =4;
						this.busBalanceRanking(this.mxbdb_data['35kv']);
				}
		},
	}
}
</script>
		
<style lang="css">
</style>
	