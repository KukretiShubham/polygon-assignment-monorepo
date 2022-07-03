// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "third-week/node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "third-week/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "third-week/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "third-week/node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Vault is ERC20, ERC20Burnable, Ownable {
    AggregatorV3Interface internal priceFeed;
    event DepositedEth(address indexed sender, uint256 amount);
    constructor() ERC20("Fuss USD", "FUSD") {
        priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    }
    
    function getLatestPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    function depositETH(uint256 _amount) public payable {
        require(msg.value == _amount,"amount not match");
        uint256 usd = ((uint256(getLatestPrice() / 10 ** 8)) * _amount);
        _mint(msg.sender, usd);
        emit DepositedEth(msg.sender, msg.value);
    }
    function depositFUSD(uint256 _amount) public payable{
        address payable from = payable(msg.sender);
        _burn(from, _amount);
        uint256 eth = (_amount/(uint256(getLatestPrice() / 10 ** 8)));
        from.transfer(eth);
    }
}