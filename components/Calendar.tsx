import useTranslation from 'next-translate/useTranslation'
import calcPrice from '../helpers/calcPrice'
import getWeeks from '../helpers/getWeeks'
import styles from './Calendar.module.scss'

const defaultSubs = {
  ceba: {},
  fruita: {},
  gran: {},
  mitjana: {},
  ous: {},
  petita: {},
}

function Calendar({
  exceptions = {},
  subscription = defaultSubs,
  onClickSubscription = (v) => {},
  ...props
}) {
  const { t, lang } = useTranslation('my-baskets')
  const weeks = getWeeks(lang)
  const isActive = (s, f, i) => s[f].count > 0 && i % parseInt(s[f].time) === 0

  return (
    <div className={styles.calendar} {...props}>
      {weeks.map((week, index) => {
        const sub = exceptions[week.id] || subscription
        const cActive = isActive(sub, 'ceba', index)
        const fActive = isActive(sub, 'fruita', index)
        const gActive = isActive(sub, 'gran', index)
        const mActive = isActive(sub, 'mitjana', index)
        const oActive = isActive(sub, 'ous', index)
        const pActive = isActive(sub, 'petita', index)
        const active = pActive || mActive || gActive

        return (
          <div
            key={week.id}
            title={active ? t`edit` : undefined}
            onClick={() => {
              const daySub = { ...sub }
              Object.keys(daySub).forEach((k) => {
                daySub[k] = {
                  count: isActive(daySub, k, index) ? daySub[k].count : 0,
                  time: 1,
                }
              })
              onClickSubscription({ ...daySub, week })
            }}
            className={`${styles.day} ${active ? styles.active : ''}`}
          >
            {active ? (
              <b style={{ marginBottom: 15 }}>{week.name}</b>
            ) : (
              week.name
            )}
            {active && (
              <>
                {sub.petita.count > 0 && pActive && (
                  <div>
                    <b>{`${sub.petita.count}x `}</b>
                    {t(`product-petita`) + ' 🥑'}
                  </div>
                )}
                {sub.mitjana.count > 0 && mActive && (
                  <div>
                    <b>{`${sub.mitjana.count}x `}</b>
                    {t(`product-mitjana`) + ' 🥦'}
                  </div>
                )}
                {sub.gran.count > 0 && gActive && (
                  <div>
                    <b>{`${sub.gran.count}x `}</b>
                    {t(`product-gran`) + ' 🥬'}
                  </div>
                )}
                {sub.ous.count > 0 && oActive && (
                  <div>
                    <b>{`${sub.ous.count}x `}</b>
                    {t(`product-ous`) + ' 🥚'}
                  </div>
                )}
                {sub.fruita.count > 0 && fActive && (
                  <div>
                    <b>{`${sub.fruita.count}x `}</b>
                    {t(`product-fruita`) + ' 🍇'}
                  </div>
                )}
                {sub.ceba.count > 0 && cActive && (
                  <div>
                    <b>{`${sub.ceba.count}x `}</b>
                    {t(`product-ceba`) + ' 🧅'}
                  </div>
                )}
                <div
                  style={{ textAlign: 'end', marginTop: 'auto' }}
                  className="price"
                >{`${calcPrice(sub)} €`}</div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Calendar
