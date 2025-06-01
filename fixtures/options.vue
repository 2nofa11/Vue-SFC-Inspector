<script lang="ts">
export default {
  name: 'OptionsComponent',
  data() {
    return {
      message: 'Hello Options API',
      count: 0,
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    },
  },
  methods: {
    increment() {
      this.count++
    },
    updateMessage(newMessage: string) {
      this.message = newMessage
    },
  },
  mounted() {
    console.log('Options API component mounted')
  },
}
</script>

<template>
  <div>
    <h2>{{ message }}</h2>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>
h2 {
  color: orange;
}
</style>
