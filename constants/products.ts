export default {
  petita: {
    price: 13,
    isBasket: true,
    numProducts: 5,
    kg: 3,
  },
  mitjana: {
    price: 18,
    isBasket: true,
    numProducts: 6,
    kg: 5,
  },
  gran: {
    price: 23,
    isBasket: true,
    numProducts: 7,
    kg: 7,
  },
  ous: {
    price: 2.45,
    isBasket: false,
  },
  ceba: {
    price: 4.5,
    isBasket: false,
  },
  fruita: {
    price: 5.5,
    isBasket: false,
    kg: 2,
  },
}

export const defaults = {
  ceba: { time: 0, count: 0 },
  fruita: { time: 0, count: 0 },
  gran: { time: 0, count: 0 },
  mitjana: { time: 0, count: 0 },
  ous: { time: 0, count: 0 },
  petita: { time: 0, count: 0 },
  weekExceptions: {},
}
