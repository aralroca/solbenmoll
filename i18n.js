module.exports = {
  locales: ['ca', 'es'],
  defaultLocale: 'ca',
  pages: {
    '*': ['common'],
    '/': ['home', 'my-baskets'],
    '/subscripcio': ['my-baskets'],
    '/producte/[[...productId]]': ['my-baskets'],
    '/contacte': ['contact'],
  },
}
