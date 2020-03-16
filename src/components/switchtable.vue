<template>
  <div class="center">
    <div class="table-switch">
      <el-radio-group v-model="table" size="medium" @change="tableChange">
        <el-radio-button label="1">积分榜</el-radio-button>
        <el-radio-button label="2">球员榜</el-radio-button>
        <el-radio-button label="3">球队榜</el-radio-button>
      </el-radio-group>
    </div>
    <div class="leaguetable" v-if="table == 1">
      <el-table :data="tableData" v-loading="vload">
        <el-table-column prop="rank" label="排名"> </el-table-column>
        <el-table-column prop="clubname" label="球队"> </el-table-column>
        <el-table-column prop="round" label="场次"> </el-table-column>
        <el-table-column prop="win" label="胜"> </el-table-column>
        <el-table-column prop="draw" label="平"> </el-table-column>
        <el-table-column prop="lose" label="负"> </el-table-column>
        <el-table-column prop="score" label="积分"> </el-table-column>
      </el-table>
    </div>
    <div class="playertable" v-if="table == 2">
      <el-tabs
        v-model="playerItem"
        tab-position="left"
        @tab-click="playerItemChange"
      >
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
        <el-table-column prop="data" :label="playerDataName"> </el-table-column>
      </el-table>
    </div>
    <div class="teamtable" v-if="table == 3">
      <el-tabs
        v-model="teamItem"
        tab-position="left"
        @tab-click="teamItemChange"
      >
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
        <el-table-column prop="data" :label="teamDataName"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: "1",
      tableData: [],
      lid: this.$route.params.lid,
      playerItem: "goal",
      playerDataName: "进球",
      teamItem: "goal",
      teamDataName: "进球",
      vload: false
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      switch (this.table) {
        case "1":
          this.leagueTable();
          break;
        case "2":
          this.playerTable();
          break;
        case "3":
          this.teamTable();
          break;
      }
    },
    leagueTable() {
      let data = {
        lid: this.lid
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
    playerTable() {
      let data = {
        lid: this.lid,
        item: this.playerItem
      };
      this.$ajax
        .post("api/playertableGet.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "101") {
            this.tableData = res["data"].data;
          } else {
            this.tableData = [];
          }
        });
    },
    playerItemChange() {
      switch (this.playerItem) {
        case "goal":
          this.playerDataName = "进球";
          break;
        case "assist":
          this.playerDataName = "助攻";
          break;
        case "yellowcard":
          this.playerDataName = "黄牌";
          break;
        case "redcard":
          this.playerDataName = "红牌";
          break;
        case "shoot":
          this.playerDataName = "射门";
          break;
        case "shootintarget":
          this.playerDataName = "射正";
          break;
      }
      this.vload = true;
      setTimeout(() => {
        this.getData();
        this.vload = false;
      }, 800);
    },
    teamTable() {
      let data = {
        lid: this.lid,
        item: this.teamItem
      };
      this.$ajax
        .post("api/teamTableGet.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "101") {
            this.tableData = res["data"].data;
          } else {
            this.tableData = [];
          }
        });
    },
    teamItemChange() {
      switch (this.teamItem) {
        case "goal":
          this.teamDataName = "进球";
          break;
        case "possession":
          this.teamDataName = "控球率";
          break;
        case "yellowcard":
          this.teamDataName = "黄牌";
          break;
        case "redcard":
          this.teamDataName = "红牌";
          break;
        case "shoot":
          this.teamDataName = "射门";
          break;
        case "shootintarget":
          this.teamDataName = "射正";
          break;
        case "pass":
          this.teamDataName = "传球";
          break;
        case "passsuccess":
          this.teamDataName = "成功传球";
          break;
      }
      this.vload = true;
      setTimeout(() => {
        this.getData();
        this.vload = false;
      }, 800);
    },
    tableChange() {
      this.playerItem = "goal";
      this.teamItem = "goal";
      this.vload = true;
      setTimeout(() => {
        this.getData();
        this.vload = false;
      }, 800);
    }
  }
};
</script>
<style lang="less" scoped>
.table-switch {
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
}
.playertable {
  display: flex;
}
.teamtable {
  display: flex;
}
</style>
