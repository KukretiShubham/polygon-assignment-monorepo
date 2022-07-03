import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getnewprice, depositETH, depositFUSD, connectWallet } from "../functions/function"
export default function Home() {
  useEffect(() => {
    fetchprice()
  }, [])
  const [ethInput, updateethInput] = useState({ price: ''})
  const [fusdInput, updatefusdInput] = useState({ price: ''})
  const [conversionprice, updateconversionprice] = useState({ price: ''})
  const router = useRouter()
  const fetchprice = async () => {
    const receipt = await getnewprice();
    console.log(receipt);
    updateconversionprice({ price: receipt.toNumber()/100000000})
  };
  const depoisteth = async () => {
    const receipt = await depositETH(ethInput.price);
    console.log(receipt);
    router.push('/')
  }
  const depoistfusd = async () => {
    const receipt = await depositFUSD(fusdInput.price);
    console.log(receipt);
    router.push('/')
  }
  const connect = async () => {
    connectWallet();
  }
  return (  
  <div className="bg-gradient-to-r from-gray-100 to-gray-300">
        {/* Navbar */}
        <div className="w-full container mx-auto">
          <div className="w-full flex items-center justify-between">
            <a className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
              Loner<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">$Brew</span>
            </a>

            <div className="flex w-1/2 justify-end content-center">
              <button onClick={connect} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold mt-0.5 text-white rounded p-2 shadow-lg">Connect Wallet</button>
            </div>
          </div>
        </div>
        {/* Main body */}
      <div className="flex flex-col items-center"> Deployed on Rinkeby Testnet
      <p>Current ETH price <a className="underline">{conversionprice.price}</a> $FUSD</p>
      <p>
        $FUSD is a stablecoin that is pegged to the USD price. 
      </p>
      <p> It is a decentralized stablecoin that is backed by the Ethereum blockchain. </p>
      </div>
      <div className="flex justify-center h-screen my-auto items-center ">
        <div className="w-1/3 flex flex-col pb-4">
          <input
            placeholder="Amount"
            className=" mt-8 border rounded p-4"
            onChange={e => updateethInput({ ...ethInput, price: e.target.value })}
          />
          <button onClick={depoisteth} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold mt-4 text-white rounded p-4 shadow-lg">
            Deposit $ETH
          </button>
          <input 
            placeholder="Amount"
            className="mt-10 border rounded p-4"
            onChange={e => updatefusdInput({ ...fusdInput, price: e.target.value })}
          />

          <button onClick={depoistfusd} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold mt-4 text-white rounded p-4 shadow-lg">
            Deposit $FUSD
          </button>
          <div className="flex justify-center my-auto items-center p-4">Made with _❤️ 
            <a href="https://twitter.com/ShubhamKukretii"> _by Shubham
            </a>
          </div>
        </div>
      </div>
  </div> 
  )
}
