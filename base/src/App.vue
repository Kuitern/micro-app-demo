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

			<!-- 子应用模块 -->
      <micro-app
        v-if="isChild"
        v-bind="micro"
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
import microApp from "@micro-zoe/micro-app";

export default {
  name: "App",
  data() {
    return {
			globalData: microApp.getGlobalData(),
			activeIndex: '/vue2',
      isChild: false /**是否为子应用 */,
      micro: {
        url: "" /**子应用地址 */,
        key: "" /**vue 标签的 key 值，用于不同子应用间的切换时，组件重新渲染 */,
        name: "" /**子应用名称，唯一 */,
        data: {} /**子应用数据 */,
        baseroute: "" /**子应用路由 */,
      },
      prefix: CHILD_PREFIX /**子应用链接前缀 */,
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

      /**子应用创建 */
			console.log(`${this.micro.name}-created  micro-app元素被創建`);

			/**
			 * 绑定监听函数
			 * dataListener: 绑定函数
			 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
			*/
			microApp.addGlobalDataListener(this.getGlobalData, true)
    },
    beforemount() {
      /**子应用挂载之前 */
      console.log(`${this.micro.name}-beforemount 即将被渲染`);
    },
    mounted() {
      /**子应用挂载 */
      this.loading = false;
			console.log(`${this.micro.name}-mounted 已经渲染完成`);

    },
    unmount() {
      /**子应用卸载 */
      console.log(`子应用已卸载`);
    },
    error() {
      /**子应用异常 */
      console.log(`${this.micro.name}-error 渲染出错`);
    },

    getAppUrl(name) {
      /**获取子应用 url 和 name */
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
      // console.log('子应用的数据:', event)
      /**获取子应用的数据 */
      let data = event.detail.data;
      if (data.route) this.$router.push({ name: data.route.name });

      if (data.type == '子应用发送的数据') {
        this.$notify({
          title: '基座',
          message: '收到子应用发送的数据',
          position: 'top-right'
        });
      }
		},

		getGlobalData(event) {
			this.$notify({
				title: '基座',
				message: '收到全局数据',
				position: 'top-right'
			});
		}

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
