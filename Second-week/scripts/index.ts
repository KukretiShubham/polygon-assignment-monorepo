
const { POSClient, use } = require('@maticnetwork/maticjs');
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-ethers');
import { ethers } from "ethers";

use(Web3ClientPlugin);

const mumbaiApi = <mumbaitestnetRPC>;
const goerliApi = "http://127.0.0.1:8545"; // from local geth node
const privateKey = <Private Key>;
const seed = <seed phrase>
use(Web3ClientPlugin);

const from = "0x88EF51355B34f7Bb4874a731916841702cAeF2C7";
const rootToken = "0x6bE2001f85a770Ac5b3949dEcCCEA90ee850d713"; 
const childToken = "0x6be2001f85a770ac5b3949decccea90ee850d713"
const amount = 400 * (10 ** 18);

const parentProvider = new ethers.providers.JsonRpcProvider(goerliApi); 
const maticProvider = new ethers.providers.JsonRpcProvider(mumbaiApi); 

const posClient = new POSClient();

(async () => {
  await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new ethers.Wallet(privateKey, parentProvider),
      defaultConfig: {
        from : from
      }
    },
    child: {
      provider: new ethers.Wallet(privateKey, maticProvider),
      defaultConfig: {
        from : from
      }
    }
  });

  const parentERC20Token = posClient.erc20(rootToken, true);
  const childERC20Token = posClient.erc20(childToken, true);

  try{
    const approveResult = await parentERC20Token.approve(amount.toString(), {from});
    const approveTxHash = await approveResult.getTransactionHash();
    const approveTxReceipt = await approveResult.getReceipt();

    const depositResult = await parentERC20Token.deposit(amount.toString(), from, {from});
    const depositTxHash = await depositResult.getTransactionHash();
    const depositTxReceipt = await depositResult.getReceipt();

  }
  catch(err){
    console.log(err);
  }

})();