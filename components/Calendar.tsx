import useTranslation from 'next-translate/useTranslation'
import calcPrice from '../helpers/calcPrice'
import getDaySubscription from '../helpers/getDaySubscription'
import getWeeks from '../helpers/getWeeks'
import styles from './Calendar.module.scss'

const defaultSubs = {
  ceba: {},
  fruita: {},
  gran: {},
  mitjana: {},
  ous: {},
  petita: {},
  weekExceptions: {},
}

function Calendar({
  subscription = defaultSubs,
  onClickSubscription = (v) => { },
  ...props
}) {
  const { t, lang } = useTranslation('common')
  const weeks = getWeeks(lang)
  const exceptions = subscription.weekExceptions || {}
  const border = '2px solid #89a37144'

  return (
    <>
      <div className={styles.calendar} {...props}>
        {weeks.map((week) => {
          const [sub, active] = getDaySubscription(
            exceptions[week.id] || subscription,
            week.weekIndex
          )

          return (
            <div
              key={week.id}
              title={t`edit`}
              onClick={() => {
                if (!week.isEditable) return alert(t`closed-order`)
                onClickSubscription({ ...sub, week })
              }}
              className={`${styles.day} ${active ? styles.active : ''}`}
            >
              {active ? (
                <b
                  style={{
                    marginBottom: 15,
                    borderBottom: border,
                    color: '#89a371',
                  }}
                >
                  {week.name}
                </b>
              ) : (
                week.name
              )}
              {active && (
                <>
                  {sub.petita?.count > 0 && (
                    <div>
                      <b>{`${sub.petita.count}x `}</b>
                      {t(`product-petita`) + ' 🥑'}
                    </div>
                  )}
                  {sub.mitjana?.count > 0 && (
                    <div>
                      <b>{`${sub.mitjana.count}x `}</b>
                      {t(`product-mitjana`) + ' 🥦'}
                    </div>
                  )}
                  {sub.gran?.count > 0 && (
                    <div>
                      <b>{`${sub.gran.count}x `}</b>
                      {t(`product-gran`) + ' 🥬'}
                    </div>
                  )}
                  {sub.ous?.count > 0 && (
                    <div>
                      <b>{`${sub.ous.count}x `}</b>
                      {t(`product-ous`) + ' 🥚'}
                    </div>
                  )}
                  {sub.fruita?.count > 0 && (
                    <div>
                      <b>{`${sub.fruita.count}x `}</b>
                      {t(`product-fruita`) + ' 🍇'}
                    </div>
                  )}
                  {sub.ceba?.count > 0 && (
                    <div>
                      <b>{`${sub.ceba.count}x `}</b>
                      {t(`product-ceba`) + ' 🧅'}
                    </div>
                  )}
                  <div
                    style={{
                      textAlign: 'end',
                      marginTop: 'auto',
                      borderTop: border,
                    }}
                    className="price"
                  >{`${calcPrice(sub)} €`}</div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Calendar
