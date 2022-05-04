import atob from "atob";

/*
  All of these keys will need to be shoved into a server for security.
 */
export const keys = {
  INFURA_KEY: process.env.VUE_APP_INFURA_KEY ? atob(process.env.VUE_APP_INFURA_KEY) : null,
  OPENSEA: process.env.VUE_APP_OPENSEA ? atob(process.env.VUE_APP_OPENSEA) : null,
  BACKGROUND_API_KEY: process.env.VUE_APP_BACKGROUND ? atob(process.env.VUE_APP_BACKGROUND) : null
};
