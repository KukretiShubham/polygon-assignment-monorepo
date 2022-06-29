const { ethers } = require('ethers')



const { abi: UniswapV3Factory } = require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json')
require('dotenv').config()

const RPC_URL = <mumbai-test-net>

const address0 = '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F'
const address1 = '0x6bE2001f85a770Ac5b3949dEcCCEA90ee850d713'
const factoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

  const factoryContract = new ethers.Contract(
    factoryAddress,
    UniswapV3Factory,
    provider
  )

  const poolAddress = await factoryContract.getPool(address0, address1, 10000)
  console.log('poolAddress', poolAddress)

}

main()