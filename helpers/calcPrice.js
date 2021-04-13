// @todo Replace constants to DB prices
export default function calcPrice({
  petita,
  mitjana,
  gran,
  ous,
  ceba,
  fruita,
}) {
  return (
    petita.count * 10 +
    mitjana.count * 14.5 +
    gran.count * 20 +
    ous.count * 2.3 +
    ceba.count * 4.5 +
    fruita.count * 5.5
  ).toFixed(2)
}
