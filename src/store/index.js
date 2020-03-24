import Vue from 'vue';
import Vuex from 'vuex';
import tiles from '@/fixtures/tiles';
// import { getNeighborIndexes, getArrays } from '@/services/tiles';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideLength: 10,
    tiles,
    currentPlayer: 1,
  },
  mutations: {
    ADD_TILE(state, index) {
      const { tiles: prevTiles, currentPlayer } = state;
      const nextTiles = prevTiles.map(({ index: i, owner: prevOwner }) => {
        const owner = i === index ? currentPlayer : prevOwner;
        return { index: i, owner };
      });
      this.state.tiles = nextTiles;
    },
    CHANGE_CURRENT_PLAYER(state) {
      const { currentPlayer } = state;
      this.state.currentPlayer = currentPlayer === 1 ? 2 : 1;
    },
  },
  actions: {
    CLICK_TILE({ state, commit }, { index }) {
      if (state.tiles[index].owner !== false) return;
      // const { sideLength: prevSideLength, tiles: prevTiles } = state;
      // const neighbors = getNeighborIndexes({ index, sideLength: prevSideLength });
      // const arrays = getArrays({ index, sideLength: prevSideLength, tiles: prevTiles });
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
