<template>
  <div>
    <top-bar></top-bar>
    <div class="body">
      <slide-bar></slide-bar>
      <container-box></container-box>
      <right-bar></right-bar>
    </div>
  </div>
</template>
<script>
import topbar from "../components/topbar.vue";
import slidebar from "../components/slidebar.vue";
import container from "../components/container.vue";
import rightbar from "../components/rightbar.vue";
export default {
  components: {
    "top-bar": topbar,
    "slide-bar": slidebar,
    "container-box": container,
    "right-bar": rightbar
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.body {
  // border: 1px solid #000;
  width: 1180px;
  margin: 0 auto;
  // height: 2000px;
}
</style>
