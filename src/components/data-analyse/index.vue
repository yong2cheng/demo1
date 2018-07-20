<template>
  <div class="main">
      <div style="width:40%;" class="gather_cover">
        <div class="bkbt">
          <h2>母线平衡率</h2>
          <span>+详情</span>
        </div>
          <div id="mxphl" style="height:360px;width:100%;"></div>
      </div>
      <div style="width:57%;float:right;" class="gather_cover">
        <div class="bkbt">
          <h2>设备损耗</h2><span style="float:right;">+详情</span>
          <button style="float:right;">上月</button>
          <button style="float:right;">本月</button>
          
        </div>
        <div style="width:49%;display:inline-block;">
            <h3>线损损耗条目</h3>
            <table class="table">
                <tbody>
                    <tr>
                        <td>1000kV <a href="#">10</a>条</td>
                        <td>750kV <a href="#">5</a>条</td>
                    </tr>
                    <tr>
                        <td>500kV <a href="#">10</a>条</td>
                        <td>220kV <a href="#">6</a>条</td>
                    </tr>
                </tbody>
            </table>
            <div id="fx_sh_xs_data" style="height:264px;width:390px;" class="sh_data_index"><!--设备损耗线损数据容器--></div>
        </div>
        <div style="width:49%;display:inline-block;">
            <h3>变损损耗条目</h3>
            <table class="table">
                <tbody>
                    <tr>
                        <td>1000kV <a href="#">10</a>条</td>
                        <td>750kV <a href="#">5</a>条</td>
                    </tr>
                    <tr>
                        <td>500kV <a href="#">10</a>条</td>
                        <td>220kV <a href="#">6</a>条</td>
                    </tr>
                </tbody>
            </table>
            <div id="fx_sh_bs_data" style="height:264px;width:390px;" class="sh_data_index"><!--设备损耗线损数据容器--></div>
        </div>
      </div>
      <div style="width:100%;" class="gather_cover">
        <div class="bkbt">
          <h2>系统网损</h2>
          <span>+详情</span>
        </div>
          <div id="mxphl" style="height:360px;width:100%;" class="clearfix">
              <div style="float:left;height:360px;width:33.5%;">
                  <div style="width:100%;height:100%;" class="ws_data_shl_index" id="fx_ws_shl_data">损耗率</div>
              </div>
               
               <div style="float:left;height:360px;width:32.5%;margin:0 0.5%">
                   <div class="bkbt">输入电量</div>
                   <table class="table">
                       <tbody>
                           <tr>
                               <td>电厂上网 <a href="#">1500</a></td>
                                <td>地区反送 <a href="#">311</a></td>
                           </tr>
                           <tr>
                               <td>大用户反送 <a href="#">23</a></td>
                                <td>购外省 <a href="#">432</a></td>
                           </tr>
                       </tbody>
                   </table>
                   <div style="width:100%;height:245px;" class="xtws_bing" id="fx_ws_sr_data">输入电量</div>
               </div>
               <div style="float:left;height:360px;width:32.5%;margin-right: 0.5%">
                   <div class="bkbt">输出电量</div>
                   <table class="table">
                       <tbody>
                           <tr>
                               <td>电厂上网 <a href="#">1500</a></td>
                                <td>地区反送 <a href="#">311</a></td>
                           </tr>
                           <tr>
                               <td>大用户反送 <a href="#">23</a></td>
                                <td>购外省 <a href="#">432</a></td>
                           </tr>
                       </tbody>
                   </table>
                   <div style="width:100%;height:245px;" class="xtws_bing" id="fx_ws_sc_data">输出电量</div>
               </div>
          </div>
      </div>
      <div style="width:100%;" class="gather_cover">
        <div class="bkbt">
          <h2>经济分析</h2>
          <span>+详情</span>
        </div>
          <div id="mxphl" style="height:360px;width:100%;">
              <div style="width:50%;height:360px;float:left;">
                  <div class="bkbt">发电能力</div>
                  <div style="width:25%;float:left;">
                      <table class="table">
                          <tbody>
                              <tr>
                                  <td>统调上网电量  <a href="#">140000</a></td>
                              </tr>
                              <tr>
                                  <td>非统调上网电量  <a href="#">600</a></td>
                              </tr>
                              <tr>
                                  <td>火力发电  <a href="#">8000</a></td>
                              </tr>
                              <tr>
                                  <td>水力发电  <a href="#">4000</a></td>
                              </tr>
                              <tr>
                                  <td>风力发电  <a href="#">2000</a></td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  <div style="width:61%;height:360px;float:right;">
                      <div id="fx_jj_fd_data" style="height:310px;" class="jjfx_data_index"><!--经济分析发电数据容器--></div>
                  </div>
              </div>
              <div style="width:50%;height:360px;float:right;border-left:1px solid #035e5f;box-sizing:border-box;">
                  <div class="bkbt">发电能力</div>
                  
                  <div style="width:61%;height:360px;float:left;">
                      <div id="fx_jj_sd_data" style="height:310px;" class="jjfx_data_index"><!--经济分析售电数据容器--></div>
                  </div>
                  <div style="width:25%;float:right;">
                      <table class="table">
                          <tbody>
                              <tr>
                                  <td>地区用电负荷  <a href="#">140000</a></td>
                              </tr>
                              <tr>
                                  <td>大用户用电  <a href="#">600</a></td>
                              </tr>
                              <tr>
                                  <td>送外省  <a href="#">8000</a></td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
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
</template>
<script>
export default {
    data:function(){
        return{
            isLoading:true
        }
    },
  mounted:function(){
      let myChart = echarts.init(document.getElementById('mxphl'),'dark')
      var option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:["总数","已配置","达标"]
        },
        xAxis : [
            {
                type : 'category',
                data : []
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'总数',
                type:'bar',
                data:[]
            },
            {
                name:'已配置',
                type:'bar',
                data:[]
            },
            {
                name:'达标',
                type:'bar',
                data:[]
            },
             {
                //name:'母线平衡率',
                type:'pie',
                tooltip : {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                center: ['89%',80],
                radius : [0, 50],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                },
                data:[]
            }
        ]
        };
        myChart.setOption(option);
        this.$http.get("/quotaService/quota/getBusbarSummary?sign="+sessionStorage.getItem("accessToken")+"&month="+this.$day().format('YYYY-MM'))
        .then(res=>{
            console.log(res);
            var data=res.data.data.voltageBusbarSummaries;
            console.log(data);
            for(var a of data){
                option.xAxis[0].data.push(a.baseVoltage);
                option.series[0].data.push(a.count);
                option.series[1].data.push(a.configCount);
                option.series[2].data.push(a.balCount);
                option.series[3].data.push({"name":a.baseVoltage,"value":a.configCount});
            }
            myChart.clear();
            myChart.setOption(option);
            this.isLoading=false;
        })
        .catch(error=>{
            console.log(error);
        });
        ///////////////线损损耗条目////////////////////
        document.getElementById('fx_sh_xs_data').style.width='100%';
        var myxs = echarts.init(document.getElementById('fx_sh_xs_data'),'dark');	
        var Xs_bing = { 

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"//百分比
            },
            toolbox: {
                    show : true,
                    feature : {
                        dataView : {show: true, readOnly: false},
                        
                        restore : {show: true},
                        saveAsImage : {show: true}
                }},
            //数据信息
            series : [
                {
                    name: '线损损耗',
                    type: 'pie',
                    radius : '49%',//大小
                    center: ['50%', '50%'],//显示位置
                    data:[
                        {value:1500, name:'1000kV'},
                        {value:310, name:'750kV'},
                        {value:234, name:'500kV'},
                        {value:245, name:'250kV'},
                    
                    ],
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
        myxs.setOption(Xs_bing); 
        ///////////////变损损耗饼图////////////////////
        document.getElementById('fx_sh_bs_data').style.width='100%';
        var mybs = echarts.init(document.getElementById('fx_sh_bs_data'),'dark');	
        var Bs_bing = { 

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"//百分比
            },
            toolbox: {
                    show : true,
                    feature : {
                        dataView : {show: true, readOnly: false},
                        
                        restore : {show: true},
                        saveAsImage : {show: true}
                }},
            //数据信息
            series : [
                {
                    name: '变损损耗',
                    type: 'pie',
                    radius : '49%',//大小
                    center: ['50%', '50%'],//显示位置
                    data:[
                        {value:500, name:'1000kV'},
                        {value:210, name:'750kV'},
                        {value:144, name:'500kV'},
                        {value:265, name:'250kV'},
                    
                    ],
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
        mybs.setOption(Bs_bing); 
        ///////////////损耗率////////////////////
        var myshl = echarts.init(document.getElementById('fx_ws_shl_data'),'dark');	
        var Shl_data = { 
            title: {
            text: "损耗率",
            textStyle:{color:"#84f1f1",fontSize:"16"},
            x: "10",
            y:"6"
        },
        tooltip: {
            trigger: "axis",//item
            formatter: "{a} <br/>{b} : {c}"
        },
        /* legend: {
            x: 'center',
            y: "30" ,
            data: ["损耗率"]
        },*/
        grid: {
                top:'25%',
                left: '5%',
                right: '8%',
                bottom: '5%',
                containLabel: true
            },
        xAxis: [
            {
                type: "category",
                name: "天",
                splitLine: {show: true},//false
                data: ["一", "二", "三", "四", "五", "六", "七", "八", "九"]
            }
        ],
        yAxis: [
            {
                type: "log",
                name: "损耗率"
            }
        ],
            toolbox: {
            show: true,
            y:'4',
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: true
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        series: [
            {
                name: "损耗率",
                type: "line",  
                data: [.5, .25, .2, .3, 1.5, .21, .002, .0005, .005]

            }
        ]
            
        };
        myshl.setOption(Shl_data); 
        ///////////////输入电量饼图////////////////////
        var mySrdl = echarts.init(document.getElementById('fx_ws_sr_data'),'dark');
        var Srdl_data = {
            title: {
            text: "输入电量",
            x: "10",
            y:"0"
        },

            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"//百分比
            },
            /*legend: {
            orient: 'vertical',
                left: '0',
                top: '5',

                data: ['电厂上网','地区反送','大用户反送','购外省']
                
            },*/

            //工具条
            toolbox: {
                show : true,
                feature : {

                    mark : {show: true},

                    dataView : {show: true, readOnly: false},

                    restore : {show: true},

                    saveAsImage : {show: true}

                }
            },
            
            calculable : true,
            
            //数据信息
            series : [
                {
                    name: '输入电量',
                    type: 'pie',
                    radius : '54%',//大小
                    center: ['53%', '60%'],//显示位置
                    data:[
                        {value:1500, name:'电厂上网'},
                        {value:310, name:'地区反送'},
                        {value:234, name:'大用户反送'},
                        {value:245, name:'购外省'},
            
                    ],
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
        // 指定的配置项和数据显示图表。
        mySrdl.setOption(Srdl_data);
        ///////////////输出电量饼图////////////////////
        var myScdl = echarts.init(document.getElementById('fx_ws_sc_data'),'dark');

        // 指定采集覆盖率图表的配置项和数据
        var Scdl_data = {
            title: {
            text: "输出电量",
            x: "10",
            y:"0"
        },

            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"//百分比
            },
            /*legend: {
            orient: 'vertical',
                left: '0',
                top: '5',

                data: ['地区下网','主变下网','大用户','送外省']
                
            },*/

            //工具条
            toolbox: {
                show : true,
                feature : {

                    mark : {show: true},

                    dataView : {show: true, readOnly: false},

                    restore : {show: true},

                    saveAsImage : {show: true}

                }
            },
            
            calculable : true,
            
            //数据信息
            series : [
                {
                    name: '输出电量',
                    type: 'pie',
                    radius : '54%',//大小
                    center: ['50%', '60%'],//显示位置
                    data:[
                        {value:1400, name:'地区下网'},
                        {value:230, name:'主变下网'},
                        {value:1000, name:'大用户'},
                        {value:370, name:'送外省'},
            
                    ],
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
        // 指定的配置项和数据显示图表。
        myScdl.setOption(Scdl_data);
        ///////////////经济分析_发电能力_饼图////////////////////
        var myFdnl = echarts.init(document.getElementById('fx_jj_fd_data'),'dark');

        // 指定采集覆盖率图表的配置项和数据
        var Fdnl_data = {
            title: {
            text: "发电能力",
            x: "center",
            y:"10"
        },

            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"//百分比
            },
        

            //工具条
            toolbox: {
                show : true,
                feature : {

                    mark : {show: true},

                    dataView : {show: true, readOnly: false},

                    restore : {show: true},

                    saveAsImage : {show: true}

                },
                right:'0',
                top: '35',
            },
            
            calculable : true,
            
            //数据信息
            series : [
                {
                    name: '发电能力',
                    type: 'pie',
                    radius : '58%',//大小
                    center: ['45%', '55%'],//显示位置
                    data:[
                        {value:14000, name:'统调上网电量'},
                        {value:600, name:'非统调上网电量'},
                        {value:8000, name:'火力发电'},
                        {value:4000, name:'水力发电'},
                        {value:2000, name:'光伏发电'}
                    ],
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
        // 指定的配置项和数据显示图表。
        myFdnl.setOption(Fdnl_data);
        ///////////////经济分析_发电能力_饼图////////////////////
        var mySdnl = echarts.init(document.getElementById('fx_jj_sd_data'),'dark');

        // 指定采集覆盖率图表的配置项和数据
        var Sdnl_data = {
            title: {
            text: "售电",
            x: "center",
            y:"10"
        },

            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"//百分比
            },
        

            //工具条
            toolbox: {
                show : true,
                feature : {

                    mark : {show: true},

                    dataView : {show: true, readOnly: false},

                    restore : {show: true},

                    saveAsImage : {show: true}

                },
                right:'0',
                top: '35',
            },
            
            calculable : true,
            
            //数据信息
            series : [
                {
                    name: '售电',
                    type: 'pie',
                    radius : '58%',//大小
                    center: ['45%', '55%'],//显示位置
                    data:[
                        {value:12000, name:'地区用电负荷'},
                        {value:600, name:'大用户用电'},
                        {value:400, name:'送外省'}
                    ],
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
        // 指定的配置项和数据显示图表。
        mySdnl.setOption(Sdnl_data);
  }
}
</script>
<style>
.clearfix:after {content:"";height:0;line-height: 0;display: block;visibility: hidden;clear: both;}
</style>
