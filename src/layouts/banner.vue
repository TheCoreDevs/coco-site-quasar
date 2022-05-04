<template>
  <q-page-container id="banner" class="flex flex-center black-bottom-border relative-position">
    <div class="absolute-full">
      <img class="absolute-top-left basic-shadow avatar avatar-1 non-selectable" :src="avatars[0]" />
      <img class="absolute-bottom-left basic-shadow avatar avatar-2 non-selectable" :src="avatars[1]" />
      <img class="absolute-top-right basic-shadow avatar avatar-3 non-selectable" :src="avatars[3]" />
      <img class="absolute-bottom-right basic-shadow avatar avatar-4 non-selectable" :src="avatars[2]" />
    </div>

    <div class="center column justify-center q-pl-lg q-pr-lg">
      <q-img src="~assets/logo.svg" />
      <div class="text-center fs-18 q-pt-md">
        Mint your own, one-of-a-kind<br class="lt-md"/> cocoSwirl to<br class="gt-sm"/> customize your PFP or any<br class="lt-md"/> other NFT
      </div>
      <div class="row q-pt-md flex flex-center">
        <template v-for="social in socialsToShow" :key="social.name">
          <q-btn flat :href="social.href" target="_blank" style="aspect-ratio: 1">
            <q-icon :name="social.icon" color="black" style="filter: brightness(0)" />
          </q-btn>
        </template>
      </div>
    </div>
  </q-page-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { socials } from 'src/configs/shared.json'
import { reduceMotionEnabled } from "src/scripts/util";

const socialsToShow = ref([
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
  {
    name: 'Opensea',
    href: socials.opensea,
    icon: 'img:/logo-opensea.svg'
  }
])
const avatars = ref([

])

onMounted(() => {
  const reduceMotion = reduceMotionEnabled();
  for (let i = 0; i < 4; i++) {
    avatars.value.push(`./hero_images/${reduceMotion ? 'static' : 'animated'}/${i}.${reduceMotion ? 'png' : 'gif'}`)
  }
})
</script>

<style lang="scss" scoped>
#banner {
  background: url("~assets/swirl_bg_hero.jpg") white no-repeat;
  background-size: cover;

  height: 705px;

  .center {
    width: 100%;
    height: 100%;
    max-width: 400px;
  }
}

.avatar {
  pointer-events: none;
}

.avatar-1 {
  width: 130px;
  left: 20px;

  @media (min-width: $breakpoint-sm-min) {
    width: 160px;
    left: 25px;
  }

  @media (min-width: $breakpoint-md-min) {
    width: 200px;
    left: 25px;
  }

  aspect-ratio: 1;
  top: 25px;
  border-radius: 30px
}

.avatar-2 {
  width: 150px;
  left: 20px;

  @media (min-width: $breakpoint-sm-min) {
    width: 160px;
    left: 25px;
  }

  @media (min-width: $breakpoint-md-min) {
    width: 300px;
    left: 80px;
  }

  aspect-ratio: 1;
  bottom: -25px;
  border-radius: 30px
}

.avatar-3 {
  width: 140px;
  right: 20px;

  @media (min-width: $breakpoint-sm-min) {
    width: 160px;
    right: 25px;
  }

  @media (min-width: $breakpoint-md-min) {
    width: 215px;
    right: 40px;
  }

  aspect-ratio: 1;
  top: 40px;
  border-radius: 30px
}

.avatar-4 {
  width: 140px;
  right: 20px;

  @media (min-width: $breakpoint-sm-min) {
    width: 160px;
    right: 25px;
  }

  @media (min-width: $breakpoint-md-min) {
    width: 275px;
    right: 100px;
  }

  aspect-ratio: 1;
  bottom: 25px;
  border-radius: 30px
}
</style>
