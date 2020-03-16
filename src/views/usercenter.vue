<template>
  <el-container
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-aside width="280px">
      <div class="user-welcome">
        <span>欢迎你,{{ username }}</span>
      </div>
      <el-menu
        default-active="1"
        mode="vertical"
        background-color="#222222"
        text-color="#fff"
        active-text-color="#59D1D2"
        router
      >
        <el-menu-item index="/usercenter/followclub">
          <span slot="title">关注球队</span>
        </el-menu-item>
        <el-menu-item index="/usercenter/newsfav">
          <span slot="title">我的收藏</span>
        </el-menu-item>
        <el-menu-item index="/usercenter/comments">
          <span slot="title">我的评论</span>
        </el-menu-item>
        <el-menu-item index="/usercenter/editinfo">
          <span slot="title">修改信息</span>
        </el-menu-item>
        <el-menu-item index="/">
          <span slot="title">返回首页</span>
        </el-menu-item>
        <el-menu-item @click="logout()">
          <span slot="title">登出</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main><router-view></router-view></el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      uid: null,
      username: "",
      loading: false
    };
  },
  mounted() {
    this.checkUser();
  },
  methods: {
    checkUser() {
      this.uid = this.$cookies.get("uid");
      if (this.uid == null) {
        this.loading = true;
        this.$msg.error("你还没有登录,三秒后返回主页！");
        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
      }
      this.username = this.$cookies.get("username");
    },
    logout() {
      this.$cookies.remove("uid");
      this.$cookies.remove("username");
      this.$msg.success("已退出当前用户！");
      setTimeout(() => {
        this.$msg({
          message: "将于三秒后跳转到首页。"
        });
      }, 50);
      this.loading = true;
      setTimeout(() => {
        this.$router.push("/");
      }, 3000);
    }
  }
};
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: #222222;

    .user-welcome {
      display: flex;
      align-items: center;
      padding: 0px 20px;
      width: auto;
      height: 56px;
      span {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
      }
    }

    .el-menu {
      border-right: 0px;
    }
    border-right: 1px solid #e6e6e6;
  }
  .el-main {
    padding: 40px;
    padding-bottom: 0px;
    display: flex;
    justify-content: center;
  }
}</style
>,
<style lang="less">
.el-menu span {
  font-family: "Pingfang SC";
}
</style>
