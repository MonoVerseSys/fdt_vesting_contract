// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/**
 * @title Fruttidino Team - vesting wallet
 * @author Ho Dong Kim
 * @dev 
 */
contract Presale1Wallet is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    event ERC20Released(address indexed user, uint256 amount);
    struct VestingInfo {
        uint256 allocation;
        uint256 released;
    }

    address private _tokenAddress;
    uint64 private _start;
    uint64 private _duration;

    mapping(address => VestingInfo) private _vestingInfo;
    function initialize(address __tokenAddaress, uint64 __start, uint64 __duration) public initializer {
        __Ownable_init();
        __ReentrancyGuard_init();
        _tokenAddress = __tokenAddaress;
        _start = __start;
        _duration = __duration;
    }

    function tokenAddress() public view returns (address) {
        return _tokenAddress;
    }

    function start() public view returns (uint64) {
        return _start;
    }

    function duration() public view returns (uint64) {
        return _duration;
    }

    function getVestingInfo(address user) public view returns (VestingInfo memory) {
        VestingInfo memory vestringInfo = _vestingInfo[user];
        return vestringInfo;
    }

    function addAllocation(address[] memory users, uint256[] memory allocations) public onlyOwner {
        require(users.length == allocations.length, "err1");
        for(uint i = 0; i < users.length; i++) {
            _vestingInfo[users[i]] = VestingInfo(allocations[i], 0);
        }
    }

    function release(address user) public nonReentrant {
        VestingInfo storage vestingInfo = _vestingInfo[user];
        require(vestingInfo.allocation > 0, "Does not exist");
        uint64 time = uint64(block.timestamp);
        uint256 releasable = vestedAmount(user, time) - vestingInfo.released;
        require(releasable > 0, "err1");
        uint256 balance = contractBalance();
        require(balance >= releasable, "err2");
        vestingInfo.released += releasable;

        emit ERC20Released(user, releasable);
        SafeERC20Upgradeable.safeTransfer(IERC20Upgradeable(tokenAddress()), user, releasable);
    }

    function contractBalance() public view returns(uint256) {
        return IERC20Upgradeable(tokenAddress()).balanceOf(address(this));
    }


    function vestedAmount(address user,uint64 timestamp) public view returns (uint256) {
        return _vestingSchedule(user, timestamp);
    }

    function _vestingSchedule(address user, uint64 timestamp) internal view returns (uint256) {
        VestingInfo memory vestingInfo = _vestingInfo[user];
        if(timestamp < start()) {
            return 0;
        } else if(timestamp > start() + duration()) {
            return vestingInfo.allocation;
        } else {
            return (vestingInfo.allocation * (timestamp - start())) / duration();
        }
    }

    function withdrawalToken(address to) public onlyOwner {
        uint256 amount = contractBalance();
        SafeERC20Upgradeable.safeTransfer(IERC20Upgradeable(tokenAddress()), to, amount);
    }

}