const utils = require("../utils");
const { HARDHAT_NETWORK: net} = process.env
const {
  contractName,
  deployedAddress,
} = require("./_config.json")[net];

const { ethers } = utils;
const moment = require('moment')

async function main() {
    const signers = await utils.singers()
    const c = await utils.attach({ contractName, deployedAddress });




    
    const start = await c.start();
    const duration = await c.duration();

    console.log('start: ', moment.unix(start.toString()).format('YYYY-MM-DD HH:mm:ssZ')) 
    console.log('duration: ', duration.toString()) 

    const result = await c.getVestingInfo('0xEa26ABcF9A7d1d851745AF1aeF707BAC02dA0bEB');
    
    console.log('allocation:', utils.ethers.utils.formatEther(result.allocation))
    console.log('released:', utils.ethers.utils.formatEther(result.released))
    
  
    const vestedAmount = await c.vestedAmount('0xEa26ABcF9A7d1d851745AF1aeF707BAC02dA0bEB', moment().unix());
    console.log('vestedAmount:', utils.ethers.utils.formatEther(vestedAmount))

    const contractBalance = await c.contractBalance()
    console.log('contractBalance:', utils.ethers.utils.formatEther(contractBalance))


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // 100000000000000000000
  // 100000000000000000000