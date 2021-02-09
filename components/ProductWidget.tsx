import Image from 'next/image'
import Link from 'next/link'
import SelectButton from './SelectButton'

import styles from './ProductWidget.module.scss'
import { useState } from 'react'

function ProductWidget({ link, image, menuName, name, price }) {
  const [value, setValue] = useState('') // @todo

  return (
    <div className={styles.productWidget}>
      <Link href={link}>
        <a className="product-image-link">
          <Image
            alt={name}
            src={image}
            placeholder="blur"
            layout="intrinsic"
            className="product-image"
            loading="lazy"
            height={375}
            width={500}
          />
        </a>
      </Link>
      <h2>
        <Link href={link}>
          <a>{menuName}</a>
        </Link>
      </h2>
      <div className={styles.name}>{name}</div>
      <div className={styles.price}>{price} €</div>
      <SelectButton
        price={price}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default ProductWidget
