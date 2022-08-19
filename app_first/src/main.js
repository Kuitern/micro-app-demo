/**引入 publicPath 设置 */
import './micro'

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// new Vue({
// 	router,
// 	render: function (h) { return h(App) }
// }).$mount('#app')

let app

/**
 * 挂载函数
 */
function mount () {
	app = new Vue({
		el: '#app',
		router,
		render: function (h) { return h(App) }
	})
}

/**
 * 卸载函数
 */
function unmount () {
	app.$destroy()
	app.$el.innerHTML = ''
	app = null
}

/**微前端环境下，注册mount和unmount方法 */
if (window.__MICRO_APP_ENVIRONMENT__)
	window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
else
	mount()
