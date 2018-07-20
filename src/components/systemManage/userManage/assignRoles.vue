<template lang="html">
<!-- 点击新增弹框 -->
    <div class="overlay_tc1"> 
        <div class="count_top_tc1">
            <div class="count_tc_title">分配角色</div>
            <div class="count_tc_count clearfix">
                <div class="fpjs fpjs_left">
                    <div class="fpjs_title">未分配</div>
                    <div>
                        <ul class="clearfix">
                            <li v-for="(item,index) in rolesArrs"><input type="checkbox" :value="item" v-model="checkedDate"/>{{item.roleName}}</li>
                        </ul>
                    </div>
                </div>
                <div class="fpjs_middle">
                    <img src="@/assets/img/double_left.png" alt="" @click="getRoles(1)"/>
                    <img src="@/assets/img/right.png" alt="" @click="getRoles(2)"/>
                    <img src="@/assets/img/left.png" alt="" @click="getRoles(3)"/>
                    <img src="@/assets/img/double_right.png" alt="" @click="getRoles(4)"/>
                </div>
                <div class="fpjs fpjs_right">
                    <div class="fpjs_title">已分配</div>
                    <div>
                        <ul class="clearfix" >
                            <li v-for="(item,index) in haveRolesArr"><input type="checkbox" :value="item" v-model="checkedDate1" />{{item.roleName}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <el-form>
                <el-form-item class="fpjs_btn">
                        <el-button type="primary" @click="submitForm()" >保存</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
        
    </template>
    
    <script>
        export default {
            data: function() {
                return {
                    token:'',
                    rolesArrs:[],
                    haveRolesArr:[],
                    cloneRolesArrs:[],
                    cloneHaveRolesArr:[],
                    checkedDate:[],
                    checkedDate1:[],
                    checkData:'',
                    roleArr:''
                }
            },
            props:['datas'],
            watch: {
                datas:{
                    handler(news) {
                       this.rolesArrs = this.datas.rolesArrs;
                       this.haveRolesArr = this.datas.haveRolesArr;
                       this.checkData = this.datas.checkData;
                       this.cloneRolesArrs = Object.assign([],this.rolesArrs);
                       this.cloneHaveRolesArr = Object.assign([],this.haveRolesArr);
                    },
                    deep:true
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
                getRoles(type) {
                    var objData = [];
                    if(type == 1) {
                        objData = Object.assign([],this.rolesArrs);
                        this.rolesArrs = objData.concat(this.haveRolesArr)
                        this.haveRolesArr = []
                    } else if(type == 2) {
                        objData = Object.assign([],this.haveRolesArr);
                        this.haveRolesArr = objData.concat(this.checkedDate)

                        if(this.checkedDate.length>0) {
                            var data = [];
                            for(var i=0;i<this.rolesArrs.length;i++) {
                                var isExist = false;
                                for(var j=0;j<this.checkedDate.length;j++) {
                                   if(this.rolesArrs[i].roleName == this.checkedDate[j].roleName) {
                                        isExist = true;
                                        break;
                                   }
                                }
                                if(!isExist){
                                    data.push(this.rolesArrs[i]);
                                }
                            }
                            this.rolesArrs =data;
                            this.checkedDate = [];
                        }
                    } else if(type == 3) {
                        objData = Object.assign([],this.rolesArrs);
                        this.rolesArrs = objData.concat(this.checkedDate1)

                        if(this.checkedDate1.length>0) {
                            var data = [];
                            for(var i=0;i<this.haveRolesArr.length;i++) {
                                var isExist = false;
                                for(var j=0;j<this.checkedDate1.length;j++) {
                                   if(this.haveRolesArr[i].roleName == this.checkedDate1[j].roleName) {
                                        isExist = true;
                                        break;
                                   }
                                }
                                if(!isExist){
                                    data.push(this.haveRolesArr[i]);
                                }
                            }
                            this.haveRolesArr =data;
                            this.checkedDate1 = [];
                        }
                    } else if(type == 4) {
                        objData = Object.assign([],this.haveRolesArr);
                        this.haveRolesArr = objData.concat(this.rolesArrs)
                        this.rolesArrs = []
                    }
                },
                // 提交用户信息按钮
                submitForm() {
                    var dataArr = [];
                    if(this.haveRolesArr.length>0) {
                        for(var i =0 ;i<this.haveRolesArr.length;i++) {
                            dataArr.push(this.haveRolesArr[i].roleId)
                        }
                    } 
                    
                    this.roleArr = dataArr;
                    this.$http.get("/systemManagementService/roleUserService/userDistributionRole",{
                        params:{
                            sign:this.token,
                            userId:this.checkData.userId,
                            roleIds:this.roleArr
                        }
                    }).then((res) => {
                        if (res.status == 200) {
                            if(res.data.code == 1) {
                                this.changeSatus()
                            }
                        }
                    }).catch(function(error) {
                        console.log(error);
                    })
                },
                // 还原信息
                resetForm(formName) {
                    this.rolesArrs = this.cloneRolesArrs;
                    this.haveRolesArr = this.cloneHaveRolesArr;
                },
                // 保存成功后自定义函数
                changeSatus() {
                    this.$emit('changeSat', false)//触发自定义事件
                }
            }
        }
    </script>
        
    <style lang="css">
        .count_tc_count {width:500px;margin: 0 auto}
        .fpjs{float: left;width: 200px;height: 450px;border:1px solid #0d7474;box-sizing: border-box;overflow: auto}
        .fpjs_middle {float: left;width: 100px;padding:120px 0}
        .fpjs_middle img{width:32px;height: 32px;display: block;margin: 15px auto;cursor: pointer;}
        .fpjs_title {color: #84f1f1;text-align: center;height:30px;line-height: 30px;border-bottom:1px solid #0d7474;}
        .fpjs ul {width:180px;margin: 10px auto}
        .fpjs ul li {height: 25px;line-height: 25px;}
        .fpjs ul li input{margin-right: 10px}
        .fpjs_btn {text-align: center;margin-top: 20px;}
        .fpjs_btn button {margin: 0 20px}
    </style>
            