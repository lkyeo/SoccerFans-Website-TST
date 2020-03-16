<template>
  <div id="body">
    <div class="container">
      <el-backtop target=".container" :visibility-height="100"> </el-backtop>

      <div class="header">
        <el-page-header @back="goBack" v-bind:content="newsTitle">
        </el-page-header>
        <el-button
          type="primary"
          icon="el-icon-star-off"
          circle
          size="mini"
          @click="star()"
        ></el-button>
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
  },
  data() {
    return {
      newsTitle: ""
    };
  },
  created: function() {
    this.getNewsTitle();
  },
  methods: {
    star() {
      var uid = this.$cookies.get("uid");
      if (uid == null) {
        this.$msg.error("登录以添加收藏！");
        return;
      }
      let data = {
        uid: uid,
        newsid: this.$route.params.newsid
      };
      this.$ajax
        .post("api/newsStar.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "101") {
            this.$msg.success("收藏成功！");
          } else {
            this.$msg.error("你已经收藏了这条新闻！");
          }
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    getNewsTitle() {
      let data = {
        newsid: this.$route.params.newsid
      };
      this.$ajax
        .post("api/getNewsTitle.php", this.$qs.stringify(data))
        .then(res => {
          // console.log(res);
          if (res["data"]["status"] == "201") {
            this.$msgbox.alert("这个页面暂时找不到了", "出大问题", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push("/");
              }
            });
            // this.$router.go("/#/");
          } else if (res["data"]["status"] == "101") {
            this.newsTitle = res["data"]["data"].title;
          }
        });
    }
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
    display: flex;
    justify-content: space-between;
  }
}</style
>,
<style lang="less">
.header .el-button--mini {
  padding: 5px;
}
</style>
