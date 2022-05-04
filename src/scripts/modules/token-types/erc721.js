export async function balanceOf(pair, address) {
  return await pair.contract.balanceOf(address);
}

export async function ownerOf(pair, tokenId) {
  return await pair.contract.ownerOf(tokenId);
}

export async function name(pair) {
  return await pair.contract.name();
}

export async function symbol(pair) {
  return await pair.contract.symbol();
}

export async function tokenURI(pair, tokenId) {
  return await pair.contract.tokenURI(tokenId);
}

export async function totalSupply(pair) {
  return await pair.contract.totalSupply();
}

export async function proxyRegistryAddress(pair) {
  return await pair.contract.proxyRegistryAddress();
}

export async function baseURI(pair) {
  return await pair.contract.baseURI();
}
