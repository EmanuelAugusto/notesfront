import Vue from "vue";
import axios from "axios";
import store from "../store";
import { Notify } from "quasar";

export const Http = axios.create({
  baseURL: process.env.API
});

Http.interceptors.response.use(
  response => {
    // store.dispatch("auth/ActionModalNotLogged", {
    //   modal: false,
    //   data: {}
    // });
    return response;
  },
  error => {
    if (error.response.status === 401) {
    //   store.dispatch("auth/ActionModalNotLogged", {
    //     modal: true,
    //     data: {}
    //   });
    }
    if (error.response.status === 500) {
    //   store.dispatch("auth/ActionModalErrorServer", { modal: true, data: {} });
    }

    return Promise.reject(error.response);
  }
);
