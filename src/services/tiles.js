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

export const isEdge = ({ sideLength, index, location }) => {
  const lowerLoc = location.toLowerCase();
  const onTopEdge = (ind) => ind < sideLength;
  const onRightEdge = (ind) => (ind + 1) % sideLength === 0;
  const onBottomEdge = (ind) => ind >= (sideLength * sideLength) - sideLength;
  const onLeftEdge = (ind) => ind % sideLength === 0;

  return (lowerLoc.includes('top') && onTopEdge(index))
    || (lowerLoc.includes('right') && onRightEdge(index))
    || (lowerLoc.includes('bottom') && onBottomEdge(index))
    || (lowerLoc.includes('left') && onLeftEdge(index));
};

export const getToChangeIndexes = ({ currentPlayer, neighbors, sideLength, tiles }) => {
  // eslint-disable-next-line
  const vectorsToFlip = neighbors.filter(({ index: i, location }) => {
    // index is set to false for indexes that are off the edge of the board
    if (i === false) return false;
    const { owner } = tiles[i];
    // remove tiles PAST the edge of the board
    const tileIsEdge = isEdge({ sideLength, index: i, location });
    return i !== false
      // remove vectors that are unoccupied
      && owner !== false
      // remove vectors owned by the current player
      && owner !== currentPlayer
      // remove tiles that ARE edges of the board
      && !tileIsEdge;
  });

  const equations = getEquations(sideLength);
  // eslint-disable-next-line
  const next = vectorsToFlip.map(({ index: i, location }) => {
    let indexesToChange = [];
    let currIndex = i;
    let complete = false;
    do {
      const currTile = tiles[currIndex];
      // eslint-disable-next-line
      // currTile && console.log(JSON.parse(JSON.stringify(currTile)));
      // null safe
      if (!currTile) {
        break;
      // can't "flip" an unoccupied tile in this way
      } else if (currTile.owner === false) {
        break;
      // flip tiles that are occupied by the other player
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

export const getNextTiles = ({ currentPlayer, index, prevTiles, sideLength }) => {
  const neighbors = getNeighborIndexes({ index, sideLength });
  const indexesToChange = getToChangeIndexes({
    currentPlayer,
    index,
    neighbors,
    sideLength,
    tiles: prevTiles,
  });
  if (indexesToChange.length === 0) return { error: true, index };
  const nextTiles = [...prevTiles];
  // mutate nextTiles directly :|
  [index, ...indexesToChange].forEach((val) => { nextTiles[val].owner = currentPlayer; });
  return nextTiles;
};
