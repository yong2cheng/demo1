<template lang="html">
    <div class="count_top_middle clearfix">
        <div class="mpbdb" v-if="systemType ==1">
                <div class="mpbdb_title">500kV母平不达标情况</div>
                <div class="mpbdb_count" id="mpbdb500"></div>
        </div>
        <div class="mpbdb">
                <div class="mpbdb_title">220kV母平不达标情况</div>
                <div class="mpbdb_count" id="mpbdb220"></div>
        </div>
        <div class="mpbdb">
                <div class="mpbdb_title">110kV母平不达标情况</div>
                <div class="mpbdb_count" id="mpbdb110"></div>
        </div>
        <div class="mpbdb">
                <div class="mpbdb_title">35kV母平不达标情况</div>
                <div class="mpbdb_count" id="mpbdb35"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                mxbdb_data:'',
                systemType:''
            }
        },
        props:['datas'],
        watch: {
            datas:{
                    handler(news) {
                    this.mxbdb_data = this.datas;
                    this.getPieData();
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
            // 循环给饼图添加数据
            getPieData: function() {
                // 不同电压下母线不达标饼图
                if(this.systemType == 1) {
                    for(var i =0;i<4;i++) {
                        if(i==0) {
                            this.initMxPie(this.mxbdb_data['500kv'],'mpbdb500','500');
                        } else if(i==1) {
                            this.initMxPie(this.mxbdb_data['220kv'],'mpbdb220','220');
                        } else if(i==2) {
                            this.initMxPie(this.mxbdb_data['110kv'],'mpbdb110','110');
                        } else if(i==3) {
                            this.initMxPie(this.mxbdb_data['35kv'],'mpbdb35','35');
                        }
                    }
                } else {
                    for(var i =0;i<3;i++) {
                        if(i==0) {
                            this.initMxPie(this.mxbdb_data['220kv'],'mpbdb220','220');
                        } else if(i==1) {
                            this.initMxPie(this.mxbdb_data['110kv'],'mpbdb110','110');
                        } else if(i==2) {
                            this.initMxPie(this.mxbdb_data['35kv'],'mpbdb35','35');
                        }
                    }
                }
            },

            // 母线不达标率饼图
            initMxPie: function(pieData,idbq,dy) {
                var mxbdb_pie,name = '',datas = [];
                if(dy !='') {
                    name = dy+'kv不达标数(占比)';
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
    </style>
       
   