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
    // const result = await c.balanceOf(signers[0].address);
    const result = await c.balanceOf('0xc882D9966cBE56B68C4DdE706f3B9a57E82DEc78');
    
    console.log(result);

    // const rol1 =  await c.hasRole(minterRole, '0x58b8654999d49f847404d71336b12aee5fdc6b41')
    // console.log(`rol1, ${rol1}`)

    // const rol2 =  await c.hasRole(minterRole, '0x677d8a47D009227368b96BeB98c7d7a9123E1FE0')
    // console.log(`rol2, ${rol2}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  // 100000000000000000000000 balanceOf
  // 100000000000000000000