const tap = require("tap");
const store = require("../store");

// Score calculation tests
tap.equal(store.sum([1, 2, 3, 4, 5, 6]), 3000);
tap.equal(store.sum([1, 1, 1, 3, 3, 3]), 2500);
