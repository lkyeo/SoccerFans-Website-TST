<template>
  <div class="comcontainer" id="cmom">
    <!--提交评论 -->
    <div class="submit">
      <el-input
        v-model="commentSubmit"
        maxlength="75"
        placeholder="写下你的评论。。。"
        @keyup.enter.native="submitComment"
      ></el-input>
    </div>
    <!-- 评论区 -->
    <div class="comments">
      <div class="comTag">
        <span>评论（{{ commentNum }}）</span>
        <div class="comControl">
          <el-link @click="orderHot">热度</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link @click="orderRecent">最近</el-link>
        </div>
      </div>
      <div class="comContent">
        <ul>
          <li
            v-for="(com, i) in commentHotList"
            v-bind:key="'hot' + i"
            class="list-comment"
          >
            <div class="user-info">
              <span>{{ com.username }}</span>
            </div>
            <div class="comment">
              <p>{{ com.content }}</p>
            </div>
            <div class="footer">
              <div class="hot">
                <i class="el-icon-medal">优质评论</i>
              </div>
              <div class="commentOp">
                <el-link
                  icon="el-icon-trophy"
                  @click="agree(com.cmentid, i, 'h')"
                  >{{ com.agree }}</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link icon="el-icon-aim" @click="report(com.cmentid)"
                  >举报</el-link
                >
              </div>
            </div>
          </li>

          <li
            v-for="(com, i) in commentList"
            v-bind:key="i"
            class="list-comment"
          >
            <div class="user-info">
              <span>{{ com.username }}</span>
            </div>
            <div class="comment">
              <p>{{ com.content }}</p>
            </div>
            <div class="footer">
              <div class="commentOp">
                <el-link
                  icon="el-icon-trophy"
                  @click="agree(com.cmentid, i, 'c')"
                  >{{ com.agree }}</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link icon="el-icon-aim" @click="report(com.cmentid)"
                  >举报</el-link
                >
              </div>
            </div>
          </li>
        </ul>
        <div class="loading">
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">暂时没有更多了</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noMore: false,
      loading: false,
      commentNum: 0,
      order: 0,
      current: 0,
      commentSubmit: "",
      commentHotList: [],
      commentList: [],
      username: "AwuLuan",
      commentContent: "",
      commentLike: 274
    };
  },
  mounted() {
    // window.addEventListener("scroll", this.scrollBottom, true);

    window.addEventListener("scroll", this.scrollBottom);

    this.firstRender();
  },
  methods: {
    scrollBottom() {
      // 滚动到页面底部时
      const el = document.getElementById("body");
      const windowHeight = window.screen.height;
      const scrollTop = document.documentElement.scrollTop;
      const contentHeight = el.clientHeight;
      const toBottom = contentHeight - windowHeight - scrollTop;
      // console.log(contentHeight);
      // console.log(scrollTop);
      // console.log(toBottom);
      if (toBottom < 5 && !this.noMore && !this.loading) {
        this.loading = true;
        // 请求的数据未加载完成时
        this.load(this.order, 6);
      }
    },
    load(order, num) {
      var timeout = 0;
      if (num == 6) {
        timeout = 800;
      }
      setTimeout(() => {
        let data = {
          newsid: this.$route.params.newsid,
          order: order,
          num: num,
          current: this.current
        };
        // console.log(data);
        this.$ajax
          .post("api/commentList.php", this.$qs.stringify(data))
          .then(res => {
            // console.log(res);
            if (res["data"].status == "201") {
              this.loading = false;
              this.noMore = true;
            } else if (res["data"].status == "101") {
              for (var i in res["data"].data) {
                this.commentList.push(res["data"].data[i]);
              }
              this.loading = false;
              this.current += num;
              if (res["data"].data.length < num) {
                this.noMore = true;
              }
            }
          });
      }, timeout);
    },
    firstRender() {
      let params = {
        newsid: this.$route.params.newsid
      };
      this.$ajax
        .post("api/commentNum.php", this.$qs.stringify(params))
        .then(res => {
          this.commentNum = res["data"].num;
        });

      let data = {
        newsid: this.$route.params.newsid,
        order: 1,
        num: 3,
        current: 0
      };
      // console.log(data);
      this.$ajax
        .post("api/commentList.php", this.$qs.stringify(data))
        .then(res => {
          // console.log(res);
          if (res["data"].status == "201") {
            this.loading = false;
            this.noMore = true;
          } else if (res["data"].status == "101") {
            for (var i in res["data"].data) {
              this.commentHotList.push(res["data"].data[i]);
            }
            this.loading = false;
            if (res["data"].data.length < 3) {
              this.noMore = true;
            }
          }
        });
      // console.log(this.commentHotList);

      this.load(0, 3);
    },
    submitComment() {
      var uid = this.$cookies.get("uid");
      if (uid == null) {
        this.$msg.error("游客无法发布评论！");
      } else {
        if (this.commentSubmit == "") {
          this.$msg.error("先写点东西吧！");
          return;
        }
        let data = {
          uid: uid,
          nid: this.$route.params.newsid,
          content: this.commentSubmit
        };
        this.$ajax
          .post("api/commentSubmit.php", this.$qs.stringify(data))
          .then(res => {
            if (res["data"].status == "101") {
              this.commentSubmit = "";
              this.$msg.success("评论成功！");
            } else {
              console.log(res);
              this.$msg.error("遭遇次元壁！");
            }
          });
      }
    },
    orderHot() {
      this.current = 0;
      this.noMore = false;
      this.loading = false;
      this.commentHotList = [];
      this.commentList = [];
      this.order = 1;
      this.load(1, 8);
    },
    orderRecent() {
      this.current = 0;
      this.noMore = false;
      this.loading = false;
      this.commentHotList = [];
      this.commentList = [];
      this.order = 0;
      this.load(0, 8);
    },
    agree(cmentid, listindex, where) {
      let data = {
        cmentid: cmentid
      };
      this.$ajax
        .post("api/commentAgree.php", this.$qs.stringify(data))
        .then(res => {
          switch (where) {
            case "h":
              this.commentHotList[listindex].agree++;
              break;
            case "c":
              this.commentList[listindex].agree++;
              break;
          }
        });
    },
    report(cmentid) {
      let data = {
        cmentid: cmentid
      };
      this.$ajax
        .post("api/commentReport.php", this.$qs.stringify(data))
        .then(res => {
          switch (res["data"].status) {
            case "101":
              this.$msg.success("举报成功！");
              break;
            case "102":
              this.$msg.error("已经被举报了!");
              break;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.comcontainer {
  .comments {
    background: #fff;
    margin-top: 22px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 12px 15px;
    padding-bottom: 0px;
    overflow: auto;
    .comTag {
      display: block;
      .comControl {
        float: right;
      }
    }
    .comContent {
      // li层
      .list-comment {
        display: flex;
        width: 666px;
        flex-direction: column;
        justify-content: space-between;
        height: 100px;
        padding: 16px 12px;
        border-bottom: 1px solid #e0e0e0;

        .footer {
          display: block;
          bottom: 0;
          // 热门标志
          .hot {
            display: inline-block;
            color: #6f6e6b;
            .el-icon-medal {
              font-size: 14px;
            }
          }
        }
      }
    }
    .loading {
      display: block;
      padding: 16px;
      text-align: center;
      font-size: 15px;
    }
  }
}</style
>,
<style lang="less">
.comments {
  .el-divider--vertical {
    margin: 0px 8px;
  }
}
.submit {
  background: #fff;
  margin-top: 22px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  .el-input .el-input__inner {
    border: none;
    outline: none;
  }
}
.commentOp {
  float: right;
  .el-link {
    .el-link--inner {
      font-size: 14px;
    }
  }
}
</style>
