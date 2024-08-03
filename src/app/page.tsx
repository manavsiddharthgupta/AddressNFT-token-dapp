'use client'
import { ModeToggle } from './components/theme-toggle'
import { toast } from 'sonner'
import { useState } from 'react'
import GenerateNFT, { PrivateKeyDialog } from './components/nft'
import { MapPin } from 'lucide-react'

export type NFTTokenInfo = {
  blockhash: string
  from: string
  to: string
  hashId: string
  lat: number
  lng: number
}

const mapapikey = process.env.NEXT_APP_GOOGLE_API_KEY

export default function Home() {
  const [AllTokensInfo, setTokensInfo] = useState<NFTTokenInfo[]>([])
  const [privateKey, setPrivateKey] = useState<string>()
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    'Statue Of Liberty'
  )
  const [coordinates, setCoordinates] = useState({
    lat: 40.6892,
    lng: -74.0445
  })

  const handleAddressSelect = async (
    address: string,
    lat: number,
    lng: number
  ) => {
    setSelectedAddress(address)
    setCoordinates({ lat, lng })
  }

  const handleLocationDetect = () => {
    if ('geolocation' in navigator) {
      navigator?.geolocation?.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setCoordinates({ lat: latitude, lng: longitude })

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${mapapikey}`
            )
            const data = await response?.json()
            if (data?.results && data?.results?.length > 0) {
              const address = data?.results[0]?.formatted_address
              setSelectedAddress(address)
            }
            toast.success('Address detected successfully.')
          } catch (error) {
            console.error('Error fetching address:', error)
            toast.error('Error fetching address.')
          }
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    } else {
      toast.error('Geolocation is not supported in your browser.')
    }
  }

  const handleTokensInfo = (receipt: NFTTokenInfo) => {
    setTokensInfo((prevData: NFTTokenInfo[]) => {
      return [...prevData, receipt]
    })
  }

  const handlePrivateKey = (val: string | undefined) => {
    setPrivateKey(val)
  }

  return (
    <main className='sm:px-20 px-4 pt-8 max-w-7xl mx-auto'>
      <div className='md:flex flex-row gap-12 my-4'>
        <div className='w-full md:w-[600px] h-fit md:sticky md:top-8'>
          <GenerateNFT
            onAddressSelect={handleAddressSelect}
            onLocationDetect={handleLocationDetect}
            onhandleNftToken={handleTokensInfo}
            address={selectedAddress}
            latitude={coordinates.lat}
            longitude={coordinates.lng}
            walletPrivateKey={privateKey}
          />
        </div>

        <div className='h-fit md:w-[calc(100%-448px)] mt-12 md:mt-0 w-full'>
          <PrivateKeyDialog
            onChangePrivateKey={handlePrivateKey}
            privateKey={privateKey}
          />
          {AllTokensInfo.length > 0 ? (
            <div className='flex flex-col gap-3'>
              {AllTokensInfo.map((reciept, idx) => {
                return (
                  <NFTTokenCard
                    key={idx}
                    blockhash={reciept.blockhash}
                    from={reciept.from}
                    hashId={reciept.hashId}
                    lat={reciept.lat}
                    lng={reciept.lng}
                    to={reciept.to}
                  />
                )
              })}
            </div>
          ) : (
            <p className='text-sm text-muted-foreground text-center'>
              No Generated Token Yet.
            </p>
          )}
        </div>
      </div>
      <div className='w-full h-10 fixed left-1/2 -translate-x-1/2 bottom-0'>
        <div className='flex items-center justify-end h-full mr-4'>
          <ModeToggle />
        </div>
      </div>
    </main>
  )
}

const NFTTokenCard = (info: NFTTokenInfo) => {
  return (
    <div className='block w-full border dark:border-white/10 p-5 rounded-md mb-2 hover:bg-accent hover:text-accent-foreground'>
      <div className='flex gap-3 items-center'>
        <MapPin width={20} />
        <ul className='flex gap-2 items-center'>
          <li className='text-sm'>
            Lat: <span className='text-xs font-light'>{info.lat}</span>
          </li>
          <li className='text-sm'>
            Lng: <span className='text-xs font-light'>{info.lng}</span>{' '}
          </li>
        </ul>
      </div>
      <div className='mt-2 flex flex-col gap-0.5'>
        <p className='truncate text-sm'>
          Blockhash:{' '}
          <span className='text-xs font-light'>{info.blockhash}</span>
        </p>
        <p className='truncate text-sm'>
          TokenId: <span className='text-xs  font-light'>{info.hashId}</span>
        </p>
      </div>
    </div>
  )
}
