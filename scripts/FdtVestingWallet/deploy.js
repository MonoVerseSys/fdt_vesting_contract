const utils = require("../utils");
const { HARDHAT_NETWORK: net} = process.env
const {
  contractName,
} = require("./_config.json")[net];
const params = require('./deployParams');


async function main() {
    console.log(params)
    await utils.deploy({ net, contractName, deployPrams: params });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
