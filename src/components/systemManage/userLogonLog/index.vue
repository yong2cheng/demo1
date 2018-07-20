<template lang="html">
        <div class="main_xtgl">
            <div class="tc_count_tool clearfix" style="margin-top: 10px">
                <ul class="clearfix" style="width:80%">
                    <li>
                        <label>所属地区:</label>
                        <select v-model="systemId">
                            <option value="">选择地区</option>
                            <option v-for="(item,index) in areaArr" :value="item.areaId" :key="index">
                                {{item.areaName}}
                            </option>
                        </select>
                    </li>
                    <li>
                        <label>用户名:</label>
                        <input v-model="userName" type="text" placeholder="请输入用户名" class="txt">
                    </li>
                </ul>
                <button @click="clearLog()" class="warning">清除日志</button>
                <button @click="search()">查询</button>
            </div>
            <div class="tc_count_table">
                <div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>用户名</th>
                                <th>所属地区</th>
                                <th>最近登录时间</th>
                                <th>登录IP</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="scroll" style="position:relative;height:351px;overflow:hidden;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                        <tbody v-if="lastLoginInfoPage !='' ">
                            <tr v-for="(item,index) in lastLoginInfoPage">
                                <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                                <td @click="userDetail(item)"><span class="color_warning">{{item.userName}}</span></td>
                                <td>{{item.systemName}}</td>
                                <td>{{item.loginTime}}</td>
                                <td>{{item.ipAddress}}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr style="height: 350px;">
                                <td colspan="5">暂无数据</td>
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
            <overlay :close.sync="isShow"><userDetail v-if="isShow" :datas="{userDate:userDate}"/></overlay>
            <overlay :close.sync="isShow1"><clearLog v-if="isShow1" @changeSat="getChild"/></overlay>
        </div>
    </template>
    
    <script>
    import overlay from '@/components/common/overlay'
    import BScroll from 'better-scroll'
    import area from "@/assets/config/areaMap";
    import userDetail from './userDetail'
    import clearLog from './clearLog'
        export default {
            data: function() {
                return {
                    isShow:false,
                    isShow1:false,
                    token:'',
                    lastLoginInfoPage:[],
                    pageSize:10,
                    pageIndex:1,
                    pojoTotalCount:null,
                    pageCount:null,
                    isShow:false,
                    isShow1:false,
                    isShow2:false,
                    userDate:[],
                    areaArr:'',
                    systemId:'',
                    systemIds:'',
                    userName:'',
                    userNames:''
                }
            },
            components:{
                overlay,
                userDetail,
                clearLog,
            },
            created: function() {
                this.token = sessionStorage.getItem('accessToken');
                if (sessionStorage.getItem("systemId") &&!isNaN(sessionStorage.getItem("systemId"))) {
                    area.forEach(item => {
                        if (item.areaId == sessionStorage.getItem("systemId")) {
                        this.areaArr = [item];
                        this.systemId = item.areaId;
                        }
                    });
                } else {
                    this.areaArr = area;
                }
                this.getLastLoginInfoPage();
            },
            mounted: function() {
                this.$nextTick(() => {
                    let scroll = new BScroll('.scroll', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true});
                });
            },
            methods: {
                // 查询用户列表
                getLastLoginInfoPage() {
                    var obj = {
                        sign:this.token,
                        pageSize:this.pageSize,
                        pageIndex:this.pageIndex
                    }
                    if(this.systemIds||this.systemIds === 0) {
                        obj.systemId = this.systemIds
                    }
                    if(this.userNames) {
                        obj.userName = this.userNames
                    }
                    // this.$http.get("http://10.172.246.77:29880/systemManagementService/userService/getUserListPage",{
                    this.$http.get("/systemManagementService/systemMaintenanceService/getLastLoginInfoPage",{
                        params:obj
                    }).then((res) => {
                        if (res.status == 200) {
                            if(res.data.code == 1) {
                                this.lastLoginInfoPage = res.data.data.lastLoginInfoPage;
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
                    this.getLastLoginInfoPage();
                },
                // 改变页数
                handleCurrentChange(val) {
                    console.log(`当前页: ${val}`);
                    this.pageIndex = val;
                    this.getLastLoginInfoPage();
                },
                // 搜索用户名
                search() {
                    this.systemIds = this.systemId
                    this.userNames = this.userName
                    this.pageSize = 10;
                    this.pageIndex = 1;
                    this.getLastLoginInfoPage();
                },
                // 点击用户名获取用户登录信息
                userDetail(data) {
                    this.isShow = true;
                    this.userDate = data
                },
                // 清楚日志
                clearLog(){
                    this.isShow1 = true;
                },
                // 得到子组件回调事件
                getChild(data) {
                    console.log(data)
                    if(data == 1) {
                        this.isShow = false;
                    } else if(data == 2) {
                        this.isShow1 = false;
                        this.getLastLoginInfoPage();
                    }
                },
            }
        }
    </script>
    
    <style lang="css">
    </style>
           
       