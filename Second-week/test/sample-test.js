const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test", function () {
  it("Testing deadman switch", async function () {
    const [owner, heir] = await ethers.getSigners()
    const Deadmanswitch = await ethers.getContractFactory("Deadmanswitch");
    const deadmanswitch = await Deadmanswitch.deploy(heir.address);
    await deadmanswitch.deployed();


    const isalive = await deadmanswitch.isAlive();
    console.log("Check status after deployment",isalive);
    // adding balance to contract
    // since we are adding some funds to the contract
    // this is causing a state change and hence increases a block

    await owner.sendTransaction({
      to: deadmanswitch.address,
      value: ethers.utils.parseEther("2.0"), // Sends exactly 1.0 ether
      gasLimit: 200000 // Gas limit
    });

    // checking balance of contract address
    const balance = await deadmanswitch.provider.getBalance(deadmanswitch.address)
    console.log("Balance of Contract address => ", balance);
    const balanceOfHeir = await deadmanswitch.provider.getBalance(heir.address)
    console.log("Balance of Heir address => ", balanceOfHeir);


    // mining blocks
    await hre.network.provider.send("hardhat_mine", ["0x7"]);
    await deadmanswitch.connect(owner).still_alive();
    const isalive2 = await deadmanswitch.isAlive();
    console.log("checking => ",isalive2);
    const balance2 = await deadmanswitch.provider.getBalance(deadmanswitch.address)
    console.log("Balance of Contract address => ", balance2);
    //  
    await hre.network.provider.send("hardhat_mine", ["0x8"]);
    await deadmanswitch.connect(owner).still_alive();
    const isalive3 = await deadmanswitch.isAlive();
    console.log(isalive3);
    const balance3 = await deadmanswitch.provider.getBalance(deadmanswitch.address)
    console.log("Balance of Contract address => ", balance3);
  });
});
