<template>
  <q-page-container id="swirl" class="flex flex-center black-bottom-border column section-padding dots q-pl-sm q-pr-sm">
    <div class="text-uppercase text-h2 text-center">Swirl<br class="lt-md" /> your pfp</div>
    <div class="text-center fs-18 q-pt-md q-pb-md lighter">Pick one of your profile pictures and<br/> background NFTs to combine them</div>
    <div class="row flex flex-center full-width q-pt-xl blog--small">
      <div class="col-5 flex flex-center column q-pa-md relative-position no-wrap">
        <div class="fs-12 font-mulish text-uppercase text-no-wrap text-center absolute-top select-title"><strong>Profile</strong></div>
        <q-btn :disable="isLoading" flat class="flex flex-center relative-position" style="width: 100%; max-width: 300px; aspect-ratio: 1;" @click="openPanel(0)">
          <img class="blur non-selectable absolute-center full-width full-height" src="~assets/swirl/lhs.png" />
          <div v-if="!isLoading" class="text-uppercase absolute-center non-selectable select font-leonardo text-center">Select</div>
          <q-spinner v-else />
        </q-btn>
      </div>
      <div class="col-2 flex flex-center column relative-position">
        <div class="full-width full-height" style="max-width: 50px">
          <q-img src="~assets/swirl/add.png" fit="scale-down" />
        </div>
      </div>
      <div class="col-5 flex flex-center column q-pa-md relative-position no-wrap">
        <div class="fs-12 font-mulish text-uppercase text-no-wrap text-center absolute-top select-title"><strong>Background</strong></div>
        <q-btn :disable="isLoading" flat class="flex flex-center relative-position" style="width: 100%; max-width: 300px; aspect-ratio: 1;" @click="openPanel(1)">
          <img class="blur non-selectable absolute-center full-width full-height" src="~assets/swirl/rhs.png" />
          <div v-if="!isLoading" class="text-uppercase absolute-center non-selectable select font-leonardo text-center">Select</div>
          <q-spinner v-else />
        </q-btn>
      </div>
    </div>
    <q-btn rounded class="q-mt-xl custom-btn full-width full-height invert q-mb-xl" style="max-width: 250px; max-height: 50px" :disable="!selectedNFT && !selectedBackground" @click="combineImages">
      Combine
    </q-btn>

    <q-dialog
      v-model="showPopup"
    >
      <q-card>
        <q-card-section class="fs-16 font-mulish text-center">
          <strong>Select a profile picture from your wallet</strong>
        </q-card-section>
        <q-card-section class="row">
          <template v-for="asset in (currentSide === 0 ? userNFTs : useBackgrounds)" :key="asset.usageUrl">
            <div class="col-3 flex flex-center" style="aspect-ratio: 1">
              <q-btn class="q-pa-none" style="aspect-ratio: 1; width: calc(90%);">
                <q-img class="full-width full-height q-pa-none" :src="asset.usageUrl" />
              </q-btn>
            </div>
          </template>
        </q-card-section>
        <q-card-section v-if="(currentSide === 0 ? userNFTs : useBackgrounds).length > 0" class="flex flex-center q-pt-none">
          <q-pagination :max="currentSide === 0 ? maxPagesLeft : maxPagesRight" v-model="currentPage" direction-links></q-pagination>
        </q-card-section>
        <q-card-section v-else class="fs-16 font-mulish text-center">
          <strong>No assets available!</strong>
        </q-card-section>
        <div class="flex flex-center q-pb-lg">
          <q-btn rounded class="custom-btn full-width" style="max-width: 250px; max-height: 50px" :disable="(currentSide === 0 ? !selectedNFT : !selectedBackground)">
            Continue
          </q-btn>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="showLoading"
      persistent
    >
      <q-card class="column flex flex-center q-pa-lg q-pl-xl q-pr-xl">
        <div class="text-h4 text-uppercase text-center">Swirling...</div>
        <div class="row flex flex-center full-width q-pt-lg q-pb-lg">
          <div class="col-5 q-pa-sm">
            <q-img class="blur" :src="selectedNFT?.usageUrl" style="aspect-ratio: 1" />
          </div>
          <div class="col-2 flex flex-center column relative-position">
            <div class="full-width full-height" style="max-width: 50px">
              <q-img src="~assets/swirl/add.png" fit="scale-down" />
            </div>
          </div>
          <div class="col-5 q-pa-sm">
            <q-img class="blur" :src="selectedBackground?.usageUrl" style="aspect-ratio: 1" />
          </div>
        </div>
        <div class="text-center">Your image will be ready in a moment.</div>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="showDone"
      persistent
    >
      <q-card class="column flex flex-center q-pa-lg q-pl-xl q-pr-xl">
        <div class="text-h4 text-uppercase text-center">Your Image is Ready</div>
        <img class="q-mt-xl q-mb-xl no-border-radius basic-shadow" :src="downloadURL" style="width: 200px; aspect-ratio: 1; object-fit: cover" />
        <q-btn rounded class="custom-btn invert full-width" style="max-width: 200px; max-height: 50px" @click="downloadImage">
          Download
        </q-btn>
        <q-btn rounded flat class="custom-btn text full-width q-mt-sm" style="max-width: 200px; max-height: 50px" @click="closeWindows">
          Close
        </q-btn>
        <div class="text-center fs-12 lighter">
          Did something go wrong? You can also <a href="/">combine your images manually</a>.
        </div>
      </q-card>
    </q-dialog>

    <a
      ref="downloadHelper"
      id="download-helper"
      download="swirl.png"
      :href="downloadURL"
    ></a>
  </q-page-container>
