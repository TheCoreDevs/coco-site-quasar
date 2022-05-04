// check connection state
import { hasCachedProvider, signIn } from "src/scripts/modules/web3modal";

export const startupPlugin = (store) => {
  // if (hasCachedProvider()) {
  //   signIn().then(() => {
  //     store.commit("web3module/setDirty", true);
  //   });
  // } else {
  //   setTimeout(store.commit("web3module/setDirty", true), 500);
  // }

  setTimeout(store.commit("web3module/setDirty", true), 500);
  store.commit("web3module/setOnUpdateStateFunc", store);
};
