require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// const { test: mnemonic, scanApiKey } = process.env;
const { mnemonic, scanApiKey } = process.env;
task("transfer", "transfer coin", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  const txObj = await accounts[0].sendTransaction({
    to: '0x087a60A1360a8E2Af9670f70b895721f783Bf373',
    value: hre.ethers.utils.parseEther('0.1')
  });
  console.log(txObj);
})
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     // console.log(account.privateKey);
//     // account.provider.
//     const balance = await ethers.provider.getBalance(account.address);

//     console.log(account.address, ethers.utils.formatEther(balance) + " bnb");
//   }
// })

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await ethers.getSigners();

  for(let i=0;i<20;i++) {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`)
    
    let balance = await ethers.provider.getBalance(wallet.address)
    balance = ethers.utils.formatEther(balance)
    console.log(`${wallet.address} : ${wallet.privateKey}, ${balance}`)
  }
});

// task("transfer", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await ethers.getSigners();

//   const txObj = await accounts[0].sendTransaction({
//     to: accounts[1].address,
//     value: hre.ethers.utils.parseEther('0.1')
//   });
//   console.log(txObj);
// });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  optimizer: {
    enabled: true,
    runs: 1,
  },
  networks: {
    bsctest: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: { mnemonic: mnemonic },
      gas: "auto",
      gasPrice: "auto",
    },
    bsc: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: { mnemonic: mnemonic },
      gas: "auto",
      gasPrice: "auto",
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: scanApiKey
  }
};
