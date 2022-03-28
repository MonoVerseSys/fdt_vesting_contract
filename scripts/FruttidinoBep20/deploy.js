const utils = require("../utils");
const { HARDHAT_NETWORK: net} = process.env
const {
  contractName,
} = require("./_config.json")[net];

async function main() {
  const minter =  (await utils.singers())[0].address;
  console.log(minter);

  const cap = utils.ethers.utils.parseUnits("1000000000", "ether").toString();
  console.log(`cap: ${cap}`);

  const result = await utils.deployProxy({ net, contractName, deployPrams: [ cap, minter , minter ] });

  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
