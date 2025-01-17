# Geolocation Map NFT Project

This project is a web application that combines geolocation data with NFT (Non-Fungible Token) generation. It displays maps, location information, and allows users to create NFTs without requiring wallet extensions like MetaMask. The project is built with Next.js, Ethers.js, React Google Maps API, and Shadcn UI components.

## How this dapp create NFT tokens without using any wallet extension

This dapp implements a unique approach to creating NFT tokens without requiring users to have a wallet extension like MetaMask. Here's how it works:

**Ethers.js Wallet**: We use Ethers.js to manage a wallet using private key on app itself. This wallet is used to interact with the Ethereum blockchain on behalf of the user.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building web applications
- [Ethers.js](https://docs.ethers.org/v5/) - Library for interacting with the Ethereum blockchain
- [React Google Maps API](https://react-google-maps-api-docs.netlify.app/) - React components for Google Maps
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- Smart contract has been deployed on the Sepolia testnet. [View Contract](https://sepolia.etherscan.io/address/0x8B1Fe6e79545710832ba88F6236e4A8B8F7FE30e)

## Features

- Display maps using Google Maps API
- Generate NFT tokens based on geolocation data
- Interact with Ethereum blockchain using Ethers.js without wallet extensions
- Modern and responsive UI using Shadcn components

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- Google Maps API key
- Ethereum node provider (Alchemy)

## Usage

1. Navigate to a location on the map or enter coordinates.
2. Get your private key. checkout [here](https://support.metamask.io/managing-my-wallet/secret-recovery-phrase-and-private-keys/how-to-export-an-accounts-private-key/#:~:text=On%20the%20'Account%20details'%20page,private%20key%20to%20your%20clipboard.).
3. Click `Open & Save private key` key Button and paste the key, Don't worry we do not save your private key anywhere.
3. Click on the "Generate NFT" button to create an NFT based on the current location.
4. Confirm the transaction in the application interface.
5. You can confirm the transaction from [here](https://sepolia.etherscan.io/) by copying and pasting your token/tnx ID in Sepolia Testnet Explorer.
5. Once confirmed, your NFT will be minted and associated with the chosen location.

## Smart Contract

The project includes a custom smart contract for generating NFT tokens without requiring users to have a wallet extension. This contract handles:

- Minting of NFTs based on geolocation data
- Association of NFTs with specific coordinates
- Management of NFT ownership and transfers

To interact with the contract:

1. Deploy the contract to your Ethereum (Sepolia network).
2. Update the `NEXT_PUBLIC_CONTRACT_ADDRESS` in your `.env` file with the deployed contract address.
3. Use the provided functions in the frontend to interact with the contract through Ethers.js.
