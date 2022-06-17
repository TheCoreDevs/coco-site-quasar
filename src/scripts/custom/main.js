import { ethers } from "ethers";
import { getState } from "../modules/web3modal";
import { network } from "../config.json";

/*
	Inputs: [owner]
	Outputs: []
*/
export async function balanceOf(pair, owner) {
  return await pair.contract.balanceOf(owner);
}

/*
	Inputs: [tokenId]
	Outputs: []
*/
export async function getApproved(pair, tokenId) {
  return await pair.contract.getApproved(tokenId);
}

/*
	Inputs: []
	Outputs: [onlyWhitelist,mintingEnabled]
*/
export async function getSalesStatus(pair) {
  return await pair.contract.getSalesStatus();
}

/*
	Inputs: [owner,operator]
	Outputs: []
*/
export async function isApprovedForAll(pair, owner, operator) {
  return await pair.contract.isApprovedForAll(owner, operator);
}

/*
	Inputs: [_wallet,_signature]
	Outputs: []
*/
export async function isWhitelisted(pair, _wallet, _signature) {
  return await pair.contract.isWhitelisted(_wallet, _signature);
}

/*
	Inputs: []
	Outputs: []
*/
export async function name(pair) {
  return await pair.contract.name();
}

/*
	Inputs: []
	Outputs: []
*/
export async function owner(pair) {
  return await pair.contract.owner();
}

/*
	Inputs: [tokenId]
	Outputs: []
*/
export async function ownerOf(pair, tokenId) {
  return await pair.contract.ownerOf(tokenId);
}

/*
	Inputs: [amount, sig]
	Outputs: []
*/
export async function mint(amount, pair, sig, cost) {
  const provider = getState().provider;
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const signedContract = pair.contract.connect(signer);
  const tx = {
    nonce: (await provider.getTransactionCount(address)) || undefined,
    gasLimit: pair.info.gasLimit[network],
    value: ethers.utils.parseEther(cost),
  };
  return await signedContract.mint(amount, sig, tx);
}

/*
	Inputs: [tokenId,salePrice]
	Outputs: [receiver,royaltyAmount]
*/
export async function royaltyInfo(pair, tokenId, salePrice) {
  return await pair.contract.royaltyInfo(tokenId, salePrice);
}

/*
	Inputs: [interfaceId]
	Outputs: []
*/
export async function supportsInterface(pair, interfaceId) {
  return await pair.contract.supportsInterface(interfaceId);
}

/*
	Inputs: []
	Outputs: []
*/
export async function symbol(pair) {
  return await pair.contract.symbol();
}

/*
	Inputs: [tokenId]
	Outputs: []
*/
export async function tokenURI(pair, tokenId) {
  return await pair.contract.tokenURI(tokenId);
}

/*
	Inputs: []
	Outputs: []
*/
export async function totalSupply(pair) {
  return await pair.contract.totalSupply();
}
