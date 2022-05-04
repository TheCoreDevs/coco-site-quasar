<template>
  <q-header id="banner" class="bg-white text-white black-bottom-border">
    <q-toolbar style="height: 50px">
      <template v-for="tab in tabs" :key="tab.name">
        <q-btn class="full-height no-text-transform gt-sm" text-color="black" flat :label="tab.name" @click="useTab(tab)" />
      </template>
      <q-space class="gt-sm" />
      <q-btn flat class="flex full-height" @click="useTab({page: '/', target: '#banner'})">
        <img class="non-selectable" src="~assets/logo.svg" />
      </q-btn>
      <q-space/>
      <img class="non-selectable" src="~assets/secondary_logo.svg" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from "vue";
import { goto } from "src/scripts/util";
import { useStore } from "vuex";

const store = useStore();
const tabs = ref([
  {
    name: 'Mint',
    page: '/',
    target: '#mint'
  },
  {
    name: 'Swirl',
    page: '/',
    target: '#swirl'
  },
  {
    name: 'FAQ',
    page: '/',
    target: '#faq'
  }
])

function useTab(tab) {
  store.commit('web3module/hideMint');
  store.commit('web3module/setDirty');

  goto(tab)
}
</script>

<style scoped>
#banner {

}
</style>
