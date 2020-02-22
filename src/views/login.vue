<template>
  <div class="login_container">
    <!-- 背景黑色遮罩 -->
    <div class="mask"></div>
    <!-- 登录框 -->
    <div class="login_box" v-loading.lock="Loading">
      <span class="title">登录SoccerFans球迷网</span>
      <!-- 登录表单 -->
      <el-form :model="loginForm" :rules="loginRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="用户名"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
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
          >
        </el-form-item>
      </el-form>
      <span class="login_info">
        还没有账号？
        <router-link to="register">点击注册。</router-link>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Loading: false,
      loginForm: {
        username: "",
        password: ""
      },
      // 登录表单的验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 12, message: "用户名为4到12个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$ajax
        .post("api/login.php", this.$qs.stringify(this.loginForm))
        .then(res => {
          if (res["data"].msg == "error") {
            console.log("错了");
            this.$msg.error("请输入正确的账号信息！");
          } else {
            console.log(`登录成功，你的id：` + res["data"].data.username);
            this.$cookies.set("uid", res["data"].data.uid);
            this.$cookies.set("username", res["data"].data.username);
            this.$msg({
              message: "登录成功，欢迎你!",
              type: "success"
            });
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
  height: 380px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0px 20px;
  .title {
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
  .btn_login {
    display: block;
    width: 220px;
    margin: 0 auto;
  }
  .login_info {
    display: block;
    text-align: center;
    font-size: 14px;
    color: #8d8d8d;
    a {
      color: #000;
      text-decoration-color: #000;
    }
  }
}
</style>
