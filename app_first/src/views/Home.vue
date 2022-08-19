<template>
	<div class="home">
		<img
			alt="Vue logo"
			src="../assets/logo.png"
		>
		<h1>First Child Home Page</h1>
		<div class='msg-title'>{{microDataStr}}</div>
		<button @click="sendData">向基座发送数据</button>
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
		window.microApp && window.microApp.addDataListener(this.handleDataChange, true)
	},
	beforeDestory () {
		window.microApp && window.microApp.removeDataListener(this.handleDataChange)
	},
	methods: {
		handleDataChange (data) {
			console.log(data)
			this.microDataStr = JSON.stringify(data)
		},
		sendData () {
			window.microApp.dispatch({type: '子应用发送的数据'})
		}
	}
}
</script>
