<script setup lang="ts">
import { reactive } from 'vue'
import { sendMessageToExtend } from '@/composables/useCustomEvent'
const form = reactive({
  monitor_name: '测试百度',
  monitor_url: 'https://www.baidu.com/',
})
const onMonitor = () => {
  // 向谷歌插件的 content 发送通知（根据传递的 monitor_url，在新窗口打开）
  sendMessageToExtend({
    type: 'open',
    monitor_name: form.monitor_name,
    monitor_url: form.monitor_url,
  })
}
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
        <el-button type="primary" @click="onMonitor">立即监控</el-button>
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
