<template>
  <div class="container">
    <div class="table" v-loading="loading">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="username" label="用户名" width="160">
        </el-table-column>
        <el-table-column prop="content" label="评论详情" width="420">
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
            <el-button
              size="mini"
              type="primary"
              @click="pass(scope.$index, scope.row)"
              >通过</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-if="!locked"
              @click="lock(scope.$index, scope.row)"
              >违规</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="switch">
        <el-switch
          v-model="locked"
          active-text="已锁定"
          inactive-text="待审核"
          @change="switchChange"
        >
        </el-switch>
      </div>
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
      locked: false,
      //locked为true时显示已锁定的评论，为false时显示所有等待处理的评论
      total: 0,
      pageSize: 12,
      currentPage: 1,
      loading: false
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
    pass(index, row) {
      if (row.report == "0") {
        this.$msg.error("该评论没有被举报");
      } else {
        let data = {
          cmentid: row.cmentid
        };
        this.$ajax
          .post("api/reportPass.php", this.$qs.stringify(data))
          .then(res => {
            if (res["data"].status == "101") {
              row.report = "0";
              this.$msg.success("已通过此条举报");
            } else {
              this.$msg.error("出问题");
            }
          });
      }
    },
    lock(index, row) {
      if (row.report == "2") {
        this.$msg.error("该评论已经被设置为违规");
      } else {
        let data = {
          cmentid: row.cmentid
        };
        this.$ajax
          .post("api/reportLock.php", this.$qs.stringify(data))
          .then(res => {
            if (res["data"].status == "101") {
              row.report = "2";
              this.$msg.success("违规已处理");
            } else {
              this.$msg.error("出问题");
            }
          });
      }
    },
    getTotal() {
      let data = {
        locked: this.locked
      };
      this.$ajax
        .post("api/reportTotalGet.php", this.$qs.stringify(data))
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
        locked: this.locked,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      console.log(data);
      this.$ajax
        .post("api/reportDataGet.php", this.$qs.stringify(data))
        .then(res => {
          this.tableData = res["data"].data;
        });
    },
    switchChange() {
      this.loading = true;
      setTimeout(() => {
        this.currentPage = 1;
        this.getTotal();
        this.getData();
        this.loading = false;
      }, 800);
    }
  }
};
</script>
<style lang="less" scoped>
.table {
  width: 900px;
  padding: 12px;
  border: 1px solid #ebeef5;
  .switch {
    margin-top: 12px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
.page {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 12px;
  margin-right: 0px;
}
</style>
