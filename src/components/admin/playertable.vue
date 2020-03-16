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
        <el-tab-pane label="射手榜" name="goal"></el-tab-pane>
        <el-tab-pane label="助攻榜" name="assist"></el-tab-pane>
        <el-tab-pane label="黄牌" name="yellowcard"></el-tab-pane>
        <el-tab-pane label="红牌" name="redcard"></el-tab-pane>
        <el-tab-pane label="射门" name="shoot"></el-tab-pane>
        <el-tab-pane label="射正" name="shootintarget"></el-tab-pane>
      </el-tabs>
      <el-table :data="tableData" v-loading="vload">
        <el-table-column prop="rank" label="排名" width="180px">
        </el-table-column>
        <el-table-column prop="playername" label="球员"> </el-table-column>

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
    <div class="float-button">
      <el-popover
        placement="top"
        width="160"
        v-model="fvisible"
        style="margin-right:12px;"
      >
        <p>更新列表，当前没有提交的数据将会丢失，继续吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="f5(false)">取消</el-button>
          <el-button type="primary" size="mini" @click="f5(true)"
            >确定</el-button
          >
        </div>

        <el-button slot="reference" icon="el-icon-refresh" circle></el-button>
      </el-popover>
      <el-button
        icon="el-icon-plus"
        type="primary"
        circle
        @click="showAdd"
      ></el-button>

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
        ></el-button>
      </el-popover>
    </div>
    <div class="add-layout" v-if="addvisible">
      <div class="add-container">
        <div class="add-top">
          <span>{{ dataname }}</span
          ><i class="el-icon-close" @click="addClose"></i>
        </div>
        <div class="add-content">
          <div class="player">
            <el-input
              type="text"
              placeholder="球员名"
              v-model="addPlayerName"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
          <div class="clubanddata">
            <el-select
              v-model="addcid"
              placeholder="选择球队"
              style="width:160px"
            >
              <el-option
                v-for="c in clubs"
                v-bind:key="c.cid"
                :label="c.clubname"
                :value="c.cid"
              >
              </el-option>
            </el-select>
            <el-input-number
              controls-position="right"
              v-model="addData"
              :min="0"
              :precision="0"
            ></el-input-number>
          </div>
        </div>
        <div class="add-foot">
          <el-button type="primary" @click="addPlayer">添加</el-button>
        </div>
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
      clubs: [],
      addcid: "",
      addPlayerName: "",
      addData: 0,
      vload: false,
      visible: false,
      fvisible: false,
      addvisible: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    showAdd() {
      this.addvisible = true;
      this.addClubList();
    },
    addClose() {
      this.addvisible = false;
    },
    addClubList() {
      let data = {
        lid: this.league
      };
      this.$ajax
        .post("api/clubList.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "201") {
            console.log(res);
          } else {
            this.clubs = res["data"].data;
          }
        });
    },
    addPlayer() {
      if (this.addPlayerName == "") {
        this.$msg.error("请输入球员名！");
        return;
      }
      if (this.addcid == "") {
        this.$msg.error("请选择该球员所属俱乐部！");
        return;
      }
      let data = {
        lid: this.league,
        cid: this.addcid,
        player: this.addPlayerName,
        type: this.item,
        data: this.addData
      };
      this.$ajax
        .post("api/playertableAdd.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "101" || res["data"].status == "102") {
            this.$msg.success("添加成功！");
          } else if (res["data"].status == "103") {
            this.$msg("此榜单中已经存在该球员，数据已更新！");
          } else {
            this.$msg.error("失败了！");
            console.log(res);
          }
        });
      this.addPlayerName = "";
      this.addcid = "";
      this.addData = 0;
      this.addvisible = false;
      this.getData();
    },
    leagueChange() {
      this.item = "goal";
      this.getData();
    },
    itemChange() {
      switch (this.item) {
        case "goal":
          this.dataname = "进球";
          break;
        case "assist":
          this.dataname = "助攻";
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
          .post("api/playertableGet.php", this.$qs.stringify(data))
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
            .post(
              "api/playertableUpdate.php",
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
  .float-button {
    position: fixed;
    z-index: 999;
    bottom: 24px;
    right: 36px;
    display: flex;
    flex-direction: column;
    .el-button {
      width: 48px;
      height: 48px;
      font-size: 22px;
      margin-bottom: 12px;
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.4);
    }
  }
  .add-layout {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    .add-container {
      width: 360px;
      border-radius: 4px;
      background: #fff;
      padding: 16px 20px;
      .add-top {
        overflow: hidden;
        span {
          font-size: 18px;
          font-family: "microsoft yahei";
          font-weight: 100;
        }
        i {
          float: right;
          cursor: pointer;
        }
        i:hover {
          color: #59d1d2;
        }
      }
      .add-content {
        .player {
          margin-top: 12px;
          margin: 16px 0;
        }
        .clubanddata {
          display: flex;
          justify-content: space-between;
        }
        margin-bottom: 16px;
      }
      .add-foot {
        overflow: hidden;
        .el-button {
          float: right;
        }
      }
    }
  }
}
</style>
