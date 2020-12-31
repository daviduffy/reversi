import dayjs from 'dayjs';
import * as types from '@/constants/constants';
import tiles from '@/fixtures/tiles';
import { getNextTiles } from '@/services/tiles';
import { uuid } from '@/services/utils';

export class Event {
  constructor({ type, ...rest }) {
    this.type = type;
    this.id = uuid();
    this.createdAt = dayjs().valueOf();
    // pass anything in
    Object.keys(rest || {}).forEach((key) => {
      this[key] = rest[key];
    });
  }
}

export const getTilesProjection = (/* state */) => {
  console.log('getTilesProjection');
  return tiles;
};

export const getReconstitutedCurrentPlayer = (events) => {
  const [lastEvent] = events;
  const nextPlayer = lastEvent ? (lastEvent.currentPlayer || lastEvent.nextPlayer || 1) : 1;
  return nextPlayer;
};

export const handleAddTile = ({ prevProjection, event, sideLength }) => {
  const { currentPlayer, index } = event;
  return getNextTiles({ currentPlayer, index, prevTiles: prevProjection, sideLength });
};

export const apply = {
  [types.CLICK_TILE]: handleAddTile,
};
