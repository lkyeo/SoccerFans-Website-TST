<template>
  <div class="container" v-loading="loading">
    <!-- 新闻图片上传模块 -->
    <div class="image-upload border">
      <span class="tips"> 上传新闻图片：</span>
      <el-upload
        class="avatar-uploader"
        ref="upload"
        action=""
        list-type="picture-card"
        :auto-upload="false"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-change="onUploadChange"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <div class="uploadFooter">
        <div class="coverPic">
          <el-dropdown
            size="small"
            split-button
            type="primary"
            @command="selectCover"
          >
            {{ coverPicTitle }}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="p in picNum" v-bind:key="p" :command="p"
                >$##pic{{ p }}##</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 新闻标题 -->
    <div class="news-title border">
      <el-input placeholder="震惊！" v-model="newsTitle" maxlength="30">
        <template slot="prepend">标题：</template>
      </el-input>
    </div>
    <!-- 新闻内容编辑 -->
    <div class="news-content border">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="newsContent"
        maxlength="2000"
      >
      </el-input>
    </div>
    <!-- 新闻相关设置选项 -->
    <div class="footer border">
      <div class="option">
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
        <el-dropdown @command="selectClub">
          <el-button type="primary">
            {{ selectedClubName
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(club, index) in clubs"
              v-bind:key="index"
              :command="club.cid"
              >{{ club.clubname }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="release">
        <el-button type="danger" @click="release"
          >发布<i class="el-icon-upload el-icon--right"></i
        ></el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      coverPicTitle: "选取一张作为封面图",
      picNum: 0,
      leagues: [],
      clubs: [],
      // 已选联赛的lid
      selectedLeague: 0,
      selectedLeagueName: "相关联赛",
      // 已选俱乐部的cid
      selectedClub: 0,
      selectedClubName: "相关球队",
      cover: null,
      newsTitle: "",
      newsContent: "",
      newsid: 0,
      loading: false
    };
  },
  created: function() {
    this.leagueList();
  },

  methods: {
    handleRemove(file, fileList) {
      this.picNum = fileList.length;
      if (this.cover > this.picNum) {
        this.cover = null;
        this.coverPicTitle = "选取一张作为封面图";
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onUploadChange(file, fileList) {
      this.picNum = fileList.length;
    },
    selectCover(command) {
      this.cover = command;
      this.coverPicTitle = "封面：$##pic" + this.cover + "##";
    },
    // 选择联赛
    selectLeague(command) {
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
          }
        });
    },
    // 选择俱乐部
    selectClub(command) {
      this.selectedClub = command;
      var obj = this.clubs.find(function(x) {
        return x.cid === command;
      });
      // console.log(obj);
      this.selectedClubName = obj.clubname;
    },
    // 相关联赛下拉菜单内容获取
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
    // 发布文章
    release() {
      if (this.newsTitle == "") {
        this.$msg.error("标题不能为空！");
        return;
      }
      if (this.cover == null) {
        this.$msg.error("请先选择一张封面图！");
        return;
      }
      if (this.newsContent == "") {
        this.$msg.error("内容不能为空！");
        return;
      }
      if (this.selectedLeague == 0) {
        this.$msg.error("请先选择一个相关联赛！");
        return;
      }
      if (this.selectedClub == 0) {
        this.$msg.error("请先选择一个相关俱乐部！");
        return;
      }
      let data = {
        title: this.newsTitle,
        content: this.newsContent,
        league: this.selectedLeague,
        club: this.selectedClub
      };
      this.loading = true;

      this.$ajax.post("api/newsAdd.php", this.$qs.stringify(data)).then(res => {
        if (res["data"]["status"] == "101") {
          this.newsid = res["data"]["newsid"];
          // console.log(this.newsid);
        }
      });
      if (this.picNum != 0) {
        let { uploadFiles } = this.$refs.upload;
        let form = new FormData();
        uploadFiles.forEach(item => {
          // console.log(item.raw);
          form.append("img[]", item.raw);
        });
        // for (var i = 0; i < fileList.length; i++) {
        //   // console.log(this.fileList[i].raw);
        //   this.fileForm.append("img", fileList[i].raw);
        // }
        let array = [];
        this.$ajax.post("api/newsImgUpload.php", form).then(res => {
          for (var c = 0; c < res["data"].data.length; c++) {
            var cov = 0;
            if (c == this.cover - 1) {
              cov = 1;
            }
            array[c] = {
              imgid: res["data"].data[c].imgid,
              cover: cov,
              newsid: this.newsid
            };
          }
          this.$ajax
            .post("api/newsImgUpload2.php", this.$qs.stringify(array))
            .then(res => {
              this.loading = false;
              this.$router.go("/admin/addnews");
              this.$msg.success("发布成功！");
            });
        });
      }
    }
  }
};
</script>

<style lang="less">
.container {
  color: #969b9f;
  width: 820px;
  font-size: 15px;
  .border {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 12px;
  }
  .image-upload {
    .tips {
      display: block;
      margin-bottom: 12px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .uploadFooter {
      display: block;
      margin-top: 12px;
      overflow: auto;
      .coverPic {
        float: right;
      }
    }
  }
  .news-title {
    padding: 0;
    border: 0;
  }
  .news-content {
    padding: 0;
    border: 0;
  }
  .footer {
    padding: 0;
    border: 0;
    border-radius: 0;
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
    .option {
      .el-dropdown {
        margin-right: 12px;
      }
    }
  }
}
</style>
