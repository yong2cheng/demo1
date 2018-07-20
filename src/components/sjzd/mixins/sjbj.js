var mixins={
    data() {
        return{
            papData: { //正向有功，数据集合
                days: [],
                elec: [],
                mean: [],
                max: [],
                min: [],
                sqareError: [],
                tariff: [],
                endtoEndData: [],
                endtoEndData: [],
                secondElec: [],
                estimateTariff: []
            },
            rapData: { //反向有功，数据集合
                days: [],
                elec: [],
                mean: [],
                max: [],
                min: [],
                sqareError: [],
                tariff: [],
                endtoEndData: [],
                endtoEndData: [],
                secondElec: [],
                estimateTariff: []
            },
            mainElecPaps: 0, //主表数据（电量）,用作计算
            mainElecRaps: 0, //主表数据（电量）,用作计算
            zerop: 0, //主表电量p+
            zeroj: 0, //主表电量p-
            mainUperTariffPap: 0, //主表底码p+,上表底
            mainUperTariffRap: 0, //主表底码p-，上表底
            mainUperTariffPaps: 0, //主表底码p+,用作计算，上表底
            mainUperTariffRaps: 0, //主表底码p-,用作计算，上表底
            mainLowerTariffPap: 0,
            mainLowerTariffRap: 0,
            mainLowerTariffPaps: 0,
            mainLowerTariffRaps: 0,
            ratio: 1,
            fous: true,
            rightTable: {}, //右侧表格
            policy: 1, //修复策略Id
            bubly: 3, //气泡
            change: false, //防止没有任何更改时，提交数据
            busbarId: '', //母平模型id
            aclineId: '', //分线模型Id
            formulaBus: {}, //母平公式
            formulaAc: {}, //分线公式
            lossRateBus: 0, //当前时间母平损耗率
            lossRateAc: 0, //当前时间分线损耗率
            RateBus: null, //母平，用作计算
            RateAc: null, //分线，用作计算
            switchTariff: true, //上表码，下表吗状态切换
            differBus: 0,
            differAc: 0,
            meta: '月', //单位
            bubbly: false,
            policyName : ["手动修改", "积分电量", '对端电量', '副表电量'] ,//修改规则
        }
    },
    created() {
        this.$http.get(`http://10.172.246.233:88/servicequery/query/getElecDataExSta?appkey=3917230828&sign=keve1KKKLv7HIJdDO1R3MFi5UU3V42DfrQOtgD33DITn0QUoVz8YAI4R3AkVz22XoR8W686F5NB4QklYCdzNzw--___1525329627169___8000400001___8000400001___8000400001___2___&date=2018-03&userId=8000400001`)
        // this.$http.get(`/dataDiagnoseService/dataDiagnose/getElecDataExSta?appkey=3917230828&sign=keve1KKKLv7HIJdDO1R3MFi5UU3V42DfrQOtgD33DITn0QUoVz8YAI4R3AkVz22XoR8W686F5NB4QklYCdzNzw--___1525329627169___8000400001___8000400001___8000400001___2___&date=2018-03&userId=8000400001`)
            .then((res) => {
              this.elecData = res.data.elecDataExStaVOS;
            })
        
        this.getLeftPap();
        // this.getRightPap();
        // this.getTableData();
        // this.getModelIdByMeterId1();
    },
    mounted:function(){
        this.chart1();
        this.chart2();
        this.chart3();
        this.chart4();
    },
    methods: {
        chart1: function() {
          ////////////////////////////数据编辑曲线/////////////////////////
          var dbpgqx_data = echarts.init(document.getElementById('pap_chart'), 'dark');
          var dbpgqx_option = {
            title: {
              text: '正向有功',
              textStyle: {
                fontSize: 14
              },
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['底码', '预估值', '均值', '方差'],
              top: 16
            },
            grid: {
              left: '3%',
              right: '9%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              name: this.meta,
              boundaryGap: false,
                  // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
              data: this.splitPapDay(this.papData.days)
            },
            yAxis: {
              type: 'value',
              //name: '电量值'
            },
            series: [{
                name: '底码',
                type: 'line',
                // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                data: this.papData.tariff
              },
              {
                name: '预估值',
                type: 'line',
                // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                data: this.papData.estimateTariff
              },
              {
                name: '均值',
                type: 'line',
                // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                data: this.papData.mean
              },
              {
                name: '方差',
                type: 'line',
                // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                data: this.papData.sqareError
              }
            ]
          };
          dbpgqx_data.setOption(dbpgqx_option);
          return dbpgqx_data;
        },
        chart2: function() {
          //反向有功曲线图
          var rap_chart = echarts.init(document.getElementById('rap_chart'), 'dark');
          var rap_option = {
            title: {
              text: '反向有功',
              textStyle: {
                fontSize: 14
              },
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['底码', '预估值', '均值', '方差'],
              top: 16
            },
            grid: {
              left: '3%',
              right: '9%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              name: this.meta,
              boundaryGap: false,
                  // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
              data: this.splitPapDay(this.rapData.days)
            },
            yAxis: {
              type: 'value'
            },
            series: [{
                name: '底码',
                type: 'line',
                    // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                data: this.rapData.tariff
              },
              {
                name: '预估值',
                type: 'line',
                    // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                data: this.rapData.estimateTariff
              },
              {
                name: '均值',
                type: 'line',
                    // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                data: this.rapData.mean
              },
              {
                name: '方差',
                type: 'line',
                    // data: ['0', 2, 3, 4, 5, 6, 7, 8, 9, 10]
                data: this.rapData.sqareError
              }
            ]
          };
          rap_chart.setOption(rap_option);
          return rap_chart;
        },
        chart3: function() {
          //右边指标区域
          //指标一
          var area_chart1 = echarts.init(document.getElementById('area_one'), 'dark');
          var area_option1 = {
            title: {
              text: '正向有功电量',
              textStyle: {
                fontSize: 14
              },
            },
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: ['电量值', '最大值', '最小值', '积分电量', '副表电量', '对端电量'],
              top: 20
            },
            grid: {
              left: '3%',
              right: '9%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              name: this.meta,
              boundaryGap: false,
              // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              data: this.splitPapDay(this.papData.days)
            },
            yAxis: {
              type: 'value'
            },
            series: [{
                name: '电量值',
                type: 'line',
                // data: [-300, 500, 400, 100, 310, 230, 360],
                data: this.papData.elec
              }, {
                name: '最大值',
                type: 'line',
                // data: [500, 500, 500, 500, 500, 500, 500],
                data: this.papData.max
              }, {
                name: '最小值',
                type: 'line',
                // data: [100, 100, 100, 100, 100, 100, 100],
                data: this.papData.min
              },
              {
                name: '积分电量',
                type: 'line',
                // data: [700, 700, 700,700, 700, 770,400],
                data: this.papData.powerIntegration
              },
              {
                name: '对端电量',
                type: 'line',
                // data: [200, 200, 200, 200, 200, 200, 200],
                data: this.papData.endtoEndData
              }, {
                name: '副表电量',
                type: 'line',
                // data: [300, 300, 300, 300, 300, 300, 300],
                data: this.papData.secondElec
              }
            ]
          };
          area_chart1.setOption(area_option1);
          return area_chart1;
        },
        chart4: function() {
          //指标二
          var area_chart2 = echarts.init(document.getElementById('area_tow'), 'dark');
          var area_option2 = {
            title: {
              text: '反向有功电量',
              textStyle: {
                fontSize: 14
              },
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['电量值', '最大值', '最小值', '积分电量', '副表电量', '对端电量'],
              top: 20
            },
            grid: {
              left: '3%',
              right: '9%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              name: this.meta,
              boundaryGap: false,
              // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              data: this.splitPapDay(this.rapData.days)
            },
            yAxis: {
              type: 'value'
            },
            series: [{
                name: '电量值',
                type: 'line',
                // data: [-300, 500, 400, 100, 310, 230, 360],
                data: this.rapData.elec
              }, {
                name: '最大值',
                type: 'line',
                // data: [500, 500, 500, 500, 500, 500, 500],
                data: this.rapData.max
              }, {
                name: '最小值',
                type: 'line',
                // data: [100, 100, 100, 100, 100, 100, 100],
                data: this.rapData.min
              },
              {
                name: '积分电量',
                type: 'line',
                // data: [700, 700, 700,700, 700, 770,400],
                data: this.rapData.powerIntegration
              },
              {
                name: '对端电量',
                type: 'line',
                // data: [200, 200, 200, 200, 200, 200, 200],
                data: this.rapData.endtoEndData
              }, {
                name: '副表电量',
                type: 'line',
                // data: [300, 300, 300, 300, 300, 300, 300],
                data: this.rapData.secondElec
              }
            ]
          };
          area_chart2.setOption(area_option2);
          return area_chart2;
        },
        clickPlus: function(val, policy) { //点击箭头重新赋值主表电量，触发运算
          if (val) {
            this.zerop = val;
            this.policy = policy;
            this.pPlus();
          }
        },
        clickPrev: function(val, policy) {
  
          if (val) {
            this.zeroj = val;
            this.policy = policy;
            this.pPrev();
          }
        },
        clickPapPlus(val, policy) {
            console.log(val);
          if (val) {
            this.mainUperTariffPaps = val;
            this.policy = policy;
            this.zerop =  Math.floor((this.mainUperTariffPap - val) * this.ratio + Number(this.mainElecPaps)* 10000)/10000; //算法,反推电量
            this.pPlus();
          }
        },
        clickRapPrev(val, policy) {
            console.log(val);
          if (val) {
            this.mainUperTariffRaps = val;
            this.policy = policy;
            this.zeroj = Math.floor((this.mainUperTariffRap - val) * this.ratio + Number(this.mainElecRaps)* 10000)/10000; //算法,反推电量
              console.log(this.zeroj);
            this.pPrev();
          }
        },
        filter_data_uper: function(to, froms, target, tariff, newTariff) { //数据过滤,筛选出当前日期的数据（主要用于正向有功反向有功的运算）
          froms.forEach((item, index)=> {
            if (item == this.currentDate) {
              app1.dataChangeLogs.dataTimeStr = this.currentDate;
              to[index] = Number(target);
              tariff[index] = Number(newTariff);
            }
          })
          return to;
        },
        filter_data_lower: function(to, froms, target, tariff, newTariff) { //数据过滤,筛选出当前日期的数据（主要用于正向有功反向有功的运算）
          froms.forEach((item, index)=> {
            if (item == this.currentDate) {
              to[index] = Number(target);
              app1.dataChangeLogs.dataTimeStr = new Date(new Date(this.currentDate).getTime() + 24 * 60 * 60 * 1000).format("yyyy-MM-dd");
              if (app2.patch('-', this.currentDate) > 1) { //说明是月数据
                tariff[index + 1] = Number(newTariff);
              }
            }
          })
          return to;
        },
        getEnergyData: function(sbtId, vlId, lineId) { //获取计算母平，分线，分压所需数据
          var that = this;
          // this.$http.get(ip + '/servicequery/query/getEnergyData?appkey=3917230828&sign=' + userToken + '&sbtId=' + sbtId + '&vlId=' + vlId + '&lineId=' + lineId + '&date=' + this.currentDate,
          this.$http.get(`http://10.172.246.233:88/servicequery/query/getEnergyData?appkey=3917230828&sign=anv58tImHofpW6WJsQtIMA73BlLASrOrqBppfa_r__tyHVW3qQYDIuXM_JeUoayiHejKFlRYnGDmRZ81qFAIlA--___1527060301831___8000400001___8000400001___8000400001___2___&sbtId=&vlId=6101000011209000352&lineId=&date=2018-03`)
            .then(res=> {
              if (sbtId) {
                // that.trans = energyData;
                console.log(that.trans);
              } else if (vlId) {
                that.busbar = res.data.energyDataVOS;
                // console.log("同一母线下当前日期所有的电表pap数据（包括当前更改的电表）");
                // console.log(that.busbar);
                // that.busbar = energyData;
              } else if (lineId) {
                that.acs = res.data.energyData;
                // console.log("同一分线下当前日期所有的电表pap数据（包括当前更改的电表）");
                // console.log(that.busbar);
              }
            })
        },
        getTableData: function() { //右侧表格的数据
          var that = this;
          // this.$http.get(ip + '/servicequery/query/getAllElecAndTariff?appkey=3917230828&sign=' + userToken + '&devId=' + mrids + '&date=' + this.currentDate, function(res) {
          this.$http.get(`http://10.172.246.233:88/servicequery/query/getAllElecAndTariff?appkey=3917230828&sign=anv58tImHofpW6WJsQtIMA73BlLASrOrqBppfa_r__tyHVW3qQYDIuXM_JeUoayiHejKFlRYnGDmRZ81qFAIlA--___1527060301831___8000400001___8000400001___8000400001___2___&devId=6101000011204000501&date=2018-03`)
          .then(res=> {
            if (res) {
              // console.log('右侧表格');
              // console.log(res);
              that.rightTable = res.data.allElecAndTariffVO;
              that.mainElecPaps = res.data.allElecAndTariffVO.mainElecPap ? res.data.allElecAndTariffVO.mainElecPap : 0;
              that.mainElecRaps = res.data.allElecAndTariffVO.mainElecRap ? res.data.allElecAndTariffVO.mainElecRap : 0;
              that.zerop = res.data.allElecAndTariffVO.mainElecPap ? res.data.allElecAndTariffVO.mainElecPap : 0;
              that.zeroj = res.data.allElecAndTariffVO.mainElecRap ? res.data.allElecAndTariffVO.mainElecRap : 0;
              that.mainUperTariffPap = res.data.allElecAndTariffVO.mainUpperTariffPap ? res.data.allElecAndTariffVO.mainUpperTariffPap : 0;
              that.mainUperTariffRap = res.data.allElecAndTariffVO.mainUpperTariffRap ? res.data.allElecAndTariffVO.mainUpperTariffRap : 0;
              that.mainUperTariffPaps = res.data.allElecAndTariffVO.mainUpperTariffPap ? res.data.allElecAndTariffVO.mainUpperTariffPap : 0;
              that.mainUperTariffRaps = res.data.allElecAndTariffVO.mainUpperTariffRap ? res.data.allElecAndTariffVO.mainUpperTariffRap : 0;
              that.mainLowerTariffPap = res.data.allElecAndTariffVO.mainLowerTariffPap ? res.data.allElecAndTariffVO.mainLowerTariffPap : 0;
              that.mainLowerTariffRap = res.data.allElecAndTariffVO.mainLowerTariffRap ? res.data.allElecAndTariffVO.mainLowerTariffRap : 0;
              that.mainLowerTariffPaps = res.data.allElecAndTariffVO.mainLowerTariffPap ? res.data.allElecAndTariffVO.mainLowerTariffPap : 0;
              that.mainLowerTariffRaps = res.data.allElecAndTariffVO.mainLowerTariffRap ? res.data.allElecAndTariffVO.mainLowerTariffRap : 0;
              that.ratio = res.data.allElecAndTariffVO.ratio ? res.data.allElecAndTariffVO.ratio : 1;
              // console.log(that.mainUperTariffPap);
            }
          })
        },
        getLeftPap: function() { //获取正向有功，与反向有功数据
          var that = this;
          that.papData.elec = []; //电量集合
          that.papData.days = []; //日期集合
          that.papData.mean = []; //平均值
          that.papData.max = []; //最大值
          that.papData.min = []; //最小值
          that.papData.sqareError = []; //方差
          that.papData.tariff = []; //底码
          that.papData.endtoEndData = []; //对端电量
          that.papData.powerIntegration = []; //积分电量
          that.papData.secondElec = []; //副表电量
          that.papData.estimateTariff = []; //预估值
          that.rapData.elec = [];
          that.rapData.days = [];
          that.rapData.mean = [];
          that.rapData.max = [];
          that.rapData.min = [];
          that.rapData.sqareError = [];
          that.rapData.tariff = [];
          that.rapData.endtoEndData = [];
          that.rapData.powerIntegration = [];
          that.rapData.secondElec = [];
          that.rapData.estimateTariff = [];
          // this.$http.get(ip + '/servicequery/query/getElecDataCurve?appkey=3917230828&sign=' + userToken + '&devId=' + mrids + '&date=' + this.currentDate,
          this.$http.get(`http://10.172.246.233:88/servicequery/query/getElecDataCurve?appkey=3917230828&sign=anv58tImHofpW6WJsQtIMA73BlLASrOrqBppfa_r__tyHVW3qQYDIuXM_JeUoayiHejKFlRYnGDmRZ81qFAIlA--___1527060301831___8000400001___8000400001___8000400001___2___&devId=6101000011204000501&date=2018-03`)
          .then(res=> {
              var elecPAP = res.data.elecDataCurvePAP;
              var elecRAP = res.data.elecDataCurveRAP;
              // var elecPAP = papDatas;
              // var elecRAP = papDatas;
              for (var i = 0; i < elecPAP.length; i++) {
                that.papData.days.push(elecPAP[i].date);
                that.papData.elec.push(elecPAP[i].elec);
                that.papData.mean.push(elecPAP[i].mean);
                that.papData.max.push(elecPAP[i].max);
                that.papData.min.push(elecPAP[i].min);
                that.papData.sqareError.push(elecPAP[i].sqareError);
                that.papData.tariff.push(elecPAP[i].tariff);
                that.papData.endtoEndData.push(elecPAP[i].endtoEndData);
                that.papData.powerIntegration.push(elecPAP[i].powerIntegration);
                that.papData.secondElec.push(elecPAP[i].secondElec);
                that.papData.estimateTariff.push(elecPAP[i].estimateTariff);
              }
              // console.log(  that.papData.days);
              for (var k = 0; k < elecRAP.length; k++) {
                that.rapData.days.push(elecRAP[k].date);
                that.rapData.elec.push(elecRAP[k].elec);
                that.rapData.mean.push(elecRAP[k].mean);
                that.rapData.max.push(elecRAP[k].max);
                that.rapData.min.push(elecRAP[k].min);
                that.rapData.sqareError.push(elecRAP[k].sqareError);
                that.rapData.tariff.push(elecRAP[k].tariff);
                that.rapData.endtoEndData.push(elecRAP[k].endtoEndData);
                that.rapData.powerIntegration.push(elecRAP[k].powerIntegration);
                that.rapData.secondElec.push(elecRAP[k].secondElec);
                that.rapData.estimateTariff.push(elecRAP[k].estimateTariff);
              }
              that.chart1();
              that.chart2();
              that.chart3();
              that.chart4();
            })
        },
        getRightPap: function() { //获取设备名称与母平，分线,分压损耗率数据
          var that = this;
          // this.$http.get(ip + '/servicequery/query/getElecDataStandardCurve?appkey=3917230828&sign=' + userToken + '&devId=' + mrids + '&date=' + this.currentDate, function(res) {
          this.$http.get(`http://10.172.246.233:88/servicequery/query/getElecDataStandardCurve?appkey=3917230828&sign=anv58tImHofpW6WJsQtIMA73BlLASrOrqBppfa_r__tyHVW3qQYDIuXM_JeUoayiHejKFlRYnGDmRZ81qFAIlA--___1527060301831___8000400001___8000400001___8000400001___2___&devId=6101000011204000501&date=2018-03`)
          .then(res=> {
            // this.$emit("sendBusBar", { //修改主表电量，重计算电表底码，跟新保存记录
            //   pathName: res.busbarsectionName,
            // });
          })
        },
        getIndexFormulaBus: function(modelId) { //获取母平计算公式
          // this.$http.get(ip + '/servicequery/query/getIndexFormula?appkey=3917230828&sign=' + userToken + '&mrid=' + modelId + '&modelType=1' + '&occurTime=' + this.currentDate, (res) => {
          this.$http.get(`http://10.172.246.233:88/servicequery/query/getIndexFormula?appkey=3917230828&sign=anv58tImHofpW6WJsQtIMA73BlLASrOrqBppfa_r__tyHVW3qQYDIuXM_JeUoayiHejKFlRYnGDmRZ81qFAIlA--___1527060301831___8000400001___8000400001___8000400001___2___&mrid=6101000011209000352&modelType=1&occurTime=2018-03`)
          .then(res => {
            this.formulaBus = res.data.formulaAndDataVO;
            this.lossRateBus = this.calculateBus(res.formulaAndDataVO); //计算后的母平损耗率
            this.RateBus = this.calculateInit(res.formulaAndDataVO);
            console.log(this.lossRateBus);
            console.log(this.RateBus);
          });
        },
        getIndexFormulaAc: function(that, modelId) { //获取分线计算公式
          // this.$http.get(ip + '/servicequery/query/getIndexFormula?appkey=3917230828&sign=' + userToken + '&mrid=' + modelId + '&modelType=2' + '&occurTime=' + this.currentDate, function(res) {
          this.$http.get(`http://10.172.246.233:88/servicequery/query/getIndexFormula?appkey=3917230828&sign=anv58tImHofpW6WJsQtIMA73BlLASrOrqBppfa_r__tyHVW3qQYDIuXM_JeUoayiHejKFlRYnGDmRZ81qFAIlA--___1527060301831___8000400001___8000400001___8000400001___2___&mrid=6101000011209000352&modelType=2&occurTime=2018-03`)
          .then(res => {
            that.formulaAc = res.data.formulaAndDataVO;;
            that.lossRateAc = that.calculateInit(res.formulaAndDataVO); //分线损耗率
            that.RateAc = that.calculateInit(res.formulaAndDataVO);
          });
        },
        getModelIdByMeterId1: function() { //获取计算公式前置，获取模型id,母线
          var that = this;
          var id = '';
          // this.$http.get(ip + '/servicequery/query/getModelIdByMeterId?appkey=3917230828&sign=' + userToken + '&occurTime=' + this.currentDate + '&devId=' + mrids + '&modelType=1', function(res) {
          this.$http.get(`http://10.172.246.233:88/servicequery/query/getModelIdByMeterId?appkey=3917230828&sign=anv58tImHofpW6WJsQtIMA73BlLASrOrqBppfa_r__tyHVW3qQYDIuXM_JeUoayiHejKFlRYnGDmRZ81qFAIlA--___1527060301831___8000400001___8000400001___8000400001___2___&occurTime=2018-03&devId=6101000011204000501&modelType=1`)
          .then(res=> {
            if (Object.keys(res.data).length !== 0) {
              that.busbarId = res.data.vlId;
              id = res.data.vlId
              that.getIndexFormulaBus(id)
              that.getEnergyData('', id, '');
            } else {
              alert("母线Id获取异常！！")
            }
          });
        },
        getModelIdByMeterId2: function() { //获取计算公式前置，获取模型id,分线
          var that = this;
          var id = '';
          // this.$http.get(ip + '/servicequery/query/getModelIdByMeterId?appkey=3917230828&sign=' + userToken + '&occurTime=' + this.currentDate + '&devId=' + mrids + '&modelType=2', function(res) {
          this.$http.get(`http://10.172.246.233:88/servicequery/query/getModelIdByMeterId?appkey=3917230828&sign=anv58tImHofpW6WJsQtIMA73BlLASrOrqBppfa_r__tyHVW3qQYDIuXM_JeUoayiHejKFlRYnGDmRZ81qFAIlA--___1527060301831___8000400001___8000400001___8000400001___2___&occurTime=2018-03&devId=6101000011204000501&modelType=2`)
          .then(res=> {
            that.getIndexFormulaAc(that, '1030000160620018208');
            if (Object.keys(res.data).length !== 0) {
              that.aclineId = res.data.aclineId;
              id = res.data.aclineId;
              that.getIndexFormulaAc(that, id)
              that.getEnergyData('', '', id);
            } else {
              alert("分线Id获取异常！！")
            }
          });
        },
        switchTariffs: function() { //切换上下底码，处理数据
          this.change = false;
          this.bubbly = true;
          setTimeout(() => {
            this.bubbly = false;
          }, 800)
          this.mainUperTariffPaps = this.mainUperTariffPap;
          this.mainUperTariffRaps = this.mainUperTariffRap;
          this.mainLowerTariffPaps = this.mainLowerTariffPap;
          this.mainLowerTariffRaps = this.mainLowerTariffRap;
          this.zerop = this.mainElecPaps;
          this.zeroj = this.mainElecRaps;
          this.pPlus();
          this.pPrev();
        },
        pPlus: function() {
          var that = this;
          that.change = true;
          if (that.switchTariff) {
            this.mainUperTariffPaps = this.mainUperTariffPap - (Number(this.zerop) - Number(this.mainElecPaps)) / that.ratio; //算法
            that.filter_data_uper(that.papData.elec, this.papData.days, this.zerop, this.papData.tariff, this.mainUperTariffPaps); //匹配那一天的数据
            hub.$emit("getMsg", { //修改主表电量，重计算电表底码，跟新保存记录
              originPap: this.mainUperTariffPap,
              newPap: this.mainUperTariffPaps,
              originRap: this.mainUperTariffRap,
              newRap: this.mainUperTariffRaps,
              occurTime: this.TimeConvert(Date.parse(new Date())/1000 , 'sfm'),
              policy: this.policy,
              policyName: this.policyName[this.policy - 1]
            });
            // console.log("更改主表数据，重计算后，正向有功所有折线图数据");
            // console.log(this.papData.elec);
          } else {
            this.mainLowerTariffPaps = (Number(this.zerop) - Number(this.mainElecPaps)) / that.ratio + this.mainLowerTariffPap; //算法
            that.filter_data_lower(that.papData.elec, this.papData.days, this.zerop, this.papData.tariff, this.mainLowerTariffPaps); //匹配那一天的数据
            hub.$emit("getMsg", { //修改主表电量，重计算电表底码，跟新保存记录
              originPap: this.mainLowerTariffPap,
              newPap: this.mainLowerTariffPaps,
              originRap: this.mainLowerTariffRap,
              newRap: this.mainLowerTariffRaps,
              occurTime: this.TimeConvert(Date.parse(new Date())/1000 , 'sfm'),
              policy: this.policy,
              policyName: this.policyName[this.policy - 1]
            });
            // console.log("更改主表数据，重计算后，正向有功所有折线图数据");
            // console.log(this.papData.elec);
          }
          this.chart1();
          this.chart3();
        },
        pPrev: function() {
          var that = this;
          var rate = 2000; //倍率
          that.change = true;
          if (that.switchTariff) {
            this.mainUperTariffRaps = this.mainUperTariffRap - (Number(this.zeroj) - Number(this.mainElecRaps)) / that.ratio; //算法
            that.filter_data_uper(that.rapData.elec, this.rapData.days, this.zeroj, this.rapData.tariff, this.mainUperTariffRaps); //匹配那一天的数据
            hub.$emit("getMsg", {
              originPap: this.mainUperTariffPap,
              newPap: this.mainUperTariffPaps,
              originRap: this.mainUperTariffRap,
              newRap: this.mainUperTariffRaps,
              occurTime: this.TimeConvert(Date.parse(new Date())/1000 , 'sfm'),
              policy: this.policy,
              policyName: this.policyName[this.policy - 1]
            });
            // that.calculate();
          } else {
            this.mainLowerTariffRaps = (this.zeroj - this.mainElecRaps) / that.ratio + this.mainLowerTariffRap; //算法
            that.filter_data_lower(that.rapData.elec, this.rapData.days, this.zeroj, this.rapData.tariff, this.mainLowerTariffRaps); //匹配那一天的数据
            hub.$emit("getMsg", {
              originPap: this.mainLowerTariffPap,
              newPap: this.mainLowerTariffPaps,
              originRap: this.mainLowerTariffRap,
              newRap: this.mainLowerTariffRaps,
              occurTime: this.TimeConvert(Date.parse(new Date())/1000 , 'sfm'),
              policy: this.policy,
              policyName: this.policyName[this.policy - 1]
            });
          }
          this.chart2();
          this.chart4();
          //假装有公式
        },
        calculateBus: function(formulas, val, type) { //计算母平，分享损耗率
          if (formulas.formula) {
            var flu = formulas.configDatas
            var formul = formulas.formula.replace(/@/g, '$');
            var arr = [] //电量值集合，测试观察用
            for (var item of flu) {
              if (item.devId == mrids && item.pulseType == type) {
                eval("var $" + item.numero + "=" + val);
              } else {
                eval("var $" + item.numero + "=" + item.value);
              }
              arr.push(eval("$" + item.numero))
            }
            if (eval(formul) == "Infinity" || eval(formul) == "-Infinity" || !eval(formul)) {
              console.log(eval(formul));
              return 0;
            } else {
              console.log(eval(formul));
              return (eval(formul)).toFixed(4); //保留四位小数
            }
          }
        },
        calculateInit(formulas) { //母平初始值
          if (formulas.formula) {
            var flu = formulas.configDatas
            var formul = formulas.formula.replace(/@/g, '$');
            for (var item of flu) {
              eval("var $" + item.numero + "=" + item.value);
            }
            if (eval(formul) == "Infinity" || eval(formul) == "-Infinity" || !eval(formul)) {
              console.log(eval(formul));
              return 0;
            } else {
              console.log(eval(formul));
              return (eval(formul)).toFixed(4); //保留四位小数
            }
          }
        },
        patch: function(re, s) { //匹配某一字符串出现的个数
          re = eval("/" + re + "/ig")
          return s.match(re).length;
        },
        splitPapDay: function(arr) { //截取图表x轴日期单位,
          var that = this;
          var result = [];
          if(arr.length){
            for (var item of arr) {
              result.push(item.split('-').pop());
            }
          }
          return result;
        },
        fmtNum(val) {
          if (val=='NaN'||val=='undefined') {
            return '';
          }else if (val =='0') {
              return 0;
          }else {
              return val;
          }
        },
        differBu() {
          return (this.lossRateBus - this.RateBus).toFixed(4);
        }
    },
    watch: {
        'zerop': {
          handler: function(news, old) {
            if (news !== '') {
              this.lossRateBus = this.formulaBus.formula ? this.calculateBus(this.formulaBus, news, 1) : this.RateBus; //计算后的母平损耗率
              // this.lossRateAc = this.calculateBus(this.formulaAc);//计算后分线损耗率
              // this.differBus = Math.floor(Math.abs(this.lossRateBus - this.RateBus) * 10000) / 10000; //母平差值
              // this.differAc =  Math.floor(Math.abs(this.lossRateAc - this.RateAc)* 10000)/10000;//分线差值
            }
          },
          deep: true
        },
        'zeroj': {
          handler: function(news, old) {
            if (news != '') {
              this.lossRateBus = this.formulaBus.formula ? this.calculateBus(this.formulaBus, news, 2) : this.RateBus; //计算后的母平损耗率
              // this.lossRateAc = this.calculateBus(this.formulaAc);//分线损耗率
              // this.differBus = Math.round(Math.abs(this.lossRateBus - this.RateBus) * 10000) / 10000; //母平差值
              // this.differAc =  Math.floor(Math.abs(this.lossRateAc - this.RateAc)* 10000)/10000;//分线差值
            }
          },
          deep: true
        },
    }
}
export default mixins;
  