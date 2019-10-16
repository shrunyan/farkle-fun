const tap = require("tap");
const store = require("../store");

// Score calculation tests
tap.equal(store.sum([1, 2, 3, 4, 5, 6]), 3000);
tap.equal(store.sum([1, 1, 1, 3, 3, 3]), 2500);
tap.equal(store.sum([1, 1, 2, 2, 3, 3]), 1500);
tap.equal(store.sum([1, 1, 1, 1, 1, 1]), 3000);
tap.equal(store.sum([1, 1, 1, 1, 1]), 2000);
tap.equal(store.sum([1, 1, 1, 1]), 1000);
tap.equal(store.sum([6, 6, 6]), 600);
tap.equal(store.sum([5, 5, 5]), 500);

// Adding up multiple combos
// tap.equal(
//   [[1], [1], [1, 1]].reduce((acc, combo) => {
//     acc = acc + store.sum(combo);
//     return acc;
//   }, 0),
//   400
// );

tap.equal(store.tally([[1], [1], [1, 1]]), 400);
