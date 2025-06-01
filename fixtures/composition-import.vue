<script lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'

export default {
  name: 'CompositionImportComponent',
  setup() {
    const message = ref('Hello Composition API')
    const state = reactive({
      count: 0,
      items: [] as string[],
    })
    
    const computedMessage = computed(() => `${message.value}!`)
    
    watch(() => state.count, (newVal) => {
      console.log(`Count changed to: ${newVal}`)
    })
    
    onMounted(() => {
      console.log('Component mounted')
    })
    
    return {
      message,
      state,
      computedMessage,
    }
  },
}
</script>

<template>
  <div>
    <h2>{{ computedMessage }}</h2>
    <p>Count: {{ state.count }}</p>
  </div>
</template>

<style scoped>
h2 {
  color: purple;
}
</style>
