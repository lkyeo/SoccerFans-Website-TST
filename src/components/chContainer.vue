<template>
  <div class="container" id="content">
    <ul class="list clearfix">
      <li v-for="(news, i) in newsList" v-bind:key="i" class="list-item">
        <el-image
          style="width: 160px; height: 105px"
          :src="news.cover"
          fit="cover"
        ></el-image>
        <div class="newsinfo">
          <div class="content">
            <div class="link">
              <router-link
                :to="{ path: '/news/' + news.newsid }"
                style="text-decoration:none"
                ><span>
                  {{ news.title }}
                </span>
              </router-link>
            </div>
          </div>
          <div class="foot">
            <span>@{{ news.club }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>评论:{{ news.commentNum }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="loading">
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">暂时没有更多了</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      noMore: false,
      newsList: [],
      current: 0,
      ch: this.$route.params.ch
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollBottom, true);
    this.firstRender();
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (this.$route.params.ch) {
        this.ch = this.$route.params.ch;
        this.$parent.reload();
      }
    }
  },
  methods: {
    scrollBottom() {
      // 滚动到页面底部时
      const el = document.getElementById("content");
      const windowHeight = window.screen.height;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const contentHeight = el.clientHeight;
      const toBottom = contentHeight - windowHeight - scrollTop;
      if (toBottom < 10 && !this.noMore && !this.loading) {
        this.loading = true;
        // 请求的数据未加载完成时
        this.load(6);
      }
    },
    firstRender() {
      this.load(12);
    },
    load(num) {
      var timeout = 0;
      if (num == 6) {
        timeout = 800;
      }
      this.loading = true;
      setTimeout(() => {
        let data = {
          num: num,
          current: this.current,
          ch: this.ch
        };
        this.$ajax
          .post("api/newsList.php", this.$qs.stringify(data))
          .then(res => {
            // console.log(res);
            if (res["data"].status == "201") {
              this.loading = false;
              this.noMore = true;
            } else if (res["data"].status == "101") {
              // console.log(res);
              for (var i in res["data"].data) {
                this.newsList.push(res["data"].data[i]);
              }
              this.loading = false;
              this.current += num;
              if (res["data"].data.length < num) {
                this.noMore = true;
              }
            }
          });
      }, timeout);
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 700px;
  height: 100%;
  display: inline-block;
  overflow-x: hidden;
  overflow-y: scroll;
  // .clearfix:after {
  //   // 清除浮动
  //   content: "";
  //   display: block;
  //   height: 0;
  //   clear: both;
  //   visibility: hidden;
  // }
  .list {
    margin-bottom: 0px;
  }

  li {
    list-style: none;
    display: flex;
    width: 90%;
    height: 105px;
    border-bottom: 1px solid #e0e0e0;
    padding: 12px 0px;
    justify-content: space-between;

    .newsinfo {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: auto;
      .content {
        width: 395px;
        .link {
          font-size: 18px;
          span {
            color: #111;
          }
          font-weight: 600;
        }
      }
      .foot {
        display: block;
        color: #777;
        font-weight: 200;
        font-size: 14px;
        text-align: right;
      }
    }
  }
  .loading {
    display: block;
    padding: 16px;
    text-align: center;
    font-size: 15px;
  }
  // border: 1px solid black;
}
.container::-webkit-scrollbar {
  display: none;
}
</style>
