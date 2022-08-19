<template>
  <div id="app">
		<div class="header"><i class="el-icon-menu"></i> &nbsp;微前端</div>

		<!-- 菜单 -->
		<div class="menu-con">
      <el-menu
        class="el-menu-vertical-demo"
        :router='true'
        :default-active='activeIndex'
      >
        <el-menu-item index="/">
          <i class="el-icon-present"></i>
          <span slot="title">Main home</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">Main about</span>
        </el-menu-item>
        <el-menu-item :index="`/${prefix}/first-child/home`">
          <i class="el-icon-document"></i>
          <span slot="title">Firstchild home</span>
        </el-menu-item>
        <el-menu-item :index="`/${prefix}/first-child/about`">
          <i class="el-icon-setting"></i>
          <span slot="title">Firstchild about</span>
        </el-menu-item>
        <el-menu-item :index="`/${prefix}/second-child/home`">
          <i class="el-icon-document"></i>
          <span slot="title">Secondchild home</span>
        </el-menu-item>
        <el-menu-item :index="`/${prefix}/second-child/about`">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">Secondchild about</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="cont">
			<el-button type="primary" @click='changeData'>发送数据</el-button>

      <micro-app
        v-if="isChild"
        v-bind="micro"
        destory
        @created="created"
        @beforemount="beforemount"
        @mounted="mounted"
        @unmount="unmount"
        @error="error"
        @datachange="handleDataChange"
      ></micro-app>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
import { MICRO_APPS, CHILD_PREFIX } from "./micro/config.js";

export default {
  name: "App",
  data() {
    return {
			activeIndex: '/vue2',
      isChild: false /**是否为子模块 */,
      micro: {
        url: "" /**子模块地址 */,
        key: "" /**vue 标签的 key 值，用于不同子模块间的切换时，组件重新渲染 */,
        name: "" /**子模块名称，唯一 */,
        data: {} /**子模块数据 */,
        baseroute: "" /**子模块数据 */,
      },
      prefix: CHILD_PREFIX /**子模块链接前缀 */,
    };
  },
  watch: {
    $route(val) {
      /**监听路由变化修改视图显示 */
      this.changeChild(val);
    },
  },
  created() {
    this.changeChild(this.$route);
  },
  methods: {
		changeData () {
			this.micro.data = {from: '来自基座的数据' + (new Date())}
		},
    created() {
      /**子模块创建 */
      console.log(`${this.micro.name}-created  micro-app元素被創建`);
    },
    beforemount() {
      /**子模块挂载之前 */
      console.log(`${this.micro.name}-beforemount 即将被渲染`);
    },
    mounted() {
      /**子模块挂载 */
      this.loading = false;
      console.log(`${this.micro.name}-mounted 已经渲染完成`);
    },
    unmount() {
      /**子模块卸载 */
      console.log(`${this.micro.name}-unmount 已经卸载`);
    },
    error() {
      /**子模块异常 */
      console.log(`${this.micro.name}-error 渲染出错`);
    },

    getAppUrl(name) {
      /**获取子模块 url 和 name */
      return MICRO_APPS.find((app) => app.name === name) || {};
    },
    changeChild(route) {
      let path = route.path.toLowerCase(),
        paths = path.split("/");

      this.isChild = paths.length > 2 && paths[1] === CHILD_PREFIX;

      if (this.isChild) {
        let app = this.getAppUrl(paths[2]);

        this.micro = {
          ...app,
          data: { name: route.name },
          key: `${app.name}`,
          baseroute: `/${CHILD_PREFIX}/${paths[2]}`,
        };
      }
    },
    handleDataChange(event) {
      /**获取子路由传递的信息 */
      let data = event.detail.data;
      if (data.route) this.$router.push({ name: data.route.name });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fff;
  width: 100%;
	padding-top: 60px;
  /* padding: 10px; */
  box-sizing: border-box;
  display: flex;
}
.header {
	height: 60px;
	border-bottom: 1px solid #eee;
	line-height: 60px;
	padding: 0 20px;
	position: fixed;
	z-index: 22;
	background: #fff;
	top: 0;
	width: 100%;
}

.menu-con  {
  width: 200px;
}

.cont {
	display: block;
	flex: 1;
}

body {
  margin: 0;
}

#app1,
#app2 {
	padding: 40px;
}

</style>
