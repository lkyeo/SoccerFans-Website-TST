<template>
  <div class="body">
    <div class="container">
      <div class="header">
        <el-page-header
          @back="goBack"
          content="纽约时报：巴萨已经从21世纪最佳俱乐部，沦为电视剧制作公司"
        >
        </el-page-header>
      </div>
      <con-tent></con-tent>
      <com-ment></com-ment>
    </div>
  </div>
</template>
<script>
import content from "../components/newsContent.vue";
import comment from "../components/comment.vue";

export default {
  components: {
    "con-tent": content,
    "com-ment": comment
  }
};
</script>
<style lang="less" scoped>
.body {
  height: 100%;
}
.container {
  display: block;
  width: 720px;
  margin: 0 auto;
  padding: 12px 0px;
  .header {
    padding: 12px 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 3px;
    background: #fff;
  }
}
</style>
