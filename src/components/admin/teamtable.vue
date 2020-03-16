<template>
  <div class="container">
    <div class="top">
      <el-radio-group v-model="league" size="medium" @change="leagueChange">
        <el-radio-button label="1">中超</el-radio-button>
        <el-radio-button label="2">英超</el-radio-button>
        <el-radio-button label="3">西甲</el-radio-button>
        <el-radio-button label="4">德甲</el-radio-button>
        <el-radio-button label="5">意甲</el-radio-button>
        <el-radio-button label="6">法甲</el-radio-button>
      </el-radio-group>
    </div>

    <div class="data">
      <el-tabs v-model="item" tab-position="left" @tab-click="itemChange">
        <el-tab-pane label="进球" name="goal"></el-tab-pane>
        <el-tab-pane label="控球率" name="possession"></el-tab-pane>
        <el-tab-pane label="黄牌" name="yellowcard"></el-tab-pane>
        <el-tab-pane label="红牌" name="redcard"></el-tab-pane>
        <el-tab-pane label="射门" name="shoot"></el-tab-pane>
        <el-tab-pane label="射正" name="shootintarget"></el-tab-pane>
        <el-tab-pane label="传球" name="pass"></el-tab-pane>
        <el-tab-pane label="成功传球" name="passsuccess"></el-tab-pane>
      </el-tabs>
      <el-table :data="tableData" v-loading="vload">
        <el-table-column prop="rank" label="排名" width="180px">
        </el-table-column>
        <el-table-column prop="clubname" label="球队"> </el-table-column>

        <el-table-column :label="dataname">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.data"
              controls-position="right"
              :min="0"
              :precision="0"
              :blur="empty(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <div></div>
      <div class="button">
        <el-popover
          placement="top"
          width="160"
          v-model="fvisible"
          style="margin-right:12px;"
        >
          <p>列表将重新更新排名，当前没有提交的数据将会丢失，继续吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="f5(false)"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="f5(true)"
              >确定</el-button
            >
          </div>
          <el-button slot="reference">更新排名</el-button>
        </el-popover>

        <el-popover placement="top" width="160" v-model="visible">
          <p>原先的数据将丢失，确定更新吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="update(false)"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="update(true)"
              >确定</el-button
            >
          </div>
          <el-button slot="reference">更新数据</el-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      league: "1",
      item: "goal",
      dataname: "进球",
      tableData: [],
      vload: false,
      visible: false,
      fvisible: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    leagueChange() {
      this.item = "goal";
      this.getData();
    },
    itemChange() {
      switch (this.item) {
        case "goal":
          this.dataname = "进球";
          break;
        case "possession":
          this.dataname = "控球率";
          break;
        case "yellowcard":
          this.dataname = "黄牌";
          break;
        case "redcard":
          this.dataname = "红牌";
          break;
        case "shoot":
          this.dataname = "射门";
          break;
        case "shootintarget":
          this.dataname = "射正";
          break;
        case "pass":
          this.dataname = "传球";
          break;
        case "passsuccess":
          this.dataname = "成功传球";
          break;
      }
      this.getData();
    },

    getData() {
      let data = {
        lid: this.league,
        item: this.item
      };
      this.vload = true;
      setTimeout(() => {
        this.$ajax
          .post("api/teamTableGet.php", this.$qs.stringify(data))
          .then(res => {
            if (res["data"].status == "101") {
              this.tableData = res["data"].data;
            } else {
              this.tableData = [];
            }
          });
        this.vload = false;
      }, 500);
    },
    empty(row) {
      if (row.data == null) {
        this.$msg.error("输入不能为空，请重新输入，原数据已为0");
        row.data = 0;
      }
    },
    update(bool) {
      this.visible = false;

      if (bool) {
        this.vload = true;
        setTimeout(() => {
          this.$ajax
            .post("api/teamTableUpdate.php", this.$qs.stringify(this.tableData))
            .then(res => {
              if (res["data"].status == "101") {
                this.$msg.success("更新成功！");
              } else {
                this.$msg.error("更新失败");
                console.log(res);
              }
              this.vload = false;
            });
        }, 800);
      }
    },
    f5(bool) {
      this.fvisible = false;
      if (bool) {
        this.getData();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  .top {
    width: auto;
    display: flex;
    justify-content: center;
    padding-bottom: 16px;
  }
  .data {
    display: flex;
    .el-table {
      width: 720px;
      margin-left: 24px;
    }
  }
  .foot {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
