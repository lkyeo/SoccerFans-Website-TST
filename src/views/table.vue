<template>
  <div class="layout">
    <div class="top">
      <div class="center">
        <!-- <div class="webtab">
          <div class="button">
            <router-link to="/">新闻</router-link>
            <router-link to="/table/1" class="checked">数据</router-link>
          </div>
        </div> -->
        <div class="league">
          <ul>
            <li @click="pushHome">
              首页
            </li>
            <li :class="{ checked: lid == 1 }" @click="changeLeague(1)">
              中超
            </li>
            <li :class="{ checked: lid == 2 }" @click="changeLeague(2)">
              英超
            </li>
            <li :class="{ checked: lid == 3 }" @click="changeLeague(3)">
              西甲
            </li>
            <li :class="{ checked: lid == 4 }" @click="changeLeague(4)">
              德甲
            </li>
            <li :class="{ checked: lid == 5 }" @click="changeLeague(5)">
              意甲
            </li>
            <li :class="{ checked: lid == 6 }" @click="changeLeague(6)">
              法甲
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main">
      <switch-tab :key="$route.fullPath"></switch-tab>
    </div>
  </div>
</template>
<script>
import switchtable from "../components/switchtable.vue";
export default {
  components: {
    "switch-tab": switchtable
  },
  data() {
    return {
      lid: this.$route.params.lid
    };
  },
  methods: {
    pushHome() {
      this.$router.push("/");
    },
    changeLeague(lid) {
      this.$router.push({ name: "table", params: { lid: lid } });
      this.lid = lid;
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .center {
    width: 920px;
    .webtab {
      height: auto;
      display: flex;
      justify-content: center;
      .button {
        display: block;
        width: 280px;
        margin-top: 20px;
        margin-bottom: 20px;
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
          text-align: center;
          font-size: 14px;
        }
        .checked {
          background: #59d1d2;
          color: #fff;
        }
      }
    }
    .league {
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
          display: inline-block;
          height: 50px;
          width: 80px;
          text-align: center;
          line-height: 50px;
          font-size: 16px;
          cursor: pointer;
        }
        .checked {
          background: #59d1d2;
          color: #fff;
        }
      }
    }
  }
}
.main {
  display: flex;
  justify-content: center;
  padding: 26px 0 0;
  .center {
    width: 920px;
  }
}
</style>
