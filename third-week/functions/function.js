import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { FussUSDABI } from "../abi/abi";
import { FusdContractAddress } from "../fusdaddress";


export const getnewprice = async () =>{
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)   
    let FUSDcontract = new ethers.Contract(FusdContractAddress, FussUSDABI, provider);
    let price = await FUSDcontract.getLatestPrice()
    return price;
};
export const depositETH = async (amount) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    let FUSDcontract = new ethers.Contract(FusdContractAddress, FussUSDABI, signer);
    let transaction = await FUSDcontract.depositETH(ethers.utils.parseEther(amount), { value: ethers.utils.parseEther(amount) })
    let price = await transaction.wait()
    return price;
};
export const depositFUSD = async (amount) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    let FUSDcontract = new ethers.Contract(FusdContractAddress, FussUSDABI, signer);
    let transaction = await FUSDcontract.depositFUSD(ethers.utils.parseEther(amount))
    let price = await transaction.wait()
    return price;
}