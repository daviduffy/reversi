import tiles from '@/fixtures/tiles';

export const CHANGE_CURRENT_PLAYER = 'CHANGE_CURRENT_PLAYER';
export const CLICK_TILE = 'CLICK_TILE';
export const DEFAULT_STATE = {
  sideLength: 10,
  tilesProjection: tiles,
  events: [],
  currentPlayer: 1,
};
