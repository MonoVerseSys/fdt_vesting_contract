const utils = require("../utils");
const { HARDHAT_NETWORK: net} = process.env
const {
  contractName,
  deployedAddress,
} = require("./_config.json")[net];
const params = require('./deployParams');

async function main() {
    const result = await utils.upgradeProxy({deployedAddress, contractName})
//   const result = await utils.deployProxy({ net, contractName, deployPrams: params });

  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
