import Vue from 'vue';
import Vuex from 'vuex';
import tiles from '@/fixtures/tiles';
import { getNextTiles } from '../services/tiles';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideLength: 10,
    tiles,
    currentPlayer: 1,
  },
  mutations: {
    ADD_TILE(state, index) {
      this.state.tiles = getNextTiles({ state, index });
    },
    CHANGE_CURRENT_PLAYER(state) {
      const { currentPlayer } = state;
      this.state.currentPlayer = currentPlayer === 1 ? 2 : 1;
    },
  },
  actions: {
    CLICK_TILE({ state, commit }, { index }) {
      const isOwned = state.tiles[index].owner !== false;
      if (isOwned) return;
      // console.log('vuex click', index, state.currentPlayer);
      // console.log(neighbors);
      // console.log(arrays);
      commit('ADD_TILE', index);
      commit('CHANGE_CURRENT_PLAYER');
    },
  },
  modules: {
  },
});
