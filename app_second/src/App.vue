<template>
  <div id="app2">
    <div id="nav">
      <router-link :to="`${prefix}/home`">Home</router-link> |
      <router-link :to="`${prefix}/about`">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App2",
  data() {
    return {
      prefix: window.__MICRO_APP_BASE_ROUTE__ || "",
    };
  },
  methods: {
    dataListener(data) {
      if (data.name !== this.$route.name)
        /** 不判断时会报一个“冗余导航【NavigationDuplicated】”的异常 */
        this.$router.push({ name: data.name });
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
#app2 {
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
