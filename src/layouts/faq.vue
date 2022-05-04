<template>
  <q-page-container id="faq" class="flex flex-center black-bottom-border column section-padding q-pl-md q-pr-md">
    <div class="text-uppercase text-h2 q-mb-xl">FAQ</div>
    <template v-for="(question, i) in questions" :key="question">
      <q-expansion-item icon="chevron_right" expand-icon="none" :label="question" class="full-width blog--small faq-question">
        <template v-for="answer in answers[i]" :key="`${answer} answer`">
          <div class="fs-16">{{answer}}</div>
        </template>
      </q-expansion-item>
      <q-separator class="full-width blog--small" horizontal />
    </template>
    <q-btn flat rounded class="q-mt-xl custom-btn full-width full-height text" style="max-width: 250px; max-height: 50px">
      Learn more on cocoNFT
    </q-btn>
  </q-page-container>
</template>

<script setup>
import { questions, answers } from 'src/configs/faq.json'
</script>

<style lang="scss">
//@import "src/css/";

.faq-question {
  margin-top: 12px;
  margin-bottom: 12px;

  .q-item {
    .q-item__section {
      font-size: 16px;

      @media (min-width: $breakpoint-sm-max) {
        font-size: 24px;
      }

      .q-item__label {
        margin-left: -24px;
        font-family: 'Mulish', sans-serif !important;
      }

      font-weight: bold;

      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }
  }

  .q-expansion-item__content {
    padding-left: 48px;
    line-height: 24px;
  }
}
</style>
