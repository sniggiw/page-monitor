<script setup lang="ts">
import { reactive } from 'vue'
import useCustomEvent from '@/composables/useCustomEvent'

const { sendMessageToExtend } = useCustomEvent()

const form = reactive({
  monitor_id: 1,
  monitor_name: '测试百度',
  monitor_url: 'https://www.baidu.com/',
  monitor_type: 1,
})
const onMonitor = () => {
  // 向谷歌插件的 content 发送通知（根据传递的 monitor_url，在新窗口打开）
  sendMessageToExtend({
    type: 'open',
    monitor_id: form.monitor_id,
    monitor_name: form.monitor_name,
    monitor_url: form.monitor_url,
    monitor_type: form.monitor_type,
  })
}
</script>

<template>
  <main>
    <h1>page monitor demo using</h1>
    <el-form :model="form" label-width="auto" :inline="false" size="large" label-position="left">
      <el-form-item label="监控id">
        <el-input v-model="form.monitor_id"></el-input>
      </el-form-item>
      <el-form-item label="监控名称">
        <el-input v-model="form.monitor_name"></el-input>
      </el-form-item>
      <el-form-item label="监控url">
        <el-input v-model="form.monitor_url"></el-input>
      </el-form-item>
      <el-form-item label="监控类型">
        <el-radio-group v-model="form.monitor_type">
          <el-radio :value="1">内容监控</el-radio>
          <el-radio :value="2">价格监控</el-radio>
        </el-radio-group>
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
