<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#fff"
    text-color="#000"
    active-text-color="#59d1d2"
    mode="vertical"
    router
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-reading"></i>
        <span>文章类</span>
      </template>
      <el-menu-item index="/admin/addNews">发布文章</el-menu-item>
      <el-menu-item index="/admin/newslist">文章列表</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>数据类</span>
      </template>
      <el-menu-item index="/admin/leaguetable">积分榜</el-menu-item>
      <el-menu-item index="/admin/playertable">球员榜</el-menu-item>
      <el-menu-item index="/admin/teamtable">球队榜</el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">审查类</span>
      </template>

      <el-menu-item index="/admin/users">用户列表</el-menu-item>
      <el-menu-item index="/admin/reports">处理举报</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.el-menu {
  border: 0px;
}
</style>
