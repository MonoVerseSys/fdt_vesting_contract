const utils = require("../utils");
const { HARDHAT_NETWORK: net} = process.env
const {
  contractName,
  deployedAddress,
} = require("./_config.json")[net];

const { ethers } = utils;


async function main() {
    const signers = await utils.singers()
    const c = await utils.attach({ contractName, deployedAddress });

    const result = await c.addAllocation(['0xEa26ABcF9A7d1d851745AF1aeF707BAC02dA0bEB'], [utils.ethers.utils.parseUnits("1000", "ether").toString()])
    console.log(result);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
