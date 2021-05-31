import * as types from "./mutation-types";
import store from "../../../store/index";
import { Http } from "../../../http/http";
import { Notify } from "quasar";

export const ActionGetNotes = ({ dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    Http.get("/notes")
      .then(response => {
        dispatch("ActionSetStateNotes", response.data);
        dispatch("ActionSetStateLoadingNotes", false);
        if (payload) {
          payload();
        }
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const ActionGetNoteById = ({ dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    Http.get(`/notes/${payload}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const ActionCreateNote = ({ dispatch }, payload) => {
  let { title, noteHtml } = payload;
  return new Promise((resolve, reject) => {
    Http.post(`/notes`, {
      title,
      noteHtml
    })
      .then(response => {
        store.$router.push({ name: "home" });
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const ActionUpdateNote = ({ dispatch }, payload) => {
  let { _id, title, noteHtml } = payload;
  return new Promise((resolve, reject) => {
    Http.put(`/notes/${_id}`, {
      title,
      noteHtml
    })
      .then(response => {
        store.$router.push({ name: "home" });
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const ActionDeleteNote = ({ dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    Http.delete(`/notes/${payload}`)
      .then(response => {
        dispatch("ActionGetNotes");
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const ActionSetStateNotes = ({ commit }, payload) => {
  commit(types.SET_NOTES, payload);
};

export const ActionSetStateLoadingNotes = ({ commit }, payload) => {
  commit(types.SET_STATELOADINGNOTES, payload);
};

export const ActionSetStateModal = ({ commit }, payload) => {
  commit(types.SET_MODALSTATECALENDAR, payload);
};

export const ActionSetEvents = ({ commit }, payload) => {
  commit(types.SET_EVENTS, payload);
};

export const ActionGetEvents = ({ dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    Http.get(`/events`)
      .then(response => {
        dispatch("ActionSetEvents", response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const ActionCreateEvent = ({ dispatch }, payload) => {
  let { eventDate, eventName, eventDescription } = payload;
  return new Promise((resolve, reject) => {
    Http.post(`/events`, {
      eventDate,
      eventName,
      eventDescription
    })
      .then(response => {
        dispatch("ActionGetEvents")
        dispatch('ActionSetStateModal', { modal: false, data: null})
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
