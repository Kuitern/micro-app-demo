import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: window.__MICRO_APP_BASE_ROUTE__ || '/'  /**根据项目运行的不同环境，设置路径的前缀 */
		, name: 'Home'
		, redirect: { name: 'SecondHome' }
		, component: () => import('../views/Empty.vue')
		, children: [
			{
				path: 'home'
				, name: 'SecondHome'
				, component: () => import('../views/Home.vue')
			}
			, {
				path: 'about'
				, name: 'SecondAbout'
				, component: () => import('../views/About.vue')
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
