import { getState } from "src/scripts/modules/web3modal";

export async function getSalesStatus(pair) {
  return await pair.contract.getSalesStatus();
}

export async function royaltyInfo(pair, tokenId, salePrice) {
  return await pair.contract.royaltyInfo(tokenId, salePrice);
}

export async function supportsInterface(pair, interfaceId) {
  return await pair.contract.supportsInterface(interfaceId);
}

export async function togglePresale(pair) {
  const provider = getState().provider
	const signer = await provider.getSigner()
	const address = await signer.getAddress()
	const signedContract = pair.contract.connect(signer)
	const tx = {
		nonce: (await provider.getTransactionCount(address)) || undefined
	}
  return await signedContract.togglePresale(tx);
}

export async function togglePublicSale(pair) {
  const provider = getState().provider
	const signer = await provider.getSigner()
	const address = await signer.getAddress()
	const signedContract = pair.contract.connect(signer)
	const tx = {
		nonce: (await provider.getTransactionCount(address)) || undefined
	}
  return await signedContract.togglePublicSale(tx);
}
