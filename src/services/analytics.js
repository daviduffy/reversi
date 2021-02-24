export const getAnalytics = ({ state }) => {
  const { tilesProjection, aggregateAnalytics = {} } = state;
  const { histogram: prevHistogram = [] } = aggregateAnalytics;
  const ownedTiles = tilesProjection.filter((({ owner }) => owner !== false));
  const gameOver = ownedTiles.length === 100;
  const moves = ownedTiles.length - 4;
  const nextHistogramEntry = { 1: 0, 2: 0 };
  tilesProjection.forEach(({ owner }) => {
    // eslint-disable-next-line
    if (nextHistogramEntry[owner]) nextHistogramEntry[owner] += 1;
    // console.log(owner);
  });
  const nextHistogram = [...prevHistogram, nextHistogramEntry];
  const payload = { gameOver, histogram: nextHistogram, moves };
  // console.log(payload);
  return payload;
};

export const foo = '';
