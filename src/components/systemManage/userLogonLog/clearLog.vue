<template lang="html">
    <div class="overlay_tc_count" style="width:520px;height: 200px;"> 
        <div class="tc_count_title" style="border-bottom: 1px dashed #0d7474;margin-bottom: 10px">
            <h2 class="clearfix">清除日志
            </h2>
        </div>
        <div >
            <div class="clearfix">
                <ul class="clearfix" style="width: auto">
                    <li>
                        <label>请选择时间范围:</label>
                        <el-date-picker
                            style="height: 40px;line-height: 40px;background-color: #012323;"
                            v-model="time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            unlink-panels>
                        </el-date-picker>
                    </li>
                </ul>
            </div>
            <div style="text-align: center;margin-top: 30px">
                <button @click="cancel()">取消</button>
                <button class="warning" @click="" @click="clear()">清除</button>
            </div>
        </div>
    </div>
</template>
    
<script>
    export default {
        data: function() {
            return {
                token:'',
                pageSize:10,
                pageIndex:0,
                pojoTotalCount:null,
                pageCount:null,
                loginInfoPage:'',
                time:''
            }
        },
        components:{
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
        },
        mounted: function() {
        },
        methods: {
            // 查询用户日志列表
            getUserListPage() {
                this.$http.get("/systemManagementService/systemMaintenanceService/deleteLogByLoginTime",{
                    params:{
                        sign:this.token,
                        startDate:this.time[0],
                        endDate:this.time[1]
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.$emit('changeSat', 2)//触发自定义事件
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                })
            },
            // 取消清除
            cancel() {
                this.$emit('changeSat', 1)//触发自定义事件
            },
            // 清楚日志
            clear() {
                if(this.time) {
                    this.getUserListPage()
                } else {
                    this.$notify({
                        title: '提示',
                        message:  '请先选择时间范围！',
                        duration:1000,
                        type:'warning'
                    });
                }
            }
        }
    }
</script>
    
<style lang="css">
</style>
                    