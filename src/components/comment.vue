<template>
  <div class="comcontainer">
    <!--提交评论 -->
    <div class="submit">
      <el-input
        v-model="commentSubmit"
        placeholder="写下你的评论。。。"
      ></el-input>
    </div>
    <!-- 评论区 -->
    <div class="comments">
      <div class="comTag">
        <span>评论（{{ comNum }}）</span>
        <div class="comControl">
          <el-link>热度</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link>时间</el-link>
        </div>
      </div>
      <div class="comContent">
        <ul>
          <li v-for="i in count" v-bind:key="i" class="list-comment">
            <div class="user-info">
              <span>{{ username }}</span>
            </div>
            <div class="comment">
              <p>{{ commentContent }}</p>
            </div>
            <div class="footer">
              <div class="hot" v-show="hot"><span>hot</span></div>
              <div class="commentOp">
                <el-link icon="el-icon-edit">编辑</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link icon="el-icon-edit">编辑</el-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      commentSubmit: "",
      comNum: 12,
      count: 10,
      username: "awuluan",
      commentContent: "这是一条评论",
      hot: true
    };
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.comcontainer {
  .submit {
    background: #fff;
    margin-top: 22px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 3px;
    .el-input .el-input__inner {
      border: none;
      outline: none;
    }
  }
  .comments {
    background: #fff;
    margin-top: 22px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 12px 15px;
    .comTag {
      display: block;
      .comControl {
        float: right;
      }
    }
    .comContent {
      // li层
      .list-comment {
        display: block;
        height: 100px;
        padding: 16px 12px;
        border-bottom: 1px solid #e0e0e0;

        .comment {
          margin: auto 0;
        }
        .footer {
          // 热门标志
          .hot {
            display: inline-block;
          }
          .commentOp {
            float: right;
            .el-link--inner {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>
