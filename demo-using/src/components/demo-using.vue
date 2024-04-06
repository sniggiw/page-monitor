<script setup lang="ts">
import { reactive } from 'vue'
const form = reactive({
  monitor_name: '',
  monitor_url: '',
})
const onSubmit = () => {}
</script>

<template>
  <main>
    <h1>page monitor demo using</h1>
    <el-form :model="form" label-width="auto" :inline="false" size="large" label-position="top">
      <el-form-item label="监控名称">
        <el-input v-model="form.monitor_name"></el-input>
      </el-form-item>
      <el-form-item label="监控url">
        <el-input v-model="form.monitor_url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 50px;
  width: 50%;
  h1 {
    margin-bottom: 30px;
  }
}
</style>
