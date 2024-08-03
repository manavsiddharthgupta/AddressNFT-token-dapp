'use client'
import React, { useCallback, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Card } from '@/components/ui/card'
import AddressInput from './autocomplete-input'

interface MapProps {
  latitude: number
  longitude: number
  onAddressSelect: (address: string, lat: number, lng: number) => void
  onLocationDetect: () => void
}

const Maps = ({
  latitude,
  longitude,
  onAddressSelect,
  onLocationDetect
}: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map',
    googleMapsApiKey: process.env.NEXT_APP_GOOGLE_API_KEY || '',
    libraries: ['places']
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const center = {
    lat: latitude,
    lng: longitude
  }

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(center)
      map.fitBounds(bounds)
      setMap(map)
    },
    [center]
  )

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  return (
    <>
      {isLoaded ? (
        <>
          <AddressInput
            onAddressSelect={onAddressSelect}
            onLocationDetect={onLocationDetect}
          />
          <Card className='p-2 mt-4 min-h-[417px] dark:border-white/10 h-full'>
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '400px'
              }}
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <Marker position={center} />
            </GoogleMap>
          </Card>
        </>
      ) : (
        <Card className='p-2 mt-4 min-h-[417px] dark:border-white/10 h-full flex justify-center items-center'>
          <p className='text-sm'>Loading...</p>
        </Card>
      )}
    </>
  )
}

export default Maps
