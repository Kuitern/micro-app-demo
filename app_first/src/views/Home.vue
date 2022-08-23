<template>
	<div class="home">
		<img
			alt="Vue logo"
			src="../assets/logo.png"
		>
		<h1>First Child Home Page</h1>
		<div class='msg-title'>{{microDataStr}}</div><br>
		<button @click="sendData">向基座发送数据</button>&nbsp;
		<button @click="sendGlobalData">发送全局数据</button>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data () {
		return {
			microDataStr: ''
		}
	},
	created () {
		// 方式一：直接获取数据
		console.log('直接获取: ', window.microApp.getData())

		// 方式二：监听
		window.microApp && window.microApp.addDataListener(this.handleDataChange, true)
	},
	beforeDestory () {
		window.microApp && window.microApp.removeDataListener(this.handleDataChange)
	},
	methods: {
		handleDataChange (data) {
			this.microDataStr = JSON.stringify(data)
		},
		sendData () {
			window.microApp.dispatch({type: '子应用发送的数据'})
		},
		sendGlobalData () {
			window.microApp.setGlobalData({type: '子应用发送的全局数据'})
		}
	}
}
</script>
