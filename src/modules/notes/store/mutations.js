import * as types from "./mutation-types";

export default {
  [types.SET_NOTES](state, payload){
    state.notesArrayList = payload
  },
  [types.SET_STATELOADINGNOTES](state, payload){
    state.loadingNotes = payload
  },
  [types.SET_MODALSTATECALENDAR](state, payload){
    state.modalDateEvent = payload
  },
  [types.SET_EVENTS](state, payload){
    state.events = payload
  }
};