<template>
  <div>
    <el-button @click="click">注销</el-button>
  </div>
</template>

<script>
  export default {
    name: "Logout",
    methods: {
      click() {
        localStorage.clear()
        this.$emit('logout')
      }
    }
  }
</script>

<style scoped>

</style>
