<template>
  <q-layout view="lHh Lpr lFf" class="blog bg-white">
    <nav-bar class="blog" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <foot-bar />
  </q-layout>
</template>

<script setup>
import NavBar from "layouts/nav-bar";
import FootBar from "layouts/foot-bar";
</script>
