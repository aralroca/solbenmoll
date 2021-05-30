import useTranslation from 'next-translate/useTranslation'
import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

import MapMarkerIcon from './Icons/MapMarker'
import pickUpPoints from '../constants/pickpoints'
import { useOnVisible } from '../helpers/useOnVisible'

const initialState = {
  width: '100%',
  height: 400,
  latitude: 41.4563013,
  longitude: 2.2756336,
  zoom: 9,
}

function PickUpPointsMap({ point = null, onChangePoint = (p) => {} }) {
  const { t } = useTranslation('common')
  const [isVisible, setVisible] = useState(false)
  const [ref] = useOnVisible('300px 0px', () => setVisible(true))
  const [selectedPoint, setSelectedPoint] = useState(point)
  const [viewport, setViewport] = useState(initialState)
  const isInitialState =
    viewport.latitude === initialState.latitude &&
    viewport.longitude === initialState.longitude

  function onClickPoint(p) {
    onChangePoint(p)
    onSavePoint(p)
  }

  function onSavePoint(p) {
    setSelectedPoint(p)
    setViewport((v) => ({
      ...v,
      latitude: p.lat,
      longitude: p.lng,
      zoom: 15,
    }))
  }

  function reset() {
    setViewport(initialState)
    setSelectedPoint(null)
  }

  useEffect(() => point && onSavePoint(point), [point])

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
