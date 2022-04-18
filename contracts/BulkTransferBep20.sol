// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";


contract BulkTransferBep20 is Context {

    function multipleTransfer(address token, address from, address[] memory receivers, uint256[] memory amounts) public {
        require(receivers.length == amounts.length, "invalid params");
        for (uint i = 0; i < receivers.length; i++) {
            address to = receivers[i];
            uint256 amount = amounts[i];
            SafeERC20.safeTransferFrom(IERC20(token), from, to, amount);
        }
    }
}