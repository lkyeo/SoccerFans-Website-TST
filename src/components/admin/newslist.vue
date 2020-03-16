<template>
  <div class="container" style="height:100%" v-loading="containerLoad">
    <div class="toplist">
      <ul class="list clearfix">
        <li
          v-for="(news, i) in newsTopList"
          v-bind:key="'hot' + i"
          class="list-item list-hot"
        >
          <div class="news">
            <el-image
              style="width: 180px; height: 130px"
              :src="news.cover"
              fit="cover"
            ></el-image>
            <div class="newsinfo">
              <div class="title">
                <span>
                  {{ news.title }}
                </span>
              </div>
              <div class="foot">
                <div class="top">
                  <span>头条</span>
                </div>
                <div class="common">
                  <span>@{{ news.club }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>评论:{{ news.commentNum }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="control">
            <div class="btn">
              <el-button @click="jumpTopNews(news.newsid)">查看</el-button>

              <el-button type="danger" @click="topCancel(news.newsid)"
                >取消置顶</el-button
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="table" v-loading="vload">
      <el-table
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="title" label="新闻标题" width="410">
        </el-table-column>
        <el-table-column
          prop="league"
          label="所属联赛"
          width="80"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column prop="club" label="所属俱乐部" width="120">
        </el-table-column>
        <el-table-column prop="comnum" label="评论数" width="80">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="jumpNews(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button size="mini" @click="topSet(scope.row)">置顶</el-button>

            <el-button
              size="mini"
              type="danger"
              @click="deleteCom(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <div class="controlpad">
        <el-select
          v-model="lid"
          placeholder="所有联赛"
          size="small"
          style="width:120px"
          @change="selectLeague"
        >
          <el-option
            v-for="l in leagues"
            v-bind:key="l.lid"
            :label="l.leaguename"
            :value="l.lid"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="cid"
          placeholder="所有球队"
          size="small"
          style="width:160px"
          @change="selectClub"
        >
          <el-option
            v-for="c in clubs"
            v-bind:key="c.cid"
            :label="c.clubname"
            :value="c.cid"
          >
          </el-option>
        </el-select>
      </div>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="currentPage"
          :page-size="pageSize"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vload: false,
      containerLoad: false,
      uid: this.$cookies.get("uid"),
      newsTopList: [],
      tableData: [],
      total: 0,
      pageSize: 8,
      currentPage: 1,
      leagues: [],
      clubs: [{ cid: 0, clubname: "所有球队" }],
      lid: 0,
      cid: 0
    };
  },
  mounted() {
    this.topList();
    this.leagueList();
    this.getTotal();
    this.getData();
  },
  watch: {
    currentPage(oldV, newV) {
      // console.log(this.currentPage);
      this.getData();
    }
  },
  methods: {
    topList() {
      this.$ajax.get("api/newsHotList.php").then(res => {
        // console.log(res);
        if (res["data"].status == "101") {
          // console.log(res);
          for (var i in res["data"].data) {
            this.newsTopList.push(res["data"].data[i]);
          }
        }
      });
    },
    leagueList() {
      this.$ajax.get("api/leagueList.php").then(res => {
        if (res["data"].status == "201") {
          console.log(res);
        } else {
          this.leagues = res["data"].data;
          // console.log(this.leagues);
          this.leagues.unshift({ lid: 0, leaguename: "所有联赛" });
        }
      });
    },
    jumpTopNews(newsid) {
      this.$router.push("/news/" + newsid);
    },
    topCancel(newsid) {
      let data = {
        newsid: newsid
      };
      this.$ajax
        .post("api/newsTopCancel.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "101") {
            this.newsTopList = [];
            this.topList();
            this.$msg.success("取消成功！");
          } else {
            this.$msg.error("出问题");
          }
        });
    },
    selectLeague(lid) {
      // console.log(lid);
      if (lid == 0) {
        this.clubs = [{ cid: 0, clubname: "所有球队" }];
        this.cid = 0;
      } else {
        this.cid = 0;
        let data = {
          lid: this.lid
        };
        this.$ajax
          .post("api/clubList.php", this.$qs.stringify(data))
          .then(res => {
            if (res["data"].status == "201") {
              console.log(res);
            } else {
              this.clubs = res["data"].data;
              this.clubs.unshift({ cid: 0, clubname: "所有球队" });
            }
          });
      }
      this.currentPage = 1;

      this.getTotal();
      this.getData();
    },
    selectClub(cid) {
      this.currentPage = 1;
      console.log(cid);
      this.getTotal();
      this.getData();
    },

    formatter(row, column) {
      switch (row.league) {
        case "1":
          return "中超";
          break;
        case "2":
          return "英超";
          break;
        case "3":
          return "西甲";
          break;
        case "4":
          return "德甲";
          break;
        case "5":
          return "意甲";
          break;
        case "6":
          return "法甲";
          break;
      }
    },
    jumpNews(index, row) {
      this.$router.push("/news/" + row.newsid);
    },
    // 新闻列表内的新闻置顶功能
    topSet(row) {
      let data = {
        newsid: row.newsid
      };
      this.$ajax
        .post("api/newsTopSet.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "101") {
            this.newsTopList = [];
            this.topList();
            this.$msg.success("置顶成功！");
          } else {
            this.$msg.error("出问题");
          }
        });
    },
    deleteCom(index, row) {
      let data = {
        newsid: row.newsid
      };
      this.$ajax.post("api/newsDel.php", this.$qs.stringify(data)).then(res => {
        if (res["data"].status == "101") {
          this.getTotal();
          this.getData();
          this.$msg.success("删除成功！");
        } else {
          this.$msg.error("出问题");
        }
      });
    },
    getTotal() {
      let data = {
        lid: this.lid,
        cid: this.cid
      };
      this.$ajax
        .post("api/newsTotalGet.php", this.$qs.stringify(data))
        .then(res => {
          console.log(res);
          if (res["data"].status == "101") {
            this.total = res["data"].total;
          } else {
            this.$msg.error("获取页码失败");
          }
        });
    },
    getData() {
      this.vload = true;
      let data = {
        cid: this.cid,
        lid: this.lid,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      // console.log(data);
      setTimeout(() => {
        this.$ajax
          .post("api/newsListGet.php", this.$qs.stringify(data))
          .then(res => {
            console.log(res);
            if (res["data"].status == "101") {
              this.tableData = res["data"].data;
            } else {
              this.tableData = [];
            }
          });
        this.vload = false;
      }, 800);
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: auto;
}
.toplist .list {
  padding: 0;
  li {
    list-style: none;
    border: 1px solid #ebeef5;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
    .news {
      display: flex;
      width: 58%;
      justify-content: space-between;
      .newsinfo {
        height: 130px;
        width: 320px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .title {
          span {
            color: black;
            font-size: 18px;
            font-weight: 600;
          }
        }
        .foot {
          display: flex;
          justify-content: space-between;
          span {
            color: #969b9f;
            font-size: 14px;
          }
        }
      }
    }
    .control {
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.table {
  width: 900px;
  padding: 12px;
  padding-bottom: 24px;
  border: 1px solid #ebeef5;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  .controlpad {
    .el-select {
      margin-right: 16px;
    }
  }
}
</style>
