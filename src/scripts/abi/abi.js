const allAbi = require.context('../abi', true,  /.json$/)

// imports all the contracts and caches them
const abiCache = {}

allAbi.keys().forEach((key) => {
  const fileName = key.replace('./', '')
  const resource = require(`../abi/${fileName}`)
  const namespace = fileName.replace('.json', '')

  abiCache[namespace] = JSON.parse(JSON.stringify(resource));
})

export function getAbi(name) {
  if (!Object.keys(abiCache).includes(name)) {
    throw new Error(`The abi file with the name \'${name}\' does not exist`);
  }

  return abiCache[name];
}
