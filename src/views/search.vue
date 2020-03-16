<template>
  <div class="container" v-loading="loading">
    <div class="inner">
      <div class="searchbar">
        <el-button icon="el-icon-s-home" circle @click="pushHome"></el-button>
        <el-input
          placeholder="请输入内容"
          v-model="keyword"
          class="input-with-select"
          @keyup.enter.native="search"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"
            >点击搜索</el-button
          >
        </el-input>
      </div>
      <div class="content" v-if="show">
        <ul>
          <li v-for="(news, i) in searchRes" v-bind:key="i">
            <el-image
              style="width: 180px; height: 130px"
              :src="news.cover"
              fit="cover"
              @click="pushNews(news.newsid)"
            ></el-image>
            <div class="newsinfo">
              <div class="news-title">
                <span @click="pushNews(news.newsid)">{{ news.title }}</span>
              </div>
              <div class="news-content">
                <span @click="pushNews(news.newsid)">{{ news.content }}</span>
              </div>
              <div class="footer">
                <span></span>
                <span @click="clubSearch(news.clubname)"
                  >@{{ news.clubname }}</span
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="page" v-if="show">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="currentPage"
          :page-size="pageSize"
        >
        </el-pagination>
      </div>
      <div class="tips" v-if="!show">
        <span>{{ tips }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: this.$route.query.keyword,
      keywordData: [],
      searchRes: [],
      total: 0,
      currentPage: 1,
      pageSize: 8,
      show: false,
      loading: false,
      tips: ""
    };
  },
  mounted() {
    this.checkKeyword();
    this.search();
  },
  watch: {
    currentPage(oldV, newV) {
      console.log(this.currentPage);
      this.getData();
    }
  },
  methods: {
    checkKeyword() {
      if (this.keyword == "" || this.keyword == null) {
        this.tips = "输入以搜索。。。";
        this.show = false;
      } else {
        this.show = true;
      }
    },
    pushHome() {
      this.$router.push("/");
    },
    pushNews(newsid) {
      const { href } = this.$router.resolve({
        name: "news",
        params: { newsid: newsid }
      });
      window.open(href, "_blank");
    },
    search() {
      this.checkKeyword();
      if (this.show) {
        this.loading = true;
        this.$router.push({
          query: { keyword: this.keyword }
        });
        this.keywordData = this.keyword.trim().split(/\s+/);
        setTimeout(() => {
          this.getTotal();
          this.getData();
          this.loading = false;
        }, 800);
      }
    },
    clubSearch(clubname) {
      this.keyword = clubname;
      this.search();
    },
    getTotal() {
      this.$ajax
        .post("api/searchTotalGet.php", this.$qs.stringify(this.keywordData))
        .then(res => {
          if (res["data"].status == "101") {
            this.total = res["data"].total;
            if (this.total == 0) {
              this.show = false;
              this.tips = "没有返回数据，换个关键词吧！";
            }
          } else {
            this.$msg.error("获取页码失败");
          }
        });
    },
    getData() {
      let data = {
        keyword: this.keyword,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      this.$ajax
        .post("api/searchDataGet.php", this.$qs.stringify(data))
        .then(res => {
          console.log(res);
          this.searchRes = res["data"].data;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 22px 0px;
  display: flex;
  justify-content: center;
  .inner {
    width: 720px;

    .searchbar {
      display: flex;
      justify-content: space-between;
      .el-input {
        width: 640px;
      }
    }
    .content {
      ul {
        padding: 0;
        margin: 22px 0;
        li {
          list-style: none;
          border: 1px solid #ebeef5;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          overflow: hidden;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          .el-image {
            cursor: pointer;
          }
          .newsinfo {
            padding: 12px;
            width: 500px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .news-title {
              span {
                font-size: 18px;
                font-weight: 600;
                cursor: pointer;
              }
            }
            .news-content {
              span {
                display: block;
                overflow: hidden;
                overflow-wrap: break-word;
                font-size: 15px;
                cursor: pointer;
              }
            }
            .footer {
              display: flex;
              justify-content: space-between;
              span {
                color: #909399;
                font-size: 14px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .page {
      display: flex;
      justify-content: center;
      margin-bottom: 22px;
    }
    .tips {
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      span {
        margin-top: 22px;
        display: block;
        font-size: 22px;
        color: #153c60;
      }
    }
  }
}
</style>
