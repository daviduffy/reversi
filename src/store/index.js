import Vue from 'vue';
import Vuex from 'vuex';

import * as types from '@/constants/constants';
// import { setDB } from '@/services/localStorage';
import {
  Event,
  getTilesProjection,
  getReconstitutedCurrentPlayer,
  apply,
} from '@/services/eventStream';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideLength: 10,
    tilesProjection: [],
    events: [],
    currentPlayer: 1,
  },
  mutations: {
    SET_SIDE_LENGTH() {},
    SET_TILES_PROJECTION(state, tilesProjection) {
      state.tilesProjection = tilesProjection;
      console.log('SET_TILES_PROJECTION', JSON.parse(JSON.stringify(state)));
    },
    SET_EVENTS() {},
    SET_CURRENT_PLAYER(state, nextPlayer) {
      state.currentPlayer = nextPlayer;
    },
    RECORD_EVENT(state, event) {
      state.events = [...state.events, event];
    },
    CHANGE_CURRENT_PLAYER(state) {
      const { currentPlayer } = state;
      this.state.currentPlayer = currentPlayer === 1 ? 2 : 1;
    },
  },
  actions: {
    startAppSetup(/* { state, commit } */) {
      // use this area to fetch any saved game from localStorage and set state
      return Promise.resolve('done');
    },
    startClickTile({ state, dispatch }, protoEvent) {
      const { currentPlayer } = state;
      const nextPlayer = currentPlayer === 1 ? 2 : 1;
      const clickEvent = new Event({ type: types.CLICK_TILE, currentPlayer, ...protoEvent });
      const playerChangeEvent = new Event({ type: types.CHANGE_CURRENT_PLAYER, nextPlayer });
      return dispatch('startRecordEvent', clickEvent)
        .then(() => dispatch('startApplyClickTile', clickEvent))
        .then(() => dispatch('startRecordEvent', playerChangeEvent))
        .then(() => dispatch('startApplyChangePlayer', playerChangeEvent));
    },
    startApplyClickTile({ state, commit }, event) {
      const { tilesProjection: prevProjection, sideLength } = state;
      const applyFunc = apply[event.type];
      // TODO: not not allow move to be applied if invalid
      const nextProjection = applyFunc({ prevProjection, event, sideLength });
      commit('SET_TILES_PROJECTION', nextProjection);
    },
    startApplyChangePlayer({ commit }, event) {
      commit('SET_CURRENT_PLAYER', event.nextPlayer);
    },
    startRecordEvent({ commit }, event) {
      commit('RECORD_EVENT', event);
      return Promise.resolve();
      // const { events } = state;
      // return setDB({ events });
    },
    // CLICK_TILE({ state, commit }, { index }) {
    //   const isOwned = state.tiles[index].owner !== false;
    //   if (isOwned) return;
    //   // console.log('vuex click', index, state.currentPlayer);
    //   // console.log(neighbors);
    //   // console.log(arrays);
    //   commit('CLICK_TILE', index);
    //   commit('CHANGE_CURRENT_PLAYER');
    // },
    startReconstituteGame({ state, commit }) {
      const { events } = state;
      const tilesProjection = getTilesProjection(state);
      const currentPlayer = getReconstitutedCurrentPlayer(events);
      commit('SET_TILES_PROJECTION', tilesProjection);
      commit('SET_CURRENT_PLAYER', currentPlayer);
    },
  },
  modules: {
  },
});
