<template>
  <div class="container">
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="newstitle" label="新闻标题" width="220">
        </el-table-column>
        <el-table-column prop="content" label="评论详情" width="360">
        </el-table-column>
        <el-table-column prop="agree" label="点赞数" width="90">
        </el-table-column>
        <el-table-column
          prop="report"
          label="状态"
          width="80"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="jumpNews(scope.$index, scope.row)"
              >查看</el-button
            >
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
</template>
<script>
export default {
  data() {
    return {
      uid: this.$cookies.get("uid"),
      tableData: [],
      total: 0,
      pageSize: 8,
      currentPage: 1
    };
  },
  mounted() {
    this.getTotal();
    this.getData();
  },
  watch: {
    currentPage(oldV, newV) {
      console.log(this.currentPage);
      this.getData();
    }
  },
  methods: {
    formatter(row, column) {
      switch (row.report) {
        case "0":
          return "正常";
          break;
        case "1":
          return "待审核";
          break;
        case "2":
          return "违规";
          break;
      }
    },
    jumpNews(index, row) {
      const { href } = this.$router.resolve({
        name: "news",
        params: { newsid: row.newsid }
      });
      window.open(href, "_blank");
    },
    deleteCom(index, row) {
      let data = {
        cmentid: row.cmentid
      };
      this.$ajax
        .post("api/commentDel.php", this.$qs.stringify(data))
        .then(res => {
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
        uid: this.uid
      };
      this.$ajax
        .post("api/userComTotalGet.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "101") {
            this.total = res["data"].total;
          } else {
            this.$msg.error("获取页码失败");
          }
        });
    },
    getData() {
      let data = {
        uid: this.uid,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      console.log(data);
      this.$ajax
        .post("api/userComGet.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "101") {
            this.tableData = res["data"].data;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.table {
  width: 900px;
  padding: 12px;
  padding-bottom: 35px;
  border: 1px solid #ebeef5;
}
.page {
  width: 900px;
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
