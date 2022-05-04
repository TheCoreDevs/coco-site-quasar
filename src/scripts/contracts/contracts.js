/*
  Only contract setup/conversion functionality goes into here.
 */

import { network } from "src/scripts/config.json";
import { ethers } from "ethers";
import { keys } from "src/scripts/keys";
import { getAbi } from "src/scripts/abi/abi";

const infuraNetworks = ['rinkeby', 'homestead']
const allContracts = require.context('../contracts', true,  /.json$/)

// imports all the contracts and caches them
const contractCache = {}

allContracts.keys().forEach((key) => {
  const fileName = key.replace('./', '')
  const resource = require(`../contracts/${fileName}`)
  // const namespace = fileName.replace('.json', '')
  const json = JSON.parse(JSON.stringify(resource));

  contractCache[json.name] = json;
})

/*
  Gets a JSONRpc contract instance and provider
 */
function getContractJson(address, abi) {
  const provider = new ethers.providers.JsonRpcProvider();
  return {
    contract: new ethers.Contract(address, abi, provider),
    provider
  };
}

/*
  Gets an Infura contract instance and provider
 */
function getContractInfura(address, abi) {
  const provider = new ethers.providers.InfuraProvider(
    network,
    keys.INFURA_KEY
  );

  return {
    contract: new ethers.Contract(address, abi, provider),
    provider
  }
}

/*
  Gets a specific contract's information by name
 */
export function getContractInfo(name) {
  if (!Object.keys(contractCache).includes(name)) {
    throw new Error(`A contract with the name of \'${name}\' does not exist`);
  }

  return contractCache[name];
}

/*
  Gets a contract instance via a contract name.

  Usage:
  ```js
  const {contract, provider, info} = getContractInstance('main');
  ```
 */
export function getContractInstance(name) {
  const info = getContractInfo(name);
  const abi = getAbi(info.name);
  const address = info.address[network];

  if (infuraNetworks.includes(network)) {
    return {
      ...getContractInfura(address, abi),
      info
    }
  }

  return {
    ...getContractJson(address, abi),
    info
  }
}
