<template>
  <div class="q-ma-sm row flex flex-center">
    <h2 class="text-white q-ma-none q-pa-none">Login</h2>
    <q-input
      bg-color="white"
      v-model="formLogin.email"
      outlined
      dense
      placeholder="login"
      class="q-ma-sm col-12"
    ></q-input>
    <q-input
      bg-color="white"
      v-model="formLogin.passwordUser"
      type="password"
      outlined
      dense
      placeholder="Senha"
      class="q-ma-sm col-12"
    ></q-input>
    <q-btn label="fazer login" color="red" @click="loginSubmit"></q-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      formLogin: {
        passwordUser: "",
        email: "",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["ActionLoginUser"]),
    loginSubmit() {
      this.ActionLoginUser(this.formLogin);
    },
  },
};
</script>

<style>
</style>