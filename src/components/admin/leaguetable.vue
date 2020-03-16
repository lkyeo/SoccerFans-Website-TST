<template>
  <div class="container">
    <el-tabs v-model="league" @tab-click="leagueChange">
      <el-tab-pane label="中超" name="1"></el-tab-pane>
      <el-tab-pane label="英超" name="2"></el-tab-pane>
      <el-tab-pane label="西甲" name="3"></el-tab-pane>
      <el-tab-pane label="德甲" name="4"></el-tab-pane>
      <el-tab-pane label="意甲" name="5"></el-tab-pane>
      <el-tab-pane label="法甲" name="6"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" style="width: 100%" v-loading="vload">
      <el-table-column prop="rank" label="排名" width=""> </el-table-column>
      <el-table-column prop="clubname" label="球队" width=""> </el-table-column>

      <el-table-column prop="round" label="场次" width=""> </el-table-column>
      <el-table-column label="胜">
        <template slot-scope="scope">
          <div class="number-display">
            <span>{{ scope.row.win }}</span>
            <div class="button">
              <div class="plus" @click="wdlPlus(scope.row, 'w')">
                +
              </div>
              <div class="minus" @click="wdlMinus(scope.row, 'w')">
                -
              </div>
            </div>
          </div>
          <!-- <el-input-number
            size="mini"
            v-model="scope.row.win"
            controls-position="right"
            :min="0"
            :change="wdlChange(scope.row)"
          ></el-input-number> -->
        </template>
      </el-table-column>
      <el-table-column label="平">
        <template slot-scope="scope">
          <div class="number-display">
            <span>{{ scope.row.draw }}</span>
            <div class="button">
              <div class="plus" @click="wdlPlus(scope.row, 'd')">
                +
              </div>
              <div class="minus" @click="wdlMinus(scope.row, 'd')">
                -
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="负">
        <template slot-scope="scope">
          <div class="number-display">
            <span>{{ scope.row.lose }}</span>
            <div class="button">
              <div class="plus" @click="wdlPlus(scope.row, 'l')">
                +
              </div>
              <div class="minus" @click="wdlMinus(scope.row, 'l')">
                -
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="积分" width=""> </el-table-column>
    </el-table>
    <div class="update">
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
        <el-button
          slot="reference"
          type="primary"
          icon="el-icon-check"
          circle
          class="update-button"
        ></el-button>
      </el-popover>
    </div>
    <div class="footer">
      <span>没有更多球队了。。。</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      league: "1",
      tableData: [
        {
          cid: 1011,
          rank: 1,
          clubname: "上海申花",
          round: 1,
          win: 1,
          draw: 0,
          lose: 0,
          score: 3
        }
      ],
      visible: false,
      vload: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //   胜负平改变时执行的方法
    wdlPlus(row, state) {
      switch (state) {
        case "w":
          row.win++;
          break;
        case "d":
          row.draw++;
          break;
        case "l":
          row.lose++;
          break;
      }
      var win = parseInt(row.win);
      var draw = parseInt(row.draw);
      var lose = parseInt(row.lose);
      row.round = win + draw + lose;
      row.score = 3 * win + 1 * draw;
      while (row.rank != 1 && this.tableData[row.rank - 2].score < row.score) {
        this.tableData[row.rank - 1] = this.tableData[row.rank - 2];
        this.tableData[row.rank - 1].rank++;
        row.rank--;
        this.tableData[row.rank - 1] = row;
      }
    },
    wdlMinus(row, state) {
      switch (state) {
        case "w":
          if (row.win == 0) {
            return;
          }
          row.win--;
          break;
        case "d":
          if (row.draw == 0) {
            return;
          }
          row.draw--;
          break;
        case "l":
          if (row.lose == 0) {
            return;
          }
          row.lose--;
          break;
      }
      row.round = parseInt(row.win) + parseInt(row.draw) + parseInt(row.lose);
      row.score = 3 * row.win + 1 * row.draw;
      while (
        row.rank != this.tableData.length &&
        this.tableData[row.rank].score > row.score
      ) {
        this.tableData[row.rank - 1] = this.tableData[row.rank];
        this.tableData[row.rank - 1].rank--;
        row.rank++;
        this.tableData[row.rank - 1] = row;
      }
    },

    leagueChange() {
      this.vload = true;
      setTimeout(() => {
        this.getData();
        this.vload = false;
      }, 500);
    },
    getData() {
      let data = {
        lid: this.league
      };
      this.$ajax
        .post("api/leagueTableGet.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "101") {
            this.tableData = res["data"].data;
          } else {
            this.tableData = [];
          }
        });
    },
    update(bool) {
      this.visible = false;

      if (bool) {
        this.vload = true;
        setTimeout(() => {
          this.$ajax
            .post(
              "api/leagueTableUpdate.php",
              this.$qs.stringify(this.tableData)
            )
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
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 820px;
  .el-table {
    margin-top: 12px;
    .el-input-number {
      width: 80px;
    }
    .number-display {
      width: 72px;
      height: 28px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      display: flex;
      overflow: hidden;
      span {
        width: 42px;
        font-size: 12px;
        line-height: 28px;
        text-align: center;
        background: #fff;
      }
      .button {
        background: #fff;
        width: 30px;
        height: 28px;
        border-left: 1px solid #dcdfe6;
        overflow: hidden;
        display: inline-block;
        div {
          width: auto;
          height: 14px;
          text-align: center;
          font-size: 9px;
          line-height: 12px;
          border-bottom: 1px solid #dcdfe6;
          cursor: pointer;
        }
        div:hover {
          color: #59d1d2;
        }
      }
    }
  }
  .update {
    position: fixed;
    bottom: 58px;
    right: 36px;
    z-index: 999;
    .update-button {
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.4);
      width: 48px;
      height: 48px;
      font-size: 22px;
    }
  }
  .footer {
    display: flex;
    height: 62px;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: #939599;
    font-weight: 600;
  }
}
</style>
