// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Shubham is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor() ERC721("Fake Ape", "FAPE") {}


    function createToken(string memory tokenURI) public returns (uint) {
        require(_tokenIds.current() < 3000, "ERC721: total supply reached");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
    function modifyNFTURI(uint _id, string memory tokenURI) public onlyOwner {
        _setTokenURI(_id, tokenURI);
    }

}