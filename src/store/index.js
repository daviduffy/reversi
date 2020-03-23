import Vue from 'vue';
import Vuex from 'vuex';
import tiles from '@/fixtures/tiles';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tiles,
    currentPlayer: 1,
  },
  mutations: {
    handleClick(state, index) {
      console.log('vuex click', index, state.currentPlayer);
    },
  },
  actions: {
  },
  modules: {
  },
});
