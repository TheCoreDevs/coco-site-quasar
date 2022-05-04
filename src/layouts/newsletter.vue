<template>
  <q-page-container id="newsletter" class="flex flex-center black-bottom-border column dots">
    <div class="row full-width full-height q-pa-lg">
      <div :class="`col-6 ${$q.screen.lt.md ? 'full-width' : ''}`">
        <div :class="`text-left full-height text-uppercase ${$q.screen.lt.md ? '' : 'q-pl-lg'}`" :style="`font-size: ${$q.screen.lt.md ? '26' : '48'}px`">
          <span class="font-pp gt-sm">Subscribe to <span class="font-leonardo lt-md">our</span></span>
          <div class="font-pp lt-md text-center">Subscribe to <span class="font-leonardo lt-md">our</span></div>
          <span class="font-leonardo q-pl-md gt-sm">our newsletter</span>
          <div class="font-leonardo text-center lt-md q-mb-lg">newsletter</div>
        </div>
      </div>
      <div class="lt-md flex-break" />
      <div :class="`col-6 flex items-center ${$q.screen.lt.md ? 'full-width' : 'q-pr-lg'}`">
        <q-input class="newsletter-input full-width relative-position" rounded outlined bg-color="white" v-model="email" placeholder="Email address...">
          <div class="selection-outline absolute-full"></div>
          <template v-slot:append>
            <q-btn class="custom-btn" label="Subscribe" />
          </template>
        </q-input>
      </div>
    </div>
  </q-page-container>
</template>

<script setup>
import { ref } from "vue";

const email = ref(null);
</script>

<style lang="scss">
#newsletter {
  padding-top: 0 !important;
}

.newsletter-input {
  .custom-btn {
    border-radius: 0;
    border-top-right-radius: 48px;
    border-bottom-right-radius: 48px;
    height: 100%;
    margin-right: -12px;
  }
}

.q-field--outlined {
  input {
    padding-left: 12px;
    padding-right: 12px;
  }

  .q-field__control:before {
    border: black 2px solid !important;
  }

  .selection-outline {
    pointer-events: none;
  }

  &.q-field--focused {
    .selection-outline {
      border-radius: 48px;
      border: 2px solid rgba(153, 153, 153, 1);
      width: calc(100% + 160px);
      height: calc(100% + 10px);
      transform: translateX(-17px) translateY(-5px);
      pointer-events: none;
    }
  }
}

.q-field--outlined .q-field__control::after {
  border: black 2px solid !important;
}

.q-field--outlined .q-field__control:before {
  border: black 2px solid;
}
</style>