</template>

<script setup>
import { ref } from "vue";
import { network, opensea } from "src/scripts/config.json";
import { keys } from "src/scripts/keys";
import { getState, signIn } from "src/scripts/modules/web3modal";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();
const showPopup = ref(false);

const maxPagesLeft = ref(1);
const maxPagesRight = ref(1);

const currentPageLeft = ref(1);
const currentPageRight = ref(1);

const currentPage = ref(0);

let userNFTs = ref(null);
let useBackgrounds = ref(null);
const currentSide = ref(0);

const selectedNFT = null;
const selectedBackground = null;

const isLoading = ref(false);
const downloadHelper = ref(null);

const allowedExtensions = [
  'image/png',
  'image/jpg',
  'image/jpeg'
]

const showLoading = ref(false);
const showDone = ref(false);
const downloadURL = ref(null);

async function openPanel(side) {
  isLoading.value = true;

  currentSide.value = side;
  currentPage.value = side === 0 ? currentPageLeft.value : currentPageRight.value;

  let state = getState();

  if (!state.address) {
    // load wallet
    try {
      await signIn();
    } catch (e) {
      return;
    }

    state = getState();
  }

  let target;

  // load page if needed
  if (side === 0) {
    target = userNFTs.value;
  } else {
    target = useBackgrounds.value;
  }

  if (!target) {
    target = [];

    // load page
    const options = {
      offset: 0,
      limit: 30,
    }
    const assets = await getAssets(state.address, options, side === 1)
      .catch(e => {
        showError('Could not connect to the api. The OpenSea API may be down.');
        isLoading.value = false;
        return null;
      })

    if (assets) {
      // pull out valid information
      for (let i = 0; i < assets.assets.length; i++) {
        const asset = assets.assets[i];
        const urls = [
          asset.image_url,
          asset.image_original_url,
          asset.image_preview_url,
          asset.image_thumbnail_url
        ]
        let url = null;
        for (let i = 0; i < urls.length; i++) {
          if (!urls[i]) {
            continue;
          }

          url = urls[i];
          break;
        }

        if (!url) {
          continue;
        }

        const extension = await new Promise(function(resolve, reject) {
          const xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, true);
          xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
              const contentType = xhr.getResponseHeader('Content-Type');
              resolve(contentType)
            } else {
              reject({
                status: this.status,
                statusText: xhr.statusText
              })
            }
          }
          xhr.onerror = function() {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          };
          xhr.send();
        });

        let isValidExtension = false;
        for (const e in allowedExtensions) {
          if (extension.startsWith(e)) {
            isValidExtension = true
            break;
          }
        }

        if (!isValidExtension) {
          continue
        }

        target.push({
          ...asset,
          usageUrl: url,
          type: extension
        })

        if (side === 0) {
          maxPagesLeft.value = Math.ceil(target.length / 16);
        } else {
          maxPagesRight.value = Math.ceil(target.length / 16);
        }
      }
    }
    if (side === 0) {
      userNFTs.value = target;
    } else {
      useBackgrounds.value = target;
    }
  }

  showPopup.value = true;
  isLoading.value = false;
}

async function combineImages() {
  const fg = selectedNFT?.value.usageUrl;
  const bg = selectedBackground?.value.usageUrl;

  const formData = new FormData();
  formData.append('size', 'auto');
  formData.append('image_url', fg);
  formData.append('bg_image_url', bg);
  formData.append('format', 'png');

  const output = await axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: formData,
    responseType: 'arraybuffer',
    headers: {
      'X-Api-Key': keys.BACKGROUND_API_KEY,
    },
    encoding: null
  }).then(output => {
    const blob = new Blob([output.data]);
    const url = URL.createObjectURL(blob);
    return url;
  }).catch(e => {
    // hit error
    showError('Could not swirl your images at this time. Verify that you are providing static images with proper URLs.');
    console.error(e);
  })

  if (!output) {
    showLoading.value = false;
    showDone.value = false;
    return;
  }

  showLoading.value = false;
  showDone.value = true;
}

function downloadImage() {
  downloadHelper.value.click();
}

function closeWindows() {
  showLoading.value = false;
  showDone.value = false;
}

async function getAssets(address, urlOptions, useCoco) {
  const baseUri = network === 'homestead' ? 'https://api.opensea.io/api/v1/' : 'https://rinkeby-api.opensea.io/api/v1/';
  let url = `${baseUri}assets?owner=${address}&order_direction=desc&offset=${urlOptions.offset}&limit=${urlOptions.limit}`;

  if (useCoco) {
    url += `&collection=${network === 'homestead' ? 'coconft' : opensea['id']}`;
  }

  const header = {
    Accept: 'application/json'
  }

  if (network === 'homestead') {
    header['X-API-KEY'] = keys.OPENSEA;
  }

  const options = {
    method: 'GET',
    headers: header
  };

  return await fetch(url, options)
    .then(response => response.json());
}

function showError(err) {
  $q.notify({
    message: err,
    color: "red",
    position: "bottom-right",
    actions: [
      {
        label: "Ok",
        color: "white",
        handler: () => {
          /* ... */
        },
      },
    ],
    timeout: 30 * 1000,
  });
}
</script>

<style lang="scss" scoped>
.select {
  font-size: 20px;

  @media (min-width: $breakpoint-sm-max) {
    font-size: 24px;
  }
}

.select-title {
  font-size: 10px;

  @media (min-width: $breakpoint-sm-max) {
    font-size: 12px;
  }
}
</style>
