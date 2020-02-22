import Vue from "vue";
import "../assets/style/theme/index.css";
import { Button } from "element-ui";
import { Form } from "element-ui";
import { FormItem } from "element-ui";
import { Input } from "element-ui";
import { Menu, Submenu, MenuItem, MenuItemGroup } from "element-ui";
import { Backtop } from "element-ui";
import { Link } from "element-ui";
import { Divider } from "element-ui";
import { MessageBox } from "element-ui";
import { Message } from "element-ui";
import {
  Loading,
  InfiniteScroll,
  Image,
  Container,
  Header,
  Aside,
  Main,
  PageHeader
} from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Backtop);
Vue.use(Link);
Vue.use(Divider);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$msg = Message;
Vue.use(Loading);
Vue.use(InfiniteScroll);
Vue.use(Image);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(PageHeader);
