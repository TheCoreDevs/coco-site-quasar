<template>
  <q-page-container
    id="mint"
    class="flex flex-center black-bottom-border column section-padding"
  >
    <div class="text-uppercase text-h2">Minting</div>
    <div class="text-center fs-18 q-pt-md q-pb-md lighter">
      When you mint a cocoSwirl, you’ll receive a<br />
      unique background NFT at random
    </div>
    <div class="q-mt-md dots full-width q-pt-lg q-pb-lg q-mb-lg">
      <swiper
        :modules="modules"
        :slidesPerView="$q.screen.lt.sm ? 2 : $q.screen.lt.md ? 3 : 5"
        :spaceBetween="0"
        :centeredSlides="true"
        :autoplay="
          useAnimations ? { delay: 1500, disableOnInteraction: false } : false
        "
        :loop="true"
        :infinite="true"
      >
        <template v-for="i in 5" :key="`${i} key`">
          <swiper-slide>
            <q-img
              class="non-selectable"
              :src="`./mint_images/${i - 1}.png`"
              fit="contain"
            />
          </swiper-slide>
        </template>
      </swiper>
    </div>
    <div class="text-h5 font-mulish">
      <strong>{{ amountMinted }} of {{ amountMax }} remaining</strong>
    </div>
    <div class="row q-pt-sm q-mb-md">
      <span class="text-uppercase fs-10 self-center">Price</span>
      <span class="fs-18 q-pl-sm"
        ><strong>{{ ethPrice }} ETH</strong></span
      >
    </div>
    <q-btn
      rounded
      class="custom-btn full-width full-height"
      style="max-width: 250px; max-height: 50px"
      @click="startMint"
    >
      <q-spinner v-if="isLoading" />
      <div v-show="!isLoading">Mint</div>
    </q-btn>
    <div class="text-center q-pt-md lighter">
      By minting, you agree to the <a href="/">Terms of Service</a>.
    </div>

    <q-dialog
      class="overlay dots blog column flex flex-center"
      v-model="showOverlay"
      transition-show="fade"
      transition-hide="fade"
      @show="onShow"
      @hide="onHide"
      maximized
    >
      <div
        :class="`bg flex flex-center full-width ${
          $q.screen.gt.sm ? 'row no-wrap' : 'column reverse'
        }`"
      >
        <q-card
          :class="`q-pa-md ${$q.screen.gt.sm ? 'q-mr-xl' : 'q-mt-lg'}`"
          style="border-radius: 15px"
        >
          <q-card-section class="text-h5 font-mulish text-center"
            ><strong>Mint a cocoSwirl</strong></q-card-section
          >
          <q-card-section
            class="font-mulish lighter fs-16 text-center q-pt-none"
            >How many cocoSwirls would you like?</q-card-section
          >
          <q-card-section class="q-pl-none q-pr-none">
            <q-btn-dropdown
              flat
              class="full-width overlay-dropdown"
              :label="mintAmount"
              style="border-radius: 15px"
            >
              <q-list class="overlay-list">
                <template v-for="i in 2" :key="i">
                  <q-item
                    clickable
                    v-close-popup
                    @click="onItemClick(i)"
                    :class="[`${i === mintAmount ? 'selected' : ''}`]"
                  >
                    <q-item-section>
                      <q-item-label>{{ i }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-btn-dropdown>
          </q-card-section>
          <q-card-section class="text-center font-mulish q-pt-none">
            <strong>{{ amountMinted }}</strong> of
            <strong>{{ amountMax }}</strong> remaining
          </q-card-section>
          <q-separator class="q-mt-lg" />
          <q-card-section>
            <div class="text-uppercase fs-10">Total</div>
            <div>
              <strong>{{ (ethPrice * mintAmount).toFixed(3) }} ETH</strong>
              <span class="lighter q-pl-sm">~${{ currentPriceTotal }} USD</span>
            </div>
          </q-card-section>
          <q-btn
            rounded
            class="custom-btn full-width q-mt-md"
            @click="attemptMint"
          >
            Mint
          </q-btn>
        </q-card>

        <!--<div class="lt-md flex-break"></div>-->

        <q-img
          :class="`mystery-img ${$q.screen.gt.sm ? 'q-ml-xl' : ''}`"
          src="~assets/swirl/mystery.png"
          style="max-width: 200px; aspect-ratio: 1"
          fit="scale-down"
        />
      </div>
    </q-dialog>

    <q-dialog
      class="swirl overlay blog column flex flex-center q-pb-lg"
      style="filter: none; overflow-y: visible !important"
      v-model="showTx"
      transition-show="fade"
      transition-hide="fade"
      maximized
    >
      <q-card
        class="q-pa-md text-center full-height"
        style="
          border-radius: 15px !important;
          max-width: 400px;
          width: 100%;
          max-height: 700px;
        "
      >
        <div class="text-h6 font-mulish"><strong>Thank you!</strong></div>
        <div class="fs-16 lighter q-pt-md">
          This might take a few minutes. Track your transaction on Etherscan, or
          check OpenSea to see if it’s complete.
        </div>
        <q-btn
          rounded
          class="custom-btn full-width invert q-mt-lg"
          :href="etherscanLink"
          target="_blank"
        >
          Track on Etherscan
        </q-btn>
        <q-btn
          rounded
          class="custom-btn full-width q-mt-md"
          :href="openseaLink"
          target="_blank"
        >
          View on OpenSea
        </q-btn>
        <q-separator class="q-mt-xl q-mb-lg" />
        <div class="text-h6 font-mulish"><strong>Swirl your PFP</strong></div>
        <div class="fs-16 lighter q-pt-md">
          Customize your profile picture by adding your new swirl to the
          background.In
        </div>
        <q-img src="~assets/swirl/pfp.gif" />
        <q-btn rounded class="custom-btn full-width q-mt-md" @click="gotoSwirl">
          Swirl it
        </q-btn>
      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<script setup>
import { ethers } from "ethers";
import { Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { onMounted, ref } from "vue";
import { getState, signIn } from "src/scripts/modules/web3modal";
import {
  getUsefulError,
  goto,
  reduceMotionEnabled,
  sleep,
} from "src/scripts/util";
import { useStore } from "vuex";
import { getContractInstance } from "src/scripts/contracts/contracts";
import { totalSupply } from "src/scripts/modules/token-types/erc721";
import { mint } from "src/scripts/custom/main";
import { useQuasar } from "quasar";
import { etherscan, opensea, network } from "src/scripts/config.json";
import whitelist from "../scripts/modules/WL.json";

const store = useStore();
const $q = useQuasar();
const modules = ref([Pagination, A11y, Autoplay]);
const isLoading = ref(true);
const showOverlay = ref(false);
const showTx = ref(false);
const useAnimations = ref(false);

// overlay
const mintAmount = ref(1);
const ethPrice = ref(0.042);
const usdPrice = ref(0);
const currentPriceTotal = ref(0);
const amountMinted = ref(0);
const amountMax = ref(1000);
let canUpdateAmountMinted = true;

// tx
const etherscanLink = ref(null);
const openseaLink = ref(null);

useAnimations.value = !reduceMotionEnabled();

onMounted(async () => {
  usdPrice.value = await getEthCost();

  store.subscribe(async (mutation, state) => updateState());
  updateState();

  await sleep(500);
  isLoading.value = false;
});

async function updateState() {
  // const state = getState();

  if (!store.getters["web3module/getMintOverlayState"]) {
    showOverlay.value = false;
    showTx.value = false;
  }

  if (canUpdateAmountMinted) {
    canUpdateAmountMinted = false;

    setTimeout(() => {
      canUpdateAmountMinted = true;
    }, 5000);

    const pair = getContractInstance("main");
    amountMinted.value = amountMax.value - (await totalSupply(pair));
  }
}

async function startMint() {
  if (isLoading.value) {
    return;
  }

  await signIn();

  updateState();

  const state = getState();
  if (state.address) {
    showOverlay.value = true;
    onItemClick(1);
  }
}

// overlay
function onItemClick(i) {
  mintAmount.value = i;

  const ethCost = (i * ethPrice.value).toFixed(3);
  const usdCost = (ethCost * usdPrice.value).toFixed(2);
  currentPriceTotal.value = usdCost;
}

function onShow() {
  store.commit("web3module/showMint");
  store.commit("web3module/setDirty");
}

function onHide() {
  if (showTx.value) {
    return;
  }

  store.commit("web3module/hideMint");
  store.commit("web3module/setDirty");
}

async function gotoSwirl() {
  showTx.value = false;
  await sleep(500);
  goto({
    page: "/",
    target: "#swirl",
  });
}

async function attemptMint() {
  const pair = getContractInstance("main");
  const price = (mintAmount.value * ethPrice.value).toFixed(3);
  let output;

  const provider = getState().provider;
  const signer = await provider.getSigner();
  let address = await signer.getAddress();
  address = address.toLowerCase();
  const keys = Object.keys(whitelist);

  if (!keys.includes(address)) {
    throw new Error("You are not on the List!");
  }

  const signature = whitelist[address];
  console.log(signature);
  try {
    if (mintAmount.value === 1) {
      output = await mint(1, pair, signature, price);
    } else {
      output = await mint(2, pair, signature, price);
    }
  } catch (e) {
    showError(e.message);
    return;
  }

  if (!output) {
    return;
  }

  const tx = await output.wait().catch((e) => {
    showError(getUsefulError(e));
  });

  if (!tx) {
    return;
  }

  etherscanLink.value = etherscan[network].replace("HASH", tx.transactionHash);
  openseaLink.value = opensea[network].replace("ID", opensea["id"]);
  showTx.value = true;
  showOverlay.value = false;

  updateState();
}

async function getEthCost() {
  const https = require("https");
  const url = "https://api.coinbase.com/v2/exchange-rates?currency=ETH";

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        response.setEncoding("utf8");

        let rawData = "";

        response.on("data", (chunk) => {
          rawData += chunk;
        });
        response.on("end", (response) => {
          const json = JSON.parse(rawData);
          resolve(json.data.rates.USD);
        });
      })
      .on("error", (e) => {
        reject(e);
      });
  });
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

<style lang="scss">
.overlay {
  .q-dialog__backdrop {
    top: 54px;
    //background: url("~assets/dot-background.jpg") white repeat;
    background: none;
  }

  .q-dialog__inner {
    top: 54px;
    //background: none;
  }

  .bg {
    border: none;
    background: none;
    outline: none;
    box-shadow: none;
    padding: 5px;
  }

  top: 54px;
}

.q-menu {
  //border-radius: 30px !important;
}

.overlay-dropdown {
  background-color: #f0f0f1;
}

.q-item {
  .q-item__label {
    font-family: "PP", sans-serif !important;
  }
}

.selected {
  background-color: $primary;

  .q-item__label {
    color: white;
  }
}

.q-btn-dropdown {
  .q-btn__content {
    .block {
      width: 100%;
      text-align: left;
      font-family: "PP", sans-serif !important;
    }
  }
}

.mystery-img {
  @media (max-width: $breakpoint-sm-max) {
    margin-bottom: -80px;
    z-index: -1;
  }
}
</style>
