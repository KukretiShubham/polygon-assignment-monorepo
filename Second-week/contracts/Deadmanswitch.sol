//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;
contract Deadmanswitch {
    address owner;
    address payable heir;
    uint lastBlock;
    constructor(address payable _heir){
        owner = msg.sender;
        heir = _heir;
        lastBlock = block.number;
    }
    event Received(address, uint);
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
    modifier onlyOwner()
    {
        require(msg.sender == owner);
        _;
    }
    function isAlive() public view returns(bool){
        return (lastBlock + 10 >= block.number);
    }
    function itsdead() public {
        require(isAlive() == false,"ehh its not dead yet");
        heir.transfer(address(this).balance);
    }
    function still_alive() public onlyOwner
    {
        if(isAlive())
        {
            lastBlock = block.number;
        }
        else{
            heir.transfer(address(this).balance);
        }
    }

}
