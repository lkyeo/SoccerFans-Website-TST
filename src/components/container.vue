<template>
  <div class="container">
    <ul
      class="infinite-list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      style="overflow:auto"
    >
      <li v-for="i in count" v-bind:key="i" class="list-item">
        <el-image
          style="width: 160px; height: 105px"
          :src="url"
          :fit="cover"
        ></el-image>
        <div class="newsinfo">
          <div class="content">
            <el-link :underline="false"
              >你在无中生有 你在暗度陈仓 你在凭空想象 你在凭空捏造
            </el-link>
            <div class="foot">
              <span>@球队</span>
              <el-divider direction="vertical"></el-divider>
              <span>评论数</span>
            </div>
          </div>
        </div>
      </li>
      <p v-if="loading">加载中...</p>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      count: 10,
      loading: false
    };
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    }
  }
};
</script>
<style lang="less">
.container {
  width: 700px;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  li {
    list-style: none;
    display: block;
    float: left;
    width: 90%;
    height: 105px;
    border-bottom: 1px solid #e0e0e0;
    padding: 12px 0px;
    .newsinfo {
      display: flex;
      align-items: center;
      float: right;
      height: 100%;
      width: auto;
      // border: 1px solid #777;
      // background: #111;
      .content {
        width: 400px;
        margin: 0 auto;
        // text-align: center;
        .el-link {
          font-size: 20px;
          color: #111;
          font-weight: 600;
        }
        .foot {
          display: block;
          color: #777;
          font-weight: 200;
          font-size: 14px;
          margin-top: 16px;
        }
      }
    }
  }
  // border: 1px solid black;
}
</style>
