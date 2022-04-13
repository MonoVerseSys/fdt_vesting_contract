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
    const amount = utils.ethers.utils.parseUnits("10000000", "ether").toString();

    const result = await c.mint("0x72A50F13Da78212D9Ac32A8245c70A7F460C2266", amount)
    console.log(result);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
