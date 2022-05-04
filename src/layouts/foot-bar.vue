<template>
  <div class="column flex flex-center full-width black-bottom-border">
    <div :class="`full-width flex flex-center ${$q.screen.lt.md ? 'column' : 'row'}`" :style="{'height': $q.screen.lt.md ? '100%' : '60px'}">
      <div :class="`row flex flex-center full-height ${$q.screen.lt.md ? 'q-pt-lg' : 'col-2'}`">
        <img src="~assets/secondary_logo_flip.png" />
      </div>
      <div :class="`flex flex-center ${$q.screen.lt.md ? 'column full-width' : 'full-height row col-8'}`">
        <template v-for="tab in tabs" :key="tab.name">
          <q-btn :class="`no-text-transform full-height fs-16 ${$q.screen.lt.md ? 'full-width q-pa-md' : ''}`" text-color="black" flat :label="tab.name" @click="useTab(tab)" />
        </template>
      </div>
      <div :class="`row flex flex-center full-height ${$q.screen.lt.md ? 'q-pb-md' : 'col-2'}`">
        <template v-for="social in socialsToShow" :key="social.name">
          <q-btn class="full-height" :style="{width: $q.screen.lt.md ? '55px' : '40px', 'aspect-ratio': $q.screen.lt.md ? '1' : 'auto'}" flat :href="social.href" target="_blank">
            <q-icon :name="social.icon" color="black" style="filter: brightness(0)" />
          </q-btn>
        </template>
      </div>
    </div>
    <div class="full-width bg-black q-pa-sm flex flex-center">
      <div class="fs-12 text-center text-white"><strong>© 2022 cocoNFT Technology Inc. All Rights Reserved</strong></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { socials } from "src/configs/shared.json";
import { goto } from "src/scripts/util";

const tabs = ref([
  {
    name: 'Blog',
    page: '/',
    target: ''
  },
  {
    name: 'FAQ',
    page: '/',
    target: '#faq'
  },
  {
    name: 'Privacy Policy',
    page: '/',
    target: ''
  },
  {
    name: 'Terms of Service',
    page: '/',
    target: ''
  }
])

const socialsToShow = ref([
  {
    name: 'Instagram',
    href: socials.instagram,
    icon: 'ion-logo-instagram'
  },
  {
    name: 'TikTok',
    href: socials.tiktok,
    icon: 'tiktok'
  },
  {
    name: 'Twitter',
    href: socials.twitter,
    icon: 'ion-logo-twitter'
  },
  {
    name: 'Discord',
    href: socials.discord,
    icon: 'discord'
  },
])

function useTab(tab) {
  goto(tab)
}
</script>

<style scoped>

</style>
