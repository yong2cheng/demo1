<template lang="html">
        <div class="main_mpzb">
                <h2 class="cover_title">{{areaName}}母平指标详情
                </h2>
                <div class="cover_count">
                    <div class="count_top clearfix count_top_tc1">
                        <!--分类汇总-->
                        <div class="count_top_left">
                            <div class="flhzs">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                    <thead>
                                        <tr>
                                            <td >分类汇总</td><td>不达标</td><td>总数</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="flhz scroll1" style="position:relative;overflow:hidden;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                    <tbody>
                                        <tr v-for="item in area_dyhz">
                                            <td>{{item.bvId}}</td>
                                            <td>{{item.bdbs}}</td>
                                            <td>{{item.zts}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!--母线不达标饼图-->
                        <div class="count_top_middle scroll2" style="position:relative;overflow:hidden;">
                                <div class="clearfix">
                                <div class="mpbdb" v-for="(item,index) in area_dyhz">
                                        <div class="mpbdb_title">{{item.bvId}}</div>
                                        <div class="mpbdb_count" :id='"mpbdb_pt"+index'></div>
                                </div>
                            </div>
                        </div>

                        <div class="count_top_right count_top_right_tc">
                            <div class="tab_but">
                                    <ul class="clearfix">
                                    <li v-for="(item,index) in area_dyhz" :class="{switch:index==checkBvid}" @click="getDetailsDymx(item,index)">{{item.bvId}}</li>
                                </ul>
                            </div>
                            <div>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                    <thead>
                                        <tr>
                                        <th>序号</th>
                                        <th>厂站名称</th>
                                        <th>电压等级</th>
                                        <th>输入</th>
                                        <th>输出</th>
                                        <th>是否平衡</th>
                                        <th>不平衡率</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="mxdbpm_tab scroll3" style="position:relative;overflow:hidden;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                                    <tbody>
                                        <tr v-for="(item,index) in dymxAry">
                                        <td>{{index+1}}</td>
                                        <td>{{item.substationName}}</td>
                                        <td>{{data_dydj[item.bvId]}}</td>
                                        <td>{{item.inputValue == null?0:item.inputValue}}</td>
                                        <td>{{item.outputValue == null?0:item.outputValue}}</td>
                                        <td>{{item.balanceConvert}}</td>
                                        <td>{{item.rate}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <loading :isLoading='loading'></loading>
            </div>
    </template>
    
    <script>
        import BScroll from 'better-scroll'
        import loading from "@/components/common/loading"
        export default {
            data: function() {
                return {
                    token:'',
                    areaName:'',
                    area_dyhz:'',
                    dymxAry:'',
                    area_tcpt_all:'',
                    checkBvid:0,
                    data_dydj: {"1":"1000kV","2":"800kV","4":"750kV","6":"500kV","8":"400kV","9":"330kV","10":"220kV","12":"110kV","13":"66kV","14":"35kV","15":"20kV","16":"15kV","17":"13kV","18":"10kV"},//电压等级映射
                    loading:true,
				    status:0,
                }
            },
            components:{
                loading
            },
            created: function() {
                this.token = sessionStorage.getItem("accessToken");
                this.getMpzbData();
            },
            mounted: function() {
                this.$nextTick(() => {
                    let scroll1 = new BScroll('.scroll1', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                    let scroll2 = new BScroll('.scroll2', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                    let scroll3 = new BScroll('.scroll3', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
                });
            },
            methods: {
                getMpzbData: function() {
                    var query = this.$route.query
                    this.areaName = query.areaName
                    this.$http.get("/quotaService/quota/getBusbarDetail",{
                        params:{
                            sign:this.token,
                            month:query.month,
                            systemId:query.systemId,
                            type:1,
                        }
                    })
                    .then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            var busbarDetailVO = res.data.data.busbarDetailVO;
                            this.dymxAry = busbarDetailVO;
                            if(busbarDetailVO.length>0) {
                                var dyhz_obj = {} ,dyhz = [],bvIdData = [];
                                for(var m=0;m<busbarDetailVO.length;m++) {
                                    if(bvIdData.indexOf(busbarDetailVO[m].bvId)<0) {
                                        bvIdData.push(busbarDetailVO[m].bvId);
                                    }
                                }
                                bvIdData.sort()
                                for(var n=0;n<bvIdData.length;n++) {
                                    var zts = 0,bdbs = 0,dbs = 0;
                                    for(var m=0;m<busbarDetailVO.length;m++) {
                                        if(busbarDetailVO[m].bvId == bvIdData[n]) {
                                            if(busbarDetailVO[m].balance == false) {
                                                zts +=1;
                                                bdbs +=1;
                                            } else {
                                                dbs +=1;
                                            }
                                        }
                                    }
                                    dyhz_obj[bvIdData[n]] = {
                                            zts: zts,
                                            bdbs: bdbs,
                                            dbs: dbs
                                    }
                                }
                                if(dyhz_obj != '') {
                                    for(var key in dyhz_obj) {
                                        var obj ={},dymx = [];
                                        obj.bvId = this.data_dydj[key];
                                        obj.zts = dyhz_obj[key].zts;
                                        obj.bdbs = dyhz_obj[key].bdbs;
                                        obj.dbs = dyhz_obj[key].dbs;
                                        dyhz.push(obj);
                                    }
                                }
                                this.area_dyhz = dyhz;
                                var dataObj1 = {};
                                for(var n=0;n<bvIdData.length;n++) {
                                    var data =[];
                                    for(var m=0;m<busbarDetailVO.length;m++) {
                                        if(busbarDetailVO[m].bvId == bvIdData[n]) {
                                            data.push(busbarDetailVO[m])
                                        }
                                    }
                                    dataObj1[this.data_dydj[bvIdData[n]]]= data
                                }
                                this.dataObj =dataObj1;
                                this.dymxAry = this.dataObj[this.data_dydj[bvIdData[0]]];

                                var area_pt_all = [];
                                for(var i=0;i<this.area_dyhz.length;i++) {
                                    var obj1 = {},obj2 = {},area_pt = [];
                                    obj1.name = '平衡';
                                    obj1.value = this.area_dyhz[i].dbs;
                                    obj2.name = '不平衡';
                                    obj2.value = this.area_dyhz[i].bdbs;
                                    area_pt.push(obj1,obj2);
                                    area_pt_all.push(area_pt);
                                }
                                this.area_tcpt_all = area_pt_all;
                            }
                            this.status++;
                            if (this.status>=1) {//关闭加载框
                                this.loading =false
                            }
                        }
                    }
                    }).then(()=> {
                        this.getTkPie();
                    }).catch(function(error) {
                        console.log(error);
                    });
                },
                getTkPie: function() {
                    var dataes = [];
                    for(var j=0;j<this.area_tcpt_all.length;j++) {
                        dataes = this.area_tcpt_all[j];
                        this.initMxPie(dataes,'mpbdb_pt'+j,'');
                    }
                },
                getDetailsDymx: function(item,index) {
                    this.dymxAry = this.dataObj[item.bvId];
                    this.checkBvid = index;
                },
                // 母线不达标率饼图
                initMxPie: function(pieData,idbq,dy) {
                    var mxbdb_pie,name = '',datas = [];
                    if(dy !='') {
                        name = dy+'kV不达标数(占比)';
                        for(var i=0;i<pieData.length;i++) {
                            var obj = {};
                            obj.name = pieData[i].areaName;
                            obj.value = pieData[i].unbalanceCount;
                            datas.push(obj);
                        }
                    } else {
                        datas = pieData;
                    }
                    
                    mxbdb_pie = echarts.init(document.getElementById(idbq), 'dark');
                    
                    var option = { 
                        title : {

                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"//百分比
                        },

                        //数据信息
                        series : [
                            {
                                name: name,
                                type: 'pie',
                                radius : '56%',//大小
                                center: ['50%', '50%'],//显示位置
                                data:datas,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    mxbdb_pie.setOption(option);
                },
            }
        }
        </script>
        
        <style lang="css">
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
	.tab_but li { float:left; width:80px; height:20px; line-height:20px; text-align:center; border:1px solid #075d5d; margin:0 5px 5px 0; color:#84f1f1; font-size:13px; cursor:pointer; transition:all 500ms;}
	.tab_but li:hover { border-color:#dd6b66; color:#dd6b66 }
	.tab_but li.switch { border-color:#dd6b66; background:#dd6b66; color:#fff;}
	.count_bottom {width: 1378px;margin: 20px auto;}
	.clickable {color:#f6726c !important;cursor: pointer} 
	.overlay_tc {height:90%; width:1398px}
	.btnes {float: right;margin-top: 2px;}
	.clearfix:after {content:"";height:0;line-height: 0;display: block;visibility: hidden;clear: both;}
	.count_top_right_tc ul li {width:40px;}
	.tc_title {margin:0 10px 20px;}
	.count_top_tc {height: 500px;width:96%;margin: 20px auto;padding:10px 0;box-sizing: border-box}
	.count_top_tc1 {height: 600px;width:100%;box-sizing: border-box}
	@media (max-width:1399px){
		.main_mpzb ,.overlay_tc{ width:1208px;}
		.count_top_right {width:455px;}
		.count_bottom {width:1198px;}
		.mpbdb_tc {width:228px;height: 258px}
		.mpbdb_count_tc {width:228px;height: 228px}
		.count_top_right_tc {width:425px;}
	}
	@media (max-height:700px){
		.count_top_tc1 {height: 570px;}
	}
        </style>
           
       