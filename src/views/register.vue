<template>
  <div class="register_container">
    <!-- 背景黑色遮罩 -->
    <div class="mask"></div>
    <!-- 注册框 -->
    <div class="register_box" v-loading.lock="Loading">
      <span>注册SoccerFans球迷网</span>
      <!-- 注册表单 -->
      <el-form
        :model="registerForm"
        status-icon
        :rules="registerRules"
        class="register_form"
        ref="registerForm"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            prefix-icon="el-icon-user"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="密码"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="passwordCheck">
          <el-input
            v-model="registerForm.passwordCheck"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="确认密码"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <!-- 注册按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" class="btn_register" @click="register"
            >注册</el-button
          >
          <el-button plain @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.passwordCheck !== "") {
          this.$refs.registerForm.validateField("passwordCheck");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      Loading: false,
      registerForm: {
        username: "",
        password: "",
        passwordCheck: ""
      },
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 12, message: "用户名为4到12个字符", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwordCheck: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  mounted: function() {
    this.checkUser();
  },
  methods: {
    checkUser() {
      if (this.$cookies.get("username")) {
        this.$msg.warning("你已经登录了，继续操作将清除登录信息");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      this.$refs.registerForm.validate(valid => {
        if (!valid) return;
        this.$ajax
          .post("api/register.php", this.$qs.stringify(this.registerForm))
          .then(res => {
            if (res["data"].status == "201") {
              this.$msg.error("数据库中已经存在相同的用户名！");
            } else {
              console.log(res);
              this.$cookies.set("uid", res["data"].data.uid);
              this.$cookies.set("username", res["data"].data.username);
              this.$msg.success("注册成功！");
              setTimeout(() => {
                this.$msg({
                  message: "将于三秒后跳转到首页。"
                });
              }, 500);
              this.Loading = true;
              setTimeout(() => {
                this.$router.push("/");
              }, 3000);
            }
          });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.register_container {
  background-image: url("../assets/img/background.png");
  background-size: cover;
  height: 100%;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.register_box {
  width: 360px;
  height: 380px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0px 20px;
  span {
    display: block;
    font-size: 22px;
    font-weight: 300;
    color: #000;
    padding: 16px 0px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 22px;
  }
}
.btns {
  text-align: center;
  button {
    width: 120px;
  }
}
</style>
