<template>
  <el-container
    class="full-container"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-header height="60px">
      <div class="title">
        <span>SoocerFans管理后台</span>
      </div>
      <el-link type="info" :underline="false" @click="quit">登出</el-link>
    </el-header>
    <el-container height="200px">
      <el-aside width="280px">
        <navbar></navbar>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
import navbar from "../components/adminNavbar.vue";

export default {
  components: {
    navbar: navbar
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.checkAdmin();
  },
  methods: {
    quit() {
      this.$cookies.remove("aid");
      this.$cookies.remove("admin");
      this.$msg.success("已经退出管理员账户！");
      setTimeout(() => {
        this.$msg({
          message: "将于三秒后跳转到首页。"
        });
      }, 50);
      this.loading = true;
      setTimeout(() => {
        this.$router.push("/");
      }, 3000);
    },
    checkAdmin() {
      var admin = this.$cookies.get("admin");
      var aid = this.$cookies.get("aid");
      if (admin == null || aid == null) {
        this.loading = true;
        this.$msg.error("你还没有登录,即将跳转到登录页！");
        setTimeout(() => {
          this.$router.push("/adminlogin");
        }, 1500);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.full-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #000;
  font-size: 16px;
  line-height: 60px;
  color: #fff;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
  border-right: 1px solid #e0e0e0;
}

.el-main {
  background-color: #fff;
  padding: 16px 24px;
  display: flex;
  justify-content: center;
}
</style>
