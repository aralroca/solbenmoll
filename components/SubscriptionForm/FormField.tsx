import React from 'react'
import useTranslation from 'next-translate/useTranslation'

function FormField({ id, state, isEditing, isExtra, times, setters }) {
  const { t } = useTranslation('common')
  const capitalized = id[0].toUpperCase() + id.slice(1, id.length)
  const setter = setters[`set${capitalized}`]

  function onChangeCount(e) {
    const val = parseInt(e.target.value, 10) || 0
    if (val === 0) return setter({ count: 0, time: 0 })
    if (state[id].count === 0 && val !== 0)
      return setter({ count: val, time: isExtra ? times[0] || 0 : 1 })
    setter((p) => ({ ...p, count: val }))
  }

  function onChangeTime(e) {
    const val = parseInt(e.target.value || '0', 10)
    if (val === 0) return setter({ count: 0, time: 0 })
    setter((p) => ({
      count: p.count === 0 && val !== 0 ? 1 : p.count,
      time: val,
    }))
  }

  return (
    <>
      <label htmlFor={id}>{t(`product-${id}`)}:</label>
      <div style={{ marginBottom: 20, display: 'flex' }}>
        <input
          type="number"
          min={0}
          id={id}
          required={!isEditing && state[id].times > 0}
          className={isEditing ? 'editing' : ''}
          disabled={isExtra && times.length === 0}
          max={100}
          value={state[id].count}
          onChange={onChangeCount}
        />
        {!isEditing && (
          <select
            required={!isEditing && state[id].count > 0}
            value={(state[id].time || '').toString()}
            style={
              state[id].time === 0
                ? { fontStyle: 'italic', color: '#625a50' }
                : {}
            }
            disabled={isExtra && times.length === 0}
            onChange={onChangeTime}
          >
            <option className="useless" value="">
              {state[id].time === 0 ? t`when` : t`no-want`}
            </option>
            {[1, 2, 3, 4].map((freq) => (
              <option
                key={freq}
                disabled={isExtra && !times.some((t) => freq % t === 0)}
                value={freq}
              >
                {t(`freq-${freq}`)}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  )
}

export default FormField
