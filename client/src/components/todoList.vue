<template>
  <div class="main">
    <TodoItem/>
    <my-button class="add" @click="showModal"><p>+</p></my-button>
    <dialog class="create">
      <form @submit.prevent>
        <h2>Title</h2>
        <my-input v-model="title"/>
        <div id="emailHelp" class="form-text check">{{ $store.state.errorName }}</div>
        <h2>Body</h2>
        <textarea v-model="body"></textarea>
        <div id="emailHelp" class="form-text check">{{ $store.state.errorSurname }}</div>
        <my-button @click="closeModal">Create</my-button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import TodoItem from "@/components/todoItem.vue";
import MyButton from "@/components/UI/myButton.vue";
import MyInput from "@/components/UI/myInput.vue";
import {ref} from "vue";
import {Store, useStore} from "vuex";
import type {TodoType} from "@/types/todoType";
import type {Ref} from 'vue';
import type {StateType} from "@/types/stateType";

const title: Ref<string> = ref('');
const body: Ref<string> = ref('');
const store: Store<StateType> = useStore();

store.dispatch('getTodos');
store.commit('clearAllError');
const showModal = (): void => document.querySelector('dialog')?.showModal();
const closeModal = (): void => {
  if (validate()) {
    document.querySelector('dialog')?.close();
    const todo: TodoType = {
      title: title.value,
      body: body.value,
    }
    title.value = '';
    body.value = '';
    store.dispatch('createTodo', todo);
  }
}

const validate = (): boolean => {
  if (!title.value) {
    store.commit('setNameError', 'Empty title!');
  }
  else {
    store.commit('setNameError', '');
  }
  if (!body.value) {
    store.commit('setSurnameError', 'Empty body!');
  }
  else {
    store.commit('setSurnameError', '');
  }
  return !!(title.value && body.value);
}
</script>

<style scoped>
  .add {
    position: fixed;
    min-width: 50px;
    height: 50px;
    border-radius: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    bottom: 30px;
    right: 2%;
  }
  .add > p {
    margin-top: -3px;
  }

  .create
  {
    width: 400px;
    background: #d9d9d9;
    color: #ffffff;
    border-width: 0;
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
    border-radius: 40px;
    text-align: center;
    font-weight: lighter;
    flex-direction: column;
    padding: 5px 10px;
    align-items: center;
  }

  .create > form > * {
    margin-bottom: 10px;
  }

  .create > form > button {
    width: 90%;
    height: 40px;
  }

  textarea {
    border: none;
    outline: none;
    padding: 5px;
    width: 90%;
    border-radius: 10px;
  }

  .check {
    color: red;
  }

  @media screen and (max-width: 200px ) {
    .add {
      min-width: 40px;
      height: 40px;
      font-size: 25px;
      font-weight: bold;
      bottom: 30px;
      right: 2%;
    }
    .add > p {
      margin-top: -3px;
    }
  }

</style>