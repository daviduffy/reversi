import { DEFAULT_STATE } from '@/constants/constants';

export const getNewTiles = () => {
  const side = DEFAULT_STATE.sideLength;

  const tiles = new Array(side * side).fill(null).map((it, index) => ({ index, owner: false }));

  if (DEFAULT_STATE.sideLength === 10) {
    tiles[44].owner = 1;
    tiles[45].owner = 2;
    tiles[54].owner = 2;
    tiles[55].owner = 1;
  } else if (DEFAULT_STATE.sideLength === 8) {
    tiles[27].owner = 1;
    tiles[28].owner = 2;
    tiles[35].owner = 2;
    tiles[36].owner = 1;
  }

  return tiles;
};

export default [...getNewTiles()];
