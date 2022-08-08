<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <van-button round type="primary" @click="count++">count is {{ count }}</van-button>
  </div>
  <small>v 1.0</small>
</template>

<style scoped>

</style>
