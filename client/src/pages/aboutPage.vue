<template>
  <nav-bar/>
  <div class="msg">This is simple project for portfolio with Vue3, TS, Vite</div>
</template>

<script setup lang="ts">
import NavBar from "@/components/navBar.vue";
import {Store, useStore} from "vuex";
import type {StateType} from "@/types/stateType";

const store: Store<StateType> = useStore();
store.dispatch('auth');
</script>

<style scoped>
.msg {
  margin-left: 10px;
}
</style>