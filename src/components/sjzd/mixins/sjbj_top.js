var mixins={
    data() {
        return{
            user : '' ,
            mrids : '8000600090' ,
            exceptData: {},
            erroTypeSzie: 0,
            dataChangeLogs: {
              devId: this.mrids,
              occurTimeStr: '2018-01-25 17:00:00',
              dataTimeStr: this.currentDate,
              originPap: 0,
              originRap: 0,
              newPap: 0,
              newRap: 0,
              policy: 1,
              policyName: '手动修改',
              userId: this.user
            },
            showHis: false,
            reBusBar: {
              pathName: ''
            },
            pickLogs: {},
            hisLogs: [],
            picked: {},
        }
    },
    created() {
        this.exception();
    },
    mounted:function(){
        var that = this;
        hub.$on('getMsg', function(res) { //修改主表电量，更新pap rap底码相关数据
            that.dataChangeLogs.newPap = res.newPap;
            that.dataChangeLogs.newRap = res.newRap;
            that.dataChangeLogs.occurTimeStr = res.occurTime;
            that.dataChangeLogs.originPap = res.originPap;
            that.dataChangeLogs.originRap = res.originRap;
            that.dataChangeLogs.policy = res.policy;
            this.policyName = res.policyName
        });
        hub.$on("sendBusBar", function(res) { //修改主表电量，重计算电表底码，重计算
            that.reBusBar.pathName = res.pathName;
        })
    },
    methods: {
        exception: function() { //获取所有异常情况和指标情况
          var that = this;
        //   this.$http.get(ip + '/dataDiagnoseService/dataDiagnose/getLossRateAndExcept?appkey=3917230828&sign=' + userToken + '&devId=' + mrids + '&date=' + day_date)
          this.$http.get(`http://10.172.246.233:88/servicequery/query/getLossRateAndExcept?appkey=3917230828&sign=gUAR6s0wJ5eiSa3Jev56H8biA8pAVf7fhPvcqR5MO7y82DPXujlKYFEXCuAnU7OZ.JYawg2sXUYtDjkw_vHIEA--___1527215291056___8000400001___8000400001___8000400001___2___&devId=6101000011204000501&date=2018-03`)
          .then(res=> {
            if (res) {
              that.exceptData = res.data.lossRateAndExceptVO;
              res.data.lossRateAndExceptVO.exceptionDeals ? that.erroTypeSzie = res.data.lossRateAndExceptVO.exceptionDeals.length : that.erroTypeSzie = 0;
            }
          })
        },
        saveData: function() { //保存记录
            var that = this;
            if (app2.change) {
                this.$http.post(ip + '/dataDiagnoseService/dataDiagnose/postDataChangedLogs?appkey=3917230828&sign=' + userToken, {
                dataChangeLogsJson: JSON.stringify(that.dataChangeLogs)
                }).then(res=> {
                    console.log(res);
                })
            }
        },
        reCalculation: function() { //重计算
            var typeNum = 1;
            if (app2.switchTariff) {
                typeNum = 1
            } else {
                typeNum = 2
            }
            this.$http.post(ip + '/dataDiagnoseService/dataDiagnose/reEnergys?appkey=3917230828&sign=' + userToken, {
                stId: sbtId,
                meterIds: mrids,
                taskDetail: app1.reBusBar.pathName,
                date: day_date,
                type: typeNum
            }).then(res=> {
                if (res.status == "SUCCEED") {
                    alert("保存成功！")
                }
            })
        },
        restoreDate: function() { //获取修改记录
            var that = this;
            this.$http.get(ip + '/dataDiagnoseService/dataDiagnose/getDataChangedLogs?appkey=3917230828&sign=' + userToken + '&devId=' + mrids + '&userId=' + user)
            .then(res=> {
                that.hisLogs = res.dataChangeLogsVOS;
            })
            },
            updateStatus: function() { //更新电表底码状态
            var that = this;
            if (app2.change) {
                if (app2.switchTariff) {
                this.$http.post(ip + '/dataDiagnoseService/dataDiagnose/updateStatus?appkey=3917230828&sign=' + userToken + '&devId=' + mrids + '&value=' + app2.mainUperTariffPaps + '&pulseType=1&date=' + day_date + '&type=1')
                .then(res=> {})
                .then(this.$http.post(ip + '/dataDiagnoseService/dataDiagnose/updateStatus?appkey=3917230828&sign=' + userToken + '&devId=' + mrids + '&value=' + app2.mainUperTariffRaps + '&pulseType=2&date=' + day_date + '&type=1')
                .then(res=> {
                    // console.log(res);
                })).then(that.reCalculation());
                } else {
                this.$http.post(ip + '/dataDiagnoseService/dataDiagnose/updateStatus?appkey=3917230828&sign=' + userToken + '&devId=' + mrids + '&value=' + app2.mainLowerTariffPaps + '&pulseType=1&date=' + day_date + '&type=2')
                .then(res=> {
                    // console.log(res);
                }).then(this.$http.post(ip + '/dataDiagnoseService/dataDiagnose/updateStatus?appkey=3917230828&sign=' + userToken + '&devId=' + mrids + '&value=' + app2.mainLowerTariffRaps + '&pulseType=2&date=' + day_date + '&type=2')
                .then(res=> {
                    // console.log(res);
                })).then(that.reCalculation());
    
                }
            }
        },
        reupdateStatus: function() { //更新电表底码状态,点击还原列表
            var that = this;
            this.$http.post(ip + '/dataDiagnoseService/dataDiagnose/updateStatus?appkey=3917230828&sign=' + userToken + '&devId=' + mrids + '&value=' + app2.mainUperTariffPaps + '&pulseType=1&date=' + day_date + '&type=1')
            .then(res=> {
                // console.log(res);
                }).then(this.$http.post(ip + '/dataDiagnoseService/dataDiagnose/updateStatus?appkey=3917230828&sign=' + userToken + '&devId=' + mrids + '&value=' + app2.mainUperTariffRaps + '&pulseType=2&date=' + day_date + '&type=1')
                .then(res=> {
                    // console.log(res);
                }))
                .then(that.reCalculation());
            },
            clearPicked: function() { //清空选择项
            this.picked = {};
            },
            goBackLogs: function() {
            var that = this;
            if (Object.keys(that.picked).length != 0) { //是否选中或者为空
                this.filter_pap(that);
                this.reupdateStatus();
    
            }
        },
        filter_pap: function(that) { //匹配还原的数据
            app2.papData.days.forEach(function(item, index) {
                if (item == that.picked.dataTimeStr) {
                app2.papData.tariff[index] = parseInt(that.picked.newPap);
                app2.rapData.tariff[index] = parseInt(that.picked.newRap);
                app2.mainUperTariffPaps = that.picked.newPap;
                app2.mainUperTariffRaps = that.picked.newRap;
                // console.log(app2.mainUperTariffPaps);
                }
            })
        },
    }
}
export default mixins;
  