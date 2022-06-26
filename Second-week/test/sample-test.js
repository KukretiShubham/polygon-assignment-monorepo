const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test", function () {
  it("Testing deadman switch", async function () {
    const [owner, heir] = await ethers.getSigners()
    const Deadmanswitch = await ethers.getContractFactory("Deadmanswitch");
    const deadmanswitch = await Deadmanswitch.deploy(heir.address);
    await deadmanswitch.deployed();
    const isalive = await deadmanswitch.isAlive();
    console.log("Status after deployment => ",isalive);
    // adding balance to contract
    await owner.sendTransaction({
      to: deadmanswitch.address,
      value: ethers.utils.parseEther("2.0"), // Sends exactly 1.0 ether
      gasLimit: 200000 // Gas limit
    });

    // checking balance of contract address
    const balance = await deadmanswitch.provider.getBalance(deadmanswitch.address)
    console.log("\nInitial balance of Contract address => ", balance/10 ** 18);
    const balanceOfHeir = await deadmanswitch.provider.getBalance(heir.address)
    console.log("Initial balance of Heir address => ", balanceOfHeir/10 ** 18);

    // block 1 mined here 
    await deadmanswitch.connect(owner).still_alive();

    // mining 9 blocks
    await hre.network.provider.send("hardhat_mine", ["0x9"]);
    

    const isalive2 = await deadmanswitch.isAlive();
    console.log("\nStatus after 10 blocks mined => ",isalive2);
    
    // after marking presence again total blocks mined = 10
    await deadmanswitch.connect(owner).still_alive();

    // checking balance of contract address and heir
    const balance2 = await deadmanswitch.provider.getBalance(deadmanswitch.address)
    console.log("Balance of Contract address at block 10 => ", balance2/10 ** 18);
    const balanceOfHeir2 = await deadmanswitch.provider.getBalance(heir.address)
    console.log("Balance of Heir address at block 10 => ", balanceOfHeir2/10 ** 18);
    
    // Mining more than 10 blocks 
    await hre.network.provider.send("hardhat_mine", ["0xb"]);

    // try to mark presence again
    await deadmanswitch.connect(owner).still_alive();
    const isalive3 = await deadmanswitch.isAlive();
    console.log("\nStatus after more than 10 blocks mined => ",isalive3);
    const balance3 = await deadmanswitch.provider.getBalance(deadmanswitch.address)
    console.log("Balance of Contract address after more than 10 blocks => ", balance3/10 ** 18);
    const balanceOfHeir3 = await deadmanswitch.provider.getBalance(heir.address)
    console.log("Balance of Heir address after more than 10 blocks => ", balanceOfHeir3/10 ** 18);
  });
});
