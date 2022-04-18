const shell = require('shelljs')
const delay = require('delay')
const log = require('log-to-file')

const deployContract = (metamaskAddress) => {
    return new Promise((resolve, reject) => {
        shell.exec(`Address=${metamaskAddress} npx hardhat run scripts/FdtVestingWallet/deploy.js --network bsc`, (code, stdout, stderr) => {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            if(stderr) {
                console.log('Program stderr:', stderr);
                reject(stderr)
                return
            }
            const lines = stdout.split('\n')    
            const contractAddress = lines[lines.length - 2]

            console.log(`createdAddress: '${contractAddress}'`)
            log(`======================================${metamaskAddress}======================================`)
            setTimeout(() => {
                log(`created===>metamask:${metamaskAddress},contractAddress:${contractAddress}`)
                resolve(contractAddress)
            }, 100)
            
        })
    })
}

const verify = (metamaskAddress, contractAddress) => {
    return new Promise((resolve, reject) => {
        shell.exec(
        `Address=${metamaskAddress} npx hardhat verify \
        --contract contracts/FdtVestingWallet.sol:FdtVestingWallet  ${contractAddress} \
        --constructor-args scripts/FdtVestingWallet/deployParams.js \
        --network bsc`, 
            (code, stdout, stderr) => {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            if(stderr) {
                console.log('Program stderr:', stderr);
                reject(stderr)
                return
            }

            const lines = stdout.split('\n')
            const lastestLine = lines[lines.length - 2]
            console.log(`lastestLine: '${lastestLine}'`)
            resolve(lastestLine)
            log(`verify===>metamask:${metamaskAddress},contractAddress:${contractAddress}`)
            // log(`verify2===>${lastestLine}`)
        })
    })
}


const main = async() => {

    const addrs = [
        '0xc2D8A2A0549Fa4A012d8939A8D9702Af6d6e78CA',
        '0xb3e95f8005473c0e172A26D6Da7E2e5A695DB57C',
        '0x638a4840bE03AFDE73F82E05209d88Ad4CAAB3B4',
        '0x923D77081aa8a13aEeB68E71E774D1928935e680',
        '0xEC0637553AA5D1dbA116A8b53C9197E652cEd950',
        '0x751D48cdcbcf49E70f8c20200c4975cCc85481B5',
        '0x5a0EE39Cf1793ac8e953Dc438Fd3A4408B58D614',
        '0x7C4988642cbC3230074B068C7fF927Ee00423A37',
        '0xf7c90f5a88Eca2DCAFd6E9025C6a57E1F701FAfB',
        '0xF44C0BB361F3Bd103C7b8b0b69Db52a4D5bFC4a1',
        '0x74746e01f2e295EC9e9167949F06695dcf996c55',
        '0x2982010693f944eDbd808d78715560ea03497C50',
        '0x2619c876c4eDCdAB29042dA9f1d313B9c1064d69',
        '0x37D9Dcb93f548002Bc222706DAD8160E5Cda6b51',
        '0x4f7E102B7B5E3C9687d37A2652B688775aF5a707',
        '0x488549C3D4dC69c08703DDED7a37A4d4C740945D',
        '0x9025bb53374899cF2135DB5e3f6dd2fA5Fb29905',
        '0xC6dC6A46f862E6e3fce4dF7379137a3BE6059476',
        '0xAb28e2E2ba0E20bECD704D99aE2e85C1515105EF',
        '0xa39D6A80E61d3e2872bb47eED19c2ad16964859E',
        '0x54C25C9241692157cF9e2b5688456BfEecF7Fb4a',
        '0x831350D5037721263B4c0635D59f07ed1DCcC957',
        '0xe6f93517675d695ab3c91039f656b179f0d865Fa',
        '0xc491De6B500AA809F44E6d6b1FEf7B13Db376337',
        '0x50B9c04765CB9f95d174041CC2218b782c2726d4',
        '0x78c5782CD68B0CbF30dA2543c654086a1d07a74C',
        '0xD2A018ba2b8C86E96BCbe5F16d34b7e7C1B2320A'
    ]
    console.log(`count : ${addrs.length}`)
    for(const metamaskAddress  of addrs) {
        // const metamaskAddress = '0xf9cd472c4B28b68875fE9C24F9B5c66e004FEc07'
        try {
            const contractAddr = await deployContract(metamaskAddress)
            await delay(1000 * 15)
            const vrfResult = await verify(metamaskAddress, contractAddr)
            console.log(`vrfResult_________:${vrfResult}`)
        } catch(err) {
            console.error(err)
        }
    }
    
}

main()