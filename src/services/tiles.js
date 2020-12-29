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
    const indeces = new Array(length).fill(null).map((val, index) => ((index * plus1) + start));
    hltolr = indeces.map((val) => tiles[val]);
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
    const indeces = new Array(length).fill(null).map((val, index) => (start - (index * minus1)));
    lltohr = indeces.map((val) => tiles[val]);
  }
  return ({ horizontal, vertical, hltolr, lltohr });
};

export const getNextTiles = ({ state, index }) => {
  const { currentPlayer, sideLength: prevSideLength, tiles: prevTiles } = state;
  // const neighbors = getNeighborIndexes({ index, sideLength: prevSideLength });
  const arrays = getArrays({ index, sideLength: prevSideLength, tiles: prevTiles });
  console.log(JSON.parse(JSON.stringify(arrays)));
  // console.log({
  //   neighbors: JSON.parse(JSON.stringify(neighbors)),
  //   arrays: JSON.parse(JSON.stringify(arrays)),
  // });
  const nextTiles = prevTiles.map(({ index: i, owner: prevOwner }) => {
    const owner = i === index ? currentPlayer : prevOwner;
    return { index: i, owner };
  });
  return nextTiles;
};
