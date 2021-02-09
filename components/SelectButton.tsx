import styles from './SelectButton.module.scss'

function SelectButton({ value, price, onChange }) {
  const classes = [styles.selectButton]
  const options = [
    { label: `Setmanal (${price}€ cada setmana)`, value: '1' },
    { label: `Quinzenal (${price}€ cada 15 dies)`, value: '2' },
    { label: `Mensual (${price}€ cada mes)`, value: '4' },
  ]

  if (value) classes.push(styles.selected)

  return (
    <select value={value} className={classes.join(' ')} onChange={onChange}>
      <option>{value ? 'Ja no vull rebre més' : 'Subscriure'}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default SelectButton
