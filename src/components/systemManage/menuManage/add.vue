<template lang="html">
    <!-- 点击新增弹框 -->
    <div class="overlay_tc1"> 
        <div class="count_top_tc1">
            <div class="count_tc_title">新增菜单</div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="userForm">
                <el-form-item label="菜单名称" prop="sysfuncName">
                    <el-input v-model="ruleForm.sysfuncName"></el-input>
                </el-form-item>
                <el-form-item label="菜单编码" prop="sysfuncCode">
                    <el-input v-model="ruleForm.sysfuncCode"></el-input>
                </el-form-item>
                <el-form-item label="菜单地址" prop="filePath">
                    <el-input v-model="ruleForm.filePath"></el-input>
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
                        ruleForm: {
                            sysfuncName: '',
                            sysfuncCode: '',
                            filePath: '',
                        },
                        rules: {
                            sysfuncName: [
                                { required: true, message: '请输入菜单名称', trigger: 'blur' },
                                { min: 1, max: 9, message: '长度在 1 到 9 个字符', trigger: 'blur' }
                            ],
                            sysfuncCode: [
                                {required: true, message: '请输入菜单编码', trigger: 'blur' },
                                { min: 1, max: 9, message: '长度在 1 到 9 个字符', trigger: 'blur' }
                            ],
                            filePath: [
                                { min: 1, max: 9, message: '长度在 1 到 9 个字符', trigger: 'blur' }
                            ]
                        },
                    }
                },
        props:['datas'],
        components:{
        },
        created: function() {
            this.token = sessionStorage.getItem('accessToken');
        },
        mounted: function() {
        },
        methods: {
            // 新增用户
            addMenu() {
                this.ruleForm.parentSysfuncId = this.datas.updateData.id
                this.$http.post("/systemManagementService/systemFunctionService/addSystemFunction?sign="+this.token,this.ruleForm).then((res) => {
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
                    this.addMenu();
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
        