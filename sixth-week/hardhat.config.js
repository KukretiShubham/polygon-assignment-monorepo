require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks: {
    hardhat: {},
      Goreli: {
         url: "https://eth-goerli.g.alchemy.com/v2/8c_tuCfWlSaue04-uZdnMHMTAQnWP3VQ",
         accounts: [`0x0aef4280396f60a8a128880aff45aaebc4c2722cee7096570dcb31fc5e11066d`]
      }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "T89UP7JK3ZEM268ZA433IF1YHGUG2U4SHY"
  }
};
