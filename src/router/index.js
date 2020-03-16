import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index.vue"),
    children: [
      {
        path: "/",
        name: "hot",
        component: () => import("../components/container.vue"),
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/ch/:ch",
        name: "chContainer",
        component: () => import("../components/chContainer.vue"),
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/following",
        name: "newsFollowing",
        component: () => import("../components/newsFollowing.vue"),
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/search.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/admin.vue"),
    children: [
      {
        path: "/admin/addnews",
        component: () => import("../components/admin/addNews.vue")
      },
      {
        path: "/admin/newslist",
        component: () => import("../components/admin/newslist.vue")
      },
      {
        path: "/admin/users",
        component: () => import("../components/admin/userlist.vue")
      },
      {
        path: "/admin/reports",
        component: () => import("../components/admin/reports.vue")
      },
      {
        path: "/admin/leaguetable",
        component: () => import("../components/admin/leaguetable.vue")
      },
      {
        path: "/admin/playertable",
        component: () => import("../components/admin/playertable.vue")
      },
      {
        path: "/admin/teamtable",
        component: () => import("../components/admin/teamtable.vue")
      }
    ]
  },
  {
    path: "/adminlogin",
    name: "adminlogin",
    component: () => import("../views/adminlogin.vue")
  },
  {
    path: "/usercenter",
    name: "usercenter",
    component: () => import("../views/usercenter.vue"),
    children: [
      {
        path: "/usercenter/followclub",
        component: () => import("../components/usercenter/clubFollow.vue")
      },
      {
        path: "/usercenter/newsfav",
        component: () => import("../components/usercenter/newsFav.vue")
      },
      {
        path: "/usercenter/comments",
        component: () => import("../components/usercenter/usercomments.vue")
      },
      {
        path: "/usercenter/editinfo",
        component: () => import("../components/usercenter/infoEdit.vue")
      }
    ]
  },
  {
    path: "/news/:newsid",
    name: "news",
    component: () => import("../views/news.vue")
  },
  {
    path: "/table/:lid",
    name: "table",
    component: () => import("../views/table.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
