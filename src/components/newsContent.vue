<template>
  <div class="content">
    <el-carousel height="420px">
      <el-carousel-item v-for="(img, index) in imgList" :key="index">
        <el-image
          style="height:420px"
          v-bind:src="img.url"
          fit="cover"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
    <span v-for="(text, i) in textList" :key="i">{{ text }} </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [],
      textList: []
    };
  },
  mounted: function() {
    this.newsRender();
  },
  methods: {
    newsRender() {
      let data = {
        newsid: this.$route.params.newsid
      };
      this.$ajax
        .post("api/getNewsContent.php", this.$qs.stringify(data))
        .then(res => {
          // console.log(res);

          if (res["data"]["status"] == "101") {
            this.textList = Object.values(res["data"].text);
            this.imgList = res["data"].img;
            // console.log(this.imgList);
          } else {
            console.log(res);
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  background: #fff;
  padding: 12px 38px;
  margin-top: 22px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  span {
    font-size: 15px;
    display: block;
    // text-indent: 2em;
    line-height: 1.6;
    margin: 21px 0;
  }
  .el-image {
    display: block;
    margin: 21px auto;
  }
}
</style>
