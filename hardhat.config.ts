require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL = process.env.NEXT_APP_SEPOLIA_URL
const PRIVATE_KEY = process.env.NEXT_APP_PRIVATE_KEY
module.exports = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY]
    }
  }
}
