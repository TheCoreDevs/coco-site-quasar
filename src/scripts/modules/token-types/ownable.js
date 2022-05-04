export async function owner(pair) {
  return await pair.contract.owner();
}
