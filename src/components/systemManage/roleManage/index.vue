<template lang="html">
    <div class="main_xtgl">
        <div class="tc_count_tool clearfix" style="margin-top: 10px">
            <ul class="clearfix" style="width:80%">
                <li style="position: relative;">
                    <label>角色名:</label>
                    <input v-model="searchKey" type="text" placeholder="请输入角色名" class="txt" v-on:keyup="search" style="padding: 0 24px 0 5px;">
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
                            <th>角色名称</th>
                            <th>角色编码</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="scroll" style="position:relative;height:351px;overflow:hidden;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                    <tbody v-if="rolesArr !='' ">
                        <tr v-for="(item,index) in rolesArr">
                            <td>{{(pageIndex-1)*pageSize+(index+1)}}</td>
                            <td>{{item.roleCode}}</td>
                            <td>{{item.roleName}}</td>
                            <td><button class="btn-small" @click="updates(item)">编辑</button><button class="btn-small checked" @click="deletes(item)">删除</button><button class="btn-small" @click="assignMenu(item)">分配菜单</button></td>
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
        <overlay :close.sync="isShow"><add v-if="isShow" @changeSat="getChild"/></overlay>
        <overlay :close.sync="isShow1"><updates v-if="isShow1" :datas="{updateData:updateData}" @changeSat="getChild"/></overlay>
        <overlay :close.sync="isShow2"><assignMenu v-if="isShow2" :datas="{haveMenuArr:haveMenuArr,checkData:checkData,menuArrDate:menuArrDate}" @changeSat="getChild"/></overlay>
    </div>
</template>

<script>
import overlay from '@/components/common/overlay'
import BScroll from 'better-scroll'
import add from './add'
import updates from './updates'
import assignMenu from './assignMenu'
    export default {
        data: function() {
            return {
                token:'',
                searchKey:'',
                rolesArr:[],
                menuArr:[],
                haveMenuArr:[],
                menuArrDate:[],
                pageSize:10,
                pageIndex:1,
                pojoTotalCount:null,
                pageCount:null,
                isShow:false,
                isShow1:false,
                isShow2:false,
                updateData:{},
                checkData:'',
            }
        },
        components:{
            overlay,
            add,
            updates,
            assignMenu
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
            this.getRolesList();
            this.getMenuList();
        },
        mounted: function() {
            this.$nextTick(() => {
                let scroll = new BScroll('.scroll', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true});
			});
        },
        methods: {
            // 查询角色列表
            getRolesList() {
                this.$http.get("/systemManagementService/roleService/getRoleListPage",{
                    params:{
                        sign:this.token,
                        name:this.searchKey,
                        pageSize:this.pageSize,
                        pageIndex:this.pageIndex
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.rolesArr = res.data.data.roles;
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
                this.getRolesList();
            },
            // 改变页数
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val;
                this.getRolesList();
            },
            // 搜索用户名
            search() {
                this.pageSize = 10;
                this.pageIndex = 1;
                this.getRolesList();
            },
            // 新增用户按钮
            adds() {
                this.isShow = true;
            },
            // 编辑用户按钮
            updates(data){
                this.isShow1 = true;
                this.updateData = data;
            },
            // 删除角色按钮
            deletes(data){
                this.$http.get("/systemManagementService/roleService/deleteRole",{
                    params:{
                        sign:this.token,  
                        roleId:data.roleId
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.getRolesList();
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                })
            },
           // 分配菜单
           assignMenu(data){
                this.isShow2 = true;
                this.checkData = data;
                this.getHaveMenuList(data);
            },
            // 查询菜单列表
            getMenuList() {
                this.$http.get("/systemManagementService/systemFunctionService/getSystemFunctionTree",{
                    params:{
                        sign:this.token,
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.menuArr = res.data.data.systemFunctionTreeNodes;
                            if(this.menuArr.length>0) {
                                var data = [];
                                for(var i =0;i<this.menuArr.length;i++) {
                                    var obj = {};
                                    obj.id=this.menuArr[i].id;
                                    obj.label=this.menuArr[i].name;
                                    if(this.menuArr[i].children && this.menuArr[i].children.length>0) {
                                        var data1 = [];
                                        for(var j =0;j<this.menuArr[i].children.length;j++) {
                                            var obj1 = {};
                                            obj1.id= this.menuArr[i].children[j].id
                                            obj1.label= this.menuArr[i].children[j].name
                                            if(this.menuArr[i].children[j].children && this.menuArr[i].children[j].children.length>0) {
                                                var data2 = [];
                                                for(var k =0;k<this.menuArr[i].children[j].children.length;k++) {
                                                    var obj2 = {};
                                                    obj2.id= this.menuArr[i].children[j].children[k].id
                                                    obj2.label= this.menuArr[i].children[j].children[k].name
                                                    data2.push(obj2);
                                                }
                                                obj1.children = data2
                                            }
                                            data1.push(obj1);
                                        }
                                        obj.children = data1
                                    }
                                    data.push(obj)
                                }
                                this.menuArrDate = data
                            }
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                })
            },
            // 查询已分配菜单
            getHaveMenuList(data) {
                this.$http.get("/systemManagementService/roleSystemFunctionService/getRoleSystemFunctionByRoleId",{
                    params:{
                        sign:this.token,
                        roleId:data.roleId
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            var roleSystemFunctions = res.data.data.roleSystemFunctions;
                            if(roleSystemFunctions&&roleSystemFunctions.length>0) {
                                var data = [];
                                for(var i=0;i<roleSystemFunctions.length;i++) {
                                    data.push(roleSystemFunctions[i].systemFunctionId)
                                }
                            }
                            this.haveMenuArr = data
                            console.log(this.haveMenuArr)
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
                this.getRolesList();
            }
        }
    }
</script>

<style lang="css">
</style>
       
   