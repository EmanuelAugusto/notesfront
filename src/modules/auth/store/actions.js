import * as types from "./mutation-types";
import { Http } from "../../../http/http";
import { Notify } from "quasar";
import store from "../../../store/index";
import * as Storage from "../storage/storage";

export const ActionSetToken = ({ commit }, payload) => {
  commit(types.SET_TOKEN, payload);
};

export const ActionSetUser = ({ commit }, payload) => {
  commit(types.SET_USER, payload);
};

export const ActionSetHeadersAxios = ({ state: { token } }) => {
  Http.defaults.headers.common = {
    Authorization: `Bearer ${token}`
  };
};

export const ActionLoginUser = ({ dispatch }, payload) => {
  let { email, passwordUser } = payload;
  return new Promise((resolve, reject) => {
    Http.post(`/login`, {
      email,
      passwordUser
    })
      .then(response => {
        dispatch("ActionSetUser", response.data.user);

        Storage.setLocalToken(response.data.token);

        dispatch("ActionSetToken", response.data.token);

        dispatch("ActionSetHeadersAxios");

        store.$router.push({ name: "home" });
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const ActionVerifyToken = ({ dispatch }, next) => {
  return new Promise((resolve, reject) => {
    let token = Storage.getLocalToken();

    dispatch("ActionSetToken", token);

    dispatch("ActionSetHeadersAxios");

    Http.get(`/session`)
      .then(response => {
        dispatch("ActionSetUser", response.data);
        next();
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        next({ name: "login" });
        reject(error);
      });
  });
};

export const ActionLogoutUser = ({ dispatch }, payload) => {
  Storage.deleteLocalToken();
  dispatch("ActionSetUser", null);
  dispatch("ActionSetToken", "");
  Http.defaults.headers.common = {};
  store.$router.push({ name: "login" });
};
