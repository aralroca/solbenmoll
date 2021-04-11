const basketPrice = {
  petita: 10,
  mitjana: 14.5,
  gran: 20,
}

// @todo Replace constants to DB prices
export default function calcPrice({ basket, ous, ceba, fruita }) {
  let price = basketPrice[basket]
  if (ous) price += 2.3
  if (ceba) price += 4.5
  if (fruita) price += 5.5
  return price
}
