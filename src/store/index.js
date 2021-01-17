import Vue from 'vue';
import Vuex from 'vuex';

import { getNewTiles } from '@/fixtures/tiles';
import * as CONSTANTS from '@/constants/constants';
import { getDB, setDB, clearDB } from '@/services/localStorage';
import {
  Event,
  reconstituteGame,
  apply,
} from '@/services/eventStream';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...CONSTANTS.DEFAULT_STATE,
    tilesProjection: getNewTiles(),
    error: false,
  },
  mutations: {
    SET_SIDE_LENGTH(state, length) {
      state.sideLength = length;
    },
    SET_ERROR_STATE(state, error) {
      state.error = error;
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
    startClickTile({ state, commit, dispatch }, protoEvent) {
      const { currentPlayer } = state;
      const nextPlayer = currentPlayer === 1 ? 2 : 1;
      const clickEvent = new Event({ type: CONSTANTS.CLICK_TILE, currentPlayer, ...protoEvent });
      const playerChangeEvent = new Event({ type: CONSTANTS.CHANGE_CURRENT_PLAYER, nextPlayer });

      // chain starts with startApplyClickTile to ensure move is valid before recording event
      return dispatch('startApplyClickTile', clickEvent)
        .then(({ valid, index }) => {
          if (valid) {
            dispatch('startRecordEvent', clickEvent);
          } else {
            commit('SET_ERROR_STATE', index);
            setTimeout(() => commit('SET_ERROR_STATE', null), 1000);
            throw new Error('throw to avoid executing remaining actions');
          }
        })
        .then(() => dispatch('startRecordEvent', playerChangeEvent))
        .then(() => dispatch('startApplyChangePlayer', playerChangeEvent))
        .catch((error) => { console.warn(error); });
    },
    startApplyClickTile({ state, commit }, event) {
      const { tilesProjection: prevProjection, sideLength } = state;
      const applyFunc = apply[event.type];
      const nextProjection = applyFunc({ prevProjection, event, sideLength });
      // console.log(JSON.parse(JSON.stringify({ nextProjection })));
      if (nextProjection.error) {
        // commit('SET_ERROR_STATE', nextProjection.index);
        // setTimeout(() => commit('SET_ERROR_STATE', null), 1000);
        // throw new Error('invalid move');
        // eslint-disable-next-line
        return { valid: false, index: nextProjection.index };
      }
      commit('SET_TILES_PROJECTION', nextProjection);
      return { valid: true };
    },
    startApplyChangePlayer({ commit }, event) {
      commit('SET_CURRENT_PLAYER', event.nextPlayer);
    },
    startRecordEvent({ state, commit }, event) {
      commit('RECORD_EVENT', event);
      const { events } = state;
      return setDB({ events });
    },
    startUndo({ state, commit, dispatch }) {
      const { events } = state;
      // don't allow undo if it's the start of the game
      if (events.length <= 4) return;
      let nextEvents = [...events];
      const last = events[events.length - 1];
      // an error occured and last tile couldn't be placed
      if (last.type === CONSTANTS.CLICK_TILE) {
        nextEvents.pop();
      } else {
        nextEvents = nextEvents.slice(0, nextEvents.length - 2);
      }
      commit('SET_EVENTS', nextEvents);
      dispatch('startReconstituteGame', { prevEvents: nextEvents });
    },
    /*
     * Rebuilds game state from events feed. Optional argument allows the event stream
     * to be overridden with a new event stream (required in case of undo)
     */
    startReconstituteGame({ state, commit }, { prevEvents } = {}) {
      const { events, sideLength } = state;
      const payload = { events: prevEvents || events, sideLength };
      const { currentPlayer, tilesProjection } = reconstituteGame(payload);
      commit('SET_TILES_PROJECTION', tilesProjection);
      commit('SET_CURRENT_PLAYER', currentPlayer);
    },
    startResetGame({ commit }) {
      const { sideLength, events, currentPlayer } = CONSTANTS.DEFAULT_STATE;
      commit('SET_SIDE_LENGTH', sideLength);
      commit('SET_TILES_PROJECTION', getNewTiles());
      commit('SET_EVENTS', events);
      commit('SET_CURRENT_PLAYER', currentPlayer);
      clearDB();
    },
  },
  modules: {
  },
});
