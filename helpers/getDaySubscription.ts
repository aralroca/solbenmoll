export default function getDaySubscription(subscription, weekIndex) {
  const daySub = { ...subscription }
  const [year, index] = weekIndex
  let active = false

  Object.keys(daySub).forEach((k) => {
    const isActive =
      daySub[k].count > 0 && index % parseInt(daySub[k].time) === 0
    active = active || isActive
    daySub[k] = {
      count: isActive ? daySub[k].count : 0,
      time: daySub[k].time,
    }
  })

  return [daySub, active]
}
