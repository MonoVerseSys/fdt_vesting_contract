const utils = require("../utils");
const { HARDHAT_NETWORK: net} = process.env
const {
  contractName,
} = require("./_config.json")[net];


async function main() {
    await utils.deploy({ net, contractName });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
