# 계정 잔액 조회
```
npx hardhat accounts --network bsctest
```
# deploy
```
1. scripts/FdtVestingWallet/deployParams.js 수정
2. npx hardhat run scripts/FdtVestingWallet/deploy.js --network bsc 
```
# verify
```
npx hardhat verify --contract contracts/FdtVestingWallet.sol:FdtVestingWallet 0x294050EbAa3BF95158eD3F96ed692ca10C2e6A4d --constructor-args scripts/FdtVestingWallet/deployParams.js --network bsc


npx hardhat verify --contract contracts/Presale1Wallet.sol:Presale1Wallet 0xd0cfe136fe9f93d67270baeb451772532ae986de --network bsctest
```