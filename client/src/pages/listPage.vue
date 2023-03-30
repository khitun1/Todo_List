<template>
  <nav-bar/>
  <todo-list/>
</template>

<script setup lang="ts">
import NavBar from "@/components/navBar.vue";
import TodoList from "@/components/todoList.vue";
import {Store, useStore} from "vuex";
import type {StateType} from "@/types/stateType";

const store: Store<StateType> = useStore();
store.dispatch('auth');
</script>

<style scoped>

</style>