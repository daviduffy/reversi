import dayjs from 'dayjs';
import * as CONSTANTS from '@/constants/constants';
import { getNewTiles } from '@/fixtures/tiles';
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

export const handleAddTile = ({ prevProjection, event, sideLength }) => {
  const { currentPlayer, index } = event;
  return getNextTiles({ currentPlayer, index, prevTiles: prevProjection, sideLength });
};

export const handleChangePlayer = ({ nextPlayer }) => nextPlayer;

export const apply = {
  [CONSTANTS.CLICK_TILE]: handleAddTile,
  [CONSTANTS.CHANGE_CURRENT_PLAYER]: handleChangePlayer,
};

export const reconstituteGame = (state) => {
  const { events } = state;
  let currentPlayer = 1;
  let tilesProjection = [...getNewTiles()];
  events.forEach((event) => {
    const { type } = event;
    if (type === CONSTANTS.CLICK_TILE) {
      tilesProjection = apply[CONSTANTS.CLICK_TILE]({
        prevProjection: tilesProjection,
        event,
        sideLength: state.sideLength,
      });
    } else if (type === CONSTANTS.CHANGE_CURRENT_PLAYER) {
      currentPlayer = event.nextPlayer;
    }
  });
  return { currentPlayer, tilesProjection };
};
