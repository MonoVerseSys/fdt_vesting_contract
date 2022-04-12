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

    const start = await c.start();
    const duration = await c.duration();

    console.log('start, duration:', start, duration)

    const result = await c.release('0xEa26ABcF9A7d1d851745AF1aeF707BAC02dA0bEB');
    
    console.log(result);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
