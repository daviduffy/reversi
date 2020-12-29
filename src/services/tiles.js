export const getNeighborIndexes = ({ index, sideLength }) => {
  const isTopRow = index < sideLength;
  const isRightSide = index % (sideLength - 1) === (sideLength - 1);
  const isBottomRow = index >= ((sideLength * sideLength) - sideLength);
  const isLeftSide = index % sideLength === 0;
  return ({
    top: isTopRow ? false : index - sideLength,
    right: isRightSide ? false : index + 1,
    bottom: isBottomRow ? false : index + sideLength,
    left: isLeftSide ? false : index - 1,
  });
};

export const getArrays = ({ index, sideLength, tiles }) => {
  const colIndex = index % sideLength;
  const rowIndex = (index - colIndex) / sideLength;
  const rowStart = rowIndex * sideLength;
  const horizontal = [...tiles].slice(rowStart, rowStart + sideLength);
  const vertical = tiles.filter(({ index: i }) => i % sideLength === colIndex);
  let hltolr = null;
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
      location = 'lowside';
      length = sideLength - (rowIndex - 1) + (colIndex - 1);
    }
    const start = location === 'highSide' ? (colIndex - rowIndex) : (rowIndex - colIndex) * 10;
    console.log({ rowIndex, rowStart, colIndex, start, length });
    // eslint-disable-next-line
    const indeces = new Array(length).fill(null).map((val, index) => ((index * plus1) + start));
    hltolr = indeces.map((val) => tiles[val]);
  }
  return ({ horizontal, vertical, hltolr });
};

export const getNextTiles = ({ state, index }) => {
  const { currentPlayer, sideLength: prevSideLength, tiles: prevTiles } = state;
  const neighbors = getNeighborIndexes({ index, sideLength: prevSideLength });
  const arrays = getArrays({ index, sideLength: prevSideLength, tiles: prevTiles });
  console.log({
    neighbors: JSON.parse(JSON.stringify(neighbors)),
    arrays: JSON.parse(JSON.stringify(arrays)),
  });
  const nextTiles = prevTiles.map(({ index: i, owner: prevOwner }) => {
    const owner = i === index ? currentPlayer : prevOwner;
    return { index: i, owner };
  });
  return nextTiles;
};
