export const getNeighborIndexes = ({ index, sideLength }) => {
  const isTopRow = index < sideLength;
  const isRightSide = (index + 1) % sideLength === 0;
  const isBottomRow = index >= ((sideLength * sideLength) - sideLength);
  const isLeftSide = index % sideLength === 0;
  const t = { index: isTopRow ? false : index - sideLength, location: 'top' };
  const r = { index: isRightSide ? false : index + 1, location: 'right' };
  const b = { index: isBottomRow ? false : index + sideLength, location: 'bottom' };
  const l = { index: isLeftSide ? false : index - 1, location: 'left' };
  const rt = { index: (isTopRow || isRightSide) ? false : t.index + 1, location: 'rightTop' };
  const rb = { index: (isBottomRow || isRightSide) ? false : b.index + 1, location: 'rightBottom' };
  const lb = { index: (isBottomRow || isLeftSide) ? false : b.index - 1, location: 'leftBottom' };
  const lt = { index: (isTopRow || isLeftSide) ? false : t.index - 1, location: 'leftTop' };
  return [lt, t, rt, l, { index, location: 'center' }, r, lb, b, rb];
};

export const getArrays = ({ index, sideLength, tiles }) => {
  const colIndex = index % sideLength;
  const rowIndex = (index - colIndex) / sideLength;
  const rowStart = rowIndex * sideLength;
  const horizontal = [...tiles].slice(rowStart, rowStart + sideLength);
  const vertical = tiles.filter(({ index: i }) => i % sideLength === colIndex);
  let hltolr = null;
  let lltohr = null;
  {
    // horizontal high left to low right
    const plus1 = sideLength + 1;
    let location;
    let length;
    if (colIndex === rowIndex) {
      location = 'centerLine';
      length = 11;
    } else if (colIndex > rowIndex) {
      location = 'highSide';
      length = (rowIndex - 1) + (sideLength - (colIndex - 1));
    } else {
      location = 'lowSide';
      length = sideLength - (rowIndex - 1) + (colIndex - 1);
    }
    const start = location === 'highSide' ? (colIndex - rowIndex) : (rowIndex - colIndex) * 10;
    // eslint-disable-next-line
    const indexes = new Array(length).fill(null).map((val, index) => ((index * plus1) + start));
    hltolr = indexes.map((val) => tiles[val]);
  }
  {
    // horizontal low left to high right
    lltohr = [];
    const minus1 = sideLength - 1;
    let length;
    let location;
    if (colIndex + rowIndex === minus1) {
      location = 'centerLine';
      length = 11;
    } else if (colIndex + rowIndex < minus1) {
      location = 'highSide';
      length = colIndex + rowIndex + 1;
    } else {
      location = 'lowSide';
      length = (minus1 - colIndex) + 1 + (minus1 - rowIndex);
    }
    const lastRowFirstIndex = (sideLength * sideLength) - sideLength;
    const start = location !== 'lowSide'
      ? ((colIndex + rowIndex) * 10)
      : lastRowFirstIndex + ((rowIndex + colIndex) % 10) + 1;
    // eslint-disable-next-line
    const indexes = new Array(length).fill(null).map((val, index) => (start - (index * minus1)));
    lltohr = indexes.map((val) => tiles[val]);
  }
  return ({ horizontal, vertical, hltolr, lltohr });
};

export const getEquations = (sideLength) => ({
  top(curr) { return curr - sideLength >= 0 ? curr - sideLength : false; },
  right(curr) { return (curr + 1) % 10 !== 0 ? curr + 1 : false; },
  bottom(curr) {
    return curr + sideLength <= (sideLength * sideLength) ? curr + sideLength : false;
  },
  left(curr) { return curr % 10 === 0 ? false : curr - 1; },
  rightTop(curr) { return curr - (sideLength - 1); },
  rightBottom(curr) { return curr + (sideLength + 1); },
  leftBottom(curr) { return curr + (sideLength - 1); },
  leftTop(curr) { return curr - (sideLength + 1); },
});

// eslint-disable-next-line
export const getToChangeIndexes = ({ currentPlayer, index, neighbors, sideLength, tiles }) => {
  console.log('clicked: ', index);
  // eslint-disable-next-line
  const vectorsToFlip = neighbors.filter(({ index: i }) => {
    const { owner } = tiles[i];
    // remove edges of the board
    return i !== false
      // remove vectors that are unoccupied
      && owner !== false
      // remove vectors owned by the current player
      && owner !== currentPlayer;
  });
  const equations = getEquations(sideLength);
  // eslint-disable-next-line
  const next = vectorsToFlip.map(({ index: i, location }) => {
    let indexesToChange = [];
    let currIndex = i;
    let complete = false;
    do {
      const currTile = tiles[currIndex];
      if (currTile.owner === false) {
        break;
      } else if (currTile.owner !== currentPlayer) {
        indexesToChange = [...indexesToChange, currIndex];
      } else if (currTile.owner === currentPlayer) {
        complete = true;
        break;
      } else { break; }
      const nextIndex = equations[location](currIndex);
      if (nextIndex === false) {
        break;
      } else {
        currIndex = nextIndex;
      }
    } while (true);
    return complete ? indexesToChange : [];
  });
  return next.flat();
};

export const getNextTiles = ({ state, index }) => {
  const { currentPlayer, sideLength, tiles: prevTiles } = state;
  const neighbors = getNeighborIndexes({ index, sideLength });
  // eslint-disable-next-line
  const indexesToChange = getToChangeIndexes({ currentPlayer, index, neighbors, sideLength, tiles: prevTiles });
  // const arrays = getArrays({ index, sideLength, tiles: prevTiles });
  // console.log(JSON.parse(JSON.stringify(neighbors)));
  // console.log(JSON.parse(JSON.stringify({
  //   arrays,
  //   indexesToChange,
  // })));
  console.log({ indexesToChange, neighbors });
  const nextTiles = [...prevTiles];
  // mutate nextTiles directly :|
  [index, ...indexesToChange].forEach((val) => { nextTiles[val].owner = currentPlayer; });
  return nextTiles;
};
