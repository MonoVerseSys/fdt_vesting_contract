# 계정 잔액 조회
```
npx hardhat accounts --network bsctest
```
# deploy
```
1. scripts/FdtVestingWallet/deployParams.js 수정
2. npx hardhat run scripts/FdtVestingWallet/deploy.js --network bsctest
```
# verify
```
npx hardhat verify --contract contracts/FdtVestingWallet.sol:FdtVestingWallet 0x0 --constructor-args scripts/FdtVestingWallet/deployParams.js --network bsctest
```

