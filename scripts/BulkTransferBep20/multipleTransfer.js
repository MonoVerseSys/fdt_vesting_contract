const utils = require("../utils");
const { HARDHAT_NETWORK: net} = process.env
const {
  contractName,
  deployedAddress,
} = require("./_config.json")[net];

const { ethers } = utils;
const BigNumber = require('bignumber.js')

/**
 * 
 * 사전에 bep20 approve 를 먼저 진행해야 정상적으로 실행된다. 
 */

async function main() {
    const signers = await utils.singers()
    const c = await utils.attach({ contractName, deployedAddress });
    datas = [
      ['450,573','0xb311d7C4E58d25e1873abfeFD357BD9aA43Bf6B2'],
      ['468,596','0xAD54e9b381c9d180Cb8F0bBDcDf77f8382Dc1860'],
      ['90,115','0xEbe6B316fB1a47f0B2c4369a1447D058b194DBCF'],
      ['270,344','0xF80c2Ed0A53C13f27D4d75FE10F2EACCF5179C47'],
      ['450,573','0x68A2559b5653b2764470dFcB6f67E3bd926dECFD'],
      ['90,115','0xF6845342804fdDd2688CDC795a1FE2132931AaFd'],
      ['90,115','0x8e30788CEf20e6ec13BaA4Cb4B999E964025124c'],
      ['180,229','0xd063D0A45a4d3e535047b0ee9744d035819E73a6'],
      ['270,344','0x1eB51589F647B9a51870DE0886cc707280A5deb7'],
      ['180,229','0xae42D183c6a147934187092870487821189E3453'],
      ['901,145','0x93352a99835E049B9916bC9D59bAb9AEfd1659cD'],
      ['901,145','0x0A19F8277DdCe37BA82c91F2f7a100deEe4D9845'],
      ['901,145','0xBcF5315b0d2D955f26D0069a5a09F07DE47253a4'],
      ['1,802,289','0x2880eb38D0F03EDB9E2c9f649c648C853877D705'],
      ['360,458','0x294050EbAa3BF95158eD3F96ed692ca10C2e6A4d'],

      ['3,619,255','0x77bE547e000D519F44016b4d3ABDfaF9A5152E53'],
      ['2,669,201','0x96692583653e4710dFEF09B6c9085350f21a9223'],
      ['90,482','0x2A2670CFa4a7ebE06e491857095Af6218b1CE975'],
      ['90,482','0xB31B3FD089De7318A0089C1CCC26F1b45A77a8cd'],
      ['90,482','0x41246b887E25790748448c6458316ed2aA69b752'],
      ['90,482','0x58Da018430Ee0d9E6f97b80b8e81dde4F7c20dA1'],
      ['90,482','0xE1481E8981298eDD83D9c5D6a0c3BFf596dEe64A'],
      ['90,482','0x586D17A51A73D767588c3840F847B2292A43b840'],
      ['45,241','0x58F437918C36e1089a66008bBfA469a88cA2d9E9'],
      ['90,482','0x72ba62bA41ab9fE47A12f940c99e4E927620819a'],
      ['90,482','0x950721ed2D9b8e92c9e163941F5609049F72872d'],
      ['45,241','0x32b97fac74b83557703C3f8d344e1c9f71DD0e3D'],
      ['45,241','0xEa27D13155BB329664838b3EC5a66c7eCE834CF4'],
      ['45,241','0x31A9f1C7bdEa4dFE327b209459541360dCE343C9'],
      ['27,145','0xc17afc0e2abf3f36b3a6bf31aedaacf9a3d9f708'],
      ['271,445','0xb22378313449E118E0A2D9cd75F225b927343d3E'],
      ['271,445','0x693B5bc7f11D447DB0a58c52352Fab826e957bb8'],
      ['90,482','0xc1CAe7EF7c745395c37439aBA152C2ab777EAe0a'],
      ['27,145','0xECAd39D2ec8f41a438ffA0b594432A8a7a125F71'],
      ['45,241','0x147F9f557644Fca40df13b89424D025b395c3ED6'],
      ['452,407','0x465a4813C6F0800881769a8868b502160a5c39ec'],
      ['90,482','0xD98C8f0a692f106D2298637d0470c559259e1B22'],
      ['90,482','0xb9e7d81525B42c059C45D2992277453067A18a36'],
      ['45,241','0xb8bcD1C11d8D3c41dE14e19Ef5e15f516b86C6dD'],
      ['90,482','0x22EE5936193C00B9726aB08F93ee70f8c44a7007'],
      ['90,482','0xa35a8A5DE43cec2c526F4d75c7AA30d99d72270D'],
      ['180,963','0x6895f65E9dD04BbA986352aa50774f3f2d790300'],
      ['452,407','0xe80E5F0f2baf9f1F1A00E708cCF128b0BCCaC597'],
      ['271,445','0xf336B6bdD813777D42DCE35a8ecbC635bb6f4711'],
      ['180,963','0xde62d2E06A3e0c005D655Bc57f7E31e9Bf2BC557'],
      ['452,407','0x9bE92391A1E3EEbEda50FeB0D0f367daBa298c6e'],
      ['407,167','0x02590C9d19A2EB0949E4b40335F2074F5E01d3E0'],
      ['452,407','0x051e8701c3Bf343F27c741a3f89Daa4895eE1918'],
      ['407,167','0x61F4FB26B7eEE16B5962E9e9E16F2B98C3090650'],
      ['407,167','0x4D3EC2b43D26C504685893Fb5A4269856736802B'],
      ['244,300','0x8ca896D68338a6519e8B03F36628F0BeaCEea303'],
      ['244,300','0x6FcD63Ea23d209e823295Bc7151d576759C0E972'],
      ['81,434','0x2A6bcDc9cB8b25E2C6C15B52B0e0B2229444D170'],
      ['122,150','0x93b4c4BE8d1FD7FA897802a33451574987CbdF2D'],
      ['81,434','0x2c461e70538E1ae34b2BA667E0273eCf5ea434aC'],
      ['162,867','0x4B453bCa2F11b09b3D48491b1e7858EA7daC8109'],
      ['81,434','0xB033E31ef3D0A86a4F66632fA169ebf60d6DCde8'],
      ['162,867','0xa76BAF89d91f3F9411121e283d9a83b3d5bB08cC'],
      ['40,717','0xB718d726625bd624fd50C8DE9d288639Ffb03AEd'],
      ['81,434','0x1C87F9eCEFd059f93E1528785EcFA53860b7b208'],
      ['90,482','0x8B3642b1C0CcfF625Df095Ba4e449Db31729e6f6'],
      ['180,963','0x9469ba7138a086377eF8112585d5c400eCE4CD6C'],
      ['90,482','0xD6384899b0238e08a8Da8C31b219397FD1F770C7'],
      ['904,814','0x9981656Eff4943565CFB93F381AFdE2382b81e76'],
      ['271,445','0xad15fb18E79B850cD5039fbCAF3Ba3AAd17b6A19'],
    ]
    const amts = datas.map(item => {
      return utils.ethers.utils.parseUnits(item[0].replaceAll(',', ''), "ether").toString()
    })
    const addrs = datas.map(item => item[1])
    
    // let total = new BigNumber(0)

    // datas.forEach(item => {
    //   console.log(item[0])
    //   total = total.plus(item[0].replaceAll(',', ''))
    // })

    // console.log('total--', total.toString())

    console.log(addrs)
    console.log('----------------------------------')
    console.log(amts)

    const tokenAddr ='0x3a599e584075065eAAAc768D75EaEf85c2f2fF64'
    console.log(signers[0].address)
    const result = await c.multipleTransfer(tokenAddr, signers[0].address, addrs, amts)
    console.log(result);
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// 22246386