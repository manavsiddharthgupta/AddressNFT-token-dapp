import Maps from '@/app/components/map'
import { Button } from '@/app/components/ui/button'
import { ethers } from 'ethers'
import nftAbi from '../../../ABI.json'
import { toast } from 'sonner'
import { useState } from 'react'
import { EyeIcon, EyeOffIcon, Loader } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { NFTTokenInfo } from '../page'

interface MapProps {
  latitude: number
  longitude: number
  address: string | undefined
  walletPrivateKey: string | undefined
  onhandleNftToken: (reciept: NFTTokenInfo) => void
  onAddressSelect: (address: string, lat: number, lng: number) => void
  onLocationDetect: () => void
}

const contractAddress = '0x8B1Fe6e79545710832ba88F6236e4A8B8F7FE30e'

const providerUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8545/'
    : 'https://eth-sepolia.g.alchemy.com/v2/OuI74icMNPMP9vS70HFOaWeh2VKTDNy7'

const provider = new ethers.JsonRpcProvider(providerUrl)

const GenerateNFT = ({
  walletPrivateKey,
  latitude,
  longitude,
  address,
  onhandleNftToken,
  onAddressSelect,
  onLocationDetect
}: MapProps) => {
  const [isGenerating, setStatus] = useState(false)
  const handlegenerateNFT = async () => {
    if (!address) {
      toast.info('Please select an address to generate NFT.')
      return
    }
    if (!walletPrivateKey) {
      toast.info('Please give your private key.')
      return
    }

    setStatus(true)
    const latInt = Math.floor(latitude * 1e6)
    const lonInt = Math.floor(longitude * 1e6)
    try {
      const wallet = new ethers.Wallet(walletPrivateKey, provider)
      const contract = new ethers.Contract(contractAddress, nftAbi, wallet)
      const transaction = await contract.mintNFT(
        wallet.address,
        address,
        latInt,
        lonInt
      )
      const receipt = await transaction.wait()
      onhandleNftToken({
        blockhash: receipt.blockHash,
        from: receipt.from,
        to: receipt.to,
        hashId: receipt.hash,
        lat: latitude,
        lng: longitude
      })
      setStatus(false)
      toast.success(
        'Your NFT token has been created for lat: ' +
          latitude +
          ' & lng: ' +
          longitude +
          '.',
        {
          description: 'Hash-id: ' + receipt.hash
        }
      )
    } catch (err) {
      setStatus(false)
      toast.error(`${err}`)
    }
  }

  return (
    <>
      <Maps
        onAddressSelect={onAddressSelect}
        onLocationDetect={onLocationDetect}
        latitude={latitude}
        longitude={longitude}
      />
      <Button
        className='w-full mt-4'
        disabled={isGenerating}
        onClick={handlegenerateNFT}
      >
        {isGenerating && <Loader size={18} className='animate-spin mr-1.5' />}
        Generate NFT
      </Button>
    </>
  )
}

export default GenerateNFT

export const PrivateKeyDialog = ({
  privateKey,
  onChangePrivateKey
}: {
  privateKey: string | undefined
  onChangePrivateKey: (val: string | undefined) => void
}) => {
  const [showPassword, setShow] = useState(false)
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='w-full mb-8' variant='outline'>
          Open & Save Your Private Key
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-[425px] dark:border-white/10'>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter Private Key</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter your private key to proceed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='space-y-4 py-4'>
          <div className='relative'>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={privateKey}
              placeholder='Enter private key'
              onChange={(e) => {
                onChangePrivateKey(e.target.value)
              }}
              id='password'
              className='pr-10 w-full'
            />
            <Button
              onClick={() => {
                setShow(!showPassword)
              }}
              variant='ghost'
              size='icon'
              className='absolute top-1/2 right-0 -translate-y-1/2'
            >
              {!showPassword ? (
                <EyeIcon className='w-5 h-5' />
              ) : (
                <EyeOffIcon className='w-5 h-5' />
              )}
              <span className='sr-only'>Toggle password visibility</span>
            </Button>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button>Done</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
