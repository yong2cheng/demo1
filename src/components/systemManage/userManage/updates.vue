<template lang="html">
    <!-- 点击编辑弹框 -->
    <div class="overlay_tc1"> 
        <div class="count_top_tc1">
            <div class="count_tc_title">编辑用户</div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="userForm">
                <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="用户ID" prop="userId" style="display: none">
                    <el-input v-model="ruleForm.userId"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="userAlias">
                    <el-input v-model="ruleForm.userAlias"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="所属地区" prop="divisionCodeName">
                    <el-select v-model="ruleForm.divisionCodeName" placeholder="请选择所属地区">
                        <el-option 
                            v-for="item in this.allSubSystems"
                            :key="item.id"
                            :value="item.name"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            var validPhone=(rule, value,callback)=>{
                if (value != ''&&value != null){
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                    var value = reg.test(value);
                    if(!value) {
                        callback(new Error('请输入正确的11位手机号码'))
                    } else {
                    callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                token:'',
                allSubSystems:[],
                ruleForms:{},
                ruleForm: {
                    userName: '',
                    userAlias: '',
                    phone: '',
                    email: '',
                    divisionCode: '',
                    divisionCodeName:''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                        { min: 1, max: 99, message: '长度在 1 到 99 个字符', trigger: 'blur' }
                    ],
                    userAlias: [
                        {required: true, message: '请输入用户昵称', trigger: 'blur' },
                        { min: 1, max: 99, message: '长度在 1 到 99 个字符', trigger: 'blur' }
                    ],
                    divisionCodeName: [
                        { required: true, message: '请选择所属地区', trigger: 'change' }
                    ],
                    phone: [
                        {trigger: 'blur' ,validator: validPhone }
                    ],
                    email: [
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur']  }
                    ],
                }
            }
        },
        props:['datas'],
        watch: {
            datas:{
                handler(news) {
                    this.allSubSystems = this.datas.allSubSystems;
                    this.ruleForm = Object.assign({},this.datas.updateData);
                    if(this.ruleForm.active == true) {
                        this.ruleForm.active ="是"
                    } else {
                        this.ruleForm.active ="否"
                    }
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
            // 编辑用户
            updateUser() {
                this.$http.post("/systemManagementService/userService/updateUser?sign="+this.token,this.ruleForms).then((res) => {
                    if (res.status == 200) {
                        if(res.data.code == 1) {
                            this.changeSatus()
                        } else {
                            alert(res.data.msg)
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                })
            },
            // 提交用户信息按钮
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    for(var i=0;i<this.allSubSystems.length;i++) {
                        if(this.allSubSystems[i].name  == this.ruleForm.divisionCodeName) {
                            this.ruleForm.divisionCode = this.allSubSystems[i].id;
                        }
                    }

                    this.ruleForms = Object.assign({},this.ruleForm);
                    if(this.ruleForms.active == "是") {
                        this.ruleForms.active =true
                    } else {
                        this.ruleForms.active =false
                    }

                    this.updateUser();
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            // 清空表单信息按钮
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 保存成功后自定义函数
            changeSatus() {
                this.$emit('changeSat', false)//触发自定义事件
            }
        }
    }
</script>
    
<style lang="css">
</style>
            