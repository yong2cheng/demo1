<template lang="html">
    <div class="main_xtgl">
        <div class="tc_count_tool clearfix" style="margin-top: 10px">
            <ul class="clearfix" style="width:80%">
                <li style="position: relative;">
                    <label>用户名:</label>
                    <input v-model="searchKey" type="text" placeholder="请输入用户名" class="txt" v-on:keyup="search" style="padding: 0 24px 0 5px;">
                    <img src="@/assets/img/search.png" alt=""/>
                </li>
            </ul>
            <button @click="adds()">新增</button>
        </div>
        <div class="tc_count_table">
            <div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>用户ID</th>
                            <th>用户名称</th>
                            <th>用户昵称</th>
                            <!-- <th>用户状态</th> -->
                            <th>所属地区</th>
                            <th style="width:200px">操作栏</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="scroll" style="position:relative;height:351px;overflow:hidden;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                    <tbody v-if="usersArr !='' ">
                        <tr v-for="(item,index) in usersArr">
                            <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                            <td>{{item.userId}}</td>
                            <td>{{item.userName}}</td>
                            <td>{{item.userAlias}}</td>
                            <!-- <td>{{item.active == true?"激活":"未激活"}}</td> -->
                            <td>{{item.divisionCodeName}}</td>
                            <td style="width:200px"><button class="btn-small" @click="updates(item)">编辑</button><button class="btn-small" @click="deletes(item)" :class="{checked:item.active?0:1}">{{item.active == true?"停用":"启用"}}</button><button class="btn-small" @click="assignRole(item)">分配角色</button></td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr style="height: 350px;">
                            <td colspan="7">暂无数据</td>
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
        <overlay :close.sync="isShow"><add v-if="isShow" :datas="{allSubSystems:allSubSystems}" @changeSat="getChild"/></overlay>
        <overlay :close.sync="isShow1"><updates v-if="isShow1" :datas="{allSubSystems:allSubSystems,updateData:updateData}" @changeSat="getChild"/></overlay>
        <overlay :close.sync="isShow2"><assignRoles :datas="{rolesArrs:rolesArrs,haveRolesArr:haveRolesArr,checkData:checkData}" @changeSat="getChild"/></overlay>
    </div>
</template>

<script>
import overlay from '@/components/common/overlay'
import BScroll from 'better-scroll'
import add from './add'
import updates from './updates'
import assignRoles from './assignRoles'
    export default {
        data: function() {
            return {
                token:'',
                searchKey:'',
                checked:false,
                usersArr:[],
                rolesArr:[],
                rolesArrs:[],
                haveRolesArr:[],
                pageSize:10,
                pageIndex:1,
                pojoTotalCount:null,
                pageCount:null,
                isShow:false,
                isShow1:false,
                isShow2:false,
                allSubSystems:[],
                updateData:{},
                checkData:'',
            }
        },
        components:{
            overlay,
            add,
            updates,
            assignRoles
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
            this.getUserList();
            this.getRolesList();
        },
        mounted: function() {
            this.$nextTick(() => {
				let scroll = new BScroll('.scroll', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true});
			});
        },
        methods: {
            // 查询用户列表
            getUserList() {
                // this.$http.get("http://10.172.246.95:29880/systemManagementService/userService/getUserListPage",{
                this.$http.get("/systemManagementService/userService/getUserListPage",{
                    params:{
                        sign:this.token,
                        name:this.searchKey,
                        pageSize:this.pageSize,
                        pageIndex:this.pageIndex
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.usersArr = res.data.data.users;
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
                this.getUserList();
            },
            // 改变页数
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val;
                this.getUserList();
            },
            // 搜索用户名
            search() {
                this.pageSize = 10;
                this.pageIndex = 1;
                this.getUserList();
            },
            // 新增用户按钮
            adds() {
                this.isShow = true;
                this.getSubsystemList();
            },
            // 编辑用户按钮
            updates(data){
                this.isShow1 = true;
                this.getSubsystemList();
                this.updateData = data;
            },
            // 删除用户按钮
            deletes(data){
                this.$http.get("/systemManagementService/userService/updateUserActived",{
                    params:{
                        sign:this.token,  
                        userId:data.userId,
                        active:data.active
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.getUserList();
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                })
            },
            // 分配角色
            assignRole(data){
                this.isShow2 = true;
                this.checkData = data;
                this.getHaveRolesList(data);
            },
            // 查询角色列表
            getRolesList() {
                this.$http.get("/systemManagementService/roleService/getRoleListPage",{
                    params:{
                        sign:this.token,
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.rolesArr = res.data.data.roles;
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                })
            },
            // 查询已分配角色列表
            getHaveRolesList(data) {
                this.$http.get("/systemManagementService/roleUserService/getRoleUserByUserId",{
                    params:{
                        sign:this.token,
                        userId:data.userId
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.haveRolesArr = res.data.data.roleUsers;
                            var data = [];
                            if(this.haveRolesArr.length>0) {
                                var data = [];
                                for(var i=0;i<this.rolesArr.length;i++) {
                                    var isExist = false;
                                    for(var j=0;j<this.haveRolesArr.length;j++) {
                                        if(this.rolesArr[i].roleName == this.haveRolesArr[j].roleName) {
                                            isExist = true;
                                            break;
                                        }
                                    }
                                    if(!isExist){
                                        data.push(this.rolesArr[i]);
                                    }
                                }
                                this.rolesArrs =data;
                            } else {
                                this.rolesArrs = this.rolesArr;
                            }
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                })
            },
            // 查询地区
            getSubsystemList() {
                this.$http.get("/treeService/tree/getAllSystemTreeNode",{
                    params:{
                        sign:this.token,
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.allSubSystems = res.data.data.allSubSystems;
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                })
            },
            // 得到子组件回调事件
            getChild(data) {
                this.isShow = false;
                this.isShow1 = false;
                this.isShow2 = false;
                this.getUserList();
            }
        }
    }
</script>

<style lang="css">
</style>
       
   