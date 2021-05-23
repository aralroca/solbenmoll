import products from '../constants/products'

export default function calcPrice(subs) {
  return Object.keys(subs)
    .reduce((t, id) => {
      const product = products[id]
      if (!product) return t

      return t + subs[id].count * product.price
    }, 0)
    .toFixed(2)
}
