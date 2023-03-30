<template>
  <button><slot></slot></button>
</template>

<script setup lang="ts">
</script>

<style scoped>
button {
  background: #b3ffdd;
  border: 2px solid #00ff98;
  color: #007245;
  border-radius: 5px;
  cursor: pointer;
  min-width: 70px;
  width: fit-content;
}
</style>