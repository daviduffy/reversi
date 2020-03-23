const side = 10;

const tiles = new Array(side * side).fill(null).map((it, index) => ({ index, owner: false }));

tiles[44].owner = 1;
tiles[45].owner = 2;
tiles[54].owner = 2;
tiles[55].owner = 1;

export default tiles;
