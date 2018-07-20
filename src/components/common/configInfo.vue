<template>
    <div class="editPass">
        <h4 class="editPass_title">密码修改</h4>
        <div class="edit_password_wrap">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="userForm">
                <el-form-item label="旧密码:" prop="oldPassWord">
                    <el-input type="password" v-model="ruleForm.oldPassWord"></el-input>
                </el-form-item>
                <el-form-item label="新密码:" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass"></el-input>
                </el-form-item>
            </el-form>
             <div class="dit_password_btn">
                <button type="button" @click="submitForm">修改</button>
                <button type="button" class="warning" @click="resetForm">重置</button>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        this.complete = false;
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        this.complete = false;
        callback(new Error("两次输入密码不一致!"));
      } else {
        this.complete = true;
        callback();
      }
    };
    return {
      complete: false,
      ruleForm: {
        oldPassWord: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldPassWord: [
          { required: true, message: "请填写原密码", trigger: "blur" }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      if (this.complete && this.ruleForm.pass) {
        this.$http
          .post(
            "systemManagementService/userService/updatePassword?sign=" +
              sessionStorage.getItem("accessToken"),
            qs.stringify({
              oldPassword: this.ruleForm.oldPassWord,
              newPassword: this.ruleForm.pass
            })
          )
          .then(res => {
            if (res.data.code === 1) {          
              this.$notify({
                title: "提示",
                message: res.data.msg,
                duration: 1500,
                type: "success"
              });
              this.$emit('colsePass',false)
              this.quit();
            } else {
              this.$notify({
                title: "提示",
                message: res.data.msg,
                duration: 1500,
                type: "error"
              });
            }
          });
      } else {
        this.$notify({
          title: "提示",
          message: '信息不完整！',
          duration: 1500,
          type: "error"
        });
      }
    },
    resetForm() {
      this.ruleForm.oldPassWord = "";
      this.ruleForm.pass = "";
      this.ruleForm.checkPass = "";
    },
     quit() {
      sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.editPass {
  padding: 10px 25px;
}
.edit_password_wrap {
  padding: 10px;
}
.editPass_title {
  text-align: center;
  padding: 12px 0;
  border-bottom: 1px dashed #0d7474;
}
.dit_password_btn {
  text-align: center;
}
</style>
