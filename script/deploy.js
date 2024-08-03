const hre = require('hardhat')

async function main() {
  // Get the contract to deploy
  const AddressNFT = await hre.ethers.getContractFactory('AddressNFT')
  const addressNFT = await AddressNFT.deploy()

  await addressNFT.waitForDeployment()

  console.log('AddressNFT deployed to:', addressNFT.target)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
