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
import "element-ui/lib/theme-chalk/base.css";
import {
  Loading,
  InfiniteScroll,
  Image,
  Container,
  Header,
  Aside,
  Main,
  PageHeader,
  Upload,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Switch,
  Carousel,
  CarouselItem,
  Transfer,
  Card,
  Table,
  TableColumn,
  Pagination,
  Select,
  Option,
  Tabs,
  TabPane,
  InputNumber,
  ButtonGroup,
  Popover,
  Popconfirm,
  Radio,
  RadioGroup,
  RadioButton
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
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Switch);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Transfer);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(InputNumber);
Vue.use(ButtonGroup);
Vue.use(Popover);
Vue.use(Popconfirm);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
