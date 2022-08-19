<template>
	<div class="about">
		<h1>Second Child About page</h1>
		<button @click="getValue">取值</button>
		<button @click="setValue">存值</button>
		<p v-if="token">token: {{ token }}</p>
	</div>
</template>
<script>
import { getToken, setToken } from '../utils/localData' // get token from cookie
export default {
  data () {
    return {
      token: ''
    }
  },
  methods: {
    getValue () {
      this.token = getToken()
		},
		setValue () {
			setToken(new Date() + '')
		},
		sendData () {

		}
  }
}
</script>

<style>
.about {
  width: 300px;
  margin: 40px auto;
}
</style>