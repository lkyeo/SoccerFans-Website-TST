<template>
  <div class="container">
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="uid" label="ID" width="180"> </el-table-column>
        <el-table-column prop="username" label="用户名" width="220">
        </el-table-column>
        <el-table-column prop="comments" label="评论数" width="90">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="90"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="permit(scope.$index, scope.row)"
              >解封</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="ban(scope.$index, scope.row)"
              >封锁</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="nlfooter">
      <div class="controlpad">
        <el-select
          v-model="list"
          size="small"
          style="width:120px"
          @change="listChange"
        >
          <el-option label="所有用户" value="0"> </el-option>
          <el-option label="封锁列表" value="1"> </el-option>
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
      uid: this.$cookies.get("uid"),
      list: "0",
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
      switch (row.status) {
        case "0":
          return "正常";
          break;
        case "1":
          return "封禁";
          break;
      }
    },
    permit(index, row) {
      if (row.status == "0") {
        this.$msg.error("该账户没有被封锁");
      } else {
        let data = {
          uid: row.uid
        };
        this.$ajax
          .post("api/userPermit.php", this.$qs.stringify(data))
          .then(res => {
            if (res["data"].status == "101") {
              row.status = "0";
              this.$msg.success("已解封该账户");
            } else {
              this.$msg.error("出问题");
            }
          });
      }
    },
    ban(index, row) {
      if (row.status == "1") {
        this.$msg.error("该账户已经被封锁");
      } else {
        let data = {
          uid: row.uid
        };
        this.$ajax
          .post("api/userBan.php", this.$qs.stringify(data))
          .then(res => {
            if (res["data"].status == "101") {
              row.status = "1";
              this.$msg.success("已封锁该账户");
            } else {
              this.$msg.error("出问题");
            }
          });
      }
    },
    getTotal() {
      let data = {
        list: this.list
      };
      this.$ajax
        .post("api/userTotalGet.php", this.$qs.stringify(data))
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
      let data = {
        list: this.list,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      this.$ajax
        .post("api/userListGet.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "101") {
            this.tableData = res["data"].data;
          } else {
            this.tableData = [];
          }
        });
    },
    listChange() {
      this.currentPage = 1;
      this.getTotal();
      this.getData();
    }
  }
};
</script>
<style lang="less" scoped>
.table {
  width: 730px;
  padding: 12px;
  padding-bottom: 35px;
  border: 1px solid #ebeef5;
}
.nlfooter {
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
