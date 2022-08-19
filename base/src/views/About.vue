<template>
  <div class="about">
    <h1>base-about page</h1>
    <el-button type="primary" @click="saveToken">存值</el-button>
  </div>
</template>
<script>
import { setToken } from '@/utils/localData' // get token from cookie
export default {
  data () {
    return {
      token: ''
    }
  },
  methods: {
    saveToken () {
      setToken(new Date() + '')
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