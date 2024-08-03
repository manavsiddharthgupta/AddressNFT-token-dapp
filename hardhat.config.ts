require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL =
  'https://eth-sepolia.g.alchemy.com/v2/OuI74icMNPMP9vS70HFOaWeh2VKTDNy7'
const PRIVATE_KEY =
  '580ea237b854abe330570c16d4a1fcf2c7ae38f314897f911f5a52014c9264ce'
module.exports = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY]
    }
  }
}
