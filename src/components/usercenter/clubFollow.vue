<template>
  <div>
    <div class="transfer">
      <el-transfer
        v-model="value"
        :data="data"
        :titles="['俱乐部', '关注']"
      ></el-transfer>
    </div>
    <div class="footer">
      <div class="left">
        <el-dropdown @command="selectLeague">
          <el-button type="primary">
            {{ selectedLeagueName
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, i) in leagues"
              v-bind:key="i"
              :command="item.lid"
              >{{ item.leaguename }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="right">
        <el-button type="primary" @click="cancel">取消所有</el-button>
        <el-button type="primary" @click="submit">提交关注</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      value: [],
      selectedLeagueName: "选择联赛",
      leagues: [],
      clubs: []
    };
  },
  mounted() {
    this.leagueList();
    this.followingGet();
  },
  methods: {
    followingGet() {
      let data = {
        uid: this.$cookies.get("uid")
      };
      this.$ajax
        .post("api/followingGet.php", this.$qs.stringify(data))
        .then(res => {
          console.log(res);
          if (res["data"]["status"] == "101") {
            this.value = res["data"].data;
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
        }
      });
    },
    selectLeague(command) {
      this.data = [];
      this.selectedLeague = command;
      this.selectedLeagueName = this.leagues[
        this.selectedLeague - 1
      ].leaguename;
      // console.log(this.selectedLeague);
      let data = {
        lid: this.selectedLeague
      };
      this.$ajax
        .post("api/clubList.php", this.$qs.stringify(data))
        .then(res => {
          if (res["data"].status == "201") {
            console.log(res);
          } else {
            this.clubs = res["data"].data;
            for (var i in this.clubs) {
              this.data.push({
                key: this.clubs[i].cid,
                label: this.clubs[i].clubname
              });
            }
          }
        });
    },
    submit() {
      let data = [];
      data = this.value;
      data.push(this.$cookies.get("uid"));
      this.$ajax
        .post("api/followingUpdate.php", this.$qs.stringify(data))
        .then(res => {
          //   console.log(res);
          if (res["data"]["status"] == "101") {
            this.followingGet();
            this.$msg.success("修改关注成功！");
          }
        });
    },
    cancel() {
      let data = {
        uid: this.$cookies.get("uid")
      };
      this.$ajax
        .post("api/followingDelete.php", this.$qs.stringify(data))
        .then(res => {
          //   console.log(res);
          if (res["data"]["status"] == "101") {
            this.followingGet();
            this.$msg.success("取消了所有关注！");
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.transfer {
  display: flex;
  justify-content: space-around;
  width: 500px;
}
.footer {
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin-top: 12px;
}
</style>
