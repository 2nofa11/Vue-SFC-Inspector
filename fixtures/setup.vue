<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>Script Setup Component</div>
  <div>{{ count }}</div>
</template>

<style scoped>
div {
  color: blue;
}
</style>
