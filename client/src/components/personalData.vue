<template>
  <div class="table">
    <div>
      <p>Name</p>
      <my-input :value="user.name" readonly/>
    </div>
    <div>
      <p>Surname</p>
      <my-input :value="user.surname" readonly/>
    </div>
    <div>
      <p>Login</p>
      <my-input v-model="login"
                :readonly="textLogin !== 'confirm'"
                id="login"/>
      <my-button @click="changeLogin">{{ textLogin }}</my-button>
    </div>
    <div id="emailHelp" class="form-text check">{{ $store.state.errorLogin }}</div>
    <div>
      <p>Password</p>
      <my-input v-model="password"
                :type="textPassword !== 'confirm' ? 'password' : 'text'"
                :readonly="textPassword !== 'confirm'"
                id="password"/>
      <my-button @click="changePassword">{{ textPassword }}</my-button>
    </div>
    <div id="emailHelp" class="form-text check">{{ $store.state.errorPassword }}</div>
  </div>
</template>

<script setup lang="ts">
import MyInput from "@/components/UI/myInput.vue";
import MyButton from "@/components/UI/myButton.vue";
import {computed, ref} from "vue";
import {Store, useStore} from "vuex";
import jwtDecode from "jwt-decode";
import type {UserType} from "@/types/userType";
import type {ComputedRef, Ref} from "vue";
import type {StateType} from "@/types/stateType";

const textLogin: Ref<string> = ref('change login');
const textPassword: Ref<string> = ref('change password');
const store: Store<StateType> = useStore();

store.dispatch('auth');
const user: ComputedRef<UserType> = computed(() => store.state.user);
const token: string = localStorage.getItem('token')!;
const user1: UserType = jwtDecode(token);
const login: Ref<string> = ref(user1.login);
const password: Ref<string> = ref(user1.password);


const changeLogin = async (): Promise<string | void> => {
  store.commit('clearAllError');
  if (validate()) {
    if (textLogin.value === 'confirm') {
      if (login.value !== store.state.user.login) {
        await store.dispatch('changeLogin', login.value);
        if (!check()) {
          return textLogin.value = 'change login';
        }
      }
      return textLogin.value = 'change login';
    }
    document.getElementById('login')?.focus();
    textLogin.value = 'confirm';
  }
}

const changePassword = (): string | void => {
  store.commit('clearAllError');
  if (validate()) {
    if (textPassword.value === 'confirm') {
    store.dispatch('changePassword', password.value);
    return textPassword.value = 'change password';
  }
    document.getElementById('password')?.focus();
    textPassword.value = 'confirm';
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

const check = (): void | boolean => {
  if (store.state.errorMsg) {
    store.commit('setLoginError', store.state.errorMsg);
    return true;
  }
  return false;
}

</script>

<style scoped>
.table {
  margin-left: 35%;
  width: fit-content;
  padding: 10px;
  background: #dcdcdc;
  border-radius: 10px;
  margin-top: 50px;
}

.table > div {

  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.table > div > p {
  width: 100px;
  margin-top: 15px;
}

.table > div > button {
  margin: 0 10px;
}

button {
  width: 150px;
}

.check {
  color: red;
}

@media screen and (max-width: 850px) {
  .table {
    margin-left: 10%;
  }
  @media screen and (max-width: 580px) {
    .table {
      margin-left: 2%;
    }
    @media screen and (max-width: 520px) {
      .table {
        width: 90%;
      }
      .table > div {
        flex-direction: column;
        text-align: center;
      }
      input {
        margin-bottom: 10px;
      }
      @media screen and (max-width: 260px) {
        .table {
          margin-top: 20px;
        }
        input {
          width: 90%;
          margin-right: 0;
          margin-left: 0;
        }
        button {
          width: 90%;
        }
      }
    }
  }
}
</style>