module.exports = {
  locales: ['ca', 'es'],
  defaultLocale: 'ca',
  pages: {
    '*': ['common'],
  },
  loadLocaleFrom: (lang) =>
    import(`./translations/${lang}.json`).then((m) => m.default),
}
