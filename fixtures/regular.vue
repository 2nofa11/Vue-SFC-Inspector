<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RegularComponent',
  setup() {
    const message = ref('Hello World')
    return { message }
  },
})
</script>

<template>
  <div>Regular Script Component</div>
  <div>{{ message }}</div>
</template>

<style scoped>
div {
  color: red;
}
</style>
