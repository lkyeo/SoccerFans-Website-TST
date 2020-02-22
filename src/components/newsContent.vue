<template>
  <div class="content">
    <span
      >巴塞罗那俱乐部目前正在度过新世纪来最糟糕的时期，《纽约时报》撰文进行了评论，他们认为巴萨失去了初心，他们已经从21世纪最佳俱乐部沦为了一家电视剧制作公司。
    </span>
    <el-image style="width: 100%" :src="url" :fit="scale - down"></el-image>
    <span>
      评论称，巴萨最近爆发的一系列危机并非偶然：解雇巴尔韦德、对哈维的盲目邀请、阿比达尔和梅西间的龃龉、混乱的冬窗引援以及前段时期爆发的公关门事件。
    </span>
    <span>
      事实上，在近些年的成功背后，巴萨已经经历了太多奇怪的事情：内马尔来到球队时不透明转会费引发的洗钱丑闻、罗塞尔入狱、引入青年球员违规被罚等等，这些都是在取得成功后遗忘了初心的种种体现。
    </span>
    <span>
      《纽约时报》写道，巴萨本来以艺术足球闻名，又以惊人的控制力成为21世纪最佳球队。但他们之后的管理表现出种种不专业。尽管如此，梅西和他的队友们依旧在努力获得许多成就，这是值得赞扬的。但同样不可避免的是，在某些时候，他们的闪光将无法再掩盖俱乐部的失败。
    </span>
    <span>
      《纽约时报》总结道，巴塞罗那不能再以这种方式行事，尽管他们在商业上取得了巨大成功，但同时他们也丢掉了初心：拉玛西亚青训球员的流失、不再为球迷们带来快乐。他们已经从21世纪最佳俱乐部沦为了一家电视剧制作公司。同时，不口否认的是梅西也在老去，他也不能只身孤单挽大厦于将倾。
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url:
        "https://img1.qunliao.info/fastdfs4/M00/05/DE/ChMf8F5WIoWAeKj6AAZ34Yv26mk328.jpg?watermark/1/image/aHR0cDovL2ltZzEuZG9uZ3FpdWRpLmNvbS9mYXN0ZGZzMi9NMDAvMkEvRTIvQ2hPcU0xb1MtZVdBUERxM0FBQkE1VWdyQlQ4MTQyLnBuZz9pbWFnZVZpZXcyLzAvdy8zNDE=/dissolve/100/dx/40/dy/13"
    };
  }
};
</script>
<style lang="less" scoped>
.content {
  background: #fff;
  padding: 12px 38px;
  margin-top: 22px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  span {
    font-size: 15px;
    display: block;
    // text-indent: 2em;
    line-height: 1.6;
    margin: 21px 0;
  }
  .el-image {
    display: block;
    margin: 21px auto;
  }
}
</style>
