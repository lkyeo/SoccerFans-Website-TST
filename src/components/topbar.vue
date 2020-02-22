<template>
  <div>
    <div class="topbar" :class="navBarFixed == true ? 'navBarWrap' : ''">
      <!-- <img src="../assets/img/logo.png" height="80px" /> -->
      <div class="webtab">
        <router-link to="login" v-bind:class="{ checked: isNews }"
          >新闻</router-link
        >
        <router-link to="register" v-bind:class="{ checked: isData }"
          >数据</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isNews: true,
      isData: false,
      navBarFixed: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.hidemenu); //监听滚动事件
  },
  methods: {
    hidemenu() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //当滚动超过60时，实现吸顶效果（导航高度为60）
      this.navBarFixed = scrollTop > 59 ? true : false;
    }
  }
};
</script>
<style lang="less" scoped>
.navBarWrap {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}
.topbar {
  top: 0;
  width: 100%;
  // height: 60px;
  background: #fff;
  display: block;
  justify-content: center;
  // align-items: Center;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
  img {
    float: left;
  }
  .webtab {
    display: block;
    width: 280px;
    margin: 20px auto;
    height: 30px;
    border: 1px solid #59d1d2;
    border-radius: 4px;
    overflow: hidden;
    a {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      width: 140px;
      color: #59d1d2;
      background: #fff;
      text-decoration: none;
      font-size: 14px;
    }
    .checked {
      background: #59d1d2;
      color: #fff;
    }
  }
}
</style>
