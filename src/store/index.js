import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    target: {},
    lessons: [],
    notFind: false
  },
  mutations: {
    updateLessons: (state, payload) => {
      state.lessons = payload;
      state.notFind = false;
    },
    notFindLessons: (state) => {
      state.lessons = [];
      state.notFind = true;
    },
    clearLessons: (state) => (state.lessons = []),
    updateTarget: (state, payload) => {
      state.target = payload;
    },
    clearTarget: state => (state.target = {})
  },
  actions: {},
  modules: {},
});
