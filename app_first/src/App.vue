<template>
  <div id="app1">
    <div id="nav">
      <router-link :to="`${prefix}/home`">Home</router-link> |
      <router-link :to="`${prefix}/about`">About</router-link> |
      <button @click="goto('SecondHome')">SecondHome</button> |
      <button @click="goto('SecondAbout')">SecondAbout</button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App1",
  data() {
    return {
      prefix: window.__MICRO_APP_BASE_ROUTE__ || "",
    };
  },
  methods: {
    dataListener(data) {
      if (data.name !== this.$route.name)
        this.$router.push({ name: data.name });
    },
    goto(name) {
      // 向基项目发送数据
      window.microApp && window.microApp.dispatch({ route: { name } });
    },
  },
  created() {
	
    /** 绑定数据【data属性】监听事件 */
    window.microApp && window.microApp.addDataListener(this.dataListener);
  },
  destroyed() {
    /** 移除数据【data属性】监听事件 */
    window.microApp && window.microApp.removeDataListener(this.dataListener);
  },
};
</script>

<style>
#app1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
