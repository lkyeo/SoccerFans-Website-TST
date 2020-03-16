<template>
  <div class="container">
    <div class="userbox">
      <div class="info">
        <span>用户名：{{ username }}</span>
        <span>ID#{{ uid }}</span>
      </div>

      <div class="password">
        <el-form
          :model="passwordForm"
          status-icon
          :rules="passwordRules"
          ref="passwordForm"
        >
          <!-- 原始密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="passwordForm.password"
              prefix-icon="el-icon-lock"
              type="password"
              placeholder="原始密码"
              maxlength="16"
            ></el-input>
          </el-form-item>
          <!-- 修改密码 -->
          <el-form-item prop="passwordEdit">
            <el-input
              v-model="passwordForm.passwordEdit"
              prefix-icon="el-icon-lock"
              type="password"
              placeholder="修改密码"
              maxlength="16"
            ></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item prop="passwordCheck">
            <el-input
              v-model="passwordForm.passwordCheck"
              prefix-icon="el-icon-lock"
              type="password"
              placeholder="确认密码"
              maxlength="16"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button type="primary" @click="submit">保存修改</el-button>
        <el-button plain @click="resetForm('passwordForm')">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原始密码"));
      } else {
        let data = { username: this.username, password: value };
        this.$ajax.post("api/login.php", this.$qs.stringify(data)).then(res => {
          if (res["data"].msg === "error") {
            callback(new Error("请输入正确的密码！"));
          }
          callback();
        });
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordForm.passwordEdit) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value === this.passwordForm.password) {
        callback(new Error("请输入和原来不同的密码！"));
      } else {
        if (this.passwordForm.passwordCheck !== "") {
          this.$refs.passwordForm.validateField("passwordCheck");
        }
        callback();
      }
    };

    return {
      username: this.$cookies.get("username"),
      uid: this.$cookies.get("uid"),
      passwordForm: {
        uid: this.$cookies.get("uid"),
        password: "",
        passwordEdit: "",
        passwordCheck: ""
      },
      passwordRules: {
        password: [{ validator: validatePass3, trigger: "blur" }],
        passwordEdit: [{ validator: validatePass, trigger: "blur" }],
        passwordCheck: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submit() {
      this.$refs.passwordForm.validate(valid => {
        if (!valid) return;

        this.$ajax
          .post("api/passwordModify.php", this.$qs.stringify(this.passwordForm))
          .then(res => {
            if (res["data"].status == "101") {
              this.resetForm("passwordForm");
              this.$msg.success("修改成功！");
            } else {
              console.log(res);
            }
          });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  .userbox {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 460px;
    height: 360px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 12px 22px;
    .info {
      display: flex;
      justify-content: space-between;
    }
    .submit {
      .el-button {
        float: right;
        margin-left: 12px;
      }
    }
  }
}
</style>
