const { ethers, upgrades } = require("hardhat");
const fs = require("fs");
const path = require("path");

const BigNumber = ethers.BigNumber;

const writeConfig = (net, contractName, address) => {
  // (?<=deployedAddress: ')[^']+(?=')
  const filePath = path.join(__dirname, contractName, "_config.json");
  // console.log(filePath)
  let jsonData = fs.readFileSync(filePath, "utf8");
  let dataToJson = JSON.parse(jsonData)
  let jsonToString = JSON.stringify(dataToJson[net], null, 4)
  jsonData = jsonToString.replace(/(?<=deployedAddress": ")[^"]+(?=")/gm, address);
  dataToJson[net] = JSON.parse(jsonData)
  let jsonDataResult = JSON.stringify(dataToJson, null, 4)
  fs.writeFileSync(filePath, jsonDataResult);
};
const deploy = async ({net, contractName, deployPrams }) => {
  const C = await ethers.getContractFactory(contractName);
  const c = await C.deploy.apply(C, deployPrams);

  const result = await c.deployed();
  // console.log(`deployed result ${contractName}:`, result);
  console.log(result.address)

  writeConfig(net, contractName, result.address);
};

const deployProxy = async ({net, contractName, deployPrams }) => {
  const C = await ethers.getContractFactory(contractName);
  const c = await upgrades.deployProxy(C, deployPrams);
  const result = await c.deployed();

  console.log(`deployed proxy result ${contractName}:`, result, result.address);
  writeConfig(net, contractName, result.address);
};


const upgradeProxy = async ({ deployedAddress, contractName }) => {
  const C = await ethers.getContractFactory(contractName);
  const c = await upgrades.upgradeProxy(deployedAddress, C);
  const result = await c.deployed();
  console.log(result, result.address);
  return result;
};

const attach = async ({ contractName, deployedAddress }) => {
  const C = await ethers.getContractFactory(contractName);
  const c = await C.attach(deployedAddress, C);
  return c;
};

const singers = async () => {
  const list = await ethers.getSigners();

  return list;
};

const connectToWallet = async (contractObject, prv) => {
  const wallet = new ethers.Wallet(prv, ethers.provider);
  const c = contractObject.connect(wallet);
  return [c, wallet];

}

const connectToSigner = async (contractObject, index) => {
  const s = await singers();

  console.log(`connect signer address : ${s[index].address}, ${s.length}`);
  const c = contractObject.connect(s[index]);
  return [c, s[index]];
};

const getTopicName = (abi, name) => {
  const [event] = abi.filter(
    (item) => item.type === "event" && item.name === name
  );
  if (event) {
    const name = event.name;
    const inputs = event.inputs;
    const topicArgs = [];
    inputs.forEach((input) => {
      topicArgs.push(input.type);
    });
    const topic = ethers.utils.id(`${name}(${topicArgs.join(",")})`);
    return topic;
  }
  return null;
};

const getInterface = (abi, name) => {
  const [event] = abi.filter(
    (item) => item.type === "event" && item.name === name
  );
  if (event) {
    const name = event.name;
    const inputs = event.inputs;
    const inputerfaceArgs = [];
    inputs.forEach((input) => {
      inputerfaceArgs.push(
        `${input.type}${input.indexed ? " indexed" : ""} ${input.name}`
      );
    });
    const interface = new ethers.utils.Interface([
      `event ${name}(${inputerfaceArgs.join(", ")})`,
    ]);
    return interface;
  }
  return null;
};

const eventFromAbi = async (address, abi, name, from = 1, to = "latest") => {
  const topic = getTopicName(abi, name);
  if (!topic) return null;
  const interface = getInterface(abi, name);

  let filter = {
    address: address,
    fromBlock: from,
    toBlock: to,
    topics: [topic],
  };
  // console.log(`filter: `, filter);
  let logs = await ethers.provider.getLogs(filter);
  logs = logs.map((l) => {
    const row = interface.parseLog(l);

    const keys = Object.keys(row.args);
    let keyNameIdx = keys.length / 2;
    const result = {};
    for (const ar of row.args) {
      const keyName = keys[keyNameIdx];
      keyNameIdx++;

      if (BigNumber.isBigNumber(ar)) {
        if (ar.gt(BigNumber.from(1e10))) {
          const amount = ethers.utils.formatEther(ar);
          result[keyName] = {
            origin: ar.toString(),
            formatEther: amount,
          };
        } else {
          result[keyName] = ar.toString();
        }
      } else {
        result[keyName] = ar;
      }
    }
    return result;
  });
  return logs;
};

module.exports = {
  deploy,
  deployProxy,
  upgradeProxy,
  attach,
  singers,
  ethers,
  connectToSigner,
  connectToWallet,
  eventFromAbi,
};
