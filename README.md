# Geolocation Map NFT Project

This project is a web application that combines geolocation data with NFT (Non-Fungible Token) generation. It displays maps, location information, and allows users to create NFTs without requiring wallet extensions like MetaMask. The project is built with Next.js, Ethers.js, React Google Maps API, and Shadcn UI components.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building web applications
- [Ethers.js](https://docs.ethers.org/v5/) - Library for interacting with the Ethereum blockchain
- [React Google Maps API](https://react-google-maps-api-docs.netlify.app/) - React components for Google Maps
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- Custom Smart Contract - For generating NFT tokens without wallet extensions

## Features

- Display maps using Google Maps API
- Generate NFT tokens based on geolocation data
- Interact with Ethereum blockchain using Ethers.js without wallet extensions
- Modern and responsive UI using Shadcn components
- Server-side rendering and static site generation with Next.js

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- Google Maps API key
- Ethereum node provider (Alchemy)

## Usage

1. Navigate to a location on the map or enter coordinates.
2. Click on the "Generate NFT" button to create an NFT based on the current location.
3. Confirm the transaction in the application interface.
4. Once confirmed, your NFT will be minted and associated with the chosen location.

## Smart Contract

The project includes a custom smart contract for generating NFT tokens without requiring users to have a wallet extension. This contract handles:

- Minting of NFTs based on geolocation data
- Association of NFTs with specific coordinates
- Management of NFT ownership and transfers

To interact with the contract:

1. Deploy the contract to your chosen Ethereum network (Sepolia Testnet network).
2. Update the `NEXT_PUBLIC_CONTRACT_ADDRESS` in your `.env` file with the deployed contract address.
3. Use the provided functions in the frontend to interact with the contract through Ethers.js.
