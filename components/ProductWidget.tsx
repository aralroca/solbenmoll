import Image from 'next/image'
import Link from 'next/link'
import SelectButton from './SelectButton'

import styles from './ProductWidget.module.scss'

function ProductWidget({ link, image, menuName, name, price }) {
  return (
    <div className={styles.productWidget}>
      <Link href={link}>
        <a>
          <Image
            alt={name}
            src={image}
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
        onChange={(e) => console.log('onChange', e.target.value)}
      />
    </div>
  )
}

export default ProductWidget
