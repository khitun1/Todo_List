<template>
  <form @submit.prevent>
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
      <button type="submit" class="btn btn-primary" @click="loginAction">Sign in</button>
  </form>
</template>

<script setup lang="ts">
import {Store, useStore} from 'vuex';
import {ref} from 'vue';
import type {UserLogin} from "@/types/userType";
import type {Ref} from "vue";
import type {StateType} from "@/types/stateType";

const login: Ref<string> = ref('');
const password: Ref<string> = ref('');
const store: Store<StateType> = useStore();
store.commit('clearAllError');

const loginAction = async(): Promise<void> => {
  store.commit('clearAllError');
  if (validate()) {
    const user: UserLogin = {login: login.value, password: password.value};
    await store.dispatch('login', user);
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
  return !!(login.value && password.value);
}

const check = (): void => {
  if (store.state.errorMsg) {
    if (store.state.errorMsg.split(' ')[1] === 'login') {
      store.commit('setLoginError', store.state.errorMsg);
    }
    else {
      store.commit('setPasswordError', store.state.errorMsg);
    }
  }
}

</script>

<style scoped>

.check {
  color: red;
}
</style>