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
  const x = [...tiles].slice(rowStart, rowStart + sideLength);
  const y = tiles.filter(({ index: i }) => i % sideLength === colIndex);
  return ({ x, y });
};
