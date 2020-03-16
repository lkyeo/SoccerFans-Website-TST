<template>
  <div class="login_container">
    <!-- 背景黑色遮罩 -->
    <div class="mask"></div>
    <!-- 登录框 -->
    <div class="login_box" v-loading.lock="Loading">
      <span class="title">administrator</span>
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="ruleForm"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="admin">
          <el-input
            v-model="loginForm.admin"
            prefix-icon="el-icon-user"
            placeholder="用户名"
            maxlength="12"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="密码"
            show-password
            maxlength="16"
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" class="btn_login" round @click="login"
            >登录</el-button
          ></el-form-item
        >
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Loading: false,
      loginForm: {
        admin: "",
        password: ""
      },
      // 登录表单的验证规则
      loginRules: {
        admin: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 12, message: "用户名为4到12个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return;
        this.$ajax
          .post("api/adminLogin.php", this.$qs.stringify(this.loginForm))
          .then(res => {
            console.log(res);
            if (res["data"].msg == "error") {
              console.log("错了");
              this.$msg.error("请输入正确的账号信息！");
            } else {
              console.log(`登录成功，你的id：` + res["data"].data.admin);
              this.$cookies.set("aid", res["data"].data.aid);
              this.$cookies.set("admin", res["data"].data.admin);
              this.$msg({
                message: "登录成功，欢迎你!",
                type: "success"
              });
              setTimeout(() => {
                this.$msg({
                  message: "即将跳转到后台管理。"
                });
              }, 500);
              this.Loading = true;

              setTimeout(() => {
                this.$router.push("/admin");
              }, 1800);
            }
          });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login_container {
  background-image: url("../assets/img/background.png");
  background-size: cover;
  height: 100%;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.login_box {
  width: 360px;
  height: 270px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  .title {
    display: block;
    font-size: 22px;
    font-weight: 300;
    color: #000;
    padding: 12px 0px;
    margin-bottom: 22px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
  }
  .btn_login {
    display: block;
    width: 180px;
    margin: 0 auto;
  }
}
</style>
