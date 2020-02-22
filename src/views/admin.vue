<template>
  <el-container class="full-container">
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
      <el-main>Main</el-main>
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
    return {};
  },
  methods: {
    quit() {}
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
  color: #333;
  text-align: center;
  line-height: 80px;
}
</style>
