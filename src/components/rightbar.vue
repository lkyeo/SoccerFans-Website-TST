<template>
  <div class="rightbar">
    <!-- 搜索框 -->
    <div class="search">
      <el-input
        @keyup.enter.native="search"
        v-model="keyword"
        placeholder=""
        suffix-icon="el-icon-search"
      ></el-input>
    </div>
    <!-- 用户区域 -->
    <div class="userarea">
      <div class="login userdiv" v-show="showLogin">
        <span class="info">登录后以发布评论、添加收藏，并能关注你的主队</span>
        <el-button type="primary" @click="loginRoute">登录</el-button>
      </div>
      <div class="user userdiv" v-show="showUser">
        <span class="info">欢迎你，{{ username }}</span>
        <div class="operate">
          <el-link @click="toUsercenter">个人中心</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link @click="toNewsfav">我的收藏</el-link>
        </div>
        <div class="quit">
          <el-link type="info" @click="clearUser">退出登录</el-link>
        </div>
      </div>
    </div>
    <!-- 友情链接 -->
    <div class="links"></div>
    <!-- 网站信息 -->
    <div class="webinfo"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
      username: null,
      showLogin: false,
      showUser: false
    };
  },
  created: function() {
    this.checkUser();
  },
  methods: {
    loginRoute() {
      this.$router.push("/login");
    },
    checkUser() {
      this.username = this.$cookies.get("username");
      if (this.username == null) {
        this.showLogin = true;
        this.showUser = false;
      } else {
        this.showUser = true;
        this.showLogin = false;
      }
    },
    clearUser() {
      this.$cookies.remove("uid");
      this.$cookies.remove("username");
      this.$msg("已退出当前用户");
      this.checkUser();
      this.$router.go(0);
    },
    toUsercenter() {
      this.$router.push("/usercenter");
    },
    toNewsfav() {
      this.$router.push("/usercenter/newsfav");
    },
    search() {
      console.log(this.keyword);
      this.$router.push({ name: "search", query: { keyword: this.keyword } });
    }
  }
};
</script>
<style lang="less">
.rightbar {
  width: 320px;
  // display: inline-block;
  // border: 1px solid red;
  float: right;
  .search {
    margin: 16px 0px;
  }
  .userarea {
    // width: 318px;
    height: 220px;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    .userdiv {
      width: 220px;
      margin: 0 auto;
      text-align: center;
      .info {
        display: block;
        margin-bottom: 12px;
        font-size: 14px;
        color: #777;
      }
      .el-button {
        width: 100%;
      }
    }
    .user {
      .operate {
        margin-bottom: 12px;
        .el-link {
          font-size: 22px;
        }
        .el-divider {
          font-size: 22px;
        }
      }
      .quit {
        .el-link {
          font-size: 12px;
          color: #777;
        }
      }
    }
  }
}
</style>
