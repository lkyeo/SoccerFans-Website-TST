<template>
  <div class="slidebar">
    <el-menu default-active="1" class="el-menu-vertical-demo" mode="vertical">
      <el-menu-item index="1">
        <span slot="title">热门</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span slot="title">关注</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span slot="title">中超</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span slot="title">英超</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span slot="title">西甲</span>
      </el-menu-item>
      <el-menu-item index="6">
        <span slot="title">德甲</span>
      </el-menu-item>
      <el-menu-item index="7">
        <span slot="title">意甲</span>
      </el-menu-item>
      <el-menu-item index="8">
        <span slot="title">法甲</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.slidebar {
  display: inline-block;
  vertical-align: top;
  width: 72px;
  height: 100%;
  text-align: center;
  margin-right: 36px;
  .el-menu {
    border-right: 0px;
  }
}
</style>
