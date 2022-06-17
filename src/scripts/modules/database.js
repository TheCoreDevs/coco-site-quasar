import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { whitelists, firebase, testing } from "../database/database.json";

// Initialize Firebase
const _ = initializeApp(firebase);
const db = getDatabase();

/*
  Returns the status of each database and determines if the given address
  is a part of them.

  Returns an array of objects
 */
export async function getWhitelistStatus(address) {
  if (!address) {
    return undefined;
  }

  return await new Promise((resolve, reject) => {
    const refs = [];
    const ran = [];
    const signatures = [];
    const prefix = testing ? "test/" : "";

    for (let i = 0; i < whitelists.length; i++) {
      refs.push(ref(db, `${prefix}${whitelists[i]}/${address}/`));
      signatures.push(undefined);
    }

    for (let i = 0; i < whitelists.length; i++) {
      const tmpI = i;
      onValue(refs[tmpI], (snapshot) => {
        signatures[tmpI] = snapshot.val();
        ran.push(true);
        validateOutput();
      });
    }

    function validateOutput() {
      if (ran.length === refs.length) {
        const finalArr = [];

        for (let i = 0; i < whitelists.length; i++) {
          const signature = signatures[i];
          const whitelist = whitelists[i];

          if (signature === undefined || signature === null) {
            finalArr.push(null);
            continue;
          }

          finalArr.push({
            signature,
            whitelist,
          });
        }

        resolve(finalArr);
      }
    }
  });
}

// export async function getSignature(address, state) {
//   if (!address) {
//     return undefined;
//   }
//
//   return await new Promise((resolve, reject) => {
//     const OGRef = ref(db, "og/" + address + "/");
//     const WLRef = ref(db, "fam/" + address + "/");
//
//     let ranOg = false;
//     let ranWl = false;
//
//     let ogSig;
//     let wlSig;
//
//     onValue(OGRef, (snapshot) => {
//       ogSig = snapshot.val();
//       ranOg = true;
//       validateOutput();
//     });
//
//     onValue(WLRef, (snapshot) => {
//       wlSig = snapshot.val();
//       ranWl = true;
//       validateOutput();
//     });
//
//     function validateOutput() {
//       if (ranOg && ranWl) {
//         resolve(state[0] ? ogSig : state[1] ? wlSig : undefined);
//       }
//     }
//   });
// }
