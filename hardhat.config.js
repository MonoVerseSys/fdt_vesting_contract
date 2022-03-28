require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

const { mnemonic, scanApiKey } = process.env;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    // console.log(account.privateKey);
    // account.provider.
    const balance = await ethers.provider.getBalance(account.address);

    console.log(account.address, ethers.utils.formatEther(balance) + " bnb");
  }
})

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
