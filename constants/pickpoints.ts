const pickupPoints = [
  {
    name: 'Escola la Mina',
    url: "https://www.google.com/maps/place/Instituto+Escuela+La+Mina+(secundaria)/@41.4153851,2.2192919,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4a3559597be6f:0x3ea753a701756599!8m2!3d41.4153875!4d2.2214768",
    lat: 41.4153851,
    lng: 2.2192919,
    color: '#d500f9',
    id: 'la-mina',
  },
  {
    name: 'Yoga Maresme',
    url: "https://www.google.com/maps/place/Yoga+Maresme+Centre+Hol%C3%ADstic/@41.536099,2.4483745,15z/data=!4m2!3m1!1s0x0:0xfdc87acac63e26d5?sa=X&ved=2ahUKEwiwhPvZn6_4AhVS66QKHbv7BXAQ_BJ6BAhNEAU",
    lat: 41.536099,
    lng: 2.4483745,
    color: '#d500f5',
    id: 'Yoga Maresme',
  },
  {
    name: 'Besòs Verd',
    url: 'https://www.google.es/maps/place/Casal+de+Barri+Bes%C3%B2s/@41.4165089,2.2123414,18z/data=!4m12!1m6!3m5!1s0x12a4a34db9b87d37:0xb729c21a57a48367!2sCentro+C%C3%ADvico+Del+Bes%C3%B3s!8m2!3d41.4164839!4d2.2118151!3m4!1s0x0:0x7c079559c945a1cd!8m2!3d41.4169387!4d2.2146547',
    lat: 41.4165089,
    lng: 2.2123414,
    color: '#d50000',
    id: 'besos-verd',
  },
  {
    name: 'El Guinardó',
    url: "https://www.google.es/maps/place/Carrer+d'Escornalbou,+08041+Barcelona/@41.4171165,2.1780044,18.5z/data=!4m5!3m4!1s0x12a4a2d3981428d5:0xa31a99ff3af8906d!8m2!3d41.417633!4d2.1782129",
    lat: 41.4171165,
    lng: 2.1780044,
    color: '#ffb300',
    id: 'el-guinardo',
  },
  {
    name: 'Premià de Dalt',
    url: 'https://www.google.es/maps/place/Passatge+del+Sant+Crist,+08338+Premi%C3%A0+de+Dalt,+Barcelona/@41.5077203,2.3432835,19z/data=!3m1!4b1!4m5!3m4!1s0x12a4b6d8294913c9:0xf813030c7dc6d33c!8m2!3d41.5077203!4d2.3438307',
    lat: 41.5077203,
    lng: 2.3432835,
    color: '#795548',
    id: 'premia-de-dalt',
  },
  {
    name: 'La Tinta',
    url: 'https://www.google.es/maps/place/Carrer+de+Vallhonrat,+08004+Barcelona/@41.3744587,2.1551031,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4a264f6492ff3:0x5a45d9d2c11ab49f!8m2!3d41.3744547!4d2.1572971',
    lat: 41.3744587,
    lng: 2.1551031,
    color: '#ec407a',
    id: 'la-tinta',
  },
  {
    name: 'Massa Terra',
    url: 'https://www.google.es/maps/place/Ateneu+Popular+Octubre+-+Octubre+Casal+Independentista+del+Poblenou/@41.3986029,2.1934851,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4a317bc60221b:0xece221f3868d1f75!8m2!3d41.3985989!4d2.1956791',
    lat: 41.3986029,
    lng: 2.1934851,
    color: '#03a9f4',
    id: 'massa-terra',
  },
  {
    name: 'Pam a map, Sandaru',
    url: 'https://www.google.es/maps/place/Centro+C%C3%ADvico+Parque+Sandaru/@41.3917794,2.1821836,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4a31d5c2332cd:0xcd77656496609794!8m2!3d41.3917754!4d2.1843776',
    lat: 41.3917794,
    lng: 2.1821836,
    color: '#f4511e',
    id: 'pam-a-map-sandaru',
  },
  {
    name: 'Brusi',
    url: 'https://www.google.es/maps/place/Carrer+de+Llull,+1,+08005+Barcelona/@41.3910236,2.1861318,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4a31cb0bf32b7:0xb215076d4240ab3c!8m2!3d41.3910196!4d2.1883258',
    lat: 41.3910236,
    lng: 2.1861318,
    color: '#4caf50',
    id: 'brusi',
  },
  {
    name: 'ALBA Sincrotró',
    url: 'https://www.google.es/maps/place/ALBA+Synchrotron/@41.4861363,2.1084765,17z/data=!3m1!4b1!4m5!3m4!1s0x12a496610be3c3e3:0xd13dbb7dfe5aff10!8m2!3d41.4861323!4d2.1106705',
    lat: 41.4861363,
    lng: 2.1084765,
    color: '#fdd835',
    id: 'alba-sincrotro',
  },
  {
    name: 'Sòl Ben Moll',
    url: 'https://www.google.es/maps/place/S%C3%B2l+Ben+Moll/@41.534382,2.4110102,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4b55cfae4dc25:0x25864840c45f6772!8m2!3d41.534378!4d2.4132042',
    lat: 41.534382,
    lng: 2.4110102,
    color: '#99b67e',
    id: 'sol-ben-moll',
  },
  {
    name: 'Mataró',
    url: 'https://www.google.es/maps/place/Carrer+Josep+Sabater+i+Sust,+28,+08301+Matar%C3%B3,+Barcelona/@41.5438075,2.4495491,18.06z/data=!4m13!1m7!3m6!1s0x12a4b525440f4397:0x52b56635d32bd905!2sCarrer+Josep+Sabater+i+Sust,+08301+Matar%C3%B3,+Barcelona!3b1!8m2!3d41.5446378!4d2.4494801!3m4!1s0x12a4b5254317db27:0xc63d45201762fafa!8m2!3d41.5441893!4d2.4498496',
    lat: 41.5438075,
    lng: 2.4495491,
    color: '#A7F89F',
    id: 'mataro',
  },
]

export const pickUpPointsAsObj = pickupPoints.reduce((t, p) => {
  t[p.id] = p
  return t
}, {})

export default pickupPoints
