import { setOnReset, setOnUpdateState } from "src/scripts/modules/web3modal";

export function setOnResetFunc(state, store) {
  setOnReset(() => onReset(store));
}

export function setOnUpdateStateFunc(state, store) {
  setOnUpdateState(() => onChanged(store));
}

export function setDirty(state, value) {
  state.hasChanged = value;
}

export function setReset(state, value) {
  state.hasReset = value;
}

export function showMint(state) {
  state.showMintPopup = true;
}

export function hideMint(state) {
  state.showMintPopup = false;
}

export function onReset(store) {
  store.commit("web3module/setReset", true);
}

export function onChanged(store) {
  store.commit("web3module/setDirty", true);
}
