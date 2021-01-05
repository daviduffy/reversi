import Vue from 'vue';
import Vuex from 'vuex';

import * as CONSTANTS from '@/constants/constants';
import { getDB, setDB } from '@/services/localStorage';
import {
  Event,
  reconstituteGame,
  apply,
} from '@/services/eventStream';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { ...CONSTANTS.DEFAULT_STATE },
  mutations: {
    SET_SIDE_LENGTH(state, length) {
      state.length = length;
    },
    SET_TILES_PROJECTION(state, tilesProjection) {
      state.tilesProjection = tilesProjection;
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_CURRENT_PLAYER(state, nextPlayer) {
      state.currentPlayer = nextPlayer;
    },
    RECORD_EVENT(state, event) {
      state.events = [...state.events, event];
    },
  },
  actions: {
    // eslint-disable-next-line
    startAppSetup({ state }) {
      return getDB()
        .then(({ events }) => {
          if (events && events.length > 0) {
          //   // const restore = confirm('would you like to restore saved game?');
            state.events = events;
          }
          return Promise.resolve('done');
        });
    },
    startClickTile({ state, dispatch }, protoEvent) {
      const { currentPlayer } = state;
      const nextPlayer = currentPlayer === 1 ? 2 : 1;
      const clickEvent = new Event({ type: CONSTANTS.CLICK_TILE, currentPlayer, ...protoEvent });
      const playerChangeEvent = new Event({ type: CONSTANTS.CHANGE_CURRENT_PLAYER, nextPlayer });
      return dispatch('startRecordEvent', clickEvent)
        .then(() => dispatch('startApplyClickTile', clickEvent))
        .then(() => dispatch('startRecordEvent', playerChangeEvent))
        .then(() => dispatch('startApplyChangePlayer', playerChangeEvent));
    },
    startApplyClickTile({ state, commit }, event) {
      const { tilesProjection: prevProjection, sideLength } = state;
      const applyFunc = apply[event.type];
      const nextProjection = applyFunc({ prevProjection, event, sideLength });
      commit('SET_TILES_PROJECTION', nextProjection);
    },
    startApplyChangePlayer({ commit }, event) {
      commit('SET_CURRENT_PLAYER', event.nextPlayer);
    },
    startRecordEvent({ state, commit }, event) {
      commit('RECORD_EVENT', event);
      const { events } = state;
      return setDB({ events });
    },
    startReconstituteGame({ state, commit }) {
      const { currentPlayer, tilesProjection } = reconstituteGame(state);
      console.log('startReconstituteGame', { currentPlayer, tilesProjection });
      commit('SET_TILES_PROJECTION', tilesProjection);
      commit('SET_CURRENT_PLAYER', currentPlayer);
    },
    startResetGame({ commit }) {
      const { sideLength, tilesProjection, events, currentPlayer } = CONSTANTS.DEFAULT_STATE;
      console.log('startResetGame');
      commit('SET_SIDE_LENGTH', sideLength);
      commit('SET_TILES_PROJECTION', tilesProjection);
      commit('SET_EVENTS', events);
      commit('SET_CURRENT_PLAYER', currentPlayer);
    },
  },
  modules: {
  },
});
