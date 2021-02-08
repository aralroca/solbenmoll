import styles from './SelectButton.module.scss'

function SelectButton({ price, onChange }) {
  const options = [
    { label: `Setmanal (${price}€ cada setmana)`, value: '1' },
    { label: `Quinzenal (${price}€ cada 15 dies)`, value: '2' },
    { label: `Mensual (${price}€ cada mes)`, value: '4' },
  ]

  return (
    <select className={styles.selectButton} onChange={onChange}>
      <option>Subscriure</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default SelectButton
