<template lang="html">
    <!-- 点击新增弹框 -->
    <div class="overlay_tc1"> 
        <div class="count_top_tc1">
            <div class="count_tc_title">新增用户</div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="userForm">
                <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <!-- <el-form-item label="用户ID" prop="userId">
                    <el-input v-model="ruleForm.userId"></el-input>
                </el-form-item> -->
                <el-form-item label="用户昵称" prop="userAlias">
                    <el-input v-model="ruleForm.userAlias"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input type="password" v-model="ruleForm.confirmPassword" auto-complete="off"></el-input>
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
                if (value !== ''){
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
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    var reg = /^[A-Za-z0-9]{6,16}$/;
                    var value = reg.test(value);
                    if(!value){
                        callback(new Error('密码请输入6到16位且只包含数字和字母'));
                    } else {
                        if (this.ruleForm.confirmPassword !== '') {
                            this.$refs.ruleForm.validateField('confirmPassword');
                        }
                        callback();
                    }
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                token:'',
                allSubSystems:[],
                ruleForm: {
                    userName: '',
                    userAlias: '',
                    phone: '',
                    email: '',
                    password: '',
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
                    password: [
                        {required: true,  validator: validatePass, trigger: 'blur' }
                    ],
                    confirmPassword: [
                        {required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },
        props:['datas'],
        watch: {
            datas:{
                handler(news) {
                   this.allSubSystems = this.datas.allSubSystems;
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
            // 新增用户
            addUser() {
                this.$http.post("/systemManagementService/userService/addUser?sign="+this.token,this.ruleForm).then((res) => {
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
                    delete this.ruleForm.confirmPassword;

                    this.addUser();
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
            },
        }
    }
</script>
    
<style lang="css">
</style>
        