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

    const startM = moment.unix(start.toString())
    const endM = startM.add(parseInt(duration.toString()), 'seconds')

    console.log('start: ', startM.format('YYYY-MM-DD HH:mm:ssZ')) 
    console.log('duration: ', endM.format('YYYY-MM-DD HH:mm:ssZ')) 

    // const result = await c.getVestingInfo('0xa6701b02cE914357d40EfbE2960A58a13E8Bfbd9');
    
    // console.log('allocation:', utils.ethers.utils.formatEther(result.allocation))
    // console.log('released:', utils.ethers.utils.formatEther(result.released))
    
  
    // const vestedAmount = await c.vestedAmount('0xa6701b02cE914357d40EfbE2960A58a13E8Bfbd9', moment().unix());
    // console.log('vestedAmount:', utils.ethers.utils.formatEther(vestedAmount))

    // const contractBalance = await c.contractBalance()
    // console.log('contractBalance:', utils.ethers.utils.formatEther(contractBalance))


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // 100000000000000000000
  // 100000000000000000000