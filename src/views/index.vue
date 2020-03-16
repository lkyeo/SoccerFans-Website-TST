<template>
  <div v-loading="vloading">
    <top-bar></top-bar>
    <div class="body">
      <slide-bar></slide-bar>
      <!-- <container-box></container-box> -->
      <router-view v-if="update"></router-view>
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
    return {
      update: true,
      vloading: false
    };
  },
  methods: {
    reload() {
      // 移除组件
      this.update = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true;
      });
    }
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
