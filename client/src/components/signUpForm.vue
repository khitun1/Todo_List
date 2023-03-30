<template>
  <form @submit.prevent>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label" >Name</label>
      <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="name">
      <div id="emailHelp" class="form-text check">{{ $store.state.errorName }}</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Surname</label>
      <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="surname">
      <div id="emailHelp" class="form-text check">{{ $store.state.errorSurname }}</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Login</label>
      <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="login">
      <div id="emailHelp" class="form-text check">{{ $store.state.errorLogin }}</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
      <div id="emailHelp" class="form-text" v-if="!$store.state.errorPassword">We'll never share your password with anyone else.</div>
      <div id="emailHelp" class="form-text check">{{ $store.state.errorPassword }}</div>
    </div>
    <button type="submit" class="btn btn-primary" @click="signUpAction">Sign up</button>
  </form>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {Store, useStore} from "vuex";
import type {UserType} from "@/types/userType";
import type {Ref} from 'vue';
import type {StateType} from "@/types/stateType";

const name: Ref<string> = ref('');
const surname: Ref<string> = ref('');
const login: Ref<string> = ref('');
const password: Ref<string> = ref('');
const store: Store<StateType> = useStore();
store.commit('clearAllError');

const signUpAction = async(): Promise<void> => {
  store.commit('clearAllError');
  if (validate()) {
    const user: UserType = {
      name: name.value,
      surname: surname.value,
      login: login.value,
      password: password.value,
    }
    await store.dispatch('signUp', user);
    check();
  }
}

const validate = (): boolean => {
  if (!login.value) {
    store.commit('setLoginError', 'Empty login!');
  }
  else {
    store.commit('setLoginError', '');
  }
  if (!password.value) {
    store.commit('setPasswordError', 'Empty password!');
  }
  else {
    store.commit('setPasswordError', '');
  }
  if (!name.value) {
    store.commit('setNameError', 'Empty name!');
  }
  else {
    store.commit('setNameError', '');
  }
  if (!surname.value) {
    store.commit('setSurnameError', 'Empty surname!');
  }
  else {
    store.commit('setSurnameError', '');
  }
  return !!(login.value && password.value && name.value && surname.value);
}

const check = (): void => {
  if (store.state.errorMsg) {
    store.commit('setLoginError', store.state.errorMsg);
  }
}
</script>

<style scoped>
.check {
  color: red;
}
</style>