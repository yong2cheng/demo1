<template lang="html">
    <!-- 点击编辑弹框 -->
    <div class="overlay_tc1"> 
        <div class="count_top_tc1">
            <div class="count_tc_title">编辑角色</div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="userForm">
                <el-form-item label="角色编码" prop="roleCode">
                    <el-input v-model="ruleForm.roleCode"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="ruleForm.roleName"></el-input>
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
                return {
                    token:'',
                    ruleForms:{},
                    ruleForm: {
                        roleCode: '',
                        roleName: '',
                    },
                    // ruleForm:this.datas,
                    rules: {
                        roleCode: [
                            { required: true, message: '请输入角色编码', trigger: 'blur' },
                            { min: 1, max: 99, message: '长度在 1 到 99 个字符', trigger: 'blur' },
                        ],
                        roleName: [
                            {required: true, message: '请输入角色名称', trigger: 'blur' },
                            {min: 1, max: 99, message: '长度在 1 到 99 个字符', trigger: 'blur' }
                        ],
                    }
                }
            },
            props:['datas'],
            components:{
            },
            created: function() {
                this.token = sessionStorage.getItem('accessToken');
                this.ruleForm = Object.assign({},this.datas.updateData);
            },
            mounted: function() {
            },
            methods: {
                // 编辑角色
                updateRole() {
                    this.ruleForms = Object.assign({},this.ruleForm);
                    this.$http.post("/systemManagementService/roleService/updateRole?sign="+this.token,this.ruleForms).then((res) => {
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
                        this.updateRole();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                    });
                },
                // 清空表单信息按钮
                resetForm(formName) {
                    this.$refs[formName].resetFields();
                    this.ruleForm = {
                        roleCode: '',
                        roleName: '',
                    }
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
            