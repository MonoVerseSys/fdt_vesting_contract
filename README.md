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
npx hardhat verify --contract contracts/FdtVestingWallet.sol:FdtVestingWallet 0xc1CAe7EF7c745395c37439aBA152C2ab777EAe0a --constructor-args scripts/FdtVestingWallet/deployParams.js --network bsc


npx hardhat verify  --contract contracts/Presale1Wallet.sol:Presale1Wallet 0x0d36fe76055d8Dd38aDa3eF1AeCa787B846d61ac --network bsc
```

# bulk dopy
shelljs-bulk-deploy.js 를 수정해서 대량 deploy를 한다. block exploerer 인증까지 동시에 완료된다. 




# 1st presale contract address

proxy deploy

storage : 0x4302c1c3b11F7ec8CA918708acF9f01FFb0eCB57
logic : 0xcc0BD36172D3fc52CDbB0c1BcCf412f7385E9818