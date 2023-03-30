<template>
  <input :value="modelValue" @input="updateInput"/>
</template>

<script setup lang="ts">

defineProps({
  modelValue: [String, Number]
});

const emit = defineEmits(['update:modelValue']);

const updateInput = (event: InputEvent<HTMLInputElement>) => {
  emit('update:modelValue', event.target?.value)
}
</script>

<style scoped>
input {
  padding: 5px;
  border-radius: 10px;
  text-align: center;
  font-family: "Times New Roman";
  border-width: 0;
  font-size: 16px;
  box-shadow: inset 4px 4px 7px rgba(103, 101, 101, 0.15);
  outline: none;
}
</style>