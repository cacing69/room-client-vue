<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <van-button type="primary" @click="count++">v1 count is {{ count }}</van-button>
  </div>
</template>

<style scoped>

</style>
