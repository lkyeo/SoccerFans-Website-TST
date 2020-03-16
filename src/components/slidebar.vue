<template>
  <div class="slidebar">
    <el-menu class="el-menu-vertical-demo" mode="vertical" router>
      <el-menu-item index="/">
        <span slot="title">热门</span>
      </el-menu-item>
      <el-menu-item v-if="uid" index="/following">
        <span slot="title">关注</span>
      </el-menu-item>
      <el-menu-item index="/ch/1">
        <span slot="title">中超</span>
      </el-menu-item>
      <el-menu-item index="/ch/2">
        <span slot="title">英超</span>
      </el-menu-item>
      <el-menu-item index="/ch/3">
        <span slot="title">西甲</span>
      </el-menu-item>
      <el-menu-item index="/ch/4">
        <span slot="title">德甲</span>
      </el-menu-item>
      <el-menu-item index="/ch/5">
        <span slot="title">意甲</span>
      </el-menu-item>
      <el-menu-item index="/ch/6">
        <span slot="title">法甲</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uid: this.$cookies.get("uid")
    };
  },
  methods: {}
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
