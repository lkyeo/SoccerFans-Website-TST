<template>
  <div class="container">
    <div
      class="favlist"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
    >
      <div class="favcard" v-for="(n, i) in newsList" :key="i">
        <div class="image" @click="pushNews(n.newsid)">
          <el-image
            style="width: 100%; height: 180px;"
            :src="n.cover"
            fit="cover"
          ></el-image>
        </div>
        <div class="footer">
          <div class="news-title">
            <span @click="pushNews(n.newsid)">
              {{ n.title }}
            </span>
          </div>
          <div class="control-button">
            <el-link @click="cancelFav(n.fid, i)">取消收藏</el-link>
          </div>
        </div>
      </div>
      <div class="space-empty"></div>
    </div>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      noMore: false,
      current: 0,
      newsList: []
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    }
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      this.loading = true;
      this.noMore = true;
      let data = {
        uid: this.$cookies.get("uid"),
        current: this.current,
        num: 12
      };
      this.$ajax
        .post("api/newsFavList.php", this.$qs.stringify(data))
        .then(res => {
          // console.log(this.loading);
          if (res["data"].status == "201") {
            this.noMore = true;
          } else if (res["data"].status == "101") {
            for (var i in res["data"].data) {
              this.newsList.push(res["data"].data[i]);
            }

            if (res["data"].data.length < 12) {
              this.current += res["data"].data.length;
              this.noMore = true;
            } else {
              this.noMore = false;
              this.current += 12;
            }
          }
        });
      this.loading = false;
    },
    load() {
      this.loading = true;
      console.log(this.current);
      setTimeout(() => {
        let data = {
          uid: this.$cookies.get("uid"),
          current: this.current,
          num: 6
        };
        this.$ajax
          .post("api/newsFavList.php", this.$qs.stringify(data))
          .then(res => {
            // console.log(this.loading);
            if (res["data"].status == "201") {
              this.loading = false;
              this.noMore = true;
            } else if (res["data"].status == "101") {
              for (var i in res["data"].data) {
                this.newsList.push(res["data"].data[i]);
              }
              if (res["data"].data.length < 6) {
                this.loading = false;
                this.noMore = true;
              } else {
                this.current += 6;
                this.loading = false;
              }
            }
          });
      }, 1200);
    },
    pushNews(newsid) {
      const { href } = this.$router.resolve({
        name: "news",
        params: { newsid: newsid }
      });
      window.open(href, "_blank");
    },
    cancelFav(fid, i) {
      let data = {
        fid: fid
      };
      this.$ajax
        .post("api/newsFavCancel.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "101") {
            this.newsList.splice(i, 1);
            this.$msg.success("取消成功！");
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 960px;
  min-width: 960px;
  overflow-x: hidden;
  overflow-y: scroll;
  p {
    text-align: center;
    display: block;
    width: 100%;
  }
  .favlist {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -20px;
    justify-content: space-between;
  }
  .space-empty {
    width: 280px;
    height: 0;
  }

  .favcard {
    // margin-right: 20px;
    margin-bottom: 20px;
    display: block;
    width: 280px;
    height: 220px;
    overflow: hidden;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    .image {
      height: 180px;
      display: block;
      overflow: hidden;
      cursor: pointer;
    }
    .footer {
      padding: 0px 10px;
      display: flex;
      height: 40px;
      justify-content: space-between;
      align-items: center;
      .news-title {
        display: block;
        cursor: pointer;
        span {
          a {
            text-decoration: none;
            color: black;
          }
          display: block;
          width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
        }
      }
      .control-button {
        .el-link {
          font-size: 13px;
        }
      }
    }
  }
  .favcard:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
.container::-webkit-scrollbar {
  display: none;
}
</style>
