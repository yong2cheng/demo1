var mixins = {
    mounted() {
        this.chart1();
        this.chart2();
        this.chart3();
        this.chart4();
    },
    methods: {
        chart1: function () {
            var dbpgqx_data = echarts.init(
                document.getElementById("pap_chart"),
                "dark"
            );
            var dbpgqx_option = {
                title: {
                    text: "正向有功",
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["底码", "预估值", "均值", "方差"],
                    top: 16
                },
                grid: {
                    left: "3%",
                    right: "9%",
                    bottom: "3%",
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: "category",
                    name: this.meta,
                    boundaryGap: false,
                    // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    data: this.splitPapDay(this.papData.days)
                },
                yAxis: {
                    type: "value"
                    //name: '电量值'
                },
                series: [
                    {
                        name: "底码",
                        type: "line",
                        // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        data: this.papData.tariff
                    },
                    {
                        name: "预估值",
                        type: "line",
                        // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        data: this.papData.estimateTariff
                    },
                    {
                        name: "均值",
                        type: "line",
                        // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        data: this.papData.mean
                    },
                    {
                        name: "方差",
                        type: "line",
                        // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        data: this.papData.sqareError
                    }
                ]
            };
            dbpgqx_data.setOption(dbpgqx_option);
            return dbpgqx_data;
        },
        chart2: function () {//反向有功曲线图
            var rap_chart = echarts.init(
                document.getElementById("rap_chart"),
                "dark"
            );
            var rap_option = {
                title: {
                    text: "反向有功",
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["底码", "预估值", "均值", "方差"],
                    top: 16
                },
                grid: {
                    left: "3%",
                    right: "9%",
                    bottom: "3%",
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: "category",
                    name: this.meta,
                    boundaryGap: false,
                    // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    data: this.splitPapDay(this.rapData.days)
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "底码",
                        type: "line",
                        // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        data: this.rapData.tariff
                    },
                    {
                        name: "预估值",
                        type: "line",
                        // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        data: this.rapData.estimateTariff
                    },
                    {
                        name: "均值",
                        type: "line",
                        // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        data: this.rapData.mean
                    },
                    {
                        name: "方差",
                        type: "line",
                        // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        data: this.rapData.sqareError
                    }
                ]
            };
            rap_chart.setOption(rap_option);
            return rap_chart;
        },
        chart3: function () {//右边指标区域 //指标一
            var area_chart1 = echarts.init(
                document.getElementById("area_one"),
                "dark"
            );
            var area_option1 = {
                title: {
                    text: "正向有功电量",
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: [
                        "电量值",
                        "最大值",
                        "最小值",
                        "积分电量",
                        "副表电量",
                        "对端电量"
                    ],
                    top: 20
                },
                grid: {
                    left: "3%",
                    right: "9%",
                    bottom: "3%",
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: "category",
                    name: this.meta,
                    boundaryGap: false,
                    // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    data: this.splitPapDay(this.papData.days)
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "电量值",
                        type: "line",
                        // data: [-300, 500, 400, 100, 310, 230, 360],
                        data: this.papData.elec
                    },
                    {
                        name: "最大值",
                        type: "line",
                        // data: [500, 500, 500, 500, 500, 500, 500],
                        data: this.papData.max
                    },
                    {
                        name: "最小值",
                        type: "line",
                        // data: [100, 100, 100, 100, 100, 100, 100],
                        data: this.papData.min
                    },
                    {
                        name: "积分电量",
                        type: "line",
                        // data: [700, 700, 700,700, 700, 770,400],
                        data: this.papData.powerIntegration
                    },
                    {
                        name: "对端电量",
                        type: "line",
                        // data: [200, 200, 200, 200, 200, 200, 200],
                        data: this.papData.endtoEndData
                    },
                    {
                        name: "副表电量",
                        type: "line",
                        // data: [300, 300, 300, 300, 300, 300, 300],
                        data: this.papData.secondElec
                    }
                ]
            };
            area_chart1.setOption(area_option1);
            return area_chart1;
        },
        chart4: function () { //指标二
            var area_chart2 = echarts.init(
                document.getElementById("area_tow"),
                "dark"
            );
            var area_option2 = {
                title: {
                    text: "反向有功电量",
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: [
                        "电量值",
                        "最大值",
                        "最小值",
                        "积分电量",
                        "副表电量",
                        "对端电量"
                    ],
                    top: 20
                },
                grid: {
                    left: "3%",
                    right: "9%",
                    bottom: "3%",
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: "category",
                    name: this.meta,
                    boundaryGap: false,
                    // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    data: this.splitPapDay(this.rapData.days)
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "电量值",
                        type: "line",
                        // data: [-300, 500, 400, 100, 310, 230, 360],
                        data: this.rapData.elec
                    },
                    {
                        name: "最大值",
                        type: "line",
                        // data: [500, 500, 500, 500, 500, 500, 500],
                        data: this.rapData.max
                    },
                    {
                        name: "最小值",
                        type: "line",
                        // data: [100, 100, 100, 100, 100, 100, 100],
                        data: this.rapData.min
                    },
                    {
                        name: "积分电量",
                        type: "line",
                        // data: [700, 700, 700,700, 700, 770,400],
                        data: this.rapData.powerIntegration
                    },
                    {
                        name: "对端电量",
                        type: "line",
                        // data: [200, 200, 200, 200, 200, 200, 200],
                        data: this.rapData.endtoEndData
                    },
                    {
                        name: "副表电量",
                        type: "line",
                        // data: [300, 300, 300, 300, 300, 300, 300],
                        data: this.rapData.secondElec
                    }
                ]
            };
            area_chart2.setOption(area_option2);
            return area_chart2;
        },
    }
}
export default mixins;