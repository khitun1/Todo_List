<template>
  <div class="item" v-for="todo in todos" :key="todo.id">
    <h3>{{ todo.title }}</h3>
    <div class="body">
      <p>{{ todo.body }}</p>
      <my-button @click="done(todo.id)">Done</my-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyButton from "@/components/UI/myButton.vue";
import {computed} from "vue";
import {Store, useStore} from "vuex";
import type {ComputedRef} from "vue";
import type {TodoType} from "@/types/todoType";
import type {StateType} from "@/types/stateType";

const store: Store<StateType> = useStore();
const todos: ComputedRef<TodoType[]> = computed(() => store.state.todos);
const done = (id: number): Promise<void> => store.dispatch('done', id);
</script>

<style scoped>

.body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
}

button {
  height: 30px;
}

p, button, h3 {
  margin: 0 0 5px 5px;
}

.body > p {
  overflow-wrap: break-word;
  width: 80%;
}

.item {
  width: 60%;
  border-radius: 5px;
  border: 2px solid #75ffbb;
  padding: 2px 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 680px ) {
  .body > p {
    width: 70%;
  }
  @media screen and (max-width: 480px ) {
    .body {
      flex-direction: column;
    }
    .body > p {
      width: 95%;
    }
  }
}

</style>