<template lang="html">
<div class="overlay_tc_count"> 
        <div class="tc_count_title">
            <h2 class="clearfix">{{datas.userDate.userName}}用户明细
            </h2>
        </div>
        <div class="tc_count_body">
            <div class="tc_count_tool clearfix">
                <ul class="clearfix">
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
                <button @click="searchDetails()">查询</button>
            </div>
            <div class="tc_count_table">
            <div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>用户名</td>
                            <td>所属地区</td>
                            <td>登录时间</td>
                            <td>登录ip</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="scroll1" style="position:relative;height:351px;overflow:hidden;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                    <tbody>
                        <tr v-for="(item,index) in loginInfoPage">
                            <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                            <td>{{item.userName}}</td>
                            <td>{{item.systemName}}</td>
                            <td>{{item.loginTime}}</td>
                            <td>{{item.ipAddress}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            <el-pagination
                background
                class="pagings"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[10,20,100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pojoTotalCount">
            </el-pagination>
        </div>
        <!-- <loading :isLoading='loading'></loading> -->
    </div>
</template>
    
<script>
    import BScroll from 'better-scroll'
    export default {
        data: function() {
            return {
                token:'',
                pageSize:10,
                pageIndex:1,
                pojoTotalCount:null,
                pageCount:null,
                startDate:'',
                endDate:'',
                loginInfoPage:'',
                time:'',
                times:''
            }
        },
        props:['datas'],
        components:{
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
            this.getUserListPage()
        },
        mounted: function() {
            this.$nextTick(() => {
                let scroll1 = new BScroll('.scroll1', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true,preventDefault:false});
        })
        },
        methods: {
            // 查询用户日志列表
            getUserListPage() {
                var obj = {
                    sign:this.token,
                    userId:this.datas.userDate.userId,
                    pageSize:this.pageSize,
                    pageIndex:this.pageIndex
                }
                if(this.times) {
                    obj.startDate = this.times[0]
                    obj.endDate = this.times[1]
                }
                this.$http.get("/systemManagementService/systemMaintenanceService/getLoginInfoPageByTime",{
                    params:obj
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.loginInfoPage = res.data.data.loginInfoPage;
                            this.pojoTotalCount = res.data.pojoTotalCount;
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                })
            },
            // 改变当前页条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getUserListPage();
            },
            // 改变页数
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val;
                this.getUserListPage();
            },
            // 查询用户信息
            searchDetails() {
                this.times = this.time
                this.getUserListPage();
            }
        }
    }
</script>
    
<style lang="css">
</style>
            