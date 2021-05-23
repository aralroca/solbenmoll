import useTranslation from 'next-translate/useTranslation'
import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import MapMarkerIcon from './Icons/MapMarker'
import { useOnVisible } from '../helpers/useOnVisible'

const pickUpPoints = [
  {
    name: 'L’anònima del Clot',
    url:
      "https://www.google.es/maps/place/L'An%C3%B2nima/@41.4068338,2.186325,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4a32697b83883:0x4673619a674e27d9!8m2!3d41.4068298!4d2.188519",
    lat: 41.4068338,
    lng: 2.186325,
    color: '#d500f9',
  },
  {
    name: 'Besòs Verd',
    url:
      'https://www.google.es/maps/place/Casal+de+Barri+Bes%C3%B2s/@41.4165089,2.2123414,18z/data=!4m12!1m6!3m5!1s0x12a4a34db9b87d37:0xb729c21a57a48367!2sCentro+C%C3%ADvico+Del+Bes%C3%B3s!8m2!3d41.4164839!4d2.2118151!3m4!1s0x0:0x7c079559c945a1cd!8m2!3d41.4169387!4d2.2146547',
    lat: 41.4165089,
    lng: 2.2123414,
    color: '#d50000',
  },
  {
    name: 'El Guinardó',
    url:
      "https://www.google.es/maps/place/Carrer+d'Escornalbou,+08041+Barcelona/@41.4171165,2.1780044,18.5z/data=!4m5!3m4!1s0x12a4a2d3981428d5:0xa31a99ff3af8906d!8m2!3d41.417633!4d2.1782129",
    lat: 41.4171165,
    lng: 2.1780044,
    color: '#ffb300',
  },
  {
    name: 'Lleialtat Santsenca',
    url:
      'https://www.google.es/maps/place/La+Lleialtat+Santsenca/@41.3728494,2.1344879,17z/data=!3m1!4b1!4m5!3m4!1s0x12a498851477e9bd:0x223f4aa26a87e0c7!8m2!3d41.3728454!4d2.1366819',
    lat: 41.3728494,
    lng: 2.1344879,
    color: '#795548',
  },
  {
    name: 'La Tinta',
    url:
      'https://www.google.es/maps/place/Carrer+de+Vallhonrat,+08004+Barcelona/@41.3744587,2.1551031,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4a264f6492ff3:0x5a45d9d2c11ab49f!8m2!3d41.3744547!4d2.1572971',
    lat: 41.3744587,
    lng: 2.1551031,
    color: '#ec407a',
  },
  {
    name: 'EBM Cobi',
    url:
      'https://www.google.es/maps/place/EBM+COBI/@41.3945197,2.1939881,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4a310df6004b5:0x1b4d5c4cbb2b3e29!8m2!3d41.3945157!4d2.1961821',
    lat: 41.3945197,
    lng: 2.1939881,
    color: 'white',
  },
  {
    name: 'Massa Terra',
    url:
      'https://www.google.es/maps/place/Ateneu+Popular+Octubre+-+Octubre+Casal+Independentista+del+Poblenou/@41.3986029,2.1934851,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4a317bc60221b:0xece221f3868d1f75!8m2!3d41.3985989!4d2.1956791',
    lat: 41.3986029,
    lng: 2.1934851,
    color: '#03a9f4',
  },
  {
    name: 'Pam a map, Sandaru',
    url:
      'https://www.google.es/maps/place/Centro+C%C3%ADvico+Parque+Sandaru/@41.3917794,2.1821836,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4a31d5c2332cd:0xcd77656496609794!8m2!3d41.3917754!4d2.1843776',
    lat: 41.3917794,
    lng: 2.1821836,
    color: '#f4511e',
  },
  {
    name: 'Brusi',
    url:
      'https://www.google.es/maps/place/Carrer+de+Llull,+1,+08005+Barcelona/@41.3910236,2.1861318,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4a31cb0bf32b7:0xb215076d4240ab3c!8m2!3d41.3910196!4d2.1883258',
    lat: 41.3910236,
    lng: 2.1861318,
    color: '#4caf50',
  },
  {
    name: 'ALBA Sincrotró',
    url:
      'https://www.google.es/maps/place/ALBA+Synchrotron/@41.4861363,2.1084765,17z/data=!3m1!4b1!4m5!3m4!1s0x12a496610be3c3e3:0xd13dbb7dfe5aff10!8m2!3d41.4861323!4d2.1106705',
    lat: 41.4861363,
    lng: 2.1084765,
    color: '#fdd835',
  },
  {
    name: 'Sòl Ben Moll',
    url:
      'https://www.google.es/maps/place/S%C3%B2l+Ben+Moll/@41.534382,2.4110102,17z/data=!3m1!4b1!4m5!3m4!1s0x12a4b55cfae4dc25:0x25864840c45f6772!8m2!3d41.534378!4d2.4132042',
    lat: 41.534382,
    lng: 2.4110102,
    color: '#99b67e',
  },
]

const initialState = {
  width: '100%',
  height: 400,
  latitude: 41.4563013,
  longitude: 2.2756336,
  zoom: 9,
}

function PickUpPointsMap() {
  const { t } = useTranslation('common')
  const [isVisible, setVisible] = useState(false)
  const [ref] = useOnVisible('300px 0px', () => setVisible(true))
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [viewport, setViewport] = useState(initialState)
  const isInitialState =
    viewport.latitude === initialState.latitude &&
    viewport.longitude === initialState.longitude

  function onClickPoint(point) {
    setSelectedPoint(point)
    setViewport((v) => ({
      ...v,
      latitude: point.lat,
      longitude: point.lng,
      zoom: 15,
    }))
  }

  function reset() {
    setViewport(initialState)
    setSelectedPoint(null)
  }

  if (!isVisible) {
    return (
      <div
        ref={ref as any}
        style={{
          width: initialState.width,
          height: initialState.height,
          backgroundColor: '#d6d6d6',
        }}
      />
    )
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiYXJhbHJvY2EiLCJhIjoiY2oxYnZuenFxMGFjMzMyb2Q0cWh0eDZzbiJ9.OAduLdejlbF6J9rUfG99pw"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {!isInitialState && (
        <button
          style={{
            position: 'absolute',
            right: 5,
            top: 5,
            zIndex: 999,
            padding: 10,
            backgroundColor: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={reset}
          title={t`home-content.section-4.button`}
        >
          {t`home-content.section-4.button`}
        </button>
      )}
      {pickUpPoints.map((p) => (
        <Marker
          key={p.name}
          latitude={p.lat}
          longitude={p.lng}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <MapMarkerIcon
            color={p.color || 'black'}
            width={40}
            height={40}
            withBorder={p.color === 'white'}
            style={{ cursor: 'pointer' }}
            onClick={() => onClickPoint(p)}
          />
        </Marker>
      ))}
      {selectedPoint && (
        <Popup
          latitude={selectedPoint.lat}
          longitude={selectedPoint.lng}
          closeButton={true}
          closeOnClick={false}
          offsetTop={35}
          onClose={() => setSelectedPoint(null)}
          anchor="top"
        >
          <b>{selectedPoint.name}</b>
          <a
            style={{ fontSize: 12, margin: '0 10px' }}
            href={selectedPoint.url}
            target="_blank"
          >{t`home-content.section-4.open-map`}</a>
        </Popup>
      )}
    </ReactMapGL>
  )
}

export default PickUpPointsMap
