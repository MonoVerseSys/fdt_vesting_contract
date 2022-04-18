const utils = require("../utils");
const { HARDHAT_NETWORK: net} = process.env
const {
  contractName,
  deployedAddress,
} = require("./_config.json")[net];

const { ethers } = utils;


async function main() {
    // const signers = await utils.singers()
    const c = await utils.attach({ contractName, deployedAddress });
    const amount = utils.ethers.utils.parseUnits("22246386", "ether").toString();

    const result = await c.approve('0x0616FFa61b49F6563A26237359Fc3da4610c64B5', amount)
    console.log(result);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
