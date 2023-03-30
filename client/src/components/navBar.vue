<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link :to="$store.state.user.id ? '/mine' : '/'" class="navbar-brand" @click="showModal(0)" @submit.prevent>ToDo</router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="$store.state.user.id">
          <li class="nav-item">
            <router-link to="mine" class="nav-link active" aria-current="page">MyList</router-link>
          </li>
          <li class="nav-item">
            <router-link to="about" class="nav-link" aria-current="page">About</router-link>
          </li>
        </ul>
      </div>
    </div>
      <div class="d-flex" role="search" @submit.prevent v-if="$store.state.user.id === undefined">
        <button class="btn btn-outline-success" type="submit" @click="showModal(1)">Sign in</button>
        <button class="btn btn-outline-success" type="submit" @click="showModal(2)">Sign up</button>
      </div>
      <div v-show="$store.state.user.id" class="personal">
        <img src="src/images/UserIcon.png" @click="$router.push('/settings')" class="btn-icon"/>
        <router-link to="/" class="btn btn-outline-success" @click="out" >Sign out</router-link>
      </div>
  </nav>
    <div v-if="$store.state.user.id === undefined">
      <login-form class="login" v-if="show === 1"/>
      <sign-up-form class="login" v-if="show === 2"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LoginForm from "@/components/loginForm.vue";
  import SignUpForm from "@/components/signUpForm.vue";
  import {ref} from "vue";
  import {Store, useStore} from "vuex";
  import type {Ref} from "vue";
  import type {StateType} from "@/types/stateType";

  const store: Store<StateType> = useStore();
  const show: Ref<number> = ref(0);
  const showModal = (flag: number): number => show.value = flag;
  const out = (): void => store.commit('exit');

</script>

<style scoped>

li {
  font-size: 20px;
}

.d-flex {
  width: 200px;
  justify-content: space-between;
  margin-right: 2%;
}

.btn-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  cursor: pointer;
}

.container-fluid {
  width: fit-content;
  margin-left: 10px;
}

.login {
  width: 40%;
  position: absolute;
  left: 30%;
  margin-top: 100px;
}

.personal {
  margin-right: 2%;
}

@media screen and (max-width: 480px) {
  .d-flex {
    width: 50%;
  }
  @media screen and (max-width: 350px) {
    .d-flex {
      width: 200px;
    }
    @media screen and (max-width: 312px) {
      .container-fluid {
        width: 95%;
      }
      .navbar-brand {
        width: 100%;
        text-align: center;
      }
      .d-flex {
        width: 95%;
        margin-left: 10px;
        margin-right: 0;
      }
    }
  }
}

</style>