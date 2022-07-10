import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { ABI } from "../abi/abi";
import { ContractAddress } from "../address";


export const postToparrot = async (uri) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    let contract = new ethers.Contract(ContractAddress, ABI, signer);
    let transaction = await contract.makepost(uri);
    let recipt = await transaction.wait()
    return recipt;
};

export const getpost = async () =>{
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)   
    let contract = new ethers.Contract(ContractAddress, ABI, provider);
    let data = await contract.fetchPost()
    return data;
};