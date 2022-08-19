import './micro'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 路由
const pathList = [/* 'About', */ 'SecondHome']
router.beforeEach((to, from, next) => {
  console.log(to)
  if (pathList.includes(to.name)) {
    alert('无权限')
  } else {
    next()
  }
})

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
