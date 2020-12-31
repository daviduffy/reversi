const databaseName = 'reversi';

export const getDB = () => new Promise((res /* rej */) => {
  const prevJSON = window.localStorage[databaseName];
  let storedState;
  try {
    storedState = JSON.parse(prevJSON);
  } catch (err) {
    console.log('no stored state');
    storedState = {};
  }
  console.log({ storedState });
  res(storedState);
});

export const setDB = (updates) => new Promise((res /* rej */) => getDB()
  .then((prevState) => {
    const nextState = {
      ...prevState,
      ...updates,
    };
    console.log({ 'would have saved this': nextState });
    // window.localStorage[databaseName] = JSON.stringify(nextState);
    res(nextState);
  }));
