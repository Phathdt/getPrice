import express, { json } from 'express'
import cors from 'cors'
import { ethers, JsonRpcProvider } from 'ethers'
import fs from 'fs'

const filePath = './erc20.json'
const ERC20ABI = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

// const app = express()
// app.use(cors())
// app.use(json())

// app.get('/', (req, res) => {
//   const { param1 } = req.query

//   res.send('Hello World!<br>Param1 = ' + param1)
// })

// app.listen(3000, () => {
//   console.log('Listening on port 3000!')
// })

async function getEthBalance(address) {
  // Connect to the Ethereum network using a provider
  const provider = new JsonRpcProvider(
    'https://ethereum-holesky.publicnode.com'
  )

  try {
    // Get the balance of the specified address
    const balanceWei = await provider.getBalance(address)

    // Convert balance from Wei to Ether
    const balanceEther = ethers.formatEther(balanceWei)

    console.log(`Balance of ${address}: ${balanceEther} ETH`)

    const contact = new ethers.Contract(
      '0x7d773Af3d29743442Dc991c168C434D99836A723',
      ERC20ABI,
      provider
    )
    const balance = await contact.balanceOf(address)
    console.log(`Balance of ${address}: ${balance} USDT`)

    const formatBalance = ethers.formatEther(balance)
    console.log(`Balance of ${address}: ${formatBalance} USDT`)

    return formatBalance
  } catch (error) {
    console.error('Error getting balance:', error)
    throw error
  }
}

// Replace 'YOUR_ETHEREUM_ADDRESS' with the Ethereum address you want to check
const ethereumAddress = '0x3EfE62Ce469b4A97111f4E8Fa3F896406c25c204'

getEthBalance(ethereumAddress)
