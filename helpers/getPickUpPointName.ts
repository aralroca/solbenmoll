import pickUpPoints, { THIRD_PARTY } from '../constants/pickpoints'

export default function getPickUpPointName(calendar, t) {
  if (calendar.puntRecollida === THIRD_PARTY) return t`third`
  const point = pickUpPoints.find((p) => p.id === calendar.puntRecollida)
  if (point) return point.name
  return '-'
}
