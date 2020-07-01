import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    target: {},
    lessons: [],
  },
  mutations: {
    updateLessons: (state, payload) => {
      state.lessons = payload;
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
