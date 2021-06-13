import pickUpPoints from '../constants/pickpoints'

export default function getPickUpPointName(calendar) {
  const point = pickUpPoints.find((p) => p.id === calendar.puntRecollida)
  if (point) return point.name
  return '-'
}
