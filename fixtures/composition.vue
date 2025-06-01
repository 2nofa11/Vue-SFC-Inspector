<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CompositionComponent',
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      doubleCount,
      increment,
    }
  },
})
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>
div {
  color: green;
}
</style>
